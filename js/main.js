let search=document.getElementById('search');
let find=document.getElementById('find');
let city=document.getElementById('city');
let temp=document.getElementById('temp');
let iconState=document.getElementById('icon_state');
let state=document.getElementById('state');
let speedWind=document.getElementById('speed_wind');
let DirectWind=document.getElementById('dir_wind');
let cloudPer=document.getElementById('cloud_per');
let iconDay2=document.getElementById('icon_day2');
let mxTemp2=document.getElementById('mx_day2');
let minTemp2=document.getElementById('min_day2');
let stateDay2=document.getElementById('state_day2');
let iconDay3=document.getElementById('icon_day3');
let mxTemp3=document.getElementById('mx_day3');
let minTemp3=document.getElementById('min_day3');
let stateDay3=document.getElementById('state_day3');

(function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation);
        if(navigator.geolocation.getCurrentPosition(showLocation)==null);
        getWeatherData('cairo')
    }
})();

function showLocation(position){
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    position=`${latitude},${longitude}`;
    getWeatherData(position)
}

find.addEventListener('click',function(){
    getWeatherData(search.value);
})
async function getWeatherData(q){
    let myHttp=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=73d5b9de236643f5b1b63008230708&q=${q}&days=3&aqi=no&alerts=no`)
    let result= await myHttp.json();
    console.log(result);
    temp.innerHTML=result.current.temp_c + `<sup>o</sup>C`;
    iconState.src=result.current.condition.icon;
    state.innerHTML=result.current.condition.text;
    city.innerHTML=result.location.country + ' - '+ result.location.region + ' - ' + result.location.name;
    speedWind.innerHTML=result.current.wind_kph+`km/h`;
    cloudPer.innerHTML=result.current.cloud +`%`;
    DirectWind.innerHTML=result.current.wind_dir;
    iconDay2.src=result.forecast.forecastday[1].day.condition.icon;
    mxTemp2.innerHTML=result.forecast.forecastday[1].day.maxtemp_c +`<sup>o</sup>C`;
    minTemp2.innerHTML=result.forecast.forecastday[1].day.mintemp_c +`<sup>o</sup>C`;
    stateDay2.innerHTML=result.forecast.forecastday[1].day.condition.text;
    iconDay3.src=result.forecast.forecastday[2].day.condition.icon;
    mxTemp3.innerHTML=result.forecast.forecastday[2].day.maxtemp_c +`<sup>o</sup>C`;
    minTemp3.innerHTML=result.forecast.forecastday[2].day.mintemp_c +`<sup>o</sup>C`;
    stateDay3.innerHTML=result.forecast.forecastday[2].day.condition.text;
}
let dayNow=document.getElementById('dayNow');
let month=document.getElementById('month');
let day2=document.getElementById('day2');
let day3=document.getElementById('day3');

(function getDays(){
    const weekDay=["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    const day=new Date();
    let dayFirst=weekDay[day.getDay()]
    dayNow.innerHTML=dayFirst;
    let day2Index = (day.getDay() + 1) % 7;
    let daySecond = weekDay[day2Index];
    day2.innerHTML=daySecond;
    let day3Index = (day.getDay() + 2) % 7;
    let dayThird = weekDay[day3Index];
    day3.innerHTML=dayThird;
})();
(function getMonth(){
    const Month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const m=new Date();
    let mon=Month[m.getMonth()];
    month.innerHTML= m.getDate() +' ' + mon
})();