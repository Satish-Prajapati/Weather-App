
const lsLocation = localStorage.getItem('location')
const domData = document.querySelector('.domData')
const form = document.querySelector('form')
const input = document.querySelector('input')
let userLocation
form.addEventListener('submit', e => {
    e.preventDefault()
    domData.innerHTML = '<span class="font-weight-bold lead">Loading please wait ;)....</span>'
    localStorage.setItem('location', input.value)
    getWeather(input.value)
})

const getWeather = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                domData.innerHTML = `<p class="lead">${data.error}</p>`
                domData.append(html)
            } else {
                domData.innerHTML = `<p class="lead"><span class="font-weight-bold">Location:</span> ${data.location}</p> <p class="lead"><span class="font-weight-bold">Forcast:</span> ${data.forecast}</p>`
            }
        })
    })
}

if (!lsLocation) {
    fetch('https://freegeoip.app/json/').then(response => {
        response.json().then(data => {
            getWeather(data.city)
        })
    })
} else {
    getWeather(lsLocation)
}
