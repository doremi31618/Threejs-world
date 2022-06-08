import {Color, Scene} from 'https://cdn.skypack.dev/three@0.141.0';


//create scene & setting background
function createScene(){
    const scene = new Scene();
    scene.background = new Color('skyblue');
    return scene;
}

export {createScene}