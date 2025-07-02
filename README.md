# CSV Converter API

A simple Express + TypeScript API to convert between CSV files, CSV strings, and JSON arrays.

## 🚀 Features

- Upload CSV file → JSON + CSV string
- Send CSV string → JSON + CSV string
- Send JSON array → JSON + CSV string

## 🛠️ Setup

Run these commands:

```bash
npm install
npm run dev
```

The server runs at:

```
http://localhost:3000
```

## 📬 POST /csv

### 1. Upload CSV File

- Method: POST
- URL: `/csv`
- Content-Type: `multipart/form-data`
- Field name: `file`

Example CSV file content:

```
name,age
Alice,25
Bob,30
```

---

### 2. Send CSV String

**Request JSON:**

```json
{
  "csv": "name,age\nAlice,25\nBob,30"
}
```

---

### 3. Send JSON Array

**Request JSON:**

```json
{
  "data": [
    { "name": "Alice", "age": 25 },
    { "name": "Bob", "age": 30 }
  ]
}
```

---

## 📦 Response

All 3 methods respond like this:

```json
{
  "csv": "name,age\nAlice,25\nBob,30",
  "data": [
    { "name": "Alice", "age": "25" },
    { "name": "Bob", "age": "30" }
  ]
}
```

---

Made with ❤️ using Express, multer, papaparse
