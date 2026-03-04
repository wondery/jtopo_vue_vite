import {
    Stage, Layer, Link, EllipseNode
} from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

stage.showOverview();

// 使用图系统
const graphSystem = stage.graphSystem;
const layoutSystem = stage.layoutSystem;


const nodes = [];

function addNode(text) {
    const node = new EllipseNode(text, 0, 0);
    node.setStyles({ textPosition: 'center', textBaseline: 'middle' });
    node.resize(32, 32);
    layer.addChild(node);
    nodes.push(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    const link = new Link('', nodeA, nodeZ, 'auto', 'auto');
    layer.addChild(link);
    return link;
}

const rootNode = addNode('root');
rootNode.setXY(0, 0);

function gen(parentNode, deep, maxDeep) {
    let n = 5;
    for (let i = 0; i < n; i++) {
        if (Math.random() < 0.2) {
            continue;
        }
        let node = addNode(deep + '-' + i);
        addLink(parentNode, node);

        if (deep < maxDeep) {
            if (deep > 1 && Math.random() < 0.5) {
                continue;
            }
            gen(node, deep + 1, maxDeep);
        }
    }
}
gen(rootNode, 1, 3);


const graphArr = graphSystem.objectsToGraphs(layer.children);

// 得到第一个树形有向图对象
const graph = graphArr.filter(g => g.isTree())[0];

// 生成星形布局对象
const layout = layoutSystem.starLayout(graph);

// 动画
stage.animationSystem.anime({
    // 角度, 缩放, 平移
    from: [0, 0.1, 600, -600],
    to: [2 * Math.PI, 1, 0, 0],

    update: (arr) => {
        // 变换: 缩放、旋转、平移（布局的中心）
        layout.scale(arr[1], arr[1])
        layout.rotate(arr[0]);
        layout.translate(arr[2], arr[3]);

        // 执行布局
        layout.doLayout();
    },
    duration: 1000,
    effect: 'easeOutCubic'
}).play();


stage.show();


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