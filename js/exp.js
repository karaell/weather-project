   
'use strict'

import {UI} from './view.js'

let addedLocationsArray =[];

let globalCityName;

  UI.btn.addEventListener('click',change);

  UI.heart_picture.style.display = 'none';
  UI.heart_picture.addEventListener('click', addLocationFunc);

  addDeleteElement();


  function addDeleteElement(){
    const deleteLocationIcon = document.querySelectorAll('.close');
   
  deleteLocationIcon.forEach(function(btn){
    btn.addEventListener('click',deleteLocationFunc);
})
}

  function deleteLocationFunc(){

  this.parentElement.remove();

   // addedLocationsArray.splice(addedLocationsArray.indexOf(this.previousElementSibling.textContent), 1);
let key = this.previousElementSibling.textContent;

localStorage.removeItem(key);
  
    
  }
  



function change(){


  if(event.target.classList.contains('nowP'))  show(showNow);
  

  if(event.target.classList.contains('detailsP'))  show(showDetails);
  

  if(event.target.classList.contains('forecastP'))  show(showForecast);
  
}



function show(id){

showNow.style.display = 'none';
showDetails.style.display = 'none';
showForecast.style.display = 'none';
  
   id.style.display='block'
}


const render = data =>{
    UI.bigCloudIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    UI.bigNumber.textContent = Math.round(data.main.temp-273);
    UI.bigNumber.textContent +='°'; 

    UI.showDetailsHeader.textContent = data.name;
    UI. detailsTemp.textContent = `Temperature: ${Math.round(data.main.temp-273)}°`;
    UI.detailsFeels.textContent= `Feels like: ${Math.round(data.main.feels_like- 273)}°`;
    UI.detailsWeather.textContent = `Weather: ${data.weather[0].main}`;
    UI.detailsSunrise.textContent = `Sunrise: ${timeTransform(data.sys.sunrise)}`;
    UI.detailsSunset.textContent = `Sunset: ${timeTransform(data.sys.sunset)}pm`;

    UI.smalSityName.textContent = data.name;

    globalCityName = UI.smalSityName.textContent;
}




 inp.addEventListener('keydown', (e) =>{
    
  
     if(e.keyCode===13){

        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        let cityName = e.target.value;                                          
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
         

        UI.heart_picture.style.display= 'block';
       
        
        fetch(url)

        .then((response) =>{

            return response.json();    
        })
        .then(render)
        .catch(error => alert(error.message))
        
        showNow.style.display = 'block';
        showDetails.style.display = 'none';
        showForecast.style.display = 'none';
     } 
 });






 function addLocationFunc(){
/*
  let doppelGanger = false;
  addedLocationsArray.forEach(elem =>{
    if(elem === globalCityName) doppelGanger = true;
  })
  if(doppelGanger) return;
*/

  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);

    if(key === globalCityName) return;
  }



  let newLocation = document.createElement('div');

  newLocation.className = 'faforedPlace';
  
  newLocation.innerHTML = ` <p class="text ">${globalCityName}</p>
  <div class="close">
      <span class="line_rotate45"></span>
      <span class="line_rotate45"></span>
  </div>`

  
  UI.displayRightDiv.append(newLocation);

 // addedLocationsArray.push(globalCityName);

  addDeleteElement();

  addToLocalStorage(globalCityName);
}


function addToLocalStorage(city){
   localStorage.setItem(globalCityName, JSON.stringify(city));
}









window.onload = function loadFromLocalStorage(){

  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);

    let newLocation = document.createElement('div');

    newLocation.className = 'faforedPlace';
    
    newLocation.innerHTML = ` <p class="text">${key}</p>
    <div class="close">
        <span class="line_rotate45"></span>
        <span class="line_rotate45"></span>
    </div>`
    UI.displayRightDiv.append(newLocation);

  

  
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    let cityName =  localStorage.key(localStorage.length-1);                                       
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;


       
    fetch(url)

    .then((response) =>{

        return response.json();    
    })
    .then(render)
    .catch(error => alert(error.message));

    addDeleteElement()
  
  }
  showNow.style.display = 'block';
  showDetails.style.display = 'none';
  showForecast.style.display = 'none';
}




function timeTransform(data){

  const date = new Date(data);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = (minutes<10) ? '0'+minutes: minutes;
  return `${hours}:${minutes}`;
}

