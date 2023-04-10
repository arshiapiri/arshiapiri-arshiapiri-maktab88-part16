const Employee = require("../model/Employee");
const createError = require('http-errors');


const page = (req, res) => {
    res.render("pages/employeePage")
};

const getAllEmployees = async (req, res, next) => {
    try {
        let employees = await Employee.find({}, "-__v").lean()
        employees.forEach((employee) => {
            let dob = new Date(employee.dateOfBirth);
            let today = new Date(); 
            let age = today.getFullYear() - dob.getFullYear(); 
            employee.dateOfBirth = age;
        });
        res.json(employees);
    } catch (err) {
        return next(createError(500, err.message));
    };
};


const createEmployee = (req, res, next) => {
    const newEmployee = new Employee({
        fristName: req.body.fristName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        phone_number: req.body.phone_number,
        nationalCode: req.body.nationalCode,
        province: req.body.province,
        companyName: req.body.companyName,
        roleInCompany: req.body.roleInCompany
    });

    newEmployee.save()
        .then(savedEmployee => {
            return res.json(savedEmployee);
        })
        .catch(err => {
            return next(createError(500, err.message));
        });
};





module.exports = {
    createEmployee,
    getAllEmployees,
    page
};