import { PerspectiveCamera } from "https://cdn.skypack.dev/three@0.141.0";

let fov = 35;
let aspect = 1;
let near = 0.1;
let far = 100;

//setting attributes of camera & setting position
function createCamera(){
    const camera = new PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    );
    camera.position.set(0,0,10);
    return camera;
}

export {createCamera};