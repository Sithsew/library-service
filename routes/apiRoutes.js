const express = require("express");
const authors = require("./authors");
const books = require("./books");
const users = require("./users");

const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const registerController = require('../controllers/registerController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const authController = require('../controllers/authController');

router.post('/register', registerController.handleNewUser);
router.post('/auth', authController.handleLogin);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutController.handleLogout);


router.use(verifyJWT);
router.use('/users', users);
router.use('/authors', authors);
router.use('/books', books);

module.exports = router;
