const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const DUMMY_PLACES = [
  {
    id: "1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: { lat: 40.7484405, lng: -73.9878531 },
    address: "20 W 34th St, New York, NY 10118, USA",
    creator: "u1",
  },
  {
    id: "2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: { lat: 40.7484405, lng: -73.9878531 },
    address: "20 W 34th St, New York, NY 10118, USA",
    creator: "u1",
  },
];
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  console.log("GET request in places-routess");

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
    // const error = new Error('Could not find a place for the provided id.');
    // error.code = 404;
    // // throw error;
    // return next(error);
  }

  // if(!place){
  //     return res.status(404).json({message: 'Could not find a place for the provided id.'});
  // }
  res.json({ place });
};
const getAllPlaces = (req, res, next) => {
  res.status(201).json({ places: DUMMY_PLACES });
};
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors);
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
       coordinates = getCoordsForAddress(address);
  } catch (error) {
    next(new HttpError(error, 422));
    
  }
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  console.log("createdPlace", createdPlace);

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ places: DUMMY_PLACES });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
    if (!DUMMY_PLACES.find((p) => p.id === userId)) {
        throw new HttpError("Could not find a place for that id.", 404);
        }
  const placeId = req.params.pid;
  res.status(200).json({ message: placeId });
  // return placeId;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place.", DUMMY_PLACES });
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_PLACES.find((p) => p.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }
  res.json({ message: "Logged in!" });
};
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getAllPlaces = getAllPlaces;
