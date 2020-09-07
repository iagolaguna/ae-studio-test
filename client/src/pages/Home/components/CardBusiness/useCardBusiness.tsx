import { useState } from "react";
import { useMediaQuery, Theme } from "@material-ui/core";
import { useSwipeable } from "react-swipeable";
import Business from "types/Business";

type useCardBusinessProps = {
  business: Business;
};

export const useCardBusiness = ({ business }: useCardBusinessProps) => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const [isCardOpen, setIsCardOpen] = useState(false);
  const handlers = useSwipeable({
    onSwipedUp: () => setIsCardOpen(true),
    onSwipedDown: () => setIsCardOpen(false),
    delta: 20,
  });
  const getValueOrDefault = (prop?: string) => prop ?? "Not found";

  const cardView = {
    ["Name"]: getValueOrDefault(business?.businessName),
    ["Naics"]: getValueOrDefault(business?.naics),
    ["City"]: getValueOrDefault(business?.city),
    ["Address"]: getValueOrDefault(business?.streetAdress),
    ["Zip Code"]: getValueOrDefault(business?.zipCode),
    ["Start Date"]: getValueOrDefault(
      business?.locationStartDate
        ? new Date(business?.locationStartDate).toLocaleDateString()
        : undefined
    ),
  };

  return {
    cardView,
    matches,
    isCardOpen,
    handlers,
    getValueOrDefault,
  };
};
