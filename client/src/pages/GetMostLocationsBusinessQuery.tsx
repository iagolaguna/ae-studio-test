import { gql } from "@apollo/client";
export const GET_MOST_LOCATIONS_BUSINESS = gql`
  {
    businessMostLocations {
      locationAccount
      businessName
      dbaName
      streetAdress
      city
      zipCode
      locationDescription
      mailingAddress
      mailingCity
      mailingZipCode
      naics
      primaryNaicsDescription
      councilDistrict
      locationStartDate
      location {
        latitude
        longitude
      }
    }
  }
`;
