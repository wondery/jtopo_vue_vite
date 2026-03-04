import { Stage, Layer, Node, Link, randomColor,
    FlowLayout
} from '@jtopo/core';


const stage = new Stage('divId');
var layer = new Layer(stage);

const nodes = [];
// 随机生成节点
for (var i = 0; i < 20; i++) {
    var node = new Node('' + i);
    node.resize(32 + (50 * Math.random()),
     32 + (50 * Math.random()));
    node.textOffsetY = 2;
    node.x = stage.width * Math.random();
    node.y = stage.height * Math.random();
    node.setStyles({
        'borderColor': null, // 无边框 
        'background': randomColor()
    });
    nodes.push(node);
    layer.addChild(node);
}
stage.show();

// 流式布局
var layout = new FlowLayout();

layout.setSize(500);

// 动画时间, 毫秒, 不设置,就没有动画效果.
layout.setTime(1000);

// 节点间隔
layout.setMargin(0, 3);

// 布局的每一步回调（这里是刷新画面）
layout.onLayout(() => layer.update());

// 布局后的中心点
layout.setCenter(0, 0);

// 布局, 结束后调整尺寸再次布局， 反复几次
layout.doLayout(nodes);