import {createScene} from './components/scene.js';
import {createCamera} from './components/camera.js';
import {createControls} from './systems/cameraControls.js';
import {createDirectLights} from './components/light.js';
import {Loop} from './systems/Loop.js';
import {createRenderer} from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js'
import * as Morakot from './systems/Morakot.js';
import {addFolder, addButton, hideAll, displayAll} from './systems/gui.js'
import {createCube} from './components/cube.js';
let camera, scene, renderer, loop, light, controls,rain;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        // light = createDirectLights();
        this.container = container;
        this.container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);

        //loop init
        loop = new Loop(camera, scene, renderer);
        
        
        //init 3d object init
        // scene.add(light);
        // scene.add(createCube(1));
        Morakot.initScene(scene, loop, camera, renderer).then(()=>{
            this.displayUI();
        });

        //init resizer
        const resizer = new Resizer(container, camera, renderer);
        
        
        
    }



    start(){
        loop.start();
        this.container.style.display = "block";
    }

    stop(){
        loop.stop();
        this.container.style.display = "none";
    }
    playAnimation(type, name){
        let errorMessage = Morak.playAnimation(type, name);
        if (errorMessage.error){
            throw new Error(errorMessage.error);
        }
    }
    displayUI(){
        this._initUI();
        Morakot.displayUI();
        displayAll();
    }
    hideUI(){
        hideAll();
    }

    _initUI(){
        addFolder("ThreeJs");
        addButton("ThreeJs", "start", ()=>{
            this.start();
        });

        addButton("ThreeJs", "stop", ()=>{
            this.stop();
        });
        addButton("ThreeJs", "three", ()=>{
            console.log(scene);
        });
    }

    
}

export {World};