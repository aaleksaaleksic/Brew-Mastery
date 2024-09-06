const { Addon } = require('../models');


const Joi = require('joi');


const addonSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
});


const createAddon = async (req, res) => {
  const { error } = addonSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, price } = req.body;
  try {
    const addon = await Addon.create({ name, price });
    res.status(201).json(addon);
  } catch (error) {
    res.status(500).json({ error: 'Error creating addon' });
  }
};

// Dohvatanje svih dodataka
const getAllAddons = async (req, res) => {
  try {
    const addons = await Addon.findAll();
    res.status(200).json(addons);
  } catch (error) {
    console.error('Error fetching addons:', error);
    res.status(500).json({ error: 'Error fetching addons' });
  }
};

// Dohvatanje dodatka po ID-u
const getAddonById = async (req, res) => {
  const { id } = req.params;
  try {
    const addon = await Addon.findByPk(id);
    if (addon) {
      res.status(200).json(addon);
    } else {
      res.status(404).json({ error: 'Addon not found' });
    }
  } catch (error) {
    console.error('Error fetching addon:', error);
    res.status(500).json({ error: 'Error fetching addon' });
  }
};

// Ažuriranje dodatka
const updateAddon = async (req, res) => {
  const { error } = addonSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const addon = await Addon.findByPk(id);
    if (addon) {
      addon.name = name;
      addon.price = price;
      await addon.save();
      res.status(200).json(addon);
    } else {
      res.status(404).json({ error: 'Addon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating addon' });
  }
};

// Brisanje dodatka
const deleteAddon = async (req, res) => {
  const { id } = req.params;
  try {
    const addon = await Addon.findByPk(id);
    if (addon) {
      await addon.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Addon not found' });
    }
  } catch (error) {
    console.error('Error deleting addon:', error);
    res.status(500).json({ error: 'Error deleting addon' });
  }
};

module.exports = {
  createAddon,
  getAllAddons,
  getAddonById,
  updateAddon,
  deleteAddon,
};
