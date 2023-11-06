const API_KEY = "cfb3b37269713aa7caf83b5d122fb02c"

const onGeoSuccess = pos => {
    const lat = pos.coords.latitude // 위도.
    const lon = pos.coords.longitude // 경도.
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(res => res.json()).then(data => {
            const weather = document.querySelector("#weather span:first-child")
            const temp = document.querySelector("#weather span:nth-child(2)")
            const city = document.querySelector("#weather span:last-child")
            city.setAttribute( 'class', 'material-symbols-outlined' )
            city.innerText = data.name
                // 0 is now target wdata.
            weather.setAttribute( 'class', 'material-symbols-outlined' )
            weather.innerText = `${data.weather[0].main}`

            temp.setAttribute( 'class', 'material-symbols-outlined' )
            temp.innerText = `@ ${data.main.temp}`
        }) // update html active after receive from server..
}

const onGeoError = () => {
    alert("Can't find you. No weather for you.")
}

// completly find now location from js..
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError)