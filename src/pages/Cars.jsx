//import { UserAuth } from "../context/AuthContext";
import { Container, Form, Page } from "../styles/components";
import useDBFetch from "../hooks/useDBFetch";
import CarTemplate from "../templates/CarTemplate";
import { Buttons, Button } from "../styles/components";
import { palette } from "../styles/palette";
import { controller } from "../functions/controller";
import { useStoreUser } from "../context/AdminContext";
import { useState } from "react";
import { FormControl } from "../templates/FormControl";
import { changeControlledInput } from "../functions/changeControlledInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
export default function Cars(props) {
  //const { user } = UserAuth();
  const storeUser = useStoreUser();
  //console.log(storeUser);
  const [state, setState] = useDBFetch("cars");

  const [filter, setFilter] = useState({
    brand: "",
    maxPrice: 0,
    transmission: "",
  });
  const [dates, setDates] = useState({
    start: "", //new Date(Date.now()).toISOString().slice(0, 10),
    end: "" /*new Date(new Date().getTime() + 1000 * 3600 * 24 * 2)
      .toISOString()
      .slice(0, 10),*/,

    dateMessage: "",
  });

  const changeInput = (e) => changeControlledInput(e, filter, setFilter);
  //console.log(state.data[0]);
  //const usersCollectionRef = collection(db, "users");
  //const carsCollectionRef = collection(db, "cars");
  const deleteCar = async (id, index) => {
    setState((st) => ({ ...st, loading: true }));
    try {
      await controller.deleteCar(id);
      state.data.splice(index, 1);
      setState((st) => ({ ...st, data: st.data }));
    } catch ({ message }) {
      setState((st) => ({ ...st, error: message }));
    } finally {
      setState((st) => ({ ...st, loading: false }));
    }
  };
  const byDates = (car) => {
    const formatToNumber = (st) => Number(st.split("-").join(""));
    const inOrder = (min, num, max) => min <= num && num <= max;
    if (!car.rentalDates) {
      car.rentalDates = [];
    }
    const existingDates = car.rentalDates
      .map(({ start, end }) => ({
        start: formatToNumber(start),
        end: formatToNumber(end),
      }))
      .sort((a, b) => a.start - b.start);
    const [beginning, ending] = [dates.start, dates.end].map(formatToNumber);
    const correctBeginning = !existingDates.some((date) =>
      inOrder(beginning, date.start, ending)
    );
    const correctEnding = !existingDates.some((date) =>
      inOrder(beginning, date.end, ending)
    );
    const correctRange = !existingDates.some(
      (date) => date.start <= beginning && date.end >= ending
    );
    car.isAvailable = correctBeginning && correctEnding && correctRange;
    return car;
  };
  const byBrandAndPrice = (car) => {
    const cbr = car.brand.toLowerCase();
    const { maxPrice } = filter;
    const brand = filter.brand.toLowerCase();
    return brand && maxPrice > 0
      ? cbr.startsWith(brand) && car.dailyRent <= maxPrice
      : brand
      ? cbr.startsWith(brand)
      : maxPrice > 0
      ? car.dailyRent <= maxPrice
      : true;
  };
  const book = async (car, index, datesObj) => {
    setState((st) => ({ ...st, loading: true }));
    const ref = doc(db, "cars", car.id);
    const newDate = { start: datesObj.start, end: datesObj.end };
    const newRentalDates = car.rentalDates?.concat(newDate) || [newDate];
    try {
      await updateDoc(ref, { rentalDates: newRentalDates });
      setState((st) => {
        st.data[index].rentalDates = newRentalDates;
        return { ...st };
      });
    } catch ({ message }) {
      setState((st) => ({ ...st, error: message }));
      console.log(message);
    } finally {
      setState((st) => ({ ...st, loading: false }));
      console.log(car.rentalDates); //numbers=>easy to compare!
    }
  };
  return (
    <Page
      style={{
        backgroundImage: `url("/cars/road-2.jpg")`,
      }}
    >
      <Container>
        <Form color={palette.blackTr}>
          <h3>Filter by:</h3>
          <FormControl
            type="text"
            name={"brand"}
            value={filter.brand}
            onChange={changeInput}
          >
            Brand
          </FormControl>
          <FormControl
            type="number"
            name={"maxPrice"}
            value={filter.maxPrice}
            onChange={changeInput}
          >
            Max&nbsp;price
          </FormControl>
        </Form>
        <Form color={palette.blackTr}>
          <h3>Choose dates to feel the speed!</h3>
          <FormControl
            type="date"
            name={"date-start"}
            value={dates.start}
            onChange={(e) =>
              setDates((d) => ({
                ...d,
                start: e.target.value,
              }))
            }
          >
            Start:
          </FormControl>
          <FormControl
            type="date"
            name={"date-end"}
            value={dates.end}
            min={new Date(
              Date.parse(dates.start) + 1000 * 3600 * 24 * 2
            ).toDateString()}
            onChange={(e) =>
              setDates((d) => ({
                ...d,
                end: e.target.value,
              }))
            }
          >
            End:
          </FormControl>
          <p>{dates.dateMessage}</p>
          <Button
            color={palette.blackTr}
            onClick={setDates.bind(null, (d) => ({ ...d, start: "", end: "" }))}
          >
            See all cars
          </Button>
        </Form>
      </Container>
      <Container>
        {state.data
          .map(byDates)
          .filter(byBrandAndPrice)
          .map((car, i) => (
            <CarTemplate {...car} key={car.id}>
              <Buttons>
                {storeUser?.isAdmin ? (
                  <>
                    <Button color={palette.cafeaulait}>Edit</Button>
                    <Button
                      color={palette.btnSubmit}
                      onClick={deleteCar.bind(null, car.id, i)}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color={palette.cafeaulait}>
                      Check availability
                    </Button>
                    <Button
                      disabled={!dates.start || !dates.end || !car.isAvailable} //or not available!
                      color={palette.btnSubmit}
                      onClick={book.bind(null, car, i, dates)}
                    >
                      Book
                    </Button>
                  </>
                )}
              </Buttons>
            </CarTemplate>
          ))}
      </Container>
    </Page>
  );
}
