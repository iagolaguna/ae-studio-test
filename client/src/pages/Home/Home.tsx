import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { useMediaQuery, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHome } from "./useHome";
import { useStyles } from "./useStyles";
import { CardBusiness } from "./components/CardBusiness/CardBusiness";
import BusinessPinIcon from "./BusinessPinIcon";
import { Business } from "types/Business";
import FocusBusinessPinIcon from "./FocusBusinessPinIcon";

export const Home = () => {
  const classes = useStyles();
  const {
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
      <Map
        className={classes.map}
        center={center}
        zoom={10}
        minZoom={3}
        animate
        fadeAnimation
      >
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {business.map(
          (business: Business) =>
            business.location && (
              <Marker
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

      <CardBusiness business={focusedBusiness} />
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
