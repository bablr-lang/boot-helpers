const { isArray } = Array;
const { hasOwn } = Object;

class PathResolver {
  constructor(node) {
    this.node = node;
    this.counters = {};
  }

  get(path) {
    const { node, counters } = this;

    const { isArray: pathIsArray, name } = path;

    if (!hasOwn(node.properties, name)) {
      throw new Error(`cannot resolve {path: ${name}}`);
    }

    let value = node.properties[name];

    if (pathIsArray) {
      if (!isArray(value)) {
        throw new Error(`cannot resolve {path: ${name}}: not an array`);
      }

      const counter = counters[name] ?? 0;

      counters[name] = counter + 1;

      value = value[counter];
    }

    return value;
  }
}

module.exports = { PathResolver };
