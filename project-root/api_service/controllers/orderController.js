const axios = require('axios'); // Dodajemo axios za slanje HTTP zahteva
const { Order, OrderItems, Coffee } = require('../models');

// Funkcija za proveru korisničkog tokena preko auth_service
const verifyUser = async (token) => {
  try {
    const response = await axios.get('http://localhost:8001/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Vraćamo podatke o korisniku
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

const createOrder = async (req, res) => {
  const { status, coffees } = req.body;
  const token = req.header('Authorization')?.split(' ')[1];

  try {
    const user = await verifyUser(token);

    // Kreiramo narudžbinu
    const order = await Order.create({ status, userId: user.id });

    // Logovanje podataka o kafama
    console.log('Coffees in order:', coffees);

    // Kreiramo OrderItems za svaku kafu u narudžbini
    for (const coffee of coffees) {
      console.log(`Creating OrderItem for orderId ${order.id}, coffeeId ${coffee.coffeeId}, quantity ${coffee.quantity}, price ${coffee.price}`);

      await OrderItems.create({
        orderId: order.id,
        coffeeId: coffee.coffeeId,
        quantity: coffee.quantity,
        price: coffee.price
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Dohvatanje svih narudžbina
const getAllOrders = async (req, res) => {
  try {
    // Uklanjamo Coffee iz "include", umesto toga uključujemo OrderItems i Coffee unutar OrderItems
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItems, // Uključujemo OrderItems
          include: [Coffee] // Uključujemo Coffee unutar OrderItems
        }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};


const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItems, // Uključujemo OrderItems
          include: [Coffee]  // Uključujemo Coffee unutar OrderItems
        }
      ]
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);  // Logujemo grešku
    res.status(500).json({ error: 'Error fetching order' });
  }
};



const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const token = req.header('Authorization')?.split(' ')[1]; // Preuzimamo token iz Authorization headera

  try {
    // Proveravamo korisnika preko auth_service
    const user = await verifyUser(token);
    if (!user.admin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItems, // Ako želiš dohvatiti OrderItems
          include: [Coffee]  // I povezane Coffee stavke
        }
      ]
    });
    if (order) {
      order.status = status;
      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};


// Brisanje narudžbine (samo admin može obrisati narudžbinu)
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const token = req.header('Authorization')?.split(' ')[1]; // Preuzimamo token iz Authorization headera

  try {
    // Proveravamo korisnika preko auth_service
    const user = await verifyUser(token);
    if (!user.admin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    const order = await Order.findByPk(id);
    if (order) {
      await order.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
