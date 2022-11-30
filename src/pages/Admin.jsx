import { memo, useState } from "react";
import {
  Page,
  Container,
  Form,
  Inputblock,
  Button,
  Buttons,
} from "../styles/components";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import { palette } from "../styles/palette";
import CarTemplate from "../templates/CarTemplate";
import { changeControlledInput } from "../functions/changeControlledInput";
const Admin = (props) => {
  const newCarDefault = {
    brand: "",
    model: "",
    logo: "",
    maxSpeed: 0,
    transmission: "manual",
    dailyRent: 0,
    imageUrl: "",
  };
  const [newCar, setNewCar] = useState(newCarDefault);
  const clearForm = () => setNewCar(() => newCarDefault);
  const changeInput = (e) => changeControlledInput(e, newCar, setNewCar);
  const handleCarAddition = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cars"), newCar);
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Form
          color={palette.blackTr}
          onSubmit={handleCarAddition}
          onReset={clearForm}
        >
          <h2>Add a new Car</h2>
          <Inputblock>
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              name="brand"
              id="brand"
              required
              value={newCar.brand}
              onChange={changeInput}
            />
          </Inputblock>
          <Inputblock>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              name="model"
              id="model"
              required
              value={newCar.model}
              onChange={changeInput}
            />
          </Inputblock>
          <Inputblock>
            <label htmlFor="logo">Logo URL:</label>
            <input
              type="text"
              name="logo"
              id="logo"
              required
              value={newCar.logo}
              onChange={changeInput}
            />
          </Inputblock>
          <Inputblock>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              required
              value={newCar.imageUrl}
              onChange={changeInput}
            />
          </Inputblock>
          <Inputblock>
            <label htmlFor="max-speed">Max Speed:</label>
            <input
              type="number"
              name="max-speed"
              id="max-speed"
              required
              min={0}
              max={1000}
              value={newCar.maxSpeed}
              onChange={(e) =>
                setNewCar((st) => ({ ...st, maxSpeed: +e.target.value }))
              }
            />
          </Inputblock>
          <Inputblock>
            <label htmlFor="transmission">Transmission:</label>
            <select
              name="transmission"
              id="transmission"
              required
              defaultValue={newCar.transmission}
              onChange={changeInput}
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="robotic">Robotic</option>
            </select>
          </Inputblock>
          <Inputblock>
            <label htmlFor="daily-rent">Daily rent:</label>
            <input
              type="number"
              required
              name="daily-rent"
              id="daily-rent"
              value={newCar.dailyRent}
              onChange={(e) =>
                setNewCar((st) => ({ ...st, dailyRent: +e.target.value }))
              }
            />
          </Inputblock>
          <Buttons>
            <Button color={palette.btnReset} type="reset">
              Clear
            </Button>
            <Button color={palette.btnSubmit} type="submit">
              Add
            </Button>
          </Buttons>
        </Form>
        <CarTemplate {...newCar} />
      </Container>
    </AdminLayout>
  );
};
export default memo(Admin);
export const AdminLayout = styled(Page)`
  background-image: url("/adminBG.webp");
  //height: auto;
`;
