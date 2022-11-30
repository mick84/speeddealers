export const getCarRentDates = (car) => {
  return car.rentalDates.values.length
    ? car.rentalDates.values.map((el) => {
        const {
          mapValue: {
            fields: { beginning, ending },
          },
        } = el;
        return {
          beginning: beginning.timestampValue,
          ending: ending.timestampValue,
        };
      })
    : [];
};
export const dateProcessing = (dateArr) => {
  const res = dateArr.map((el) => ({
    beginning: new Date(el.beginning.seconds),
    ending: new Date(el.ending.seconds),
  }));
  return res;
};
