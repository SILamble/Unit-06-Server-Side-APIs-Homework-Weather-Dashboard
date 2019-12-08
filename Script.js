//MVP Requirements
    //Write element variables where I want to add API data
        var $weatherData = $("#weather-data");
        var $nameElement = $("<h1>");
        var $tempElement = $("<p>");
        var $humidityElement = $("<p>");
        var $windspeedElement = $("<p>");
        var $uvElement = $("<p>");
        var $weatherIconIMG = $("<img>");
        var $fivedayForecast = $("#5day-forecast");
        var $historyElement = $("<btn>");
        var $searchHistry = $(".search-history");
    //Search Box
        //Write event listener
        $("#Search-Button").on("click", function(){
        //clear 5 day forecast ready for adding new info
            $fivedayForecast.empty();
        //Assign variable to inputted text
            var $location = $("#Location").val();
    //API
        //Write URL variable
            var queryURLToday = "http://api.openweathermap.org/data/2.5/weather?q=" + $location + "&APPID=21910e38cace261c6a0a4021727e814d"
        

        //Write AJAX function
            $.ajax({
                url: queryURLToday,
                method: "GET"
            }).then(function(response) {      
            //Write variables for the API data
                var $nameText = response.name;
                var $dateText = response.dt;
                var $parsedDateText = moment.unix($dateText).format("DD/MM/YYYY");
                var $temperatureText = response.main.temp;
                var $humidityText = response.main.humidity;
                var $windspeedText = response.wind.speed;
                var $lat = response.coord.lat;
                var $lon = response.coord.lon;
                var $weatherIconCode = response.weather[0].icon;
                var $weatherIconURL = "http://openweathermap.org/img/wn/" + $weatherIconCode + "@2x.png"
                var queryURLUvi = "http://api.openweathermap.org/data/2.5/uvi?appid=21910e38cace261c6a0a4021727e814d&lat=" + $lat + "&lon=" + $lon;
                //Dynamic page updates
                        //Append data to elements
                $weatherData.append($nameElement.text($nameText + " " + $parsedDateText), $weatherIconIMG.attr("src",$weatherIconURL));
                $weatherData.append($tempElement.text("Temperature: " + (($temperatureText-273).toFixed(1)) +"\xB0C"));
                $weatherData.append($humidityElement.text("Humidity: " +$humidityText + "%"));
                $weatherData.append($windspeedElement.text("Windspeed: " + $windspeedText + "MPH"));
                $searchHistry.append($historyElement.text($nameText));
                //UV Index data
                    $.ajax({
                        url: queryURLUvi,
                        method: "GET"
                    }).then(function(response) {

                    var $UVText = response.value;
                    $weatherData.append($uvElement.text("UV Index: " +$UVText));
                    
                });
            }); 
        //---------------------------5 day forecast-------------------------------------//
    var queryURL5day = "http://api.openweathermap.org/data/2.5/forecast?q="+ $location + "&APPID=21910e38cace261c6a0a4021727e814d"
        $.ajax({
            url: queryURL5day,
            method: "GET"
            }).then(function(response) {
                
                var $fivedayforecastData = response.list;
                // console.log($fivedayforecastData)

                for(var i = 0; i<$fivedayforecastData.length; i++){
                    // console.log($fivedayforecastData.length);
                    
                    var $forecastCard = $("<div>").addClass("card col");
                    var $fivedayForecastDayElement = $("<h5>"); 
                    var $fivedayForecastTempElement = $("<p>");
                    var $fivedayForecastHumidityElement = $("<p>");
                    var $fivedayIconElement = $("<img>");
                    var dayVal = $fivedayforecastData[i].dt_txt
                    var $parseddayVal = moment(dayVal).format("DD/MM/YYYY");
                    // console.log("this is my tidy day " + $parseddayVal);
                    var tempVal = $fivedayforecastData[i].main.temp;
                    var humidVal = $fivedayforecastData[i].main.humidity;
                    var $fivedayIcon = $fivedayforecastData[i].weather[0].icon;
                    
                    //API data every 3 hours, total of 40 data sets, only need one per day, choose midday;
                    if ($fivedayforecastData[i].dt_txt.indexOf("12:00:00") !== -1)
                    
                    $fivedayForecast.append($forecastCard.append(
                        $fivedayForecastDayElement.text($parseddayVal), 
                        $fivedayIconElement.attr("src", "http://openweathermap.org/img/wn/" + $fivedayIcon + "@2x.png"),
                        $fivedayForecastTempElement.text(("Temp: "+(tempVal-273).toFixed(1)) +"\xB0C"),
                        $fivedayForecastHumidityElement.text("Humidity: "+humidVal+"%")
                    ));
                }      
        });
    });

//Additional features
    //Save searches to local storage

        //Write array variable to hold data
        //Push new searches to array
        //Append searches to search history
    //Page opens on users location
        //Assign variable to geolocation data
        //Write ajax function outside of Search function

