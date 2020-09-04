import { gql } from "@apollo/client";
export const GET_OLD_BUSINESS = gql`
  {
    oldestBusiness {
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
