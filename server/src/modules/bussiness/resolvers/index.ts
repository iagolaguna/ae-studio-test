import { Query, Resolver } from 'type-graphql'
import { Bussiness } from '~/modules/bussiness/typeDefs/Bussiness'

@Resolver(() => Bussiness)
export class BussinessResolver {
  @Query(() => Bussiness, { nullable: true })
  async bussiness (): Promise<Bussiness | null> {
    return null
  }
}
