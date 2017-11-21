export default (obj) => (func) => Object.keys(obj).map((key) => func(obj[key], key));
