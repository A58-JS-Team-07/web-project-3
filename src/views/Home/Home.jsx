import Button from "../../components/Button/Button";

function Home() {
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
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-white">
                Hello there
              </h1>
              <p className="mb-5 text-xl text-white">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="info__section flex flex-row gap-14 pt-20 px-14">
        <div className="flex">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-4xl font-bold">What is this?</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nisl sit amet aliquam aliquam, nunc sapien luctus felis,
            nec gravida nunc felis quis odio. Nullam nec nunc nec nunc
            efficitur.
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row-reverse gap-14 pt-20 px-14">
        <div className="flex">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-4xl font-bold">What is this?</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nisl sit amet aliquam aliquam, nunc sapien luctus felis,
            nec gravida nunc felis quis odio. Nullam nec nunc nec nunc
            efficitur.
          </p>
        </div>
      </div>
      <div className="info__section flex flex-row gap-14 py-20 px-14">
        <div className="flex justify-end">
          <img
            src="/public/dummy-img.png"
            className="max-3xl rounded-lg shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-4xl font-bold">What is this?</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada, nisl sit amet aliquam aliquam, nunc sapien luctus felis,
            nec gravida nunc felis quis odio. Nullam nec nunc nec nunc
            efficitur.
          </p>
        </div>
      </div>
      <div className="cta__section flex flex-row pb-20 px-14">
        <div className="p-20 bg-accent w-full text-white rounded-3xl gap-4 flex flex-col items-start">
          <h2 className="text-4xl font-bold">Call to Action</h2>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada.
          </p>
          <Button>Get Started</Button>
        </div>
      </div>
    </>
  );
}

export default Home;
