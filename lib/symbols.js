const BOF = Symbol.for('@bablr/beginning-of-file');
const EOF = Symbol.for('@bablr/end-of-file');

const File = Symbol.for('@bablr/file');

const Gap = Symbol.for('@bablr/gap');

const disambiguate = Symbol.for('@bablr/disambiguate');
const match = Symbol.for('@bablr/match');

const none = Symbol.for('@bablr/none');
const eat = Symbol.for('@bablr/eat');
const fail = Symbol.for('@bablr/fail');

const startNode = Symbol.for('@bablr/start-node');
const endNode = Symbol.for('@bablr/end-node');

const EndNode = endNode;
const StartNode = startNode;

const node = Symbol.for('@bablr/node');
const token = Symbol.for('@bablr/token');

const active = Symbol.for('@bablr/active');
const suspended = Symbol.for('@bablr/suspended');
const accepted = Symbol.for('@bablr/accepted');
const rejected = Symbol.for('@bablr/rejected');

module.exports = {
  BOF,
  EOF,
  File,
  Gap,
  disambiguate,
  match,
  none,
  eat,
  fail,
  startNode,
  endNode,
  EndNode,
  StartNode,
  node,
  token,
  active,
  suspended,
  accepted,
  rejected,
};
