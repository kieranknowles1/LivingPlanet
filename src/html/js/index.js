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

window.onMapsLoaded = () => {
  const map = initMap(document.getElementById('map'))

  /** @type {google.maps.InfoWindow} */
  let info
  map.addListener('click', event => {
    if (info) { // Close any existing info window
      info.close()
    }
    info = new google.maps.InfoWindow({
      content: `Lat: ${event.latLng.lat()}<br>Lng: ${event.latLng.lng()}`
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
