const { sqlForPartialUpdate } = require('./sql');
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