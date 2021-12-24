export const UI = {
    FORM_SEARCH: document.querySelector(".weather__search"),
	INPUT_SEARCH: document.querySelector(".input-search"),
    BTN_FAVORITE: document.querySelector(".btn-favour"),
    BTNS_DELETE: document.querySelectorAll(".btn-delete"),
    DIV_LIST: document.querySelector(".list-locations"),
}

export const NOW = {
    LOCATION_NAME: document.querySelector(".now-location"),
    LOCATION_TEMPERATURE: document.querySelector(".temperature"),
    ICON_WEATHER: document.querySelector(".icon-weather-img"),
}

export const DETAILS = {
    LOCATION: document.querySelector(".details-location"),
	TEMPERATURE: document.querySelector(".details-temperature"),
    FEELS_LIKE: document.querySelector(".details-feels-like"),
    WEATHER: document.querySelector(".details-weather"),
    SUNRISE: document.querySelector(".details-sunrise"),
    SUNSET: document.querySelector(".details-sunset"),

}

/* export const FORECASTS = {
    LOCATION: document.querySelector(".forecast-location"),
    DATE: document.querySelector(`.date-block-${i}`),
    TEMPERATURE: document.querySelector(`.temp-block-${i}`),
    FEELS_LIKE: document.querySelector(`.feelslike-block-${i}`),
    TIME: document.querySelector(`.time-block-${i}`),
    WEATHER: document.querySelector(`.weather-block-${i}`),
    ICON: document.querySelector(`.icon-block-${i}`),
  } */