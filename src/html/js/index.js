import {
  getPollution,
  getAirQualityIndex,
  describeAirQuality,
  QUALITY_BG_COLORS,
  QUALITY_FG_COLORS,
  POLLUTION_THRESHOLDS,
  createKey
} from './modules/weatherData.mjs'

/**
 * Initialize the map as a child of the given element
 * @param {HTMLElement} element
 */
function initMap (element) {
  return new google.maps.Map(element, {
    mapId: element.id,
    center: { lat: 55, lng: -1.6 },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    streetViewControl: false,
    mapTypeControl: false,
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
  }

  return element
}

/**
 * Generate the content for an info window showing pollution data.
 * The element will be appended with the data once it is fetched, or an error message if it fails.
 * @param {google.maps.LatLng} latLng
 * @returns {Element}
 */
function generateInfoWindow (latLng) {
  const div = document.createElement('div')
  div.className = 'info-window'
  // Show lat and lng to 2 decimal places
  div.appendChild(createTextElement(`Lat: ${latLng.lat().toFixed(2)}, Lng: ${latLng.lng().toFixed(2)}`))
  $(div).append(createKey()).append('<br>')

  const infoLink = createTextElement('More Information', 'a')
  infoLink.href = `/weather?lat=${latLng.lat()}&lon=${latLng.lng()}`
  div.appendChild(infoLink)

  getPollution(latLng.lat(), latLng.lng()).then(pollution => {
    const aqi = pollution.list[0].main.aqi
    div.appendChild(div.appendChild(createTextElement(`Index: ${aqi} (${describeAirQuality(aqi)})`)))
    div.appendChild(createPollutantElement('Carbon Monoxide', pollution.list[0].components.co, POLLUTION_THRESHOLDS.co))
    div.appendChild(createPollutantElement('Nitrogen Monoxide', pollution.list[0].components.no))
    div.appendChild(createPollutantElement('Nitrogen Dioxide', pollution.list[0].components.no2, POLLUTION_THRESHOLDS.no2))
    div.appendChild(createPollutantElement('Ozone', pollution.list[0].components.o3, POLLUTION_THRESHOLDS.o3))
    div.appendChild(createPollutantElement('Sulfur Dioxide', pollution.list[0].components.so2, POLLUTION_THRESHOLDS.so2))
    div.appendChild(createPollutantElement('Ammonia', pollution.list[0].components.nh3))
    div.appendChild(createPollutantElement('Particulates (2.5 µm)', pollution.list[0].components.pm2_5, POLLUTION_THRESHOLDS.pm2_5))
    div.appendChild(createPollutantElement('Particulates (10 µm)', pollution.list[0].components.pm10, POLLUTION_THRESHOLDS.pm10))
  }).catch(e => {
    console.error(e)
    div.appendChild(createTextElement('Failed to get pollution data'))
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
      content: generateInfoWindow(event.latLng)
    })

    info.setPosition(event.latLng)
    info.open(map)
  })

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
