import { Stage, Layer, Node, Link, Shape, randomColor, EllipseNode, } from '@jtopo/core';


const stage = new Stage('divId');
var layer = new Layer(stage);
// stage.styleSystem.setTheme('DefaultLight');

stage.show();

stage.styleSystem.defClass('.ball', {
    textPosition: 'center',
    textBaseline: 'middle',
    strokeStyle: 'rgba(0,0,0,0.3)',
    font: '8px arial',
    // color: 'white'
});

function addNode(text) {
    var x = Math.random() * 300 - Math.random() * 300;
    var y = Math.random() * 300 - Math.random() * 300;

    var node = new EllipseNode(text, x, y);
    // node.text = node.id;
    node.setRadius(8);
    node.addClass('.ball');
    node.setStyles('fillStyle' , 'gray');
    layer.addChild(node);
    return node;
}

function addLink(nodeA, nodeZ) {
    var link = new Link('', nodeA, nodeZ);
    link.setStyles({
        lineWidth: 1
    });
    layer.addChild(link);
    return link;
}

function gen(parentNode, deep, maxDeep) {
    var n = 5;
    for (var i = 0; i < n; i++) {
        if (Math.random() < 0.2) {
            continue;
        }
        var node = addNode(deep + '-' + i);
        addLink(parentNode, node);

        if (deep < maxDeep) {
            if (deep > 1 && Math.random() < 0.5) {
                continue;
            }
            gen(node, deep + 1, maxDeep);
        }
    }
}

for (let i = 0; i < 3; i++) {
    var rootNode = addNode('G-' + i);
    gen(rootNode, 1, 3);
}


let graphSystem = stage.graphSystem;
let graphArr = graphSystem.objectsToGraphs(layer.children);
console.log('连同图的数量', graphArr.length);

let colors = ['orange', 'blue', 'white', 'pink', '#3586E3'];

function effect1(layout, angleOffset) {
    stage.animationSystem.anime({
        from: [0, 1, 1],
        to: [2 * Math.PI, layout.width, layout.height],
        duration: 3000,
        effect: 'easeInOutSine',
        update: (arr) => {
            let angle = arr[0];
            let x = stage.width / 3 * Math.cos(angle + angleOffset);
            let y = stage.height / 3 * Math.sin(angle + angleOffset);

            layout.resize(arr[1], arr[2]);
            layout.translate(x, y);
            layout.doLayout();
        }
    }).play();
}

graphArr.forEach((graph, i) => {
    let color = colors[i];

    graph.edges.forEach(e => {
        let link = e.object;
        link.setStyles('strokeStyle', color);
    });

    let layout = stage.layoutSystem.circleLayout(graph, {
        // 布局参数
        radius: 180,
        radiusScale: 0.5,
        endAngle: 2 * Math.PI
    });

    layout.doLayout();
    effect1(layout, 2 * Math.PI / graphArr.length * i);

    // layout.doLayout({
    //     // 动画
    //     effect: 'easeOutBounce',
    //     onEnd: () => {
    //         effect1(layout, i * Math.PI);
    //     }
    // });
});