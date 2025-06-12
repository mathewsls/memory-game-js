const apiKey = '6a50729a2f3849f5376762e0730e093b';

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';



searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location){
      fetchWeather(location);
    }
});


function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;



  fetch(url)
    .then(response  => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(error => {
      console.error("error fetching the weather data: " + error);
    })
}

