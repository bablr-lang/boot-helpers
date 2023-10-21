import { Any } from './productions.generated.js';
import { node } from './types.js';
import * as sym from './symbols.js';

export const Cover = (desc, context) => {
  return function (...args) {
    if (!this.covers.has(context.name)) {
      throw new Error('@Cover must cover something!');
    }
    const coveredTypes = this.covers.get(context.name);
    return Any(
      { ...args[0], props: { matchables: [...coveredTypes.map((type) => node(type))] } },
      ...args.slice(1),
    );
  };
};

export const CoveredBy = (type) => (desc, context) => {
  context.addInitializer(function () {
    let covers = this.covers;

    if (!covers) {
      covers = this.covers = new Map();
    }

    let coveredTypes = covers.get(type);

    if (!coveredTypes) {
      coveredTypes = new Set();
      covers.set(type, coveredTypes);
    }

    coveredTypes.add(context.name);
  });
};

export const InjectFrom = (obj) => (_stub, context) => {
  return obj[context.name];
};

export const Node = (desc, context) => {
  return CoveredBy(sym.node)(desc, context);
};
