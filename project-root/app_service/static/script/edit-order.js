const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('id');
let coffeeIndex = 0;

// Funkcija za učitavanje narudžbine i prikazivanje njenih stavki
function loadOrder() {
    fetch(`http://localhost:3000/orders/${orderId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(order => {
        document.getElementById('status').value = order.status;
        order.OrderItems.forEach(item => {
            addCoffee(item);
        });
    })
    .catch(error => console.error('Error fetching order:', error));
}

// Funkcija za dodavanje kafa u formu
function addCoffee(item = null) {
    const container = document.getElementById('coffees-container');
    const coffeeHtml = `
        <div class="mb-3" id="coffee-${coffeeIndex}">
            <label for="coffeeId-${coffeeIndex}" class="form-label">Coffee ID</label>
            <input type="number" class="form-control" id="coffeeId-${coffeeIndex}" value="${item ? item.coffeeId : ''}" required>
            <label for="quantity-${coffeeIndex}" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity-${coffeeIndex}" value="${item ? item.quantity : ''}" required>
            <label for="price-${coffeeIndex}" class="form-label">Price</label>
            <input type="number" class="form-control" id="price-${coffeeIndex}" value="${item ? item.price : ''}" required>
            <button type="button" class="btn btn-danger" onclick="removeCoffee(${coffeeIndex})">Remove</button>
            <hr>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', coffeeHtml);
    coffeeIndex++;
}

// Funkcija za uklanjanje kafa
function removeCoffee(index) {
    const coffeeElement = document.getElementById(`coffee-${index}`);
    coffeeElement.remove();
}

// Funkcija za ažuriranje narudžbine
function updateOrder(event) {
    event.preventDefault();

    const status = document.getElementById('status').value;
    const coffees = [];

    for (let i = 0; i < coffeeIndex; i++) {
        const coffeeId = document.getElementById(`coffeeId-${i}`);
        const quantity = document.getElementById(`quantity-${i}`);
        const price = document.getElementById(`price-${i}`);
        
        if (coffeeId && quantity && price) {
            coffees.push({
                coffeeId: coffeeId.value,
                quantity: quantity.value,
                price: price.value,
                addons: []  // Addons can be handled if needed
            });
        }
    }

    const data = { status, coffees };

    fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'orders.html')
    .catch(error => console.error('Error updating order:', error));
}

window.addEventListener('load', function() {
    loadOrder();
    const form = document.getElementById('edit-order-form');
    if (form) {
        form.addEventListener('submit', updateOrder);
    }
});
