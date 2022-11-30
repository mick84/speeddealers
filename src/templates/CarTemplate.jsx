import { palette } from "../styles/palette";
import { Card, CarCard } from "../styles/components";
import { memo } from "react";
const CarTemplate = (props) => (
  <CarCard key={props.id} image={props.imageUrl} logo={props.logo}>
    <span hidden>{props.id}</span>
    <div className="top" color={palette.blackTr}>
      <div className="logo" />
      <div>
        <div className="brand">{props.brand}</div>
        <div className="model">{props.model}</div>
      </div>
    </div>
    <div className="image" />
    <Card color={palette.blackTr}>
      <div className=" field speed">
        <span>Top speed: </span>
        <span> {props.maxSpeed} km/h</span>
      </div>
      <div className=" field transmission">
        <span>Transmission:</span>
        <span> {props.transmission}</span>
      </div>
      <div className=" field rental">
        <span>Daily rent:</span>

        <span className="price">${props.dailyRent}</span>
      </div>
    </Card>
    {props.children}
  </CarCard>
);
export default memo(CarTemplate);
