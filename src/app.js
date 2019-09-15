const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 5000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        location: 'Cordoba',
        name: 'KMery'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Esto es la pagina de ayuda',
        title: 'Ayuda',
        name: 'KMery'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre mi',
        name: 'KMery'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes ingresar ciudad..'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address.toUpperCase()
            })        
        })
    })
});


//console.log(process.argv)

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Debes buscar algo..'
        })
    }

    console.log(req.query.search);    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'KMery',
        errorMessage: 'No se ha encontrado el articulo de ayuda que busca'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'KMery',
        errorMessage: 'No se ha encontrado lo que busca'
    })
})

app.listen(port, () => {
    console.log('El servidor esta escuchando en puerto 5000...');    
});
