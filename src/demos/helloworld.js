// Hello!
// 欢迎学习jtopo，看完这个简单的例子后，其它例子的流程类似，很划算的！

// 采用标准ESM模块化，可以直接import
import { Stage, Layer, Node, Link } from '@jtopo/core';
import { Toolbar } from '@jtopo/extensions';

// 需要一个div对象做为渲染目标
const stage = new Stage(document.getElementById('divId'));

// 创建一个‘层‘对象 
const layer = new Layer(stage);

// 工具栏（可选）
const toolbar = new Toolbar(stage);
toolbar.show();

// 创建一个节点：new Node('文本', x，y，宽度, 高度)';
const startNode = new Node('Start', -200, 0, 50, 50);

// 另一个节点
const endNode = new Node();

// 设置节点文本
endNode.text = 'End';

// 设置节点标题
endNode.title = 'This is title';

// 设置节点位置
endNode.setXY(200, 0);

// 设置节点大小
endNode.resize(100, 100);

// 节点由三部分组成：1. 边框 2. 图形 3. 文本
endNode.setStyles({
    // 用类似css语法设置节点的：边框、字体、背景 的属性
    border: '10px gray',
    borderRadius: 10,
    backgroundColor: "rgba(128,128,128, 0.2)",
    font: 'bold 20px serif',
    color: 'gray',

    // 边框 和 图形的间距
    padding: 10,

    // 用Canvas绘图属性设置节点内图形的：填充样式、画笔粗细、颜色、字体位置
    strokeStyle: 'gray',
    fillStyle: '#f0f0f0',
    lineWidth: 3,
    textPosition: 'center',
    textBaseline: 'middle',
});

// 连线 new Link('文本', 开始锚点, 结束锚点);
// 锚点：rm 表示右-中间(right-middle)，auto 表示自动
const link = new Link("Link", startNode.getAnchor('rm'), endNode.getAnchor('auto'));
link.title = 'This is a link';

// link没有背景边框，只用canvas的属性语法设置: 粗细、颜色 等属性
link.setStyles({
    // 线条样式
    strokeStyle: 'orange',
    // 线条粗细
    lineWidth: 2,
});

// 线上文本标签的样式（link的文本标签也是一个节点对象）
let label = link.getLabel();
label.setStyles({
    fontWeight: 'bold italic',
    color: 'black',
    border: '1px dashed #afafaf',
    padding: 5,
    backgroundColor: 'rgba(128,128,128,0.2)',
});

// 添加到layer
layer.addChild(startNode);

// 可以一次添加多个
layer.addChildren([endNode, link]);

// 最后一步：显示（最新版本可以省略此步骤了）
stage.show();

// 注: jtopo的发行版提供了类型系统，各种参数在vscode里有智能提示！