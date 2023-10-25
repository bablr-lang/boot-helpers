const spreads = new WeakMap();

export const interpolateArray = (...values) => {
  const arr = [];
  for (const value of values) {
    if (spreads.has(value)) {
      arr.push(...value.value);
    } else {
      arr.push(value);
    }
  }
  return arr;
};

export const spread = (arg) => {
  const wrapper = { value: arg };
  spreads.set(wrapper, true);
  return wrapper;
};
