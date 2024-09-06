const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Ruta za kreiranje recenzije 
router.post('/', authenticateJWT, reviewController.createReview);

// Ruta za dohvatanje svih recenzija 
router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReviewById);

// Ruta za ažuriranje recenzije (zaštićena)
router.put('/:id', authenticateJWT, reviewController.updateReview);

// Ruta za brisanje recenzije (zaštićena)
router.delete('/:id', authenticateJWT, reviewController.deleteReview);

module.exports = router;
