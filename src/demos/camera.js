import {
    Stage, Layer, Node, QuadBezierLink, EllipseNode,
    BezierLink
} from '@jtopo/core';

// 相机对象有lookAt()、zoom()方法，方便控制‘视角’。

const stage = new Stage('divId');
const layer = new Layer(stage);
const camera = stage.camera;
stage.showAxis();

layer.useDarkGridBackground();

// 曲线
let link = new BezierLink(null, { x: -300, y: 100 }, { x: 300, y: -100 });
link.setStyles({
    lineWidth: 30,
    lineCap: 'round',
    strokeStyle: 'gray',
});
layer.addChild(link);

// 小球
let ball = new EllipseNode(null, 0, 0, 20, 20);
ball.draggable = false;
ball.setStyles({
    strokeStyle: 'gray',
    fillStyle: '#efefef',
    lineWidth: 1,
});
window.ball = ball;
layer.addChild(ball);

// 动画
stage.animationSystem.anime({
    from: 0,
    to: 1,
    duration: 10000,
    times: 5,
    effect: 'easeInOutQuad',
    direction: 'alternate',
    update: (n) => {
        // 更新'小球'在连线上的位置
        let p = link.getPoint(n);
        ball.setXY(p.x, p.y);

        // 相机始终看向小球的中心
        // 和FSP游戏一个道理，用食指按住小球感受一下
        camera.lookAt(ball.x, ball.y);
        camera.zoom(1 + n);
    }
}).play().then(() => {
    console.log('end')
});

stage.setMode('view');
stage.show();
