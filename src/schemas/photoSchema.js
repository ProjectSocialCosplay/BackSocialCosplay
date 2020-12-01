import { gql } from 'apollo-server';

export default  gql`
    type Photo{
        Url: String,
        description: String,
        tags: String
    }
`;