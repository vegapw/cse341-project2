const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');
const Car = require('../models/Car');


const getAll = async (req, res) => {
  //#swagger.tags=['Cars']
  //const result = mongoDB.getDatabase().db().collection('cars').find();
  try {
    const result = await Car.find();
    /*result.toArray().then((cars) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(cars);
    });*/
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json('Cars not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internar Server Error');
  }

};

const getCarById = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid car id.');
    }
    const contactId = ObjectId.createFromHexString(req.params.id);
        //const result = mongoDB.getDatabase().db().collection('cars').find({_id:contactId});
        const result = await Car.findById(req.params.id).lean();
        /*result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
        });*/
        if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
        } else {
          res.status(404).json('Car not found.');
        }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internar Server Error');
  }
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
  try {
    //const result = await mongoDB.getDatabase().db().collection('cars').insertOne(car);
    const result = await Car.create(req.body);
    res.status(201).json(result._id);
    /*if (result.acknowledged) {
      //res.status(204).json(`{"id": "${result.insertedId.toString()}"}`);
      //res.status(201).json(result); to try...
      res.status(201).send(result.insertedId.toString());
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the car.');
    }*/
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

const updateCar = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id.');
    } else {
        /*const carId = ObjectId.createFromHexString(req.params.id);*/
        const car = {
        make : req.body.make,
        model : req.body.model,
        year : req.body.year,
        color : req.body.color,
        odometer : req.body.odometer,
        horsepower : req.body.horsepower,
        transmision : req.body.transmision
        };
        //const result = await mongoDB.getDatabase().db().collection('cars').replaceOne({_id:carId}, car);
        /*if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the car.');
        }*/
       let result = await Car.findById(req.params.id).lean();
       if (!result) {
        return res.status(404).json('Car not found');
       }
       result = await Car.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
       });
       res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

const deleteCar = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid car id.');
    } else {
        /*const carId = ObjectId.createFromHexString(req.params.id);
        const result = await mongoDB.getDatabase().db().collection('cars').deleteOne({_id:carId});
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the car.');
        }*/
       let result = await Car.findById(req.params.id).lean();
       if (!result) {
        return res.status(404).json('Car not found');
       }
       result = await Car.findByIdAndDelete({ _id : req.params.id});
       res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
};

  module.exports =
    {getAll,
    getCarById,
    createCar,
    updateCar,
    deleteCar
    }