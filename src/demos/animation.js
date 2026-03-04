import {
    Stage, Layer,
    Node, EllipseNode, ImageNode, randomColor, RadialGradient
} from '@jtopo/core';

import { BlinkingArrowNode, WaterLikeNode, RipplingNode } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

const effectSystem = stage.effectSystem;
const animationSystem = stage.animationSystem;

stage.showAxis();
layer.useDarkGridBackground();
stage.styleSystem.setTheme('DefaultDark');

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (event.matches) {
        layer.useDarkGridBackground();
        stage.styleSystem.setTheme('DefaultDark');
    } else {
        layer.useLightGridBackground();
        stage.styleSystem.setTheme('DefaultLight');
    }
});


// -- 跳动的小球
{
    // 径向渐变
    let rg = new RadialGradient(-5, -5, 4, -8, -8, 32);
    rg.setColors([[0, 'white'], [0.5, 'pink'], [1, 'red']]);

    let flashBall = new EllipseNode();
    flashBall.resize(32, 32);
    flashBall.setXY(-250, 0);
    flashBall.setStyles({
        fillStyle: rg
    });
    layer.addChild(flashBall);

    // 跳动
    animationSystem.anime({
        from: 0,
        to: 1,
        update: (n) => {
            flashBall.y = -100 * (1 - n);
        },
        effect: 'easeInQuart',
        duration: 1000,
        times: Infinity,
        direction: 'alternate'
    }).play();
}

// 几根’柱子‘
{
    for (let i = 0; i < 5; i++) {
        let node = new Node('202' + i, -200 + i * 40, -32 / 2, 32, 32);
        node.setStyles({
            border: '1px gray',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            padding: 3,
            fillStyle: randomColor(),
        });
        layer.addChild(node);

        animationSystem.anime({
            from: [node.height + (i * 30), node.y - (i * 30) / 2],
            to: [node.height, node.y],
            update: (arr) => {
                node.height = arr[0];
                node.y = arr[1];
            },
            effect: 'easeInQuart',
            direction: 'alternate',
            times: 20,
            delay: i * 100,
            duration: 5000,
        }).play();
    }
}

{   // '风扇' 旋转
    let fanSvg = `data:image/svg+xml;charset=UTF-8,<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="3" fill="rgba(128,128,128,0.8)"/>
    <path d="M16 16 L16 4 A12 12 0 0 1 28 16 Z" fill="gray" transform="rotate(0, 16, 16)"/>
    <path d="M16 16 L16 4 A12 12 0 0 1 28 16 Z" fill="gray" transform="rotate(120, 16, 16)"/>
    <path d="M16 16 L16 4 A12 12 0 0 1 28 16 Z" fill="gray" transform="rotate(240, 16, 16)"/>
</svg>
`;
    let img = new Image();
    img.src = fanSvg;

    let node = new ImageNode(null, 50, -50, 64, 64);
    node.setImage(img);
    layer.addChild(node);
    animationSystem.anime({
        from: 0,
        to: 2 * Math.PI,
        update: (n) => {
            node.rotate(-n);
        },
        times: Infinity,
        duration: 2000,
    }).play();
}

{
    // '水'
    let waterNode = new WaterLikeNode(null, 200, 0, 60, 120);
    waterNode.setStyles({
        // 设置左下和右下的圆角
        borderRadius: [0, 0, 40, 40],
        textPosition: 'center',
        textAlign: 'center',
    });
    waterNode.bottom = 0;
    layer.addChild(waterNode);

    // '模拟水位变化'
    animationSystem.anime({
        from: 0,
        to: 0.5,
        update: (n) => {
            waterNode.text = Math.round(n * 100) + '%';
            waterNode.ae({ rate: n });
        },
        times: 2,
        duration: 6000,
    }).play();
}

{
    // '水2'
    let waterNode = new WaterLikeNode(null, 300, 0, 80, 80);
    waterNode.setStyles({
        borderRadius: 40,
        fillStyle: 'rgba(128,128,128,0.5)',
        strokeStyle: '#afafaf',
    });
    waterNode.bottom = 0;
    layer.addChild(waterNode);
    animationSystem.anime({
        from: 0,
        to: 1,
        update: (n) => {
            waterNode.ae({ rate: n });
        },
        direction: 'alternate-reverse',
        times: Infinity,
        duration: 5000,
    }).play();
}

// 动画、动效 组成一个’高级‘节点
function addEffectNode(x, y, radius) {
    let circleNode = new EllipseNode(null, x, y);
    layer.addChild(circleNode);
    // 半径
    circleNode.setRadius(radius);
    circleNode.setStyles({
        strokeStyle: 'gray',
        lineWidth: 10,
    });

    // ’内核‘
    let core = new EllipseNode();
    core.pointerEnabled = false;
    core.setRadius(circleNode.radius * 0.4);
    core.setStyles({
        strokeStyle: 'white',
        lineWidth: 4,
        shadowColor: 'white',
        shadowBlur: 4,
    });
    circleNode.addChild(core);

    // '内核2'
    let core2 = new EllipseNode();
    core2.pointerEnabled = false;
    core2.setRadius(circleNode.radius * 0.6);
    core2.setStyles({
        strokeStyle: randomColor(),
        lineWidth: 4,

    });
    circleNode.addChild(core2);

    // 获取‘动效’节点对象
    let aeNode = new RipplingNode();
    aeNode.pointerEnabled = false;

    // '动效'放入
    circleNode.addChild(aeNode);

    effectSystem.flow(circleNode, { lineDash: [20, 22] }).play();
    effectSystem.flow(core, { lineDash: [10, 3], direction: 'anticlockwise' }).play();
    effectSystem.flash(core, { times: 40 }).play();
    return circleNode;
}

{
    let blinkNode = new BlinkingArrowNode(null, -200, 100, 100, 20);
    blinkNode.ae({
        arrowNumbers: 5
    });
    blinkNode.setStyles({
        lineWidth: 2,
        strokeStyle: 'red',
    });
    layer.addChild(blinkNode);
}
{
    let blinkNode = new BlinkingArrowNode(null, 200, 100, 100, 50);
    blinkNode.ae({
        arrowNumbers: 5
    });
    blinkNode.setStyles({
        lineWidth: 8,
        strokeStyle: 'cyan',
    });
    blinkNode.rotate(Math.PI);
    layer.addChild(blinkNode);
}

let circleNode2 = addEffectNode(300, -200, 45);

// 整个画面掉下来的动效
animationSystem.anime({
    from: stage.height * 0.5,
    to: -200,
    update: (n) => {
        // v2.5.0 使用相机，本质上不改变画面元素，只是改变观察视角
        stage.camera.lookAt(0, n);
    },
    times: 1,
    effect: 'easeOutBounce', // '掉落回弹感觉'
}).play();


stage.show();
