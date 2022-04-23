const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId

const Employee = require("../models/employee");

// localhost:3000/employees/list
router.get('/', (req,res)=>{
    Employee.find((err,docs)=>{
        if (!err) {
            res.send(docs);
        }
        else {console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined,2)); }
    });
});

//bunu async ile bi dene
// router.get('/', async (req,res) =>{
//     try {
//         await Employee.find()
//     } catch (error) {
//         console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined,2));
//     }
// })


router.get('/:id', async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    try {
       const emp= await Employee.findById(req.params.id);
       res.json(emp);
       
    } catch (error) {
        console.log('Error in Retriving Employee :'+ JSON.stringify(error, undefined, 2));
    }
});


router.post('/', (req,res) => {
    const emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save();
    try {
        res.send(req.body);
        res.send({data:res});
    } catch (error) {
       console.log('Error in Employee Save :' + JSON.stringify(error,undefined, 2))
    }
});

router.put('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };

    try {
        const updateEmp=  await Employee.findByIdAndUpdate(req.params.id, {$set: emp});
         res.send(updateEmp);
     } catch (error) {
         console.log('Error in Employee Delete :' + JSON.stringify(error, undefined, 2));
     }
    
});


router.delete('/:id', async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    try {
       const removeEmp=  await Employee.findByIdAndRemove(req.params.id);
        res.json(removeEmp);
    } catch (error) {
        console.log('Error in Employee Delete :' + JSON.stringify(error, undefined, 2));
    }

});


module.exports = router;