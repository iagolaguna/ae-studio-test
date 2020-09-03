import { Query, Resolver } from 'type-graphql'
import { Business } from '~/modules/business/typeDefs/Business'
import { BusinessCollection } from '~/modules/business/collection'
import { KeyValue } from '../../../types/KeyValue'

@Resolver(() => Business)
export class BusinessResolver {
  @Query(() => [Business], { nullable: true })
  async businessMostLocations () {
    const business = BusinessCollection.chain().data()
    const bussinessWithMostLocations = Object
      .values(groupBy<Business>(business, 'businessName'))
      .reduce((major: Business[], currentGroup: Business[]) => currentGroup.length > major.length ? currentGroup : major, [])
    return bussinessWithMostLocations
  }

  @Query(() => Business, { nullable: true })
  async oldestBusiness () {
    const reducer = (oldest: Business, current: Business) => !oldest || oldest.locationStartDate > current.locationStartDate ? current : oldest
    const business = BusinessCollection.chain().data() as Business[]
    return business.reduce(reducer)
  }
}

const groupBy = function <T> (arr: T[], key: keyof T): KeyValue<T[]> {
  return arr.reduce(function (groupper: KeyValue<T[]>, curr: any) {
    const groupperKey = curr[key]
    return {
      ...groupper,
      [groupperKey]: [...(groupper[groupperKey] || []), curr]
    }
  }, {} as KeyValue<T[]>)
}
