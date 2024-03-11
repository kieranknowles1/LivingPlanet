jQuery(document).ready(() => {
  $('#moodForm').submit(event => {
    event.preventDefault()
    // https://stackoverflow.com/questions/8622336/jquery-get-value-of-selected-radio-button
    const mood = $(event.target).find('input[name="mood"]:checked').val()
    $('#mood').text(mood)
  })
})
