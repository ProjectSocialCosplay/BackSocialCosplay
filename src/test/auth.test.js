const {IntegTestDataUserOne} = require('./context');

export const userRegister = (request) => {
    it('insert user with empty pseudo', async (done) => {
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            //.send({query})
            .send({
                query: "mutation  { createUser ( password: \"test\", email: \"tt@gmail.com\", birthdate: \"1930-11-12\" ) { pseudo email _id }}"
            })
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(400)
                expect(res.errors[0].message).toBe('Field "createUser" argument "pseudo" of type "String!" is required, but it was not provided.');
                done();
            });
    },);
    it('insert user with empty email', async (done) => {
        const query = ` mutation {
             createUser(pseudo: "ttt", password: "test", birthdate: "1930-11-12" ) {
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
                expect(response.status).toBe(400)
                expect(res.errors[0].message).toBe('Field "createUser" argument "email" of type "String!" is required, but it was not provided.');
                done();
            });
    },);
    it('insert user with empty password', async (done) => {
        const query = ` mutation {
             createUser(pseudo: "ttt", email: "tt@gmail.com", birthdate: "1930-11-12") {
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
                expect(response.status).toBe(400)
                expect(res.errors[0].message).toBe('Field "createUser" argument "password" of type "String!" is required, but it was not provided.');
                done();
            });
    },);
    it('insert user with wrong email format', async (done) => {
        const query = ` mutation {
             createUser(pseudo: "ttt", password: "test", email: "testgmail.com", birthdate: "1930-11-12") {
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
                expect(res.errors[0].message).toBe('User validation failed: email: testgmail.com is not a valid email format');
                done();
            });
    },);
    it('insert user with wrong email format', async (done) => {
        const query = ` mutation {
             createUser(pseudo: "ttt", password: "test", email: "test@gmail", birthdate: "1930-11-12") {
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
                expect(res.errors[0].message).toBe('User validation failed: email: test@gmail is not a valid email format');
                done();
            });
    },);
    it('insert user with wrong email format', async (done) => {
        const query = ` mutation {
             createUser(pseudo: "ttt", password: "test", email: "@gmail.com", birthdate: "1930-11-12") {
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
                expect(res.errors[0].message).toBe('User validation failed: email: @gmail.com is not a valid email format');
                done();
            });
    },);
    it('insert user one', async (done) => {
        const query = ` mutation {
             createUser( pseudo: "ttt", password: "test", email: "test@gmail.com", birthdate: "1930-11-12" ) {
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
                expect(res.data.createUser.pseudo).toBe("ttt");
                expect(res.data.createUser.email).toBe("test@gmail.com");
                IntegTestDataUserOne._id = res.data.createUser._id
                done();
            });
    },);
    it('email is already use', async (done) => {
        const query = ` mutation {
             createUser( pseudo: "ttt", password: "test", email: "test@gmail.com", birthdate: "1930-11-12" ) {
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
                expect(res.errors[0].message).toBe("User validation failed: pseudo: is already taken, email: is already taken");
                done();
            });
    })
}
export const userAuth = (request) => {

    it('Authentication Email Error', async (done) => {
        const query = ` query {
                            login( password: "test", email: "testgmail.com") {
                               token
                            }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Invalid credentials')
                done();
            });
    },);
    it('Authentication empty password', async (done) => {
        const query = `query {
                            login( password: "", email: "test@gmail.com") {
                               token
                            }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Invalid credentials')
                done();
            });
    },);
    it('Authentication wrong password', async (done) => {
        const query = `query {
                            login( password: "sdgsdhgs", email: "test@gmail.com") {
                               token
                            }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Invalid credentials')
                done();
            });
    },);
    it('Authentication wrong email', async (done) => {
        const query = ` query {
                            login( password: "test", email: "testwrong@gmail.com") {
                               token
                            }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Invalid credentials')
                done();
            });
    },);
    //TODO fonction confirmation email
    it('unconfirmed authentication', async (done) => {

        const query = ` query {
                            login( password: "test", email: "test@gmail.com") {
                               token
                            }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(query => {
                let res = JSON.parse(query.text)
                //let res = JSON.parse(query.text)
                //expect(query.status).toBe(200)
                //TODO Rendre fonctionnel ce teste
                //expect(res.errors[0].message).toBe("Account not confirmed")
                done();
            });
    },);
    it('authentication', async (done) => {

        const query = ` query {
                            login( password: "test", email: "test@gmail.com") {
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
                IntegTestDataUserOne.token = res.data.login.token
                expect(IntegTestDataUserOne.token).not.toBeNull();
                done();
            });
    },);
    it('update user', async (done) => {
            const query = ` mutation {
                 updateUser( pseudo: "linda", email: "linda@gmail.com", birthdate: "1988-11-12" ) {
                            pseudo
                            email
                            _id
                            }}`;

            request
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Accept', '*/*')
                .set('token', IntegTestData.token)
                .send({query})
                .then(response => {
                    let res = JSON.parse(response.text)
                    IntegTestData.user_id = res.data.updateUser._id
                    expect(response.status).toBe(200)
                    expect(res.data.updateUser.pseudo).toBe("linda");
                    expect(res.data.updateUser.email).toBe("linda@gmail.com");
                    done();
                });
        },);
}