---
title: Workshop Agenda - Full Stack Neighborhood Resource Sharing App
description: Building Backend API and Frontend Integration Live
duration: 120
card_type: cue_card
---

## Workshop Agenda

- Understanding the project structure and requirements
- Backend Development - Node.js & Express.js API
- Creating RESTful endpoints for CRUD operations
- Setting up a professional API layer with Axios
- Frontend-Backend integration with modular API functions
- Testing the complete full-stack application

**Project Overview:** We'll transform a static React frontend into a dynamic full-stack application by building a complete backend API and integrating it with the pre-built UI components.

---
title: Project Structure & Prerequisites
description: Understanding the starter code and what we'll build together
duration: 5
card_type: cue_card
---

## Understanding Our Starting Point

### What We Have (Pre-built Starter Code)

- **Complete React Frontend** - All UI components, pages, and routing
- **Functional Features** - Search, filtering, sorting working with placeholder data
- **Professional Design** - Tailwind CSS with responsive layout
- **Form Validation** - Complete form handling and validation
- **No API Dependency** - Everything works locally with mock data

### What We'll Build Live (Next 2 Hours)

- **Express.js Backend Server** - From scratch
- **RESTful API Endpoints** - Complete CRUD operations
- **Frontend Integration** - Connect React to our API
- **Real Data Flow** - Replace placeholder data with API calls

**Note for Instructor:** Show the working starter application first. Demonstrate search, filtering, adding items, viewing details - all working without any backend. This helps students understand what they're building towards.

---
title: Backend Setup - Project Initialization
description: Setting up Node.js project and installing dependencies  
duration: 10
card_type: cue_card
---

## Setting Up the Backend Project

**Instructor Note:** Make sure students have Node.js installed. You can check with `node --version` and `npm --version`.

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Initialize Node.js Project

```bash
npm init -y
```

**Explain to Students:**

- `npm init -y` creates a `package.json` file with default values
- This file manages our project dependencies and scripts
- The `-y` flag accepts all defaults automatically

### Step 3: Install Basic Dependencies

```bash
npm install express body-parser
npm install -D nodemon
```

### Step 4: Update Package.json Scripts

**File:** `package.json`

```json
{
  "name": "neighborhood-sharing-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

**Instructor Explanation:**

- `start` script: Runs the server in production mode
- `dev` script: Uses nodemon for development - auto-restarts on file changes
- This setup allows us to use `npm run dev` during development

---
title: Creating Express Server Foundation
description: Building the basic server structure with middleware setup
duration: 15
card_type: cue_card
---

## Building Our Express Server

### Step 1: Create server.js File

**File:** `server.js`

```javascript
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Neighborhood Sharing API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
```

### Step 2: Explain the Code Structure

**For Students - Break Down Each Section:**

1. **Imports**: We're importing our required modules
2. **App Setup**: Creating Express application instance
3. **Middleware**:
   - `bodyParser.json()`: Parses JSON data from frontend requests
4. **Test Route**: Simple endpoint to verify server is working
5. **Server Start**: Listening on port 5000

### Step 3: Test the Server

```bash
npm run dev
```

**Instructor Demo:** Open browser and visit `http://localhost:5000` to show the test message.

**Expected Output:**

```json
{ "message": "Neighborhood Sharing API is running!" }
```

---
title: Adding Mock Data Structure
description: Creating the data structure that matches our frontend expectations
duration: 10
card_type: cue_card
---

## Setting Up Mock Data

**Instructor Note:** Explain that in a real application, this data would come from a database. For this workshop, we'll use in-memory data to focus on API concepts.

### Understanding Our Data Structure

**Before Adding Data, Explain the Schema:**
Each item needs these properties:

- `id`: Unique identifier
- `name`: Item name
- `description`: Detailed description
- `category`: Type of item (Tools, Kitchen, etc.)
- `owner`: Person who owns the item
- `condition`: Item condition (Good, Excellent, etc.)
- `available`: Boolean - can it be borrowed?
- `image`: URL for item photo
- `borrowedBy`: Who currently has it (if borrowed)
- `location`: Geographic data for the item

### Add Mock Data to server.js

**File:** `server.js` (add after middleware, before test route)

```javascript
// Mock data - In real app, this would be a database
const items = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description:
      "18V cordless drill, lightly used. Perfect for home projects and DIY tasks.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4595,
      lng: 77.0266,
      address: "Block A, Sector 45",
    },
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description:
      "4-person waterproof tent, easy setup. Great for weekend getaways.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4652,
      lng: 77.0565,
      address: "Block B, Sector 50",
    },
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description:
      "Large 6-quart slow cooker, works great. Perfect for family meals.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    borrowedBy: "Prachi Patel",
    location: {
      lat: 28.47,
      lng: 77.03,
      address: "Block C, Sector 47",
    },
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat, 6mm thick, blue color. Perfect for home workouts.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.475,
      lng: 77.04,
      address: "Block D, Sector 48",
    },
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy and lightweight.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.48,
      lng: 77.05,
      address: "Block E, Sector 49",
    },
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description:
      "Complete set, all pieces included. Great for family game nights.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.485,
      lng: 77.06,
      address: "Block F, Sector 51",
    },
  },
  {
    id: "itm007",
    name: "Blender",
    description: "High-speed blender for smoothies and food processing.",
    category: "Kitchen",
    owner: "Emma Wilson",
    condition: "Very Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.49,
      lng: 77.07,
      address: "Block G, Sector 52",
    },
  },
  {
    id: "itm008",
    name: "Bicycle",
    description: "Mountain bike, perfect for weekend rides and commuting.",
    category: "Outdoors",
    owner: "Mike Chen",
    condition: "Good",
    available: false,
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
    borrowedBy: "Sarah Kim",
    location: {
      lat: 28.495,
      lng: 77.08,
      address: "Block H, Sector 53",
    },
  },
];
```

---
title: Building RESTful API Endpoints
description: Creating the four core endpoints for our CRUD operations
duration: 20
card_type: cue_card
---

## Understanding REST API Design

**Before We Code - Explain REST Principles:**

- **GET**: Retrieve data (Read operations)
- **POST**: Create new data (Create operations)
- **PUT/PATCH**: Update existing data (Update operations)
- **DELETE**: Remove data (Delete operations)

**Our API Endpoints:**

1. `GET /api/items` - Get all items
2. `GET /api/items/:id` - Get specific item
3. `POST /api/items` - Add new item
4. `POST /api/items/:id/request` - Request to borrow

### Endpoint 1: Get All Items

**File:** `server.js` (add after mock data, before test route)

```javascript
// API Routes

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});
```

**Instructor Explanation:**

- Simple endpoint that returns all items as JSON
- Frontend will use this to populate the home page
- In production, you'd add pagination for large datasets

### Endpoint 2: Get Item by ID

```javascript
// Get item by ID
app.get("/api/items/:id", (req, res) => {
  const item = items.find((item) => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});
```

### Endpoint 3: Add New Item

```javascript
// Add new item
app.post("/api/items", (req, res) => {
  const { name, description, category, condition, image } = req.body;

  if (!name || !description || !category || !condition) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newItem = {
    id: `itm${String(items.length + 1).padStart(3, "0")}`,
    name,
    description,
    category,
    owner: "Current User", // Mock user
    condition,
    available: true,
    image:
      image ||
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4595 + Math.random() * 0.1,
      lng: 77.0266 + Math.random() * 0.1,
      address: "Mock Address",
    },
  };

  items.push(newItem);
  res.status(201).json({ success: true, item: newItem });
});
```

### Endpoint 4: Request to Borrow

```javascript
// Request to borrow an item
app.post("/api/items/:id/request", (req, res) => {
  const item = items.find((item) => item.id === req.params.id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (!item.available) {
    return res.status(400).json({ error: "Item is not available" });
  }

  // Mark as unavailable and set borrowedBy
  item.available = false;
  item.borrowedBy = "Current User";

  // Instantly approve the request for simplicity
  res.json({
    success: true,
    status: "approved",
    message: "Request approved!",
  });
});
```

---
title: Frontend Integration - Installing Axios & Setting Up API Foundation
description: Adding HTTP client and creating the foundation for our API layer
duration: 15
card_type: cue_card
---

## Explain current Frontend State

The current frontend state uses a hardcoded list of items (`PLACEHOLDER_ITEMS`) to display on the home page. This data is not dynamic and does not reflect any real backend data. The frontend relies on local state management to handle item filtering, searching, and sorting. Show the structure of the current state and how it maps to the UI components.

## AI Tools

**Encourage Students to Use AI Tools:**

Emphasize the importance of using AI tools like bolt, loveable, v0, copilot, gpt etc to bootstrap a basic application quickly. These tools can help generate boilerplate code and save a lot of setup time. These tools are also very great at building beautiful UI components and layouts. Leverage these tools to speed up development and focus on core functionality.

## Connecting Frontend to Backend

**Instructor Context:** Now that our backend is working, we need to connect our React frontend to consume these APIs. The frontend currently works with placeholder data - we'll replace that with real API calls.

### Step 1: Navigate to Frontend Directory

```bash
cd ../client
```

### Step 2: Install Axios HTTP Client

```bash
npm install axios
```

**Explain Axios to Students:**

- Axios is a popular HTTP client for JavaScript
- It simplifies making API requests from the frontend
- It handles JSON parsing automatically
- It provides better error handling than fetch()
- It works in both browser and Node.js environments

### Step 3: Verify Installation

**Check package.json to confirm axios is added:**

```json
"dependencies": {
  "axios": "^1.11.0",
  // ... other dependencies
}
```

**Alternative to Axios:** You could use the built-in `fetch()` API, but Axios provides a cleaner syntax and better error handling for this workshop.

---
title: Setting Up Professional API Layer Foundation
description: Creating a centralized axios instance for consistent API calls
duration: 10
card_type: cue_card
---

## Building a Professional API Architecture

**Teaching Context:** Instead of using axios directly in components, we'll create a professional API layer. This is how real-world applications organize their API calls. We'll build it incrementally as we need different functions.

### Step 1: Create Axios Instance

**File:** `src/lib/axios.js`

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

**Explain to Students:**
- `baseURL`: No need to repeat the full URL in every request
- `timeout`: Prevents requests from hanging forever
- `headers`: Sets default content type for all requests
- Axios instance allows consistent configuration across the app

### Step 2: Create API Directory Structure

```bash
# In the client/src directory
mkdir api
```

**Note for Instructor:** We'll create API functions in `src/api/items.js` as we need them.

### Benefits of This Architecture

**Explain to Students Why This is Better:**

1. **Centralized Configuration**: All API calls use the same base URL and timeout
2. **Maintainability**: Change the API endpoint in one place
3. **Reusability**: API functions can be used across multiple components
4. **Professional Standard**: This is how real-world applications are structured

**Next:** We'll create our first API function when we integrate the Home page.

---
title: Home Page API Integration
description: Creating our first API functions and connecting the home page
duration: 20
card_type: cue_card
---

## Connecting Home Page to Backend

**Teaching Strategy:** We'll create the API functions we need for the Home page, then integrate them.

### Current State Analysis

**Show students the current Home.jsx:**

- Uses `PLACEHOLDER_ITEMS` constant
- Has TODO comments where API calls should go
- Needs two API operations: fetch all items, request borrow

### Step 1: Create Our First API Functions

**File:** `src/api/items.js` (create this new file)

```javascript
import apiClient from '@/lib/axios';

// Get all items - needed for Home page
export const getAllItems = async (params = {}) => {
  try {
    const response = await apiClient.get('/items', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// Request to borrow an item - needed for Home page request buttons
export const requestBorrowItem = async (itemId, borrowerData = {}) => {
  try {
    const response = await apiClient.post(`/items/${itemId}/request`, borrowerData);
    return response.data;
  } catch (error) {
    console.error('Error requesting borrow:', error);
    throw error;
  }
};
```

**Explain to Students:**
- We only create functions we actually need
- Each function uses our axios instance for consistent configuration
- Error handling is built into each function
- The functions return just the data we need

### Step 2: Import API Functions in Home.jsx

**File:** `src/pages/Home.jsx` (at the top)

```javascript
import { getAllItems, requestBorrowItem } from "@/api/items";
```

### Step 3: Remove Placeholder Data

**Remove this entire constant:**

```javascript
// Remove the PLACEHOLDER_ITEMS array (lines 15-100+)
```

### Step 4: Update State Initialization

**Change from:**

```javascript
const [items, setItems] = useState(PLACEHOLDER_ITEMS);
const [loading, setLoading] = useState(false);
```

**To:**

```javascript
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
```

**Explain the Change:**

- Start with empty array since we'll fetch data
- Start with `loading: true` since we need to fetch data

### Step 5: Implement fetchItems Function

**Replace the commented TODO with:**

```javascript
const fetchItems = async () => {
  try {
    const items = await getAllItems();
    setItems(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    toast.error("Failed to load items");
  } finally {
    setLoading(false);
  }
};
```

Explain about toast notifications and navigation.

### Step 6: Call fetchItems

```javascript
useEffect(() => {
  fetchItems();
}, []);
```

### Step 7: Update Request Borrow Function

```javascript
const handleRequestBorrow = async (itemId) => {
  try {
    const result = await requestBorrowItem(itemId);
    toast.success(result.message);
    fetchItems(); // Refresh the list
  } catch (error) {
    console.error("Error requesting item:", error);
    toast.error("Failed to request item");
  }
};
```

### Step 8: Test the Integration - Discovering CORS Error

**Instructor Demo:**

1. Start both servers (backend on 5000, frontend on 5173)
2. Open the frontend in browser
3. **Important:** Open browser developer tools (F12) and go to Console tab
4. Refresh the page and watch the console

**Expected Result - CORS Error:**
You should see an error like this in the console:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/items' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Explain to Students:**
- CORS = Cross-Origin Resource Sharing
- Browser security feature that blocks requests between different origins
- Frontend (localhost:5173) and Backend (localhost:5000) are different origins
- We need to explicitly allow cross-origin requests

---
title: Fixing CORS Error - Installing and Configuring CORS
description: Understanding and solving the CORS policy error
duration: 10
card_type: cue_card
---

## Understanding and Fixing CORS

**Teaching Moment:** This is a real-world problem every full-stack developer encounters!

### Step 1: Install CORS Package

**Go back to backend terminal:**
```bash
# Make sure you're in the backend directory
cd backend

# Install CORS package
npm install cors
```

### Step 2: Update server.js to Include CORS

**File:** `server.js` - Update the imports and middleware:

```javascript
const express = require("express");
const cors = require("cors");  // Add this import
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Add this line
app.use(bodyParser.json());

// ... rest of your server code remains the same
```

**Explain What CORS Does:**
- `app.use(cors())` adds the necessary headers to allow cross-origin requests
- It adds `Access-Control-Allow-Origin: *` header to responses
- This tells the browser: "It's okay to accept this response from a different origin"

### Step 3: Test the Fix

**Instructor Demo:**
1. Save the server.js file (nodemon will automatically restart the server)
2. Go back to the frontend browser
3. Refresh the page
4. **Success!** Items should now load from the API
5. Check the console - no more CORS errors
6. Demonstrate search and filtering still work
7. Test the "Request" button functionality

**Teaching Points:**
- In production, you'd configure CORS more specifically for security but for this workshop, we allow all origins
- You can restrict it later by passing options to `cors()`
- Example: `app.use(cors({ origin: 'https://yourdomain.com' }))`
- CORS is essential knowledge for full-stack development

### Step 4: Update package.json

**Your package.json should now look like:**
```json
{
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.19.2"
  }
}
```

---
title: Item Details Page Integration  
description: Adding new API function and connecting individual item view
duration: 15
card_type: cue_card
---

## Connecting Item Details Page

**Context for Students:** The Item Details page needs a function to fetch individual items by ID. We'll add this function to our API layer, then integrate it.

### Step 1: Add New API Function

**File:** `src/api/items.js` (add to existing file)

```javascript
// Add this new function to the existing items.js file

// Get a specific item by ID - needed for Item Details page
export const getItemById = async (id) => {
  try {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};
```

### Step 2: Import API Functions

**File:** `src/pages/ItemDetails.jsx`

```javascript
import { getItemById, requestBorrowItem } from "@/api/items";
```

### Step 3: Remove Placeholder Data

**Remove the entire PLACEHOLDER_ITEMS array** (similar to what we did in Home.jsx)

### Step 4: Update Initial State

**Change from:**

```javascript
const [loading, setLoading] = useState(false);
```

**To:**

```javascript
const [loading, setLoading] = useState(true);
```

**Get the item ID from the URL:**

```javascript
const { id } = useParams();
```

### Step 5: Implement fetchItem Function

**Replace the commented TODO with:**

```javascript
const navigate = useNavigate();

const fetchItem = async () => {
  try {
    const item = await getItemById(id);
    setItem(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    toast.error("Failed to load item details");
    navigate("/");
  } finally {
    setLoading(false);
  }
};
```

Explain the working of toast notifications and navigation.

### Step 6: Call fetchItem in useEffect

```javascript
useEffect(() => {
  fetchItem();
}, [id]);
```

### Step 7: Update handleRequestBorrow

**Replace the placeholder implementation:**

```javascript
const handleRequestBorrow = async () => {
  setRequesting(true);
  try {
    const result = await requestBorrowItem(id);
    toast.success(result.message);
    fetchItem(); // Refresh item data
  } catch (error) {
    console.error("Error requesting item:", error);
    toast.error("Failed to request item");
  } finally {
    setRequesting(false);
  }
};
```

### Step 7: Test Item Details

**Instructor Demo:**

1. Navigate to home page
2. Click "View Details" on any item
3. Show that item loads from API
4. Test the request button
5. Show that status updates immediately

---
title: Add Item Form Integration
description: Adding final API function and connecting the form submission
duration: 15
card_type: cue_card
---

## Connecting Add Item Form

**Context:** The Add Item form needs to create new items. We'll add our final API function for this workshop, then integrate the form submission.

### Step 1: Add Final API Function

**File:** `src/api/items.js` (add to existing file)

```javascript
// Add this final function to complete our API layer

// Create a new item - needed for Add Item form
export const createItem = async (itemData) => {
  try {
    const response = await apiClient.post('/items', itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};
```

**Teaching Point:** Now our API layer is complete with all the functions we need for this workshop. In a real application, you'd continue adding functions as needed.

### Step 2: Import API Function

**File:** `src/pages/AddItem.jsx`

```javascript
import { createItem } from "@/api/items";
```

### Step 3: Replace Form Submission Logic

**Find the handleSubmit function and replace the entire placeholder implementation:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (
    !formData.name ||
    !formData.description ||
    !formData.category ||
    !formData.condition
  ) {
    toast.error("Please fill in all required fields");
    return;
  }

  setLoading(true);
  try {
    await createItem(formData);
    toast.success("Item added successfully!");
    navigate("/");
  } catch (error) {
    console.error("Error adding item:", error);
    toast.error("Failed to add item");
  } finally {
    setLoading(false);
  }
};
```

### Step 4: Understanding the Data Flow

**Show Students What Happens:**

1. User fills form and clicks submit
2. Frontend validates required fields
3. Frontend sends POST request with form data
4. Backend receives data and creates new item
5. Backend generates ID and adds to items array
6. Backend returns success response
7. Frontend shows success message
8. Frontend redirects to home page
9. Home page shows new item in the list

### Step 5: Test Add Item Functionality

**Instructor Demo:**

1. Navigate to "Add Item" page
2. Fill out the form with test data:
   - Name: "Test Item from Workshop"
   - Description: "This item was added during the workshop"
   - Category: "Tools"
   - Condition: "Good"
   - Image URL: (optional)
3. Submit the form
4. Show success message
5. Navigate back to home
6. Show that new item appears in the list

---
title: Testing the Complete Application
description: End-to-end testing of our full-stack application
duration: 5
card_type: cue_card
---

## Complete Application Testing

**Instructor Note:** This is the moment of truth! We've built a complete full-stack application. Let's test every feature to ensure everything works together.

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Should show: Server running on port 5000

# Terminal 2 - Frontend
cd client
npm run dev
# Should show: Local: http://localhost:5173
```

Test all the pages and routes in the application to ensure everything is functioning as expected.

---
title: Deployment
description: Deploying our full-stack application to production
duration: 5
card_type: cue_card
---

## Deploying Our Full-Stack Application
**Instructor Note:** Deployment is an important step in the development lifecycle. We'll cover the basics of deploying both the frontend and backend.

Before deploying, we'll push our code base to GitHub so we can connect it to deployment platforms.

### Frontend Deployment

We'll deploy the React frontend using Vercel, a popular platform for hosting static sites and serverless functions.

1. **Create a Vercel Account**: Go to [Vercel](https://vercel.com) and sign up.
2. **Add New Project**: Click "New Project" or "Add New..." and select Project from dropdown.
3. **Connect GitHub**: Authorize Vercel to access your GitHub account.
4. **Select Repository**: Choose the repository where your React app is hosted. If the repository doesn't show in the list, go to your GitHub account, then Settings > Integrations/Applications. Configure the Vercel integration to allow access. Now again, go to Vercel and refresh the list of repositories. Find your repository and import it.
5. **Deploy**: Change the root directory to `client` (where your React app is located), leave all other settings as default and click "Deploy".
6. **Visit Your Site**: Once deployed, Vercel will provide a URL where your React app is live.

### Backend Deployment

We'll deploy the Express backend using Render, a platform that supports Node.js applications.

Before deploying, we need to secure our backend by adding CORS configuration to allow requests from our frontend domain only.

**Update CORS Configuration**: In `server.js`, change the CORS middleware to allow only your frontend domain:

```javascript
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL, do not add a trailing slash
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

**Instructor Note:** Make sure to replace `http://localhost:5173` with your actual frontend URL when deploying and push the changes to GitHub.

### Deploying the Backend
1. **Create a Render Account**: Go to [Render](https://render.com) and sign up.
2. **Create a New Web Service**: Click on "New" and select "Web Service".
3. **Connect GitHub**: Authorize Render to access your GitHub account.
4. **Select Repository**: Choose the repository where your Express app is hosted. If the repository doesn't show in the list, go to your GitHub account, then Settings > Integrations/Applications. Configure the Render integration to allow access. Now again, go to Render and refresh the list of repositories. Find your repository and import it.
5. **Configure Build Settings**: 
   - Set the root directory to `backend` (where your Express app is located).
   - Set the build command to `npm install`.
   - Set the start command to `npm run start`.
   - Set the environment to Node.js.
6. **Deploy**: Click "Create Web Service" to start the deployment process.
7. **Visit Your API**: Once deployed, Render will provide a URL where your Express API is live.

### Final Steps
- **Update Frontend API URL**: In your React app, update the base URL in `src/lib/axios.js` to point to your deployed backend URL.

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your deployed backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

## Solving the vercel bug

If you visit any route other than your home page directly, you might encounter a 404 error. This is because Vercel needs to know how to handle client-side routing in React.

### Fixing Vercel Routing Issue
To fix this, create a `vercel.json` file in the root of your React app (inside the `client` directory) with the following content:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This tells Vercel to serve `index.html` for all routes, allowing React Router to handle the routing on the client side.

### Final Testing
- After deploying both frontend and backend, test the entire application end-to-end.
- Ensure all features work as expected: viewing items, requesting to borrow, adding new items, etc.

**End of Workshop - Great job! 🎉**