let cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
api_key ='6dbe109ad2eca6dfda54a2ea3e656243';
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastCard = document.querySelector('.day-forecast');
aqiCard = document.querySelectorAll('.highlights .card')[0]; 
sunriseCard = document.querySelectorAll('.highlights .card')[1]; 
humidityVal = document.getElementById('humidityVal'); 
pressureVal = document.getElementById('pressureVal'); 
visibilityVal = document.getElementById('visibilityVal'); 
windSpeedVal = document.getElementById('windSpeedVal'); 
feelsVal = document.getElementById('feelsVal'); 
hourlyForecastCard = document.querySelector('.hourly-forecast');
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

// Weather Functions
function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    AIR_POLLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data =>{
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
            <div class="card-head flex justify-between items-center mb-4">
                <p class="text-lg">Air Quality Index</p>
                <p class="air-index aqi-1 px-3 py-1 rounded-full bg-aqi-${data.list[0].main.aqi} text-black">${aqiList[data.list[0].main.aqi - 1]}</p>
            </div>
            <div class="air-indices grid grid-cols-4 gap-4">
                <i class="fa-regular fa-wind fa-3x" style="color: #ffffff;"></i>
                <div class="item text-center">
                    <p class="mt-2 text-sm">PM2.5</p>
                    <h2 class="text-lg">${pm2_5}}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">PM10</p>
                    <h2 class="text-lg">${pm10}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">SO2</p>
                    <h2 class="text-lg">${so2}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">CO</p>
                    <h2 class="text-lg">${co}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">NO</p>
                    <h2 class="text-lg">${no}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">NO2</p>
                    <h2 class="text-lg">${no2}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">NH3</p>
                    <h2 class="text-lg">${nh3}</h2>
                </div>
                <div class="item text-center">
                    <p class="mt-2 text-sm">O3</p>
                    <h2 class="text-lg">${o3}</h2>
                </div>
            </div>
        `;
    }).catch(() => {
        alert('Failed to fetch Air Quality Index');
    });

    fetch(WEATHER_API_URL).then(res => res.json()).then(data =>{
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather flex justify-between items-center">
                <div class="details">
                    <p class="text-sm text-gray-400">Now</p>
                    <h2 class="text-3xl font-bold">${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p class="text-gray-400">${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
                </div>
            </div>
            <hr class="my-4 border-white mb-4">
            <div class="card-footer  space-y-2">
                <p class="text-sm text-gray-400"><i class="fa-light fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p class="text-sm text-gray-400"><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
            </div>
        `;
        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,
        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card-head">
                <p class="text-lg">Sunrise & Sunset</p>
            </div>
            <div class="sunrise-sunset grid grid-cols-2 gap-4 mt-4">
                <div class="item flex items-center gap-3">
                    <div class="icon">
                        <i class="fa-light fa-sunrise fa-4x" style="color: #ffffff;"></i>
                    </div>
                    <div>
                        <p class="text-sm">Sunrise</p>
                        <h2 class="text-2xl">${sRiseTime}</h2>
                    </div>
                </div>
                <div class="item flex items-center gap-3">
                    <div class="icon">
                        <i class="fa-light fa-sunset fa-4x" style="color: #ffffff;"></i>
                    </div>
                    <div>
                        <p class="text-sm">Sunset</p>
                        <h2 class="text-2xl">${sSetTime}</h2>
                    </div>
                </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(() => {
        alert('Failed to fetch current weather');
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = '';
        for(i = 0; i <= 7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = 12;
            if(hr > 12) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
                <div class="card bg-gray-700 text-center p-2 rounded-lg">
                    <p class="text-sm">${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" alt="">
                    <p class="text-sm">${(hourlyForecast[i].main.temp -273.15).toFixed(2)}&deg;C</p>
                </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast =>{
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML ='';
        for(i = 1; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item grid grid-cols-3 text-center space-y-2">
                    <div class="icon-wrapper flex items-center">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                        <span class="text-lg font-semibold">${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p class="text-sm text-gray-400">${date.getDate()} ${months[date.getMonth()]}</p>
                    <p class="text-sm text-gray-400">${days[date.getDay()]}</p>
                </div>
            `;
        }
    }).catch(() => {
        alert('Failed to fetch weather forecast');
    });
}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API_URL_ = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL_).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let {name, country, state} = data[0];
            getWeatherDetails(name,latitude, longitude, country, state);
        }).catch(() => {
            alert('Failed to fetch user coordinates');
        });
    }, error => {
        if(error.code === error.PERMISSION_DENIED){
            alert('Geolocation permission denied. Please reset location permission to grant access again');
        }
    });
}

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load', getUserCoordinates);