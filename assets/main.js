$(document).ready(function() {

    var apiKey = "7d4ea3e971f5372c7c63041298f71048";

    $("#search-btn").click(function() {
        // set the value of the search input to variable searchInput
        var searchInput = $("#search-input").val();

        // empty the search field once function called
        $("#today-weather").empty();
        $("#forecast-weather").empty();
        
        // Calls the current weather function on search button click
        getCurrentWeather(searchInput);
        // if ()
        displayListItem(searchInput);
        
    })

    function displayListItem(value) {
        // Store a list item with the name of the cities that have been searched
        var listItem = $("<li>").addClass("list-group-item-action my-2 py-2 previous-search").appendTo($("#search-history"));
        listItem.text(value);
    }

    $("#search-history").on("click", "li", function() {
        // Empty todays weather and forecast weather on history search click
        $("#today-weather").empty();
        $("#forecast-weather").empty()
        // get CurrentWeather and WeatherForecast of the city that was clicked, and rplace in the containers
        getCurrentWeather($(this).text());
    })

    function getCurrentWeather(searchInput) {
        // if the the localStorage has a search input that is not undefined..
        if (currentSearchHistory.indexOf(searchInput) === -1) {
            // push the searchInput value to the currentSearchHistory array for later use
            currentSearchHistory.push(searchInput);
            // set local storage to search input used to generate this data
            window.localStorage.setItem("currentSearchHistory", JSON.stringify(currentSearchHistory));
            console.log(searchInput)
            console.log(currentSearchHistory)

        }

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=7d4ea3e971f5372c7c63041298f71048&units=imperial",
            method: "GET",
            dataType: "json",
            success: function(currentData) {
                console.log(currentData)

                if (searchInput == null) {
                    alert("please type correct city name")
                    return;
                }
                // Create a div card container and append to "today-weather" div
                var card = $("<div style='width:100%;'>").addClass("card");
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

                // adds current temperature, wind-speed, humidity, and uv-index
                var weatherDescription = $("<p>").addClass("card-text text-left d-inline weather-description").appendTo(cardBody);
                weatherDescription.text(currentData.weather[0].description);

                // add icon image to the card body
                var weatherImg = $("<img alt='weather icon'>").addClass("iconImg d-inline px-2").attr("src", iconURL).appendTo(cardBody);

                var temperature = $("<p>").addClass("card-text").appendTo(cardBody);
                temperature.text("Temperature: " + currentData.main.temp + "°F");

                var windSpeed = $("<p>").addClass("card-text").appendTo(cardBody);
                windSpeed.text("Wind Speed: " + currentData.wind.speed + " mph");

                var humidity = $("<p>").addClass("card-text").appendTo(cardBody);
                humidity.text("Humidity: " + currentData.main.humidity + "%");

            getWeatherForecast(searchInput);

            }
        })
    }

    function getWeatherForecast(searchInput) {

        // if the the localStorage has a search input that is not undefined..
        if (forecastSearchHistroy.indexOf(searchInput) === -1) {
            // push the searchInput value to the forecastSearchHistroy array for later use
            forecastSearchHistroy.push(searchInput);
            // set local storage to search input used to generate this data
            window.localStorage.setItem("forecastSearchHistroy", JSON.stringify(forecastSearchHistroy));
        }

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=7d4ea3e971f5372c7c63041298f71048&units=imperial",
            method: "GET",
            dataType: "json",
            success: function(forecastData) {
                console.log(forecastData);

                var forecastWeatherDiv = $("#forecast-weather");
                // var forecastWeatherDiv = $("<div style='width: 100%'>").addClass("card d-inline forecast-div").appendTo("#forecast-weather");
                var header = $("<h5>").addClass("card-header forecast-header text-light py-3").text("Five Day Forecast:")
                header.appendTo(forecastWeatherDiv);

                // loop that runs through entire object.list
                for (var i = 0; i < forecastData.list.length; i++) {
                    // If  
                    if (forecastData.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                        // Create a div card container and append to "forecast-weather"
                        var card = $("<div style='max-width: 10rem; max-height: 10rem'>").addClass("card forecast-card");
                        card.appendTo(forecastWeatherDiv);

                        // create card title with current date
                        var cardHeader = $("<h4>").addClass("card-header").appendTo(card);
                        cardHeader.text(new Date(forecastData.list[i].dt_txt).toLocaleDateString());  
                        // create cardBody and append to card
                        var cardBody = $("<div>").addClass("card-body").appendTo(card);

                        // url to OWM's icons
                        var iconURL = "http://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png"

                        // add icon image, temperature. and humidity to the card body
                        var weatherImg = $("<img alt='weather icon'>").addClass("iconImg").attr("src", iconURL).appendTo(cardBody);

                        var temperature = $("<p style='font-size: 10px'>").addClass("card-text").appendTo(cardBody);
                        temperature.text("Temp: " + forecastData.list[i].main.temp + "°F");

                        var humidity = $("<p style='font-size: 10px'>").addClass("card-text").appendTo(cardBody);
                        humidity.text("Humidity: " + forecastData.list[i].main.humidity + "%");
                    }
                }

            }
        })
    }

    // set variables of currentSearchHistory/forecastSearchHistory = to an empty array or the city of the user's search history based off of click text value.
    var currentSearchHistory = JSON.parse(window.localStorage.getItem("currentSearchHistory")) || [];
    var forecastSearchHistroy = JSON.parse(window.localStorage.getItem("forecastSearchHistroy")) || [];

    if (currentSearchHistory.length > 0) {
        getCurrentWeather(currentSearchHistory[currentSearchHistory.length-1]);
    }

    for (var i = 0; i < currentSearchHistory.length; i++) {
        displayListItem(currentSearchHistory[i]);
    }
})

