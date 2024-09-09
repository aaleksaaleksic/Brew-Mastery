const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function loadCategories() {
    fetch('http://localhost:3000/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(categories => {
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = ''; 
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));
}

function saveCoffee(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,  // Dodajemo description
        categoryId: document.getElementById('category').value,
        price: document.getElementById('price').value
    };

    fetch('http://localhost:3000/coffees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'coffees.html')
    .catch(error => console.error('Error saving coffee:', error));
}

window.addEventListener('load', function() {
    loadCategories();

    const form = document.getElementById('coffee-form');
    if (form) {
        form.addEventListener('submit', saveCoffee);
    } else {
        console.error('Form element with ID "coffee-form" not found.');
    }
});
