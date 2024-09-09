const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const addonId = urlParams.get('id');

function loadAddon() {
    fetch(`http://localhost:3000/addons/${addonId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(addon => {
        document.getElementById('name').value = addon.name;
        document.getElementById('price').value = addon.price;
    })
    .catch(error => console.error('Error fetching addon:', error));
}

function updateAddon(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value
    };

    fetch(`http://localhost:3000/addons/${addonId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'addons.html')
    .catch(error => console.error('Error updating addon:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('edit-addon-form');
    if (form) {
        form.addEventListener('submit', updateAddon);
        loadAddon();  
    } else {
        console.error('Form element with ID "edit-addon-form" not found.');
    }
});
