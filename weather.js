/* loadCoord 한다. 코드정보가 없으면 코드를 불러온다. 로컬스토리지 저장할때는 string화 시킬것. */
const API_KEY = "6970f51262a4049348352b0d513f41c0";
const COORDS = "coords";

const weatherInfo = document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weatherInfo.innerText = `${temp}@${place}`;
    })
}

function handleGeoError(){
    console.log("Cannot access geo location");
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();//위치 데이터가 없을 시 위치 데이터를 요청함
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);//위치 데이터가 있을 시 바로 날씨데이터 요청
    }
}

function init(){
    loadCoords();//위치, 날씨 데이터 로드
}

init();