import {World} from './world/World.js';

function main(){
    const container = document.getElementById('three');
    const world = new World(container);
    world.start();
}

main();