import {Clock} from 'three';
import {EventEmitter} from '../../lib/EventEmitter.js';
class Loop extends EventEmitter{
	constructor(camera, scene, renderer){
		super();
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.clock = new Clock();
	}
	start(){
		this.renderer.setAnimationLoop(()=>{
			this.animate();
		});
	}
    animate(){
        // handle render frame
        this.renderer.render(this.scene, this.camera);
		let deltaTime = this.clock.getDelta()
		if (this.mixer) this.mixer.update(deltaTime)
		this.emit('update', {deltaTime});
    }
	stop(){
		this.renderer.setAnimationLoop(null);
	}
	addMixer(mixer){
		this.mixer = mixer
	}
}

export {Loop}