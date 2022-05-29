// User: Show One User, GET_Method
const url1 = "http://localhost:8080/api/user";
const userContainer = document.getElementById("userOneUserTableBody");
let userShowOneUserResult = "";

const userShowOneUser = (principal => {
    userShowOneUserResult = `
            <tr>
                <td class="text-center">${principal.id}</td>
                <td class="text-center">${principal.name}</td>
                <td class="text-center">${principal.surname}</td>
                <td class="text-center">${principal.age}</td>
                <td class="text-center">${principal.email}</td>
                <td class="text-center">${principal.roles}</td>
            </tr>
    `
    userContainer.innerHTML = userShowOneUserResult;
    console.log(userShowOneUserResult);
})

fetch(url1)
    .then(response => response.json())
    .then(data => userShowOneUser(data))
    .catch(error => console.log(error))