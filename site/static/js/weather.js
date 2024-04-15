// I don't care about exposing this in Git, it isn't linked to any payment information
const OPENWEATHER_KEY = 'a80e01c7ed75b3d74ba3a66bbd39c09f'

const QUALITY_BG_COLORS = [
  '#00ff00', // Good
  '#ffff00', // Fair
  '#ff7f00', // Moderate
  '#ff0000', // Poor
  '#7f00ff' // Very Poor
]
const QUALITY_FG_COLORS = [
  '#000000', // Good
  '#000000', // Fair
  '#000000', // Moderate
  '#ffffff', // Poor
  '#ffffff' // Very Poor
]

// Newcastle Upon Tyne
const DEFAULT_LOCATION = {
  lat: 55,
  lon: -1.6
}

function getLocation () {
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

async function getLocationName (location) {
  const data = await $.getJSON(`https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${OPENWEATHER_KEY}`)

  if (data.length === 0) {
    return 'Unknown Location'
  }
  return data[0].name
}

jQuery(document).ready(async () => {
  createAirQualityKey()

  const location = getLocation()
  const locationName = await getLocationName(location)
  console.log(locationName)
  $('#location').text(locationName)
  $('#lat').text(location.lat)
  $('#lon').text(location.lon)

  getCurrentWeather(OPENWEATHER_KEY, location.lat, location.lon)
  getPollution(OPENWEATHER_KEY, location.lat, location.lon)
})

// Describe the air quality based on the AQI
// Source: https://openweathermap.org/api/air-pollution
function describeAirQuality (aqi) {
  switch (aqi) {
    case 1: return 'Good'
    case 2: return 'Fair'
    case 3: return 'Moderate'
    case 4: return 'Poor'
    case 5: return 'Very Poor'
  }
}

function getCurrentWeather (key, lat, lon) {
  $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, data => {
    const weather = data.weather[0]
    $('#description').text(weather.description)
    $('#temperature').text(data.main.temp)
    $('#windSpeed').text(data.wind.speed)
  })
}

/**
 * Get the air quality index for the given value and thresholds.
 * @param {number} value The value to get the air quality index for.
 * @param {number[]} thresholds The thresholds for the air quality index.
 */
function getAirQualityIndex (value, thresholds) {
  // Get the highest threshold that the value is greater than or equal to
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) {
      return i + 1 // +1 as the threshold is for the NEXT index
    }
  }
  // Below the lowest threshold, consider the air quality good
  return 0
}

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

function getPollution (key, lat, lon) {
  $.getJSON(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`, data => {
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
  })
}
