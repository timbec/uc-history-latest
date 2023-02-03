/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./uc-blocks/weather-app.js ***!
  \**********************************/
/**
 * 
 * Weather App Block
 * 
 *  
 */
// wp.blocks.registerBlockType('ucblocks/weather-block', {
//     title: 'Weather Block',
//     icon: '',
//     category: 'widgets',
//     edit: function () {
//         return wp.element.createElement(
//             'div',
//             { className: 'weather-block' },
//             'Weather block'
//         );
//     },
//     save: function () {
//         return wp.element.createElement(
//             'div',
//             { className: 'weather-block' },
//             wp.element.createElement(
//                 'p',
//                 { id: 'temperature' },
//                 'Temperature: loading...'
//             ),
//             wp.element.createElement(
//                 'p',
//                 { id: 'humidity' },
//                 'Humidity: loading...'
//             ),
//             wp.element.createElement(
//                 'p',
//                 { id: 'wind' },
//                 'Wind: loading...'
//             ),
//             wp.element.createElement(
//                 'p',
//                 { id: 'conditions' },
//                 'Conditions: loading...'
//             )
//         );
//     },
// });
const API_KEY = '49fd6140676349857149724d8baf9c2c';
const lat = '59.575350';
const lon = '-108.612220';

async function getWeatherData() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await response.json();
  console.log(data); // convert Kelvin to Celsius  

  const temperature = data.main.temp - 273.15;
  const humidity = data.main.humidity;
  const weather = data.weather[0].description;
  console.log(`Temperature: ${temperature}°C`);
  console.log(`Humidity: ${humidity}%`);
  console.log(`Weather: ${weather}`);
} // getWeatherData();
// setInterval(getWeatherData, 14400000); // call the function every 4 hours (14400000 milliseconds)


wp.blocks.registerBlockType('ucblocktheme/weather-block', {
  title: 'Weather Block',
  icon: 'cloud',
  category: 'common',
  edit: function (props) {
    // return (
    //     <div>
    //         <button onClick={getWeatherData}>Get Weather Data</button>
    //     </div>
    // );
    getWeatherData();
    setInterval(getWeatherData, 14400000); // call the function every 4 hours (14400000 milliseconds)
  },
  // save: function (props) {
  //     const weatherData = getWeatherData();
  //     return (
  //         <div className="weather-block, wp-block">
  //             <p>Temperature: {weatherData.temperature}°C</p>
  //             <p>Humidity: {weatherData.humidity}%</p>
  //             <p>Weather: {weatherData.weather}</p>
  //         </div>
  //     );
  save: function () {
    return wp.element.createElement('div', {
      className: 'weather-block'
    }, wp.element.createElement('p', {
      id: 'temperature'
    }, 'Temperature: {weatherData.temperature}°C', 'Temperature: {temperature}°C'), wp.element.createElement('p', {
      id: 'humidity'
    }, 'Humidity: loading...'), wp.element.createElement('p', {
      id: 'wind'
    }, 'Wind: loading...'), wp.element.createElement('p', {
      id: 'conditions'
    }, 'Conditions: loading...'));
  }
});
/******/ })()
;
//# sourceMappingURL=weather-app.js.map