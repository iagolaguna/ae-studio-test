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
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  card: {
    position: "fixed",
    minWidth: "350px",
    right: "50px",
    top: "50px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      bottom: "-150px",
      borderTopLeftRadius: "10%",
      borderTopRightRadius: "10%",
      right: "inherit",
      top: "inherit",
      transition: "bottom 1s",
    },
  },
  cardToggle: {
    bottom: "0px",
  },
}));
