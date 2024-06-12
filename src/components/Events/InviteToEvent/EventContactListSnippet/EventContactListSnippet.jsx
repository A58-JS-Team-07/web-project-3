import { IoList } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import PropTypes from "prop-types";

/**
 * EventContactListSnippet component which displays the contact list snippet.
 *
 * @param {object} contactList - The contact list object.
 * @param {function} handleContactListClick - The function to handle the contact list click.
 * @returns {JSX.Element} - Rendered EventContactListSnippet component.
 */

function EventContactListSnippet({ contactList, handleContactListClick }) {
  return (
    <div className="contact-list-snippet flex flex-row w-full gap-5 justify-between bg-base-100 rounded-xl px-4 py-4">
      <h3 className="text-lg font-bold flex flex-row items-center gap-2">
        <IoList className="fill-secondary text-secondary text-2xl mt-[2px]" />
        {contactList?.listName}
      </h3>
      <IoExitOutline
        onClick={() => {
          handleContactListClick(contactList.clid);
        }}
        className="text-3xl cursor-pointer transition-all hover:fill-secondary hover:text-secondary"
      />
    </div>
  );
}

EventContactListSnippet.propTypes = {
  contactList: PropTypes.object.isRequired,
  handleContactListClick: PropTypes.func.isRequired,
};

export default EventContactListSnippet;
