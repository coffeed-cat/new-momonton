const clockBox = document.querySelector(".js-clockBox");
const clock = clockBox.querySelector(".js-clock");

function getTime(){
    const date=new Date();
    const hour=date.getHours();
    const minute = date.getMinutes();
    clock.innerText = `${ hour < 10 ? `0${hour}` : hour}:${ minute < 10 ? `0${minute}` : minute}`;//10이하일때 0 떼기
}

function init(){
    setInterval(getTime,1000);//계속 시간을 갱신하기 위함
}

init();