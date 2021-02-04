const USER_NAME = "userName";

const form = document.querySelector(".js-nameForm"); //폼 선택
const input = form.querySelector("input"); //input 선택
const greeting = document.querySelector(".js-greeting");
const hajimemashite = document.querySelector(".js-hajimemashite");
const clockBoxForGreetingJs = document.querySelector(".js-clockBox");
const clockForGreetingJs = clockBoxForGreetingJs.querySelector(".js-clock"); //삭제해도될듯
const toDoBox = document.querySelector(".js-toDoBox");
const dummyBox = document.querySelector(".js-dummyBox");

function resizeHajime() {
  input.addEventListener("input", () => {
    hide.innerText = input.value;
    if (hide.offsetWidth >= 300) {
      input.style.width = hide.offsetWidth + "px";
    }
  });
}

function addHoverOnRenameBtn() {
  greetingBox.addEventListener("mouseover", function () {
    //////
    const renameBtn = document.querySelector(".js-renameBtn");
    renameBtn.style.opacity = 100;
  });
  greetingBox.addEventListener("mouseout", function () {
    ///////
    const renameBtn = document.querySelector(".js-renameBtn");
    renameBtn.style.opacity = 0;
  });
}

function seeDummyBox() {
  dummyBox.classList.remove("invisible");
}

function seeToDoBox() {
  toDoBox.classList.remove("invisible");
}

function seeClockBox() {
  clockBoxForGreetingJs.classList.remove("invisible");
}

function seeGreeting() {
  //paintGreeting 되고나서 greeting이 보이도록 invisible 클래스를 지움
  greeting.classList.remove("invisible");
  addHoverOnRenameBtn();
}

function seeAfterSubmit() {
  hajimemashite.addEventListener("animationend", function () {
    seeDummyBox();
    seeClockBox();
    seeGreeting();
    seeToDoBox();
    genRenameForm();
    genBtn();
  });
}

function successLoad() {
  removeForm();
  removeHajimemashite();
  seeDummyBox();
  seeClockBox();
  seeGreeting();
  seeToDoBox();
  genRenameForm(); //identified in rename.js
  genBtn(); //identified in rename.js
}

function removeForm() {
  form.classList.remove("showing");
}

function removeHajimemashite() {
  hajimemashite.classList.remove("showing");
}

function removeFormAni() {
  form.classList.add("fadeout");
  form.removeEventListener("submit", handleSubmit); /////
  form.addEventListener("animationend", function () {
    form.classList.remove("fadeout");
    form.classList.remove("showing");
  });
}

function removeHajimemashiteAni() {
  hajimemashite.classList.add("fadeout");
  hajimemashite.addEventListener("animationend", function () {
    hajimemashite.classList.remove("fadeout");
    hajimemashite.classList.remove("showing");
  });
}

function saveName(userName) {
  localStorage.setItem(USER_NAME, userName);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  saveName(currentValue);
  input.value = "";
  removeHajimemashiteAni();
  removeFormAni();
  seeAfterSubmit();
  paintGreeting(currentValue);
}

function askForName() {
  resizeHajime();
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(userName) {
  const hourForGreet = new Date().getHours();
  if (hourForGreet > 6 && hourForGreet < 12) {
    greeting.innerText = `Good morning, `;
  } else if (hourForGreet >= 12 && hourForGreet < 18) {
    greeting.innerText = `Good afternoon, `;
  } else {
    greeting.innerText = `You must be exhausted, `;
  }
  const nameExp = document.createElement("span");
  nameExp.innerText = userName;
  nameExp.classList.add("js-nameExp");
  const owari = document.createElement("span");
  owari.innerText = ".";
  greeting.appendChild(nameExp);
  greeting.appendChild(owari);
}

function loadName() {
  const userName = localStorage.getItem(USER_NAME);
  if (userName === null) {
    askForName();
  } else {
    successLoad();
    paintGreeting(userName);
  }
}

function init() {
  loadName();
}

init();
