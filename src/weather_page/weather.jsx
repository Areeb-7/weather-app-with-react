import { useEffect, useState } from "react";
import './weather.css'

function WeatherApi(){
    let [city,SetCity]=useState("")
    let [Weather,setWeather]=useState(null)
    let [search,setSearch]=useState("pune")
    
    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=13cab41f3863e6d7aba574abfa084cc1`)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                setWeather(data)
                console.log(data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[search])

    function Handleinp(){
        SetCity(event.target.value)
    }
    function searchCity(){
        event.preventDefault();
        setSearch(city);
        console.log(search)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=13cab41f3863e6d7aba574abfa084cc1`,{
            method:"GET",
            
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            // setSearch(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        let kelvinTemp = Weather.main.temp;
        let celsiusTemp = kelvinTemp - 273.15;
        console.log(celsiusTemp.toFixed(2) + ' °C');
    }
   return(
    <>
    <section className="page">
        <div className="container">
            {Weather !== null ? <div className="detail">
                <form className="inp" onSubmit={searchCity}>
                    <input type="text" className="serc_bar" name="search" placeholder="Enter the city"
                    onChange={Handleinp}/>
                    <button type="submit" className="butt"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="detail-div">
                    <h5>City: {Weather.name}</h5>
                    <h5>Temperature: {Math.round((Weather.main.temp)- 273.15) + ' °C'} </h5>
                    <h5>Humidity: {Weather.main.humidity} %</h5>
                </div>
            </div>
            : <>Loading...</>}   
        </div>
    </section>
    </>
   )

}
export default WeatherApi