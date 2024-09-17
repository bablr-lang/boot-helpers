const t = require('./types.js');
const { LiteralTag, Escape } = require('./symbols.js');

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

const validateTag = (term) => {
  if (!term || ![LiteralTag, Escape].includes(term.type)) {
    throw new Error('Invalid tag');
  }
};

const interpolateString = (value) => {
  const children = [];
  if (isArray(value)) {
    for (const element of value) {
      validateTag(element);
      children.push(element);
    }
  } else {
    // we can't safely interpolate strings here, though I wish we could
    validateTag(value);
    children.push(value);
  }

  return t.node('String', 'Content', children);
};

module.exports = { spread, interpolateArray, interpolateString };
