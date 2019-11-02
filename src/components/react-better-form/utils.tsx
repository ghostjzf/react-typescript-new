import { isValidElementType } from 'react-is';

export function isValidElement(type) {
  return isValidElementType(type);
}

export function isComponent(type) {
  return isValidElementType(type) && typeof type !== 'string';
}

export function isFunction(arg) {
  return typeof arg === 'function';
}