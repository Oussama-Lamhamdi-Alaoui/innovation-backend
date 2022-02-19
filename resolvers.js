import { getUserById } from './models/user.js'
import {
  createVideo,
  getVideoById,
  getVideosByOwnerId,
} from './models/video.js'
import { requireUser } from './permissions.js'

const resolvers = {
  Query: {
    videosForHome: requireUser((parent, args, ctx, info) => {
      return getVideosByOwnerId(ctx.user._id)
    }),
    video: (parent, { id }, ctx, info) => {
      return getVideoById(id)
    },
  },
  Video: {
    id: (parent) => parent._id.toString(),
    owner: (parent, args, ctx, info) => {
      return getUserById(parent.owner || parent.owner._id)
    },
  },

  User: {
    id: (parent) => parent._id.toString(),
  },

  Mutation: {
    addVideo: requireUser(async (_, args, ctx, info) => {
      const { title, description, thumbnail, length } = args.input
      const owner = ctx.user

      //dummy validation
      if (title.trim() === '' || title.length < 3)
        return {
          success: false,
          message: `title is too short`,
        }

      const newVideo = await createVideo({
        title,
        description,
        thumbnail,
        length,
        owner,
      })

      return {
        success: true,
        message: `Video created successfully`,
        video: newVideo,
      }
    }),
  },
}

export default resolvers
