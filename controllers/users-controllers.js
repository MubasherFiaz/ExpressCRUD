const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://mubasherfiaz05:YsVZeCZNlkZWMjUD@cluster0.wysa8.mongodb.net/products?retryWrites=true';

const DUMMY_PLACES = [
  {
    id: "p1",
    userName: "Max",
    password: "test1234",
    email: "m@gmail.com",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&psig=AOvVaw3Q6Z",
  },
  {
    id: "p2",
    userName: "Max",
    password: "test1234",
    email: "moeen@gmail.com",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&psig=AOvVaw3Q6Z",
  },
  {
    id: "p3",
    userName: "Max",
    password: "test1234",
    email: "test@test.com",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&psig=AOvVaw3Q6Z",
  },
];

const getUsers = async(req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
      await client.connect();
      const db = client.db();
      products = await db.collection('users').find().toArray(); 
      
  } catch (err) {
     return res.json({ message: 'Could not retrieve products.' });
  }
  client.close();
  res.json(products);
};

const addUsers = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors", errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { userName, password, email, image } = req.body;
  const checkEmailExists = DUMMY_PLACES.find((p) => {
    return p.email === email;
  });
  if (checkEmailExists) {
    throw new HttpError("Email already exists.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    userName,
    password,
    email,
    image,
  };
  const client = new MongoClient(url);
  let result
   try {
      await client.connect();
      const db = client.db();
       result = await db.collection('users').insertOne(createdUser);
     
      console.log('res is',result);
  } catch (err) {
      return res.json({ message: 'Could not store data.' });
  }
  console.log("createdUser", createdUser);
  DUMMY_PLACES.push(createdUser);
  res.status(201).json({ users: DUMMY_PLACES });
};
const updatUsers = (req, res, next) => {
  const { userName, password, email, image } = req.body;
  const userId = req.params.pid;
  const updatedUser = { ...DUMMY_PLACES.find((p) => p.id === userId) };
  const userIndex = DUMMY_PLACES.findIndex((p) => p.id === userId);
  updatedUser.userName = userName;
  updatedUser.password = password;
  updatedUser.email = email;
  updatedUser.image = image;
  DUMMY_PLACES[userIndex] = updatedUser;
  res.status(200).json({ user: updatedUser });
};
const getUserById = (req, res, next) => {
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
const deleteUser = (req, res, next) => {
    if (!DUMMY_PLACES.find((p) => p.id === userId)) {
    throw new HttpError("Could not find a place for that id.", 404);
    }
  const userId = req.params.pid;
  res.status(200).json({ message: userId });
  // return placeId;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== userId);
  res.status(200).json({ message: "Deleted place.", DUMMY_PLACES });
};
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.addUsers = addUsers;
exports.updatUsers = updatUsers;
exports.deleteUser = deleteUser;
