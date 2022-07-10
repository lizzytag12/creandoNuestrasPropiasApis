const express = require('express');
const router = express.Router();
const moviesApisController = require('../../controllers/api/moviesApisController');


/** /api/movies */
router.get('/', moviesApisController.list);
router.get('/new', moviesApisController.new);
router.get('/recommended', moviesApisController.recomended);
router.get('/:id', moviesApisController.detail);
router.post('/create', moviesApisController.create);
router.put('/update/:id', moviesApisController.update);
router.delete('/delete/:id', moviesApisController.destroy);

module.exports = router;