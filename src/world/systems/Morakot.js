import {GltfLoader, FbxLoader } from '../components/modelLoader.js';
import {AnimationMixer, Vector3} from 'three';
import {addFolder, addButton} from './gui.js';
import {Rain} from './Rain.js';
import { blenderWattsToLumens, createAmbintLight, createDirectLights} from '../components/light.js';
// import * as POSTPROCESSING from 'postprocessing';

var morakot_animation_group = new Map();
var morakot_animations = new Map();
var morakot_model;
var rain;
function initScene(scene, loop, camera, renderer){
    return new Promise(async (resolve, reject)=>{
        await loadModel(scene, loop);
        addRain(scene, loop, camera);
        modifiedLight(scene);
        setShadow(scene);
        resolve();
    })
    
    // addPostProcessing(renderer, camera, scene);
}

function loadModel(scene, loop) {
    //test : https://cdn.glitch.com/378a8eca-f405-469a-b32e-b603069e5372%2Funtitled.glb?v=1584360698775
    //test : assets/3dmodels/0804.glb
    return new Promise((resolve, reject)=>{
        GltfLoader("assets/3dmodels/0805.glb")
        .then((model) => {
            scene.add(model.scene);
            morakot_model = model;

            //add animation controller
            let mixer = new AnimationMixer(model.scene);
            addAnimationControl(model.animations, mixer)
            loop.addMixer(mixer);
            resolve();
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    })

}
function addRain(scene, loop, camera){
    rain = new Rain(scene, camera);
    loop.on('update', (deltaTime)=>{
        rain.update();
    })
}

function addAnimationControl(animations, mixer){
    //iterate each animation and saving
    animations.forEach(clip => {
        let name_format = clip.name.split('-');
        if (name_format >= 2 ){
            //create or set group
            let group_name = name_format[0];
            let clip_name = name_format[1];
            if (morakot_animation_group.has(group_name)){
                let group = morakot_animation_group.get(group_name);
                group.animations.push(clip.name);
                return;
            }

            //init group animation
            morakot_animation_group.set(group_name, {
                name: group_name,
                animations: new Array(),
                play: ()=>{
                    let group = morakot_animation_group.get(group_name);
                    group.animations.forEach((clipName)=>{
                        //play all group animation
                        morakot_animations.get(clipName)();
                    })
                }
            })
        }
        
        morakot_animations.set(
            clip.name,
            () => {
                playClip(mixer.clipAction(clip));
            }
        )
    

    })

    //add play all animation
    morakot_animations.set(
        'all', 
        () => {
            animations.forEach(clip => {
                playClip(mixer.clipAction(clip));
            })
        }
    )

    //stop all
    morakot_animations.set(
        'stop_all',
        ()=>{
            animations.forEach(clip => {
                mixer.clipAction(clip).stop();
            })
        }
    )

    // console.log(morakot_animations, morakot_animations.size)
}
function displayUI(){
    //add animation control
    console.log('add display ui', morakot_animations)
    addFolder("Animation Control");
    for(var [key, value] of morakot_animations){
        addButton("Animation Control",key, value)
    }

    //add group animation control
    if (morakot_animation_group.size > 0){
        addFolder("Group Animation Control");
        for(var [key, value] of morakot_animation_group){
            addButton("Group Animation Control",key, value.play)
        }
    }
}

function playClip(action){
    action.reset();
    action.fadeIn(1);
    action.play();
}

function playAnimation(type, name){
    switch (type){
        case "clip":
            if (!morakot_animations.has(name))return {error: "animation clip not exist"};
            morakot_animations.get(name)();
            break;
        case "group":
            if (!morakot_animation_group.has(name))return {error: "animation group not exist"};
            morakot_animation_group.get(name).play();
            break;
        default:
            return {error: "animation type not exist"};
    }
}

function modifiedLight(scene){

    
    // transferSceneLightToLumens();
    let AmbintLight = createAmbintLight( 0x404040 , 10);
    
    let DirectionalLight = createDirectLights();
    // DirectionalLight.rotation.x = 15;

    let DirectionalLight_left = createDirectLights();
    DirectionalLight_left.position.set(-10,10,10)
    // DirectionalLight_left.rotation.y = 270;
    // // DirectionalLight_left.rotation.z = 90;
    // DirectionalLight_left.intensity = 50

    scene.add(AmbintLight);
    scene.add(DirectionalLight);
    scene.add(DirectionalLight_left);
    
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


// function addPostProcessing(renderer, camera, scene){
//     const bloomEffect = new POSTPROCESSING.BloomEffect({
//         blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
//         kernelSize: POSTPROCESSING.KernelSize.SMALL,
//         useLuminanceFilter: true,
//         luminanceThreshold: 0.3,
//         luminanceSmoothing: 0.75,

//     })
//     bloomEffect.blendMode.opacity.value = 1.5;
//     const composer = new POSTPROCESSING.EffectComposer(renderer);
//     composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
//     composer.addPass(new POSTPROCESSING.EffectPass(camera, bloomEffect));
// }

export{
    initScene,
    displayUI,
    playAnimation
}