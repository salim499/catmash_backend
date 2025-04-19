# 🐱 Cat Mash - Backend

API backend for the **Cat Mash** application, a game where users vote for the cutest cat between two random choices then we chose the most cutest cat.

## 📦 Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** for the database
- Deployed on **Vercel**

---

## 🚀 Local Setup

### 1. Clone the repo

Clone this project to your local machine using the following command:

```bash
git https://github.com/salim499/catmash_backend.git
cd catmash_backend
```

### 2. Install dependencies

Once in the project directory, install the dependencies using npm:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project and add the following variables:

```plaintext
API_BASE_URL=https://conseil.latelier.co
DATABASE_URL=postgresql://cats_h4l9_user:TztnDR4DBG2o4pipjuBPM6mnhei2iTdh@dpg-cvurfph5pdvs73botkug-a.frankfurt-postgres.render.com/cats_h4l9
```

### 4. Start the database

If you're using **PostgreSQL** locally, make sure your server is running. If you don't have PostgreSQL installed, you can follow [the official documentation](https://www.postgresql.org/download/) to install it.

### 5. Run the application

Start the backend server using the following command:

```bash
npm start
```

This will start the API on `http://localhost:5000`. You can now make API requests to test the game.

---

## 🛠️ API Endpoints

### 1. **GET /cats**

Fetches a list of all cats with optional pagination, limit and offset from the database.

**Response:**

```json
[
  {
    "id": "8v5",
    "name": "chat 27",
    "url": "http://24.media.tumblr.com/tumblr_m0ljiiZ08O1r7plk4o1_500.jpg",
    "score": 18
  },
  {
    "id": "e82",
    "name": "chat 38",
    "url": "http://25.media.tumblr.com/tumblr_m4rwuzEHVz1r6jd7fo1_1280.jpg",
    "score": 8
  }
]
```

### 2. **GET /cats/:id**

Fetches a single cat by its ID from the database.

**Response:**

```json
{
  "id": "8v5",
  "name": "chat 27",
  "url": "http://24.media.tumblr.com/tumblr_m0ljiiZ08O1r7plk4o1_500.jpg",
  "score": 18
}
```

### 3. **GET /cats/random**

Fetches one or more random cats
Optional query: count, exclude (comma-separated list of IDs of excluded cats from the response)

**Response:**

```json
[
  {
    "id": "8v5",
    "name": "chat 27",
    "url": "http://24.media.tumblr.com/tumblr_m0ljiiZ08O1r7plk4o1_500.jpg",
    "score": 18
  },
  {
    "id": "ckc",
    "name": "chat 30",
    "url": "http://24.media.tumblr.com/tumblr_lnvz6gLbjS1qji0t2o1_500.jpg",
    "score": 4
  }
]
```

### 4. **GET /cats/count**

Fetches total number of cats

**Response:**

```json
{
  "count": 18
}
```

### 5. **PUT /cats/:id/score**

Fetches total number of cats

**Example request:**

```json
{
  "score": 1
}
```

- **score** : New score of cat.

---
