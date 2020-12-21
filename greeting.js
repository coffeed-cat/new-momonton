const USER_NAME = "userName";

const form = document.querySelector(".js-nameForm");//폼 선택
const input = form.querySelector("input");//input 선택
const greeting = document.querySelector(".js-greeting");
const hajimemashite = document.querySelector(".js-hajimemashite");
const clockBoxForGreetingJs = document.querySelector(".js-clockBox");
const clockForGreetingJs = clockBoxForGreetingJs.querySelector(".js-clock");
const rinziBox = document.querySelector(".js-rinziBox");

function rename(){
    form.classList.add("showing");
}

function genBtn(){
    const renameBtn = document.createElement("btn");
    renameBtn.innerText = "X";
    renameBtn.addEventListener("click",rename);
    renameBtn.classList.add("fadein");
    rinziBox.appendChild(renameBtn);
}

function seeClockBox(){
    clockBoxForGreetingJs.classList.remove("invisible");
}

function seeGreeting(){
    //paintGreeting 되고나서 greeting이 보이도록 invisible 클래스를 지움
    greeting.classList.remove("invisible");
}

function seeAfterSubmit(){
    hajimemashite.addEventListener("animationend",function(){
        seeClockBox();
        seeGreeting();
    });
}

function successLoad(){
    removeForm();
    removeHajimemashite();
    seeClockBox();
    seeGreeting();
    genBtn();  
}

function removeForm(){
    form.classList.remove("showing");
}

function removeHajimemashite(){
    hajimemashite.classList.remove("showing");
}

function removeFormAni(){
    form.classList.add("fadeout");
    form.addEventListener("animationend",function(){
        form.classList.remove("fadeout");
        form.classList.remove("showing");
    });
}

function removeHajimemashiteAni(){
    hajimemashite.classList.add("fadeout");
    hajimemashite.addEventListener("animationend",function(){
        hajimemashite.classList.remove("fadeout");
        hajimemashite.classList.remove("showing");
    });
}


function saveName(userName){
    localStorage.setItem(USER_NAME,userName);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    input.value = '';
    removeHajimemashiteAni();
    removeFormAni();
    seeAfterSubmit();
    paintGreeting(currentValue);
}

function askForName(){
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(userName){
    const hourForGreet = new Date().getHours();
    if(hourForGreet > 6 && hourForGreet < 12){
        greeting.innerText = `Good Moring. ${userName}!`;
    }else if(hourForGreet >= 12 && hourForGreet < 18){
        greeting.innerText = `Good Afternoon. ${userName}!`;
    }else{
        greeting.innerText = `You must be exhausted. ${userName}`;
    }
}


function loadName(){
    const userName = localStorage.getItem(USER_NAME);
    if(userName === null){
        askForName();
    }else{
        successLoad();
        paintGreeting(userName);
    }
}

function init(){
    loadName();
}

init();