import Button from "../../components/Button/Button";

function LoginRegister() {
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
            <input type="password" id="password" name="password" />
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
                id="email"
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
                id="password"
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
