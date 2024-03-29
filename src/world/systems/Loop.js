import {Clock} from 'three';

class Loop{
	constructor(camera, scene, renderer){
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
	}
	start(){
		this.renderer.setAnimationLoop(()=>{
			this.animate();
		});
	}
    animate(){
        // handle render frame
        this.renderer.render(this.scene, this.camera);
    }
	stop(){
		this.renderer.setAnimationLoop(null);
	}
}

export {Loop}