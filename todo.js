const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDo";
let arrayNum = 1;
let toDoArr = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const cleanToDoArr = toDoArr.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  toDoList.removeChild(li);
  toDoArr = cleanToDoArr;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDoArr));
}

function handleSubmitToDo(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintToDo(currentValue);
}

function paintToDo(todo) {
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deleteToDo);
  delBtn.classList.add("far");
  delBtn.classList.add("fa-times-circle");
  delBtn.style.cursor = "pointer";
  span.innerText = todo;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = arrayNum;
  toDoList.appendChild(li);
  const toDoObj = {
    text: todo,
    id: arrayNum,
  };
  arrayNum += 1;
  toDoArr.push(toDoObj);
  saveToDo();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmitToDo);
}

init();
