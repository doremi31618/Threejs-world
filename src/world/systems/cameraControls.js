import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {MathUtils} from 'three';

function createControls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    controls.minDistance = 5;
    controls.minPolarAngle = MathUtils.degToRad(70);
    controls.maxPolarAngle = MathUtils.degToRad(90);

    controls.minAzimuthAngle = MathUtils.degToRad(270);
    controls.maxAzimuthAngle = MathUtils.degToRad(90);
    return controls;

}


export {createControls};