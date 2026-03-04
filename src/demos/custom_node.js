import { EllipseNode, Layer, Link, Node, ShapeBuilder, Stage } from '@jtopo/core';

import { RipplingNode } from '@jtopo/extensions';

// 这里演示用简单节点组合为复杂节点
const stage = new Stage('divId');
const layer = new Layer(stage);

layer.useDarkGridBackground();
stage.styleSystem.setTheme('DefaultDark');

stage.styleSystem.defClass('.glass', {
    lineWidth: 1,
    border: '1px white',
    strokeStyle: 'gray',
    padding: 5,
    borderRadius: 5,
    fontSize: '16px',
    textBaseline: 'middle',
    textPosition: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
});

stage.styleSystem.defClass('.endpoint', {
    fillStyle: 'gray',
    textPosition: 'center',
    textBaseline: 'middle',
    font: 'normal 10px 楷体',
});



// 无副作用的布局函数，
function myLayout(node) {
    let points = node.data.points;
    let nodes = node.children;
    points.forEach((p, i) => {
        let child = nodes[i];
        child.setXY(p.x * node.width - node.width / 2, p.y * node.height - node.height / 2);
    });
}

// 创建一个自定义节点
function newMyNode(type, rows, x, y) {
    const node = new Node(type, x, y);
    node.resize(100, 200);
    node.addClass('.glass');

    // 网格布局
    const cols = 2;
    const points = ShapeBuilder.grid(rows, cols);

    node.data = { points: points };

    // 坐标->Node对象
    function pointToNode(p, i) {
        let endpoint = new EllipseNode(i, 0, 0, 12, 12);
        endpoint.addClass('.endpoint');
        endpoint.draggable = false;
        return endpoint;
    }

    const subNodes = points.map(pointToNode);
    node.addChildren(subNodes);

    // 初始化布局一次
    myLayout(node);
    return node;
}

let node1 = newMyNode('元件-1', 3, -260, 0);
let node2 = newMyNode('元件-2', 5, -0, 0);
let node3 = newMyNode('元件-3', 2, 260, 0);
layer.addChildren([node1, node2, node3]);

// 调整尺寸
node3.resize(100, 100);
// 执行自定义布局
myLayout(node3);

// 左右连线
function drawLinks(nodeA, nodeZ) {
    let outputs = nodeA.children.filter((e, idx) => idx % 2 != 0);
    let inputs = nodeZ.children.filter((e, idx) => idx % 2 == 0);
    let linkedStyle = {
        fillStyle: 'orange'
    };

    for (let i = 0; i < outputs.length; i++) {

        let fromIndex = Math.floor(Math.random() * outputs.length);
        let toIndex = Math.floor(Math.random() * inputs.length);

        let from = outputs[fromIndex];
        let to = inputs[toIndex];

        let link = new Link(fromIndex + "->" + toIndex, from, to);
        link.setStyles({
            strokeStyle: Math.random() < 0.5 ? 'green' : 'orange'
        });

        from.setStyles(linkedStyle);
        to.setStyles(linkedStyle);

        if (i % 2 == 0) {
            let rippNode = new RipplingNode();
            // 动效参数设置
            rippNode.ae({
                circleNumber: 2
            });
            rippNode.setStyles({
                lineWidth: 4,
                strokeStyle: 'gray'
            });
            from.addChild(rippNode);
            rippNode.play();
            stage.effectSystem.flow(link, [6, 2]).play();
        }

        layer.addChild(link);
    }
}

drawLinks(node1, node2);
drawLinks(node2, node3);

stage.show();

// 双击可以将组件以图片形式下载到本地
stage.inputSystem.addEventListener('dblclick', () => {
    let obj = stage.inputSystem.target;
    if (obj == null || !obj.text.startsWith('元件-')) {
        return;
    }

    let fileName = obj.text;
    // 将 节点以图片的形式 下载到本地
    stage.exportSystem.saveAsLocalImage(obj, fileName);
})