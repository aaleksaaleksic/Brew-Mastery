const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Ruta za kreiranje kategorije (zaštićena: samo admini)
router.post('/', authenticateJWT, authorizeAdmin, categoryController.createCategory);

// Ruta za dohvatanje svih kategorija (nije zaštićena)
router.get('/', categoryController.getAllCategories);

// Ruta za dohvatanje kategorije po ID-u (nije zaštićena)
router.get('/:id', categoryController.getCategoryById);

// Ruta za ažuriranje kategorije (zaštićena)
router.put('/:id', authenticateJWT, authorizeAdmin, categoryController.updateCategory);

// Ruta za brisanje kategorije (zaštićena)
router.delete('/:id', authenticateJWT, authorizeAdmin, categoryController.deleteCategory);

module.exports = router;
