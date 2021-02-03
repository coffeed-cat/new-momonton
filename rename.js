const greetingBox = document.querySelector(".js-greetingBox");
const hide = document.querySelector("#hide");

function resize() {
  const renameInput = document.querySelector(".js-renameInput");
  hide.innerText = renameInput.value;
  renameInput.style.width = hide.offsetWidth + "px";
}

function greetingWhileRename() {
  const hourForGreet = new Date().getHours();
  if (hourForGreet > 6 && hourForGreet < 12) {
    greeting.innerText = `Good moring, `;
  } else if (hourForGreet >= 12 && hourForGreet < 18) {
    greeting.innerText = `Good afternoon, `;
  } else {
    greeting.innerText = `You must be exhausted, `;
  }
  const owari = document.createElement("span");
  owari.innerText = ".";
  owari.style.fontSize = "46px";
  owari.style.paddingRight = "25px";
  owari.classList.add("owari");
  greetingBox.appendChild(owari);
}

/*
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
*/

function seeRenameBtn() {
  const renameBtn = document.querySelector(".js-renameBtn");
  renameBtn.classList.add("showingAsInline");
}

function removeRenameBtn() {
  const renameBtn = document.querySelector(".js-renameBtn");
  renameBtn.classList.remove("showingAsInline");
}

function seeRenameForm() {
  const renameForm = document.querySelector(".js-renameForm");
  renameForm.classList.remove("invisible");
}

function removeRenameForm() {
  const renameForm = document.querySelector(".js-renameForm");
  renameForm.classList.add("invisible");
}

function handleSubmitRename(event) {
  event.preventDefault();
  const renameForm = document.querySelector(".js-renameForm");
  const renameInput = renameForm.querySelector(".js-renameInput");
  const currentValue = renameInput.value;
  const owari = document.querySelector(".owari");
  greetingBox.removeChild(owari);
  saveName(currentValue);
  renameInput.value = "";
  paintGreeting(currentValue);
  seeRenameBtn();
  removeRenameForm();
  const nameExp = document.querySelector(".js-nameExp");
  nameExp.classList.add("blink"); /////
  nameExp.addEventListener("animationend", function () {
    /////
    nameExp.classList.remove("blink");
  });
}

function handleRenameBtnClick(event) {
  seeRenameForm();
  removeRenameBtn();
  greetingWhileRename();
  const renameInput = document.querySelector(".js-renameInput");
  renameInput.value = localStorage.getItem(USER_NAME);
  resize();
  renameInput.classList.add("blink"); /////
  renameInput.addEventListener("animationend", function () {
    /////
    renameInput.classList.remove("blink");
  });
}

function genRenameForm() {
  const renameForm = document.createElement("form");
  const renameInput = document.createElement("input");
  renameInput.type = "text";
  renameInput.classList.add("js-renameInput");
  renameForm.classList.add("invisible");
  renameForm.classList.add("js-renameForm");
  renameForm.classList.add("renameForm");
  renameForm.addEventListener("input", resize);
  renameForm.addEventListener("submit", handleSubmitRename);
  renameForm.appendChild(renameInput);
  greetingBox.appendChild(renameForm);
}

function genBtn() {
  const renameBtn = document.createElement("i");
  renameBtn.classList.add("fas");
  renameBtn.classList.add("fa-pen");
  renameBtn.addEventListener("click", handleRenameBtnClick);
  renameBtn.classList.add("js-renameBtn");
  renameBtn.classList.add("renameBtn");
  renameBtn.classList.add("showingAsInline");
  greetingBox.appendChild(renameBtn);
}
