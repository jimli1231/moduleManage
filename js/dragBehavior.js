//拖动方法
const createMoveBehavior = (model) => {
  const pointerDragBehavior = new BABYLON.PointerDragBehavior({
    dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
  });
  pointerDragBehavior.useObjectOrienationForDragging = false;
  pointerDragBehavior.moveAttached = true;
  pointerDragBehavior.onDragObservable.add((event) => {
    model.position.addInPlace(event.delta);
  });
  model.addBehavior(pointerDragBehavior);
};

//旋转方法
const createRotateBehavior = (model) => {
  const pointerDragBehavior = new BABYLON.PointerDragBehavior({
    dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
  });
  let angel = 0;
  pointerDragBehavior.useObjectOrienationForDragging = false;
  pointerDragBehavior.moveAttached = false; // 修改为 false，禁用自动移动
  pointerDragBehavior.onDragObservable.add((event) => {
    // 计算鼠标拖拽距离的旋转角度（以弧度为单位）

    const rotationAngle = event.delta.x * 10; // 你可以根据需要调整除以的数值，以改变旋转速度
    angel = angel + rotationAngle;
    // 创建一个以模型为中心的旋转矩阵
    model.rotation = new BABYLON.Vector3(0, angel, 0);
  });
  model.addBehavior(pointerDragBehavior);
};
//缩放方法
const createScaleBehavior = (model) => {
  const pointerDragBehavior = new BABYLON.PointerDragBehavior({
    dragPlaneNormal: new BABYLON.Vector3(0, 1, 0),
  });
  let Scale = 0;
  pointerDragBehavior.useObjectOrienationForDragging = false;
  pointerDragBehavior.moveAttached = false; // 修改为 false，禁用自动移动
  pointerDragBehavior.onDragObservable.add((event) => {
    // 计算鼠标拖拽距离的旋转角度（以弧度为单位）

    const value = event.delta.x  // 你可以根据需要调整除以的数值，以改变旋转速度
    Scale = Scale + value;
    if (Scale <= 0) Scale = 0
    model.scaling = new BABYLON.Vector3(Scale, Scale, Scale);
  });
  model.addBehavior(pointerDragBehavior);
};
export const createDropBehavior = (model, type) => {
  model.behaviors.forEach((behavior) => {
    model.removeBehavior(behavior);
  });
  if (type == 'createMoveBehavior') {
    createMoveBehavior(model);
  } else if (type == 'createRotateBehavior') {
    createRotateBehavior(model);
  } else if (type == 'createScaleBehavior') {
    createScaleBehavior(model);
  }


};
