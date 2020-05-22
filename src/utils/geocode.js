const request = require("request");
const chalk = require("chalk");
const head = chalk.blue.underline.bold;
const error = chalk.red.inverse;

let fetchgeoCode = (address, callback) => {
    address = encodeURIComponent(address);
    let geocode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWNvbXNocmVlIiwiYSI6ImNrYWY0MDZnejAyZWIycm11eDYxZGUxdTkifQ.tSoiympe3KiUPKmjzI6kaQ&limit=1`;
    request({
        url: geocode,
        json: true
    }, (e,s)=> {
        callback(e, s);
    });
}

module.exports = fetchgeoCode;