import {OrbitControls} from 'https://cdn.skypack.dev/three@0.141.0/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);

    return controls;

}

function create360Control(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    camera.target.z = camera.position.z - 0.01;
    return controls;
}

export {createControls};