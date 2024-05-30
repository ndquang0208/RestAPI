const express = require('express');
const { getHomePage, imgPage, postCreateUser, getCreatePage, getUserToEdit, postUserToEdit, deleteUser } = require('../controllers/homeController');
const router = express.Router();


router.get('/', getHomePage)

router.get('/1', imgPage)

router.get('/create', getCreatePage)
router.post('/create-user', postCreateUser)
router.get('/edit/:id', getUserToEdit)
router.post('/edit-user/:id', postUserToEdit)
router.get('/delete-user/:id', deleteUser)


module.exports = router;