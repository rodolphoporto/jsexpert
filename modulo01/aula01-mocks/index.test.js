const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

// IFEE - Immediately Invoked Function Expression
;(async () => {
    
    // variaveis criadas nesse bloco, só são validas durante a execucao
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/invalid-header.csv';
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/fiveItems-invalid.csv';
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await assert.rejects(result, expected);
    }

    {
        const filePath = './mocks/threeItems-valid.csv';
        const expected = [
            {
                id: '1',
                name: 'xuxa da silva',
                profession: 'developer',
                age: '120'
            },
            {
                id: '2',
                name: 'jose da silva',
                profession: 'manager',
                age: '30'
            },
            {
                id: '3',
                name: 'zezinho',
                profession: 'QA',
                age: '25'
            },

        ]
        const result = await File.csvToJson(filePath);
        await assert.deepEqual(result, expected);
    }
    
})()