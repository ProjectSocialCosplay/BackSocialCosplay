const {IntegTestDataUserOne} = require('./context');
export const comment = (request) => {

    it('Create comment not authenticated', async (done) => {
        const query = ` mutation{
                          createComment(comment:"1 comment" postId:"${IntegTestDataUserOne.postId}")
                          {
                            comment
                          }
                        }`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('You are not authenticated');
                done();
            });
    });
    it('Creat Comment', async (done) => {
        const query = ` mutation{
                          createComment(comment:"1 comment" postId:"${IntegTestDataUserOne.postId}")
                          {
                            _id  
                            comment
                            post{
                              _id content
                            } 
                            author{
                              _id
                              pseudo
                            }
                          }
                        }`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestDataUserOne.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createComment.comment).toBe("1 comment");
                IntegTestDataUserOne.commentId = res.data.createComment._id
                done();
            });
    });
    it('Create more 255 caracter', async (done) => {
        const query = ` mutation{
                          createComment(comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac
                                              est egestas, posuere urna eu, blandit sapien. Sed vitae nisi finibus, fermentum dui vel, 
                                              fermentum risus. Maecenas ornare, odio ut commodo bibendum, nulla quam semper eros, at 
                                              pretium qui" postId:"${IntegTestDataUserOne.postId}")
                          {
                            _id
                            comment
                            post{
                              _id content
                            }
                            author{
                              _id
                              pseudo
                            }
                          }
                        }`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestDataUserOne.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Comment is too long");
                done();
            });
    });

    it('Empty comment', async (done) => {
        const query = ` mutation{
                          createComment(comment:"" postId:"${IntegTestDataUserOne.postId}")
                          {
                            _id
                            comment
                            post{
                              _id content
                            }
                            author{
                              _id
                              pseudo
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestDataUserOne.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Path `comment` is required.");
                done();
            });
    });
    it('Empty comment with space charter', async (done) => {
        const query = ` mutation{
                          createComment(comment:"" postId:"${IntegTestDataUserOne.postId}")
                          {
                            _id
                            comment
                            post{
                              _id content
                            }
                            author{
                              _id
                              pseudo
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestDataUserOne.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe("Comment validation failed: comment: Path `comment` is required.");
                done();
            });
    });

    it('get Comment', async (done) => {
        const query = ` query{
                          getComment(id:"${IntegTestDataUserOne.commentId}")
                          {
                            _id  
                            comment
                            post {
                              _id content
                            } 
                            author{
                              _id
                              pseudo
                            }
                          }
                        }`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestDataUserOne.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.getComment[0].comment).toBe('1 comment');
                done();
            });
    });
}