import { useState } from "react";
import PropTypes from "prop-types";
import { LoaderContext } from "../../../../context/LoaderContext";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import Datetime from "react-datetime";
import Button from "../../../Button/Button";
import { updateEvent } from "../../../../services/events.service";
import { toast } from "react-toastify";
import moment from "moment";
import {
  MIN_EVENT_DESCRIPTION_LENGTH,
  MIN_EVENT_TITLE_LENGTH,
  MAX_EVENT_DESCRIPTION_LENGTH,
  MAX_EVENT_TITLE_LENGTH,
} from "../../../../common/constants";
import { uploadEventImage } from "../../../../services/storage.service";

function EditEventForm({ event, setEvent, setEditEventModal }) {
  const { setLoading } = useContext(LoaderContext);
  const [eventData, setEventData] = useState({ ...event });
  const [changeDate, setChangeDate] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  let inputProps = {
    placeholder: "Select date and time",
    className: "input input-bordered w-full",
  };

  const dateValueToObject = (date) => {
    try {
      const newDate = moment.isMoment(date) ? date.toDate() : date;

      let day = newDate?.getDate();
      let month = newDate?.getMonth() + 1;
      let hours = newDate?.getHours();
      let minutes = newDate?.getMinutes();

      if (day < 10) {
        day = `0${day}`;
      }

      if (month < 10) {
        month = `0${month}`;
      }

      if (hours < 10) {
        hours = `0${hours}`;
      }

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return {
        day: day.toString(),
        month: month.toString(),
        year: newDate?.getFullYear().toString(),
        hours: hours.toString(),
        minutes: minutes.toString(),
      };
    } catch (error) {
      console.error("Error in CreateEventForm.jsx > dateValueToObject", error);
      throw error;
    }
  };

  const fieldsValidation = () => {
    if (!eventData.title) {
      toast.error("Please provide a title for your event.");
      return false;
    }

    if (
      eventData.title.length < MIN_EVENT_TITLE_LENGTH ||
      eventData.title.length > MAX_EVENT_TITLE_LENGTH
    ) {
      toast.error(
        `Event title should be between ${MIN_EVENT_TITLE_LENGTH} and ${MAX_EVENT_TITLE_LENGTH} characters.`
      );
      return false;
    }
    if (!eventData.description) {
      toast.error("Please provide a description for your event.");
      return false;
    }
    if (
      eventData.description.length < MIN_EVENT_DESCRIPTION_LENGTH ||
      eventData.description.length > MAX_EVENT_DESCRIPTION_LENGTH
    ) {
      toast.error(
        `Event description should be between ${MIN_EVENT_DESCRIPTION_LENGTH} and ${MAX_EVENT_DESCRIPTION_LENGTH} characters.`
      );
      return false;
    }
    if (!eventData.location.country) {
      toast.error("Please provide a country for your event.");
      return false;
    }
    if (!eventData.location.city) {
      toast.error("Please provide a city for your event.");
      return false;
    }
    if (!eventData.location.address) {
      toast.error("Please provide an address for your event.");
      return false;
    }
    if (changeDate && !eventData.startDateTime) {
      toast.error("Please provide a start date and time for your event.");
      return false;
    }
    if (changeDate && !eventData.endDateTime) {
      toast.error("Please provide an end date and time for your event.");
      return false;
    }
    if (changeDate && typeof eventData.startDateTime !== "object") {
      toast.error(
        "Please provide a valid start date and time for your event. A valid date and time looks like this: 01/01/2022 12:00."
      );
      return false;
    }
    if (changeDate && typeof eventData.endDateTime !== "object") {
      toast.error(
        "Please provide a valid end date and time for your event. A valid date and time looks like this: 01/01/2022 12:00."
      );
      return false;
    }

    return true;
  };

  const updateForm = (prop) => (e) => {
    if (prop.includes(".")) {
      const [objName, objProp] = prop.split(".");
      setEventData((prevState) => ({
        ...prevState,
        [objName]: {
          ...prevState[objName],
          [objProp]: e.target.value,
        },
      }));
    } else {
      setEventData((prevState) => ({ ...prevState, [prop]: e.target.value }));
    }
  };

  const handleEditEvent = async () => {
    try {
      setLoading(true);
      if (!fieldsValidation()) {
        setLoading(false);
        return;
      }

      if (changeDate) {
        eventData.startDateTime = dateValueToObject(eventData.startDateTime);
        eventData.endDateTime = dateValueToObject(eventData.endDateTime);
      }

      await updateEvent(eventData.eid, {
        ...eventData,
        updatedOn: Date.now(),
      });

      if (imageUpload) {
        const newImageUrl = await uploadEventImage(imageUpload, eventData.eid);
        setEvent((prevEvent) => ({
          ...prevEvent,
          image: newImageUrl,
          updatedOn: Date.now(),
        }));
        setEvent({ ...eventData, updatedOn: Date.now() });
      } else {
        setEvent({ ...eventData, updatedOn: Date.now() });
      }

      setEditEventModal(false);
      toast.success("Event updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error in EditEventForm > handleEditEvent:", error);
      throw error;
    }
  };

  function handleCancelEdit() {
    if (
      !window.confirm(
        "Are you sure you want to leave? No changes will be applied."
      )
    ) {
      return;
    }
    setEditEventModal(false);
  }

  return (
    <div>
      <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  min-w-full min-h-full bg-black z-10 bg-opacity-60  ">
        <div className="create-event-modal m-8 rounded-bl-2xl rounded-tl-2xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[70%] min-h-[80%] max-h-[80%] overflow-auto max-w-7xl z-10 px-8 py-7">
          <h2 className="text-3xl font-bold mb-5">Edit Event</h2>
          <button
            className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-6"
            onClick={handleCancelEdit}
          >
            <IoClose />
          </button>

          <div className="create-event-form">
            <div className="form-title-row flex gap-8">
              <label className="form-control w-8/12">
                <div className="label">
                  <span className="label-text text-lg">
                    Event title<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Place your event title here"
                  className="input input-bordered w-full "
                  name="event-title"
                  id="event-title"
                  value={eventData.title}
                  onChange={updateForm("title")}
                />
              </label>
              <div className="is-private flex flex-col gap-2 w-4/12 p-3 bg-base-100 rounded-md">
                <div className="private-checkbox flex gap-4 items-center">
                  <span className="label-text text-lg font-semibold">
                    Is this a private event?
                  </span>

                  <input
                    type="checkbox"
                    checked={eventData?.isPrivate}
                    className="toggle"
                    name="private-event"
                    id="private-event"
                    onChange={() => {
                      setEventData({
                        ...eventData,
                        isPrivate: !eventData?.isPrivate,
                      });
                    }}
                  />
                </div>
                <span className="label-text-alt">
                  * Private events are only visible to you and your invitees and
                  will not appear on the public events page.
                </span>
              </div>
            </div>

            <hr className="border-dashed mt-5" />

            <div className="form-description-row flex gap-8">
              <label className="form-control w-8/12">
                <div className="label">
                  <span className="label-text text-lg">
                    Event description <span className="text-red-500"> *</span>
                  </span>
                </div>
                <textarea
                  placeholder="Place your event description here"
                  className="textarea min-h-[300px] textarea-bordered w-full text-[16px]"
                  name="event-description"
                  id="event-description"
                  value={eventData?.description}
                  onChange={updateForm("description")}
                />
              </label>
              <div className="event-image flex flex-col gap-2 w-4/12">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-lg">
                      Event cover image <span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    name="event-image"
                    id="event-image"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      Files in .png, .jpg, or .webp formats are allowed, with a
                      maximum size of 500 KB. Recommended size 1200x630
                    </span>
                  </div>
                  <div className="event-image">
                    {imageUpload ? (
                      <img
                        src={URL.createObjectURL(imageUpload)}
                        className="aspect-40/21 object-cover mt-3 rounded-lg"
                      />
                    ) : (
                      <img
                        src={event.image}
                        className="aspect-40/21 object-cover mt-3 rounded-lg"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>

            <hr className="border-dashed mt-5" />

            <div className="form-address-row flex flex-row gap-8">
              <label className="form-control w-3/12">
                <div className="label">
                  <span className="label-text text-lg">
                    Event country <span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Place country of the event"
                  className="input input-bordered w-full "
                  name="event-country"
                  id="event-country"
                  value={eventData.location.country}
                  onChange={updateForm("location.country")}
                />
              </label>
              <label className="form-control w-3/12">
                <div className="label">
                  <span className="label-text text-lg">
                    Event city <span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Place city of the event"
                  className="input input-bordered w-full "
                  name="event-city"
                  id="event-city"
                  value={eventData.location.city}
                  onChange={updateForm("location.city")}
                />
              </label>
              <label className="form-control w-6/12">
                <div className="label">
                  <span className="label-text text-lg">
                    Event address <span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Place the street address of the event"
                  className="input input-bordered w-full "
                  name="event-country"
                  id="event-country"
                  value={eventData.location.address}
                  onChange={updateForm("location.address")}
                />
              </label>
            </div>

            <hr className="border-dashed mt-5" />

            <div className="form-date-row flex gap-8">
              <div className="is-private flex flex-col gap-2 w-4/12 p-3 bg-base-100 rounded-md mt-3">
                <div className="private-checkbox flex gap-4 items-center">
                  <span className="label-text text-lg font-semibold">
                    Change event date and time?
                  </span>

                  <input
                    type="checkbox"
                    className="toggle"
                    name="private-event"
                    id="private-event"
                    onChange={() => {
                      setChangeDate(!changeDate);
                    }}
                  />
                </div>
                <span className="label-text-alt">
                  * If you wish to change event date and time, please check the
                  box. Otherwise, the event date and time will remain the same.
                </span>
              </div>

              {changeDate && (
                <>
                  <div className="event-datetime__start flex w-4/12 ">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text text-lg">
                          Start event date & time{" "}
                          <span className="text-red-500"> *</span>
                        </span>
                      </div>
                      <Datetime
                        inputProps={inputProps}
                        dateFormat="DD/MM/YYYY"
                        timeFormat="HH:mm"
                        onChange={(date) => {
                          setEventData({
                            ...eventData,
                            startDateTime: date,
                          });
                        }}
                      />
                    </label>
                  </div>
                  <div className="event-datetime__end flex w-4/12">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text text-lg">
                          End event date & time
                          <span className="text-red-500"> *</span>
                        </span>
                      </div>
                      <Datetime
                        inputProps={inputProps}
                        dateFormat="DD/MM/YYYY"
                        timeFormat="HH:mm"
                        onChange={(date) => {
                          setEventData({
                            ...eventData,
                            endDateTime: date,
                          });
                        }}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>

            <hr className="border-dashed mt-3 mb-3" />

            <div className="form-upload-row flex gap-8 justify-between mt-5">
              <Button onClick={handleEditEvent}>Save changes</Button>
              <button className="btn text-lg" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EditEventForm.propTypes = {
  event: PropTypes.object.isRequired,
  setEditEventModal: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
};

export default EditEventForm;
