const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

let coffeeIndex = 0;

function addCoffee() {
    const container = document.getElementById('coffees-container');
    const coffeeHtml = `
        <div class="mb-3" id="coffee-${coffeeIndex}">
            <label for="coffeeId-${coffeeIndex}" class="form-label">Coffee ID</label>
            <input type="number" class="form-control" id="coffeeId-${coffeeIndex}" required>
            <label for="quantity-${coffeeIndex}" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity-${coffeeIndex}" required>
            <label for="price-${coffeeIndex}" class="form-label">Price</label>
            <input type="number" class="form-control" id="price-${coffeeIndex}" required>
            <button type="button" class="btn btn-danger" onclick="removeCoffee(${coffeeIndex})">Remove</button>
            <hr>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', coffeeHtml);
    coffeeIndex++;
}

function removeCoffee(index) {
    const coffeeElement = document.getElementById(`coffee-${index}`);
    coffeeElement.remove();
}

function saveOrder(event) {
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
                addons: []  // Addons can be handled similarly if needed
            });
        }
    }

    const data = { status, coffees };

    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = 'orders.html')
    .catch(error => console.error('Error saving order:', error));
}

window.addEventListener('load', function() {
    const form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', saveOrder);
    }
});
