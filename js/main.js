import {UI} from './view.js'

UI.FORM_SEARCH.addEventListener('submit', showInfoNow)
function showInfoNow () {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const cityName = UI.INPUT_SEARCH.value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
  	.then(result =>  result.json() )
    .then(res => {
      let cloneCityName = +cityName;
      let isCityNotExist = !res.name || cloneCityName/1 == cloneCityName;

      if (isCityNotExist) throw new Error ("Wrong city name");

      UI.LOCATION_NAME.textContent = `${res.name}`;
      UI.LOCATION_TEMPERATURE.textContent = `${Math.round(res.main.temp) + '°'}`;

      UI.BTN_FAVOUR.addEventListener('click', addFavour);

      UI.FORM_SEARCH.reset()
    })
    .catch (error => {
      alert(error);
      UI.FORM_SEARCH.reset()
    })
  
}

function isCitySaved () {
  const LOC_LIST = document.querySelector(".list-locations");
  const isLocationSaved = LOC_LIST.textContent.includes(UI.LOCATION_NAME.textContent);

  if (isLocationSaved) {
    alert ("Location already saved");
  }
}

function addFavour () {
  isCitySaved();



  const DIV_FAVOUR = document.createElement('div');
  DIV_FAVOUR.className = 'favour_elem';
  DIV_FAVOUR.innerHTML = `
  <span class="loc-elem"> ${UI.LOCATION_NAME.textContent} </span> 
  <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="Delete icon"> </button>
  `
  UI.DIV_LIST.append(DIV_FAVOUR);

  DIV_FAVOUR.querySelector('.btn-delete').addEventListener('click', deleteFavour);
  DIV_FAVOUR.querySelector('.loc-elem').addEventListener('click', function () {
    UI.INPUT_SEARCH.value = this.textContent;
    showInfoNow ();
 }) 
}

function deleteFavour () {
  this.parentElement.remove();
}
