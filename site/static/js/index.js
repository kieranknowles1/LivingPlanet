import {
  getLocationName,
  getCurrentWeather,
  getPollution,
  describeAirQuality,
  QUALITY_BG_COLORS,
  QUALITY_FG_COLORS,
  getAirQualityIndex,
  createAirQualityKey
} from './modules/weatherData.mjs'

class WeatherWidgetElement extends HTMLElement {
  /** // TODO: Don't duplicate this code with the weather.js file
   * Update the pollutant element with the given id with the given value.
   * @param {string} className The class of the element to update. Text will be set to the value and color to the air quality index.
   * @param {number} value The value to update the element with.
   * @param {number[]} qualityThresholds The thresholds for the air quality index. AQI = qualityThresholds.MaxWhere(value >= Max). Lower is better.
   */
  updatePollutantElement (className, value, qualityThresholds) {
    const quality = getAirQualityIndex(value, qualityThresholds)
    $(this.shadowRoot.querySelector(`.${className}`))
      .text(value)
      .css('background-color', QUALITY_BG_COLORS[quality])
      .css('color', QUALITY_FG_COLORS[quality])
  }

  constructor () {
    super()
    // Create a shadow root to attach the template to
    this.attachShadow({ mode: 'open' })
    const template = document.getElementById('weather-widget-template')
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.location = {
      lat: parseFloat(this.getAttribute('lat')),
      lon: parseFloat(this.getAttribute('lon'))
    }

    getLocationName(this.location).then(locationName => {
      this.shadowRoot.querySelector('.location').textContent = locationName
    })

    getCurrentWeather(this.location.lat, this.location.lon).then(response => {
      const weather = response.weather[0]
      this.shadowRoot.querySelector('.description').textContent = weather.description
      this.shadowRoot.querySelector('.temperature').textContent = response.main.temp
      this.shadowRoot.querySelector('.wind-speed').textContent = response.wind.speed
    })

    createAirQualityKey(this.shadowRoot.querySelector('.key'))
    getPollution(this.location.lat, this.location.lon).then(response => {
      this.shadowRoot.querySelector('.airQualityIndex').textContent = response.list[0].main.aqi
      this.shadowRoot.querySelector('.airQualityDescription').textContent = describeAirQuality(response.list[0].main.aqi)

      const components = response.list[0].components
      // Update the pollutant elements
      // Threshold sources: https://openweathermap.org/api/air-pollution
      this.updatePollutantElement('co', components.co, [4400, 9400, 12400, 15400])
      this.shadowRoot.querySelector('.no').textContent = components.no // Not in AQI
      this.updatePollutantElement('no2', components.no2, [40, 70, 150, 200])
      this.updatePollutantElement('o3', components.o3, [60, 100, 140, 180])
      this.updatePollutantElement('so2', components.so2, [20, 80, 250, 350])
      this.shadowRoot.querySelector('.nh3').textContent = components.nh3 // Not in AQI
      this.updatePollutantElement('pm2_5', components.pm2_5, [10, 25, 50, 75])
      this.updatePollutantElement('pm10', components.pm10, [20, 50, 100, 200])
    })
  }
}
customElements.define('weather-widget', WeatherWidgetElement)

/**
 * Initialize the map as a child of the given element
 * @param {HTMLElement} element
 */
function initMap (element) {
  return new google.maps.Map(element, {
    center: { lat: 55, lng: -1.6 },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    streetViewControl: false,
    mapTypeControl: false,
    rotateControl: false,
    scaleControl: false,
    zoomControl: false,
    fullscreenControl: false,
    mapId: 'main-map'
  })
}

/**
 * Create a marker on the map
 * @param {google.maps.Map} map
 * @param {google.maps.LatLng} position
 * @param {string} title String to display on hover
 */
function createMarker (map, position, title, icon) {
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

function getInputs () {
  return {
    /** @type {string} */
    from: $('#from').val(),
    /** @type {string} */
    to: $('#to').val(),
    /** @type {google.maps.TravelMode} */
    method: $('#method').val()
  }
}

/**
 * Get directions from one location to another
 * @param {string} from
 * @param {string} to
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

/**
 * Get distances from one set of locations to another
 * @param {string[]} from
 * @param {string[]} to
 * @param {google.maps.TravelMode} method
 */
async function getDistances (from, to, method) {
  const service = new google.maps.DistanceMatrixService()

  return await service.getDistanceMatrix({
    origins: from,
    destinations: to,
    travelMode: method,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
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

// We need to make this global so that the Maps API can access it
// Nothing here is global by default, as it is imported as a module
window.onMapsLoaded = () => {
  const map = initMap(document.getElementById('map'))

  createWeatherMarker(map, { lat: 55, lng: -1.6 }, 'Newcastle Upon Tyne')

  $('#directions').on('click', async () => {
    const { from, to, method } = getInputs()
    const panel = $('#directions-panel').get(0)

    if (!from || !to) {
      alert('Please enter both a start and end location')
      return
    }

    try {
      const route = await getDirections(from, to, method)
      renderRoute(map, route, panel)
    } catch (e) {
      console.error(e)
      alert('Failed to get directions')
    }
  })

  $('#distance').on('click', async () => {
    const { from, to, method } = getInputs()
    const panel = $('#distance-panel').get(0)

    if (!from || !to) {
      alert('Please enter both a start and end location')
      return
    }

    try {
      const distance = await getDistances([
        from, 'Newcastle Upon Tyne', 'London'
      ], [to], method)
      panel.innerHTML = JSON.stringify(distance, null, 2)
    } catch (e) {
      console.error(e)
      alert('Failed to get distance')
    }
  })
}
