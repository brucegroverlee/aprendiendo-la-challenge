const getMocks = require('../../../__mocks__/getMocks');
jest.mock('../../../db');

describe('Test countries delete', () => {

  beforeEach(() => {
    require('../../../db').__setMockError(false);
  });

  test('should delete a country.', async () => {
    let mocks = getMocks();
    mocks.req.params = {
      name: 'Peru',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(202);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  })

  test('shouldn\'t delete a country. The name is empty or not valid.', async () => {
    let mocks = getMocks();
    mocks.req.params = {
      name: '',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('should fail the MySQL server: ' + process.env.DB_HOST, async () => {
    require('../../../db').__setMockError(true);
    let mocks = getMocks();
    mocks.req.params = {
      name: 'Peru',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(500);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })
  
});