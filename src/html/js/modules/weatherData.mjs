/**
 * Functions for fetching and interpreting weather data.
 * Used by both the main page and the weather page.
 *
 * By splitting this into a separate module, we can reuse the functions in both pages.
 * It will require a second HTTP request to load the module, but this will only happen once
 * as the server sets cache headers.
 */

// I don't care about exposing this in Git, it isn't linked to any payment information
const OPENWEATHER_KEY = 'a80e01c7ed75b3d74ba3a66bbd39c09f'

// The colors for the air quality index, worse indexes use darker colors that are psychologically associated with danger
// DO NOT rely on color alone to convey information, we use text as well for colorblind users
export const QUALITY_BG_COLORS = [
  '#00ff00', // Good
  '#ffff00', // Fair
  '#FFB366', // Moderate
  // Use darker shades of red/purple with white text, as these are more contrasting than the lighter shades are with any text color
  // Needed for AAA contrast ratio. This requires 7:1 for normal text, but I'm using 10:1 for better readability.
  '#8A0000', // Poor
  '#5400A8' // Very Poor
]
export const QUALITY_FG_COLORS = [
  '#000000', // Good
  '#000000', // Fair
  '#000000', // Moderate
  '#ffffff', // Poor
  '#ffffff' // Very Poor
]

/**
 * Generate the HTML for a key showing the air quality index colors.
 */
export function createKey () {
  return QUALITY_BG_COLORS.map((color, i) => {
    return `<span style="background-color: ${color}; color: ${QUALITY_FG_COLORS[i]}">${describeAirQuality(i + 1)}</span>`
  })
}

// The thresholds for the air quality index. AQI = qualityThresholds.MaxWhere(value >= Max). Lower is better.
// Source: https://openweathermap.org/api/air-pollution
export const POLLUTION_THRESHOLDS = {
  co: [4400, 9400, 12400, 15400],
  no2: [40, 70, 150, 200],
  o3: [60, 100, 140, 180],
  so2: [20, 80, 250, 350],
  pm2_5: [10, 25, 50, 75],
  pm10: [20, 50, 100, 200]
}

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
