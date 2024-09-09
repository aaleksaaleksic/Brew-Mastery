const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchReviews() {
    fetch('http://localhost:3000/reviews', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(reviews => {
        const list = document.getElementById('review-list');
        list.innerHTML = '';
        reviews.forEach(review => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${review.rating}</td>
                <td>${review.comment}</td>
                <td>${review.Coffee.name}</td>
                <td>${review.userId}</td>
                <td>
                    <a href="edit-review.html?id=${review.id}" class="btn btn-warning">Edit</a>
                    <button class="btn btn-danger" onclick="deleteReview(${review.id})">Delete</button>
                </td>`;
            list.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));
}

function deleteReview(id) {
    if (confirm("Are you sure you want to delete this review?")) {
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchReviews())
        .catch(error => console.error('Error deleting review:', error));
    }
}

window.addEventListener('load', fetchReviews);
