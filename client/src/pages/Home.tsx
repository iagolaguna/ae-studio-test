import "leaflet-providers";
import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { makeStyles, Theme } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { useHome } from "./useHome";
import { LatLngTuple } from "leaflet";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  map: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
  },
}));

export const Home = () => {
  const classes = useStyles();
  const { actions, open, handleClose, handleOpen } = useHome();
  const position: LatLngTuple = [51.505, -0.09];
  return (
    <div className={classes.root}>
      <Map className={classes.map} center={position} zoom={5}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </Map>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
};
