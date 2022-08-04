
import { DirectionalLight } from 'three';

function createDirectLights(){
    const light = new DirectionalLight('white', 8);
    light.position.set(10, 10, 10);
    return light;
}
export {createDirectLights};