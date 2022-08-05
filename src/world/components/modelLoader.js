import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

//init loader
const dracoLoader = new DRACOLoader();
dracoLoader
    .setDecoderPath("https://threejs.org/examples/js/libs/draco/")
    .preload();



//loading function
function GltfLoader(filepath, percentageCallback){
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

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

function FbxLoader(filepath, percentageCallback){
    const fbxLoader = new FBXLoader();
    return new Promise((resolve, reject)=>{
        fbxLoader.load(filepath,
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
    GltfLoader,
    FbxLoader
}