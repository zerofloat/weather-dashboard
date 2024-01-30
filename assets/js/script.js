console.log("JS loaded");

$('#search-button').on('click' , function () {
    event.preventDefault();
    var city = $("#search-input").val().trim();
    console.log(city);
    var key = "e7868cd101d6d925934597a0f7faa75e";
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityWeather = data.data;
            var cityCurrentTemp = (data.main.temp - 273.15).toFixed(2) + " \u00B0C";
            var cityCurrentWind = data.wind.speed.toFixed(1) + " KPH";
            console.log(cityCurrentWind);

        })
})