
function WeatherInfo({ weatherData }) {
  return (
    <div>
      <h1>{weatherData?.location?.name}</h1>
      <img
        src={weatherData?.current?.condition?.icon}
        alt={weatherData?.condition?.text}
      />
      <h3>{weatherData?.current?.temp_c}°C</h3>
    </div>
  );
}

export default WeatherInfo;