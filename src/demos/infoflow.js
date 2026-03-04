import {
    Stage, Layer, Node, EllipseNode, Link, LShapeLink,
    ZShapeLink, BezierLink, randomColor, NodeHelper
} from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);



const nodes = [];
const links = [];

function addNode(text, x, y) {
    const node = new EllipseNode(text, x, y);
    node.setRadius(14);
    node.setStyles({
        'strokeStyle': '#E1E1E1',
        'fillStyle': randomColor()
    });
    nodes.push(node);

    let n = 0;
    node.addEventListener('mouseenter', function () {
        this.text = 'over times:' + n++;
    });
    node.addEventListener('mouseout', function () {
        this.text = text;
    });
    return node;
}

function addLink(nodeA, nodeZ, text) {
    const link = new BezierLink(text, nodeA, nodeZ, 'center', 'lm');
    link.setStyles({
        'strokeStyle': '#E1E1E1',
    });
    links.push(link);
    return link;
}

const cloudNode = addNode('云', 0, 0, 218);
const fwNode = addNode('防火', cloudNode.x - 50,  cloudNode.y - 35)
const enterNode = addNode('接入', fwNode.x - 100, fwNode.y);

for (let i = 0; i < 4; i++) {
    const node = addNode('起点_' + i, enterNode.x - 140, enterNode.y -60 +  60 * i);
    const link = new ZShapeLink(null, node, enterNode, 'center', 'lm');
    link.setStyles({
        'lineWidth': 5,
        'strokeStyle': '#E1E1E1',
    });
    link.direction = 'horizontal';

    links.push(link);
}

addLink(enterNode, fwNode);

addLink(fwNode, cloudNode);

const fw2Node = addNode('防火2', cloudNode.x + 100, cloudNode.y - 35);
addLink(cloudNode, fw2Node);

const group = new Node('区域A', cloudNode.x + 300, cloudNode.y, 130, 240);
group.setStyles({
    borderColor: '#E1E1E1',
    color: 'black',
    backgroundColor: 'rgba(0,200,0,0.5)',
});

const hostNode = new EllipseNode('终端', -20, -group.height/2+40);
hostNode.setRadius(12);
hostNode.setStyles({
    'fillStyle': randomColor()
});

addLink(fw2Node, hostNode);

for (let i = 0; i < 3; i++) {
    const node = new EllipseNode('结束_' + i, hostNode.x + 40, hostNode.y + 50 + i * 50);
    node.setRadius(12);
    node.setStyles({
        'fillStyle': randomColor(),
        'strokeStyle': '#E1E1E1',
    });

    const link = new LShapeLink(null, hostNode, node);
    link.setStyles({
        'lineWidth': 5,
        'strokeStyle': '#E1E1E1',
    });
    link.direction = 'vertical';

    group.addChild(link);
    group.addChild(node);
}
group.addChild(hostNode);

layer.addChild(group);
layer.addChildren(links);
layer.addChildren(nodes);
stage.show();

// 动画
const beginNode = layer.querySelector('[text=起点_3]');

// 遍历链路
const objects = NodeHelper.travel(beginNode);

// 打印出路径（只打印Node对象）
console.log(objects.filter(obj=> obj instanceof Node).map(obj=>obj.text));

function flow(objects, n) {
    if (n == objects.length) {
        return;
    }
    const obj = objects[n];

    if(obj instanceof Node){
        obj.setStyles({
            strokeStyle: 'red'
        });
    }else{
        obj.setStyles({
            lineDash: [5, 2],
            strokeStyle: 'red'
        });
    }
    let offset = 0;

    setInterval(function () {
        if (++offset > 16) offset = 0;
       
        obj.setStyles({
            lineDashOffset: -offset
        });

        layer.update();
    }, 300);

    setTimeout(function () {
        flow(objects, n + 1);
    }, 250);
}

flow(objects, 0);