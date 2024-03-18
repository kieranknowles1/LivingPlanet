jQuery(document).ready(() => {
  $.get('/api/getkey.php', key => {
    getCurrentWeather(key, 55, -1.6)
  })
})

function getCurrentWeather (key, lat, lon) {
  $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, data => {
    console.log(data)

    const weather = data.weather[0]
    $('#description').text(weather.description)
    $('#temperature').text(data.main.temp)
    $('#windSpeed').text(data.wind.speed)
  })
}
