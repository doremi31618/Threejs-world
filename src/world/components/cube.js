import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "https://cdn.skypack.dev/three@0.141.0";

//create geometry & material & mesh
function createCube(_size){
    let size = _size ? _size : 1;
    const geometry = new BoxBufferGeometry(size, size, size);
    const material = new MeshBasicMaterial();
    const cube_mesh = new Mesh(geometry, material);
    return cube_mesh;
}

export {createCube};