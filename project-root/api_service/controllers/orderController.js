const axios = require('axios');
const { Order, OrderItems, Coffee, Addon, OrderItemAddon } = require('../models');

const Joi = require('joi');


const orderSchema = Joi.object({
  status: Joi.string().required(),
  coffees: Joi.array().items(Joi.object({
    coffeeId: Joi.number().integer().required(),
    quantity: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    addons: Joi.array().items(Joi.number().integer()).optional(),
  })).required(),
});

// Funkcija za proveru korisničkog tokena preko auth_service
const verifyUser = async (token) => {
  try {
    const response = await axios.get('http://localhost:8001/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

// Kreiranje narudžbine sa dodacima
const createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { status, coffees } = req.body;
  const token = req.header('Authorization')?.split(' ')[1];

  try {
    const user = await verifyUser(token);
    const order = await Order.create({ status, userId: user.id });

    for (const coffee of coffees) {
      const orderItem = await OrderItems.create({
        orderId: order.id,
        coffeeId: coffee.coffeeId,
        quantity: coffee.quantity,
        price: coffee.price
      });

      if (coffee.addons && coffee.addons.length > 0) {
        for (const addonId of coffee.addons) {
          await OrderItemAddon.create({
            orderItemId: orderItem.id,
            addonId: addonId
          });
        }
      }
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
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItems,
          include: [Coffee, Addon] // Uključujemo Coffee i Addons unutar OrderItems
        }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Dohvatanje narudžbine po ID-u
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItems,
          include: [Coffee, Addon] // Uključujemo Coffee i Addons unutar OrderItems
        }
      ]
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Ažuriranje narudžbine (samo admin može ažurirati narudžbinu)
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const token = req.header('Authorization')?.split(' ')[1];

  try {
    const user = await verifyUser(token);
    if (!user.admin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItems,
          include: [Coffee, Addon]  // Uključujemo Coffee i Addons unutar OrderItems
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
  const token = req.header('Authorization')?.split(' ')[1];

  try {
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
