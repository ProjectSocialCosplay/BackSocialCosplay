"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _templateObject;

var _require = require('apollo-server-express'),
    gql = _require.gql;

var _default = gql(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type User {\n        _id: ID!\n        _isActive: Boolean!\n        pseudo: String!\n        email: String!\n        password: String!\n        birthdate: Date\n        create_at: Date!\n        bio: String\n        posts: [Post!]!\n        likes: [Like]\n        profile_image: Picture\n        comment: [comment]\n        followers: [Follow] # disciple\n        following: [Follow] # personnes qu'il suit\n        feed:[Post]\n    }\n\n    type comment {\n        _id: ID\n        comment: String\n        post: Post\n        createdAt: String\n        author: User\n    }\n\n    type Token {\n        token: String!\n    }\n\n    extend type Query {\n        # get Info user with Id\n        user(id: ID!): User!\n        getAuthUser: User!\n        login(email: String!, password: String!): Token!\n        getProfileImage(Image: String): Picture\n        # Searches users by username or fullName\n        searchUsers(searchQuery: String!): [User]\n    }\n\n    extend type Mutation {\n        createUser(\n            pseudo: String!,\n            email: String!,\n            password: String!,\n            birthdate: Date,\n            profile_image_url: String\n        ): User!\n        updateUser(\n             pseudo: String!,\n             email: String!,\n             birthdate: Date\n        ): User!\n    }\n\n"])));

exports["default"] = _default;
//# sourceMappingURL=userSchema.js.map