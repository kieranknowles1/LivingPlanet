// I don't care about exposing this in Git, it isn't linked to any payment information
const OPENWEATHER_KEY = 'a80e01c7ed75b3d74ba3a66bbd39c09f'

export const QUALITY_BG_COLORS = [
  '#00ff00', // Good
  '#ffff00', // Fair
  '#ff7f00', // Moderate
  '#ff0000', // Poor
  '#7f00ff' // Very Poor
]
export const QUALITY_FG_COLORS = [
  '#000000', // Good
  '#000000', // Fair
  '#000000', // Moderate
  '#ffffff', // Poor
  '#ffffff' // Very Poor
]

export async function getLocationName (location) {
  const data = await $.getJSON(`https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${OPENWEATHER_KEY}`)

  if (data.length === 0) {
    return 'Unknown Location'
  }
  return data[0].name
}

// Describe the air quality based on the AQI
// Source: https://openweathermap.org/api/air-pollution
export function describeAirQuality (aqi) {
  switch (aqi) {
    case 1: return 'Good'
    case 2: return 'Fair'
    case 3: return 'Moderate'
    case 4: return 'Poor'
    case 5: return 'Very Poor'
  }
}

export async function getCurrentWeather (lat, lon) {
  return await $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`)
}

export async function getPollution (lat, lon) {
  return await $.getJSON(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`)
}

/**
 * Get the air quality index for the given value and thresholds.
 * @param {number} value The value to get the air quality index for.
 * @param {number[]} thresholds The thresholds for the air quality index.
 */
export function getAirQualityIndex (value, thresholds) {
  // Get the highest threshold that the value is greater than or equal to
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) {
      return i + 1 // +1 as the threshold is for the NEXT index
    }
  }
  // Below the lowest threshold, consider the air quality good
  return 0
}