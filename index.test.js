const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert')
;

(async () => {
    // You can create code like this, separating the code by context, 
    // and than use the same variables and stuff, very useful to build tests.
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJason(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJason(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJason(filePath);
        const expected = [
            {
              "id": 123,
              "name": "Rafael Fernandes",
              "profession": "Developer",
              "birthDay": 1997
            },
            {
              "id": 234,
              "name": "Erick Wendel",
              "profession": "Teacher",
              "birthDay": 1997
            },
            {
              "id": 789,
              "name": "Erick",
              "profession": "Tecnical Suport",
              "birthDay": 1994
            }
        ]

        await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()