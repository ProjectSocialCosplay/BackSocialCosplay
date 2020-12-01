export const postDescription = (request) => {

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
                        content
                        author{
                            email
                        }
             }}`;
        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Authorization')
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                console.log(res)
                expect(res.errors[0].message).toBe('You are not authenticated');

                done();
            });
    },);
}