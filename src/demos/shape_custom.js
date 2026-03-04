import { Stage, Layer, Node, RegSystem, ShapeNode, RectShape } from '@jtopo/core';
import { Toolbar, AssetsLoader } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);
const toolbar = new Toolbar(stage);
toolbar.show();

class RatioShape extends RectShape {
    constructor() {
        super(); // 必须
    }

    /**
     * 绘制方法 (纯函数)
     * @param ctx canvas绘图上下文
     * @param node Node对象
     */
    draw(ctx, node) {
        // 节点基础属性
        const width = node.width;
        const height = node.height;

        // 这里定义ratio取值为 0-1, 代表 0%-100%
        // 读取自定义属性:ratio, 未定义时默认0.5
        let ratio = node.getAttribute('ratio') || 0.5;

        // 读取样式（主题、class样式、css层叠计算后的最终结果)
        let style = node.getComputedStyle();

        // 考虑边框和空隙（border 和 padding）
        let borderWidth = style.borderWidth || 0;
        let padding = style.padding || 0;
        let totalPadding = (padding * 2) + (borderWidth * 2);

        // 计算填充矩形的开始坐标x、y 
        let x = borderWidth + padding;
        let y = borderWidth + padding;

        // 计算尺寸
        let fillWidth = (width - totalPadding) * ratio;
        let fillHeight = (height - totalPadding) * ratio;

        fillHeight = height - totalPadding;

        // 当前原点0,0在对象的中心，向左上偏移: - (width * 0.5), - (height * 0.5)
        // 绘制
        ctx.beginPath();
        ctx.rect(x - (width * 0.5), y - (height * 0.5), fillWidth, fillHeight);
        ctx.fill();
    }
}

// 如果需要序列化（需要注册该类）, 包名、类名、类
RegSystem.regClass('com.mycompany.app', 'RatioShape', RatioShape);

// 使用
let shape = new RatioShape();
let node = new ShapeNode('动态', 0, 0, 128, 42);
node.setShape(shape); // 可被多个node共享，不用每次new

node.setStyles({
    borderColor: '#cccccc',
    borderRadius: 2,
    borderWidth: 4,
    fillStyle: 'green',
    padding: 2
});
layer.addChild(node);

// 动画：不断修改自定义属性ratio
stage.animationSystem.anime({
    from: 0,
    to: 1,
    update: (n) => {
        // 设置自定义属性
        node.setAttribute('ratio', n);
    },
    times: Infinity
}).play();

stage.show();

window.RegSystem = RegSystem;