const axios = require('axios');
require('dotenv').config();

const request = function (url, method, data) {
    return axios({ url, method, data });
};

const url = function ( endpoint ) {
    return 'http://' + process.env.APP_HOST + ':' + process.env.APP_PORT + endpoint;
}

test('Should create a student', async function (){
    const response = await request( url('/api/v1/student'), 'post', {
        name: 'Test',
        email: 'test@email.com',
        cpf: '00000000000',
        ra: 'test-1234',
    });
    const student = response.data;
    expect(student.ra).toBe("test-1234");
})

test('Should get students', async function (){
    const response = await request(url('/api/v1/student'), 'get');
    const students = response.data;
    expect(students).toHaveLength(1);
})

test('Should update student', async function (){
    let student = await request(url('/api/v1/student/ra/test-1234'), 'get');
    student = student.data;
    const response = await request(url('/api/v1/student/' + student.id), 'put', {
        name: 'Test Update',
        email: 'test@email.com'
    });
    student = await request(url('/api/v1/student/ra/test-1234'), 'get');
    student = student.data;
    expect(student.name).toBe('Test Update');
})

test('Should delete student', async function (){
    let student = await request(url('/api/v1/student/ra/test-1234'), 'get');
    student = student.data;
    const response = await request(url('/api/v1/student/' + student.id), 'delete');
    expect(response.data).toStrictEqual({status:'success'});
})