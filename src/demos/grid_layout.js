import { Stage, Layer, Shape, ShapeBuilder, EllipseNode, } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

const styleSystem = stage.styleSystem;
const layoutSystem = stage.layoutSystem;

// ---- 样式定义
styleSystem.defClass('.ball', {
    fillStyle: 'rgba(255,255,255,0.5)'
});

// ---- 生成节点
const nodes = [];
const rows = 6;
const cols = 6;
for (let i = 0; i < rows * cols; i++) {
    const node = new EllipseNode('' + i);
    node.resize(30, 30);
    node.addClass('.ball');
    nodes.push(node);
    layer.addChild(node);
}

// 生成一个网格‘形状'
const gridPoints = ShapeBuilder.grid(rows, cols);

// 根据形状生成’布局‘对象
const layout = layoutSystem.pointsLayout(nodes, gridPoints);
// 设置尺寸
layout.resize(300, 300);

// 执行布局，带动画参数
stage.animationSystem.anime({
    // 角度, 缩放, 平移
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

stage.show();
