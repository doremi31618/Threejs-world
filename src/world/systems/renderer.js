import {WebGLRenderer} from 'three';

//create renderer
function createRenderer(){
    const renderer = new WebGLRenderer({antialias: true, alpha: true});
    // renderer.setClearColor(0xffffff, 0);
    renderer.physicallyCorrectLights = true;
   
    return renderer;
}

export {createRenderer};