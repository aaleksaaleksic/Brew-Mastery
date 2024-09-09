const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchCategories() {
    return fetch('http://localhost:3000/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching categories:', error));
}

function fetchCoffees() {
    fetchCategories().then(categories => {
        const categoriesMap = {};
        categories.forEach(category => {
            categoriesMap[category.id] = category.name;
        });

        fetch('http://localhost:3000/coffees', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(coffees => {
            const list = document.getElementById('coffee-list');
            list.innerHTML = '';
            coffees.forEach(coffee => {
                const categoryName = categoriesMap[coffee.categoryId] || 'No category'; 
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${coffee.name}</td>
                    <td>${coffee.description}</td>
                    <td>${categoryName}</td>
                    <td>${coffee.price}</td>
                    <td>
                        <a href="edit-coffee.html?id=${coffee.id}" class="btn btn-warning">Edit</a>
                        <button class="btn btn-danger" onclick="deleteCoffee(${coffee.id})">Delete</button>
                    </td>`;
                list.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching coffees:', error));
    });
}

function deleteCoffee(id) {
    if (confirm("Are you sure you want to delete this coffee?")) {
        fetch(`http://localhost:3000/coffees/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchCoffees())
        .catch(error => console.error('Error deleting coffee:', error));
    }
}

window.addEventListener('load', fetchCoffees);
