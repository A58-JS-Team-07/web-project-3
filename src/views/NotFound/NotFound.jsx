import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";

function NotFound() {
  return (
    <div className="hero__section">
      <div
        className="hero min-h-[83vh]"
        style={{
          backgroundImage: "url(./public/404-bg.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div className="mb-4 text-9xl font-bold text-white">404</div>
            <h1 className="mb-5 text-5xl font-bold text-white">
              Page Not Found
            </h1>
            <p className="mb-5 text-2xl text-white">
              It looks like you're lost. <br /> Let's get you back on track.
            </p>
            <NavLink to="/">
              <Button>Back to Home</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
