console.log('Client side javascript file is loaded!')

const weather_form = document.querySelector('form')
const search_element = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weather_form.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search_element.value
    url = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
