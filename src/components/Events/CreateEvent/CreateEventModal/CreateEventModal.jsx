import Button from "../../../Button/Button";
import { LuCalendarPlus } from "react-icons/lu";
import CreateEventForm from "../CreateEventForm/CreateEventForm";
import { useState } from "react";

function CreateEventModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowModal(!showModal)}>
        {<LuCalendarPlus />} Create Event
      </Button>

      {showModal ? (
        <div>
          <CreateEventForm showModal={showModal} setShowModal={setShowModal} />
        </div>
      ) : null}
    </div>
  );
}

export default CreateEventModal;
