const { isArray } = Array;
const { hasOwn } = Object;

class PathResolver {
  constructor(node) {
    this.node = node;
    this.counters = {};
  }

  get(path) {
    const { node, counters } = this;

    const { pathIsArray, pathName } = path;

    if (!hasOwn(node.properties, pathName)) {
      throw new Error(`cannot resolve {path: ${pathName}}`);
    }

    let value = node.properties[pathName];

    if (pathIsArray) {
      if (!isArray(value)) {
        throw new Error(`cannot resolve {path: ${pathName}}: not an array`);
      }

      const counter = counters[pathName] ?? 0;

      counters[pathName] = counter + 1;

      value = value[counter];
    }

    return value;
  }
}

module.exports = { PathResolver };
