const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const booksCtrl = require('../controllers/books');

router.post('/', auth, booksCtrl.createBook);
router.put('/:id', auth, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/:id', booksCtrl.getOneBook);
router.get('/', booksCtrl.getAllBooks);

module.exports = router;

