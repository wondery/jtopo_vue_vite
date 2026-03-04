// @jtopo/extensions 模块中提供若干极简的UI组件，满足一般情况
// 组件耦合较低，方便修改扩展；也可以舍弃，完全使用自己的UI。
// 这里演示: 1. Tooltip 2. PopupMenu
import { Stage, Layer, Node, ImageNode } from '@jtopo/core';
import { Toolbar, Tooltip, PopupMenu } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

// 工具栏
const toolbar = new Toolbar(stage);
toolbar.show();

let node = new ImageNode('鼠标放上来', 0, 0, 64, 64);
node.setImage('./assets/img/unit.png');

layer.addChild(node);

stage.show();

// 鼠标指向小提示
let tooltip = new Tooltip(stage);
tooltip.setHtml('小提示:右击弹出菜单');

// 鼠标在节点上移动时显示
node.addEventListener('pointermove', function (event) {
    let is = stage.inputSystem;
    tooltip.showAt(is.x, is.y);
});

// 右键菜单
let popupMenu = new PopupMenu(stage);
popupMenu.setHtml(`
    <div class="header">编辑</div>
    <a>剪切</a>
    <a>复制</a>
    <a>粘贴</a>
    <a>删除</a> 
    <hr></hr>
    <div class="header">功能</div>
    <a>上移一层</a>
    <a>移至顶部</a>
    <a>下移一层</a>
    <a>移至底部</a>
`);

// 菜单选择事件处理
popupMenu.addEventListener('select', function (event) {
    //event.item： 选中的菜单文本
    let item = event.item;
    node.text = item;
});

// 鼠标按下时隐藏
stage.inputSystem.addEventListener('pointerdown', function () {
    popupMenu.hide();
});

// 右键松开时显示
node.addEventListener('pointerup', function () {
    let input = stage.inputSystem;
    // 取画布上的坐标x,y
    if (input.button == 2) { // right button
        popupMenu.showAt(input.x, input.y);
    }
});