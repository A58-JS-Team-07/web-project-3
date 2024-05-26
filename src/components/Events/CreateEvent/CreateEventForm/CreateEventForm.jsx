import { IoClose } from "react-icons/io5";
import Button from "../../../Button/Button";
import { useState } from "react";

function CreateEventForm({ showModal, setShowModal = () => {} }) {
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [canOthersInvite, setCanOthersInvite] = useState(false);
  const [invitees, setInvitees] = useState([]);

  return (
    <div>
      {showModal ? (
        <div className="create-event-modal-backdrop absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  min-w-full min-h-full bg-black z-10 bg-opacity-60  ">
          <div className="create-event-modal m-8 rounded-3xl bg-base-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[70%] min-h-[80%] max-h-[80%] overflow-auto max-w-7xl z-10 px-8 py-7">
            <h2 className="text-3xl font-bold mb-5">Create Event</h2>
            <button
              className="btn rounded-full p-0 px-2 text-3xl absolute right-5 top-6"
              onClick={() => setShowModal(false)}
            >
              <IoClose />
            </button>

            <div className="create-event-form">
              <div className="form-title-row flex gap-8">
                <label className="form-control w-8/12">
                  <div className="label">
                    <span className="label-text text-lg">Event title</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Place your event title here"
                    className="input input-bordered w-full "
                    name="event-title"
                    id="event-title"
                  />
                </label>
                <div className="is-private flex flex-col gap-2 w-4/12 p-3 bg-base-100 rounded-md">
                  <div className="private-checkbox flex gap-4 items-center">
                    <span className="label-text text-lg font-semibold">
                      Is this a private event?
                    </span>

                    <input
                      type="checkbox"
                      className="toggle"
                      name="private-event"
                      id="private-event"
                    />
                  </div>
                  <span className="label-text-alt">
                    * Private events are only visible to you and your invitees
                    and will not appear on the public events page.
                  </span>
                </div>
              </div>

              <hr className="border-dashed mt-5" />

              <div className="form-description-row flex gap-8">
                <label className="form-control w-8/12">
                  <div className="label">
                    <span className="label-text text-lg">
                      Event description
                    </span>
                  </div>
                  <textarea
                    placeholder="Place your event description here"
                    className="textarea min-h-[300px] textarea-bordered w-full text-[16px]"
                    name="event-description"
                    id="event-description"
                  />
                </label>
                <div className="event-image flex flex-col gap-2 w-4/12">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text text-lg">
                        Select event cover image
                      </span>
                    </div>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full "
                    />
                    <div className="label">
                      <span className="label-text-alt">
                        Files in .png, .jpg, or .webp formats are allowed, with
                        a maximum size of 500 KB. Recommended size 1200x630
                      </span>
                    </div>
                    <div className="event-image">
                      <img
                        src="/public/dummy-img.png"
                        alt=""
                        className="aspect-40/21 object-cover mt-3 rounded-lg"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <hr className="border-dashed mt-5" />

              <div className="form-date-row flex gap-8">
                <div className="event-datetime__start flex w-3/12 ">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text text-lg">
                        Start event date & time
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="MUST BE DATEPICKER"
                      class="input input-bordered w-full "
                    />
                  </label>
                </div>
                <div className="event-datetime__end flex w-3/12">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text text-lg">
                        End event date & time
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="MUST BE DATEPICKER"
                      class="input input-bordered w-full "
                    />
                  </label>
                </div>
                <div className="event-recurring w-6/12">
                  {recurringEvent ? (
                    <div className="flex flex-row gap-8">
                      <div className="recurring__frequency flex w-1/2">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text text-lg">
                              Recurring event frequency
                            </span>
                          </div>
                          <select className="select select-bordered">
                            <option disabled selected>
                              Select frequency
                            </option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Yearly</option>
                          </select>
                        </label>
                      </div>
                      <div className="recurring__end w-1/2">
                        <label class="form-control w-full">
                          <div class="label">
                            <span class="label-text text-lg">
                              Last recurring event date
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="MUST BE DATEPICKER"
                            class="input input-bordered w-full "
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
                      onChange={() => setRecurringEvent(!recurringEvent)}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-dashed mt-3 mb-3" />

              <div className="form-invite-row flex flex-row gap-8">
                <label className="form-control w-8/12">
                  <div className="label">
                    <span className="label-text text-lg">
                      Invite participants
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Leave empty if you don't want to invite anyone"
                    className="input input-bordered w-full "
                    name="event-title"
                    id="event-title"
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
                      name="private-event"
                      id="private-event"
                    />
                  </div>
                  <span className="label-text-alt">
                    * Check this if you would like all participants to this
                    event to be able to invite other participants to it.
                  </span>
                </div>
              </div>

              <div className="form-upload-row flex gap-8 justify-between mt-5">
                <Button>Upload</Button>
                <button
                  className="btn text-lg"
                  onClick={() => setShowModal(false)}
                >
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

export default CreateEventForm;
