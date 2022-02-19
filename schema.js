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
`
export default typeDefs
