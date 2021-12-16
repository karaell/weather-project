import {UI} from './view.js'

UI.FORM_SEARCH.addEventListener('submit', function () {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = UI.INPUT_SEARCH.value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
	
  fetch(url)
  	.then(result =>  result.json() )
    .then(res => {
        console.log(res)
        UI.LOCATION_NAME.textContent = `${res.name}`;
        UI.LOCATION_TEMPERATURE.textContent = `${res.main.temp + '°'}`;
    })
    UI.INPUT_SEARCH.value = '';
})