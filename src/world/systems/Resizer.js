
//1. setting camera aspect
//2. resetting camera projection matrix
//3. setting renderer & camvas size
//4. (specific mobile) set the pixel ratio to prevent bluring output canvas
class Resizer{
    constructor(container, camera, renderer){
        camera.aspect = container.clientWidth/ container.clientHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}

export {Resizer}