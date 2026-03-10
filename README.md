# 🔧 Students API — NestJS + PostgreSQL Backend

REST API for the Students Table assignment. Handles all CRUD operations with full validation, error handling, and PostgreSQL persistence.

---

## 📁 Project Structure

```
students-api/
├── src/
│   ├── students/
│   │   ├── dto/
│   │   │   ├── create-student.dto.ts   ← Validates POST body
│   │   │   └── update-student.dto.ts   ← Validates PATCH body (all optional)
│   │   ├── entities/
│   │   │   └── student.entity.ts       ← Maps to PostgreSQL "students" table
│   │   ├── students.controller.ts      ← Defines all HTTP routes
│   │   ├── students.service.ts         ← Business logic + DB operations
│   │   └── students.module.ts          ← Wires everything together
│   ├── app.module.ts                   ← Root module (TypeORM + Config setup)
│   └── main.ts                         ← Server bootstrap (CORS, validation, port)
├── .env.example                        ← Copy to .env and fill values
├── render.yaml                         ← Render.com deploy config
├── tsconfig.json
└── package.json
```

---

## 🌐 API Endpoints

| Method | Route | Description | Body |
|---|---|---|---|
| `GET` | `/api/students` | Get all students | — |
| `GET` | `/api/students?search=arjun` | Search by name/email | — |
| `GET` | `/api/students/:id` | Get one student | — |
| `POST` | `/api/students` | Create student | `{ name, email, age }` |
| `PATCH` | `/api/students/:id` | Update student (partial) | `{ name?, email?, age? }` |
| `DELETE` | `/api/students/:id` | Delete student | — |

### Example Request/Response

**POST /api/students**
```json
// Request body
{ "name": "Arjun Sharma", "email": "arjun@example.com", "age": 21 }

// Response 201
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Arjun Sharma",
  "email": "arjun@example.com",
  "age": 21,
  "createdAt": "2024-03-10T09:00:00.000Z",
  "updatedAt": "2024-03-10T09:00:00.000Z"
}
```

**Validation Error (400)**
```json
{
  "statusCode": 400,
  "message": ["Please enter a valid email address."],
  "error": "Bad Request"
}
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL installed locally OR a free Supabase account

### Step 1 — Install dependencies
```bash
cd students-api
npm install
```

### Step 2 — Setup PostgreSQL locally
```sql
-- Run in psql or pgAdmin
CREATE DATABASE students_db;
```

### Step 3 — Create .env file
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=students_db
FRONTEND_URL=http://localhost:5173
```

### Step 4 — Start the server
```bash
npm run start:dev
# Server starts at http://localhost:3001
# Tables are auto-created by TypeORM (synchronize: true)
```

### Step 5 — Test the API
```bash
# Get all students
curl http://localhost:3001/api/students

# Create a student
curl -X POST http://localhost:3001/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Arjun Sharma","email":"arjun@example.com","age":21}'
```

---

## ☁️ Production Deployment

### Database → Supabase (Free PostgreSQL)

1. Go to https://supabase.com → **New Project**
2. Settings → Database → copy **Connection String (URI)**
3. Looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### Backend → Render.com (Free)

1. Push this folder to a **separate GitHub repo** (e.g. `students-api`)
2. Go to https://render.com → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
5. Add Environment Variables:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | *(paste Supabase connection string)* |
   | `FRONTEND_URL` | *(your Vercel/Netlify URL)* |
6. Click **Deploy** — takes ~2 minutes ✅

---

## 🔗 Connect Frontend to This Backend

In your `students-table` frontend project:

### 1. Create `.env` file
```env
VITE_USE_BACKEND=true
VITE_API_URL=https://your-app.onrender.com/api
```

### 2. Redeploy frontend on Vercel
In Vercel dashboard → Settings → Environment Variables → add the two vars above → **Redeploy**

---

## 📋 Validation Rules

| Field | Rules |
|---|---|
| `name` | Required, string, min 2 chars, max 100 chars |
| `email` | Required, valid email format, unique |
| `age` | Required, integer, min 5, max 100 |

---

## 🛠 Tech Stack

- **NestJS 10** — Node.js framework
- **TypeORM 0.3** — PostgreSQL ORM
- **class-validator** — DTO validation
- **PostgreSQL** — Database
- **Render.com** — Hosting
- **Supabase** — Managed PostgreSQL
