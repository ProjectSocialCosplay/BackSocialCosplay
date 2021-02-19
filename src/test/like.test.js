const {IntegTestData} = require('./context');
export const like = (request) => {

    it('like not authenticated', async (done) => {
        const query = ` mutation{
                          createLike(postId:"${IntegTestData.postId}")
                          {    
                              _id
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
    it('deleteLike not authenticated', async (done) => {
        const query = ` mutation{
                          deleteLike(postId:"${IntegTestData.postId}")
                          {    
                              _id
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
    it('Like post', async (done) => {
        const query = ` mutation{
                          createLike(postId:"${IntegTestData.postId}")
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

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestData.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createLike._id).toBe(res.data.createLike.author.likes[0]._id)

                expect(res.data.createLike.author._id).toBe(IntegTestData.userId)
                expect(res.data.createLike._id).toBe(res.data.createLike.post.likes[0]._id)
                IntegTestData.likeId = res.data.createLike._id
                done();
            });
    });

    it('deleteLike', async (done) => {
        const query = ` mutation{
                          deleteLike(postId:"${IntegTestData.postId}")
                          {    
                             message
                          }
                        }`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*')
            .set('token', IntegTestData.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                console.log(res.data)
                expect(response.status).toBe(200)
                expect(res.data.deleteLike.message).toBe("Like successfully deleted.")
                done();
            });
    });
}