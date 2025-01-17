// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidParam(param: any): param is [string, string] {
  const [, value] = param;
  return typeof value === "string" && value.length > 0;
}
/*
  Do not use URLSearchParams.

  URLSearchParams turns spaces into '+':
      https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#examples

  Some email clients on mobile apps will render the '+' and not properly replace it with spaces.

  For the 'mailto' protocol, spaces should be percent encoded according to the spec:
      https://datatracker.ietf.org/doc/html/rfc6068#ref-STD66
*/
export function percentEncodeParams(params: {
  body?: string;
  subject?: string;
}): string {
  return Object.entries(params)
    .filter(isValidParam)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}
