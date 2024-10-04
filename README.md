Dish Explorer App
This is a web application that helps users discover various dishes based on ingredients, cuisine, and origin. Users can search for dishes, view details, and navigate between different functionalities such as filtering, pagination, sorting, and more.

Features
Search Dishes: Search dishes by name, ingredients, or origin with an auto-suggest feature.
Dish Details: View detailed information about a dish, including ingredients and preparation methods.
Filter, Sort, and Pagination: Filter and sort dishes based on different attributes, with support for pagination.
CRUD Operations: Admin users can create, update, or delete dishes from the frontend.
User Authentication: Secure login functionality with JWT-based access and refresh tokens.
Notifications: User-friendly notifications for actions like dish creation, deletion, and errors.
Responsive Design: The app is fully responsive, ensuring compatibility with desktop, tablet, and mobile devices.
Database Structure: Efficiently stores dish and ingredient data with room for scalability.
Tech Stack
Frontend: React, Fluent UI, TypeScript
Backend: Node.js, Express, MongoDB
Authentication: JWT (JSON Web Tokens)
API: REST API for managing dishes and user authentication
State Management: React Context for managing global state
Package Manager: npm or yarn
Validation: Zod for schema validation
Setup Instructions
Prerequisites
Node.js (>=14.x)
npm (>=6.x) or yarn (>=1.22)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/dish-explorer-app.git
cd dish-explorer-app
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Set up environment variables:

Create a .env file in the root of the project and add the following:

bash
Copy code
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
Run the app locally:

bash
Copy code
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000.

Running Tests
Run unit and integration tests:
bash
Copy code
npm test
# or
yarn test
API Endpoints
Method	Endpoint	Description
GET	/api/dishes	Fetch all dishes
GET	/api/dishes/:id	Fetch a dish by ID
POST	/api/dishes	Create a new dish (Admin)
PUT	/api/dishes/:id	Update a dish by ID (Admin)
DELETE	/api/dishes/:id	Delete a dish by ID (Admin)
POST	/api/auth/login	User login
POST	/api/auth/refresh	Refresh access token
