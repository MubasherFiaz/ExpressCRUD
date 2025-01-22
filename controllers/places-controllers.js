const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const DUMMY_PLACES = [
    {id: '1',
         title: 'Empire State Building',
          description: 'One of the most famous sky scrapers in the world',
           location: {lat: 40.7484405, lng: -73.9878531},
            address: '20 W 34th St, New York, NY 10118, USA', 
            creator: 'u1'}, 
    {id: '2', title: 'Empire State Building', description: 'One of the most famous sky scrapers in the world', location: {lat: 40.7484405, lng: -73.9878531}, address: '20 W 34th St, New York, NY 10118, USA', creator: 'u1'}

];
 const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {return p.id === placeId});
    console.log('GET request in places-routess');

    if (!place) {
       throw new HttpError('Could not find a place for the provided id.', 404);
        // const error = new Error('Could not find a place for the provided id.');
        // error.code = 404;
        // // throw error;
        // return next(error); 
        
    }

    // if(!place){
    //     return res.status(404).json({message: 'Could not find a place for the provided id.'});
    // }   
    res.json({place});   
};
const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body;
    const createdPlace = {
       id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    console.log('createdPlace',createdPlace);
    
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({places: DUMMY_PLACES});
}

const updatePlace = (req, res, next) => { 
    const {title, description} = req.body;
    const placeId = req.params.pid;
    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place: updatedPlace});
}

const deletePlace = (req, res, next) => {
    

    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place.', DUMMY_PLACES});
}

exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;