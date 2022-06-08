import {createScene} from './components/scene.js';
import {createCamera} from './components/camera.js';
import {createCube} from './components/cube.js';

import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js'

let camera, scene, renderer;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        
        const cube = createCube(2);
        scene.add(cube);

        const resizer = new Resizer(container, camera, renderer);

    }
    render(){
        renderer.render(scene, camera);
    }
}

export {World};