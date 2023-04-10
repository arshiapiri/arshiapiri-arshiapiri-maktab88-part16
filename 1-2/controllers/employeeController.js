const Employee = require("../model/Employee");
const createError = require('http-errors');


const page = (req, res) => {
    res.render("pages/employeePage")
};

const readEmployee = (req, res, next) => {
    try {
        const AllEmployee = Employee.find({}, {__v:0})
        res.render("", AllEmployee)
    } catch (error) {
        return next(createError(500, error.message));
    }
}

const readEmployeeById = async (req, res, next) => {
    try {
        const employeeID = req.params.id;
        const find = await Employee.findById(employeeID);
        res.render("", { find });
    } catch (error) {
        return next(createError(500, error.message));
    }
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


const updateEmployee =  (req, res, next) => {
    const updatedEmployee = {
        fristName: req.body[1].fristName,
        lastName: req.body[1].lastName,
        gender: req.body[1].gender,
        dateOfBirth: req.body[1].dateOfBirth,
        phone_number: req.body[1].phone_number,
        nationalCode: req.body[1].nationalCode,
        province: req.body[1].province,
        companyName: req.body[1].companyName,
        roleInCompany: req.body[1].roleInCompany
    };

    Employee.updateOne({"nationalCode":req.body[0].nationalCode},updatedEmployee)
    .then(employees => res.json(employees))
    .catch(error => {
        return next(createError(500, error.message));
    })
};

const removeEmployee = (req, res, next) => {
    Employee.deleteOne({"nationalCode":req.body.nationalCode})
    .then(employees => res.json(employees))
    .catch(err => {
        return next(createError(500, err.message));
    })
};




module.exports = {
    createEmployee,
    readEmployeeById,
    readEmployee,
    updateEmployee,
    page,
    removeEmployee
};