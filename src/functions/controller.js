import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
//const carsCollectionRef = collection(db, "cars");
const deleteCar = async (id) => {
  try {
    const carToDelete = doc(db, "cars", id);
    await deleteDoc(carToDelete);
  } catch ({ message }) {
    throw new Error(message);
  }
};
const updateCar = async (id, data) => {
  const car = doc(db, "cars", id);
  try {
    await updateDoc(car, data);
  } catch ({ message }) {
    throw new Error(message);
  }
};
export const controller = { updateCar, deleteCar };
