const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET - List all employees / Filter by department
router.get("/", async (req, res) => {
    try {
        const { department } = req.query;

        let query = "SELECT * FROM employees";
        const values = [];

        if (department) {
            query += " WHERE department = $1";
            values.push(department);
        }

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// POST - Add employee
router.post("/", async (req, res) => {
    try {
        const { name, department, salary } = req.body;

        if (!name || !department || salary === undefined) {
            return res.status(400).json({
                error: "Name, department and salary are required"
            });
        }

        const query = `
            INSERT INTO employees (name, department, salary)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            name,
            department,
            salary
        ]);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// PUT - Update employee
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, salary } = req.body;

        if (!name || !department || salary === undefined) {
            return res.status(400).json({
                error: "Name, department and salary are required"
            });
        }

        const query = `
            UPDATE employees
            SET name = $1,
                department = $2,
                salary = $3
            WHERE id = $4
            RETURNING *;
        `;

        const result = await pool.query(query, [
            name,
            department,
            salary,
            id
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// DELETE - Delete employee
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            DELETE FROM employees
            WHERE id = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        res.json({
            message: "Employee deleted successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;