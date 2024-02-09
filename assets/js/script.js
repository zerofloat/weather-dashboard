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
var forecastEach;
var forecastObj = {};
var forecastArray = [];
var forecastContainer;
var forecastDiv;
var forecastIcon;
var forecastIconURL;
var forecastImg;
var forecastTemp;
var forecastWind;
var forecastHum;
var forecastTempEl;
var forecastWindEl;
var forecastHumEl;
var forecastDate;
var forecastDateEl;

console.log('JS loaded');

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
};

//get user input and API vars
$('#search-button').on('click', function () {
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
            //validate city input then concatenate fetched data into strings to store
            if (data.cod !== '404') {
                $('#today').empty();
                todayDate = dayjs().format('DD/MM/YYYY');
                cityCurrentTemp = 'Temp: ' + (data.main.temp - 273.15).toFixed(2) + ' \u00B0C';
                cityCurrentWind = 'Wind: ' + data.wind.speed.toFixed(1) + ' KPH';
                cityCurrentHum = 'Humidity: ' + data.main.humidity + '%';
                cityCurrentIcon = data.weather[0].icon;
                iconURL = `https://openweathermap.org/img/wn/${cityCurrentIcon}@2x.png`;

                //create elements for stored strings
                todayDiv = $('#today');
                iconImage = $('<img>').attr('src', iconURL);
                todayHeading = $('<h2>').text(`${city} (${todayDate})`).append(iconImage);
                currentTempEl = $('<p>').text(`${cityCurrentTemp}`);
                currentWindEl = $('<p>').text(`${cityCurrentWind}`);
                currentHumEl = $('<p>').text(`${cityCurrentHum}`);

                //render to page
                todayDiv.append(todayHeading, currentTempEl, currentWindEl, currentHumEl);
                //if failed input validation
            } else {
                $('#today').empty();
                todayDiv = $('#today');
                todayHeading = $('<h2>').text(`${city} is not a city, please try again!`);
                todayDiv.append(todayHeading);
            }

        })
    fetch(fiveDayForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            forecastArray = [];
            forecastDiv = document.getElementById("forecast");
            // forecastDiv.classList.toggle("hide");
            console.log(data.list[0].weather[0].icon);


            //  = data.weather.icon;
            // forecastIconURL = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
            // forecastImg = $('<img>').attr('src', forecastIconURL);
            //iterate through loop to store each forecast obj in array for next 5 days
            for (let i = 0; i < 5; i++) {
                //iterable for each day of forecast
                forecastEach = data.list[i];
                forecastObj = {
                    city: city,
                    temperature: forecastEach.main.temp,
                    wind_speed: forecastEach.wind.speed,
                    humidity: forecastEach.main.humidity,
                    icon: forecastEach.weather[0].icon

                };
                //push five day forecast to localStorage
                forecastArray = JSON.parse(localStorage.getItem('forecastArray')) || [];
                forecastArray.push(forecastObj);
                localStorage.setItem('forecastArray', JSON.stringify(forecastArray));

                // //create elements for stored strings

                console.log(forecastObj['icon']);
                
                forecastDiv = $('#forecast').attr('class', 'card');

                forecastDate = dayjs();
                forecastImg = $('<img>').attr({
                    'src': `https://openweathermap.org/img/wn/${forecastObj['icon']}@2x.png`,
                    'id' : 'forecast-image'
                });
                forecastDateIncr = forecastDate.add([i], 'day').format('DD/MM/YYYY');
                forecastDateEl = $('<h5>').text(forecastDateIncr).append(forecastImg);
                forecastTempEl = $('<p>').text('Temp: ' + (forecastArray[i]['temperature'] - 273.15).toFixed(2) + '\u00B0C');
                forecastWindEl = $('<p>').text('Wind: ' + forecastArray[i]['wind_speed'].toFixed(1) + ' KPH');
                forecastHumEl =  $('<p>').text('Humidity: ' + forecastArray[i]['humidity'] + '%');
                forecastDiv.append(forecastDateEl, forecastImg, forecastTempEl, forecastWindEl, forecastHumEl);



                // cityCurrentTemp = 'Temp: ' + (data.main.temp - 273.15).toFixed(2) + ' \u00B0C';
                // cityCurrentWind = 'Wind: ' + data.wind.speed.toFixed(1) + ' KPH';
                // cityCurrentHum = 'Humidity: ' + data.main.humidity + '%';
                
                
                // iconImage = $('<img>').attr('src', iconURL);
                // todayHeading = $('<h2>').text(`${city} (${todayDate})`).append(iconImage);
                // currentTempEl = $('<p>').text(`${cityCurrentTemp}`);
                // currentWindEl = $('<p>').text(`${cityCurrentWind}`);
                // currentHumEl = $('<p>').text(`${cityCurrentHum}`);
                // // forecastDiv.append




            }
        }
        )

})

$('#clear-button').on('click', function () {
    event.preventDefault;
    localStorage.clear();
})
