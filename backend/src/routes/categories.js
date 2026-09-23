const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/categories.json');

// Get all categories
router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;
