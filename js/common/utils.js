

export const generateUUID = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
export const handlerProxy = {
  get: function (target, prop) {
    return target[prop];
  },
  set: function (target, prop, value) {
    target[prop] = value;
    return true;
  },
};

