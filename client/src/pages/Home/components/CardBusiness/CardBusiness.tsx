import React from "react";
import clsx from "clsx";
import { Card, CardHeader, Avatar, CardContent } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import Business from "types/Business";
import { useCardBusiness } from "./useCardBusiness";
import { useStyles } from "./useStyles";
import Label from "./components/Label";

export type CardBusinessProps = {
  business: Business;
};

export const CardBusiness = ({ business }: CardBusinessProps) => {
  const classes = useStyles();
  const {
    matches,
    handlers,
    isCardOpen,
    getValueOrDefault,
    cardView,
  } = useCardBusiness({ business });

  return (
    <Card
      data-testid="card-business"
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
        {Object.entries(cardView).map(([label, value]) => (
          <Label key={label} label={label} value={value} />
        ))}
      </CardContent>
    </Card>
  );
};
