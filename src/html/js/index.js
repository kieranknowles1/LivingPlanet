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

jQuery(document).ready(() => {
  initMap(document.getElementById('map'))
})
