import { Stage, Node, ShapeBuilder, TextNode, Layer } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

// 文字定位由三个属性：1. 位置 2. 文本对齐方式 2. 文本基线
// 教程：https://www.jtopo.com/doc/tutorial_textposition.html
// 参考：HTML5-Canvas：https://www.w3school.com.cn/tags/canvas_textbaseline.asp

/*
 * 位置表示： 水平（left、center、right） 垂直（top、middle、bottom）
 * lt : left-top	左上
 * ct : center-top  正上
 * rt : right-top   右上
 
 * lm : left-middle  左中
 * center : center   正中-中心
 * rm : right-bottom 右中
 * 
 * lb : left-bottom   左下
 * cb : center-bottom 正下
 * rb : right-bottom  右下
 * 
 */
const positions = [
    'lt', 'ct', 'rt',
    'lm', 'center', 'rm',
    'lb', 'cb', 'rb'
];

const textAligns = ['center', 'left', 'right'];
const textBaselines = ['top', 'middle', 'bottom'];

stage.styleSystem.defClass('.default', {
    strokeStyle: 'gray',
    font: 'normal 16px 宋体',
    backgroundColor: 'rgba(255,255,255,0.2)'
});


for (let i = 0; i < positions.length; i++) {
    for (let a = 0; a < textAligns.length; a++) {
        for (let b = 0; b < textBaselines.length; b++) {
            let node = new Node('田', 0, 0, 40, 40);

            node.addClass('.default');
            node.setStyles({
                textPosition: positions[i],
                textAlign: textAligns[a],
                textBaseline: textBaselines[b],
            });
            node.draggable = false;
            // 更细致的控制：水平和垂直方向的偏移量。
            //node.setStyles({
            //     textOffsetX: 5,
            //     textOffsetY : 5
            // });

            const title = 'textPosition: ' + node.getStyle('textPosition') + '\n' +
                'textAlign:      ' + node.getStyle('textAlign') + '\n' +
                'textBaseline: ' + node.getStyle('textBaseline');

            // 鼠标指向显示文字
            node.title = title;

            layer.addChild(node);
        }
    }
}

let nodes = layer.getChildren();
let layout = stage.layoutSystem.pointsLayout(nodes, ShapeBuilder.grid(9, 9));
layout.resize(9 * 50, 9 * 50);
layout.doLayout();

stage.show();