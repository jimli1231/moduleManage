export const createScene = async ( engine) => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 4,
      10,
      new BABYLON.Vector3(-2, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 1; // Set the light intensity
    const ambientLight = new BABYLON.HemisphericLight(
      "ambientLight",
      new BABYLON.Vector3(0, -1, 0),
      scene
    );
    ambientLight.intensity = 0.7; // Set the ambient light intensity
    // Create factory floor
    const factoryFloor = BABYLON.MeshBuilder.CreatePlane(
      "factoryFloor",
      { width: 10, height: 10 },
      scene
    );
    factoryFloor.rotation.x = Math.PI / 2;
    factoryFloor.position.y = -0.1;
    // Add factory floor texture
    const factoryFloorMaterial = new BABYLON.StandardMaterial(
      "factoryFloorMaterial",
      scene
    );
    factoryFloorMaterial.diffuseTexture = new BABYLON.Texture(
      "./assets/ground.jpg",
      scene
    );
    factoryFloorMaterial.diffuseTexture.uScale = 1;
    factoryFloorMaterial.diffuseTexture.vScale = 1;
    factoryFloor.material = factoryFloorMaterial;
    return scene;
  };
 