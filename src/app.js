const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jonathan Dickson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Jonathan Dickson',
        message: 'Contact jodickso@cicso.com for any issues'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jonathan Dickson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    location = req.query.address
    geocode(location, (error, {latitude, longitude, place_name} ={}) => {
        if (error) {
           return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecast_data) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: place_name,
                forecast: forecast_data
            })
          })
    })
    
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.',
        title: '404',
        name: 'Jonathan Dickson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404',
        name: 'Jonathan Dickson'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})