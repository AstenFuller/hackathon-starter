const express = require('express');
const axios = require('axios');

const app = express();


app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api', (req, res) => {
    axios.get(`https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?apikey=${process.env.APIKEY}`)
        .then((result) => {
            return res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/time', (req, res) => {
    axios.get("https://world-clock.p.rapidapi.com/json/pst/now", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "world-clock.p.rapidapi.com",
            "x-rapidapi-key": "d38d54ecddmsh8e1769232b625e1p18ef22jsn12019d2db453"}
        })
    .then((result) => {
        return res.send(result.data);
    })
    .catch((error) => {
        console.error(error);
        res.send('An error occured.');
    })
})

module.exports = app;