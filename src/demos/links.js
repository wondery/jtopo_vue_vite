import {
    Stage, Layer, Node,
    TextNode, TipNode, EllipseNode, ShapeNode, ImageNode,
    Link, AutoFoldLink, LShapeLink, QuadBezierLink, ArcLink,
    randomColor, Assets, PolygonShape, Shape
} from '@jtopo/core';

import { Toolbar, RipplingNode } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

const toolbar = new Toolbar(stage);
toolbar.show();

// 动效系统
const effectSystem = stage.effectSystem;
const animationSystem = stage.animationSystem;

// 定义节点的样式 
stage.styleSystem.defClass('.node', {
    lineWidth: 3,
    strokeStyle: '#E1E1E1',
    fillStyle: '#aeaeae'
});

function newShapeNode(text, x, y) {
    let node = new ShapeNode(text, x, y, 40, 40);

    // 生成多边形顶点(6条边)
    let vertices = Shape.circle({
        vertexCount: 6
    });

    // 根据顶点生成多边形
    let shape = new PolygonShape(vertices);

    // 使用
    node.setShape(shape);

    node.setStyles({
        // 覆盖掉 .node 中的定义
        fillStyle: randomColor(),
    });

    node.addClass('.node');
    layer.addChild(node);
    return node;
}

const dist = 160;
const centerNode = newShapeNode('center', 0, 0);
const node1 = newShapeNode('Node1', centerNode.x - dist, centerNode.y - dist);
const node2 = newShapeNode('Node2', centerNode.x + dist, centerNode.y - dist);
const node3 = newShapeNode('Node3', centerNode.x + dist, 0);
const node4 = newShapeNode('Node4', centerNode.x - dist, centerNode.y + dist);
const node5 = newShapeNode('Node5', centerNode.x + dist, centerNode.y + dist);

// AutoFoldLink
{
    var autoFoldLink1 = new AutoFoldLink("AutoFoldLink-1", node1, centerNode, 'rm', 'lm');
    layer.addChild(autoFoldLink1);
}

// 右上角曲线
{
    // 二次贝塞尔曲线
    var curveLink = new QuadBezierLink(null, centerNode, node2, 'ct', 'lm');
    curveLink.setStyle('strokeStyle', 'gray');

    // 使用自定义的文本
    let label = new TipNode('QuadBezierLink');

    label.draggable = false;
    label.setStyles({
        lineWidth: 1,
        padding: 3,
        strokeStyle: 'gray',
        fillStyle: '#e1e1e1',
        color: 'black',
        textPosition: 'ct',
        textBaseline: 'top'
    });
    curveLink.setLabel(label);

    // 开始箭头- 菱形
    let beginArrow = new EllipseNode();
    beginArrow.setRadius(7);
    curveLink.setBeginArrow(beginArrow);

    // 箭头样式
    curveLink.getBeginArrow().setStyles({
        fillStyle: '#F1F1F1',
        strokeStyle: 'gray'
    });

    // 结束箭头
    let arrowNode = new ShapeNode('*');
    arrowNode.setShape(Assets.getShape('Arrow'));
    arrowNode.resize(12, 15);
    arrowNode.setStyles({
        strokeStyle: 'gray',
        color: 'red',
        lineWidth: 1
    });
    curveLink.setEndArrow(arrowNode);
    layer.addChild(curveLink);


    // 在线上滑动的’块‘
    let blockNode = new Node('', 0, 0, 20, 10);
    blockNode.draggable = false;
    blockNode.setStyles({
        backgroundColor: 'green',
    });
    curveLink.addChild(blockNode);

    // n在5000毫秒内，从0逐渐变为1
    animationSystem.anime({
        from: 0,
        to: 1,
        duration: 10000,
        times: 2,
        direction: 'alternate',
        effect: 'easeInOutQuad',
        update: function (n) {
            blockNode.setOriginOnLink(n);
        },
    }).play();

    // 创建一个‘涟漪动效’
    let rippNode = new RipplingNode();
    // 动效参数
    rippNode.ae({
        circleNumber: 2 // '圆圈'数量
    });
    // 样式
    rippNode.setStyles({
        lineWidth: 6,        // 扩散后线条最大宽度
        strokeStyle: 'gray', // 涟漪颜色
    });
    blockNode.addChild(rippNode);
}

// Link
{
    stage.styleSystem.defClass('.link', {
        lineWidth: 2,
        strokeStyle: 'green'
    });

    var link = new Link("Link");
    link.setBegin(centerNode, 'rm');
    link.setEnd(node3, 'lm');
    link.addClass('.link');
    link.setStyles({
        lineDash: [6, 2]
    });

    // 箭头
    let arrowNode = new ShapeNode();
    arrowNode.resize(15, 15);
    arrowNode.setShape(Assets.getShape('Triangle'));
    arrowNode.addClass('.link');

    link.setEndArrow(arrowNode);

    layer.addChild(link);
}

// 红色闪烁折线
{
    var foldLink = new LShapeLink("", centerNode, node4, 'cb', 'rm');
    foldLink.direction = 'vertical';
    foldLink.setStyles({
        lineWidth: 3,
        strokeStyle: 'red',
        color: 'red',
    });

    // 结束箭头
    let endArrow = new ImageNode();
    endArrow.setImage('./assets/img/arrow_left.jpeg');
    endArrow.resize(15, 15);
    foldLink.setEndArrow(endArrow);
    layer.addChild(foldLink);

    // 线上增加一些点缀
    for (let i = 1; i <= 5; i += 1) {
        let textNode = new TextNode(i);
        // 节点不随连线角度旋转
        textNode.rotateWithParent = false;
        textNode.setOriginOnLink(i / 6);
        foldLink.addChild(textNode);
    }

    for (let i = 1; i <= 5; i += 1) {
        let node = new Node('' + i);
        node.resize(12, 12);
        node.setStyles({
            color: 'white',
            textPosition: 'center',
            textBaseline: 'middle',
            fillStyle: 'gray'
        });

        // 节点不随连线角度旋转
        node.rotateWithParent = false;
        // 索引1的线段上，t=i/6, 这个计算稍微麻烦
        node.setOriginOnLink(i / 6, 1);
        foldLink.addChild(node);
    }
}

// 圆弧线
{
    var arcLink = new ArcLink('ArcLink', node3, node5, 'rm', 'rm');
    // 方向顺时针(也是默认)
    arcLink.direction = 'clockwise';
    arcLink.setStyles('lineDash', [6, 2]);
    layer.addChild(arcLink);

    for (let i = 0.1; i < 0.9; i += 0.2) {
        let node = new EllipseNode('' + arcLink.children.length, 0, 0, 10, 10);
        node.setStyles({
            fillStyle: randomColor(),
        });
        node.on('mouseenter', e => {
            node.scale(2, 2);
        });
        node.on('mouseout', e => {
            node.scale(1, 1);
        });
        node.setOriginOnLink(i);
        arcLink.addChild(node);
    }

    // 箭头
    let arrowNode = new ShapeNode();
    arrowNode.setStyles({
        fillStyle: 'gray',
        lineCap: 'round'
    });
    arrowNode.resize(15, 15);
    arrowNode.setShape(Assets.getShape('Triangle'));
    arcLink.setEndArrow(arrowNode);
}

// 给多个link，增加’流动动效'
[link, foldLink, arcLink, autoFoldLink1].forEach(link => {

    let animation = effectSystem.flow(link, { lineDash: [6, 2] });
    animation.play();
    
    // 30秒后停止动效
    setTimeout(() => {
        animation.cancel();
    }, 30000);
    
});

stage.show();