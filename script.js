const apiKey = "61c969272cbc0c161dd7f72a3093aef8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search-box input");
const searchbtn = document.querySelector(".search-box button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?units=metric&q=${city}&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".window").style.display="none";
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod === 200) {
      document.querySelector(".cities").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".percentage").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind-speed-percentage").innerHTML = data.wind.speed + " km/hr";
      if(data.weather[0].main=="Clouds"){
        weatherIcon.src="clouds.png";


      }
      else if(data.weather[0].main="Clear"){
        weatherIcon.src="/clear.png";
      }
      else if(data.weather[0].main="Rain"){
        weatherIcon.src="/rain.png";
      }
      else if(data.weather[0].main="Drizzle"){
        weatherIcon.src="/drizzle.png";
      }
      else if(data.weather[0].main="Mist"){
        weatherIcon.src="/mist.png";
      }
    } else {

      console.error(`Error from API: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
