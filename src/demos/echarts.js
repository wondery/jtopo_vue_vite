import {
    Stage, Layer, Node, Shape, CanvasNode, ShapeBuilder
} from '@jtopo/core';
const stage = new Stage('divId');
const layer = new Layer(stage);

// CanvasNode 对象的setCanvas()方法支持传入cavnas
// 理论上支持所有以canvas为渲染目标的第三方库

// 这里以 echart 为例:

// 生成 9张图表
const rows = 3;
const cols = 3;

for (let i = 0; i < cols * rows; i++) {
    const node = new CanvasNode(null, 0, 0, 300, 300);
    node.setStyles({
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
    });

    // echart图的数据(option)
    node.data = {
        option: {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            series: [
                {
                    data: [0,1,2,3,4,5,6].map(n=> Math.random()),
                    type: 'line',
                    stack: 'x'
                },
                {
                    data: [0,1,2,3,4,5,6].map(n=> Math.random() * 0.5),
                    type: 'bar',
                    stack: 'x'
                }
            ]
        }
    };
    layer.addChild(node);

    drawNodesChart(node);
}

// 核心
function drawNodesChart(node) {
    // echarts 本页面已经提前加载
    let myChart = echarts.init(document.createElement('div'));
    myChart.resize({
        width: node.width,
        height: node.height
    });
    myChart.setOption(node.data.option);
    let canvas = myChart.getDom().querySelector('canvas');
    node.setCanvas(canvas);
}

// 布局
const gridPoints = ShapeBuilder.grid(rows, cols);
const layout = stage.layoutSystem.pointsLayout(layer.children, gridPoints);

layout.resize((rows-1)*300, (cols-1)*300);
layout.doLayout({
    effect: 'easeInQuart',
});

stage.show();