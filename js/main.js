// Taking in Form Data
const form = document.querySelector(`#ask-city-form`)
form.addEventListener('submit', (event) => {
    event.preventDefault();
})

// Extract Data
const getData = async () => {
    // My API Key
    const apiKey = `3e58c34b7084de1bc0cb498c0eb6bdc0`;
    let cityName = document.querySelector('#city').value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    let response = await axios.get(url)
    console.log(response)

    const city = response.data['name']
    const country = response.data['sys']['country']
    document.querySelector(`#location`).innerHTML = `${city}, ${country}`

    return response.data
}

// Format Data
const tempConvHTML = (temp, unit) => {
    if (unit == "F") {
        tempF = Math.round((temp - 273.15) * (9 / 5) + 32)
        return `${tempF}&deg; F`
    } else {
        tempC = Math.round(temp - 273.15)
        return `${tempC}&deg; C`
    }
}

const timeConvHTML = (time, timeshift) => {
    let localTime = time + timeshift
}

// Combine Data Functions for Button
const loadData = async () => {
    const weatherInfo = await getData();
    const city = weatherInfo[`name`];
    const country = weatherInfo['sys']['country'];
    const timeshift = weatherInfo['timezone']
    const sunrise = weatherInfo['sys']['sunrise'];
    const sunset = weatherInfo['sys']['sunset'];
    const tempmain = weatherInfo['main']['temp'];
    const tempfeel = weatherInfo['main']['feels_like'];
    const tempmin = weatherInfo['main']['temp_min'];
    const tempmax = weatherInfo['main']['temp_max'];
    const weathermain = weatherInfo['weather'][0]['main'];
    const weatherdesc = weatherInfo['weather'][0]['description'];
    const hum = weatherInfo['main']['humidity'];
    let unit = 'F'
    document.querySelector(`#location`).innerHTML = `${city}, ${country}`
    document.querySelector(`#suntimes`).innerHTML = `sunrise ${sunrise} a.m. | sunset ${sunset} p.m.`
    document.querySelector(`#tempmain`).innerHTML = tempConvHTML(tempmain, unit)
    document.querySelector(`#tempfeel`).innerHTML = `Feels like: ${tempConvHTML(tempfeel, unit)}`
    document.querySelector(`#temprange`).innerHTML = `Max ${tempConvHTML(tempmax, unit)} | Min ${tempConvHTML(tempmin, unit)}`
    document.querySelector(`#weather-main`).innerHTML = `${weathermain}`
    document.querySelector(`#weather-desc`).innerHTML = `${weatherdesc}`
    document.querySelector(`#humidity`).innerHTML = `&#128167; ${hum} %`
}