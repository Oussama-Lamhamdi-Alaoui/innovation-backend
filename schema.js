import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type Video {
    id: ID!
    "Video title"
    title: String!
    thumbnail: String
    description: String
    owner: User!
    length: Int
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type SignUpResponse {
    success: Boolean!
    message: String!
    token: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AddVideoResponse {
    success: Boolean!
    message: String!
    video: Video
  }

  type DeleteVideoResponse {
    success: Boolean!
    message: String!
  }

  input AddVideoInput {
    title: String!
    description: String
    thumbnail: String
    length: Int
  }

  input DeleteVideoInput {
    id: ID!
  }

  type Mutation {
    addVideo(input: AddVideoInput!): AddVideoResponse!
    deleteVideo(input: DeleteVideoInput!): DeleteVideoResponse!
    login(input: LoginInput!): LoginResponse!
    signUp(input: SignUpInput!): SignUpResponse!
  }

  type Query {
    videosForHome: [Video!]!
    video(id: ID!): Video!
  }
`

export default typeDefs
