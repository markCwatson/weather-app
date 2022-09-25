import path from 'path';
import { fileURLToPath } from 'url';

import express from "express"
import hbs from 'hbs'

import { getWeather } from './utils/weather.js'
import { getCoordinates } from './utils/location.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const website_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../template/views')
const partials_path = path.join(__dirname, '../template/partials') 

const app = express()

// Setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// Setup static directories
app.use(express.static(website_path))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'the homies'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'anonymous'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help me please!',
        name: 'the helpers'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    getCoordinates(req.query.address, (error, coordinates) => {
        if (error) {
            return res.send({ error })
        } else {
            getWeather(coordinates, (error, weather) => {
                if (error) {
                    return res.send({ error })
                } else {
                    const { temp, desc, place} = weather // destructuring
                    
                    res.send({
                        temperature: temp,
                        description: desc,
                        region: place,
                        latitude: coordinates.lat,
                        longitude: coordinates.long,
                    })
                }
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Demons',
        error_message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server started')
})