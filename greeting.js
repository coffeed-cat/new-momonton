const USER_NAME = "userName";

const form = document.querySelector(".js-nameForm");//폼 선택
const input = form.querySelector("input");//input 선택
const greeting = document.querySelector(".js-greeting");
const hajimemashite = document.querySelector(".js-hajimemashite");

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

function seeGreeting(){
    //paintGreeting 되고나서 greeting이 보이도록 invisible 클래스를 지움
    greeting.classList.remove("invisible");
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    localStorage.setItem(USER_NAME,currentValue);
    input.value = '';
    removeHajimemashiteAni();
    removeFormAni();
    paintGreeting(currentValue);
}

function askForName(){
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(userName){
    greeting.innerText = `Good Day. ${userName}`;
    seeGreeting();
}


function loadName(){
    const userName = localStorage.getItem(USER_NAME);
    if(userName === null){
        askForName();
    }else{
        paintGreeting(userName);
    }
}

function init(){
    loadName();
}

init();