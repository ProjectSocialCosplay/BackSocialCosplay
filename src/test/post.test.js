const {gql} = require('apollo-server-express');
const {app, server} = require('../index')
const supertest = require("supertest");
const request = supertest(app)
const {setupDB} = require('./test-setup')

describe('Post Description', () => {
    setupDB()
    it('insert new description', async (done) => {
        const query = ` mutation {
             createDescription(description: "test") {
                        created_at
                        _id_author
                        _id
                        }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(400)
                console.log(res)
                expect(res.errors[0].message).toBe('A description is required, but it was not provided.');
                done();
            });
    },);
})