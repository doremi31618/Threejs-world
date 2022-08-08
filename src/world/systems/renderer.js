import {WebGLRenderer} from 'three';

//create renderer
function createRenderer(){
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor(0xFFFFFF, 0);
    return renderer;
}

export {createRenderer};