const { isArray } = Array;
const { hasOwn } = Object;

const stripPathBraces = (str) => (str.endsWith('[]') ? str.slice(0, -2) : str);

const parsePath = (str) => {
  const pathName = stripPathBraces(str);

  if (!/^\w+$/.test(pathName)) throw new Error();

  return { pathIsArray: pathName !== str, pathName };
};

class PathResolver {
  constructor(node) {
    this.node = node;
    this.counters = {};
  }

  get(path) {
    const { node, counters } = this;

    const { pathIsArray, pathName } = parsePath(path);

    if (!hasOwn(node.properties, pathName)) {
      throw new Error(`cannot resolve {path: ${path}}`);
    }

    let value = node.properties[pathName];

    if (pathIsArray) {
      if (!isArray(value)) {
        throw new Error(`cannot resolve {path: ${path}}: not an array`);
      }

      const counter = counters[pathName] ?? 0;

      counters[pathName] = counter + 1;

      value = value[counter];
    }

    return value;
  }
}

module.exports = { stripPathBraces, parsePath, PathResolver };
