const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

// Get all products with filtering, sorting, pagination
router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data' });
    
    let products = JSON.parse(data);
    
    const { search, category, sort, page = 1, limit = 12 } = req.query;

    if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category && category !== 'All Categories') {
      products = products.filter(p => p.category === category);
    }

    if (sort) {
      if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
      if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      total: products.length,
      page: parseInt(page),
      totalPages: Math.ceil(products.length / limit)
    });
  });
});

// Get featured products
router.get('/featured', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data' });
    let products = JSON.parse(data);
    res.json(products.filter(p => p.isFeatured).slice(0, 8));
  });
});

// Get single product by ID
router.get('/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data' });
    
    let products = JSON.parse(data);
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  });
});

module.exports = router;
