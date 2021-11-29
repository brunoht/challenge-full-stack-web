const database = require('../database/database');

exports.getStudents = () => {
    return database.query("SELECT * FROM students");
}

exports.getStudent = (id) => {
    return database.oneOrNone(
        "SELECT * FROM students WHERE id = $1",
        [id]
    );
}

exports.saveStudent = (student) => {
    return database.one(
        "INSERT INTO students (name, email, ra, cpf) values ($1, $2, $3, $4) returning *",
        [student.name, student.email, student.ra, student.cpf]
    );
}

exports.updateStudent = (id, student) => {
    return database.none(
        "UPDATE students set name = $1, email = $2 WHERE id = $3",
        [student.name, student.email, id]
    );
}

exports.deleteStudent = (id) => {
    return database.none(
        "DELETE FROM students WHERE id = $1",
        [id]
    );
}