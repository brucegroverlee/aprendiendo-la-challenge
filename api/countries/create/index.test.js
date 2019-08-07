const getMocks = require('../../../__mocks__/getMocks');
jest.mock('../../../db');

describe('Test countries create', () => {

  beforeEach(() => {
    require('../../../db').__setMockError(false);
    require('../../../db').__setMockResults([]);
  });

  test('should create a new country.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(201);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The name is not available.', async () => {
    require('../../../db').__setMockResults([{
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    }]);
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The name is empty or not valid.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: '',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The currency is empty or not valid.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      // currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The phoneCode is empty or not valid.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The isoCode is empty or not valid.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      // isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })

  test('shouldn\'t create a new country. The isoCode is bigger than 2 digits.', async () => {
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PER',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(406);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })
  
  test('should fail the MySQL server: ' + process.env.DB_HOST, async () => {
    require('../../../db').__setMockError(true);
    let mocks = getMocks();
    mocks.req.body = {
      name: 'Peru',
      currency: 'PEN',
      phoneCode: '51',
      isoCode: 'PE',
    };
    const functionTest = require('./index');
    await functionTest(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(500);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  })
  
});