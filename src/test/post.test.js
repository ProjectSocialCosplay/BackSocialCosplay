export const postDescription = (request) => {

    it('insert new description', async (done) => {
        const query = ` mutation {
             createDescription(description: "test") {
                        created_at
                        _id_author
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
                expect(res.errors[0].message).toBe('A description is required, but it was not provided.');
                done();
            });
    },);
}