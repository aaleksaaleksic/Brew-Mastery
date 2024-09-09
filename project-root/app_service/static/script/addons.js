const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchAddons() {
    fetch('http://localhost:3000/addons', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(addons => {
        const list = document.getElementById('addon-list');
        list.innerHTML = '';
        addons.forEach(addon => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${addon.name}</td>
                <td>${addon.price}</td>
                <td>
                    <a href="edit-addon.html?id=${addon.id}" class="btn btn-warning">Edit</a>
                    <button class="btn btn-danger" onclick="deleteAddon(${addon.id})">Delete</button>
                </td>`;
            list.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching addons:', error));
}

function deleteAddon(id) {
    if (confirm("Are you sure you want to delete this addon?")) {
        fetch(`http://localhost:3000/addons/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchAddons())
        .catch(error => console.error('Error deleting addon:', error));
    }
}

window.addEventListener('load', fetchAddons);
