import { Stage, Layer, Node, Link, EllipseNode, FixedPointAnchor } from '@jtopo/core';

const stage = new Stage('divId');
var layer = new Layer(stage);

// Link可以连接到Node上的任意位置
// 回顾一下jtopo的坐标系统： https://www.jtopo.com/doc/tutorial_coord.html


let fromNode = new Node('from', -150, -50, 200, 200);
let toNode = new Node('to', 150, -100, 200, 200);
fromNode.setStyles({
    border: '1px gray'
});
toNode.setStyles({
    border: '1px gray'
});
layer.addChildren([fromNode, toNode]);

for (let i = 0; i < 5; i++) {
    // 左边: 位置计算( fromNode的本地坐标系位置 )
    let xInFrom = fromNode.width * 0.5;
    let yInFrom = i * 20 - fromNode.height / 4;
    
    // 借助一个‘小球’的方式(更灵活一些)
    // 右边: 小球位置( fromNode的本地坐标系位置 )
    let xInToNode = -toNode.width * 0.5;
    let yInToNode = i * 20;
    
    let ball = new EllipseNode(null, xInToNode, yInToNode, 12, 12);
    ball.setStyles({
        lineWidth: 1,
        fillStyle: 'rgba(0,255,0,0.2)'
    });
    // 小球放入toNode节点内
    toNode.addChild(ball);
    
    let link = new Link(i, fromNode.getPointAnchor(xInFrom, yInFrom), ball.getAnchor('lm'));
    layer.addChild(link);
}

let 说明节点 = new EllipseNode("from的本地坐标: \nx:   fromNode.width * 0.5 \ny: -fromNode.height * 0.5", fromNode.width / 2, -fromNode.height / 2, 10, 10);
说明节点.setStyles({
    color: 'blue',
    fontSize: '12px',
    fillStyle: 'green',
    textPosition: 'ct',
    textBaseline: 'bottom'
});
fromNode.addChild(说明节点);

stage.show();


// 下面的椭圆
{
    const node = new EllipseNode(null, 0, 200, 200, 100);
    layer.addChild(node);

    let ball = new EllipseNode(null, 0, 0, 10, 10);
    layer.addChild(ball);

    let link = new Link(null, ball, toNode, 'auto', 'auto');
    layer.addChild(link);

    stage.animationSystem.anime({
        from: 0,
        to: 1,
        update: (n) => {
            // 动态计算
            let p = node.getPoint(n);
            ball.setXY(p.x, p.y)
        },
        duration: 10000,
        times: Infinity
    }).play();
}