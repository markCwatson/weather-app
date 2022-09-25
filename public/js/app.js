const search_form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

search_form.addEventListener('submit', (event) => {
    event.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    // Fetch API running in browser
    fetch('http://localhost:3000/weather?address=' + input.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error   
            } else {
                msg1.textContent = ''
                msg2.textContent = 'It is ' + data.temperature + ' \xB0C in ' + data.region + ' and ' + data.description[0].toLowerCase() + '.'
            }
        })
    }).catch((error) => {
        msg1.textContent = error.message
    })
})