const request = require("request");
const chalk = require("chalk");
const head = chalk.blue.underline.bold;
const error = chalk.red.inverse;

let fetchWeather = (long, lat, callback) => {
    url = `http://api.weatherstack.com/current?access_key=936a99e0f3cbff58be8477da1619a3c8&query=${lat},${long}`;
    request({
        url: url,
        json: true
    }, (error, response) => {
        callback(error, response);
    });
}

module.exports = fetchWeather;