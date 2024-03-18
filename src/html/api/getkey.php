<?php
/**
 * Get the API key for OpenWeatherMap
 */
function getAPIKey(): string {
    return getenv('OPENWEATHER_API_KEY');
}

// NOTE: Normally, you would not want to expose your API key in this way.
// This is just being done for demonstration purposes.
echo getAPIKey();
