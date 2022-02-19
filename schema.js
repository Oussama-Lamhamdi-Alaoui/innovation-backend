import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type Video {
    id: ID!
    title: String!
    description: String
    owner: User!
    thumbnail: String
    length: Int
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    videosForHome: [Video!]!
    video(id: ID!): Video
  }

  input AddVideoInput {
    title: String!
    description: String
    ownerId: ID!
    thumbnail: String
    length: Int
  }

  type AddVideoResponse {
    success: Boolean!
    message: String!
    video: Video
  }

  type Mutation {
    addVideo(input: AddVideoInput!): AddVideoResponse!
  }
`
export default typeDefs
