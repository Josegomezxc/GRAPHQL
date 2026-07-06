

import 'dotenv/config'
import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers.js'

async function startServer() {
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Conectado a MongoDB:', process.env.MONGO_URI)

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
    })

    // Apollo Server 5 standalone — no requiere Express manual
    const { url } = await startStandaloneServer(server, {
      listen: { port: parseInt(process.env.PORT) || 4000 },
    })

    console.log(`🚀 Servidor listo en ${url}`)
    console.log(`📊 Apollo Sandbox: ${url} — abre en tu navegador para probar queries`)
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message)
    process.exit(1)
  }
}

startServer()
