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
  const formettedObjs = objs.slice()
  formettedObjs.sort((a, b) => {
    return order === 'lowFirst'
      ? a.regularPrice - b.regularPrice
      : b.regularPrice - a.regularPrice;
  });
  return formettedObjs;
}
export function sortByCapacity(objs, order) {
  const formettedObjs = objs.slice()
  formettedObjs.sort((a, b) => {
    return order === 'lowFirst'
      ? a.maxCapacity - b.maxCapacity
      : b.maxCapacity - a.maxCapacity;
  });
  return formettedObjs;
}