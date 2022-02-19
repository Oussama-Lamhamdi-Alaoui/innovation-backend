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

  Mutation: {
    addVideo: async (_, { input }) => {
      const { title, description, thumbnail, length, ownerId } = input
      //run validation
      //check if owner exists
      const owner = dummyUsers.find(({ id }) => id === ownerId)
      if (!owner)
        return {
          success: false,
          message: `Owner with id ${ownerId} does not exist`,
        }

      const newVideo = {
        id: 'randomId',
        title,
        description,
        thumbnail,
        length,
        ownerId,
      }
      dummyVideos.push(newVideo)
      return {
        success: true,
        message: `Video created successfully`,
        video: newVideo,
      }
    },
  },
}

export default resolvers
