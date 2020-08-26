import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Location {
    @Field()
    latitude: number

    @Field()
    longitude: number
}

@ObjectType()
export class Bussiness {
    @Field()
    locationAccount: string

    @Field()
    businessName: string

    @Field()
    streetAdress: string

    @Field()
    city: string

    @Field()
    zipCode: string

    @Field()
    locationDescription: string

    @Field()
    mailingAddress: string

    @Field()
    mailingCity: string

    @Field()
    mailingZipCode: string

    @Field()
    naics: string

    @Field()
    primaryNaicsDescription: string

    @Field()
    councilDistrict: string

    @Field()
    locationStartDate: string

    @Field()
    location: Location
}
