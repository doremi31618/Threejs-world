import {createScene} from './components/scene.js';
import {createCamera} from './components/camera.js';
import {createCube} from './components/cube.js';
import {loadGltfModel } from './components/modelLoader.js';
import {createControls} from './systems/cameraControls.js';
import {createDirectLights} from './components/light.js';
import {Loop} from './systems/Loop.js';
import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js'

let camera, scene, renderer, loop, light, controls;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        light = createDirectLights();
        container.append(renderer.domElement);
        
        
        controls = createControls(camera, renderer.domElement);

        //init 3d object init
        scene.add(light);
        scene.add(createCube(1));
        // this.loadMorakotModel();
        
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