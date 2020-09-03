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
import {
  Paper,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const businessPinIcon = new L.Icon({
  iconUrl: pin,
  iconRetinaUrl: pin,
  iconSize: new L.Point(40, 40),
});

export const Home = () => {
  const classes = useStyles();
  const { info, actions, open, handleClose, handleOpen } = useHome();
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <div className={classes.root}>
      <Map className={classes.map} center={position} zoom={5}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {info.locations.map((a: any) => (
          <Marker icon={businessPinIcon} position={[a.latitude, a.longitude]}>
            <Popup>{JSON.stringify(info.business)}</Popup>
          </Marker>
        ))}
      </Map>
      <Card elevation={2} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="icon" className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Business"
        />
        <CardContent></CardContent>
      </Card>
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
            onClick={(ev) => console.log(ev)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};
