import * as _t from "@bablr/boot-helpers/types";
function* List({
  props: {
    element,
    separator,
    allowHoles = false,
    allowTrailingSeparator = true
  }
}) {
  let sep, it;
  for (;;) {
    it = yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: element,
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
    if (it || allowTrailingSeparator) {
      sep = yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
        verb: _t.node("Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Punctuator", [_t.str`(`], {}),
        argument: separator,
        close: _t.node("Punctuator", [_t.str`)`], {})
      });
    }
    if (!(sep || allowHoles)) break;
  }
}
function* Any({
  props: {
    matchers
  }
}) {
  for (const matcher of matchers) {
    if (yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: matcher,
      close: _t.node("Punctuator", [_t.str`)`], {})
    })) break;
  }
}
function* All({
  props: {
    matchers
  }
}) {
  for (const matcher of matchers) {
    yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Identifier", [_t.str`eat`], {}),
      open: _t.node("Punctuator", [_t.str`(`], {}),
      argument: matcher,
      close: _t.node("Punctuator", [_t.str`)`], {})
    });
  }
}
function* Optional({
  props: {
    matchers
  }
}) {
  if (matchers.length > 1) {
    throw new Error('Optional only allows one matcher');
  }
  yield _t.node("Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
    verb: _t.node("Identifier", [_t.str`eatMatch`], {}),
    open: _t.node("Punctuator", [_t.str`(`], {}),
    argument: matchers[0],
    close: _t.node("Punctuator", [_t.str`)`], {})
  });
}
module.exports = {
  List,
  Any,
  All,
  Optional
};
