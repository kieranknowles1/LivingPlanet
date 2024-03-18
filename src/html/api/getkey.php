<?php
/**
 * Get the API key for OpenWeatherMap
 */
function getAPIKey(): string {
    return getenv('OPENWEATHER_API_KEY')
}
