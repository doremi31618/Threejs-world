import {Color, Scene} from 'three';


//create scene & setting background
function createScene(){
    const scene = new Scene();
    // scene.background = new Color('skyblue');
    return scene;
}

export {createScene}