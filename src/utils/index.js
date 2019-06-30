export function uid (prefix = '') {
  return prefix + (new Date()).getTime().toString(16) + Number(Math.random().toString().slice(2)).toString(16);
}
