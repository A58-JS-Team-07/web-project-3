import Button from "../../components/Button/Button";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {   
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidName, 
} from "../../common/constants";
import { updateUser } from "../../services/users.service";
import { toast } from "react-toastify";

function Profile() {
  const { userData, setAppState } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({ ...userData });

  const updateForm = (prop) => (e) => {
    setNewUserData({
      ...newUserData,
      [prop]: e.target.value,
    });
  };

  const saveChanges = async () => {
    if (!isValidName(newUserData.firstName)) {
      toast.error("First name must be between 1 and 30 characters and contain only letters!");
      return;
    }

    if (!isValidName(newUserData.lastName)) {
      toast.error("Last name must be between 1 and 30 characters and contain only letters!");
      return;
    }

    if (!isValidPhoneNumber(newUserData.phoneNumber)) {
      toast.error("Phone number must be valid phone number with 10 digits!");
      return;
    }

    if (!isValidEmail(newUserData.email)) {
      toast.error("Please enter a valid email address!");
    }

    if (newUserData.username.length < MIN_USERNAME_LENGTH ||
      newUserData.username.length > MAX_USERNAME_LENGTH) {
      toast.error("Username must be between 3 and 30 characters!");
      return;
    }

    setIsEditing(false);
    await updateUser(userData.username, newUserData);
    setAppState((prevState) => ({ ...prevState, userData: newUserData }));
  };


  const cancelChanges = () => {
    setIsEditing(false);
    setNewUserData(userData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">Profile</h1>
      <div className="__container bg-base-200 flex flex-row w-full h-full p-20 gap-10 rounded-2xl">
        <div className="inner__container bg-base-100 w-1/3 min-w-1/2 p-20 rounded-3xl  ">
          <div className="avatar">
            <div className="w-64 rounded-xl">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="form-upload-avatar-row flex gap-8 justify-between mt-5">
            <Button>Change Avatar</Button>
          </div>
        </div>
        <div className="inner__container bg-base-100 w-2/3 min-w-1/2 p-20 rounded-3xl">
          {!isEditing ? (
            <>
              <h1 className="text-2xl pb-3 font-semibold b-2">Profile information</h1>
              <label className="label text-lg ">First name: {userData?.firstName}</label>
              <label className="label text-lg ">Last name: {userData?.lastName}</label>
              <label className="label text-lg ">Username: {userData?.username}</label>
              <label className="label text-lg ">Email: {userData?.email}</label>
              <label className="label text-lg ">Phone: {userData?.phoneNumber}</label>
              {userData?.address && (
                <label className="label text-lg ">Address: {userData?.address}</label>
              )}
              <div className="form-upload-row flex gap-8 justify-between mt-5">
                <Button onClick={() => setIsEditing(true)}>Update Profile</Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 p-3">
                <input
                  className="input input-bordered"
                  value={newUserData.firstName}
                  onChange={updateForm("firstName")}
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <input
                  className="input input-bordered"
                  value={newUserData.lastName}
                  onChange={updateForm("lastName")}
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  name="lastName"
                />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <input
                  className="input input-bordered"
                  value={newUserData.email}
                  onChange={updateForm("email")}
                  placeholder="Email"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <input
                  className="input input-bordered"
                  value={newUserData.phoneNumber}
                  onChange={updateForm("phoneNumber")}
                  placeholder="Phone number"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                />
              </div>
              <div className="flex flex-col gap-2 p-3">
                <input
                  className="input input-bordered"
                  value={newUserData.address}
                  onChange={updateForm("address")}
                  placeholder="City, Country"
                  type="text"
                  id="address"
                  name="address"
                />
              </div>
              <div className="form-update-row flex gap-8 justify-between mt-5">
                <Button
                onClick={() => saveChanges()}
                >Save Changes</Button>
                <button
                className="btn text-lg"
                onClick={() => cancelChanges()}
                >Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // (
  //   <div>
  //     <h2 className="text-3xl font-bold mb-5">Profile</h2>
      // <div className="is-private flex flex-col gap-2 w-4/12 p-3 bg-base-100 rounded-md">
      //   <div className="private-checkbox flex gap-4 items-center">
      //     <span className="label-text text-lg font-semibold">
      //       Allow others to invite me to events
      //     </span>

      //     <input
      //       type="checkbox"
      //       className="toggle"
      //       name="private-event"
      //       id="private-event"
      //     />
      //   </div>
      //   <span className="label-text-alt">
      //     * You have the option to opt-out of events invitations.
      //   </span>
      // </div>
  //   </div>
  // )
}

export default Profile;