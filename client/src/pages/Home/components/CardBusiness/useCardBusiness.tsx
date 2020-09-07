import { useState } from "react";
import { useMediaQuery, Theme } from "@material-ui/core";
import { useSwipeable } from "react-swipeable";

export const useCardBusiness = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const [isCardOpen, setIsCardOpen] = useState(false);
  const handlers = useSwipeable({
    onSwipedUp: () => setIsCardOpen(true),
    onSwipedDown: () => setIsCardOpen(false),
    delta: 20,
  });
  const getValueOrDefault = (prop?: string) => prop ?? "Not found";

  return {
    matches,
    isCardOpen,
    handlers,
    getValueOrDefault,
  };
};
