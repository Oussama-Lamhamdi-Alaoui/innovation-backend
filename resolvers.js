import { dummyVideos, dummyUsers } from './dummy-data.js'

const resolvers = {
  Query: {
    // returns an array of Videos that will be used to populate
    // the homepage grid of our web client
    videosForHome: (parent, args, ctx, info) => {
      return dummyVideos
    },
    video: (_, { id: argId }) => {
      return dummyVideos.find(({ id }) => id === argId)
    },
  },
  Video: {
    owner: ({ ownerId }, __) => {
      return dummyUsers.find(({ id }) => id === ownerId)
    },
  },
}

export default resolvers
