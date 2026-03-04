import { Stage, Layer, Node, StylePattern, randomColor } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

stage.styleSystem.defClass('.group', {
    lineWidth: 30,
    fillStyle: new StylePattern('./assets/img/pattern.jpg', 'repeat'),
    strokeStyle: '#efefef',
    font: 'bold 10px arial'
});

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 容器的边界和尺寸,会随着子节点自动变化
const group = new Node('Group', 0, 0, 100, 100);
group.addClass('.group');
layer.addChild(group);

for (let i = 0; i < 6; i++) {
    var node = new Node();
    node.setXY(rand(-200, 200), rand(-200, 200));
    node.resize(32, 32);
    node.setStyles({ 'fillStyle': randomColor() });
    group.addChild(node);
}

const padding = 30;
stage.layoutSystem.sizeFitToChildren(group, padding);

stage.inputSystem.addEventListener('pointermove', function () {
    // 拖拽中
    if (stage.inputSystem.isPointerDown) {
        stage.layoutSystem.sizeFitToChildren(group, padding);
    }
});

stage.show();