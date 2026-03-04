import { Stage, Layer, Node, EllipseNode, PathLink } from '@jtopo/core';

const stage = new Stage(document.getElementById('divId'));
const layer = new Layer(stage);

// 路径连线

const link = new PathLink();
link.draggable = false;
const node = new EllipseNode("start", -300, 0, 50, 50);
node.setStyles({
    lineWidth: 1,
    strokeStyle: 'green',
})
layer.addChild(node);
const node2 = new EllipseNode("end", 350, 0, 50, 50);
node2.setStyles({
    lineWidth: 1
})
layer.addChild(node2);

// 路径
let path = [
    node,
    { x: -100, y: 0 },
    { x: 100, y: 200 },
    { x: 300, y: 200 },
    node2,
];
link.setPath(path);

link.setStyles({
    lineJoin: 'round',
    lineCap: 'round',
    lineWidth: 30,
    strokeStyle: 'gray',
});
layer.addChild(link);

const link2 = new PathLink("PathLink");
link2.draggable = false;
link2.setPath(path); // 同样的路径
link2.setStyles({
    lineWidth: 7,
    lineDash: [10, 10],
    strokeStyle: 'white',
});
layer.addChild(link2);

stage.effectSystem.flow(link2).play();

window.link = link;

stage.show();

// 在线上滑动的’块‘
let blockNode = new Node('', 0, 0, 20, 10);
blockNode.setStyles({
    backgroundColor: 'red',
});
layer.addChild(blockNode);

stage.animationSystem.anime({
    from: 0,
    to: 1,
    duration: 5000,
    times: Infinity,
    update: function (t) {
        // 取线上一点 
        let p = link.getPoint(t, null);
        blockNode.setXY(p.x, p.y);

        // 取相近的点，计算出切线斜率（角度）
        let p2 = link.getPoint(t + 0.0001);
        let angle = Math.atan2(p2.y - p.y, p2.x - p.x);
        blockNode.rotate(angle);
    }
}).play();