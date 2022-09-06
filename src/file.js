const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');
const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id","name","profession","age"]
}

class File {

    static async csvToJason(filePath) {
        const csvContent = await File.getFileContent(filePath);
        const validation = File.isValid(csvContent);
        if(!validation.valid) throw new Error(validation.error);
        const users = File.parseCSVToJSON(csvContent);
        return users
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8");
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [csvHeader, ...csvBody] = csvString.split("\n");
        const isHeaderValid = csvHeader === options.fields.join(',')

        if(!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthValid = (
            csvBody.length > 0 &&
            csvBody.length <= options.maxLines
        )

        if(!isContentLengthValid){
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split('\n')
        const firstLine = lines.shift()
        const header = firstLine.split(',')
        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {};
            for (const index in columns) {
                user[header[index]] = columns[index]
            }
            return new User(user);
        })
        return users
    }

}

module.exports = File;