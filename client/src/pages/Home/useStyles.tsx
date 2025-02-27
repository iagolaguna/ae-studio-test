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
      [theme.breakpoints.down("xs")]: {
        right: theme.spacing(2),
        left: "inherit",
      },
    },
  },
  map: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
