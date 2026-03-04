import { Stage, Layer, Node, randomColor } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);

let mapNode;
let appleNode;
let snakeNodes = [];

// 地图小格子尺寸
const size = 20;

// 地图尺寸
const map = {
    rows: 20,
    cols: 20,
    width: 20 * size,
    height: 20 * size
};

// 移动增量
let speed = {
    dx: size,
    dy: 0
};

function idxToXY(row, col) {
    return {
        x: col * size - (map.width * 0.5) + size * 0.5,
        y: row * size - (map.height * 0.5) + size * 0.5,
    };
}

function initMap() {
    mapNode = new Node('点击开始', 0, 0, size * map.cols, size * map.rows);
    mapNode.draggable = false;
    mapNode.setStyles({
        border: '1px solid gray',
        strokeStyle: 'black',
        textPosition: 'ct',
        textAlign: 'center',
        textBaseline: 'bottom',
        font: 'bold 14px arial'
    });

    appleNode = new Node('', 0, 0, size, size);
    appleNode.setStyles({ 'backgroundColor': 'red' });

    appleNode.draggable = false;

    layer.addChild(mapNode);
    mapNode.addChild(appleNode);

    for (let i = 0; i < 5; i++) {
        let bodyNode = newBodyNode();

        if (i == 0) {
            bodyNode.setStyles({
                'background': '#009A93'
            });
        }
    }
}

function initSnake() {
    for (let i = 0; i < snakeNodes.length; i++) {
        let node = snakeNodes[i];

        let row = 0;
        let col = snakeNodes.length - i;

        let p = idxToXY(row, col);
        node.x = p.x;
        node.y = p.y;
    }
}

function newBodyNode() {
    let bodyNode = new Node();
    bodyNode.draggable = false;
    bodyNode.setStyles({
        fillStyle: randomColor()
    });
    bodyNode.resize(size, size);
    snakeNodes.push(bodyNode);
    mapNode.addChild(bodyNode);
    return bodyNode;
}

let tailXY;

function growup() {
    let newTail = newBodyNode();
    newTail.resize(size, size);
    newTail.x = tailXY.x;
    newTail.y = tailXY.y;
}

function forward() {
    let length = snakeNodes.length;
    // 记录尾巴坐标
    tailXY = {
        x: snakeNodes[length - 1].x,
        y: snakeNodes[length - 1].y,
    };
    for (let i = length - 1; i > 0; i--) {
        snakeNodes[i].x = snakeNodes[i - 1].x;
        snakeNodes[i].y = snakeNodes[i - 1].y;
    }
    snakeNodes[0].x += speed.dx;
    snakeNodes[0].y += speed.dy;
}

function hasTouchApple() {
    return (snakeNodes[0].x == appleNode.x && snakeNodes[0].y == appleNode.y);
}

function randomApple() {
    let p = idxToXY(Math.floor(Math.random() * map.rows), Math.floor(Math.random() * map.cols));

    appleNode.x = p.x;
    appleNode.y = p.y;

    let head = snakeNodes[0];
    let isTouchHead = appleNode.x == head.x && appleNode.y == head.y;
    while (isTouchHead || isTouchBody(appleNode)) {
        p = idxToXY(Math.floor(Math.random() * map.rows), Math.floor(Math.random() * map.cols));
        appleNode.x = p.x;
        appleNode.y = p.y;
    }
}

function isDead() {
    let head = snakeNodes[0];
    if (head.x < mapNode.left || head.x > mapNode.right) {
        return true;
    }
    if (head.y < mapNode.top || head.y > mapNode.bottom) {
        return true;
    }
    return isTouchBody(head);
}

function isTouchBody(p) {
    for (let i = 1; i < snakeNodes.length; i++) {
        let e = snakeNodes[i];
        if (p.x == e.x && p.y == e.y) {
            return true;
        }
    }
    return false;
}

function initKeyboard() {
    document.addEventListener('keydown', function (event) {
        event.preventDefault();

        let code = event.code;
        if (code == 'ArrowDown' && speed.dy != -size) {
            speed.dx = 0;
            speed.dy = size;
        } else if (code == 'ArrowLeft' && speed.dx != size) {
            speed.dx = -size;
            speed.dy = 0;
        } else if (code == 'ArrowUp' && speed.dy != size) {
            speed.dx = 0;
            speed.dy = -size;
        } else if (code == 'ArrowRight' && speed.dx != -size) {
            speed.dx = size;
            speed.dy = 0;
        }
    });
}

let timer = null;

function gameOver() {
    speed = {
        dx: size,
        dy: 0
    };
    window.clearInterval(timer);
    mapNode.text = '游戏结束';
}

initKeyboard();
initMap();

initSnake();

mapNode.addEventListener('click', function () {
    if (mapNode.text == '点击开始' || mapNode.text == '游戏结束') {
        start();
    }
});

function start() {
    mapNode.text = '键盘方向键控制';

    initSnake();
    randomApple();

    timer = setInterval(function () {
        forward();

        if (hasTouchApple()) {
            growup();
            randomApple();
        }

        if (isDead()) {
            gameOver();
        }

        layer.update();

    }, 300); // 速度
}

stage.show();