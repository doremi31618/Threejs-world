import {GltfLoader, FbxLoader } from '../components/modelLoader.js';
import {AnimationMixer, Vector3} from 'three';
import {addFolder, addButton} from './gui.js';
import {Rain} from './Rain.js';
import { blenderWattsToLumens, createAmbintLight, createDirectLights} from '../components/light.js';
import * as POSTPROCESSING from 'postprocessing';

var morakot_model;
var rain;

function initScene(scene, loop, camera, renderer){
    loadModel(scene, loop);
    addRain(scene, loop, camera);
    modifiedLight(scene);
    setShadow(scene);
    // addPostProcessing(renderer, camera, scene);
}

function loadModel(scene, loop) {
    //test : https://cdn.glitch.com/378a8eca-f405-469a-b32e-b603069e5372%2Funtitled.glb?v=1584360698775
    //test : assets/3dmodels/0804.glb
    
    GltfLoader("assets/3dmodels/0805.glb")
        .then((model) => {
            scene.add(model.scene);
            morakot_model = model;

            //add animation controller
            let mixer = new AnimationMixer(model.scene);
            addAnimationControl(model.animations, mixer)
            loop.addMixer(mixer);
        })
        .catch(error => {
            console.log(error);
        })

}
function addRain(scene, loop, camera){
    rain = new Rain(scene, camera);
    loop.on('update', (deltaTime)=>{
        rain.update();
    })
}

function addAnimationControl(animations, mixer){

    let folderName = "animationClips"
    addFolder(folderName);
    animations.forEach(clip => {
        // mixer.clipAction(clip).play(); 
        let action = mixer.clipAction(clip)
        addButton(folderName, clip.name, () => {
            console.log("playAnimation", clip.name);
            action.reset();
            action.fadeIn(1);
            action.play();
        })

    })
    addButton(folderName, "playAll", () => {
        animations.forEach(clip => {
            // mixer.clipAction(clip).play(); 
            let action = mixer.clipAction(clip)
            action.reset();
            action.fadeIn(1);
            action.play();

        })
    })
}


function modifiedLight(scene){

    
    // transferSceneLightToLumens();
    let AmbintLight = createAmbintLight( 0x404040 , 10);
    let DirectionalLight = createDirectLights();
    DirectionalLight.rotation.x = 15;
    DirectionalLight.castShadow = true;
    scene.add(AmbintLight);
    scene.add(DirectionalLight);
    
}

function setShadow(scene){
    scene.traverseVisible((object)=>{
        object.receiveShadow = true;
        object.castShadow  = true;
        
    })
}

function transferSceneLightToLumens(scene){
    //transfer light from watt to lumen
    scene.traverse(child=>{
        if (child.isLight){
            console.log(child)
            child.intensity = blenderWattsToLumens(child.intensity);
        }
    })
}


function addPostProcessing(renderer, camera, scene){
    const bloomEffect = new POSTPROCESSING.BloomEffect({
        blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
        kernelSize: POSTPROCESSING.KernelSize.SMALL,
        useLuminanceFilter: true,
        luminanceThreshold: 0.3,
        luminanceSmoothing: 0.75,

    })
    bloomEffect.blendMode.opacity.value = 1.5;
    const composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    composer.addPass(new POSTPROCESSING.EffectPass(camera, bloomEffect));
}

export{
    initScene
}