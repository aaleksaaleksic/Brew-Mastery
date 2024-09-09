const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const coffeeId = urlParams.get('id');

function loadCoffee() {
    fetch(`http://localhost:3000/coffees/${coffeeId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(coffee => {
        document.getElementById('name').value = coffee.name;
        document.getElementById('description').value = coffee.description;  // Popunjavamo opis
        document.getElementById('price').value = coffee.price;
        loadCategories(coffee.categoryId);
    })
    .catch(error => console.error('Error fetching coffee:', error));
}

function loadCategories(selectedCategoryId) {
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
        categorySelect.value = selectedCategoryId;
    })
    .catch(error => console.error('Error fetching categories:', error));
}

function updateCoffee(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,  // Dodajemo description
        categoryId: document.getElementById('category').value,
        price: document.getElementById('price').value
    };

    fetch(`http://localhost:3000/coffees/${coffeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'coffees.html')
    .catch(error => console.error('Error updating coffee:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('edit-coffee-form');
    if (form) {
        form.addEventListener('submit', updateCoffee);
        loadCoffee();  
    } else {
        console.error('Form element with ID "edit-coffee-form" not found.');
    }
});
