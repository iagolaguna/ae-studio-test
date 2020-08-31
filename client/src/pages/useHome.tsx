import React from "react";
import BusinessIcon from "@material-ui/icons/Business";
import LocationCityIcon from "@material-ui/icons/LocationCity";


export const useHome = () => {
  const [open, setOpen] = React.useState(true);
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
  return { actions, open, handleClose, handleOpen };
};
