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
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useSwipeable } from "react-swipeable";

const businessPinIcon = new L.Icon({
  iconUrl: pin,
  iconRetinaUrl: pin,
  iconSize: new L.Point(40, 40),
});

export const Home = () => {
  const classes = useStyles();
  const { info, actions, open, handleClose, handleOpen } = useHome();
  const center: LatLngTuple = [39.106667, -94.676392];
  const getValueOrDefault = (prop?: string) => prop ?? "Not found";
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const [isCardOpen, setIsCardOpen] = React.useState(false);
  const handlers = useSwipeable({
    onSwipedUp: () => setIsCardOpen(true),
    onSwipedDown: () => setIsCardOpen(false),
    delta: 20,
  });

  return (
    <div className={classes.root}>
      <Map className={classes.map} center={center} zoom={3} minZoom={3}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {info.locations.map((a: any) => (
          <Marker
            icon={businessPinIcon}
            position={[a.latitude, a.longitude]}
          ></Marker>
        ))}
      </Map>
      <Card
        {...(matches ? handlers : {})}
        elevation={2}
        className={[classes.card, isCardOpen ? classes.cardToggle : ""].join(
          " "
        )}
        // onClick={toggleCard}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="icon" className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
          }
          title="Business"
        />
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {`Name: ${getValueOrDefault(info?.business?.businessName)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Naics Description: ${getValueOrDefault(
              info?.business?.primaryNaicsDescription
            )}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Naics: ${getValueOrDefault(info?.business?.naics)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`City: ${getValueOrDefault(info?.business?.city)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Address: ${getValueOrDefault(info?.business?.streetAdress)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Zip Code: ${getValueOrDefault(info?.business?.zipCode)}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`Start Date: ${getValueOrDefault(
              info?.business?.locationStartDate
                ? new Date(
                    info?.business?.locationStartDate
                  ).toLocaleDateString()
                : undefined
            )}`}
          </Typography>
        </CardContent>
      </Card>
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
