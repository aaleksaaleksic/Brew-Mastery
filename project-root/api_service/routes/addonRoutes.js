const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addonController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');

// Ruta za kreiranje dodatka (samo admin)
router.post('/', authenticateJWT, authorizeAdmin, addonController.createAddon);

// Ruta za dohvatanje svih dodataka (nije zaštićena)
router.get('/', addonController.getAllAddons);

// Ruta za dohvatanje dodatka po ID-u (nije zaštićena)
router.get('/:id', addonController.getAddonById);

// Ruta za ažuriranje dodatka (samo admin)
router.put('/:id', authenticateJWT, authorizeAdmin, addonController.updateAddon);

// Ruta za brisanje dodatka (samo admin)
router.delete('/:id', authenticateJWT, authorizeAdmin, addonController.deleteAddon);

module.exports = router;
