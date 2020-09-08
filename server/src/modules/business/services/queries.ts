import { BusinessCollection } from '~/modules/business/collection'
import { groupBy } from '~/common/utils'
import { Business } from '~/modules/business/typeDefs/Business'

export const findBusinessWithMostLocations = () => {
  const business = BusinessCollection.find()
  const bussinessWithMostLocations = Object
    .values(groupBy<Business>(business, 'businessName'))
    .reduce((major: Business[], currentGroup: Business[]) => currentGroup.length > major.length ? currentGroup : major, [])
  return bussinessWithMostLocations
}

export const findOldestBusiness = () => {
  const reducer = (oldest: Business, current: Business) => !oldest || oldest.locationStartDate > current.locationStartDate ? current : oldest
  const business = BusinessCollection.find() as Business[]
  return business.reduce(reducer)
}
