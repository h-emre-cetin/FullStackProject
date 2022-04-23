const mongoose = require('mongoose');

// var Employee = mongoose.model('Employee',{
//     name:{type: String, required: true},
//     position:{type: String, required: true},
//     office: {type: String, required: true},
//     salary: {type: Number}
// });

const employeeSchema = mongoose.Schema({
    name:{type: String, required: true},
    position:{type: String, required: true},
    office: {type: String, required: true},
    salary: {type: Number}
});


module.exports = mongoose.model('Employee', employeeSchema);


// module.exports = Employee;