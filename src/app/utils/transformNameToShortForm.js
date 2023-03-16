export const transformNameToShortForm = (name, mapObj) => {
  let stateShortform = mapObj[name];
  if (stateShortform) {
    return name;
  }

  [stateShortform] = Object.entries(mapObj).filter(el => el[1] === name);

  return stateShortform;
};

export default transformNameToShortForm;
