const { isArray } = Array;

export const stripPathBraces = (str) => /\[(\w+)\]/.exec(str.trim())?.[1];

export const parsePath = (str) => {
  let parsed;
  if (str.startsWith('[')) {
    parsed = { pathIsArray: true, pathName: stripPathBraces(str) };
  } else {
    parsed = { pathIsArray: false, pathName: str };
  }

  if (!/^\w+$/.test(parsed.pathName)) throw new Error();

  return parsed;
};

export class PathResolver {
  constructor(node) {
    this.node = node;
    this.counters = {};
  }

  get(path) {
    const { node, counters } = this;

    const { pathIsArray, pathName } = parsePath(path);

    let resolved;

    if (pathIsArray) {
      const arr = node.properties[pathName];

      if (!isArray(arr)) throw new Error('bad array value');

      const counter = counters[pathName] ?? 0;

      counters[pathName] = counter + 1;

      resolved = arr[counter];
    } else {
      resolved = node.properties[pathName];
    }

    if (!resolved) throw new Error(`cannot resolve {path: ${path}}`);
    return resolved;
  }
}
