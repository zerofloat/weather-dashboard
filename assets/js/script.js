var city;
var cityInput;
var key;
var currentWeatherURL;
var fiveDayForecastURL;
var todayDate;
var todayDiv;
var todayHeading;
var cityCurrentTemp;
var cityCurrentWind;
var cityCurrentHum;

console.log('JS loaded');

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)};


$('#search-button').on('click' , function () {
    event.preventDefault();
    cityInput = $('#search-input').val().trim();
    city = capitalizeFirstLetter(cityInput);
    console.log(city);
    key = 'e7868cd101d6d925934597a0f7faa75e';
    currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}`;
    fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}`;

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#today').empty();
            todayDate = dayjs().format('DD/MM/YYYY');
            cityCurrentTemp = 'Temp: ' + (data.main.temp - 273.15).toFixed(2) + ' \u00B0C';
            cityCurrentWind = 'Wind: ' + data.wind.speed.toFixed(1) + ' KPH';
            cityCurrentHum = 'Humidity: ' + data.main.humidity + '%';
            cityCurrentIcon = data.main.icon;
            
            
            todayDiv = $('#today');
            todayHeading = $('<h3>').text(`${city} (${todayDate}) ${cityCurrentIcon}`);
            todayDiv.append(todayHeading);
            console.log(cityCurrentWind);
        })
})