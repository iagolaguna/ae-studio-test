import React, { useEffect, useState, useCallback } from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_OLD_BUSINESS } from "./queries/GetOldBusinessQuery";
import { GET_MOST_LOCATIONS_BUSINESS } from "./queries/GetMostLocationsBusinessQuery";
import Business from "types/Business";
import { LatLngTuple } from "leaflet";
import Location from "types/Location";

const OLD_BUSINESS_VIEW = 0;
const MOST_LOCATIONS_BUSINESS_VIEW = 1;

type MostLocationsBusiness = {
  businessMostLocations: Business[];
};

type OldestBusiness = {
  oldestBusiness: Business;
};

export const useHome = () => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(OLD_BUSINESS_VIEW);
  const [focusedBusiness, setFocusedBusiness] = useState<Business>();
  const [business, setBusiness] = useState<Business[]>([]);
  const [center, setCenter] = useState<LatLngTuple>([34.0194, -118.411]);

  const {
    loading: oldBusinessLoading,
    data: oldBusinessData,
    refetch: oldBusinessRefetch,
  } = useQuery<OldestBusiness>(GET_OLD_BUSINESS);

  const [
    getMostLocationsBusiness,
    { data: mostLocationsBusinessData, loading: mostLocationsBusinessLoading },
  ] = useLazyQuery<MostLocationsBusiness>(GET_MOST_LOCATIONS_BUSINESS);

  const getLocation = useCallback(
    (location: Location): LatLngTuple => [
      location.latitude,
      location.longitude,
    ],
    []
  );

  useEffect(() => {
    if (viewMode === OLD_BUSINESS_VIEW && oldBusinessData) {
      const { oldestBusiness } = oldBusinessData;
      setFocusedBusiness(oldestBusiness);
      setBusiness([oldestBusiness]);
      if (oldestBusiness && oldestBusiness.location)
        setCenter(getLocation(oldestBusiness.location));
    }
  }, [viewMode, getLocation, oldBusinessData]);

  useEffect(() => {
    if (
      viewMode === MOST_LOCATIONS_BUSINESS_VIEW &&
      mostLocationsBusinessData
    ) {
      const { businessMostLocations: data } = mostLocationsBusinessData;
      const business = data.find((buss: Business) => !!buss.location);
      setFocusedBusiness(business || data[0]);
      setBusiness(data);
      if (business && business.location)
        setCenter(getLocation(business.location));
    }
  }, [viewMode, getLocation, mostLocationsBusinessData]);

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

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

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
