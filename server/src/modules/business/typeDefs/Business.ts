import { Field, ObjectType } from 'type-graphql'
import { ThirdPartyBusiness } from '~/modules/business/types/ThirdPartyBusiness'
import { Location, createLocationFromThirdPartyLocation } from './Location'

@ObjectType()
export class Business {
  @Field()
  locationAccount: string

  @Field()
  businessName: string

  @Field()
  dbaName: string

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
  locationStartDate: Date

  @Field()
  location?: Location

  constructor(
    locationAccount: string,
    businessName: string,
    dbaName: string,
    streetAddress: string,
    city: string,
    zipCode: string,
    locationDescription: string,
    mailingAddress: string,
    mailingCity: string,
    mailingZipCode: string,
    naics: string,
    primaryNaicsDescription: string,
    councilDistrict: string,
    locationStartDate: Date,
    location?: Location
  ) {
    this.locationAccount = locationAccount
    this.businessName = businessName
    this.dbaName = dbaName
    this.streetAdress = streetAddress
    this.city = city
    this.zipCode = zipCode
    this.locationDescription = locationDescription
    this.mailingAddress = mailingAddress
    this.mailingCity = mailingCity
    this.mailingZipCode = mailingZipCode
    this.naics = naics
    this.primaryNaicsDescription = primaryNaicsDescription
    this.councilDistrict = councilDistrict
    this.locationStartDate = locationStartDate
    this.location = location
  }
}

export const createBusinessFromThirdPartyBusiness = (business: ThirdPartyBusiness): Business => {
  const location = business.location_1 && createLocationFromThirdPartyLocation(business.location_1)
  return new Business(
    business.location_account,
    business.business_name,
    business.dba_name,
    business.street_address,
    business.city,
    business.zip_code,
    business.location_description,
    business.mailing_address,
    business.mailing_city,
    business.mailing_zip_code,
    business.naics,
    business.primary_naics_description,
    business.council_district,
    new Date(business.location_start_date),
    location
  )
}
