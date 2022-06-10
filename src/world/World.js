import {createScene} from './components/scene.js';
import {createCamera} from './components/camera.js';
import {createCube} from './components/cube.js';
// import {createControls} from './systems/cameraControls.js';

import {Loop} from './systems/Loop.js';
import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js'

let camera, scene, renderer, loop;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        
        // const controls = createControls();

        //init 3d object init
        const cube = createCube(2);
        scene.add(cube);

        //init resizer
        const resizer = new Resizer(container, camera, renderer);
        
        //loop init
        loop = new Loop(camera, scene, renderer);
    }

    start(){
        loop.start();
    }

    stop(){
        loop.stop();
    }
}

export {World};