const app = require("../index");
const supertest = require("supertest");
const request = supertest(app)
const { setupDB } = require('./test-setup')

describe('User register', () => {
    it('insert user', async(done) => {
       const query = `mutation {
             createUser( { pseudo: "ttt", password: "test", email: "cembuyuk7gmail.com", birthdate: "1930-11-12" }) { 
               _id 
               pseudo 
               email 
               }}`;

       const req = request
            .post("/graphql")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({query})
            .end(function (err, res) {
                console.log(res.status)
                console.log(res.error)
                done();
            });
    });

})