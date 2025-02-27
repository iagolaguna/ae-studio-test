import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
  useMediaQuery,
  Theme,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHome } from "./useHome";
import { useStyles } from "./useStyles";
import { CardBusiness } from "./components/CardBusiness/CardBusiness";
import BusinessPinIcon from "./components/BusinessPinIcon";
import FocusBusinessPinIcon from "./components/FocusBusinessPinIcon";
import Business from "types/Business";

export const Home = () => {
  const classes = useStyles();
  const {
    loading,
    center,
    business,
    focusedBusiness,
    actions,
    open,
    handleClose,
    handleOpen,
    focusBusiness,
  } = useHome();

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  return (
    <div className={classes.root}>
      <Backdrop
        open={loading}
        className={classes.backdrop}
        data-testid="loader"
      >
        <CircularProgress color="primary" variant="indeterminate" />
      </Backdrop>
      <Map
        className={classes.map}
        center={center}
        zoom={7}
        minZoom={3}
        animate
        fadeAnimation
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {business.map(
          (business: Business, index) =>
            business.location && (
              <Marker
                key={index}
                icon={
                  business === focusedBusiness
                    ? FocusBusinessPinIcon
                    : BusinessPinIcon
                }
                position={[
                  business.location?.latitude,
                  business.location?.longitude,
                ]}
                onclick={() => focusBusiness(business)}
              ></Marker>
            )
        )}
      </Map>
      {focusedBusiness && <CardBusiness business={focusedBusiness} />}
      <SpeedDial
        ariaLabel="Business information"
        className={classes.speedDial}
        icon={open ? <MenuOpenIcon /> : <MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={matches ? "down" : "up"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
};
