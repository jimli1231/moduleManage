import { createScene } from "./scene.js";
import { createDropBehavior } from "./dragBehavior.js";
import { showDialog } from "./dialog.js";
import { handlerProxy } from "./common/utils.js";
import { deleteButtonInit, exportButtonInit } from "./btns.js";
const proxySelectedMesh = new Proxy({ value: null }, handlerProxy);
const proxyCurrentOrders = new Proxy(
  { value: "createMoveBehavior" },
  handlerProxy
);

export const init = async (engine) => {
  const scene = await createScene(engine);
  let deleteButton = deleteButtonInit(scene, proxySelectedMesh);
  let exportButton = exportButtonInit(scene, proxySelectedMesh);
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
      showDialog(async (scale, description, id) => {
        const model = await BABYLON.SceneLoader.AppendAsync(
          "",
          modelPath,
          scene
        );
        model.meshes.forEach((mesh) => {
          if (mesh.name !== "factoryFloor" && mesh.name !== "__root__") {
            // 添加此行以跳过地板
            if (!mesh.ownId) {
              mesh.ownId = id;
              mesh.ownScale = scale;
              mesh.ownPath = modelPath;
            }
            mesh.scaling = new BABYLON.Vector3(
              mesh.ownScale,
              mesh.ownScale,
              mesh.ownScale
            );
            createDropBehavior(mesh, proxyCurrentOrders.value);
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(
              new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => {
                  scene.meshes.forEach((otherMesh) => {
                    if (otherMesh === mesh) {
                      otherMesh.showBoundingBox = true;
                      proxySelectedMesh.value = otherMesh;
                      deleteButton.style.display = "block";
                    } else {
                      otherMesh.showBoundingBox = false;
                    }
                  });
                }
              )
            );
          }
        });
        // model.metadata = { description: description, path: modelPath };
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
