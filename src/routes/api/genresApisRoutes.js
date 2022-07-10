const express = require('express');
const router = express.Router();
const genresApisController = require('../../controllers/api/genresApisController');

router.get('/', genresApisController.list);
router.get('/name/:name', genresApisController.byName);
router.get('/:id', genresApisController.detail);


module.exports = router;