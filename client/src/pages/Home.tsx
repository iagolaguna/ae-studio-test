import "leaflet-providers";
import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { useHome } from "./useHome";
import L, { LatLngTuple } from "leaflet";
import { useStyles } from "./useStyles";
import pin from "../assets/pin.svg";

const businessPinIcon = new L.Icon({
  iconUrl: pin,
  iconRetinaUrl: pin,
  iconSize: new L.Point(40, 40),
});

export const Home = () => {
  const classes = useStyles();
  const { data, actions, open, handleClose, handleOpen } = useHome();
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <div className={classes.root}>
      <Map className={classes.map} center={position} zoom={5}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {data &&
          data?.businessMostLocations.map((a: any) => (
            <Marker
              icon={businessPinIcon}
              position={[a.location.latitude, a.location.longitude]}
            >
              <Popup>{JSON.stringify(a)}</Popup>
            </Marker>
          ))}
      </Map>
      <SpeedDial
        ariaLabel="Business information"
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
