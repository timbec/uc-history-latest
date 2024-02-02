/**
 * 
 * Weather App Block
 * 
 *  
 */
import { useState, useEffect } from '@wordpress/element';
import { InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

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
        weatherData: { type: "object" },
        imageUrl: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent

});

function EditComponent(props) {

    const [weatherData, setWeatherData] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        async function getData() {
            const data = await getWeatherData();
            setWeatherData(data);
        }
        getData();
    }, []);

    useEffect(() => {
        wp.apiFetch({ path: '/' }).then(data => {
            setImageUrl(data.url + '/wp-content/themes/uc-history-2022/assets/');
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const data = await getWeatherData();
            setWeatherData(data);
            console.log('weather data updated');
        }, 14400000);

        return () => clearInterval(intervalId);
    }, []);

    props.setAttributes({ weatherData: weatherData, imageUrl: imageUrl });

    return (
        <>
            <div className="weather-block">
                <h3 className="weather-block__title">Uranium City Weather: </h3>
                <div className="weather-block__content">
                    <div className="weather-block__content--icon">
                        <img src={`${imageUrl}/icons/${weatherData.icon}.png` || 'loading . . . '} alt="weather icon" />
                        <p id="temperature">{weatherData.temperature || 'loading...'}°C</p>
                    </div>
                    <div className="weather-block__content--stats">

                        <p id="humidity">Humidity: {weatherData.humidity || 'loading...'}%</p>
                        <p id="feels-like">Feels Like: {weatherData.feelsLike || 'loading...'}°C</p>
                        <p id="conditions">Conditions: {weatherData.weather || 'loading...'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

function SaveComponent(props) {
    //output data to the DOM
    console.log(props);
    const { weatherData, imageUrl } = props;
    console.log(props.attributes.imageUrl);

    return (
        <div className="weather-block">
            <h3 className="weather-block__title">Uranium City Weather: </h3>
            <div className="weather-block__content">
                <div className="weather-block__content--icon">
                    <img src={`${props.attributes.imageUrl}/icons/${props.attributes.weatherData.icon}.png` || 'loading . . . '} alt="weather icon" />
                    <p id="temperature">
                        {props.attributes.weatherData.temperature || 'loading...'}°C
                    </p>
                </div>
                <div className="weather-block__content--stats">

                    <p id="humidity">Humidity: {props.attributes.weatherData.humidity || 'loading...'}%</p> <p id="conditions">Conditions: {props.attributes.weatherData.weather || 'loading...'}</p>
                    <p id="feels-like">Feels Like: {props.attributes.weatherData.feelsLike || 'loading...'}°C</p>
                </div>
            </div>
        </div>
    )
}

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    // convert Kelvin to Celsius  
    const temperature = (data.main.temp - 273.15).toFixed(2);
    const humidity = data.main.humidity;
    const feelsLike = (data.main.feels_like - 273.15).toFixed(2);
    const weather = data.weather[0].description;
    let icon = data.weather[0].icon;

    return { temperature, humidity, weather, feelsLike, icon };
}