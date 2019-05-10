export function isFunction(arg) {
  return typeof arg === "function";
}

export function getFieldClassName(context) {
  return context.layout === "inline" ? "field-inline" : "field-block";
}
