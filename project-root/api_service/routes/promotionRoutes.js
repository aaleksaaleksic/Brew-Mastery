const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Kreiranje promocije 
router.post('/', authenticateJWT, authorizeAdmin, promotionController.createPromotion);

// Dohvatanje svih promocija
router.get('/', promotionController.getAllPromotions);

router.get('/:id', promotionController.getPromotionById);

// Ažuriranje promocije 
router.put('/:id', authenticateJWT, authorizeAdmin, promotionController.updatePromotion);

// Brisanje promocije 
router.delete('/:id', authenticateJWT, authorizeAdmin, promotionController.deletePromotion);

module.exports = router;
