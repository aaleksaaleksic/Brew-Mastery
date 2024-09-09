const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function saveUser(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,  // Dodajemo password
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'manage-users.html')
    .catch(error => console.error('Error saving user:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', saveUser);
    }
});
