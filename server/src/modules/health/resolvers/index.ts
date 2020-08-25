import { Query, Resolver } from 'type-graphql'

import { HealthStatus } from '../typeDefs/HealthStatus'
import { getHealthStatus } from '../services/queries'

@Resolver(() => HealthStatus)
export class HealthResolver {
  @Query(() => HealthStatus, { nullable: true })
  async health (): Promise<HealthStatus | null> {
    return getHealthStatus()
  }
}
