
# Node.js REST API for Finding Users Within a 10-Kilometer Radius

## Project Overview

This project is a Node.js application built using Express.js that provides a REST API to find users within a 10-kilometer radius of given latitude and longitude coordinates. The user data is stored in a MongoDB database, and the API supports pagination for the results.

## Features

- Accepts latitude and longitude as query parameters
- Calculates the distance between provided coordinates and each user's location using the Haversine formula
- Filters users within a 10-kilometer radius
- Sorts the list of users by distance in ascending order
- Returns a JSON response with the sorted list of users and their respective distances
- Supports pagination to limit the number of results returned at once
- Implements error handling for missing or invalid input parameters

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file and add your MongoDB connection string:
    ```plaintext
    MONGODB_URI=<your-mongodb-connection-string>
    ```

5. Seed the database with user data:
    ```javascript
    // Use MongoDB Compass or any MongoDB client to insert the provided user data into your MongoDB database.
    ```

6. Start the server:
    ```bash
    npm start
    ```

## Usage

Make a GET request to the `/api/users` endpoint with the following query parameters:
- `latitude`: The latitude of the location
- `longitude`: The longitude of the location
- `page`: The page number for pagination (optional, default is 1)
- `limit`: The number of results per page (optional, default is 10)

Example request:
```bash
curl "http://localhost:5000/api/users?latitude=-23.5505&longitude=-46.6333&page=1&limit=10"
```

## License

This project is licensed under the MIT License.
