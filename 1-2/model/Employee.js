const { mongoose } = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
    fristName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    gender: {
        type: String,
        enum: ["man", "woman", "unknown", "not-set"],
        default: "not-set",
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    phone_number: [
        {
            type: String,
            unique: true,
            required: true,
            validate: /^(\+98|0)?9\d{9}$/
        },
    ],
    nationalCode: {
        type: String,
        unique: true,
        validate: /^\d{10}$/
    },
    province: {
        type: String,
        trim: true,
        enum: [
            "Tehran",
            "Karaj",
            "Mashhad",
            "Shiraz",
            "Tabriz",
            "Isfahan",
            "Ahvaz",
            "Kermanshah",
            "Rasht",
            "Kerman",
            "Zahedan",
            "Yazd",
            "Gorgan",
            "Sanandaj",
            "Qazvin",
            "Khorramabad",
            "Sari",
            "Hamedan",
            "Arak",
            "Bandar Abbas",
            "Abadan",
            "Bushehr",
            "Kish",
            "Qom"
        ],
        default: "not-set"
    },
    companyName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    roleInCompany: {
        type: String,
        enum: ["Employee", "Manager"],
        default: "Employee",
    },
    DateOfRegistration: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
})

module.exports = mongoose.model("employee", EmployeeSchema);