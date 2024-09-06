const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Ruta za kreiranje kafe (zaštićena)
router.post('/', authenticateJWT,authorizeAdmin, coffeeController.createCoffee);

// Ruta za dohvatanje svih kafa 
router.get('/', coffeeController.getAllCoffees);

// Ruta za dohvatanje kafe po ID-u 
router.get('/:id', coffeeController.getCoffeeById);

// Ruta za ažuriranje kafe (zaštićena)
router.put('/:id', authenticateJWT, authorizeAdmin,coffeeController.updateCoffee);

// Ruta za brisanje kafe (zaštićena)
router.delete('/:id', authenticateJWT,authorizeAdmin, coffeeController.deleteCoffee);

module.exports = router;
