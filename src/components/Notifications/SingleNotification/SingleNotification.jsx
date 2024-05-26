function SingleNotification({ notification }) {
  return (
    <div className="single-notification my-5 p-3 bg-slate-100 rounded-lg">
      <div className="notification__message flex gap-4">
        <div className="avatar w-2/12">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="message w-10/12">
          <span>Ivelin Banchev invited you to "Event name lorem ipsum"</span>
        </div>
      </div>
      <div className="notification__action flex gap-4 justify-between mt-2">
        <button className="text-green-600 hover:underline">Accept</button>
        <button className="text-red-600 hover:underline">Delete</button>
        <button className="hover:underline">See event</button>
      </div>
    </div>
  );
}

export default SingleNotification;
