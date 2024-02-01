var city;
var cityInput;
var key;
var currentWeatherURL;
var fiveDayForecastURL;
var iconURL;
var image;
var todayDate;
var todayDiv;
var todayHeading;
var cityCurrentTemp;
var cityCurrentWind;
var cityCurrentHum;
var currentTempEl;
var currentWindEl;
var currentHumEl;

console.log('JS loaded');

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)};


$('#search-button').on('click' , function () {
    event.preventDefault();
    cityInput = $('#search-input').val().trim();
    city = capitalizeFirstLetter(cityInput);
    key = 'e7868cd101d6d925934597a0f7faa75e';
    currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}`;
    fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}`;

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            if (data.cod !== '404') {
            $('#today').empty();
            todayDate = dayjs().format('DD/MM/YYYY');
            cityCurrentTemp = 'Temp: ' + (data.main.temp - 273.15).toFixed(2) + ' \u00B0C';
            cityCurrentWind = 'Wind: ' + data.wind.speed.toFixed(1) + ' KPH';
            cityCurrentHum = 'Humidity: ' + data.main.humidity + '%';
            cityCurrentIcon = data.weather[0].icon;
            console.log(cityCurrentIcon);
            iconURL = `https://openweathermap.org/img/wn/${cityCurrentIcon}@2x.png`;
            
            
            todayDiv = $('#today');
            iconImage = $('<img>').attr('src', iconURL);
            todayHeading = $('<h2>').text(`${city} (${todayDate})`).append(iconImage);
            currentTempEl = $('<p>').text(`${cityCurrentTemp}`);
            currentWindEl = $('<p>').text(`${cityCurrentWind}`);
            currentHumEl = $('<p>').text(`${cityCurrentHum}`);

            todayDiv.append(todayHeading, currentTempEl, currentWindEl, currentHumEl);

        } else {
            todayDiv = $('#today');
            todayHeading = $('<h2>').text(`${city} is not a city, please try again!`);
            todayDiv.append(todayHeading);
        }

        })
})