const numInRange = (min, max, num) => {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

export default numInRange;
