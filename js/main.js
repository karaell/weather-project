import { UI, NOW, DETAILS } from './view.js';
import { storage } from  './storage.js'

let favorite_list = [];
storage.setFavoritesToStorage(favorite_list)

const URL = {
  SERVER: 'http://api.openweathermap.org/data/2.5/weather',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

UI.FORM_SEARCH.addEventListener('submit', getWeatherData)

function getWeatherData () {
  const cityName = UI.INPUT_SEARCH.value;
  const url = `${URL.SERVER}?q=${cityName}&appid=${URL.API_KEY}&units=metric`; 

  fetch(url)
  	.then(result =>  result.json() )
    .then(renderWeather)
    .catch (alert)
    .finally (() => UI.FORM_SEARCH.reset())
  
}

const renderWeather = res => {
    const isCityNotExist = !res.name;
    if (isCityNotExist) throw new Error ("Wrong city name");

    NOW.LOCATION_NAME.textContent = res.name;
    NOW.LOCATION_TEMPERATURE.textContent = Math.round(res.main.temp) + '°';

    DETAILS.LOCATION.textContent = res.name;
    DETAILS.TEMPERATURE.textContent = 'Temperature: ' + Math.round(res.main.temp) + '°';
    DETAILS.FEELS_LIKE.textContent = 'Feels like: ' + Math.round(res.main.feels_like) + '°';
    DETAILS.WEATHER.textContent = 'Weather: ' + res.weather[0].main;
    DETAILS.SUNRISE.textContent = 'Sunrise: ' + res.sys.sunrise;
    DETAILS.SUNSET.textContent = 'Sunset: ' + res.sys.sunset;
}


UI.BTN_FAVORITE.addEventListener('click', addFavour);
function addFavour () {


  /* for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    if (key === UI.LOCATION_NAME.textContent) return;
  } */


  /* const DIV_FAVORITE = document.createElement('div');
  DIV_FAVORITE.className = 'favour_elem';
  DIV_FAVORITE.innerHTML = `
  <span class="loc-elem"> ${UI.LOCATION_NAME.textContent} </span> 
  <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="Delete icon"> </button>
  `
  UI.DIV_LIST.append(DIV_FAVORITE); */

  /* favorite_list.push(UI.LOCATION_NAME.textContent);
  storage.setFavoritesToStorage(favorite_list); */


  const array = storage.getFavoritesFromStorage()
  console.log(array)
 
  const check = array.indexOf(UI.LOCATION_NAME.textContent)
  if (check === -1) array.push(UI.LOCATION_NAME.textContent)

  array.forEach(item => {
    console.log(item)
    const DIV_FAVORITE = document.createElement('div');  
    DIV_FAVORITE.className = 'favour_elem';
    DIV_FAVORITE.innerHTML = `
    <span class="loc-elem"> ${item} </span> 
    <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="Delete icon"> </button>
    `
    UI.DIV_LIST.append(DIV_FAVORITE);

    DIV_FAVORITE.querySelector('.btn-delete').addEventListener('click', deleteFavour);
    DIV_FAVORITE.querySelector('.loc-elem').addEventListener('click', function () {
    UI.INPUT_SEARCH.value = this.textContent;
    getWeatherData ();
  }) 
  })

  storage.setFavoritesToStorage(favorite_list);





  
}

function deleteFavour () {
  localStorage.removeItem(UI.LOCATION_NAME.textContent)
  this.parentElement.remove();
}
