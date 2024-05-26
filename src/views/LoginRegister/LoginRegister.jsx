import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button.jsx";
import { AppContext } from "../../context/AppContext.jsx";


function LoginRegister() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
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
      [prop]: e.target.value
    });
  };

  const onRegister = async (event) => {
    event.preventDefault(); // Prevent the default form submit behavior which refreshes the page

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

  };
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <div className="login__form">
          <div className="login__form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="login__form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="login-password" name="password" />
          </div>
          <Button>Login</Button>
        </div>
      </div>

      <div className="register">
        <h1>Register</h1>
        <div className="register__form">
          <div className="register__row">
            <div className="register__form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="register__form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
          <div className="register__row">
            <div className="register__form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
              />
            </div>
          </div>
          <div className="register__row">
            <div className="register__form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="register-email"
                name="email"
              />
            </div>
          </div>
          <div className="register__row">
            <div className="register__form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                id="phone"
                name="phone"
              />
            </div>
          </div>
          <div className="register__row">
            <div className="register__form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
              />
            </div>
          </div>
          <Button>Register</Button>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
