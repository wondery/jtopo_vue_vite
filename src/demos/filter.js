import { Stage, Layer, Node, ShapeBuilder, ImageNode } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);
stage.showAxis();

stage.show();

// 滤镜效果 (一些旧版本浏览器不支持)
let filters = [
    'invert(80%)', // 反色
    'blur(1px)',    // 高斯模糊
    'opacity(50%)',
    'saturate(200%)', // 饱和度
    'hue-rotate(90deg)',
    'contrast(200%)', // 对比度
    'contrast(150%) brightness(120%)', // 锐化
    'grayscale(100%)',
    'sepia(100%)',
];

const nodes = [];

// 生成节点
let rows = 3;
let cols = 3;
for (var i = 0; i < rows * cols; i++) {
    let filter = filters[i % filters.length];
    var node = new ImageNode(filter);
    node.resize(64, 64);
    node.setImage('./assets/img/pstn/host.png');
    node.setStyles({
        filter: filter
    });
    node.textOffsetY = 2;
    nodes.push(node);
    layer.addChild(node);
}

// 生成一个网格‘形状'的点几何
let gridPoints = ShapeBuilder.grid(rows, cols);

// 根据形状生成’布局‘对象
let layout = stage.layoutSystem.pointsLayout(nodes, gridPoints);

// 尺寸
layout.resize(300, 300);

layout.doLayout();

// 动画
stage.animationSystem.anime({
    from: [0, 0, 0],
    to: [100, 360, 2],
    update: (arr) => {
        nodes[0].setStyles({
            filter: 'invert(' + arr[0] + '%)'
        });
        nodes[1].setStyles({
            filter: 'blur(' + arr[2] + 'px)'
        });
        nodes[2].setStyles({
            filter: 'opacity(' + arr[0] + '%)'
        });
        nodes[4].setStyles({
            filter: 'hue-rotate(' + arr[1] + 'deg)'
        });
        nodes[5].setStyles({
            filter: 'contrast(' + arr[1] + '%)'
        });
        nodes[8].setStyles({
            filter: 'sepia(' + arr[0] + '%)'
        });
    },
    duration: 3000,
    direction: 'alternate',
    times: Infinity
}).play();

// 注意：滤镜效果是较耗费性能的，性能敏感时可以考虑 ImageUtil 静态预处理好一些图片