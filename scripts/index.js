let searchBtn = document.getElementById("search-btn");
let resetBtn = document.getElementById("reset-btn"); // Added reset button
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

searchBtn.addEventListener("click", searchCountry);
resetBtn.addEventListener("click", resetSearch); // Added event listener for reset button

function searchCountry() {
  let countryName = countryInp.value;
  let countryAPI = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  let weatherAPI = `https://api.weatherapi.com/v1/current.json?key=ad701a3ddab848728af73723240104&q=${countryName}`;

  fetch(countryAPI)
    .then((response) => response.json())
    .then((countryData) => {
      let countryInfo = `
        <img src="${countryData[0].flags.svg}" class="flag-img">
        <h2>${countryData[0].name.common}</h2>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${countryData[0].capital[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${countryData[0].continents[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${countryData[0].population}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${countryData[0].currencies[Object.keys(countryData[0].currencies)].name} - ${Object.keys(countryData[0].currencies)[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(countryData[0].languages).toString().split(",").join(", ")}</span>
          </div>
        </div>
        <button class="more-details-btn">More Details</button>
      `;
      result.innerHTML = countryInfo;

      let moreDetailsBtn = document.querySelector('.more-details-btn');
      moreDetailsBtn.addEventListener('click', () => {
        fetch(weatherAPI)
          .then((response) => response.json())
          .then((weatherData) => {
            let weatherInfo = `
              <h2>Weather in ${weatherData.location.name}, ${weatherData.location.country}</h2>
              <div class="data-wrapper">
                <h4>Temperature:</h4>
                <span>${weatherData.current.temp_c}°C</span>
              </div>
              <div class="data-wrapper">
                <h4>Condition:</h4>
                <span>${weatherData.current.condition.text}</span>
              </div>
              <div class="data-wrapper">
                <h4>Wind Speed:</h4>
                <span>${weatherData.current.wind_kph} km/h</span>
              </div>
              <div class="data-wrapper">
                <h4>Humidity:</h4>
                <span>${weatherData.current.humidity}%</span>
              </div>
            `;
            result.innerHTML += weatherInfo;
          })
          .catch((error) => console.error('Error fetching weather data:', error));
      });
    })
    .catch((error) => console.error('Error fetching country data:', error));
}

function resetSearch() {
  result.innerHTML = ''; // Clear the result area
  countryInp.value = ''; // Clear the country input field
}
