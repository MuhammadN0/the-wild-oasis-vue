export function sortByName(objs, order) {
  const formattedObjs = objs;
  formattedObjs.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA < nameB) {
      return order === 'atz' ? -1 : 1;
    }
    if (nameA > nameB) {
      return order === 'atz' ? 1 : -1;
    }
    return 0;
  });
  return formattedObjs;
}

export function sortByPrice(objs, order) {
  const formettedObjs = objs.slice();
  formettedObjs.sort((a, b) => {
    return order === 'lowFirst'
      ? a.regularPrice - b.regularPrice
      : b.regularPrice - a.regularPrice;
  });
  return formettedObjs;
}
export function sortByCapacity(objs, order) {
  const formettedObjs = objs.slice();
  formettedObjs.sort((a, b) => {
    return order === 'lowFirst'
      ? a.maxCapacity - b.maxCapacity
      : b.maxCapacity - a.maxCapacity;
  });
  return formettedObjs;
}

export function sortByDate(objs, order) {
  const formattedObjs = objs.slice();
  formattedObjs.sort((a, b) => {
    return order === 'recent'
      ? new Date(b.startDate) - new Date(a.startDate)
      : new Date(a.startDate) - new Date(b.startDate);
  });
  return formattedObjs;
}

export function sortByBookingPrice(objs, order) {
  const formettedObjs = objs.slice();
  formettedObjs.sort((a, b) => {
    return order === 'lowFirst'
      ? a.totalPrice - b.totalPrice
      : b.totalPrice - a.totalPrice;
  });
  return formettedObjs;
}
