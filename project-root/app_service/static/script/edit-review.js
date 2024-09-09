const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const reviewId = urlParams.get('id');

function loadReview() {
    fetch(`http://localhost:3000/reviews/${reviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(review => {
        document.getElementById('rating').value = review.rating;
        document.getElementById('comment').value = review.comment;
        document.getElementById('coffeeId').value = review.coffeeId;
    })
    .catch(error => console.error('Error fetching review:', error));
}

function updateReview(event) {
    event.preventDefault();

    const data = {
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
        coffeeId: document.getElementById('coffeeId').value
    };

    fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'reviews.html')
    .catch(error => console.error('Error updating review:', error));
}

window.addEventListener('load', function() {
    loadReview();
    const form = document.getElementById('edit-review-form');
    if (form) {
        form.addEventListener('submit', updateReview);
    } else {
        console.error('Form element with ID "edit-review-form" not found.');
    }
});
