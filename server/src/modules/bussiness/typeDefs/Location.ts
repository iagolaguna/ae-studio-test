import { Field, ObjectType } from 'type-graphql'
import { ThirdPartyLocation } from '~/modules/bussiness/types/ThirdPartyBusiness'

@ObjectType()
export class Location {
    @Field()
    latitude: number;

    @Field()
    longitude: number;

    constructor (latitude: number, longitude: number) {
      this.latitude = latitude
      this.longitude = longitude
    }
}

export const createLocationFromThirdPartyLocation = ({ latitude, longitude }: ThirdPartyLocation) => new Location(parseFloat(latitude), parseFloat(longitude))
