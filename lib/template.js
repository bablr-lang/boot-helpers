const t = require('./types.js');

const { isArray } = Array;

const spreads = new WeakMap();

const spread = (arg) => {
  const wrapper = { value: arg };
  spreads.set(wrapper, true);
  return wrapper;
};

const interpolateArray = (...values) => {
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

const validateTerminal = (term) => {
  if (!term || !['Literal', 'Escape'].includes(term.type)) {
    throw new Error('Invalid terminal');
  }
};

const interpolateString = (value) => {
  const children = [];
  if (isArray(value)) {
    for (const element of value) {
      validateTerminal(element);
      if (element?.type === 'Literal' || element.type === 'Escape') {
        children.push(element);
      } else {
        throw new Error('Invalid value interpolated as content');
      }
    }
  } else {
    // we can't safely interpolate strings here, though I wish we could
    validateTerminal(value);
    children.push(value);
  }

  return t.node('String', 'Content', children);
};

module.exports = { spread, interpolateArray, interpolateString };
