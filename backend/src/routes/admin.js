const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

// Get admin dashboard stats
router.get('/stats', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data' });
    
    let products = JSON.parse(data);
    
    // Mock stats
    res.json({
      totalSales: 24500,
      totalOrders: 156,
      totalProducts: products.length,
      totalCustomers: 89,
      recentOrders: [
        { id: '#ORD-101', customer: 'John Doe', total: 149.99, status: 'Completed', date: '2026-09-23' },
        { id: '#ORD-102', customer: 'Jane Smith', total: 299.00, status: 'Processing', date: '2026-09-23' },
        { id: '#ORD-103', customer: 'Alex Johnson', total: 45.00, status: 'Shipped', date: '2026-09-22' }
      ]
    });
  });
});

module.exports = router;
