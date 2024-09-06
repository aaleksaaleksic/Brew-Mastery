const { Coffee } = require('../models');

// Kreiranje nove kafe
const createCoffee = async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  try {
    const coffee = await Coffee.create({ name, description, price, categoryId });
    res.status(201).json(coffee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating coffee' });
  }
};

// Dohvatanje svih kafa
const getAllCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.findAll();
    res.status(200).json(coffees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching coffees' });
  }
};

// Dohvatanje kafe po ID-u
const getCoffeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const coffee = await Coffee.findByPk(id);
    if (coffee) {
      res.status(200).json(coffee);
    } else {
      res.status(404).json({ error: 'Coffee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching coffee' });
  }
};

// Ažuriranje kafe
const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  try {
    const coffee = await Coffee.findByPk(id);
    if (coffee) {
      coffee.name = name;
      coffee.description = description;
      coffee.price = price;
      coffee.categoryId = categoryId;
      await coffee.save();
      res.status(200).json(coffee);
    } else {
      res.status(404).json({ error: 'Coffee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating coffee' });
  }
};

// Brisanje kafe
const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  try {
    const coffee = await Coffee.findByPk(id);
    if (coffee) {
      await coffee.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Coffee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting coffee' });
  }
};

module.exports = {
  createCoffee,
  getAllCoffees,
  getCoffeeById,
  updateCoffee,
  deleteCoffee
};
