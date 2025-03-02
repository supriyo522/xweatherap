import React, { useState } from "react";
import "./WeatherApp.css"; // Importing the CSS file

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return; // Prevent empty input requests

    setLoading(true);
    setError(null);
    setWeather(null);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=7fe930aff8a74a67b5862053250203&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error("Invalid city name, please try again.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      console.error("Weather API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {/* Show loading message */}
      {loading && <p className="loading">Loading data...</p>}

      {/* Show error message */}
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      {/* Show weather details in 1 row & 4 columns */}
      {weather && weather.current && weather.location && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
