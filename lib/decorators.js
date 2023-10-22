const { Any } = require('./productions.generated.js');
const { node } = require('./types.js');
const sym = require('./symbols.js');

const Cover = (desc, context) => {
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

const CoveredBy = (type) => (desc, context) => {
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

const InjectFrom = (obj) => (_stub, context) => {
  return obj[context.name];
};

const Node = (desc, context) => {
  return CoveredBy(sym.node)(desc, context);
};

module.exports = { Cover, CoveredBy, InjectFrom, Node };
