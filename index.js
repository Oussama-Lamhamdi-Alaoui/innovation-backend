import app from './app.js'
import connectToMongo from './mongo.js'
import * as config from './config.js'

const { server: serverConfig } = config

async function startServer() {
  await connectToMongo()
  app.listen(serverConfig.port, () => {
    console.log(`Server running http://localhost:${serverConfig.port} 🚀`)
  })
}

startServer()
