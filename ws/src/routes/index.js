const express = require('express');
const router = express.Router();

const studentService = require('../services/studentService');

router.get('/api/v1/student', async function(req, res){
    const students = await studentService.getStudents()
    res.json(students);
});

router.get('/api/v1/student/:id', async function(req, res){
    const student = await studentService.getStudent(req.params.id);
    res.json(student);
});

router.post('/api/v1/student', async function(req, res){
    const student = req.body;
    const newStudent = await studentService.saveStudent(student);
    res.json(newStudent);
});

router.put('/api/v1/student/:id', async function(req, res){
    const student = req.body;
    await studentService.updateStudent(req.params.id, student);
    res.json({status: 'success'});
});

router.delete('/api/v1/student/:id', async function(req, res){
    await studentService.deleteStudent(req.params.id);
    res.json({status: 'success'});
});

module.exports = router;