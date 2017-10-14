// Declare your variables
var api = "https://fcc-weather-api.glitch.me/api/current?";
var currentTemp = 'C';
var celcius;
// =================================================================>

$(document).ready(function() {
	// Get browser location and call the get weather function
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = "lat=" + position.coords.latitude;
			lon = "lon=" + position.coords.longitude;
			getWeather(lat, lon);
		 });
	 } else {
		 console.log("Geolocation is not supported by your browser.")
	 }

	// Convert celsuis to fahrenheit onclick
	$('#convert').click(function() {
		var currentTemp = $(".temp-type").text();
    var newTempUnit = currentTemp == "C" ? "F" : "C";
		$(".temp").animate({
				opacity: 0
					}, 500, function() {
				$(this).animate({
							opacity: 1
						}, 500);
				$(".temp-type").text(newTempUnit);
			});
		
		if (newTempUnit == "F") {
			newCelsius = $('.temp-value').html();
			var fahrenheit = Math.round((newCelsius * 9/5) + 32);
			$(".temp").animate({
				opacity: 0
					}, 500, function() {
				$(this).animate({
							opacity: 1
						}, 500);
				$('.temp-value').html(fahrenheit);
			});
		} else {
			$(".temp").animate({
				opacity: 0
					}, 500, function() {
				$(this).animate({
					opacity: 1
				}, 500);
				$('.temp-value').html(celsius);
			});
			
		}
	});
		
});


// ==================================================================>
// Create your Get Weather function
function getWeather(lat, lon) {
	var urlString = api + lat + "&" + lon;
	$.ajax({
		url: urlString,
    cache: false,
    type: 'get',
    dataType: 'JSON',
    success: function (data) {
			// Load Background Image
				var title = data.weather[0].main;
				switch (title) {
					case "Drizzle":
						var drizzle = "https://goo.gl/qcZSVH";
						$('.weather-card .top').css("background", "url(" +drizzle+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
						break;
					case "Clouds":
						var clouds = "https://goo.gl/V1GMng";
						$('.weather-card .top').css("background", "url(" +clouds+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
						break;
					case "Rain":
						var rain = "https://goo.gl/Zsq5ph";
						$('.weather-card .top').css("background", "url(" +rain+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
						break;
					case "Snow":
						var snow = "https://goo.gl/URWCyH";
						$('.weather-card .top').css("background", "url(" +snow+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
						break;
					case "Clear":
						var clear = "https://goo.gl/pbknhn";
						$('.weather-card .top').css("background", "url(" +clear+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
						break;
					case "Thunderstorm":
						var Thunderstorm = "https://goo.gl/BXirA6";
						$('.weather-card .top').css("background", "url(" +Thunderstorm+") no-repeat center center");
						$('.weather-card .top').css("background-size", "cover");
				}
			
			$(".wrapper").animate({
				opacity: 0
					}, 500, function() {
				$(this).animate({
							opacity: 1
						}, 500);
				$('.heading').html(data.weather[0].description);
				$('#city').html(data.name  + ", ");
				$('#country').html(data.sys.country);
				$('.deg').html("o");
				$('.temp-type').html("C");
				celsius = Math.round(data.main.temp);
				$('.temp-value').html(celsius);
				$('#icon').attr('src', data.weather[0].icon)
			});
			
     },
    error: function (e) {
      console.log(e);
    }
  });
}

// ==================================================================>