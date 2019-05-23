export function isFunction(arg) {
  return typeof arg === "function";
}

export function getFormItemLaybelClassName(context, labelLayout) {
  return [
    "form-item-label",
    context.layout === "inline"
      ? labelLayout === "block"
        ? "form-item-label-block"
        : "INLINE-form-item-label"
      : labelLayout === "block"
      ? "form-item-label-block"
      : ""
  ].join(" ");
}

export function getFormItemClassName(context, className) {
  return [
    "form-item",
    context.layout === "inline" ? "form-item-inline" : "",
    className
  ].join(" ");
}

export function getFieldClassName(context) {
  return context.layout === "inline" ? "field-inline" : "field-block";
}

export function getErrorMsgClassName(context, labelLayout) {
  return labelLayout === "block" ? "error-msg-block" : "error-msg";
}
