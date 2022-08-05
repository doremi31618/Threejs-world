
import { DirectionalLight, AmbientLight } from 'three';

function createDirectLights(){
    const light = new DirectionalLight('white', 8);
    light.position.set(10, 10, 10);

    return light;
}
function createAmbintLight(color, intensity){
    let light = new AmbientLight( color );
    light.intensity = intensity
    return light
}

function blenderWattsToLumens(watt){
    return (683 * watt) / (4 * Math.PI);
}
export {
    createDirectLights,
    blenderWattsToLumens,
    createAmbintLight
};