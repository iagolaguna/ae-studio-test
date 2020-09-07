import React from "react";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import Business from 'types/Business';
import { useCardBusiness } from "./useCardBusiness";
import { useStyles } from "./useStyles";

export type CardBusinessProps = {
  business?: Business;
};

export const CardBusiness = ({ business }: CardBusinessProps) => {
  const classes = useStyles();
  const {
    matches,
    handlers,
    isCardOpen,
    getValueOrDefault,
  } = useCardBusiness();

  return (
    <Card
      {...(matches ? handlers : {})}
      elevation={2}
      className={clsx(classes.card, isCardOpen && classes.cardToggle)}
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
          {`Name: ${getValueOrDefault(business?.businessName)}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Naics Description: ${getValueOrDefault(
            business?.primaryNaicsDescription
          )}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Naics: ${getValueOrDefault(business?.naics)}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`City: ${getValueOrDefault(business?.city)}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Address: ${getValueOrDefault(business?.streetAdress)}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Zip Code: ${getValueOrDefault(business?.zipCode)}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Start Date: ${getValueOrDefault(
            business?.locationStartDate
              ? new Date(business?.locationStartDate).toLocaleDateString()
              : undefined
          )}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
