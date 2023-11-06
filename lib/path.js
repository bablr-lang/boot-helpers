const { isArray } = Array;
const { hasOwn } = Object;

const stripPathBraces = (str) => /\[(\w+)\]/.exec(str.trim())?.[1];

const parsePath = (str) => {
  let parsed;
  if (str.startsWith('[')) {
    parsed = { pathIsArray: true, pathName: stripPathBraces(str) };
  } else {
    parsed = { pathIsArray: false, pathName: str };
  }

  if (!/^\w+$/.test(parsed.pathName)) throw new Error();

  return parsed;
};

class PathResolver {
  constructor(node) {
    this.node = node;
    this.counters = {};
  }

  get(path) {
    const { node, counters } = this;

    if (!hasOwn(node.properties, path)) {
      throw new Error(`cannot resolve {path: ${path}}`);
    }

    let value = node.properties[path];

    if (isArray(value)) {
      const counter = counters[path] ?? 0;

      counters[path] = counter + 1;

      value = value[counter];
    }

    return value;
  }
}

module.exports = { stripPathBraces, parsePath, PathResolver };
