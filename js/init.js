import { createScene } from "./scene.js";
import { createDropBehavior,creatBaseBehavior } from "./behavior.js";
import { showDialog } from "./dialog.js";
import { handlerProxy } from "./common/utils.js";
import { commonBtnInit, deleteButtonInit } from "./btns.js";
const proxySelectedMesh = new Proxy({ value: null }, handlerProxy);
let scene
const proxyCurrentOrders = new Proxy(
  { value: "createMoveBehavior" },
  handlerProxy
);
const proxyModel = new Proxy(
  { value: null },
  handlerProxy
);

export const init = async (engine) => {
  scene = await createScene(engine);
  commonBtnInit(scene, proxySelectedMesh, proxyCurrentOrders, (e) => reloadModule())
  let deleteButton = deleteButtonInit(scene, proxySelectedMesh);
  engine.runRenderLoop(() => {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });

  const modelPanel = document.getElementById("modelPanel");
  const modelItems = modelPanel.querySelectorAll(".modelItem");
  modelItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.dataset.path);
      e.dataTransfer.effectAllowed = "copy";
    });
  });

  canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  canvas.addEventListener("drop", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modelPath = e.dataTransfer.getData("text");
    if (modelPath) {
      showDialog(async (metaData, id) => {
        proxyModel.value = await BABYLON.SceneLoader.AppendAsync(
          "",
          modelPath,
          scene
        );
        reloadModule(id, modelPath,metaData)
          console.log(metaData);
        const animationGroups = scene.animationGroups;
        if (animationGroups.length > 0) {
          animationGroups[0].start(true); // Play the first animation group
        } else {
          console.log("未找到动画");
        }
      });
    }
  });
};
const reloadModule = (id, modelPath,metaData) => {
  if (proxyModel.value) {
    proxyModel.value.meshes.forEach((mesh) => {
      if (mesh.name !== "factoryFloor" && mesh.name !== "__root__") {
        // 添加此行以跳过地板
        if (!mesh.ownId && id) {
          mesh.ownId = id;
          mesh.ownPath = modelPath;
        }
        createDropBehavior(mesh, proxyCurrentOrders.value);
        creatBaseBehavior(mesh,scene, proxySelectedMesh.value ,metaData)
      }
    });
  } else {
    console.log('please select this module');
  }

}


