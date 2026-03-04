import {
    Stage, Layer, Node, Link, EllipseNode, Assets
} from '@jtopo/core';

// jtopo的布局，支持变换（旋转，缩放，平移），还可以方便的和动画结合使用

const stage = new Stage('divId');
const layer = new Layer(stage);
stage.showAxis();

let nodes = [];

stage.styleSystem.defClass('.ball', {
    lineWidth: 3,
    textPosition: 'center',
    textBaseline: 'middle',
    strokeStyle: 'gray',
    font: '12px arial',
});

stage.styleSystem.defClass('.link', {
    lineWidth: 3,
    strokeStyle: 'gray',
});

function addNode(text) {
    const x = Math.random() * 300 - Math.random() * 300;
    const y = Math.random() * 300 - Math.random() * 300;

    const node = new EllipseNode(text, x, y);
    node.setRadius(20);
    node.addClass('.ball');
    nodes.push(node);
    layer.addChild(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    const link = new Link('', nodeA, nodeZ, 'auto', 'auto');
    link.addClass('.link');
    layer.addChild(link);
    return link;
}

const rootNode = addNode('root');
rootNode.setXY(0, 0);

function gen(parentNode, deep, maxDeep) {
    var n = 3;
    for (let i = 0; i < n; i++) {
        const node = addNode(deep + '-' + i);

        addLink(parentNode, node);

        if (deep < maxDeep) {
            if (Math.random() < 0.5 && i > 0) {
                continue;
            }
            gen(node, deep + 1, maxDeep);
        }
    }
}

gen(rootNode, 1, 3);
stage.show();

// 生成'图数据;
const graphArr = stage.graphSystem.objectsToGraphs(layer.children);

// 得到第一个树形有向图对象
const treeGraph = graphArr.filter(g => g.isTree())[0];

// 根据图对象生成树形布局对象
const layout = stage.layoutSystem.treeLayout(treeGraph);

// 执行布局，带动画参数
stage.animationSystem.anime({
    // 旋转, 缩放, 平移
    from: [0, 0.1, 600, -600],
    to: [2 * Math.PI, 1, 0, 0],

    update: (arr) => {
        // 变换
        layout.scale(arr[1], arr[1])
        layout.rotate(arr[0]);
        layout.translate(arr[2], arr[3]);

        // 执行布局
        layout.doLayout();
    },
    duration: 1000,
    effect: 'easeOutCubic'
}).play();


// 拉动滑杆控制
{
    let slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', 0.5);
    slider.setAttribute('max', 3);
    slider.setAttribute('step', 0.01);
    Object.assign(slider.style, {
        position: 'absolute',
        zIndex: 999,
        right: 10,
        top: 100,
        transform: "rotate(90deg)",
    });
    stage.domElement.appendChild(slider);

    slider.addEventListener('input', () => {
        layout.scale(slider.value, slider.value);
        layout.doLayout();
    });
}