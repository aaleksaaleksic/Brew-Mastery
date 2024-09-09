const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function savePromotion(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        discount: document.getElementById('discount').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value
    };

    fetch('http://localhost:3000/promotions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'promotions.html')
    .catch(error => console.error('Error saving promotion:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('promotion-form');
    if (form) {
        form.addEventListener('submit', savePromotion);
    } else {
        console.error('Form element with ID "promotion-form" not found.');
    }
});
