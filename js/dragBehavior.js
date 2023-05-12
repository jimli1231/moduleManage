   //拖动方法
   export const createDragBehavior = (model) => {
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