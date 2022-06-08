import {WebGLRenderer} from 'https://cdn.skypack.dev/three@0.141.0';

//create renderer
function createRenderer(){
    const renderer = new WebGLRenderer({antialias: true});
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export {createRenderer};