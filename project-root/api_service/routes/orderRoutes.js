const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Ruta za kreiranje narudžbine (samo autentifikovani korisnici)
router.post('/', authenticateJWT, orderController.createOrder);

// Ruta za dohvatanje svih narudžbina (samo autentifikovani korisnici)
router.get('/', authenticateJWT, orderController.getAllOrders);

router.get('/user/:userId', authenticateJWT, orderController.getOrdersByUserId);

// Ruta za dohvatanje narudžbine po ID-u (samo autentifikovani korisnici)
router.get('/:id', authenticateJWT, orderController.getOrderById);

// Ruta za ažuriranje narudžbine (samo admini mogu ažurirati)
router.put('/:id', authenticateJWT, authorizeAdmin, orderController.updateOrder);

// Ruta za brisanje narudžbine (samo admini mogu obrisati)
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
