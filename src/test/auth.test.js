const { gql } = require ('apollo-server-express');
const {app, server} = require('../index')
const supertest = require("supertest");
const request = supertest(app)
const {setupDB} = require('./test-setup')

describe('User register', () => {
    it('insert user', async (done) => {
        const query = ` mutation {
             createUser( pseudo: "ttt", password: "test", email: "test@gmail.com", birthdate: "1930-11-12" ) {
                        pseudo
                        email
                        }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
               let  res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createUser.pseudo).toBe("ttt");
                expect(res.data.createUser.email).toBe("test@gmail.com");
                done();
            });
    },);
})