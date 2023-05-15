import { createScene } from '../scene.js';

export const initImportPage = async (engine) => {
    const scene = await createScene(engine);
    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });

    const importFileInput = document.getElementById("importFile");
    importFileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const json = e.target.result;
                const modelData = JSON.parse(json);
                let model
                await Promise.all(modelData.map(async (modelDataItem) => {
                    model = await BABYLON.SceneLoader.AppendAsync(
                        "",
                        modelDataItem.path,
                        scene
                    );
                }));
                let filterMeshes = model.meshes.filter((mesh) => {
                    return mesh.name !== "factoryFloor" && mesh.name !== "__root__"
                })
                filterMeshes.forEach((mesh, i) => {
                    mesh.position = new BABYLON.Vector3(modelData[i].position._x,modelData[i].position._y, modelData[i].position._z)
                    mesh.scaling = new BABYLON.Vector3(modelData[i].scaling._x,modelData[i].scaling._y, modelData[i].scaling._z)
                    mesh.rotation = new BABYLON.Vector3(modelData[i].rotation._x,modelData[i].rotation._y, modelData[i].rotation._z)
                })


            };
            reader.readAsText(file);
        }
    });
};