# productnova-interview-assignment

Employee Management System — Node.js + Express + PostgreSQL backend.

Add employees with department and salary, list them, filter by department, and update/delete records.

## Setup

```bash
npm install
# create db + table
createdb employee_management
psql employee_management -c "CREATE TABLE IF NOT EXISTS employees (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, department VARCHAR(100) NOT NULL, salary NUMERIC NOT NULL CHECK (salary >= 0));"
cp .env.example .env  # then fill DB_PASSWORD etc.
npm start
```

## API

- `GET /api/employees` — list all
- `GET /api/employees?department=Engineering` — filter by department
- `POST /api/employees` — `{ name, department, salary }`
- `PUT /api/employees/:id` — `{ name, department, salary }`
- `DELETE /api/employees/:id`
