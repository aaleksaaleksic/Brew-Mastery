const { Category } = require('../models');

// Kreiranje nove kategorije
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

// Dohvatanje svih kategorija
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

// Dohvatanje kategorije po ID-u
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

// Ažuriranje kategorije
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

// Brisanje kategorije
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
