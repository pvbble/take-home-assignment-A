# Query Management Application: take-home-assignment-A

This is my take home assignment for Vial: a full-stack web application for managing queries in an EDC system.

## Extra Features

- Queries can be deleted.
- Resolved queries can be reopened.

## Setup

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/pvbble/take-home-assignment-A
cd take-home-assignment-A
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Build the containers and start the services:
```bash
docker-compose build
docker-compose up -d
```

4. Run migrations and seed the database with initial data:
```bash
npm run migrate
npm run seed
```

### Frontend Setup

1. Navigate to the frontend directory and download dependencies:
```bash
cd web
npm install
```

2. Start the development server:
```bash
npm run dev
```

## API Documentation

### Endpoints

#### Get Form Data
```http
GET /form-data
```
Returns all form data entries with their associated queries.

Response:
```json
{
  "total": "number",
  "data": {
    "formData": [
      {
        "id": "uuid",
        "question": "string",
        "answer": "string",
        "query": {
          "id": "uuid",
          "title": "string",
          "description": "string",
          "status": "OPEN | RESOLVED",
          "createdAt": "datetime",
          "updatedAt": "datetime"
        }
      }
    ]
  }
}
```

#### Create Query
```http
POST /query
```
Creates a new query for a form data entry.

Request Body:
```json
{
  "title": "string",
  "description": "string",
  "formDataId": "uuid"
}
```

#### Update Query
```http
PUT /query/:id
```
Updates an existing query's status or description.

Request Body:
```json
{
  "status": "OPEN | RESOLVED",
  "description": "string"
}
```

#### Delete Query
```http
DELETE /query/:id
```
Deletes a query by ID.