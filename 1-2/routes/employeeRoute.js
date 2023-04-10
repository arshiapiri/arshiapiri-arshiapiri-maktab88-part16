const express = require("express");
const router =  express.Router();

// controllers
const { 
    createEmployee,
    readEmployee,
    page,
    updateEmployee,
    removeEmployee
 } = require("../controllers/employeeController")


 router.get("/page", page);


router.get("/", readEmployee);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", removeEmployee);




module.exports = router