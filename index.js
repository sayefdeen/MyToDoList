var tbody = document.querySelector("tbody");
var thead = document.querySelector("thead");
var tasksForm = document.getElementById("chors-form");
var table = document.getElementById("task-table");
var clearAll = document.getElementById("clear-all");
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
  listArray = JSON.parse(localStorage.getItem("list")) || [];
  tbody.innerHTML = "";
  for (let index = 0; index < listArray.length; index++) {
    var newRow = `
        <tr>
        <td>${listArray[index].task}</td>
        <td>${listArray[index].date}</td>
        <td>${listArray[index].urguncy}</td>
        <td><button class="deleBtn" id="${index}">X</button></td>
        </tr>
    `;
    tbody.innerHTML += newRow;
  }
  changeColor();
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

clearAll.addEventListener("click", function () {
  localStorage.clear();
  tableBodyGenerate();
  alert("You just Cleared all tha date");
});

function changeColor() {
  var rows = table.rows;
  for (let index = 1; index < rows.length; index++) {
    var cellContent = rows[index].cells[2];
    switch (cellContent.innerHTML) {
      case "Low":
        cellContent.style.color = "green";
        break;
      case "Meduim":
        cellContent.style.color = "yellow";
        break;
      case "High":
        cellContent.style.color = "red";
        break;
    }
    console.log(rows[index].cells[2].innerHTML);
  }
}
