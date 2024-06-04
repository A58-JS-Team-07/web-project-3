import { useState } from "react";
import { inviteUsers } from "../../../services/invites.service";

function InviteToEvent({
  eventId,
  invitingUsername,
  invitingModal,
  setInvitingModal,
}) {
  const [formName, setFormName] = useState("");

  function updateForm(e) {
    setFormName(e.target.value);
    console.log("formName: ", formName);
  }

  function handleInviteUser() {
    inviteUsers(eventId, invitingUsername, formName);
    setInvitingModal(false);
  }

  return (
    <div>
      {invitingModal && (
        <div className="invitingModal bg-slate-400 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 flex flex-col items-center justify-center">
          <h2>Invite to Event</h2>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formName}
            onChange={updateForm}
          />
          <button type="submit" onClick={handleInviteUser}>
            Invite
          </button>
        </div>
      )}
    </div>
  );
}

export default InviteToEvent;
