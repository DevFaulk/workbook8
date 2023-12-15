//get html element
const usersTableBody = document.getElementById("usersTableBody");

//write function
function loadUsersTable(users) {
  for (const user of users) {
    let row = usersTableBody.insertRow();
    row.id = user.id;
    console.log(user)
    let cell1 = row.insertCell();
    cell1.innerText = user.name;

    let cell2 = row.insertCell();
    cell2.innerText = user.email;

    let cell3 = row.insertCell();
    cell3.innerText = user.username;

    let cell4 = row.insertCell();
    editLink(user, cell4);

    let cell5 = row.insertCell();
    deleteButton(user, cell5);
  }
}

function editLink(user, cell4) {
  let link = document.createElement("a");
  link.innerText = "Edit User";
  link.href = `http://localhost:5500/edit.html?userId=${user.id}`;
  cell4.appendChild(link);
}

function deleteButton(user, cell5) {
  let button = document.createElement("button");
  button.innerText = "Delete User";
  button.setAttribute("onclick", `deleteUser(${user.id})`);
  cell5.appendChild(button);
}

async function deleteUser(row) {
  await fetch(`http://localhost:3000/users/${row}`, {
    method: "DELETE",
  });
  location.reload();
}

function initialize() {
  let users = fetch("http://localhost:3000/users");

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      loadUsersTable(data);
    });
}

window.onload = initialize;
