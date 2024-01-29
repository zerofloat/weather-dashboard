console.log("JS loaded");
var city = $("search-input").val();
// .val().trim();
console.log(city);
var key = "e7868cd101d6d925934597a0f7faa75e";
var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;