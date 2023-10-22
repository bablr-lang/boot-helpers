const { freeze, seal } = Object;

const freezeSeal = (obj) => freeze(seal(obj));

export const node = (langauge, type, children = [], properties = {}, attributes = {}) =>
  freezeSeal({
    langauge,
    type,
    children: freezeSeal(children),
    properties: freezeSeal(properties),
    attributes: freezeSeal(attributes),
  });

export const id = ([str]) => {
  const { 0: language, 1: type } = str.split(':');
  return { language, type };
};

export const ref = ([property]) => freezeSeal({ type: 'Reference', value: property });

export const gap = ([property]) => freezeSeal({ type: 'Gap', value: property });

export const str = ([str]) => freezeSeal({ type: 'String', value: str });

export const trivia = ([str]) => freezeSeal({ type: 'Trivia', value: str });

export const esc = (raw, cooked) => freezeSeal({ type: 'Escape', value: { raw, cooked } });
