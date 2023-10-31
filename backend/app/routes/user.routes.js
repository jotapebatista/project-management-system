const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const checkUserRole = require('../middleware/checkUserRole'); 
const userController = require("../controllers/user.controller")
const passport = require('passport');

// Define routes with RBAC middleware
router.get('/', checkUserRole(['admin', 'readonly']), projectController.findAll);
router.post('/', checkUserRole(['admin']), projectController.create);
router.post('/register', userController.register);
router.post('/login', passport.authenticate('local'), userController.login);


module.exports = router;
