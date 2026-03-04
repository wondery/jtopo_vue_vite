import { Stage, Layer, Node, randomColor, } from '@jtopo/core';
const stage = new Stage('divId');
const layer = new Layer(stage);
const styleSystem = stage.styleSystem;

// jtopo使用PointEvent处理各种输入设备（如鼠标、触摸、笔等）的交互;
// 提供统一的方式来处理交互，适用于不同输入类型的设备(电脑、手机、平板等)

const groupNode = new Node('group', 0, 0, 200, 200);
styleSystem.defClass('.myStyle', {
    fillStyle: '#E3E3E3',
    fontSize: '16px'
});
groupNode.addClass('.myStyle');
layer.addChild(groupNode);

const node = new Node('child', 0, 0, 40, 40);
node.setStyles({
    fontSize: '16px',
    fillStyle: '#008bcf',
    color: 'orange'
});
groupNode.addChild(node);

stage.show();

// 全局性事件监听处理
stage.inputSystem.addEventListener('pointerdown', () => {
    let target = stage.inputSystem.target;
    if (target == null) {
        console.log('没有点中任何对象');
        return;
    }
    console.log('点中了一个对象:', target.x, target.y);
});

// 下面是单个对象的事件处理

// 鼠标或指针进入
node.addEventListener('pointerenter', function () {
    console.log('pointerenter');
    node.text = 'pointerenter';
});

// 鼠标或指针移动
node.addEventListener('pointermove', function () {
    console.log('pointermove');
    node.text = 'pointermove';
});

// 鼠标或指针离开
node.addEventListener('pointerout', function () {
    node.text = 'pointerout';
    console.log('pointerout');
});

// 按下
node.addEventListener('pointerdown', function () {
    console.log('pointerdown');
    node.text = 'pointerdown';
});

// 松开
node.addEventListener('pointerup', function () {
    console.log('pointerup');
    node.text = 'pointerup';
});

// 单击
node.addEventListener('click', function () {
    node.text = 'click';
    console.log('click');
});

// 双击
node.addEventListener('dblclick', function () {
    console.log('dblclick');
    node.text = 'dblclick';
});

groupNode.addEventListener('pointerenter', function () {
    groupNode.text = 'pointerenter';
});
groupNode.addEventListener('pointerout', function () {
    groupNode.text = 'pointerout';
});