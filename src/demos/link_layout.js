import { Stage, Layer, Node, Link, EllipseNode } from '@jtopo/core';

// jtopo的Link 与 Node 一样，都可以作为容器来看待, 在一些场景中会更方便

// 实际上Link上文本和箭头就是以子节点的形式存在的，可以通过link.children看到

// 这里演示 将一些节点添加到 Link中，位置随Link变化

// 该示例涉及计算，稍复杂。

const stage = new Stage('divId');
const layer = new Layer(stage);
stage.show();


const fromNode = new Node('From', -200, -150, 48, 48);
const toNode = new Node('To', 200, 150, 48, 48);

layer.addChild(fromNode);
layer.addChild(toNode);

const link = new Link(null, fromNode, toNode);
layer.addChild(link);

stage.styleSystem.defClass('.ball', {
    lineWidth: 2,
    strokeStyle : 'gray',
    fillStyle: '#00B5AD',
    textPosition: 'center',
    textBaseline: 'middle',
    font: '13px 微软雅黑',
    color: 'blue'
});

// 在link上添加9个圆点
function draw(link, count, d) {
    // 存放左右两侧的节点、连线
    const sideNodes = [];
    const sideLinks = [];

    for (let i = 1; i <= count; i += 1) {
        // t的取值范围[0,1],  这里根据count做均分计算
        let t = i / (count + 1);

        // 线上圆形节点
        let circleNode = new EllipseNode('' + i, 0, 0);
        circleNode.setRadius(10);
        circleNode.draggable = false;
        circleNode.addClass('.ball');

        // 节点不随连线角度旋转
        circleNode.rotateWithParent = false;

        // 在索引为0的线段上（每一种Link的线段数量不同，比如Link有1条，FoldLink有2条）
        circleNode.setOriginOnLink(t);

        link.addChild(circleNode);

        // 分布在两侧的节点
        let sideNode = new Node('' + i);

        sideNode.rotateWithParent = false;
        sideNode.resize(16, 16);
        sideNode.setStyles({
            fillStyle: 'gray',
            textPosition: 'center',
            textBaseline: 'middle'
        });
        sideNode.setOriginOnLink(t);
        sideNodes.push(sideNode);
        link.addChild(sideNode);

        // 和两侧节点的连线
        const sideLink = new Link(null, sideNode, circleNode);
        sideLinks.push(sideLink);

        const isLeft = i % 2 == 0;

        if (isLeft) { // 左侧
            sideNode.x = -d;
            sideLink.setStyles({
                lineDash: [6, 2],
            });
        } else { // 右侧
            sideNode.x = d;
        }
        link.addChild(sideLink);
    }

    return {
        sideNodes,
        sideLinks
    };
}

// 绘制主干线, 主干上6个节点
const {
    sideNodes,
    sideLinks
} = draw(link, 6, 100);

// 从主干的第3个节点
const subLink = sideLinks[2];

// 引出二级线, 二级线路上3个节点(以此类推，可以循环多级)
const {sideNodes2, sideLinks2} = draw(subLink, 3, 50);


// 节点拖拽时，自动调整方向 (可有可无)
[fromNode, toNode].forEach(node => {
    node.addEventListener('drag', (e) => {
        const dx = Math.abs(toNode.x - fromNode.x);
        const dy = Math.abs(toNode.y - fromNode.y);

        // 两个节点之间的角度更接近于水平 还是 垂直
        if (dx < dy) {
            sideNodes.forEach(node => {
                let n = node.x || node.y;
                node.x = n;
                node.y = 0;
            });
        } else {
            sideNodes.forEach(node => {
                let n = node.x || node.y;
                node.x = 0;
                node.y = n;
            });
        }
    });
});