# Weather Dashboard App

A React-based weather dashboard that fetches current weather data by city using OpenWeatherMap API.

## Setup & Installation

1. Clone the repository:
```bash
   git clone https://github.com/Roopali-02/weather-app.git
```

2. Navigate into the project directory:
```bash
    cd weather-app
```

3. Install dependencies:
```bash
    npm install
```

4. Create a .env file in the root directory with your OpenWeatherMap API key:
```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

And anywhere in your code you access it like:
```bash
import.meta.env.VITE_OPENWEATHER_API_KEY
```

5. Run the app:
```bash
    npm run dev
```

## Approach
- Used React Context API for state management of weather data and city selection.  
- Implemented error handling for invalid city input without blanking the UI.  
- Stored last searched city in localStorage for persistence.  
- Polling weather data every 30 seconds without UI flickering.  
- Used CSS modules for styling.