import { Stage, Layer, Node, Shape, Link , NodeHelper} from '@jtopo/core';
const stage = new Stage('divId');
const layer = new Layer(stage);

// 利用对象的 beforeRender、afterRender回调接口
// 可以在每一帧绘制前/后执行一些自定义的逻辑

// 演示：点击按钮，改变面板尺寸

// 定义样式
stage.styleSystem.defClass('.group', {
    "fillStyle": "rgba(239,239,239,0.8)",
    "lineWidth": 0,
});
stage.styleSystem.defClass('.title', {
    "lineWidth": 0,
    'textPosition': 'lm',
    'textBaseline': 'middle',
    'textAlign': 'left',
    'textOffsetX': 10,
    'color': "#2474b5",
    'font': "bold 12px 宋体",
    "fillStyle": "rgba(202,202,202,0.8)",
});
stage.styleSystem.defClass('.btn', {
    "color": "white",
    "backgroundColor": "#2474b5",
    "font": "24px 宋体",
    "textBaseline": "middle",
    "textPosition": "center"
});

function createGroup(titleText, x, y, width, height) {
    // 组
    let groupNode = new Node(null, x, y, width, height);
    groupNode.addClass('.group');
    layer.addChild(groupNode);

    // 标题栏
    let titleBar = new Node(titleText);
    titleBar.pointerEnabled = false;
    titleBar.addClass('.title');

    // 每一帧绘制前执行
    titleBar.beforeRender = function () {
        titleBar.resize(this.parent.width, 40);
        titleBar.left = -this.parent.width * 0.5;
        titleBar.top = -this.parent.height * 0.5;
    };

    groupNode.addChild(titleBar);

    let button = new Node("-", 0, 0, 20, 20);
    button.draggable = false;
    titleBar.addChild(button);

    // 每一帧绘制前执行
    button.beforeRender = function () {
        button.right = this.parent.width * 0.5 - 10;
        button.middle = -this.parent.height * 0.5;
    }
    button.addClass('.btn');

    // 自定义一个事件监听
    groupNode.addEventListener('sizeToggle', function () {
        if (button.text == '+') {
            resizeWithAnimation(groupNode, 300, 300);
            button.text = '-';
        } else {
            resizeWithAnimation(groupNode, 100, titleBar.height);
            button.text = '+';
        }
    });

    button.addEventListener('pointerup', () => {
        groupNode.dispatchEvent({ type: 'sizeToggle' });
    });
    return groupNode;
}

function resizeWithAnimation(node, width, height) {
    // 节点尺寸逐渐从0变为100，但节点的右上角(rt)始终不变
    let animation = stage.animationSystem.anime({
        from: [node.width, node.height],
        to: [width, height],
        update: function (arr) {
            // 根据固定点缩放
            NodeHelper.resizeByFixedPoint(node, 'rt', arr[0], arr[1]);
        },
        duration: 150,
        effect: 'easeInQuart'
    });
    animation.play();
}

let from = createGroup('分组-1', -200, 0, 300, 300);
let to = createGroup('分组-2', 200, 0, 300, 300);


stage.show();

// 注: 需要每一帧绘制前执行，性能敏感，请勿在回调函数中进行耗时操作