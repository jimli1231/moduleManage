

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

export const validateForm = (title, description) => {
  if (title.trim() === "") {
    alert("请输入模型标题");
    return false; // 阻止表单提交
  } else {
    return true
  }
}

