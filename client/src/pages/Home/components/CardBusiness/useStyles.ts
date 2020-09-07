import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
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
