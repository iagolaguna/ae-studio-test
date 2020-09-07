import 'dotenv/config'
import 'reflect-metadata'
import './config-aliases'
import { CronJob } from 'cron'
import { buildSchema } from 'type-graphql'
import { HealthResolver } from './modules/health/resolvers'
import { ApolloServer } from 'apollo-server'
import { BusinessResolver } from '~/modules/business/resolvers'
import { findAndStoreData } from '~/modules/business/services/update-active-business'

async function loadData () {
  await findAndStoreData()
}

// To keep data been updated every month
const cronjob = new CronJob('1 * 1 * *', loadData)

async function run () {
  await loadData()
  cronjob.start()

  const schema = await buildSchema({
    resolvers: [
      HealthResolver,
      BusinessResolver
    ],
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
