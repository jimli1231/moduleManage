import { createScene } from './scene.js';
import { createDragBehavior } from './dragBehavior.js';
import { showDialog } from './dialog.js';
export const init = async (engine) => {
    const scene = await createScene(engine);
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
        showDialog(async (scale, description) => {
          const model = await BABYLON.SceneLoader.AppendAsync(
            "",
            modelPath,
            scene
          );
          model.meshes.forEach((mesh) => {
            console.log(mesh.name);
            mesh.scaling = new BABYLON.Vector3(scale, scale, scale);
          });
          model.metadata = { description: description };
          model.meshes.forEach((mesh) => {
            if (mesh.name !== "factoryFloor") {
              // 添加此行以跳过地板
              createDragBehavior(mesh); // Apply drag behavior to each mesh
              mesh.actionManager = new BABYLON.ActionManager(scene);
              mesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPickTrigger,
                  () => {
                    scene.meshes.forEach((otherMesh) => {
                      if (otherMesh === mesh) {
                        otherMesh.showBoundingBox = true;
                        selectedMesh = otherMesh;
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