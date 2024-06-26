import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUser } from "../../services/users.service";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  isValidEmail,
  isValidPhoneNumber,
  isValidName,
  } from "../../common/constants";
  import { uploadAvatar } from "../../services/storage.service";
  import Button from "../../components/Button/Button";
import { toast } from "react-toastify";

function Profile() {
  const { userData, setAppState } = useContext(AppContext);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newUserData, setNewUserData] = useState({...userData});
  const [avatarUpload, setAvatarUpload] = useState(null);

  const updateForm = (prop) => (e) => {
    setNewUserData({
      ...newUserData,
      [prop]: e.target.value,
    });
  };

  const saveChanges = async () => {
    if (!isValidName(newUserData.firstName)) {
      toast.error(
        "First name must be between 1 and 30 characters and contain only letters!"
      );
      return;
    }

    if (!isValidName(newUserData.lastName)) {
      toast.error(
        "Last name must be between 1 and 30 characters and contain only letters!"
      );
      return;
    }

    if (!isValidPhoneNumber(newUserData.phoneNumber)) {
      toast.error("Phone number must be valid phone number with 10 digits!");
      return;
    }

    if (!isValidEmail(newUserData.email)) {
      toast.error("Please enter a valid email address!");
    }

    if (
      newUserData.username.length < MIN_USERNAME_LENGTH ||
      newUserData.username.length > MAX_USERNAME_LENGTH
    ) {
      toast.error("Username must be between 3 and 30 characters!");
      return;
    }

    setIsEditingProfile(false);
    await updateUser(userData.username, newUserData);
  };

  const cancelChanges = () => {
    setIsEditingProfile(false);
    setNewUserData(userData);
  };

  const handleAvatarUpload = async () => {
    if (!avatarUpload) {
      toast.error("Please select an image to upload!");
      return;
    }
    const avatarId = await uploadAvatar(avatarUpload, userData);

    setAppState((prevState) => ({
      ...prevState,
      userData: { ...userData, avatar: avatarId },
    }));

    setIsEditingAvatar(false);
  };

  return (
    <div className="p-6 min-h-[92%]">
      <h1 className="text-3xl font-bold mb-5">Profile</h1>
      <div className="__container bg-base-200 flex flex-row w-full h-full p-10 gap-10 rounded-2xl">
        <div className="inner__container bg-base-100 w-1/3 min-w-1/2 p-10 rounded-3xl flex flex-col items-center ">
          <h2 className="text-lg font-semibold flex flex-col px-3 pt-2 pb-2">
            {"Hi " + userData?.firstName + " " + userData?.lastName + ","}
          </h2>
          {!isEditingAvatar ? (
            <>
              <div className="avatar">
                <div className="w-64 rounded-xl">
                  {!userData?.avatar ? (
                    <>
                      <img
                        className="aspect-square object-cover rounded-full"
                        src="/anonymous-avatar.jpg"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="aspect-square object-cover rounded-full"
                        src={userData.avatar}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="form-update-row flex gap-8 justify-between mt-5">
                <Button onClick={() => setIsEditingAvatar(true)}>
                  Change Avatar
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold px-3 pt-2 pb-2 mb-1">
                Upload Avatar
              </h2>
              <div className="form-upload-avatar-row flex flex-col gap-2 justify-between mt-5">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  name="event-image"
                  id="event-image"
                  onChange={(e) => {
                    setAvatarUpload(e.target.files[0]);
                  }}
                />
                <div className="form-update-row flex gap-8 justify-between mt-5">
                  <Button onClick={() => handleAvatarUpload()}>
                    Save Avatar
                  </Button>
                  <button
                    className="btn text-lg"
                    onClick={() => setIsEditingAvatar(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="inner__container bg-base-100 w-2/3 min-w-1/2 p-12 rounded-3xl flex flex-col justify-between">
          {!isEditingProfile ? (
            <>
              <div>
                <h2 className="text-3xl pb-3 font-semibold mb-2">
                  Profile information
                </h2>
                <div className="profile__info text-xl max-h-[500px] flex flex-col gap-1">
                  <label className="label ">
                    First name: {userData?.firstName}
                  </label>
                  <label className="label">
                    Last name: {userData?.lastName}
                  </label>
                  <label className="label ">
                    Username: {userData?.username}
                  </label>
                  <label className="label">Email: {userData?.email}</label>
                  <label className="label ">
                    Phone: {userData?.phoneNumber}
                  </label>
                  {userData?.address && (
                    <label className="label">
                      Address: {userData?.address}
                    </label>
                  )}
                </div>
              </div>
              <div className="form-upload-row flex gap-8 justify-between mt-5">
                <Button onClick={() => setIsEditingProfile(true)}>
                  Update Profile
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-3xl pb-3 font-semibold mb-2 ">
                  Edit profile information
                </h2>
                <div className="profile__edit flex flex-col gap-4">
                  <div className="flex flex-col gap-2 ">
                    <input
                      className="input input-bordered"
                      value={newUserData?.firstName}
                      onChange={updateForm("firstName")}
                      placeholder="First Name"
                      type="text"
                      id="firstName"
                      name="firstName"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="input input-bordered"
                      value={newUserData?.lastName}
                      onChange={updateForm("lastName")}
                      placeholder="Last Name"
                      type="text"
                      id="lastName"
                      name="lastName"
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <input
                      className="input input-bordered"
                      value={newUserData?.email}
                      onChange={updateForm("email")}
                      placeholder="Email"
                      type="text"
                      id="email"
                      name="email"
                    />
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <input
                      className="input input-bordered"
                      value={newUserData?.phoneNumber}
                      onChange={updateForm("phoneNumber")}
                      placeholder="Phone number"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      className="input input-bordered"
                      value={newUserData?.address}
                      onChange={updateForm("address")}
                      placeholder="City"
                      type="text"
                      id="address"
                      name="address"
                    />
                  </div>
                </div>
              </div>
              <div className="form-update-row flex gap-8 justify-between mt-5">
                <Button onClick={() => saveChanges()}>Save Changes</Button>
                <button className="btn text-lg" onClick={() => cancelChanges()}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
