# Assignment for Full Stack Developer: Neighborhood Resource Sharing App

## Project Overview

Build a full stack web application that enables residents of a neighborhood to lend and borrow household items such as tools, books, and appliances from each other. The platform should promote sustainability and community bonding. For the basic version, the backend will serve mock data (no real database or external API integration required).

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Mock Data Only:** No real database for the core assignment.
- **Deployment:** Vercel, Netlify, or Render


## Pages \& Routing

| Page Name | Route | Main Content / Features | Required / Bonus |
| :-- | :-- | :-- | :-- |
| Home / Catalog | `/` | Item list, search, filter, item cards | Required |
| Item Details | `/items/:id` | Item info, request button, availability status | Required |
| Add New Item | `/add-item` | Form to add item, validation, submission feedback | Required |
| My Requests | `/my-requests` | List of borrow requests, status, notifications | Bonus |
| Map View | `/map` | Map with item locations, filter, pin details | Bonus |
| User Profile | `/profile` | User info, trust score, lending/borrowing stats | Bonus |
| 404 Not Found | `*` | Error message, navigation link | Required |

## Page-by-Page Breakdown

### 1. Home / Item Catalog Page (`/`)

- List all available items as cards or a list.
- Each card shows: name, image, category, availability, and a “View Details” button that links to the item details page.
- Search bar to find items by name.
- Pagination for large item lists. (Bonus)
- Filters for category and availability. (Bonus)


### 2. Item Details Page (`/items/:id`)

- Full details: name, image, description, category, owner, condition, and availability.
- “Request to Borrow” button (mocked).
- If unavailable, show who borrowed it.
- Navigation link to return to catalog/home.


### 3. Add New Item Page (`/add-item`)

- Form fields: name, description, category (dropdown), condition, image URL.
- Form validation for required fields.
- Submit button (mocked).
- Random success/failure message after submission.


### 4. My Requests Page (`/my-requests`) _(Bonus)_

- List of items the user has requested to borrow, with current status (pending, approved, returned).
- Option to cancel a request (mocked).
- Notifications for request status updates (mocked).


### 5. Map View Page (`/map`) _(Bonus)_

- Map showing pins for item locations (mock geodata).
- Click on a pin to see item summary and link to details.
- Filter items by category or availability.


### 6. User Profile Page (`/profile`) _(Bonus)_

- User information (mocked): name, email, trust score.
- List of items lent and borrowed.
- Option to edit profile details (mocked).


### 7. 404 Not Found Page (`*`)

- Friendly message for invalid URLs.
- Link to return to the home/catalog page.


## Core Features

### Frontend (React.js)

- Item catalog with search and filter.
- Item details view.
- Add new item form with validation.
- Request to borrow (mocked).
- Responsive UI.
- Loading and error states.


### Backend (Node.js + Express.js)

- Serve mock data from in-memory JS objects or JSON files.
- Endpoints:
    - `GET /api/items` — List all items.
    - `GET /api/items/:id` — Get details for a specific item.
    - `POST /api/items` — Add new item (mocked).
    - `POST /api/items/:id/request` — Request to borrow an item (mocked).
    - `GET /api/map-items` — (Mock, Bonus): Get item locations for map view.
    - `GET /api/trust-score/:userId` — (Mock, Bonus): Get user's trust score and stats.


## Mock Data Example

```json
[
  {
    "id": "itm001",
    "name": "Cordless Drill",
    "description": "18V cordless drill, lightly used.",
    "category": "Tools",
    "owner": "Alice Johnson",
    "condition": "Good",
    "available": true,
    "image": "https://example.com/images/drill.jpg",
    "borrowedBy": null
  },
  {
    "id": "itm002",
    "name": "Camping Tent",
    "description": "4-person waterproof tent, easy setup.",
    "category": "Outdoors",
    "owner": "Brian Lee",
    "condition": "Excellent",
    "available": true,
    "image": "https://example.com/images/tent.jpg",
    "borrowedBy": null
  },
  {
    "id": "itm003",
    "name": "Crock Pot",
    "description": "Large 6-quart slow cooker, works great.",
    "category": "Kitchen",
    "owner": "Samantha Green",
    "condition": "Very Good",
    "available": false,
    "image": "https://example.com/images/crockpot.jpg",
    "borrowedBy": "Prachi Patel"
  },
  {
    "id": "itm004",
    "name": "Yoga Mat",
    "description": "Non-slip yoga mat, 6mm thick, blue color.",
    "category": "Fitness",
    "owner": "Ravi Mehra",
    "condition": "Good",
    "available": true,
    "image": "https://example.com/images/yogamat.jpg",
    "borrowedBy": null
  },
  {
    "id": "itm005",
    "name": "Ladder",
    "description": "6-foot aluminum step ladder, sturdy.",
    "category": "Tools",
    "owner": "Dana Wang",
    "condition": "Good",
    "available": true,
    "image": "https://example.com/images/ladder.jpg",
    "borrowedBy": null
  },
  {
    "id": "itm006",
    "name": "Board Game: Settlers of Catan",
    "description": "Complete set, all pieces included.",
    "category": "Games",
    "owner": "Luis García",
    "condition": "Like New",
    "available": true,
    "image": "https://example.com/images/catan.jpg",
    "borrowedBy": null
  }
]
```


## Bonus: Mock API Responses

### **GET /api/map-items**

```json
[
  {
    "itemId": "itm001",
    "lat": 28.4595,
    "lng": 77.0266,
    "address": "Block A, Sector 45",
    "name": "Cordless Drill",
    "category": "Tools"
  },
  {
    "itemId": "itm002",
    "lat": 28.4652,
    "lng": 77.0565,
    "address": "Block B, Sector 50",
    "name": "Camping Tent",
    "category": "Outdoors"
  }
]
```


### **GET /api/trust-score/:userId**

```json
{
  "userId": "usr123",
  "name": "Alice Johnson",
  "trustScore": 9.5,
  "lendingCount": 7,
  "borrowingCount": 2,
  "positiveFeedback": 97
}
```


## API Specification

| Endpoint | Method | Description | Request Body / Params | Response Example |
| :-- | :-- | :-- | :-- | :-- |
| `/api/items` | GET | Get all items | None | `[{"id": "...", ...}]` |
| `/api/items/:id` | GET | Get details for a specific item | Item ID in URL path | `{"id": "...", ...}` |
| `/api/items` | POST | Submit a new item | Item data in JSON | `{"success": true, "item": {...}}` |
| `/api/items/:id/request` | POST | Request to borrow an item | User info (optional, mock) | `{"success": true, "status": "requested"}` |
| `/api/map-items` | GET | Mock API: Get items for map view | None | See above |
| `/api/trust-score/:userId` | GET | Mock API: Get user trust score/info | user id in URL path | See above |

## Evaluation Criteria

| Category | Points | Details |
| :-- | :-- | :-- |
| Functionality | 3 | All features work as described |
| UI/UX | 3 | Responsive, visually clear, and user-friendly |
| Deployment | 2 | Live demo is accessible |
| Bonus Tasks | 2 | Number of bonus tasks implemented |
| Code Quality | 1 | Clean, modular, well-commented code |
| Scalability | 1 | Code structure allows easy extension |
| Documentation | 1 | Clear README and API docs |

> **If you complete any bonus feature/task please mention it separately in the README for proper evaluation!!**

## Bonus Features

- **Map View:** Show item locations on a map using Google Maps or Leaflet (mock geodata).
- **Notifications:** Mock notifications for new requests, approvals, or returns.
- **Trust Score:** Display a mock trust score for users based on lending/borrowing history (mock API).
- **User Profiles:** Mock user profiles with borrowing/lending stats.
- **Persistence with MongoDB:** Use MongoDB for storing items and requests.


## Submission Guidelines

1. **Code Submission:**
    - Submit the entire project directory with all relevant files and directories as a git repository.
    - Ensure all required features are working as expected.
2. **Deployment:**
    - Deploy your application on Vercel, Netlify, or Render.
    - Share the live app link and GitHub repository.
3. **README:**
    - Include setup instructions, tech stack, API documentation, features, and known issues.

**All the best for your assignment! We look forward to seeing your implementation of this neighborhood resource sharing platform. If you have any questions, feel free to reach out.**

**END**