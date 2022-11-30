import { Inputblock } from "../styles/components";
export const FormControl = (props) => (
  <Inputblock>
    <label htmlFor={props.name}>{props.children}</label>
    <input
      type={props.type}
      name={props.name}
      id={props.name}
      value={
        props.type === "number" && props.value > 0
          ? +props.value
          : props.value === 0
          ? ""
          : props.value
      }
      onChange={props.onChange}
    />
  </Inputblock>
);
