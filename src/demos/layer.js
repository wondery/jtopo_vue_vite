import { Stage, Layer, Node, EllipseNode, Link, ImageNode } from '@jtopo/core';
import { Toolbar } from '@jtopo/extensions';

// 可以把频繁刷新的Layer和静态或者不怎么变化的Layer分开

const stage = new Stage('divId');
new Toolbar(stage).show();
stage.showAxis();

// 锁定相机，禁止了拖拽和缩放
stage.camera.lock();

// 背景层
const bgLayer = new Layer(stage);
bgLayer.name = '背景层';
bgLayer.setBackground({
    background: "white url(./assets/img/layer_bg.jpeg) no-repeat",
    backgroundSize: '100% 100%',
});

// 中间层-节点和连线
// 清空背景（透明）
const nodeLayer = new Layer(stage);
nodeLayer.name = '节点层';

// 前景层-带动画
// 清空背景（透明）
const cloudLayer = new Layer(stage);
cloudLayer.name = '前景层';

const cloudNode = new ImageNode();
cloudNode.pointerEnabled = false;
cloudNode.resize(256, 256);
cloudNode.x = -100;
cloudNode.setImage('./assets/img/cloud_layer.png');
cloudLayer.addChild(cloudNode);

function newNode(text, x, y) {
    let node = new EllipseNode(text, x, y, 32, 32);
    node.setStyles({
        fillStyle: 'orange'
    });
    return node;
}

const node1 = newNode('node1', -100, 0);
const node2 = newNode('node2', 100, 0);

const link = new Link(null, node1, node2);
link.setStyles({
    strokeStyle: 'orange',
    lineWidth: 2
});

nodeLayer.addChild(link);
nodeLayer.addChild(node1);
nodeLayer.addChild(node2);

stage.show();

// animation- 单独刷新cloudLayer
let dx = 2;
setInterval(function () {
    cloudNode.x += dx;
    if (cloudNode.left < - stage.width / 2 || cloudNode.right >= stage.width / 2) {
        dx = -dx;
    }
    cloudLayer.update();
}, 1000 / 24);
