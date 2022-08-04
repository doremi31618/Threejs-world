import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.141.0/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'https://cdn.skypack.dev/three@0.141.0/examples/jsm/loaders/DRACOLoader';

//init loader
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader
    .setDecoderPath("https://threejs.org/examples/js/libs/draco/")
    .preload();
gltfLoader.setDRACOLoader(dracoLoader);


//loading function
function loadGltfModel(filepath, percentageCallback){
    return new Promise((resolve, reject)=>{
        gltfLoader.load(filepath,
        //when loading complete
        function (gltf){
            resolve(gltf);
        }, (xhr)=>{
            if (!percentageCallback)return;
            percentageCallback(xhr)
        },

        //error callback
        function (error){
            reject(error);
        })
    }) 
}

export {
    loadGltfModel
}