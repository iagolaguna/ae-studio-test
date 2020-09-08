import { Query, Resolver } from 'type-graphql'
import { Business } from '~/modules/business/typeDefs/Business'
import { findBusinessWithMostLocations, findOldestBusiness } from '~/modules/business/services/queries'

@Resolver(() => Business)
export class BusinessResolver {
  @Query(() => [Business], { nullable: true })
  async businessMostLocations () {
    return findBusinessWithMostLocations()
  }

  @Query(() => Business, { nullable: true })
  async oldestBusiness () {
    return findOldestBusiness()
  }
}
