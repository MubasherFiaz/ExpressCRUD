const express = require('express');
const router = express.Router();
const getPlace = require('../controllers/places-controllers');


router.get('/:pid', getPlace.getPlaceById);
router.post('/', getPlace.createPlace);
router.patch('/:pid', getPlace.updatePlace);
router.delete('/:pid', getPlace.deletePlace);

module.exports = router;