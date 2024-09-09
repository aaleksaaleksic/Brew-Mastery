const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function loadUser() {
    fetch(`http://localhost:8001/auth/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('admin').value = user.admin ? 'true' : 'false';
    })
    .catch(error => console.error('Error fetching user:', error));
}

function updateUser(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        admin: document.getElementById('admin').value === 'true'
    };

    fetch(`http://localhost:8001/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'manage-users.html')
    .catch(error => console.error('Error updating user:', error));
}

window.addEventListener('load', function() {
    loadUser();
    const form = document.getElementById('edit-user-form');
    if (form) {
        form.addEventListener('submit', updateUser);
    }
});
