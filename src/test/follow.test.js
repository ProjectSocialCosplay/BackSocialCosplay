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
    it('authentication user two', async (done) => {

        const query = ` query {
                            login( password: "user2", email: "user2@gmail.com") {
                               token
                            }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(query => {
                let res = JSON.parse(query.text)
                //expect(query.status).toBe(200) TODO: Voir pourquoi c'est une 400
                expect(res.data.token).not.toBeNull();
                IntegTestDataUserTwo.token = res.data.login.token
                expect(IntegTestDataUserTwo.token).not.toBeNull();
                done();
            });
    },);
    it('user on follow user2', async (done) => {
        const query = ` mutation{
                          createFollow(followerId:"${IntegTestDataUserTwo._id}")
                          {
                            _id
                            user {
                                 _id
                                 pseudo
                            }
                            follower {
                                _id
                                pseudo
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
                expect(res.data.createFollow.user._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.createFollow.follower._id).toBe(IntegTestDataUserTwo._id);
                //  expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });
    it('userTwo follow userOne', async (done) => {
        const query = ` mutation{
                          createFollow(followerId:"${IntegTestDataUserOne._id}")
                          {
                            _id
                            user {
                                 _id
                                 pseudo
                            }
                            follower {
                                _id
                                pseudo
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestDataUserTwo.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createFollow.user._id).toBe(IntegTestDataUserTwo._id);
                expect(res.data.createFollow.follower._id).toBe(IntegTestDataUserOne._id);
                //  expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });

    it('Get Follower from user', async (done) => {
        const query = ` query{
                          user(id:"${IntegTestDataUserOne._id}")
                          {
                            _id
                            pseudo
                            followers {
                                _id
                                user {
                                    _id
                                    pseudo
                                }
                                follower{
                                    _id
                                    pseudo
                                }
                            }
                            following{
                                _id
                                user {
                                    _id
                                    pseudo
                                }
                                follower{
                                    _id
                                    pseudo
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
                expect(res.data.user.followers[0].user._id).toBe(IntegTestDataUserOne._id);
                expect(res.data.user.following[0].user._id).toBe(IntegTestDataUserTwo._id);
                //  expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });
}