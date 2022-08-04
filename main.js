import {World} from './src/world/World.js';

function main(){
    const container = document.getElementById('three');
    const world = new World(container);
    world.start();
}

main();