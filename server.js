const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});