import {
    Assets, EllipseNode, Layer, Node, PathLink, Rectangle, ShapeBuilder, ShapeNode,
    Stage, randomColor
} from '@jtopo/core';
import { Toolbar, TopoRobot } from '@jtopo/extensions';

import { Transporter } from './demos/Transporter.js';

/** 
 * jtopo提供了一个抽象的'机器人'，行为贴合人类直觉。
 * 
 * 机器人可以移动、前进、左转、右转、朝向、放下物体等操作。
 * 
 * 可以携带一个或多个物体, 被携带的物体坐标和旋转角度会始终和机器人保持一致。
 * 
 * 适合模拟一些会移动的物体，如：机器人、车辆、搬运工等。
 * 
 * 从很大程度上降低了坐标计算和动画制作的难度。
 */

const stage = new Stage('divId');
const layer = new Layer(stage);
new Toolbar(stage).show();
layer.setBackground({
    background: 'radial-gradient(ellipse at center,rgba(63,65,68,1) 0%,rgba(0,0,0,1) 100%)'
});
stage.styleSystem.defClass('.box', {
    strokeStyle: 'gray',
});
stage.styleSystem.defClass('.path', {
    strokeStyle: 'rgba(128,128,128,0.5)',
    lineWidth: 6,
    lineDash: [5, 3],
});
stage.show();

let boxSize = 70;

/** 箱子最终摆放的区域和位置 */
let boxArea = new Rectangle(-150, -90, 200, 400);
let boxPositions = ShapeBuilder.grid(5, 2).map((p) => ({
    x: boxArea.x + p.x * boxArea.width * 0.5 - boxArea.width * 0.25,
    y: boxArea.y + p.y * boxArea.height * 0.5 - boxArea.height * 0.25
}));

// 创建 5 * 2 个箱子
let boxs = [];

for (let i = 0; i < 5; i++) {
    let w = 40;
    let h = 40;
    let leftGrid = new Node(null, 0, 0 + i * boxSize, w, h);
    let rightGrid = new Node(null, 0, 0 + i * boxSize, w, h);
    leftGrid.name = 'box_left_' + i;
    rightGrid.name = 'box_right_' + i;
    leftGrid.setStyles({
        fillStyle: 'rgba(128,128,128,0.2)',
    });
    leftGrid.addClass('.box');
    rightGrid.addClass('.box');
    leftGrid.draggable = false;
    rightGrid.draggable = false;
    layer.addChild(leftGrid);
    layer.addChild(rightGrid);
    boxs.push(leftGrid);
    boxs.push(rightGrid);
}


// '传送带'
let transporter = new Transporter(stage, { x: -300, y: 400 }, { x: -300, y: -400 });
// 把箱子放到传送带上
transporter.putGoodsOn(boxs);
// 启动传送带
transporter.run();

// 从传送带上取下来的箱子
let emptyBoxs = [];

setTimeout(async () => {
    let robot = createRobot(stage, 'gray'); // 所有动作会瞬间完成
    let anim = robot.animator; // 动画控制器 (所有动作都有一个持续时间)
    let box;
    let i = 0;

    // 从传送带上取下‘箱子’, 直到取完
    while (box = transporter.takeOffGoods()) {
        // 面朝箱子
        await anim.faceTo(box, { duration: 300 });
        // 移动到箱子位置
        await anim.moveTo(box);

        // 拿起箱子(直接拿起, 没动画,瞬间完成)
        robot.carry(box);

        // 放到预先设定的位置
        let targetXY = boxPositions[i++];
        await anim.faceTo(targetXY, { duration: 300 });
        await anim.moveTo(targetXY);

        // 放下箱子
        robot.putDown(box);

        // 摆正箱子
        box.rotate(0);

        emptyBoxs.push(box);
    }

    // 全部结束后回到原点(不带动画，瞬间完成)
    robot.moveTo(0, 0).faceTo(1, 0);

    // 停止传送带
    transporter.stop();

}, 10);

{
    // 创建红绿小球
    let balls = [];
    for (let i = 0; i < 10; i++) {
        let good = randomBalls(0, 200, i % 2 === 0 ? 'green' : 'red');
        balls.push(good);
    }

    // 创建运动路径
    let path = [
        { x: 0, y: 100 },
        { x: 0, y: 150 },
        { x: -150, y: 150 },
        { x: -150, y: -200 }
    ];
    function createPath(path) {
        const link = new PathLink();
        link.draggable = false;
        link.addClass('.path');
        link.setPath(path);
        layer.addChild(link);
        return link;
    }
    createPath(path);

    // 搬运小球到空箱里
    async function moveGoods(robot, path, balls) {
        let anim = robot.animator; // 动画

        for (let i = 0; i < balls.length; i += 2) {
            // 绿色物品1
            let greenBall = balls[i];
            // 红色物品2
            let redBall = balls[i + 1];

            // 移动到 物品1 位置 并 拿起
            await anim.faceTo(greenBall, { duration: 300 });
            await anim.moveTo(greenBall, { duration: 300 });

            robot.carry(greenBall);

            // 面朝物品2
            await anim.faceTo(redBall, { duration: 300 });

            // 拿起（不走过去，直接‘吸’过来）
            await anim.carry(redBall, { effect: 'easeInOutQuart' });

            // 按照路径移动到目的地
            for (let j = 0; j < path.length - 1; j++) {
                let point = path[j];
                robot.faceTo(point);
                await anim.moveTo(point, { duration: 300 });
            }

            // 取出准备一个好的箱子
            let box = emptyBoxs.shift();

            // 箱子面前
            let boxFront = { x: robot.x, y: box.y };
            await robot.faceTo(boxFront);
            await anim.moveTo(boxFront);

            // 面朝目的地
            robot.faceTo(box);
            // 物品1 扔到箱子里
            await anim.throwTo(greenBall, box, { duration: 300, effect: 'easeOutBounce' });
            // greenBall.changeParent(box);

            // 再取出一个准备好的箱子
            box = emptyBoxs.shift();
            await anim.faceTo(box);
            await anim.throwTo(redBall, box, { duration: 300, effect: 'easeOutBounce' });
            // redBall.changeParent(box);

            // 按照路径返回
            for (let j = path.length - 2; j >= 0; j--) {
                let point = path[j];
                robot.faceTo(point);
                await anim.moveTo(point, { duration: 300, effect: 'easeLinear' });
            }
        }
    }
    // 灰色机器人
    let robot = createRobot(stage, 'gray');
    setTimeout(() => {
        moveGoods(robot, path, balls);
    }, 2000);
}


// 创建一个‘机器人’实例
function createRobot(stage, color) {
    // 一个实体身体
    let body = new ShapeNode(null, 0, 0, 40, 20);
    body.setShape(Assets.getShape('Triangle'));
    body.setStyles({
        fillStyle: color,
    });
    layer.addChild(body);

    let robot = new TopoRobot(stage);
    robot.setBody(body); // 设置身体, 否则就是完全透明/隐形的
    return robot;
}

function randomBalls(min, max, color) {
    let ball = new EllipseNode(null, 0, 0, 16, 16);
    ball.setXY(rand(min, max), rand(min, max));
    ball.name = color;
    ball.setStyles({
        fillStyle: ball.name,
        globalAlpha: 0.68
    });
    layer.addChild(ball);
    return ball;
}

// 度数转弧度
function degToRad(deg) {
    return deg * Math.PI / 180;
}
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// 蓝色机器人(在右上角区域干活)
setTimeout(async () => {
    let area = new Node('区域1', 0, 0, 100, 100);
    area.top = -stage.height / 2 + 30;
    area.right = stage.width / 2;
    area.draggable = false;

    area.setStyles({
        strokeStyle: 'gray',
        lineDash: [5, 5],
        color: 'gray',
        textOffsetY: 3
    });
    layer.addChild(area);

    // 创建3*5的网格, 生成堆垛的位置
    let gridPoints = ShapeBuilder.grid(3, 5).map((p) => ({
        x: area.left + 10 + p.x * 70,
        y: area.top + 10 + p.y * 70
    }));

    // 机器人3
    let robot = createRobot(stage, '#008bcf');
    let anim = robot.animator; // 动画


    for (let i = 0; i < gridPoints.length; i++) {
        let ball = randomBalls(50, 100, randomColor());
        ball.setXY(300, 0);

        await anim.faceTo(ball, { duration: 300 });
        await anim.moveTo(ball);
        robot.carry(ball);

        let p = gridPoints[i];
        await anim.faceTo(p, { duration: 300 });
        await anim.moveTo(p, { duration: 300 });

        robot.putDown(ball);

        ball.changeParent(area);
    }
    area.draggable = true;
}, 10);
