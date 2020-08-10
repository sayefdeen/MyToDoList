var tbody = document.querySelector("tbody");
var thead = document.querySelector("thead");

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
