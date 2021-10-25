const { sqlForPartialUpdate, sqlForQuerySearch } = require('./sql');
const { BadRequestError } = require('../expressError');

const jsToSql = {
    numEmployees: 'num_employees',
    logoUrl: 'logo_url'
};

describe('sqlForPartialUpdate', function() {
    test('ensure correct result', function() {
        const result = sqlForPartialUpdate({ name: 'companyName', numEmployees: 200, logoUrl: 'testLgo' }, jsToSql);
        expect(result).toEqual({
            setCols: '"name"=$1, "num_employees"=$2, "logo_url"=$3',
            values: ['companyName', 200, 'testLgo']
        });
    });
    test('ensure babRequest when no data is passed', function() {
        try {
            sqlForPartialUpdate({}, jsToSql);
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

describe('sqlForQuerySearch', function() {
    test('ensure correct result', function() {
        const result = sqlForQuerySearch({ minEmployees: 200, maxEmployees: 500, name: 'company' });
        expect(result).toEqual({
            whereCols: 'num_employees >= $1 AND num_employees <= $2 AND name ILIKE $3',
            values: [200, 500, '%company%']
        });
    });
    test('ensure babRequest when minEmployees > maxEmployees', function() {
        try {
            sqlForQuerySearch({ minEmployees: 200, maxEmployees: 100, name: 'company' });
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});