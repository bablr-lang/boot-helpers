const sym = require('./symbols.js');

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

module.exports = { CoveredBy, InjectFrom, Node };
