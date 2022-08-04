
function getView(){
    let krpanoSWFObject  = document.getElementById("krpanoSWFObject");
    let krpano = krpanoSWFObject.get("global");
    return krpano.view;
}

export {
    getView,
}