const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function saveCategory(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    if (!nameInput) {
        console.error('Element with ID "name" not found.');
        return;
    }

    const data = {
        name: nameInput.value
    };

    fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'categories.html')
    .catch(error => console.error('Error saving category:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('category-form');
    if (form) {
        form.addEventListener('submit', saveCategory);
    } else {
        console.error('Form element with ID "category-form" not found.');
    }
});
