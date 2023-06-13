const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

const booksCtrl = require('../controllers/books');

router.post('/', auth, multer, booksCtrl.createBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.get('/', booksCtrl.getAllBooks);
router.get('/:id', booksCtrl.getOneBook);
router.delete('/:id', auth, multer, booksCtrl.deleteBook);
router.get('/bestrating', booksCtrl.getBestRating);
router.post('/:id/rating', auth, booksCtrl.postRating);

module.exports = router;

