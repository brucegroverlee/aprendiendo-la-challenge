const getMocks = require('../../../__mocks__/getMocks');
jest.mock('../../../db');

describe('Test countries delete', () => {

  beforeEach(() => {
    require('../../../db').__setMockError(false);
    require('../../../db').__setMockResults([]);
  });

  test('should read the countries list.', async () => {
    require('../../../db').__setMockResults([{
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    },{
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    }]);
    let mocks = getMocks();
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(200);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('should read a country. But is empty.', async () => {
    require('../../../db').__setMockResults([]);
    let mocks = getMocks();
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(200);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('should fail the MySQL server: ' + process.env.DB_HOST, async () => {
    require('../../../db').__setMockError(true);
    let mocks = getMocks();
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(500);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })
  
});