import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import { AppContext } from "../../context/AppContext";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidName,
} from "../../common/constants";
import { createUser, getUserByUsername } from "../../services/users.service";
import { auth } from "../../config/firebase-config";
import { loginUser, registerUser } from "../../services/auth.service";
import { updateProfile } from "firebase/auth";

function LoginRegister() {
  const [activeTab, setActiveTab] = useState("login");

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/") : null;
  }, [user, navigate]);

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const onRegister = async () => {
    if (!form.firstName) {
      toast.error("First name is required");
      return;
    }

    if (!form.lastName) {
      toast.error("Last name is required");
      return;
    }

    if (!form.username) {
      toast.error("Username is required");
      return;
    }

    if (!form.email) {
      toast.error("Email is required");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    if (!isValidPhoneNumber(form.phoneNumber)) {
      toast.error("Phone number must be valid phone number with 10 digits!");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address!");
    }

    if (
      form.username.length < MIN_USERNAME_LENGTH ||
      form.username.length > MAX_USERNAME_LENGTH
    ) {
      toast.error("Username must be between 3 and 30 characters!");
      return;
    }

    if (!isValidPassword(form.password)) {
      toast.error(
        "Password must be between 8 and 30 characters and must include at least one number and one symbol!"
      );
      return;
    }

    if (!isValidName(form.firstName)) {
      toast.error(
        "First name must be between 1 and 30 characters and contain only letters!"
      );
      return;
    }

    if (!isValidName(form.lastName)) {
      toast.error(
        "Last name must be between 1 and 30 characters and contain only letters!"
      );
      return;
    }
    try {
      setLoading(true);

      const snapshot = await getUserByUsername(form.username);
      if (snapshot.exists()) {
        toast.error("Username already exists!");
        setLoading(false);
        return;
      }

      const credential = await registerUser(form.email, form.password); // Register the user with email and password and get the credential object, which contains the user object in following format: { user: { uid, email, ... } }
      console.log(credential);
      await createUser(
        form.username,
        credential.user.uid,
        credential.user.email,
        form.phoneNumber,
        form.firstName,
        form.lastName
      ); // Create a user in the database with the provided data
      setAppState({ ...credential.user }); // Set the user object in the context
      await updateProfile(auth.currentUser, { displayName: form.username }); // Update the user's display name with the provided username
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email has already been used!");
      } else if (error.code === "auth/weak-password") {
        console.error(
          "Password must be between 8 and 30 characters and must include at least one number and one symbol!"
        );
      } else if (error.code === "auth/invalid-email") {
        console.error('"Please enter a valid email address!');
      } else {
        console.error(`${error.message}`);
      }
    }
    setLoading(false);
  };

  const onLogin = async () => {
    try {
      if (form.email === "" || form.password === "") {
        toast.error("Please fill in all fields!");
        return;
      }

      if (!isValidEmail(form.email)) {
        toast.error("Please enter a valid email address!");
      }

      setLoading(true);
      console.log(form.email, form.password);
      const credential = await loginUser(form.email, form.password);
      setAppState({ ...credential.user, userData: null }); //we set the userData to null because we don't have it yet
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row min-h-[83vh]">
      <div className="left w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Get started</h1>
        <p className="max-w-[600px] text-center mb-4">
          Log in to your account to unlock the full potential of our platform.
          If you don&apos;t have an account yet, creating one is quick and easy.
        </p>
        <div className="switcher flex flex-row bg-neutral-200 rounded-full shadow-lg mt-2 mb-5">
          <div
            className={`switcher__item login px-6 py-3 rounded-full text-lg min-w-[140px] text-center ${
              activeTab === "login"
                ? "bg-secondary text-white"
                : "bg-neutral-200 text-black"
            } transition-colors duration-300`}
            onClick={() => changeTab("login")}
          >
            Login
          </div>
          <div
            className={`switcher__item register px-6 py-3 rounded-full text-lg min-w-[140px] text-center ${
              activeTab === "register"
                ? "bg-secondary text-white"
                : "bg-neutral-200 text-black"
            } transition-colors duration-300`}
            onClick={() => changeTab("register")}
          >
            Register
          </div>
        </div>

        {activeTab === "login" ? (
          <div className="loginSection min-h-[400px] w-2/3">
            <div className="login__form gap-4 flex flex-col">
              <div className="login__form-group">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    value={form.email}
                    onChange={updateForm("email")}
                    type="text"
                    className="grow"
                    placeholder="Email"
                  />
                </label>
              </div>
              <div className="login__form-group">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    value={form.password}
                    onChange={updateForm("password")}
                    type="password"
                    className="grow"
                  />
                </label>
              </div>
              <Button onClick={onLogin}>Login</Button>
            </div>
          </div>
        ) : (
          <div className="registerSection min-h-[400px] w-2/3">
            <div className="register__form gap-4 flex flex-col">
              <div className="register__row">
                <div className="flex row gap-4">
                  <div className="register__form-group w-full">
                    <input
                      value={form.firstName}
                      onChange={updateForm("firstName")}
                      type="text"
                      placeholder="First name"
                      className="input input-bordered w-full"
                      name="firstName"
                    />
                  </div>
                  <div className="register__form-group w-full">
                    <input
                      value={form.lastName}
                      onChange={updateForm("lastName")}
                      type="text"
                      placeholder="Last name"
                      className="input input-bordered w-full"
                      name="lastName"
                    />
                  </div>
                </div>
              </div>
              <div className="register__row">
                <div className="register__form-group">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      value={form.username}
                      onChange={updateForm("username")}
                      type="text"
                      className="grow"
                      placeholder="Username"
                    />
                  </label>
                </div>
              </div>
              <div className="register__row">
                <div className="register__form-group">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      value={form.email}
                      onChange={updateForm("email")}
                      type="text"
                      className="grow"
                      placeholder="Email"
                    />
                  </label>
                </div>
              </div>
              <div className="register__row">
                <div className="register__form-group">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-[16px] h-[14px] opacity-70"
                    >
                      <path
                        transform="scale(0.03) translate(12, 12)"
                        d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      />
                    </svg>

                    <input
                      value={form.phoneNumber}
                      onChange={updateForm("phoneNumber")}
                      type="text"
                      className="grow"
                      placeholder="Phone"
                    />
                  </label>
                </div>
              </div>
              <div className="register__row">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    value={form.password}
                    onChange={updateForm("password")}
                    type="password"
                    className="grow"
                  />
                </label>
              </div>
              <Button onClick={onRegister}>Register</Button>
            </div>
          </div>
        )}
      </div>
      <div
        className="right w-1/2 bg-cover bg-center rounded-tl-3xl rounded-bl-3xl"
        style={{ backgroundImage: "url('/public/login-bg.jpg')" }}
      ></div>
    </div>
  );
}

export default LoginRegister;
