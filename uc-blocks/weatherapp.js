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


wp.blocks.registerBlockType('ucblocktheme/weatherapp', {
    title: 'Weather Block',
    icon: 'cloud',
    category: 'common',
    selfClosing: false,
    tagName: "div",
    type: "StartTag",
    attributes: {
        weatherData: { type: "object" }
    },
    edit: EditComponent,
    save: SaveComponent

});

function EditComponent(props) {

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
    props.setAttributes({ weatherData: weatherData });
    console.log(props.attributes.weatherData)
    return (
        <>
            <div className="weather-block">

                <p id="temperature">Temperature: {weatherData.temperature || 'loading...'}°C</p>
                <p id="humidity">Humidity: {weatherData.humidity || 'loading...'}%</p>
                <p id="conditions">Conditions: {weatherData.weather || 'loading...'}</p>
            </div>
            <div className="innerBlocks">
                <InnerBlocks />
            </div>
        </>
    )
}

function SaveComponent(props) {
    //output data to the DOM



    console.log(props.attributes.weatherData)
    return (
        <div className="weather-block">
            <h3>Uranium City Weather: </h3>
            <p id="temperature">
                Temperature: {props.attributes.weatherData.temperature || 'loading...'}°C
            </p>
            <p id="humidity">Humidity: {props.attributes.weatherData.humidity || 'loading...'}%</p>
            <p id="conditions">Conditions: {props.attributes.weatherData.weather || 'loading...'}</p>

        </div>
    )
}

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