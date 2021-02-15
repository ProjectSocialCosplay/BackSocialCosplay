const {IntegTestData} = require('./context');
export const post = (request) => {
    it('Create Post not authenticated', async (done) => {
        const query = ` mutation {
             createPost(content: "test") {
                        content
                        author{
                            email
                        }
             }}`;

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
    },);

    it('Create Post', async (done) => {
        const query = ` mutation {
             createPost(content: "test") {
                        _id
                        content
                        author{
                            email
                        }
             }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token',IntegTestData.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createPost.content).toBe("test");
                IntegTestData.postId = res.data.createPost._id
                done();
            });
    },);
    it('Create empty post', async (done) => {
        const query = ` mutation {
             createPost(content: "") {
                        content
                        author{
                            email
                        }
             }}`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestData.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Post validation failed: content: Path `content` is required.');
                done();
            });
    },);

    it('Create space post', async (done) => {
        const query = ` mutation {
             createPost(content: " ") {
                        content
                        author{
                            email
                        }
             }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestData.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Post validation failed: content: Path `content` is required.');
                done();
            });
    },);
    it('Get user post', async (done) => {
        const query = `query {
             getPostWithUserId(id: "${IntegTestData.user_id}") {
                        _id
                        content
                        author{
                            email
                        }
             }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestData.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.getPostWithUserId[0].content).toBe('test');
                done();
            });
    },);
}