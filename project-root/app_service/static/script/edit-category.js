const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('id');

function loadCategory() {
    fetch(`http://localhost:3000/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.value = data.name;
        } else {
            console.error('Element with ID "name" not found.');
        }
    })
    .catch(error => console.error('Error fetching category:', error));
}

function updateCategory(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    if (!nameInput) {
        console.error('Element with ID "name" not found.');
        return;
    }

    const data = {
        name: nameInput.value
    };

    fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'categories.html')
    .catch(error => console.error('Error updating category:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('edit-category-form');
    if (form) {
        form.addEventListener('submit', updateCategory);
        loadCategory();  // Load the category data after the page has fully loaded
    } else {
        console.error('Form element with ID "edit-category-form" not found.');
    }
});
