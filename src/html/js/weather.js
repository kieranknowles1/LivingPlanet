import {
  createKey,
  describeAirQuality,
  getAirQualityIndex,
  getLocationName,
  getPollution,
  QUALITY_BG_COLORS,
  QUALITY_FG_COLORS,
  POLLUTION_THRESHOLDS,
  getCurrentWeather
} from './modules/weatherData.mjs'

// Ellison Place, Newcastle upon Tyne, UK
const DEFAULT_LOCATION = {
  lat: 54.9733,
  lon: -1.6144
}

function getQueryLocation () {
  const query = new URLSearchParams(window.location.search)
  const lat = query.get('lat')
  const lon = query.get('lon')

  if (!lat || !lon) {
    return DEFAULT_LOCATION
  }

  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  }
}

jQuery(document).ready(() => {
  $('#airQualityKey').append(createKey())

  const location = getQueryLocation()
  getLocationName(location).then(locationName => {
    $('#location').text(locationName)
    $('#lat').text(location.lat)
    $('#lon').text(location.lon)
  })

  getCurrentWeather(location.lat, location.lon).then(weather => {
    $('#description').text(weather.weather[0].description)
    $('#temperature').text(weather.main.temp)
    $('#windSpeed').text(weather.wind.speed)
  })

  fillPollutionSection(location.lat, location.lon)
})

/**
 * Update the pollutant element with the given id with the given value.
 * @param {string} id The id of the element to update. Text will be set to the value and color to the air quality index.
 * @param {number} value The value to update the element with.
 * @param {number[]} qualityThresholds The thresholds for the air quality index. AQI = qualityThresholds.MaxWhere(value >= Max). Lower is better.
 */
function updatePollutantElement (id, value, qualityThresholds) {
  const quality = getAirQualityIndex(value, qualityThresholds)
  $(`#${id}`)
    .text(value)
    .css('background-color', QUALITY_BG_COLORS[quality])
    .css('color', QUALITY_FG_COLORS[quality])
}

async function fillPollutionSection (lat, lon) {
  const data = await getPollution(lat, lon)

  $('#airQualityIndex').text(data.list[0].main.aqi)
  $('#airQualityDescription').text(describeAirQuality(data.list[0].main.aqi))

  const components = data.list[0].components
  // Update the pollutant elements
  // Threshold sources: https://openweathermap.org/api/air-pollution
  updatePollutantElement('co', components.co, POLLUTION_THRESHOLDS.co)
  $('#no').text(components.no) // Not in AQI
  updatePollutantElement('no2', components.no2, POLLUTION_THRESHOLDS.no2)
  updatePollutantElement('o3', components.o3, POLLUTION_THRESHOLDS.o3)
  updatePollutantElement('so2', components.so2, POLLUTION_THRESHOLDS.so2)
  $('#nh3').text(components.nh3) // Not in AQI
  updatePollutantElement('pm2_5', components.pm2_5, POLLUTION_THRESHOLDS.pm2_5)
  updatePollutantElement('pm10', components.pm10, POLLUTION_THRESHOLDS.pm10)
}
