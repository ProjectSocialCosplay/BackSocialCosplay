const {IntegTestDataUserOne, IntegTestDataUserTwo} = require('./context');
export const follow = (request) => {
    it('create user two', async (done) => {
        const query = ` mutation {
                 createUser( pseudo: "user2", password: "user2", email: "user2@gmail.com", birthdate: "1930-11-12" ) {
                            pseudo
                            email
                            _id
                            }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createUser.pseudo).toBe("user2");
                expect(res.data.createUser.email).toBe("user2@gmail.com");
                IntegTestDataUserTwo._id = res.data.createUser._id
                done();
            });
    },);
    it('Follow user', async (done) => {
        const query = ` mutation{
                          createFollow(followerId:"${IntegTestDataUserTwo._id}")
                          {
                            _id
                            user {
                                 _id
                            }
                            follower {
                                _id
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestDataUserOne.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                console.log(res.data)
                expect(res.data.createFollow.user._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.createFollow.follower._id).toBe(IntegTestDataUserTwo._id);
                //  expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });
    it('Get Follower from user', async (done) => {
        const query = ` query{
                          user(id:"${IntegTestDataUserOne._id}")
                          {
                            _id
                            followers {
                                _id
                                user{
                                    _id
                                }
                                follower{
                                    _id
                                }
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestDataUserOne.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                console.log(res)
                //  expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });
}