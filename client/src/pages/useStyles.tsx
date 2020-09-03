import { makeStyles, Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) => ({
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
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    position: "fixed",
    right: "50px",
    top: "50px",
    minWidth: "350px",
  },
}));
