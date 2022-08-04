import {WebGLRenderer} from 'three';

//create renderer
function createRenderer(){
    const renderer = new WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export {createRenderer};