const { BadRequestError } = require('../expressError');

/** Return an object containing a set of columns to be updated and an array of values.
 *
 * Used in UPDATE query
 * 
 * Parameters: request body object and mapping of reqBody fields to their corresponding columns in the db (if different)
 * numEmployees -> num_employees, logoUrl -> logo_url
 *
 * Returns {setCols: name=$1, description=$2..., values: [companyName, companyDescription...]}
 *
 * Throws BadRequestError if no data was passed.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if (keys.length === 0) throw new BadRequestError('No data');

    // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

    return {
        setCols: cols.join(', '),
        values: Object.values(dataToUpdate)
    };
}

module.exports = { sqlForPartialUpdate };