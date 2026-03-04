import { Stage, Layer, Node, ImageNode } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);


stage.setMode('drag');

// 只需创建少量节点（这里16个节点）
// 数据按需加载，有后台配合的话，可以无限滚动

function upateTileNode(node) {
    let level = 12;
    let tileSize = 256; // 瓦片尺寸

    let beginX = 771;
    let beginY = 251;

    node.x = node.tileX * tileSize;
    node.y = node.tileY * tileSize;

    let tileX = beginX + node.tileX;
    let tileY = beginY - node.tileY;


    // 百度的地图瓦片
    let url = 'http://online3.map.bdimg.com/tile/?qt=tile&x=' + tileX + '&y=' + tileY + '&z=' + level + '&styles=pl';
    node.setImage(url, true);
}

// 初始化瓦片图 4x4
let tileNodes = [];

function initTileNodes() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let node = new ImageNode();

            node.tileX = j;
            node.tileY = i;

            layer.addChild(node);
            tileNodes.push(node);
        }
    }
}

// 绘制
function paintTiles() {
    tileNodes.forEach(upateTileNode);
}

// 上下左右滚动
function scroll(dx, dy) {
    tileNodes.forEach(function (node) {
        node.tileX += dx;
        node.tileY += dy;
    });
    paintTiles();
}


// 拖拽加载数据
stage.inputSystem.addEventListener('pointermove', function (e) {
    if(!stage.inputSystem.isPointerDown){
        return;
    }
    
    let minNode = tileNodes[0]; // 左上角
    let maxNode = tileNodes[tileNodes.length - 1]; // 右下角

    let cameraX = stage.camera.offsetX;
    let cameraY = stage.camera.offsetY;

    if (cameraX + minNode.left > -stage.width) {
        scroll(-1, 0);
    } else if (cameraX + maxNode.left < stage.width) {
        scroll(1, 0);
    }

    if (cameraY + minNode.top > -stage.height) {
        scroll(0, -1);
    } else if (cameraY + maxNode.bottom < stage.height) {
        scroll(0, 1);
    }
});

initTileNodes();
paintTiles();

stage.show();