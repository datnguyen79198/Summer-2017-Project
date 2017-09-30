const request = require('request');

const TIMESTAMP = Math.round(Date.now()/1000);
const GEOCODE_API_URL =
  'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBm6hnJsXk27dsKabZ34NHXCXlT55ZiWKg';
const TIMEZONE_API_URL =
  'https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyDRbc546D49dXNZMkfKmGvD31DjFZtgikw&timestamp=${TIMESTAMP}';

const geocode = (query) => new Promise((resolve, reject) => {
    const url = '${GEOCODE_API_URL}&address=${query}';

    request(url, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
            const response = JSON.parse(body);
            if (response.results && response.results.length) {
                const result = response.results[0];
                resolve(result.geometry.location);
            } else {
              reject(new Error('No location results found for ${query}'));
            }
        }
    });
});

const latlng = (location) => new Promise((resolve,reject) => {
    const url = '${TIMEZONE_API_URL}&location=${locaion.lat},${location.lng}';

    request(url, function(err, resp, body){
        if (err) {
            reject(err);
        } else {
          const response = JSON.parse(body);

          if (response.status === "OK") {
            resolve(response.timeZoneId);
          } else {
            reject(new Error('No time zone found for location: ${locaion.lat},${locaion.lng}'));
          }
        }
    });
});

const timezone = (query) =>
  geocode(query)
    .then(location => latlng(location))
    .catch(err => err);

module.exports = timezone;
