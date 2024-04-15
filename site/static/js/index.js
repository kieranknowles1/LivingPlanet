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
  // NOTE: This is deprecated, but Google's API is developer-hostile
  return new google.maps.Marker({ position, map, title })
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

jQuery(document).ready(() => {
  const map = initMap(document.getElementById('map'))

  const marker = createMarker(map, { lat: 55, lng: -1.6 }, "A point between a football field and I don't know what the other thing is for.")
  marker.addListener('click', () => {
    alert('This is indeed the middle of a field')
  })

  $('#directions').on('click', async () => {
    const from = $('#from').val()
    const to = $('#to').val()
    const method = $('#method').val()
    const panel = $('#directions-panel').get(0)

    if (!from || !to) {
      alert('Please enter both a start and end location')
      return
    }

    const route = await getDirections(from, to, method)
    renderRoute(map, route, panel)
  })
})
