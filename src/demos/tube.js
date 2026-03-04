import {
    Stage, Layer, Node, Link, StylePattern, BezierLink, QuadBezierLink 
} from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

layer.useDarkGridBackground();
stage.styleSystem.setTheme('DefaultDark');

// 多条Link组合可以实现多种效果

// 可以模拟：道路、管道、水路、传送带、电子电路 等

// 本例使用 3条Link的 叠加 组合 
function combLink(typeClass, begin, end, colors) {
    const link1 = new typeClass(null, begin, end);
    link1.setStyles({
        strokeStyle: colors[0],
        lineWidth: 22
    });
    const link2 = new typeClass(null, link1, link1, 'begin', 'end');
    link2.setStyles({
        strokeStyle: colors[1],
        lineWidth: 15
    });
    const link3 = new typeClass(null, link1, link1, 'begin', 'end');
    link3.setStyles({
        strokeStyle: colors[2],
        lineWidth: 3,
        lineDash: [20, 30],
    });

    link2.pointerEnabled = false;
    link3.pointerEnabled = false;

    layer.addChildren([link1, link2, link3]);

    stage.effectSystem.flow(link3).play();

    // 底层 、中层、上层
    return [link1, link2, link3];
}

let noname = combLink(Link, { x: -300, y: -360 }, { x: 300, y: -360 }, ['white', 'gray', 'white']);
let transporter = combLink(Link, { x: -300, y: -250 }, { x: 300, y: -250 }, ['orange', 'gray', 'white']);
let river = combLink(QuadBezierLink, { x: -300, y: -80 }, { x: 300, y: -170 }, ['white', 'green', '#eeeeee']);
let tube = combLink(BezierLink, { x: -300, y: 0 }, { x: 300, y: 100 }, ['orange', 'gray', 'white']);
let road = combLink(Link, { x: -300, y: 200 }, { x: 300, y: 200 }, ['#eeeeee', 'gray', 'white']);
let transporter2 = combLink(Link, { x: -300, y: 300 }, { x: 300, y: 300 }, ['orange', 'rgba(0,255,0,0.8)', 'white']);

noname[0].setStyles({
    lineCap: 'square'
});
noname[2].setStyles({
    lineWidth: 60,
    lineDash: [2, 100], 
});

transporter[0].setStyles({
    lineCap: 'round',
    lineWidth: 30,
});
transporter[1].setStyles({
    lineDash: [3, 5], 
});
// 逆向
stage.effectSystem.flow(transporter[1], {
    direction: 'reverse',
}).play();
transporter[2].setStyles({
    lineWidth: 14,
    lineDash: [20, 200],
});


tube[0].setStyles({
    // 圆头
    lineCap: 'round',
});
tube[1].setStyles({
    lineCap: 'round'
});
tube[2].setStyles({
    lineCap: 'round',
    lineWidth: 14,
    lineDash: [3, 50], 
});

road[1].setStyles({
  strokeStyle: new StylePattern('./assets/img/pattern.jpg', 'repeat'),
});

river[2].setStyles({
   lineDash: [10, 10], 
});

transporter2[0].setStyles({
    lineWidth: 10,
});

let animation = stage.effectSystem.flow(transporter2[1], {
    direction: 'reverse',
});
animation.play();

transporter2[1].setStyles({
    lineCap: 'round',
    lineWidth: 20,
    lineDash: [20, 60],
})

stage.show();