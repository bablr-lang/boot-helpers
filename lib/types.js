const { freeze, seal } = Object;
const { isArray } = Array;

const freezeSeal = (obj) => freeze(seal(obj));

const node = (langauge, type, children = [], properties = {}, attributes = {}) =>
  freezeSeal({
    langauge,
    type,
    children: freezeSeal(children),
    properties: freezeSeal(properties),
    attributes: freezeSeal(attributes),
  });

const stripArray = (val) => {
  if (isArray(val)) {
    if (val.length > 1) {
      throw new Error();
    }
    return val[0];
  } else {
    return val;
  }
};

const id = (str) => {
  const { 0: language, 1: type } = stripArray(str).split(':');
  return { language, type };
};

const ref = (property) => freezeSeal({ type: 'Reference', value: stripArray(property) });

const lit = (str) => freezeSeal({ type: 'Literal', value: stripArray(str) });

const trivia = (str) => freezeSeal({ type: 'Trivia', value: stripArray(str) });

const esc = (raw, cooked) => freezeSeal({ type: 'Escape', value: { raw, cooked } });

module.exports = { node, id, ref, lit, trivia, esc };
