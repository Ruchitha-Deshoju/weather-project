const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()
// Define path for express config
const pubdirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setu handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubdirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Ruchitha Deshoju'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ruchitha deshoju'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is help section',
        title: 'Help',
        name: 'Ruchitha'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
               return res.send({error})
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
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
        title: '404',
        name: 'Ruchitha Deshoju',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ruchitha',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on prt 3000.')
})
