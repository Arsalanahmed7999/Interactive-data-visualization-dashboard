const express = require("express");
const router = express.Router();
const Data = require("../models/DataModel");

router.get('/data', async (req, res) => {
    try {
      const data = await Data.find();
      console.log("data: ", data);
      if (data.length === 0) {
       return res.status(404).json({ message: 'No data found' });
      }
      res.status(200).json(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
