import { Field, ObjectType } from 'type-graphql'
import { ThirdPartyBusiness } from '~/modules/business/types/ThirdPartyBusiness'
import { Location, createLocationFromThirdPartyLocation } from './Location'

@ObjectType()
export class Business {
  @Field({ nullable: true })
  locationAccount: string

  @Field({ nullable: true })
  businessName: string

  @Field({ nullable: true })
  dbaName: string

  @Field({ nullable: true })
  streetAdress: string

  @Field({ nullable: true })
  city: string

  @Field({ nullable: true })
  zipCode: string

  @Field({ nullable: true })
  locationDescription: string

  @Field({ nullable: true })
  mailingAddress: string

  @Field({ nullable: true })
  mailingCity: string

  @Field({ nullable: true })
  mailingZipCode: string

  @Field({ nullable: true })
  naics: string

  @Field({ nullable: true })
  primaryNaicsDescription: string

  @Field({ nullable: true })
  councilDistrict: string

  @Field({ nullable: true })
  locationStartDate: Date

  @Field({ nullable: true })
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
