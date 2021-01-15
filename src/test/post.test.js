const {getToken, setToken} = require('./context');
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
                        id
                        content
                        author{
                            email
                        }
             }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', getToken())
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createPost.content).toBe("test");
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
            .set('token', getToken())
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
            .set('token', getToken())
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.errors[0].message).toBe('Post validation failed: content: Path `content` is required.');
                done();
            });
    },);
}