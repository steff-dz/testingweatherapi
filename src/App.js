import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
const apiKey = "7QyQRTxSHUKkC3AmiVLFfTP384kbf6";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [inputText, setInputText] = useState();
  const [city, setCity] = useState("oslo");

  function fetchWeatherData() {
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("this is our city:", inputText);
    setCity(inputText);
  }

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <>
      <main>
        <h1>My Website</h1>
        <h2>Search for a city:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="city name"
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {weatherData && (
          <article>
            <h2>Today's Weather for {city}:</h2>
            <ul>
              <li>Temperature: {weatherData.temperature}</li>
              <li>Description: {weatherData.description}</li>
              <li>
                Tomorrow: {weatherData.forecast[0].temperature}, wind:
                {weatherData.forecast[0].wind}
              </li>
              <li>In Two Days: {weatherData.forecast[1].temperature}</li>
              <li>In Three Days: {weatherData.forecast[2].temperature}</li>
            </ul>
          </article>
        )}
      </main>
    </>
  );
}

export default App;
