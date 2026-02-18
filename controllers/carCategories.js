const { response } = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');
const CarCategories = require('../models/CarCategories')


const getAll = async (req, res) => {
  //#swagger.tags=['CarCategories']
  try {
    const categories = await CarCategories.find();
    if (categories) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(categories);
    } else {
      res.status(404).json('Car Categories not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server error');
  }
};

const getCategoryById = async (req, res) => {
  //#swagger.tags=['CarCategories']
  try {
    const result = await CarCategories.findById(req.params.id).lean();
    if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
    } else {
          res.status(404).json('Car Category not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server error');
  }
};

const createCarCategory = async (req, res) => {
  //#swagger.tags=['CarCategories']
  try {
    const carCategories = {
        name : req.body.name,
        pricePerDay : req.body.pricePerDay,
        pricePerHour : req.body.pricePerHour,
        depositAmount : req.body.depositAmount
        };
    const result = await CarCategories.create(req.body);
    res.status(201).json(result._id);
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server error');
  }
};

const updateCarCategory = async (req, res) => {
  //#swagger.tags=['CarCategories']
  try {
    const carCategories = {
        name : req.body.name,
        pricePerDay : req.body.pricePerDay,
        pricePerHour : req.body.pricePerHour,
        depositAmount : req.body.depositAmount
    };
    let result = await CarCategories.findById(req.params.id).lean();
    if (!result) {
      return res.status(404).json('Car Category not found');
    }
    result = await CarCategories.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true,
      runValidators: true
    });
    res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json('Internal Server error');
  }
};

const deleteCarCategory = async (req, res) => {
  //#swagger.tags=['CarCategories']
  try {
    let result = await CarCategories.findById(req.params.id).lean();
    if (!result) {
      return res.status(404).json('Car Categories not found');
    }
    result = await CarCategories.findByIdAndDelete({ _id : req.params.id});
    res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server error');
    }
};

module.exports =
{   getAll,
    getCategoryById,
    createCarCategory,
    updateCarCategory,
    deleteCarCategory
}