import {GUI} from '../../lib/dat.gui.module.js';

var gui = new GUI();
let folders = new Map();
let events = {};

var container = document.querySelector('#dat_gui');
container.appendChild(gui.domElement);


function addFolder(folderName){
    let new_folder = gui.addFolder(folderName);
    folders.set(folderName, new_folder);
}

function addButton(folderName, buttonName,callback){
    let folder = (folderName == '' || !folders.has(folderName)) ? gui : folders.get(folderName);
    // events.set(buttonName, callback);
    events[buttonName] = callback;
    folder.add(events, buttonName);
}
function hideAll(){
    gui.closed = true;
    container.style.display = "none";
}
function displayAll(){
    gui.closed = false;
    container.style.display = "block";
}

export {
    addFolder,
    addButton,
    hideAll,
    displayAll
}