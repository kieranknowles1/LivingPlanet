import {
  describeAirQuality,
  getAirQualityIndex,
  getLocationName,
  getPollution,
  QUALITY_BG_COLORS,
  QUALITY_FG_COLORS
} from './modules/weatherData.mjs'

// Newcastle Upon Tyne
const DEFAULT_LOCATION = {
  lat: 55,
  lon: -1.6
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
  createAirQualityKey()

  const location = getQueryLocation()
  getLocationName(location).then(locationName => {
    $('#location').text(locationName)
    $('#lat').text(location.lat)
    $('#lon').text(location.lon)
  })

  fillPollutionSection(location.lat, location.lon)
})

// Generate a key for the pollutant elements
// Do this in JS to ensure it uses the same colors as the pollutant elements
function createAirQualityKey () {
  $('#airQualityKey').append(
    QUALITY_BG_COLORS.map((color, i) => {
      return `<span style="background-color: ${color}; color: ${QUALITY_FG_COLORS[i]}">${describeAirQuality(i + 1)}</span>`
    })
  )
}

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
  updatePollutantElement('co', components.co, [4400, 9400, 12400, 15400])
  $('#no').text(components.no) // Not in AQI
  updatePollutantElement('no2', components.no2, [40, 70, 150, 200])
  updatePollutantElement('o3', components.o3, [60, 100, 140, 180])
  updatePollutantElement('so2', components.so2, [20, 80, 250, 350])
  $('#nh3').text(components.nh3) // Not in AQI
  updatePollutantElement('pm2_5', components.pm2_5, [10, 25, 50, 75])
  updatePollutantElement('pm10', components.pm10, [20, 50, 100, 200])
}
