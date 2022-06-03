// Variables definition
const url = "http://localhost:8080/api/users";
const url1 = "http://localhost:8080/api/user"

const adminContainer = document.getElementById("allUsersTableBody");

const addUserForm = document.getElementById("addUserForm");
const addName = document.getElementById("addName");
const addSurname = document.getElementById("addSurname");
const addAge = document.getElementById("addAge");
const addEmail = document.getElementById("addEmail");
const addPassword = document.getElementById("addPassword");
const addRoles = document.getElementById("addRoles");
const addAdminRole = document.getElementById("addAdminRole");
const addUserRole = document.getElementById("addUserRole");


const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteForm = document.getElementById("deleteForm");

const updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
const updateForm = document.getElementById("updateForm");
let updateId = "";
let updateName = "";
let updateSurname = "";
let updateAge = "";
let updateEmail = "";
let updatePassword = "";
let updateRoles = "";
let updateAdminRole = "";
let updateUserRole = "";

const adminContainer2 = document.getElementById("adminOneUserTableBody");

let adminShowAllUsersResult = "";
let adminShowOneUserResult = "";


// Show All Users, GET_Method
const showAllUsers = (users) => {
    users.forEach(user => {
        let roleName = "";
        user.roles.forEach(role => {
            roleName += role.name + " ";
        });
        adminShowAllUsersResult += `
            <tr>
                <td class="text-center">${user.id}</td>
                <td class="text-center">${user.name}</td>
                <td class="text-center">${user.surname}</td>
                <td class="text-center">${user.age}</td>
                <td class="text-center">${user.email}</td>
                <td class="text-center">${roleName}</td>
                <td class="text-center">
                    <a class="updateBtn btn btn-info btn-sm mr-1">
                        Update
                    </a>
                    <a class="deleteBtn btn btn-danger btn-sm mr-1">
                        Delete
                    </a>
                </td>
            </tr>
    `
    })

    adminContainer.innerHTML = adminShowAllUsersResult;
}

fetch(url)
    .then(response => response.json())
    .then(data => showAllUsers(data))
    .catch(error => console.log(error))


// Add New User, POST_Method
addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedValues = [].filter
        .call(addRoles.options, option => option.selected)
        .map(option => option.value);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addName.value,
            surname: addSurname.value,
            age: addAge.value,
            email: addEmail.value,
            password: addPassword.value,
            roles: [
                selectedValues[0]
            ]
        })
    })
        .then(response => response.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            showAllUsers(dataArr);
        })
    event.currentTarget.submit();
})


// Button Events
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)) {
            handler(e);
        }
    })
}


// Delete User, DELETE_Method
let deleteResult = "";
const deleteContainer = document.getElementById("deleteAttr");
const fillDeleteForm = (user => {
    deleteResult =
    `
            <div class="form-group">
                <label for="deleteId">ID</label>
                <input type="text" class="form-control" id="deleteId" value="${user.id}" readonly>
            </div>
            <div class="form-group">
                <label for="deleteName">Name</label>
                <input type="text" class="form-control" id="deleteName" value="${user.name}" readonly>
            </div>
            <div class="form-group">
                <label for="deleteSurname">Surname</label>
                <input type="text" class="form-control" id="deleteSurname" value="${user.surname}" readonly>
            </div>
            <div class="form-group">
                <label for="deleteAge">Age</label>
                <input type="text" class="form-control" id="deleteAge" value="${user.age}" readonly>
            </div>
            <div class="form-group">
                <label for="deleteEmail">Email</label>
                <input type="text" class="form-control" id="deleteEmail" value="${user.email}" readonly>
            </div>
            <div class="form-group">
                <label for="deletePassword">Password</label>
                <input type="password" class="form-control" id="deletePassword" value="${user.password}" readonly>
            </div>
            <div class="form-group">
                <label for="deleteRoles">Roles</label>
                <select id="deleteRoles" multiple="multiple" class="form-control" readonly>
                    <option value="${user.roles[0]}">ROLE_ADMIN</option>
                    <option value="${user.roles[1]}">ROLE_USER</option>
                </select>
            </div>
    `
    deleteContainer.innerHTML = deleteResult;
});
let tempId = "";
let idDeleteForm = "";
on(document, "click", ".deleteBtn", e => {
    const row = e.target.parentNode.parentNode;
    idDeleteForm = row.firstElementChild.innerHTML;

    fetch(url + "/" + idDeleteForm)
        .then(response => response.json())
        .then(data => fillDeleteForm(data))
        .catch(error => console.log(error))

    deleteModal.show();
});
tempId = idDeleteForm;

deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(url + "/" + idDeleteForm, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(response => location.reload())

    event.currentTarget.submit();
    deleteModal.hide();
})


// Update User, PUT_Method
let updateResult = "";
const updateContainer = document.getElementById("updateAttr");
const fillUpdateForm = (user => {
    updateResult =
        `
            <div class="form-group">
                <label for="updateId">ID</label>
                <input type="number" class="form-control" id="updateId" value="${user.id}" readonly>
            </div>
            <div class="form-group">
                <label for="updateName">Name</label>
                <input type="text" class="form-control" id="updateName" value="${user.name}">
            </div>
            <div class="form-group">
                <label for="updateSurname">Surname</label>
                <input type="text" class="form-control" id="updateSurname" value="${user.surname}">
            </div>
            <div class="form-group">
                <label for="updateAge">Age</label>
                <input type="number" class="form-control" id="updateAge" value="${user.age}">
            </div>
            <div class="form-group">
                <label for="updateEmail">Email</label>
                <input type="text" class="form-control" id="updateEmail" value="${user.email}">
            </div>
            <div class="form-group">
                <label for="updatePassword">Password</label>
                <input type="password" class="form-control" id="updatePassword" value="${user.password}">
            </div>
            <div class="form-group">
                <label for="updateRoles">Roles</label>
                    <select id="updateRoles" multiple="multiple" class="form-control">
                        <option id="updateAdminRole" value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option id="updateUserRole" value="ROLE_USER">ROLE_USER</option>
                    </select>
            </div>
    `
    updateContainer.innerHTML = updateResult;

    updateId = document.getElementById("updateId");
    updateName = document.getElementById("updateName");
    updateSurname = document.getElementById("updateSurname");
    updateAge = document.getElementById("updateAge");
    updateEmail = document.getElementById("updateEmail");
    updatePassword = document.getElementById("updatePassword");
    updateRoles = document.getElementById("updateRoles");
    updateAdminRole = document.getElementById("updateAdminRole");
    updateUserRole = document.getElementById("updateUserRole");


});

let idUpdateForm = "";
on(document, "click", ".updateBtn", e => {
    const row2 = e.target.parentNode.parentNode;
    idUpdateForm = row2.children[0].innerHTML;

    fetch(url + "/" + idUpdateForm)
        .then(response => response.json())
        .then(data => fillUpdateForm(data))
        .catch(error => console.log(error))

    updateModal.show();
});

updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: updateId.value,
            name: updateName.value,
            surname: updateSurname.value,
            age: updateAge.value,
            email: updateEmail.value,
            password: updatePassword.value,
            roles: [
                updateRoles.value
            ]
        })
    })
        .then(response => response.json())
        .then(response => location.reload())

    event.currentTarget.submit();
    updateModal.hide();
})


// Admin: Show One User, GET_Method
const adminShowOneUser = (principal => {
    let roleName = "";
    principal.roles.forEach(role => {
        roleName += role.name + " ";
    });
    adminShowOneUserResult = `
            <tr>
                <td class="text-center">${principal.id}</td>
                <td class="text-center">${principal.name}</td>
                <td class="text-center">${principal.surname}</td>
                <td class="text-center">${principal.age}</td>
                <td class="text-center">${principal.email}</td>
                <td class="text-center">${roleName}</td>
</tr>
`
    adminContainer2.innerHTML = adminShowOneUserResult;
    })

fetch(url1)
    .then(response => response.json())
    .then(data => adminShowOneUser(data))
    .catch(error => console.log(error))