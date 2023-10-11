const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(authorsController.getAllAuthors)
    .post(verifyRoles(ROLES_LIST.Admin), authorsController.addNewAuthor)
    .put(verifyRoles(ROLES_LIST.Admin), authorsController.updateAuthor)
    .delete(verifyRoles(ROLES_LIST.Admin), authorsController.deleteAuthor);

router.route('/:id')
    .get(authorsController.getAuthor);

module.exports = router;