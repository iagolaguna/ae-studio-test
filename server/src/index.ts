import 'dotenv/config'
import 'reflect-metadata'
import './config-aliases'
import { buildSchema } from 'type-graphql'
import { HealthResolver } from './modules/health/resolvers'
import { ApolloServer } from 'apollo-server'

async function run () {
  const schema = await buildSchema({
    resolvers: [HealthResolver],
    emitSchemaFile: true,
    validate: false
  })

  const server = new ApolloServer({ schema: schema, playground: true })
  const port = process.env.PORT || 4000
  server.listen({ port }).then(
    () => console.log(`Server is running at http://localhost:${port}`)
  )
}

run()
