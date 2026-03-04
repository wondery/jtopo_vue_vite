import { Stage, Layer, randomColor, Node, EllipseNode, Link } from '@jtopo/core';

const stage = new Stage('divId');
stage.styleSystem.setTheme('DefaultDark');

const layer = new Layer(stage);
layer.useDarkGridBackground();
stage.showAxis();

// 根节点
let node = new Node("极坐标演示", 0, 0, 400, 400);
node.setStyles({
    lineWidth: 0,
    textOffsetY: 15,
    font: "bold 24px",
});
layer.addChild(node);

// 极坐标（角度、半径） -> {x, y}
function polarToXY(angle, radius) {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
    };
}

// 同心圆环
let circleList = [];
let ballList = [];
const count = 8;
const gap = 25;
for (let i = 0; i < count; i++) {
    let radius = ((i + 1) * gap);
    var circle = new EllipseNode();
    circle.setRadius(radius);

    circle.setStyles({
        lineWidth: 1,
        strokeStyle: '#5a8cb8',
        lineDash: [6, 2]
    });
    circle.pointerEnabled = false;

    // 在圆环上加1个点, 角度随机
    let ball = new EllipseNode();
    ball.setRadius(10);

    // 角度，半径 -> 坐标
    let p = polarToXY(2 * Math.PI * Math.random(), radius);
    ball.setXY(p.x, p.y);

    ball.setStyles({
        fillStyle: randomColor()
    });
    ballList.push(ball);
    circle.addChild(ball);

    node.addChild(circle);

    circleList.push(circle);
}


//---- 添加直线
const lastCircle = circleList[circleList.length - 1];

function newLink(angle, radius, text1, text2) {
    let from = new EllipseNode(text1);
    from.setRadius(0);

    let p = polarToXY(angle, radius);
    from.setXY(p.x, p.y);

    from.setStyles({
        backgroundColor: randomColor()
    });
    lastCircle.addChild(from);

    let to = new EllipseNode(text2);
    to.setRadius(0);

    p = polarToXY(angle - Math.PI, radius);
    to.setXY(p.x, p.y);

    to.setStyles({
        backgroundColor: randomColor()
    });
    lastCircle.addChild(to);

    let link = new Link('', from, to);
    link.setStyles({
        border: 'solid 1px #5a8cb8',
        lineDash: [6, 2]
    });
    lastCircle.addChild(link);
    return [from, to, link];
}
// 四条直线
newLink(0, lastCircle.radius, '3:00', '9:00');
newLink(-Math.PI / 4, lastCircle.radius, '1:30', '19:30');
newLink(-Math.PI / 2, lastCircle.radius, '12:00', '6:00');
newLink(-Math.PI * (3 / 4), lastCircle.radius, '10:30', '4:30');


// -------- 效果和动画 
let [from, to, link] = newLink(-Math.PI * (3 / 4), lastCircle.radius);
from.setXY(0, 0);
link.setStyles({
    lineWidth: 3,
    strokeStyle: 'pink',
    lineDash: null,
});

let ball = ballList[3];
ball.setStyles('fillStyle', 'pink');

// 动画
stage.animationSystem.anime({
    from: 0,
    to: Math.PI,
    direction: 'alternate',
    duration: 3000,
    times: Infinity,
    update: (n) => {
        let p = polarToXY(n, 160);
        to.setXY(p.x, p.y);

        let p2 = polarToXY(-n, 100);
        ball.setXY(p2.x, p2.y);
    }
}).play();

stage.show();