const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  day: {
    type: Date,  
    required: true
  },
  age: {
    type: String, 
    enum: ['15-25', '>25'], 
    required: true
  },
  gender: {
    type: String,  
    enum: ['Male', 'Female'], 
    required: true
  },
  a: {
    type: Number,
    required: true
  },
  b: {
    type: Number, 
    required: true
  },
  c: {
    type: Number, 
    required: true
  },
  d: {
    type: Number, 
    required: true
  },
  e: {
    type: Number,
    required: true
  },
  f: {
    type: Number, 
    required: true
  }
});

const Data = mongoose.model('Data', dataSchema, 'sheetData');

module.exports = Data;
