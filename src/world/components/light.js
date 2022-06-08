
import { DirectionalLight } from "https://cdn.skypack.dev/three@0.141.0";

function createDirectLights(){
    const light = new DirectionalLight('white', 8);
    light.position.set(10, 10, 10);
    return light;
}
export {createDirectLights};