# MERN Stack Coding Challenge

This project is a full-stack MERN application that fetches product transaction data from a third-party API and displays it in a dashboard. The backend provides several APIs to retrieve, filter, and visualize the transaction data, while the frontend presents it with interactive tables and charts.

## Features

### Backend
- **API Endpoints**:
  - Fetch and seed product transactions from a third-party API.
  - List transactions with support for search and pagination.
  - Get statistics for the total sales amount, sold, and unsold items.
  - Visualize transactions by price range (Bar chart) and category distribution (Pie chart).
  - Combined API to return all data in one response.

### Frontend
- **React Dashboard**:
  - Display transaction records in a searchable, paginated table.
  - Show sales statistics for the selected month.
  - Render bar and pie charts to visualize price ranges and category distribution.
  - Responsive design using Tailwind CSS for mobile and desktop views.

## Technologies
- **Backend**: Node.js, Express, Axios, MongoDB
- **Frontend**: React, Chart.js, Tailwind CSS
- **Database**: MongoDB for data persistence.
- **API Consumption**: Axios is used to make API calls to the backend.
- **Data Visualization**: Chart.js for rendering bar and pie charts.

## Project Structure

mern-stack-challenge/ │ ├── backend/ # Node.js/Express backend with API routes │ ├── controllers/ # Controllers handling API logic │ ├── models/ # Database schemas and models │ ├── routes/ # API route definitions │ └── server.js # Main server file │ ├── frontend/ # React frontend application │ ├── src/ # Main React app source code │ │ ├── components/ # UI components (cards, tables, charts) │ │ ├── pages/ # Main pages and layouts │ │ ├── App.js # Main app entry point │ └── public/ # Static assets │ └── README.md # Project documentation

markdown
Copy code

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- MongoDB (Local/Atlas)
- React (>=17.x)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-stack-challenge.git
    cd mern-stack-challenge
    ```

2. Install dependencies for both backend and frontend:
    ```bash
    npm install
    ```

3. Set up your MongoDB URI and other environment variables in `.env`.

4. Run the backend:
    ```bash
    npm run server
    ```

5. Run the frontend:
    ```bash
    npm run client
    ```

## Postman API Usage

To test the APIs, you can use Postman. Below are the API endpoints and how to make requests.

### 1. Fetch and Seed Data

**Endpoint**: `/initialize-database`  
**Method**: `GET`  
**Description**: Fetch data from the third-party API and seed the MongoDB database.

**Postman Command**:
```bash
GET http://localhost:3000/initialize-database
2. List Transactions
Endpoint: /transactions
Method: GET
Description: Fetch product transactions with support for pagination and search by title, description, or price.

Query Parameters:

month: The month to filter transactions (e.g., January, February).
searchText: (Optional) Search term for product title, description, or price.
page: (Optional) Page number for pagination (default is 1).
Postman Command:

bash
Copy code
GET http://localhost:3000/transactions?month=March&searchText=Laptop&page=1
3. Get Statistics for Transactions
Endpoint: /statistics
Method: GET
Description: Get total sales amount, sold items, and unsold items for a selected month.

Query Parameters:

month: The month to filter statistics (e.g., March, June).
Postman Command:

bash
Copy code
GET http://localhost:3000/statistics?month=March
4. Get Price Range Data (Bar Chart)
Endpoint: /bar-chart
Method: GET
Description: Get the distribution of products sold by price range for a selected month.

Query Parameters:

month: The month to filter data (e.g., March, October).
Postman Command:

bash
Copy code
GET http://localhost:3000/bar-chart?month=March
5. Get Category Data (Pie Chart)
Endpoint: /category-chart
Method: GET
Description: Get the distribution of products sold by category for a selected month.

Query Parameters:

month: The month to filter data (e.g., March, July).
Postman Command:

bash
Copy code
GET http://localhost:3000/category-chart?month=March
6. Get Combined Data
Endpoint: /combined
Method: GET
Description: Fetch all data (transactions, statistics, bar chart, and pie chart) in one API call.

Query Parameters:

month: The month to filter data (e.g., March).
searchText: (Optional) Search term for product title, description, or price.
page: (Optional) Page number for pagination (default is 1).
Postman Command:

bash
Copy code
GET http://localhost:3000/combined?month=March&searchText=Laptop&page=1
