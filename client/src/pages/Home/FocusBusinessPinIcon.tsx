import L from "leaflet";
import pin from "../../assets/focus-pin.svg";

export default new L.Icon({
  iconUrl: pin,
  iconRetinaUrl: pin,
  iconSize: new L.Point(40, 40),
});
