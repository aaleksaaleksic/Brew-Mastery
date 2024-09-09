const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function saveAddon(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value
    };

    fetch('http://localhost:3000/addons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'addons.html')
    .catch(error => console.error('Error saving addon:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('addon-form');
    if (form) {
        form.addEventListener('submit', saveAddon);
    } else {
        console.error('Form element with ID "addon-form" not found.');
    }
});
