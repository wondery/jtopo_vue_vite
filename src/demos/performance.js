import { Stage, Layer, Node, ShapeBuilder, ImageNode } from '@jtopo/core';

// 影响性能的因素非常多，这里只是做了一个场景的演示
// FAQ： https://www.jtopo.com/doc/faq.html 有更多关于性能的描述和优化思路

const stage = new Stage('divId');
const layer = new Layer(stage);

stage.showAxis();
layer.useLightGridBackground();

const beginTime = Date.now();
const nodes = [];

// 正式版的性能更高
console.time('create');

// 2500个节点
const rows = 50;
const cols = 50;
for (let i = 0; i < rows * cols; i++) {
    let node = null;

    // 随机图
    if (i % 2 == 0) {
        node = new ImageNode();
        node.setImage('./assets/img/statistics/cloud.png', true);
    } else {
        node = new ImageNode();
        node.resize(42, 42);
        node.setImage('./assets/img/laptop.png');
    }

    // 随机文本
    if (i % 23 == 0) {
        node.text = '' + nodes.length;
    }
    nodes.push(node);
}
console.timeEnd('create');

console.time('add');
layer.addChildren(nodes);

console.timeEnd('add');

stage.show();

let usedTime = (Date.now() - beginTime);
// 生成+显示时间
let s = '总数量: ' + nodes.length + '  用时: ' + usedTime + ' 毫秒.'
document.getElementById('tip_msg').innerHTML = s;

// --布局
console.time('layout');
const gridPoints = ShapeBuilder.grid(rows, cols);
const layout = stage.layoutSystem.pointsLayout(nodes, gridPoints);
layout.resize(cols * 100,  rows* 100);
layout.doLayout();
console.timeEnd('layout');

//-- 动画
stage.animationSystem.anime({
    from: 0,
    to: 1,
    duration: 3000,
    update: function (n) {
        layer.children.forEach((child, idx) => {
            if (idx % 31 == 0) {
                child.scale(0.5 + n, 0.5 + n);
                child.rotate(n * (idx % 100));
            }
        });
    },
    times: Infinity,
    effect: 'easeOutQuad',
    direction: 'alternate',
}).play();
