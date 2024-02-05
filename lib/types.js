const { freeze, seal } = Object;
const { isArray } = Array;

const freezeSeal = (obj) => freeze(seal(obj));

const node = (flags, language, type, children = [], properties = {}, attributes = {}) =>
  freezeSeal({
    flags,
    language,
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

const ref = (path) => {
  if (isArray(path)) {
    const pathIsArray = path[0].endsWith('[]');
    const pathName = pathIsArray ? path[0].slice(0, -2) : path[0];
    return freezeSeal({ type: 'Reference', value: freezeSeal({ pathName, pathIsArray }) });
  } else {
    const { pathName, pathIsArray } = path;
    return freezeSeal({ type: 'Reference', value: freezeSeal({ pathName, pathIsArray }) });
  }
};

const gap = () => freezeSeal({ type: 'Gap', value: undefined });

const lit = (str) => freezeSeal({ type: 'Literal', value: stripArray(str) });

const trivia = (str) => freezeSeal({ type: 'Trivia', value: stripArray(str) });

const esc = (raw, cooked) => freezeSeal({ type: 'Escape', value: { raw, cooked } });

module.exports = { node, id, ref, gap, lit, trivia, esc };
