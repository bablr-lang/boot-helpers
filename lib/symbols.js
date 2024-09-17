const node = Symbol.for('@bablr/node');
const fragment = Symbol.for('@bablr/fragment');
const gap = Symbol.for('@bablr/gap');

const DoctypeTag = Symbol.for('DoctypeTag');
const OpenNodeTag = Symbol.for('OpenNodeTag');
const CloseNodeTag = Symbol.for('CloseNodeTag');
const ReferenceTag = Symbol.for('ReferenceTag');
const ShiftTag = Symbol.for('ShiftTag');
const GapTag = Symbol.for('GapTag');
const NullTag = Symbol.for('NullTag');
const ArrayTag = Symbol.for('ArrayTag');
const LiteralTag = Symbol.for('LiteralTag');

const Trivia = Symbol.for('Trivia');
const Escape = Symbol.for('Escape');

const EmbeddedNode = Symbol.for('EmbeddedNode');
const EmbeddedTag = Symbol.for('EmbeddedTag');
const EmbeddedExpression = Symbol.for('EmbeddedExpression');

module.exports = {
  node,
  fragment,
  gap,
  DoctypeTag,
  OpenNodeTag,
  CloseNodeTag,
  ReferenceTag,
  ShiftTag,
  GapTag,
  NullTag,
  ArrayTag,
  LiteralTag,
  Trivia,
  Escape,
  EmbeddedNode,
  EmbeddedTag,
  EmbeddedExpression,
};
