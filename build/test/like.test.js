const { IntegTestDataUserOne } = require('./context');

export const like = request => {

    it('like not authenticated', async done => {
        const query = ` mutation{
                          createLike(postId:"${IntegTestDataUserOne.postId}")
                          {    
                              _id
                          }
                        }`;
        request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({ query }).then(response => {
            let res = JSON.parse(response.text);
            expect(response.status).toBe(200);
            expect(res.errors[0].message).toBe('You are not authenticated');
            done();
        });
    });
    it('deleteLike not authenticated', async done => {
        const query = ` mutation{
                          deleteLike(postId:"${IntegTestDataUserOne.postId}")
                          {    
                              _id
                          }
                        }`;
        request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').send({ query }).then(response => {
            let res = JSON.parse(response.text);
            expect(response.status).toBe(200);
            expect(res.errors[0].message).toBe('You are not authenticated');
            done();
        });
    });
    it('Like post', async done => {

        const query = ` mutation{
                          createLike(postId:"${IntegTestDataUserOne.postId}")
                          {    
                              _id
                              author{
                                  _id
                                 email
                                 likes{
                                    _id
                                 }
                              }
                              post{
                                likes{
                                    _id
                                }
                              }
                          }
                        }`;

        request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({ query }).then(response => {
            let res = JSON.parse(response.text);
            expect(response.status).toBe(200);
            expect(res.data.createLike._id).toBe(res.data.createLike.author.likes[0]._id);
            expect(res.data.createLike.author._id).toBe(IntegTestDataUserOne._id);
            expect(res.data.createLike._id).toBe(res.data.createLike.post.likes[0]._id);
            IntegTestDataUserOne.likeId = res.data.createLike._id;
            done();
        });
    });

    it('deleteLike', async done => {
        const query = `mutation{ deleteLike(postId:"${IntegTestDataUserOne.postId}"){
                        author{
                          _id
                        email
                        }
                        post{_id}
                      } }`;

        request.post('/graphql').set('Content-Type', 'application/json').set('Accept', '*/*').set('token', IntegTestDataUserOne.token).send({ query }).then(response => {
            let res = JSON.parse(response.text);
            expect(response.status).toBe(200);
            expect(res.data.deleteLike.author._id).toBe(IntegTestDataUserOne._id);
            expect(res.data.deleteLike.post._id).toBe(IntegTestDataUserOne.postId);
            done();
        });
    });
};
//# sourceMappingURL=like.test.js.map