var tbody = document.querySelector("tbody");
var thead = document.querySelector("thead");
var tasksForm = document.getElementById("chors-form");
var table = document.getElementById("task-table");
// bring the array form the local storage.
var listArray = JSON.parse(localStorage.getItem("list")) || [];

// Constructor
function List(task, date, urguncy) {
  this.task = task;
  this.date = date;
  this.urguncy = urguncy;
}
generateHeader();

function generateHeader() {
  var head = `
        <tr>
        <td>Task</td>
        <td>Date</td>
        <td>Urgancy</td>
        <td>Done</td>
        </tr>
    `;

  thead.innerHTML = head;
}

// Even To the form/ adding to local storage.
tasksForm.addEventListener("submit", function () {
  event.preventDefault();
  var taskValue = document.getElementById("task").value;
  var dateValue = document.getElementById("date").value;
  var urgValue = document.getElementById("urgancy").value;
  document.getElementById("chors-form").reset();
  var newTask = new List(taskValue, dateValue, urgValue);
  listArray.push(newTask);
  localStorage.setItem("list", JSON.stringify(listArray));
  tableBodyGenerate();
});

function tableBodyGenerate() {
  tbody.innerHTML = "";
  for (let index = 0; index < listArray.length; index++) {
    var newRow = `
        <tr>
        <td>${listArray[index].task}</td>
        <td>${listArray[index].date}</td>
        <td>${listArray[index].urguncy}</td>
        <td><button id="${index}">X</button></td>
        </tr>
    `;
    tbody.innerHTML += newRow;
  }
}
tableBodyGenerate();

// Delete form the array.

table.addEventListener("click", function () {
  var eventTarget = event.target;
  if (eventTarget.innerHTML == "X") {
    listArray.splice(eventTarget.id, 1);
    localStorage.setItem("list", JSON.stringify(listArray));
    tableBodyGenerate();
  }
});
