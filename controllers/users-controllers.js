const HttpError = require('../models/http-error');
const DUMMY_PLACES = [
    {id: 'p1',
         title: 'Empire State Building',
          description: 'One of the most famous sky scrapers in the world',
           location: {lat: 40.7484405, lng: -73.9878531},
            address: '20 W 34th St, New York, NY 10118, USA', 
            creator: 'u1'}, 
    {id: 'p2', title: 'Empire State Building', description: 'One of the most famous sky scrapers in the world', location: {lat: 40.7484405, lng: -73.9878531}, address: '20 W 34th St, New York, NY 10118, USA', creator: 'u1'}

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
exports.getPlaceById = getPlaceById;