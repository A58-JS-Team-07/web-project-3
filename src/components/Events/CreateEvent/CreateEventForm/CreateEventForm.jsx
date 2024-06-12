import { IoClose } from "react-icons/io5";
import Button from "../../../Button/Button";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { LoaderContext } from "../../../../context/LoaderContext";
import { uploadEventImage } from "../../../../services/storage.service";
import { createEvent, updateEvent } from "../../../../services/events.service";
import { toast } from "react-toastify";
import {
  MIN_EVENT_TITLE_LENGTH,
  MAX_EVENT_TITLE_LENGTH,
  MIN_EVENT_DESCRIPTION_LENGTH,
  MAX_EVENT_DESCRIPTION_LENGTH,
} from "../../../../common/constants";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { addMonths, addWeeks, addYears } from "date-fns";

/**
 * CreateEventForm component which provides a form to create an event
 *
 * @param {Object} props.showModal - The state of the modal. Determines if the modal is shown or not.
 * @param {Function} props.setShowModal - The function to set the state of the modal.
 * @returns {JSX.Element} - Rendered CreateEventForm component.
 */

function CreateEventForm({ showModal, setShowModal = () => {} }) {
  const { userData } = useContext(AppContext);
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [isRecurring, setIsRecurring] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [canOthersInvite, setCanOthersInvite] = useState(true);
  const [imageUpload, setImageUpload] = useState("");
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    startDateTime: "",
    endDateTime: "",

    location: {
      country: "",
      city: "",
      address: "",
    },

    creator: userData.username,
    participants: {
      [userData.username]: true,
    },

    isRecurring: isRecurring,
    recurringFrequency: "",
    lastRecurringDate: "",

    isPrivate: isPrivate,

    canOthersInvite: canOthersInvite,
  });

  useEffect(() => {
    if (!isRecurring) {
      setEventData((prevState) => ({ ...prevState, lastRecurringDate: null }));
      setEventData((prevState) => ({ ...prevState, recurringFrequency: null }));
    }
  }, [isRecurring]);

  let inputProps = {
    placeholder: "Select date and time",
    className: "input input-bordered w-full",
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
    if (!eventData.image) {
      toast.error("Please provide an image for your event.");
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
    if (!eventData.startDateTime) {
      toast.error("Please provide a start date and time for your event.");
      return false;
    }
    if (!eventData.endDateTime) {
      toast.error("Please provide an end date and time for your event.");
      return false;
    }
    if (isRecurring && !eventData.recurringFrequency) {
      toast.error("Please provide a recurring frequency for your event.");
      return false;
    }
    if (isRecurring && !eventData.lastRecurringDate) {
      toast.error("Please provide a last recurring date for your event.");
      return false;
    }
    if (typeof eventData.startDateTime !== "object") {
      toast.error(
        "Please provide a valid start date and time for your event. A valid date and time looks like this: 01/01/2022 12:00."
      );
      return false;
    }
    if (typeof eventData.endDateTime !== "object") {
      toast.error(
        "Please provide a valid end date and time for your event. A valid date and time looks like this: 01/01/2022 12:00."
      );
      return false;
    }
    if (isRecurring && typeof eventData.lastRecurringDate !== "object") {
      toast.error(
        "Please provide a valid last recurring date for your event. A valid date looks like this: 01/01/2022."
      );
      return false;
    }
  };

  const handleEventCreation = async () => {
    try {
      if (fieldsValidation() === false) return;

      setLoading(true);

      eventData.startDateTime = dateValueToObject(eventData.startDateTime);
      eventData.endDateTime = dateValueToObject(eventData.endDateTime);

      if (isRecurring) {
        eventData.lastRecurringDate = eventData.lastRecurringDate
          .toDate()
          .getTime();
      }

      const eventId = await createEvent(eventData);
      const imageId = await uploadEventImage(imageUpload, eventId);

      await updateEvent(eventId, { image: imageId });

      if (isRecurring) {
        try {
          const recurringEndDate = eventData.lastRecurringDate;
          let eventStartDate = new Date(
            eventData.startDateTime.year,
            eventData.startDateTime.month - 1,
            eventData.startDateTime.day,
            eventData.startDateTime.hours,
            eventData.startDateTime.minutes
          ).getTime();
          let eventEndDate = new Date(
            eventData.endDateTime.year,
            eventData.endDateTime.month - 1,
            eventData.endDateTime.day,
            eventData.endDateTime.hours,
            eventData.endDateTime.minutes
          ).getTime();

          switch (eventData.recurringFrequency) {
            case "weekly":
              while (recurringEndDate > addWeeks(eventStartDate, 1)) {
                const newStartDate = addWeeks(eventStartDate, 1);
                const newEndDate = addWeeks(eventEndDate, 1);

                eventStartDate = newStartDate.getTime();
                eventEndDate = newEndDate.getTime();

                const newEventData = {
                  ...eventData,
                  startDateTime: dateValueToObject(newStartDate),
                  endDateTime: dateValueToObject(newEndDate),
                };

                const newEventId = await createEvent(newEventData);
                const newImageId = await uploadEventImage(
                  imageUpload,
                  newEventId
                );

                await updateEvent(newEventId, { image: newImageId });
              }
              break;
            case "monthly":
              while (recurringEndDate > addMonths(eventStartDate, 1)) {
                const newStartDate = addMonths(eventStartDate, 1);
                const newEndDate = addMonths(eventEndDate, 1);

                eventStartDate = newStartDate.getTime();
                eventEndDate = newEndDate.getTime();

                const newEventData = {
                  ...eventData,
                  startDateTime: dateValueToObject(newStartDate),
                  endDateTime: dateValueToObject(newEndDate),
                };

                const newEventId = await createEvent(newEventData);
                const newImageId = await uploadEventImage(
                  imageUpload,
                  newEventId
                );

                await updateEvent(newEventId, { image: newImageId });
              }
              break;
            case "yearly":
              while (recurringEndDate > addYears(eventStartDate, 1)) {
                const newStartDate = addYears(eventStartDate, 1);
                const newEndDate = addYears(eventEndDate, 1);

                eventStartDate = newStartDate.getTime();
                eventEndDate = newEndDate.getTime();

                const newEventData = {
                  ...eventData,
                  startDateTime: dateValueToObject(newStartDate),
                  endDateTime: dateValueToObject(newEndDate),
                };

                const newEventId = await createEvent(newEventData);
                const newImageId = await uploadEventImage(
                  imageUpload,
                  newEventId
                );

                await updateEvent(newEventId, { image: newImageId });
              }
              break;
          }
        } catch (error) {
          console.error(
            "Error in CreateEventForm.jsx > handleEventCreation > Recurring event creation:",
            error
          );
          throw error;
        }
      }

      setShowModal(false);
      setLoading(false);
      navigate(`/events/${eventId}`);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error in CreateEventForm.jsx > handleEventCreation:",
        error
      );
      throw error;
    }
  };

  function closeModal() {
    if (
      window.confirm(
        "Your event is not uploaded. Are you sure you want to leave? All content you have added will be lost."
      )
    ) {
      setShowModal(false);
    }
  }

  return (
    <div>
      {showModal ? (
        <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  min-w-full min-h-full bg-black z-10 bg-opacity-60  ">
          <div className="create-event-modal m-8 rounded-bl-2xl rounded-tl-2xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[70%] min-h-[80%] max-h-[80%] overflow-auto max-w-7xl z-10 px-8 py-7">
            <h2 className="text-3xl font-bold mb-5">Create Event</h2>
            <button
              className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-6"
              onClick={closeModal}
            >
              <IoClose />
            </button>

            <div className="create-event-form">
              <div className="form-title-row flex gap-8">
                <label className="form-control w-5/12">
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
                <div className="can-others-invite flex flex-col gap-2 w-4/12 p-3 bg-base-100 rounded-md">
                  <div className="invite-checkbox flex gap-4 items-center">
                    <span className="label-text text-lg font-semibold">
                      Can participants invite others?
                    </span>

                    <input
                      type="checkbox"
                      className="toggle"
                      name="can-others-invite-to-event"
                      id="can-others-invite-to-event"
                      checked={canOthersInvite}
                      onChange={() => {
                        setCanOthersInvite(!canOthersInvite);
                        setEventData({
                          ...eventData,
                          canOthersInvite: !canOthersInvite,
                        });
                      }}
                    />
                  </div>
                  <span className="label-text-alt">
                    * Check this if you would like all participants to this
                    event to be able to invite other participants to it.
                  </span>
                </div>
                <div className="is-private flex flex-col gap-2 w-3/12 p-3 bg-base-100 rounded-md">
                  <div className="private-checkbox flex gap-4 items-center">
                    <span className="label-text text-lg font-semibold">
                      This is Private event?
                    </span>

                    <input
                      type="checkbox"
                      className="toggle"
                      name="private-event"
                      id="private-event"
                      onChange={() => {
                        setIsPrivate(!isPrivate);
                        setEventData({ ...eventData, isPrivate: !isPrivate });
                      }}
                    />
                  </div>
                  <span className="label-text-alt">
                    * Private events will not appear in the public event feed.
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
                    value={eventData.description}
                    onChange={updateForm("description")}
                  />
                </label>
                <div className="event-image flex flex-col gap-2 w-4/12">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text text-lg">
                        Event cover image{" "}
                        <span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full"
                      name="event-image"
                      id="event-image"
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                        setEventData({
                          ...eventData,
                          image: e.target.files[0] ? true : null,
                        });
                      }}
                    />
                    <div className="label">
                      <span className="label-text-alt">
                        Files in .png, .jpg, or .webp formats are allowed, with
                        a maximum size of 500 KB. Recommended size 1200x630
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
                          src={"../../../../../public/dummy-img.png"}
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
                <div className="event-datetime__start flex w-3/12 ">
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
                <div className="event-datetime__end flex w-3/12">
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
                <div className="event-recurring w-6/12">
                  {isRecurring ? (
                    <div className="flex flex-row gap-8">
                      <div className="recurring__frequency flex w-1/2">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text text-lg">
                              Recurring event frequency
                              <span className="text-red-500"> *</span>
                            </span>
                          </div>
                          <select
                            className="select select-bordered capitalize"
                            onChange={(e) => {
                              setEventData({
                                ...eventData,
                                recurringFrequency: e.target.value,
                              });
                            }}
                          >
                            <option disabled selected>
                              Select frequency
                            </option>
                            <option>weekly</option>
                            <option>monthly</option>
                            <option>yearly</option>
                          </select>
                        </label>
                      </div>
                      <div className="recurring__end w-1/2">
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text text-lg">
                              Last recurring event date
                              <span className="text-red-500"> *</span>
                            </span>
                          </div>
                          <Datetime
                            inputProps={inputProps}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            onChange={(date) => {
                              setEventData({
                                ...eventData,
                                lastRecurringDate: date,
                              });
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="recurring-event-toggle mt-2">
                <div className="is-recurring flex flex-col gap-2">
                  <div className="private-checkbox flex gap-4 items-center">
                    <span className="label-text text-lg">
                      Is this a recurring event?
                    </span>
                    <input
                      type="checkbox"
                      className="toggle"
                      name="recurring-event"
                      id="recurring-event"
                      onChange={() => {
                        setIsRecurring(!isRecurring);
                        setEventData({
                          ...eventData,
                          isRecurring: !isRecurring,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-upload-row flex gap-8 justify-between mt-5">
                <Button onClick={handleEventCreation}>Upload</Button>
                <button className="btn text-lg" onClick={closeModal}>
                  Cancel upload
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

CreateEventForm.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default CreateEventForm;
