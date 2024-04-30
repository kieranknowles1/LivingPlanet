import {
  getPollution,
  getCurrentWeather,
  getAirQualityIndex,
  describeAirQuality,
  QUALITY_BG_COLORS,
  QUALITY_FG_COLORS,
  POLLUTION_THRESHOLDS,
  createKey
} from './modules/weatherData.mjs'

// Ellison Place, Newcastle upon Tyne, UK
const DEFAULT_LOCATION = {
  lat: 54.9733,
  lng: -1.6144
}

/**
 * Initialize the map as a child of the given element
 * @param {HTMLElement} element
 */
function initMap (element) {
  return new google.maps.Map(element, {
    mapId: element.id,
    center: DEFAULT_LOCATION,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    streetViewControl: false,
    rotateControl: false,
    scaleControl: false,
    zoomControl: false,
    fullscreenControl: false
  })
}

/**
 * Create a marker on the map
 * @param {google.maps.Map} map
 * @param {google.maps.LatLng} position
 * @param {string} title String to display on hover
 */
function createMarker (map, position, title) {
  return new google.maps.marker.AdvancedMarkerElement({ position, map, title })
}

/**
 * Create a marker that links to the weather page
 * @param {google.maps.Map} map
 * @param {google.maps.LatLng} position
 * @param {string} title String to display on hover
 */
function createWeatherMarker (map, position, title) {
  const marker = createMarker(map, position, title)

  marker.addListener('click', () => {
    window.location.href = `/weather?lat=${position.lat}&lon=${position.lng}`
  })
}

/**
 * Get directions from one location to another
 * @param {string|google.maps.LatLng} from
 * @param {string|google.maps.LatLngLiteral} to
 * @param {google.maps.TravelMode} method
 */
async function getDirections (from, to, method) {
  const service = new google.maps.DirectionsService()

  return await service.route({
    origin: from,
    destination: to,
    travelMode: method
  })
}

// We reuse the same renderer so that only one route is displayed at a time
let directionsRenderer
/**
 * Render the route on the map
 * @param {google.maps.Map} map
 * @param {google.maps.DirectionsResult} route
 * @param {HTMLElement} panel
 */
function renderRoute (map, route, panel) {
  if (!directionsRenderer) {
    directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)
  }

  directionsRenderer.setDirections(route)
  directionsRenderer.setPanel(panel)
}

/**
 * Create a text element with the given content, by default a paragraph
 * @param {string} text
 * @param {string?} element Element type to create, defaults to 'p'
 * @returns {Element}
 */
function createTextElement (text, element = 'p') {
  const p = document.createElement(element)
  p.textContent = text
  return p
}

/**
 * Create an element for a pollutant with the given name, value and thresholds
 * @param {string} name The user-friendly name of the pollutant
 * @param {number} value The value of the pollutant in µg/m³
 * @param {number[]?} thresholds The thresholds for the air quality index. If not provided, the pollutant will not be considered for the AQI.
 * @returns {Element}
 */
function createPollutantElement (name, value, thresholds) {
  const element = createTextElement(`${name}: ${value} µg/m³`)

  if (thresholds) {
    const quality = getAirQualityIndex(value, thresholds)
    element.style.backgroundColor = QUALITY_BG_COLORS[quality]
    element.style.color = QUALITY_FG_COLORS[quality]
    element.textContent += ` (${describeAirQuality(quality + 1)})` // 1-indexed
  }

  return element
}

async function onDirectionsClick (map, latLng) {
  const directions = await getDirections(latLng, DEFAULT_LOCATION, google.maps.TravelMode.DRIVING)
  renderRoute(map, directions, document.getElementById('directions-panel'))
}

/**
 * Generate the content for an info window showing pollution data.
 * The element will be appended with the data once it is fetched, or an error message if it fails.
 * @param {google.maps.LatLng} latLng
 * @returns {Element}
 */
function generateInfoWindow (map, latLng) {
  const div = document.createElement('div')
  div.className = 'info-window'
  // Show lat and lng to 2 decimal places
  div.appendChild(createTextElement(`Lat: ${latLng.lat().toFixed(2)}, Lng: ${latLng.lng().toFixed(2)}`))
  // Add a key for the air quality index's colours
  $(div).append(createKey()).append('<br>')

  // Link to weather page and directions side-by-side
  const infoLink = createTextElement('More Information', 'a')
  infoLink.href = `/weather?lat=${latLng.lat()}&lon=${latLng.lng()}`
  div.appendChild(infoLink)

  const directionsButton = createTextElement('Directions to HQ', 'button')
  directionsButton.addEventListener('click', () => {
    onDirectionsClick(map, latLng)
  })
  div.appendChild(directionsButton)

  // Make the containers here so we can append to them later and they will be in the correct order
  // no matter which request finishes first
  const weatherContainer = document.createElement('div')
  div.appendChild(weatherContainer)
  const pollutionContainer = document.createElement('div')
  div.appendChild(pollutionContainer)

  getCurrentWeather(latLng.lat(), latLng.lng()).then(weather => {
    weatherContainer.appendChild(createTextElement('Weather', 'u'))
    weatherContainer.appendChild(createTextElement(`Description: ${weather.weather[0].description}`))
    weatherContainer.appendChild(createTextElement(`Temperature: ${weather.main.temp}°C`))
    weatherContainer.appendChild(createTextElement(`Wind Speed: ${weather.wind.speed} m/s`))
  }).catch(e => {
    console.error(e)
    weatherContainer.appendChild(createTextElement('Failed to get weather data'))
  })

  getPollution(latLng.lat(), latLng.lng()).then(pollution => {
    const aqi = pollution.list[0].main.aqi
    pollutionContainer.appendChild(createTextElement('Pollution', 'u'))
    pollutionContainer.appendChild(createTextElement(`Index: ${aqi} (${describeAirQuality(aqi)})`))
    pollutionContainer.appendChild(createPollutantElement('Carbon Monoxide', pollution.list[0].components.co, POLLUTION_THRESHOLDS.co))
    pollutionContainer.appendChild(createPollutantElement('Nitrogen Monoxide', pollution.list[0].components.no))
    pollutionContainer.appendChild(createPollutantElement('Nitrogen Dioxide', pollution.list[0].components.no2, POLLUTION_THRESHOLDS.no2))
    pollutionContainer.appendChild(createPollutantElement('Ozone', pollution.list[0].components.o3, POLLUTION_THRESHOLDS.o3))
    pollutionContainer.appendChild(createPollutantElement('Sulfur Dioxide', pollution.list[0].components.so2, POLLUTION_THRESHOLDS.so2))
    pollutionContainer.appendChild(createPollutantElement('Ammonia', pollution.list[0].components.nh3))
    pollutionContainer.appendChild(createPollutantElement('Particulates (2.5 µm)', pollution.list[0].components.pm2_5, POLLUTION_THRESHOLDS.pm2_5))
    pollutionContainer.appendChild(createPollutantElement('Particulates (10 µm)', pollution.list[0].components.pm10, POLLUTION_THRESHOLDS.pm10))
  }).catch(e => {
    console.error(e)
    pollutionContainer.appendChild(createTextElement('Failed to get pollution data'))
  })

  return div
}

// This must be global so that the Maps API can call it
// As this script is loaded with type="module", we have to assign it to the window
window.onMapsLoaded = () => {
  const map = initMap(document.getElementById('map'))

  /** @type {google.maps.InfoWindow} */
  let info
  map.addListener('click', event => {
    if (info) { // Close any existing info window
      info.close()
    }
    info = new google.maps.InfoWindow({
      content: generateInfoWindow(map, event.latLng)
    })

    info.setPosition(event.latLng)
    info.open(map)
  })

  // Create markers for a few UK cities by default
  createWeatherMarker(map, DEFAULT_LOCATION, 'Newcastle Upon Tyne')
  createWeatherMarker(map, { lat: 51.4545, lng: -2.5879 }, 'Bristol')
  createWeatherMarker(map, { lat: 51.5074, lng: -0.1278 }, 'London')
  createWeatherMarker(map, { lat: 51.6214, lng: -3.9436 }, 'Swansea')
  createWeatherMarker(map, { lat: 53.4084, lng: -2.9916 }, 'Manchester')
  createWeatherMarker(map, { lat: 53.5228, lng: -1.1285 }, 'Penistone')
  createWeatherMarker(map, { lat: 54.6606, lng: -3.3718 }, 'Cockermouth')
  createWeatherMarker(map, { lat: 55.9533, lng: -3.1883 }, 'Edinburgh')
}
