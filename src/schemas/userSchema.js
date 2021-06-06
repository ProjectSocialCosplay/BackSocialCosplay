const {gql} = require('apollo-server-express');

module.exports = gql`
    type User {
        _id: ID!
        _isActive: Boolean!
        pseudo: String!
        email: String!
        password: String!
        birthdate: Date
        create_at: Date!
        bio: String
        posts: [Post!]!
        likes: [Like]
        profile_image: Picture
        comment: [comment]
        followers: [Follow] # disciple
        following: [Follow] # personnes qu'il suit
        feed:[Post]
    }

    type comment {
        _id: ID
        comment: String
        post: Post
        createdAt: String
        author: User
    }

    type Token {
        token: String!
    }

    extend type Query {
        # get Info user with Id
        user(id: ID!): User!
        getAuthUser: User!
        login(email: String!, password: String!): Token!
        getProfileImage(Image: String): Picture
        # Searches users by username or fullName
        searchUsers(searchQuery: String!): [User]
    }

    extend type Mutation {
        createUser(
            pseudo: String!,
            email: String!,
            password: String!,
            birthdate: Date,
            profile_image_url: String
        ): User!
        updateUser(
             pseudo: String!,
             email: String!,
             birthdate: Date
        ): User!
    }

`;