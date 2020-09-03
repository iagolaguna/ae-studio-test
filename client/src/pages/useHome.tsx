import React from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { useQuery, gql } from "@apollo/client";

const GET_OLD_BUSINESS = gql`
  {
    oldestBusiness {
      businessName
      locationStartDate
    }
  }
`;

const GET_MOST_LOCATIONS_BUSINESS = gql`
  {
    businessMostLocations {
      businessName
      location {
        latitude
        longitude
      }
      locationStartDate
    }
  }
`;
export const useHome = () => {
  const [open, setOpen] = React.useState(true);
  // const {error, data} = useQuery(GET_OLD_BUSINESS);
  const { error, data, loading } = useQuery(GET_MOST_LOCATIONS_BUSINESS);

  console.log("getOldBusiness", data);
  // console.log("getMostLocationsBusiness", getMostLocationsBusiness);

  const actions = [
    { icon: <BusinessIcon />, name: "Business with the most locations" },
    { icon: <LocationCityIcon />, name: "Oldest Business" },
  ];
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return { actions, open, handleClose, handleOpen, data };
};
