import React, { useEffect } from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_OLD_BUSINESS = gql`
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

const GET_MOST_LOCATIONS_BUSINESS = gql`
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
const OLD_BUSINESS_VIEW = 0;
const MOST_LOCATIONS_BUSINESS_VIEW = 1;
export const useHome = () => {
  const [open, setOpen] = React.useState(true);
  const [viewMode, setViewMode] = React.useState(OLD_BUSINESS_VIEW);
  const [info, setInfo] = React.useState<{ business: any; locations: any[] }>({
    business: null,
    locations: [],
  });
  const {
    error: oldBusinessError,
    loading: oldBusinessLoading,
    data: oldBusinessData,
    refetch: oldBusinessRefetch,
  } = useQuery(GET_OLD_BUSINESS);
  const [
    getMostLocationsBusiness,
    {
      error: mostLocationsBusinessError,
      data: mostLocationsBusinessData,
      loading: mostLocationsBusinessLoading,
      refetch: mostLocationsBusinessRefetch,
    },
  ] = useLazyQuery(GET_MOST_LOCATIONS_BUSINESS);

  useEffect(() => {
    if (viewMode === OLD_BUSINESS_VIEW && oldBusinessData) {
      const {
        oldestBusiness: { location, ...business },
      } = oldBusinessData;
      setInfo({ business, locations: [location] });
    }
  }, [viewMode, oldBusinessData]);

  useEffect(() => {
    if (
      viewMode === MOST_LOCATIONS_BUSINESS_VIEW &&
      mostLocationsBusinessData
    ) {
      console.log("mostLocationsBusinessData", mostLocationsBusinessData);
      // setInfo({ business, locations: [location] });
    }
  }, [viewMode, mostLocationsBusinessData]);

  const actions = [
    {
      icon: <BusinessIcon />,
      name: "Business with the most locations",
      onClick: () => getMostLocationsBusiness(),
    },
    {
      icon: <LocationCityIcon />,
      name: "Oldest Business",
      onClick: () => oldBusinessRefetch(),
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return { actions, open, handleClose, handleOpen, info };
};
