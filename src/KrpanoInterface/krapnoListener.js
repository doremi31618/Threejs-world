
function createListener(krpanoEvens){

    //handle event listener
    krpanoEvens.on("onMouseDown", onMouseDown(data));
    krpanoEvens.on("onMouseUp", onMouseUp(data));
    krpanoEvens.on("onControlStateChange", onControlStateChange(data));
    krpanoEvens.on("onMouseWheel", onMouseWheel(data));
    krpanoEvens.on("onResize", onResize(data));

    return krpanoEvens;
}

function onMouseDown(){

}

function onMouseDrag(){

}

function onMouseUp(){

}

function onControlStateChange(){

}

function onMouseWheel(){

}

function onResize(){

}