import {
    PointLight,
    BufferGeometry,
    Vector3,
    TextureLoader,
    PlaneBufferGeometry,
    MeshLambertMaterial,
    Mesh,
    PointsMaterial,
    Points,
    BufferAttribute,
    Object3D,
    MultiplyBlending,
    AdditiveBlending,
    CustomBlending,
    AddEquation,
    SrcAlphaFactor,
    OneMinusSrcAlphaFactor,
    
} from 'three';
class Rain {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.rainCount = 5000;
        this.cloudParticles = [];
        this.rainVelocity = [];
        this.init();

    }
    _initFlashLight() {
        // Point Light
        this.flash = new PointLight(0x062d89, 30, 5, 1.7);
        this.flash.position.set(2, 5, 1);
        this.scene.add(this.flash);

        this.flash1 = new PointLight(0x062d89, 30, 5, 1.7);
        this.flash1.position.set(-2, 5, 3);
        this.scene.add(this.flash1);

        this.flash2 = new PointLight(0x062d89, 30, 5, 1.7);
        this.flash2.position.set(0, 5, -2);
        this.scene.add(this.flash2);
    }
    _initRainDrop() {

        // Rain Drop Texture
        let rainGeo = new BufferGeometry();
        let rainDrops = [];
        for (let i = 0; i < this.rainCount; i++) {
            let rainDrop = new Vector3(
                Math.random() * 5 ,
                Math.random() * 5,
                Math.random() * 4.5
            )
            this.rainVelocity.push(0);
            rainDrops.push(rainDrop);

        }
        rainGeo.setFromPoints(rainDrops);

        let rainMaterial = new PointsMaterial({
            color: 0xaaaaaa,
            size: 0.05,
            transparent: true
        })

        let rain = new Points(rainGeo, rainMaterial);
        rain.position.set(-2.5,5.1,-1.6);
        rain.renderOrder = 1;
        // rain.rotation.set(0,0,0.735)
        // rain.rotation.set(0);

        this.rainMaterial = rainMaterial;
        this.rain = rain;
        this.rainGeo = rainGeo;
        this.scene.add(rain);
    }

    _initCloud() {
        // Smoke Texture Loader
        let loader = new TextureLoader();
        loader.load("https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png",  (texture) => {
            // console.log("cloud",this)
            
            // let cloudGeo = new PlaneBufferGeometry(3, 3);
            let cloudMaterial = new MeshLambertMaterial({
                map: texture,
                transparent: true,
                blending: CustomBlending,
                blendEquation: AddEquation,
                blendSrc: SrcAlphaFactor,
                blendDst: OneMinusSrcAlphaFactor,
                depthTest: false
            });
            // cloudMaterial.blending = AdditiveBlending;//MultiplyBlending/AdditiveBlending
            // cloudMaterial.blendSrc = OneMinusSrcAlphaFactor;
            for (let p = 0; p < 50; p++) {
                let randomScale = Math.random() * 5;
                let cloudGeo = new PlaneBufferGeometry(randomScale, randomScale);
                let cloud = new Mesh(cloudGeo, cloudMaterial);
                let cloudEntry = new Object3D();
                cloudEntry.position.y = 5;
            
                cloud.position.set(
                    Math.random() * 5 - 3,
                    Math.random() * 2 - 1,
                    Math.random() * 2 + 1
                );
                cloud.rotation.x =  -1.16;
                cloud.rotation.y = -0.12;
                cloud.rotation.z = Math.random() * 2 * Math.PI;
                cloud.material.opacity =0.18;
                cloud.renderOrder = 0;
                // cloud.life = 5;
                cloudEntry.add(cloud);
                this.cloudParticles.push(cloudEntry);
                this.scene.add(cloudEntry);
                
            }
            
        });

    }
    _updateRain() {
        // RainDrop Animation
        const positions = this.rainGeo.attributes.position.array;
        for(let i=0; i<this.rainCount; i++){
            let index = i*3;
            let velocity = this.rainVelocity[i]- Math.random()*0.2;//
            let new_y = positions[index+1] + velocity;
            positions[index+1] = new_y;
            if (new_y < -5){
                this.rainVelocity[i] = 0;
                positions[index+1] = 0;
            }
        }
        this.rainGeo.setAttribute('position', new BufferAttribute(positions, 3));
        this.rainGeo.verticesNeedUpdate = true;
        // this.rain.rotation.y += 0.002;
    }
    _updateCloud() {
        this.cloudParticles.forEach(p => {
            let camPos = this.camera.position;
            p.lookAt(camPos);
            p.children[0].rotation.z -= 0.002;
        })

    }
    _updateFalsh() {
        if (Math.random() > 0.96 || this.flash.power > 100) {
            if (this.flash.power < 100) {
                this.flash.position.set(
                    Math.random() ,
                    3 + Math.random() * 2,
                    Math.random() * 4
                );
            }
            this.flash.power = 50 + Math.random() * 500;
        }
        if (Math.random() > 0.96 || this.flash.power > 100) {
            if (this.flash.power < 100) {
                this.flash.position.set(
                    Math.random() ,
                    3 + Math.random() * 2,
                    Math.random() * 4
                );
            }
            this.flash1.power = 50 + Math.random() * 500;
        }
        if (Math.random() > 0.96 || this.flash.power > 100) {
            if (this.flash.power < 100) {
                this.flash.position.set(
                    Math.random() ,
                    3 + Math.random() * 2,
                    Math.random() * 4
                );
            }
            this.flash2.power = 50 + Math.random() * 500;
        }
    }
    init(){
        this._initFlashLight();
        this._initCloud();
        this._initRainDrop();
    }
    update(){
        this._updateRain();
        this._updateCloud();
        this._updateFalsh();
    }
}

export{
    Rain
}