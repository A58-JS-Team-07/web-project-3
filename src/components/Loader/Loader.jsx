const Loader = () => {
  return (
    <div className="absolute w-full h-full bg-neutral z-10 bg-opacity-60 flex justify-center items-center">
      <span
        className="h-20 w-20 loading loading-spinner text-secondary justify-center"
        style={{ position: "absolute", height: "50%" }}
      ></span>
    </div>
  );
};

export default Loader;
