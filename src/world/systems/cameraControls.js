import {OrbitControls} from 'https://unpkg.com/three@0.141.0/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);

    return controls;

}


export {createControls};