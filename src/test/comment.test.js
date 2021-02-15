const {IntegTestData} = require('./context');
export const comment = (request) => {

    it('Create comment not authenticated', async (done) => {
        const query = ` mutation{
                          createComment(comment:"1 comment" postId:"${IntegTestData.postId}")
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
                          createComment(comment:"1 comment" postId:"${IntegTestData.postId}")
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
            .set('token', IntegTestData.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createComment.comment).toBe("1 comment");
                IntegTestData.commentId = res.data.createComment._id
                done();
            });
    });

    it('get Comment', async (done) => {
        const query = ` query{
                          getComment(id:"${IntegTestData.commentId}")
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
            .set('token', IntegTestData.token)
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.getComment[0].comment).toBe('1 comment');
                done();
            });
    });
}