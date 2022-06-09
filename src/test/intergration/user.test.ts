import request from "supertest";
import app from "../../.."
import assert from 'assert';
const testUser = {
	id:"test@test.com",
	password:'Ab456456456'
}

describe('POST /auth/user', function() {
  it('createUser', function(done) {
    request(app)
    .post('/auth/users')
    .send(testUser)
    .expect('Content-Type',/json/)
    .expect(200,done)
  });
}); 

// describe('POST /auth/user/status', function() {
//   it('login', function(done) {
//     request(app)
//     .post('/auth/users/status')
//     .send(testUser)
//     .expect('Content-Type',/json/)
//     .expect(200)
//     .then(response => {
//       assert(response.body.data, testUser.id);
//       done();
//     })
//   })
// });

