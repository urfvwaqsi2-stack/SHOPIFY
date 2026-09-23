const express = require('express');
const router = express.Router();

let orders = []; // In-memory orders for demo

// Create a new order (Checkout)
router.post('/', (req, res) => {
  try {
    const { items, customer, total } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items,
      customer,
      total,
      status: 'Processing'
    };

    orders.push(newOrder);

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
});

// Admin: Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
