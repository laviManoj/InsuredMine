const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Define routes for policy collection
router.post('/policy', policyController.createPolicy);
router.get('/policy', policyController.getPolicy);
router.put('/policy/:id', policyController.updatePolicy);
router.delete('/policy/:id', policyController.deletePolicy);

module.exports = router;
