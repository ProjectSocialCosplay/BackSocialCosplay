const {IntegTestData} = require('./context');
export const event = (request) => {

    it('Create Event', async (done) => {
        const query = ` mutation{
                          createEvent(event_name: "Event Name" , event_date_start:"1930-11-12", event_date_end:"1930-11-12", event_url: "Hsds", description: "My description ", location: "My Localisation")
                          {
                            event_name
                            event_date_start
                            event_date_end
                          }
                        }`;

        request
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('token', IntegTestData.token)
            .set('Accept', '*/*')
            .send({query})
            .then(response => {
                let res = JSON.parse(response.text)
                expect(response.status).toBe(200)
                expect(res.data.createEvent.event_name).toBe('Event Name');
                done();
            });
    });
}