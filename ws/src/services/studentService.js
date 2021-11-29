const studentData = require('../repositories/studentRepository');

exports.getStudents = () => {
    return studentData.getStudents();
}

exports.getStudent = (id) => {
    return studentData.getStudent(id);
}

exports.getStudentByRa = (ra) => {
    return studentData.getStudentByRa(ra);
}

exports.saveStudent = (student) => {
    return studentData.saveStudent(student);
}

exports.updateStudent = (id, student) => {
    return studentData.updateStudent(id, student);
}

exports.deleteStudent = (id) => {
    return studentData.deleteStudent(id);
}