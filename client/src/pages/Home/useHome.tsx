import React, { useEffect, useState } from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_OLD_BUSINESS } from "./querys/GetOldBusinessQuery";
import { GET_MOST_LOCATIONS_BUSINESS } from "./querys/GetMostLocationsBusinessQuery";
import { Business } from "types/Business";
import { LatLngTuple } from "leaflet";

const OLD_BUSINESS_VIEW = 0;
const MOST_LOCATIONS_BUSINESS_VIEW = 1;

export const useHome = () => {
  const [open, setOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState(OLD_BUSINESS_VIEW);
  const [focusedBusiness, setFocusedBusiness] = useState<Business>();
  const [business, setBusiness] = useState<Business[]>([]);
  const [center, setCenter] = useState<LatLngTuple>([39.106667, -94.676392]);

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
    },
  ] = useLazyQuery(GET_MOST_LOCATIONS_BUSINESS);

  const getLocation = (business: Business): LatLngTuple =>
    business.location
      ? [business.location.latitude, business.location.longitude]
      : center;

  useEffect(() => {
    if (viewMode === OLD_BUSINESS_VIEW && oldBusinessData) {
      const { oldestBusiness } = oldBusinessData;
      setFocusedBusiness(oldestBusiness);
      setBusiness([oldestBusiness]);
      setCenter(getLocation(oldestBusiness));
    }
  }, [viewMode, oldBusinessData]);

  useEffect(() => {
    if (
      viewMode === MOST_LOCATIONS_BUSINESS_VIEW &&
      mostLocationsBusinessData
    ) {
      const { businessMostLocations: data } = mostLocationsBusinessData;
      const [first] = data;
      setFocusedBusiness(first);
      setBusiness(data);
      setCenter(getLocation(first));
    }
  }, [viewMode, mostLocationsBusinessData]);

  const actions = [
    {
      icon: <BusinessIcon />,
      name: "Business with the most locations",
      onClick: () => {
        getMostLocationsBusiness();
        setViewMode(MOST_LOCATIONS_BUSINESS_VIEW);
      },
    },
    {
      icon: <LocationCityIcon />,
      name: "Oldest Business",
      onClick: () => {
        oldBusinessRefetch();
        setViewMode(OLD_BUSINESS_VIEW);
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return {
    center,
    actions,
    open,
    handleClose,
    handleOpen,
    business,
    focusedBusiness,
    loading: oldBusinessLoading || mostLocationsBusinessLoading,
    focusBusiness: (business: Business) => setFocusedBusiness(business),
  };
};
