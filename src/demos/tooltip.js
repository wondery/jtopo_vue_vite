// jtopo提供了若干极简的UI组件，
// 耦合较低，方便修改扩展；也可以舍弃，完全使用自己的UI。
import { Stage, Layer, Node,
    Tooltip
} from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);
const node = new Node('🖥', 0, 0, 128, 128);

node.setStyles({
    textPosition: 'center',
    textBaseline: 'middle',
    fontSize: '128px'
});
layer.addChild(node);

stage.show();

// 鼠标指向小提示
const tooltip = new Tooltip(stage);
tooltip.setHtml('小提示: 可以是html哦');

node.addEventListener('pointermove', function () {
    var input = stage.inputSystem;
    tooltip.showAt(input.x, input.y);
});