const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchUsers() {
    fetch('http://localhost:8001/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(users => {
        const list = document.getElementById('user-list');
        list.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.admin ? 'Yes' : 'No'}</td>
                <td>
                    <a href="edit-user.html?id=${user.id}" class="btn btn-warning">Edit</a>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>`;
            list.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`http://localhost:8001/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchUsers())
        .catch(error => console.error('Error deleting user:', error));
    }
}

window.addEventListener('load', fetchUsers);
