const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchCategories() {
    fetch('http://localhost:3000/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(categories => {
            const list = document.getElementById('category-list');
            list.innerHTML = '';
            categories.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.name}</td>
                    <td>
                        <a href="edit-category.html?id=${category.id}" class="btn btn-warning">Edit</a>
                        <button class="btn btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
                    </td>`;
                list.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function deleteCategory(id) {
    if (confirm("Are you sure you want to delete this category?")) {
        fetch(`http://localhost:3000/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => fetchCategories())
            .catch(error => console.error('Error deleting category:', error));
    }
}

window.addEventListener('load', fetchCategories);
