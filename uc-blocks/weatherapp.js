/**
 * 
 * Weather App Block
 * 
 *  
 
/**
 * 
 * Weather App Block
 * 
 *  
 */
import { useState, useEffect } from '@wordpress/element';
import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
const { useSelect } = wp.data;

const API_KEY = '49fd6140676349857149724d8baf9c2c';
const lat = '59.575350';
const lon = '-108.612220';

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    console.log('DATA MAIN: ' + data.main)

    // convert Kelvin to Celsius  
    const temperature = data.main.temp - 273.15;
    const humidity = data.main.humidity;
    const weather = data.weather[0].description;

    console.log(`Temperature: ${temperature}°C`);
    console.log(`Humidity: ${humidity}%`);
    console.log(`Weather: ${weather}`);

    return { temperature, humidity, weather };
}

wp.blocks.registerBlockType('ucblocktheme/weatherapp', {
    title: 'Weather Block',
    icon: 'cloud',
    category: 'common',
    selfClosing: false,
    tagName: "div",
    type: "StartTag",
    edit: function (props) {
        const [weatherData, setWeatherData] = useState({});
        useEffect(() => {
            async function getData() {
                const data = await getWeatherData();
                setWeatherData(data);
            }
            getData();
        }, []);

        setInterval(async () => {
            const data = await getWeatherData();
            setWeatherData(data);
        }, 14400000);
        console.log(weatherData);
        return (
            <>
                <div className="weather-block">

                    <p id="temperature">Temperature: {weatherData.temperature || 'loading...'}°C</p>
                    <p id="humidity">Humidity: {weatherData.humidity || 'loading...'}%</p>
                    <p id="conditions">Conditions: {weatherData.weather || 'loading...'}</p>
                </div>
                <div>
                    <InnerBlocks />
                </div>
            </>
        )
    },
    save: function (props) {
        // output the block's content on the front-end             

        return (
            <div className="weather-block">
                <InnerBlocks.Content />
            </div>
        )
    }

});
