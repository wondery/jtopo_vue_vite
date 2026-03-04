import {
    Stage, Layer, EllipseNode, Link,
    ForceDirectLayout,
    randomColor,
} from '@jtopo/core';

import { Utils } from './demos/Lib.js'

// --- 斥力布局，未来版本可能会做调整和改进 ---
const stage = new Stage('divId');
const layer = new Layer(stage);

function newNode() {
    const node = new EllipseNode('node:' + (layer.children.length));
    node.x = Utils.rand(-200, 200);
    node.y = Utils.rand(-200, 200);

    node.setStyles({ 'fillStyle': Utils.randomColor() });
    return node;
}

function newLink(nodeA, nodeZ, deep) {
    const link = new Link('', nodeA, nodeZ, 'center', 'center');
    link.setStyles({
        strokeStyle: Utils.randomColor(),
        lineWidth: deep * deep + 1
    });
    layer.addChild(link);
    return link;
}


// 根节点
const rootNode = newNode();
rootNode.setXY(0, 0);
rootNode.resize(70, 70);
rootNode.setStyles({ 'fillStyle': 'pink' });

// 递归生成树形结构的图，节点坐标随机
function createTree(fromNode, deep) {
    if (deep == 0) {
        return;
    }
    const childNum = Utils.rand(3, 4);
    for (let i = 0; i < childNum; i++) {
        const toNode = newNode();
        toNode.resize(deep * 20, deep * 20);
        newLink(fromNode, toNode, deep);
        createTree(toNode, deep - 1);
        layer.addChild(toNode);
    }
}
createTree(rootNode, 3);

// 从根节点应用布局
const layout = new ForceDirectLayout(rootNode, stage.width, stage.height);

// 每帧渲染前, since: 2.4.0
layer.beforeRender = function () {
    // 斥力布局需要多次调用doLayout迭代
    // 还有一些参数可以调节，本例为了保持简单暂略去
    layout.doLayout();
};


// 循环渲染
let animationId = null;
function loopRender() {
    layer.update();
    animationId = requestAnimationFrame(loopRender);
}
loopRender();

// 20秒后画面停止循环渲染
setTimeout(() => {
    cancelAnimationFrame(animationId);
    layer.beforeRender = undefined; // 停止布局计算
}, 20000);

stage.show();