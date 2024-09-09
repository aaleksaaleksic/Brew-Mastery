const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function saveReview(event) {
    event.preventDefault();

    const data = {
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
        coffeeId: document.getElementById('coffeeId').value
    };

    fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'reviews.html')
    .catch(error => console.error('Error saving review:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('review-form');
    if (form) {
        form.addEventListener('submit', saveReview);
    } else {
        console.error('Form element with ID "review-form" not found.');
    }
});
