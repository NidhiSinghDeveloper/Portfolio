const http = require('https');
const axios = require('axios');
const ejs = require('ejs');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {

    res.render("index.ejs");

})


app.post('/', async (req, res) => {

    var city = req.body.city;
    console.log(city);

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cc7a3c46b58f78e25e6e865a516ed1a6";

    const response = await axios.get(url);

    const wd = response.data ;

    console.log(wd);

    const temp = wd.main.temp;
    const wet = wd.weather[0].main;
    const icon = wd.weather[0].icon;
    const pre = wd.main.pressure;
    const humid = wd.main.humidity;



    const iu = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    const ib = "https://source.unsplash.com/1600x900/?"+ city ;
    console.log(temp);

    res.render("index.ejs",
        {
            tem: temp,
            we: wet,
            ic: iu,
            ci:ib,
            press:pre,
            hum:humid,

        })


});









app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})