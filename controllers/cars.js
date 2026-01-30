const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAll = async (req, res) => {
  //#swagger.tags=['Cars']
  const result = mongoDB.getDatabase().db().collection('cars').find();
  result.toArray().then((cars) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars);
  });

};

const getCarById = async (req, res) => {
  //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id.');
    }
    const contactId = ObjectId.createFromHexString(req.params.id);
    const result = mongoDB.getDatabase().db().collection('cars').find({_id:contactId});
    result.toArray().then((cars) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(cars[0]);
    });
  };

const createCar = async (req, res) => {
  //#swagger.tags=['Cars']
  const car = {
    make : req.body.make,
    model : req.body.model ,
    year : req.body.year,
    color : req.body.color,
    odometer : req.body.odometer,
    horsepower : req.body.horsepower,
    transmision : req.body.transmision
  };
  const result = await mongoDB.getDatabase().db().collection('cars').insertOne(car);
  if (result.acknowledged) {
    //res.status(204).json(`{"id": "${result.insertedId.toString()}"}`);
    //res.status(201).json(result); to try...
    res.status(201).send(result.insertedId.toString());
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the car.');
  }
};

const updateCar = async (req, res) => {
  //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id.');
    }
    const carId = ObjectId.createFromHexString(req.params.id);
    const car = {
    make : req.body.make,
    model : req.body.model,
    year : req.body.year,
    color : req.body.color,
    odometer : req.body.odometer,
    horsepower : req.body.horsepower,
    transmision : req.body.transmision
  };
    const result = await mongoDB.getDatabase().db().collection('cars').replaceOne({_id:carId}, car);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the car.');
    }
};

const deleteCar = async (req, res) => {
  //#swagger.tags=['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id.');
    }
    const carId = ObjectId.createFromHexString(req.params.id);
    const result = await mongoDB.getDatabase().db().collection('cars').deleteOne({_id:carId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the car.');
    }
};

  module.exports =
    {getAll,
    getCarById,
    createCar,
    updateCar,
    deleteCar
    }