const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const promotionId = urlParams.get('id');

function loadPromotion() {
    fetch(`http://localhost:3000/promotions/${promotionId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(promotion => {
        document.getElementById('name').value = promotion.name;
        document.getElementById('description').value = promotion.description;
        document.getElementById('discount').value = promotion.discount;
        document.getElementById('startDate').value = promotion.startDate.split('T')[0]; // Remove time
        document.getElementById('endDate').value = promotion.endDate.split('T')[0]; // Remove time
    })
    .catch(error => console.error('Error fetching promotion:', error));
}

function updatePromotion(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        discount: document.getElementById('discount').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value
    };

    fetch(`http://localhost:3000/promotions/${promotionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'promotions.html')
    .catch(error => console.error('Error updating promotion:', error));
}

window.addEventListener('load', function() {
    loadPromotion();
    const form = document.getElementById('edit-promotion-form');
    if (form) {
        form.addEventListener('submit', updatePromotion);
    }
});
