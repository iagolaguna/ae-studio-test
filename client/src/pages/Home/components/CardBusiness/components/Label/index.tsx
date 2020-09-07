import React from "react";
import { makeStyles, Typography, Theme } from "@material-ui/core";

type LabelProps = {
  label: string;
  value: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: 350,
  },
  value: {
    fontWeight: 500,
    paddingLeft: theme.spacing(1),
  },
}));

const Label = ({ label, value }: LabelProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="primary" className={classes.label}>
        {label}
      </Typography>
      <Typography variant="body2" gutterBottom className={classes.value}>
        {value}
      </Typography>
    </div>
  );
};

export default Label;
