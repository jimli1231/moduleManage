export const commonBtnInit = (scene, selectedMesh, proxyCurrentOrders, callback) => {
    exportButtonInit(scene, selectedMesh)
    moveButtonInit(scene, selectedMesh, proxyCurrentOrders, callback)
    rotateButtonInit(scene, selectedMesh, proxyCurrentOrders, callback)
    scaleButtonInit(scene, selectedMesh, proxyCurrentOrders, callback)
}

export const deleteButtonInit = (scene, selectedMesh) => {
    let deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", () => {
        if (selectedMesh.value) {
            selectedMesh.value.dispose();
            selectedMesh.value = null;
            deleteButton.style.display = "none";
        }
    });
    return deleteButton
}
const moveButtonInit = (scene, selectedMesh, proxyCurrentOrders, callback) => {
    let btn = document.getElementById("moveButton");
    btn.addEventListener("click", () => {
        proxyCurrentOrders.value = 'createMoveBehavior'
        callback()
    });
    return btn
}
const rotateButtonInit = (scene, selectedMesh, proxyCurrentOrders, callback) => {
    let btn = document.getElementById("rotateButton");
    btn.addEventListener("click", () => {
        proxyCurrentOrders.value = 'createRotateBehavior'
        callback()
    });
    return btn
}
const scaleButtonInit = (scene, selectedMesh, proxyCurrentOrders, callback) => {
    let btn = document.getElementById("scaleButton");
    btn.addEventListener("click", () => {
        proxyCurrentOrders.value = 'createScaleBehavior'
        callback()
    });
    return btn
}


const exportButtonInit = (scene, selectedMesh) => {
    let btn = document.getElementById("exportButton");
    exportButton.addEventListener("click", () => {
        const models = [];
        for (const mesh of scene.meshes) {
            if (mesh.name !== "factoryFloor" && mesh.name !== "__root__") {
                models.push({
                    name: mesh.ownId,
                    position: mesh.position,
                    scaling: mesh.scaling,
                    rotation: mesh.rotation,
                    path: mesh.ownPath,
                });
            }

        }

        const json = JSON.stringify(models, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "models.json";
        link.click();

        URL.revokeObjectURL(url);
    });
    return btn
}

