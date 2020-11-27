export const userRegister = (request) => {
    it('insert user with empty pseudo', async (done) => {
        const query = ` mutation {
             createUser(password: "test", email: "tt@gmail.com", birthdate: "1930-11-12" ) {
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
                console.log(res)
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
                expect(res.errors[0].message).toBe('user validation failed: email: testgmail.com is not a valid email format');
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
                expect(res.errors[0].message).toBe('user validation failed: email: test@gmail is not a valid email format');
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
                expect(res.errors[0].message).toBe('user validation failed: email: @gmail.com is not a valid email format');
                done();
            });
    },);
    it('insert user', async (done) => {
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
                done();
            });
    },);
    it('email and pseudo is already use', async (done) => {
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
                expect(res.errors[0].message).toBe("user validation failed: pseudo: is already taken, email: is already taken");
                done();
            });
    },);
}
export const userAuth = (request) => {
    it('insert user', async (done) => {
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
                done();
            });
    },);
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
        const query = ` query {
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
        const query = ` query {
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
    it('Account not confirmed', async (done) => {
        const query = ` query {
                            login( password: "test", email: "test@gmail.com") {
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
                expect(res.errors[0].message).toBe('Account not confirmed')
                done();
            });
    },);

    //TODO fonction confirmation email
    it('Authentication', async (done) => {
        const query = ` query {
                            login( password: "test", email: "test@gmail.com") {
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
                expect(res.data.login.token).not.toBeNull()
                done();
            });
    },);

}