const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function fetchOrders() {
    fetch('http://localhost:3000/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(orders => {
        const list = document.getElementById('order-list');
        list.innerHTML = '';
        orders.forEach(order => {
            let coffeeDetails = '';
            let totalPrice = 0;

            order.OrderItems.forEach(item => {
                coffeeDetails += `${item.Coffee.name} (x${item.quantity}), `;
                totalPrice += item.price * item.quantity;
            });

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.status}</td>
                <td>${order.userId}</td>
                <td>${coffeeDetails.slice(0, -2)}</td>
                <td>${totalPrice}</td>
                <td>
                    <a href="edit-order.html?id=${order.id}" class="btn btn-warning">Edit</a>
                    <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
                </td>`;
            list.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching orders:', error));
}

function deleteOrder(id) {
    if (confirm("Are you sure you want to delete this order?")) {
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => fetchOrders())
        .catch(error => console.error('Error deleting order:', error));
    }
}

window.addEventListener('load', fetchOrders);
