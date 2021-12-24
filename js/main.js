import { UI, NOW, DETAILS } from './view.js';
import { STORAGE } from  './storage.js'

const URL = {
  SERVER: 'http://api.openweathermap.org/data/2.5/weather',
  SERVER_FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  ICON_WEATHER: 'https://openweathermap.org/img/wn/',
}

UI.INPUT_SEARCH.addEventListener('click', () => UI.FORM_SEARCH.reset())

UI.FORM_SEARCH.addEventListener('submit', getWeatherData)
function getWeatherData () {
  const CITY_NAME = UI.INPUT_SEARCH.value;
  const url = `${URL.SERVER}?q=${CITY_NAME}&appid=${URL.API_KEY}&units=metric`; 
  const urlForecast = `${URL.SERVER_FORECAST}?q=${CITY_NAME}&appid=${URL.API_KEY}&units=metric`;


  fetch(url)
  	.then(result =>  result.json())
    .then(renderWeather)
    .catch (alert)

  fetch(urlForecast)
    .then(result => result.json()) 
    .then(renderForecast)

}

const renderWeather = res => {
  const isCityNotExist = !res.name;
  if (isCityNotExist) throw new Error ("Wrong city name");

  NOW.LOCATION_NAME.textContent = res.name;
  NOW.LOCATION_TEMPERATURE.textContent = Math.round(res.main.temp) + '°';
  NOW.ICON_WEATHER.src = `${URL.ICON_WEATHER}${res.weather[0].icon}@4x.png`;

  DETAILS.LOCATION.textContent = res.name;
  DETAILS.TEMPERATURE.textContent = 'Temperature: ' + Math.round(res.main.temp) + '°';
  DETAILS.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(res.main.feels_like) + '°';
  DETAILS.WEATHER.textContent = 'Weather: ' + res.weather[0].main;
  DETAILS.SUNRISE.textContent = 'Sunrise: ' + `${convertTime(res.sys.sunrise)}`;
  DETAILS.SUNSET.textContent = 'Sunset: ' + `${convertTime(res.sys.sunset)}`;

  STORAGE.setCurrentCityToStorage (res.name)
}

const renderForecast = res => {
  for (let i = 0; i <= 2; i++) {
    const FORECASTS = {
        LOCATION: document.querySelector(".forecast-location"),
        DATE: document.querySelector(`.date-block-${i}`),
        TEMPERATURE: document.querySelector(`.temp-block-${i}`),
        FEELS_LIKE: document.querySelector(`.feelslike-block-${i}`),
        TIME: document.querySelector(`.time-block-${i}`),
        WEATHER: document.querySelector(`.weather-block-${i}`),
        ICON: document.querySelector(`.icon-block-${i}`),
      }

    FORECASTS.LOCATION.textContent = res.city.name;
    FORECASTS.DATE.textContent = `${convertDate(res.list[i].dt)}`;
    FORECASTS.TEMPERATURE.textContent = 'Temperature: ' + Math.round(res.list[i].main.temp) + '°';
    FORECASTS.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(res.list[i].main.feels_like) + '°';
    FORECASTS.TIME.textContent = `${convertTime(res.list[i].dt)}`;
    FORECASTS.WEATHER.textContent = res.list[i].weather[0].main;
    FORECASTS.ICON.src = `${URL.ICON_WEATHER}${res.list[i].weather[0].icon}@4x.png`;
  }
}

UI.BTN_FAVORITE.addEventListener('click', addToFavoriteList);
function addToFavoriteList () {
  let array = STORAGE.getFavoritesFromStorage();
  if (array === null) array = [];
  
  const currentCity = NOW.LOCATION_NAME.textContent;
  const check = array.indexOf(currentCity);
  if (check < 0) {
    array.push(currentCity);
  }

  STORAGE.setFavoritesToStorage(array);

  renderFavoriteDiv ();
}



function deleteCityFromList () {
  const array = STORAGE.getFavoritesFromStorage();
  const city = this.previousElementSibling.textContent;

  const index = array.indexOf(city);
  array.splice(index, 1);

  STORAGE.setFavoritesToStorage(array);

  renderFavoriteDiv();
}


function renderFavoriteDiv () {
  const array = STORAGE.getFavoritesFromStorage();

  UI.DIV_LIST.innerHTML = '';

  array.forEach(item => {
    const DIV_FAVORITE = document.createElement('div');  
    DIV_FAVORITE.className = 'favour_elem';
    DIV_FAVORITE.innerHTML = `
    <span class="loc-elem">${item}</span> 
    <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="Delete icon"> </button>
    `
    UI.DIV_LIST.append(DIV_FAVORITE);
    

    DIV_FAVORITE.querySelector('.btn-delete').addEventListener('click', deleteCityFromList);
    DIV_FAVORITE.querySelector('.loc-elem').addEventListener('click', function () {
    UI.INPUT_SEARCH.value = this.textContent;
    getWeatherData ();
  }) 
  })

  STORAGE.setFavoritesToStorage(array);
}

function showCurrentCity () {
  UI.INPUT_SEARCH.value = STORAGE.getCurrentCityFromStorage();
  getWeatherData();
}

function convertTime(unixTime) {
	let data = new Date(unixTime * 1000);
	let hours = data.getHours();
	let minutes = "0" + data.getMinutes();
	return hours + ':' + minutes.slice(-2);
}

function convertDate (unixDate) {
  let data = new Date(unixDate * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let date = data.getDate();
  let month = months[data.getMonth()];
	return date + ' ' + month;
}

showCurrentCity ()

renderFavoriteDiv ()