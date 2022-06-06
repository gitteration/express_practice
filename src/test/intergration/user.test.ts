import request from "supertest";
import app from "../../.."
import assert from 'assert';
const testUser = {
	id:"asd@sddssssssssd.com",
	password:'12345678aA'
}

// describe('POST /auth/user', function() {
//   it('createUser', function(done) {
//     request(app)
//     .post('/auth/users')
//     .send(testUser)
//     .expect('Content-Type',/json/)
//     .expect(200,done)
//     .end();
//   });
// }); 

describe('POST /auth/user/status', function() {
  it('login', function(done) {
    request(app)
    .post('/auth/users/status')
    .send(testUser)
    .expect('Content-Type',/json/)
    .expect(200)
    .then(response => {
      assert(response.body.data, testUser.id);
      done();
    })
  })
});

