import {UI} from './view.js'
const DIV = document.querySelector(".list-locations");

UI.FORM_SEARCH.addEventListener('submit', showInfoNow)
function showInfoNow () {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = UI.INPUT_SEARCH.value;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  
  UI.INPUT_SEARCH.value = ''

  fetch(url)
  	.then(result =>  result.json() )
    .then(res => {
      let value = +cityName;
      if (!res.name || value/1 == value) throw new Error ("Wrong city name");

      UI.LOCATION_NAME.textContent = `${res.name}`;
      UI.LOCATION_TEMPERATURE.textContent = `${Math.round(res.main.temp) + '°'}`;

      UI.BTN_FAVOUR.addEventListener('click', addFavour);

      UI.INPUT_SEARCH.value.replace();
    })
    .catch (error => {
      alert(error);
      UI.INPUT_SEARCH.value.replace();
    })
  
}


function addFavour () {
  const DIV_FAVOUR = document.createElement('div');
  DIV_FAVOUR.className = 'favour_elem';
  DIV_FAVOUR.innerHTML = `
  <span class="loc-elem"> ${UI.LOCATION_NAME.textContent} </span> 
  <button class="btn-delete"> <img src="./img/delete-icon.svg" alt="-"> </button>
  `
  DIV.append(DIV_FAVOUR);

  DIV_FAVOUR.querySelector('.btn-delete').addEventListener('click', deleteFavour);
  DIV_FAVOUR.querySelector('.loc-elem').addEventListener('click', showInfoNow)  // тык на избранный город.. но проблема - cityName теперь не значение инпута..

}

function deleteFavour () {
  this.parentElement.remove();
}


