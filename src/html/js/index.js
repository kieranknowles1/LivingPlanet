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
  })
}

/**
 * Create a marker on the map
 * @param {google.maps.Map} map
 * @param {google.maps.LatLng} position
 * @param {string} title String to display on hover
 */
function createMarker (map, position, title) {
  return new google.maps.Marker({ position, map, title })
}

jQuery(document).ready(() => {
  const map = initMap(document.getElementById('map'))

  const marker = createMarker(map, { lat: 55, lng: -1.6 }, "A point between a football field and I don't know what the other thing is for.")
  marker.addListener('click', () => {
    alert('This is indeed the middle of a field')
  })
})
