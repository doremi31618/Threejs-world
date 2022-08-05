
//1. setting camera aspect
//2. resetting camera projection matrix
//3. setting renderer & camvas size
//4. (specific mobile) set the pixel ratio to prevent bluring output canvas
const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth/ container.clientHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}
class Resizer{
    constructor(container, camera, renderer){
        setSize(container, camera, renderer);
        window.addEventListener('resize', ()=>{
            // console.log('resize');
            setSize(container, camera, renderer);
            this.onResize();
        })
    }
    onResize(){
        
        //re-render scene
    }
}

export {Resizer}