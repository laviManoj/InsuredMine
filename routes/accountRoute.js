const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Define routes for account collection
router.post('/accounts', accountController.createAccount);
router.get('/acounts', accountController.getAccount);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;
