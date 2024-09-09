const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchPromotions() {
    fetch('http://localhost:3000/promotions', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(promotions => {
        const list = document.getElementById('promotion-list');
        list.innerHTML = '';
        promotions.forEach(promotion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${promotion.name}</td>
                <td>${promotion.description}</td>
                <td>${promotion.discount}%</td>
                <td>${new Date(promotion.startDate).toLocaleDateString()}</td>
                <td>${new Date(promotion.endDate).toLocaleDateString()}</td>
                <td>
                    <a href="edit-promotion.html?id=${promotion.id}" class="btn btn-warning">Edit</a>
                    <button class="btn btn-danger" onclick="deletePromotion(${promotion.id})">Delete</button>
                </td>`;
            list.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching promotions:', error));
}

function deletePromotion(id) {
    if (confirm("Are you sure you want to delete this promotion?")) {
        fetch(`http://localhost:3000/promotions/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchPromotions())
        .catch(error => console.error('Error deleting promotion:', error));
    }
}

window.addEventListener('load', fetchPromotions);
