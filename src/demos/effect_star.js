import { Stage, Layer, EllipseNode, Node, RadialGradient, randomColor } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);
layer.setStyles({
    backgroundColor: 'black'
});
stage.showAxis();
stage.show();

// 本例演示了Node节点draw函数的自定义
// 本例中只有Node对象，没有创建Link对象。

function range(min, max) {
    return min + Math.random() * (max - min);
}
function distance(a, z) {
    return Math.sqrt((z.x - a.x) * (z.x - a.x) + (z.y - a.y) * (z.y - a.y));
}
function clamp(min, max, n) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
}
const w2 = stage.width * 0.5;
const h2 = stage.height * 0.5;
const minDist = 120;

// 生成小球
let balls = [];

// 需要计算任意两个小球间的距离, 算法复杂度较高 O(n^2)，数量不能太多
for (let i = 0; i < 100; i++) {
    // 渐变
    let rg = new RadialGradient(0, 0, 2, 0, 0, 9);
    rg.setColors([
        [0, 'white'],
        [0.2, 'rgba(255,255,255,0.5)'],
        [0.3, randomColor()],
        [1, 'rgba(5, 39, 175,0.02)']
    ]);

    let ball = new EllipseNode(null, 0, 0, 18, 18);
    ball.setStyles({
      	lineWidth: 0,
        fillStyle: rg, //'rgba(255,255,255,0.7)',
    });
    ball.x = range(-w2, w2);
    ball.y = range(-h2, h2);
    ball.data = {
        // 初始化带方向的速度
        speed: [range(-1, 1), range(-1, 1)],
        weight: 0
    };
    balls.push(ball);
}

let lines = [];
let node = new Node(null, 0, 0, stage.width, stage.height);

// 这里完全重写了Node的绘制方法
node.draw = function (ctx) {
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,' + line[4] + ')';
        ctx.moveTo(line[0], line[1]);
        ctx.lineTo(line[2], line[3]);
        ctx.stroke()
    }
}
layer.addChild(node);
layer.addChildren(balls);

function animate() {
    lines = [];

    for (let i = 0; i < balls.length; i++) {
        let node = balls[i];
        let data = node.data;
        let speed = data.speed;

        // 沿着当前方向前进 ( 带一定的摩擦力)
        node.x += speed[0] * 0.8;
        node.y += speed[1] * 0.8;

        // 碰壁方向改变
        if (node.x > w2 || node.x < -w2) {
            speed[0] = - speed[0];
        }
        if (node.y > h2 || node.y < -h2) {
            speed[1] = - speed[1];
        }

        // 靠近鼠标会被吸引
        // let mouseX = stage.inputSystem.xInWorld;
        // let mouseY = stage.inputSystem.yInWorld;
        // let distMouse = distance(node, { x: mouseX, y: mouseY });
        // if (distMouse < minDist) {
        //     node.x += (mouseX - node.x) / distMouse;
        //     node.y += (mouseY - node.y) / distMouse;
        // }

        data.weight = 0;

        // 计算任意两个小球间的距离, 小于某个数值就划线
        for (let j = 0; j < balls.length; j++) {
            if (i == j) {
                continue;
            }
            let node2 = balls[j];
            let dist = distance(node, node2);

            if (dist <= minDist) {
                // 靠近的权重大
                data.weight += 0.4;
                let alpha = 1 - clamp(0, minDist, dist) / minDist;
                lines.push([node.x, node.y, node2.x, node2.y, alpha]);
            }
        }

        // 权重越大,节点尺寸越大
        if (data.weight > 1) {
            node.scale(data.weight, data.weight);
        } else {
            node.scale(1, 1);
        }
    }
    
    requestAnimationFrame(animate);
}
animate();

stage.setMode('drag');

// 双击全屏
stage.inputSystem.addEventListener('dblclick', ()=>stage.fullScreen());