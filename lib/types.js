const { freeze, seal } = Object;

const freezeSeal = (obj) => freeze(seal(obj));

const node = (langauge, type, children = [], properties = {}, attributes = {}) =>
  freezeSeal({
    langauge,
    type,
    children: freezeSeal(children),
    properties: freezeSeal(properties),
    attributes: freezeSeal(attributes),
  });

const id = ([str]) => {
  const { 0: language, 1: type } = str.split(':');
  return { language, type };
};

const ref = ([property]) => freezeSeal({ type: 'Reference', value: property });

const lit = ([str]) => freezeSeal({ type: 'Literal', value: str });

const trivia = ([str]) => freezeSeal({ type: 'Trivia', value: str });

const esc = (raw, cooked) => freezeSeal({ type: 'Escape', value: { raw, cooked } });

module.exports = { node, id, ref, lit, trivia, esc };
