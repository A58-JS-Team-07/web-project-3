import { useContext } from "react";
import Button from "../../components/Button/Button";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function Home() {
  const { userData } = useContext(AppContext);

  return (
    <>
      <div className="hero__section">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(./public/hero-bg.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-5xl font-bold text-white">
                №1 Sports Event Calendar
              </h1>
              <p className="mb-5 text-xl text-white">
                Stay updated with the latest sports events. Effortlessly add
                events to your personal calendar and manage your schedule with
                ease. Never miss a game with this convenient tool.
              </p>
              {userData ? (
                <Link to="/events">
                  <Button>View All Events</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button>Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="info__section flex flex-row gap-14 pt-20 px-14">
        <div className="flex w-3/5">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 w-2/5">
          <h2 className="text-4xl font-bold">All sports events at one place</h2>
          <p className="text-lg">
            Find every sports event in one convenient platform. Stay updated,
            stay organized, and never miss out on the action!
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row-reverse gap-14 pt-20 px-14">
        <div className="flex w-3/5">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 w-2/5">
          <h2 className="text-4xl font-bold">
            Sports scheduling at its finest
          </h2>
          <p className="text-lg">
            {`Your gateway to seamless
            sports event planning! Stay ahead of the game with a clear view of
            all the events you're participating in. Never miss a beat, never
            miss a match - it's your sports schedule, simplified!`}
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row gap-14 py-20 px-14 ">
        <div className="flex justify-end w-3/5">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 w-2/5">
          <h2 className="text-4xl font-bold">Share the thrill</h2>
          <p className="text-lg">
            {`Connect, invite, and share the
            excitement with ease! Create personalized contact lists, invite
            friends to join your sports events, and make every match a memorable
            gathering. With seamless integration, coordinating with your crew
            has never been simpler!`}
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row-reverse gap-14 px-14">
        <div className="flex w-3/5">
          <img
            src="/public/Showcase/create-event.jpg"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 w-2/5">
          <h2 className="text-4xl font-bold">
            Create Your Own Sporting Spectacle
          </h2>
          <p className="text-lg">
            {`Unleash your inner sports organizer. Whether you're planning a
            public showdown for all to join or an exclusive match with invited
            friends, take charge and create the ultimate sporting spectacle.
            It's your game, your rules – let the fun begin!`}
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row gap-14 py-20 px-14 ">
        <div className="flex justify-end w-3/5">
          <img
            src="/public/Showcase/profile.jpg"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 w-2/5">
          <h2 className="text-4xl font-bold">
            All of this and more under your own personal profile
          </h2>
          <p className="text-lg">
            {`Unlock the full potential of your sports journey with our personalized profile feature! 
            Dive into a world of convenience as you access all our platform's offerings, from event management 
            to social connections, all in one place. Customizing your 
            avatar and updating profile details. Your sports experience, perfected.`}
          </p>
        </div>
      </div>
      <div className="cta__section flex flex-row pb-20 px-14">
        <div className="p-20 bg-accent w-full text-white rounded-3xl gap-4 flex flex-col items-start">
          {!userData ? (
            <>
              <h2 className="text-4xl font-bold">
                Join the Winning Team Today - Sign Up Now for Free!
              </h2>
              <p className="text-2xl">
                {`Don't miss out on the action – join our vibrant sports community
                today! Experience the thrill of seamless event management,
                personalized profiles, and connecting with fellow sports
                enthusiasts.`}
              </p>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold">
                Thank You for Being Part of Our Sports Community!
              </h2>
              <p className="text-2xl">
                Together, we create memorable sporting experiences. Stay tuned
                for exciting updates, events, and features tailored just for
                you.
              </p>
              <Link to="/events">
                <Button>View All Events</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
