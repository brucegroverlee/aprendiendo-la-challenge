let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);

describe('Testing Countries route', () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe('POST /countries', (done) => {
    test('Should create a new country', async () => {
      const res = await chai.request(server).post('/countries').send({
        name: 'Peru test',
        currency: 'PEN',
        phoneCode: '51',
        isoCode: 'PE',
      });
      expect(res.status).toEqual(201);
      //done();
    });
  });

});