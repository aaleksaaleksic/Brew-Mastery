const { Promotion } = require('../models');

// Kreiranje promocije
const createPromotion = async (req, res) => {
  const { name, description, discount, startDate, endDate } = req.body;
  try {
    const promotion = await Promotion.create({ name, description, discount, startDate, endDate });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: 'Error creating promotion' });
  }
};

// Dohvatanje svih promocija
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching promotions' });
  }
};

const getPromotionById = async (req, res) => {
    const { id } = req.params;
    try {
      const promotion = await Promotion.findByPk(id); // Pronalazi promociju po ID-ju
      if (promotion) {
        res.status(200).json(promotion);
      } else {
        res.status(404).json({ error: 'Promotion not found' });
      }
    } catch (error) {
      console.error('Error fetching promotion by ID:', error);
      res.status(500).json({ error: 'Error fetching promotion' });
    }
  };

// Ažuriranje promocije
const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { name, description, discount, startDate, endDate } = req.body;
  try {
    const promotion = await Promotion.findByPk(id);
    if (promotion) {
      promotion.name = name;
      promotion.description = description;
      promotion.discount = discount;
      promotion.startDate = startDate;
      promotion.endDate = endDate;
      await promotion.save();
      res.status(200).json(promotion);
    } else {
      res.status(404).json({ error: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating promotion' });
  }
};

// Brisanje promocije
const deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (promotion) {
      await promotion.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting promotion' });
  }
};

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion
};
