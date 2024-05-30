import propsType from "prop-types";

function UserSnippet({ user }) {
  return (
    <div className="event-organizer-data flex flex-row gap-4 bg-base-100 px-4 py-3 rounded-xl">
      <img
        src={user?.avatar}
        alt={user?.firstName + " " + user?.lastName}
        className="rounded-full w-14 h-14 object-cover flex flex-col justify-center"
      />
      <div className="event-organizer-user-info flex flex-col">
        <span className="text-lg font-semibold mb-[-3px]">
          {user?.firstName + " " + user?.lastName}
        </span>
        <span>{"@" + user?.username}</span>
      </div>
    </div>
  );
}

UserSnippet.propTypes = {
  user: propsType.object.isRequired,
};

export default UserSnippet;
