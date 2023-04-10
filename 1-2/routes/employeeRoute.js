const express = require("express");
const router =  express.Router();

// controllers
const { 
    createEmployee,
    getAllEmployees,
    page,
 } = require("../controllers/employeeController")




router.get("/page", page);
router.post("/", createEmployee);
router.get("/all", getAllEmployees);




module.exports = router