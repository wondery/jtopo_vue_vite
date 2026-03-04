import {
    Stage, Layer, Node, EllipseNode, randomColor, BezierLink,
    NEHelper,
} from '@jtopo/core';

// 本例演示了如何定义复杂带交互的‘高级节点’
// 点击一个“输出"节点，再点击另外一个面板上的 ”输入“ 节点可以连线

// 1. 用组合的形式代替继承式的定制
// 2. 适用于序列化 和 反序列化

let stage = new Stage('divId');
const layer = new Layer(stage);
window.layer = layer;

// 注：样式最好通过定义 stage.styleSystem.defClass(...) 来定义



//定义一个 '面板' 对象
class TupuPanel {
    container;

    // 标题高度
    titleHeight = 30;

    // 输入/输出的每行高度
    rowHeight = 24;

    constructor(title, width, color, inputs, outputs) {
        this.inputs = inputs || [];
        this.outputs = outputs || [];

        // 计算总高度
        const TitleHeight = this.titleHeight;
        let rows = Math.max(inputs.length, outputs.length);
        let totalHeight = TitleHeight + rows * this.rowHeight + 10;

        // 面板主节点
        let container = new Node(null, 0, 0, width || 168, totalHeight);
        container.type = "Tupu_Root";
        container.data = {
            title: title,
            width: width,
            color: color,
            inputs: inputs,
            outputs: outputs
        };
        container.setStyles({
            lineWidth: 0,
            backgroundColor: color || '#353535',
            strokeStyle: '#777788',
            // borderWidth: 1,
            shadowBlur: 7,
            shadowColor: 'black',
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            borderRadius: [8, 8, 8, 8]
        });
        this.container = container;

        // 标题
        let titleNode = new Node(title, 0, 0, container.width, TitleHeight);
        titleNode.autoSize = false;
        titleNode.connectable = false;
        titleNode.pointerEnabled = false;
        titleNode.setStyles({
            lineWidth: 0,
            textPosition: 'lm',
            textBaseline: 'middle',
            textAlign: 'left',
            color: '#aaaaaa',
            font: 'bold 12px arial',
            textOffsetX: 18,
            textOffsetY: 3
        });
        titleNode.top = -container.height / 2;
        container.addChild(titleNode);

        // 标题下的分割线
        let titleLine = new Node(null, 0, 0, container.width - 2, 1);
        titleLine.connectable = false;
        titleLine.pointerEnabled = false;
        titleLine.setStyles({
            backgroundColor: '#2a2a2a'
        });
        titleLine.bottom = titleNode.bottom;
        container.addChild(titleLine);

        // 输入/输出节点
        let inNodes = inputs.map((name, idx) => this.addInput(name, titleNode.bottom + this.rowHeight * idx));
        let outNodes = outputs.map((name, idx) => this.addOutput(name, titleNode.bottom + this.rowHeight * idx));

        container.addChildren(inNodes);
        container.addChildren(outNodes);
    }

    // 添加一个'输入'
    addInput(name, top) {
        let node = this.newSlot(name);
        node.type = "slot_input";
        node.setStyles({
            textPosition: 'rm',
            textAlign: 'left',
        });
        node.left = - this.container.width / 2 + 6;
        node.top = top;
        return node;
    }

    // 添加一个'输出'
    addOutput(name, top) {
        let node = this.newSlot(name);
        node.type = "slot_output";
        node.setStyles({
            textPosition: 'lm',
            textAlign: 'right',
        });

        node.right = this.container.width / 2 - 6;
        node.top = top;
        return node;
    }

    // 圆形节点
    newSlot(name) {
        let slotStyle = {
            fillStyle: '#777788',
            textBaseline: 'middle',
            color: '#aaaaaa',
            lineWidth: 1,
            strokeStyle: 'black',
            padding: 4,
            fontSize: '12px'
        }
        let RowHeight = this.rowHeight;

        let node = new EllipseNode(name, 0, 0, RowHeight, RowHeight);
        node.addClass('.tupu_slot');
        node.data = {
            inLinks: [],
            outLins: [],
        };
        node.autoSize = false;
        node.draggable = false;
        node.editable = false;
        node.connectable = false;
        node.setStyles(slotStyle);
        return node;
    }

    /**@static */
    newLink() {
        let tupuLink = new BezierLink(null);
        tupuLink.type = "Tupu_Link";

        let ball = new EllipseNode(null, 0, 0, 10, 12);
        ball.setStyles({
            fillStyle: "#aaaaaa"
        });
        ball.pointerEnabled = false;
        ball.setOriginOnLink(0.5);
        tupuLink.addChild(ball);
        tupuLink.pointerEnabled = false;
        tupuLink.setStyles({
            lineWidth: 4,
            strokeStyle: randomColor(),//"#aaaaaa"
        });
        return tupuLink
    }

    // 增加交互脚本(如果是编辑器需要考虑序列化以后的处理)
    /**@static */
    script(stage, layer) {
        const inputSystem = stage.inputSystem;
        const activedStyle = '#77FF77';
        const unactiveStyle = '#777788';

        let tempLink = null;
        let lineBeginNode;

        function mouseup() {
            let target = inputSystem.target;

            let isSlot = target != null && target.hasClass('.tupu_slot');

            let isDrawBegin = lineBeginNode == null && isSlot && target.type == 'slot_output';
            let isDrawEnd = tempLink != null && isSlot && target.type == 'slot_input';

            let isDrawCancel = target == null || !isSlot || target === lineBeginNode;

            let samePanel = isSlot && lineBeginNode != null && target.parent === lineBeginNode.parent;

            // 划线取消
            if (isDrawCancel || samePanel) {
                if (tempLink) {
                    tempLink.removeFromParent();
                    tempLink = null;
                }

                if (lineBeginNode && !lineBeginNode.isConnected()) {
                    lineBeginNode.setStyles({ fillStyle: unactiveStyle });
                    lineBeginNode = null;
                }

                return;
            }

            // 开始划线
            if (isDrawBegin) {
                lineBeginNode = target;
                lineBeginNode.setStyles({
                    fillStyle: 'blue'
                });
                tempLink = TupuPanel.prototype.newLink();
                lineBeginNode.setStyles({ fillStyle: activedStyle });
                tempLink.setBegin(lineBeginNode.getAnchor('rm'));

                tempLink.setEnd({ x: inputSystem.xInWorld, y: inputSystem.yInWorld });

                if (layer.prepend) {
                    // since:v2.6.17
                    layer.prepend(tempLink);
                } else {
                    layer.addChild(tempLink);
                }

                return;
            }


            // 划线结束
            if (isDrawEnd && !samePanel) {
                lineBeginNode.setStyles({ fillStyle: activedStyle });
                target.setStyles({ fillStyle: activedStyle });
                tempLink.setEnd(target, 'lm');
                tempLink.pointerEnabled = true;
                lineBeginNode = null;
                tempLink = null;
                return;
            }
        }

        function mousemove() {
            if (tempLink) {
                tempLink.setEnd({ x: inputSystem.xInWorld, y: inputSystem.yInWorld });
            }
        }

        function deleteLink() {
            let link = inputSystem.target;
            let isTupuLink = link && link.type == 'Tupu_Link';
            if (!isTupuLink) {
                return;
            }

            let begin = link.begin.host;
            let end = link.end.host;
            link.remove();

            if (!begin.isConnected()) {
                begin.setStyles({ fillStyle: unactiveStyle });
            }
            if (!end.isConnected()) {
                end.setStyles({ fillStyle: unactiveStyle });
            }
        }

        inputSystem.addEventListener('pointerup', mouseup);
        inputSystem.addEventListener('pointermove', mousemove);

        document.addEventListener('keydown', (event) => {
            if (event.key == 'Delete') {
                deleteLink();
            }
        });
    }
}
TupuPanel.prototype.script(stage, layer);

//--- 使用 ----
function newTupuNode(title, width, color) {
    let inputs = [];
    let outputs = [];
    for (let i = 0; i < 6; i++) {
        if (Math.random() >= 0.5) {
            inputs.push("输入-" + i);
        } else {
            outputs.push("输出-" + i);
        }
    }

    let panel = new TupuPanel(title, width, color, inputs, outputs);
    let node = panel.container;

    node.setXY(Math.random() * 300 - Math.random() * 300, Math.random() * 300 - Math.random() * 300);
    layer.addChild(node);
}

// 随机生成5个颜色不同的节点
for (let i = 0; i < 5; i++) {
    newTupuNode('逻辑_' + i, 168 + 5 * i * i, randomColor());
}

stage.show();

