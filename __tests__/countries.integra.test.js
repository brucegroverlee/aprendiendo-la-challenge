let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const db = require('../db');

chai.use(chaiHttp);

describe('Testing Countries route', () => {
  let requester;

  beforeAll( done => {
    requester = chai.request(server).keepOpen();
    db.query('TRUNCATE TABLE `countries`', function (error, results, fields) {
      if (error) {
        throw error;
      }
      done();
    });
  });

  afterAll(done => {
    requester.close(done);
  });

  describe('POST /countries', () => {
    test('Should create a new country', async (done) => {
      const res = await requester.post('/countries').send({
        name: 'Peru-test',
        currency: 'PEN',
        phoneCode: '51',
        isoCode: 'PE',
      });
      expect(res.status).toEqual(201);
      done();
    });
  });

  describe('GET /countries', () => {
    test('Should read the countries list', async (done) => {
      const res = await requester.get('/countries');
      expect(res.status).toEqual(200);
      done();
    });
  });

  describe('GET /countries', () => {
    test('Should read a country', async (done) => {
      const res = await requester.get('/countries/Peru-test');
      expect(res.status).toEqual(200);
      done();
    });
  });

  describe('UPDATE /countries', () => {
    test('Should update a country', async (done) => {
      const res = await requester.put('/countries/Peru-test').send({
        currency: 'PEP',
        phoneCode: '51',
        isoCode: 'PE',
      });
      expect(res.status).toEqual(202);
      done();
    });
  });

  describe('DELETE /countries', () => {
    test('Should delete a country', async (done) => {
      const res = await requester.del('/countries/Peru-test');
      expect(res.status).toEqual(202);
      done();
    });
  });

  describe('POST /none', () => {
    test('Should show 404 error', async (done) => {
      const res = await requester.del('/none');
      expect(res.status).toEqual(404);
      done();
    });
  });

});