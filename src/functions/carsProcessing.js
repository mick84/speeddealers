export const carsProcessing = (d) => {
  const res = d.docs.map((doc) => {
    const {
      id,
      _document: {
        data: {
          value: {
            mapValue: { fields },
          },
        },
      },
    } = doc;
    const mapped = { id };
    for (const field in fields) {
      mapped[field] = Object.entries(fields[field])[0][1];
    }
    return mapped;
  });
  return res;
};
