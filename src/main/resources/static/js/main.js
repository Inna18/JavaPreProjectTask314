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

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteForm = document.getElementById("deleteForm");
const deleteId = document.getElementById("deleteId");
const deleteName = document.getElementById("deleteName");
const deleteSurname = document.getElementById("deleteSurname");
const deleteAge = document.getElementById("deleteAge");
const deleteEmail = document.getElementById("deleteEmail");
const deletePassword = document.getElementById("deletePassword");
const deleteRoles = document.getElementById("deleteRoles");

const updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
const updateForm = document.getElementById("updateForm");
const updateId = document.getElementById("updateId");
const updateName = document.getElementById("updateName");
const updateSurname = document.getElementById("updateSurname");
const updateAge = document.getElementById("updateAge");
const updateEmail = document.getElementById("updateEmail");
const updatePassword = document.getElementById("updatePassword");
const updateRoles = document.getElementById("updateRoles");

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
        .map(option => option.text);

    // ???
    // let rolesArr = {1: selectedValues[0], 2: selectedValues[1]};
    // console.log(rolesArr);
    // console.log(selectedValues[0]); // Admin
    // console.log(selectedValues[1]); // User

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
            roles: selectedValues
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
const selectedValues2 = [].filter
    .call(deleteRoles.options, option => option.selected)
    .map(option => option.text);

on(document, "click", ".deleteBtn", e => {
    const row = e.target.parentNode.parentNode;
    const idDeleteForm = row.firstElementChild.innerHTML;
    const nameDeleteForm = row.children[1].innerHTML;
    const surnameDeleteForm = row.children[2].innerHTML;
    const ageDeleteForm = row.children[3].innerHTML;
    const emailDeleteForm = row.children[4].innerHTML;
    const passwordDeleteForm = row.children[5].innerHTML; // ???????
    const rolesDeleteForm = selectedValues2; // ???????

    deleteId.value = idDeleteForm;
    deleteName.value = nameDeleteForm;
    deleteSurname.value = surnameDeleteForm;
    deleteAge.value = ageDeleteForm;
    deleteEmail.value = emailDeleteForm;
    deletePassword.value = passwordDeleteForm; // ???????
    deleteRoles.value = rolesDeleteForm; // ???????

    deleteModal.show();
});



deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(url + "/" + deleteId.value, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(response => location.reload())

    event.currentTarget.submit();
    deleteModal.hide();
})


// Update User, PUT_Method
const selectedValues3 = [].filter
    .call(updateRoles.options, option => option.selected)
    .map(option => option.text);

on(document, "click", ".updateBtn", e => {
    const row2 = e.target.parentNode.parentNode;
    const idUpdateForm = row2.children[0].innerHTML;
    const nameEditForm = row2.children[1].innerHTML;
    const surnameEditForm = row2.children[2].innerHTML;
    const ageEditForm = row2.children[3].innerHTML;
    const emailEditForm = row2.children[4].innerHTML;
    const passwordEditForm = row2.children[5].innerHTML; // ???????
    const rolesEditForm = selectedValues3; // ???????

    updateId.value = idUpdateForm;
    updateName.value = nameEditForm;
    updateSurname.value = surnameEditForm;
    updateAge.value = ageEditForm;
    updateEmail.value = emailEditForm;
    updatePassword.value = passwordEditForm; // ???????
    updateRoles.value = rolesEditForm; // ???????

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
            password: updatePassword.value, // ???????
            roles: updateRoles.value // ???????
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