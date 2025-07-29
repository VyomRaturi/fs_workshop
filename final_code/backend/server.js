const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
const items = [
  {
    "id": "itm001",
    "name": "Cordless Drill",
    "description": "18V cordless drill, lightly used. Perfect for home projects and DIY tasks.",
    "category": "Tools",
    "owner": "Alice Johnson",
    "condition": "Good",
    "available": true,
    "image": "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4595,
      "lng": 77.0266,
      "address": "Block A, Sector 45"
    }
  },
  {
    "id": "itm002",
    "name": "Camping Tent",
    "description": "4-person waterproof tent, easy setup. Great for weekend getaways.",
    "category": "Outdoors",
    "owner": "Brian Lee",
    "condition": "Excellent",
    "available": true,
    "image": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4652,
      "lng": 77.0565,
      "address": "Block B, Sector 50"
    }
  },
  {
    "id": "itm003",
    "name": "Crock Pot",
    "description": "Large 6-quart slow cooker, works great. Perfect for family meals.",
    "category": "Kitchen",
    "owner": "Samantha Green",
    "condition": "Very Good",
    "available": false,
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "borrowedBy": "Prachi Patel",
    "location": {
      "lat": 28.4700,
      "lng": 77.0300,
      "address": "Block C, Sector 47"
    }
  },
  {
    "id": "itm004",
    "name": "Yoga Mat",
    "description": "Non-slip yoga mat, 6mm thick, blue color. Perfect for home workouts.",
    "category": "Fitness",
    "owner": "Ravi Mehra",
    "condition": "Good",
    "available": true,
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4750,
      "lng": 77.0400,
      "address": "Block D, Sector 48"
    }
  },
  {
    "id": "itm005",
    "name": "Ladder",
    "description": "6-foot aluminum step ladder, sturdy and lightweight.",
    "category": "Tools",
    "owner": "Dana Wang",
    "condition": "Good",
    "available": true,
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4800,
      "lng": 77.0500,
      "address": "Block E, Sector 49"
    }
  },
  {
    "id": "itm006",
    "name": "Board Game: Settlers of Catan",
    "description": "Complete set, all pieces included. Great for family game nights.",
    "category": "Games",
    "owner": "Luis García",
    "condition": "Like New",
    "available": true,
    "image": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4850,
      "lng": 77.0600,
      "address": "Block F, Sector 51"
    }
  },
  {
    "id": "itm007",
    "name": "Blender",
    "description": "High-speed blender for smoothies and food processing.",
    "category": "Kitchen",
    "owner": "Emma Wilson",
    "condition": "Very Good",
    "available": true,
    "image": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
    "borrowedBy": null,
    "location": {
      "lat": 28.4900,
      "lng": 77.0700,
      "address": "Block G, Sector 52"
    }
  },
  {
    "id": "itm008",
    "name": "Bicycle",
    "description": "Mountain bike, perfect for weekend rides and commuting.",
    "category": "Outdoors",
    "owner": "Mike Chen",
    "condition": "Good",
    "available": false,
    "image": "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
    "borrowedBy": "Sarah Kim",
    "location": {
      "lat": 28.4950,
      "lng": 77.0800,
      "address": "Block H, Sector 53"
    }
  }
];

// API Routes

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(item => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Add new item
app.post('/api/items', (req, res) => {
  const { name, description, category, condition, image } = req.body;

  if (!name || !description || !category || !condition) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newItem = {
    id: `itm${String(items.length + 1).padStart(3, '0')}`,
    name,
    description,
    category,
    owner: "Current User", // Mock user
    condition,
    available: true,
    image: image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    borrowedBy: null
  };

  items.push(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// Request to borrow an item
app.post('/api/items/:id/request', (req, res) => {
  const item = items.find(item => item.id === req.params.id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (!item.available) {
    return res.status(400).json({ error: 'Item is not available' });
  }

  // Mark as unavailable and set borrowedBy
  item.available = false;
  item.borrowedBy = "Current User";

  res.json({
    success: true,
    status: "approved",
    message: "Request approved!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 