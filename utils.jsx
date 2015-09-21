import _ from 'underscore';

export var translate = (x, y) => "translate(" + x + "," + y + ") ";
export var scale = (s) => "scale(" + s + ") ";

export var clamp = (x, min, max) => Math.max(min, Math.min(max, x));

export function exactlyOneOf(...args) {
  return _.reject(args, _.isUndefined).length == 1;
}

export function noneOf(...args) {
  return _.every(args.map(_.isUndefined));
}
