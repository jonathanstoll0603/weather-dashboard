$(document).ready(function() {

var apiKey = "7d4ea3e971f5372c7c63041298f71048";

$("#search-btn").click(function() {
    var searchInput = $("#search-input").val();
    console.log(searchInput);

    // 1) Call the current weather of the designated city 
        // Do so by using a separate function w ajax
    $("#today-weather").empty();
    getCurrentWeather();

    // 2) call the 5 day weather forcast of designated city
    getWeatherForecast();
})

$("li .list-group-item-action").click(function() {
    // retrieve the clicked city's data from local storage
    // display that info in the container to the right
})

function getCurrentWeather() {
    var searchInput = $("#search-input").val();

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=7d4ea3e971f5372c7c63041298f71048&units=imperial",
        method: "GET",
        dataType: "json",
        success: function(currentData) {
            console.log(currentData)

            // Create a div card container and append to "today-weather" div
            var card = $("<div style='width:100%'>").addClass("card bg-light");
            card.appendTo($("#today-weather"));
            // create cardBody and append to card
            var cardBody = $("<div style='width:100%'>").addClass("card-body").appendTo(card);
            // create card title with current date and city
            var cardTitle = $("<h3>").addClass("card-title text-center py-2").appendTo(cardBody);
            cardTitle.text(currentData.name)

            var cardSubTitle = $("<h4>").addClass("card-subtitle text-center").appendTo(cardBody);
            cardSubTitle.text(new Date().toLocaleDateString());
            // url to OWM's icons
            var iconURL = "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png"
            // add icon image to the card body

            // adds current temperature, wind-speed, humidity, and uv-index
            var weatherDescription = $("<p>").addClass("card-text text-left d-inline px-2").appendTo(cardBody);
            weatherDescription.text(currentData.weather[0].description);
            var weatherImg = $("<img alt='weather icon'>").addClass("iconImg d-inline px-2").attr("src", iconURL).appendTo(cardBody);
            var temperature = $("<p>").addClass("card-text").appendTo(cardBody);
            temperature.text("Temperature: " + currentData.main.temp + "°F");
            var windSpeed = $("<p>").addClass("card-text").appendTo(cardBody);
            windSpeed.text("Wind Speed: " + currentData.wind.speed + " mph");
            var humidity = $("<p>").addClass("card-text").appendTo(cardBody);
            humidity.text("Humidity: " + currentData.main.humidity + "%");
            


        }
    })
}

function getWeatherForecast() {
    var searchInput = $("#search-input").val();

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=7d4ea3e971f5372c7c63041298f71048&units=imperial",
        method: "GET",
        dataType: "json",
        success: function(forecastData) {
            console.log(forecastData)
        }
    })
}
})


