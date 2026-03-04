import { Stage, Layer, Node, Shape } from '@jtopo/core';
import { LocalFileManager  } from '@jtopo/assets';

const div = document.getElementById('divId');
const stage = new Stage(div);
const layer = new Layer(stage);

stage.inputSystem.addEventListener('dblclick', async ()=>{
   
    const fileManager = await LocalFileManager.open();
    window.handleManager = fileManager;
    let xmls = fileManager.flattenHandleList
    .filter(e => e.entry.kind == 'file' && e.entry.name.endsWith('.xml'));
    
    let first = xmls[0];
    let file = await first.entry.getFile();
    let content = await LocalFileManager.readAsText(file);
    console.log('xml:', content);
    
    const fileName = 'index.json';
    
    await fileManager.createDir("/", "dist");
    fileManager.createFile("/dist", fileName, content);
});