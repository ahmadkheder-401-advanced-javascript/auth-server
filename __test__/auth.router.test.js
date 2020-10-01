
const jwt = require('jsonwebtoken');
const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('Auth Router', () => {
  describe(`users signup/in`, () => {
    it('can sign up', async () => {
      const userData = { username: 'abc', password: '123' };
      const results = await mockRequest.post('/signup').send(userData);
      let user = results.body;
      expect(userData[name]).toEqual(user[name]);
    });

    it('can signin with basic', async () => {
      const userData = { username: 'sss', password: '555' };
      await mockRequest.post('/signup').send(userData);
      const results = await mockRequest.post('/signin').auth('sss', '555');
      const token = jwt.verify(results.body.token, process.env.SECRET);
      expect(token).toBeDefined();
    });
  });


  it('can get() all users with bearer token', async () => {
    const user1 = { username: 'qqq', password: '999' };
    const user2 = { username: 'hhh', password: '777' };
    const userList = [user1, user2];
    await mockRequest.post('/users').send(user1);
    await mockRequest.post('/users').send(user2);
    const results = await mockRequest.post('/signin').auth('sss', '555');
    const usersRet = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${results.body.token}`);
    const userItem = usersRet.body.results;
    userItem.forEach((key) => {
      expect(userItem[key]).toEqual(userList[key]);
    });
  });

  it('should respond with 404 for not found routes', () => {
    return mockRequest
      .get('/users/notFound')
      .then((result) => {
        expect(result.status).toBe(404);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should respond with 500 for bad routes', () => {
    return mockRequest
      .get('/bad')
      .then((result) => {
        expect(result.status).toBe(500);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});