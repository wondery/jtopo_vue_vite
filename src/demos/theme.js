import { Stage, Layer, Node, Link, EllipseNode, ShapeNode , Assets} from '@jtopo/core';

// 点击画布任意位置，切换主题
// 版本最低要求：v2.4.0

const stage = new Stage('divId');
const layer = new Layer(stage);
const styleSystem = stage.styleSystem;

{ // 创建节点和连线，不需要指定任何样式，通过主题来设定
    const node = new Node('Rect', -100, 0);
    node.resize(64, 64);
    layer.addChild(node);

    const node2 = new EllipseNode('ellipse', 100, 0);
    node2.resize(64, 64);
    layer.addChild(node2);

    const link = new Link('Link', node, node2, 'auto', 'auto');
    layer.addChild(link);

    const arrow = new ShapeNode();
    arrow.resize(15, 15);
    arrow.setShape(Assets.getShape('Triangle')); // 三角形
    link.setEndArrow(arrow);
}

// 基于默认主题('DefaultLight')，定义一个新的主题名字叫： MyTheme
let myTheme = styleSystem.defTheme('MyDark', 'DefaultDark');

// 查看定义
console.log(myTheme.getStyle('Node'));
console.log(myTheme.getStyle('Link'));

// 修改部分定义
myTheme.setStyle('Node', {
    borderColor: 'gray',
    borderWidth: 9,
    borderRadius: 3,
    backgroundColor: 'black',
    color: 'white',
    textPosition: 'center',
    textBaseline: 'middle',
    lineWidth: 0,
});
myTheme.setStyle('EllipseNode', {
    strokeStyle: 'gray',
    lineWidth: 9,
    fillStyle: 'black',
    textPosition: 'center',
    textBaseline: 'middle',
});
myTheme.setStyle('Link', {
    strokeStyle: 'gray',
    lineWidth: 3,
});
// Link上的标签
myTheme.setStyle('Link.Label', {
    fontSize: '12px',
    fontWeight: 'bold italic',
    color: 'gray',
});
// Link上的箭头
myTheme.setStyle('Link.Arrow', {
    strokeStyle: 'gray',
    fillStyle: 'gray'
});


// 基于MyTheme 再定义一个主题
let MyLight = styleSystem.defTheme('MyLight', 'DefaultLight');
MyLight.setStyle('Node', {
    fillStyle: '#008bcf',
});
MyLight.setStyle('EllipseNode', {
    fillStyle: '#008bcf',
});
MyLight.setStyle('Link', {
    strokeStyle: 'orange',
    lineWidth: 3,
});
MyLight.setStyle('Link.Label', {
    color: '#008bcf',
    fontWeight: 'normal',
});
MyLight.setStyle('Link.Arrow', {
    strokeStyle: 'orange',
    fillStyle: 'orange',
    lineWidth: 3,
});

stage.show();

// 点击事件
stage.inputSystem.addEventListener("click", () => {
    if (styleSystem.currentTheme.name == 'MyDark') {
        styleSystem.setTheme('MyLight');
    } else {
        styleSystem.setTheme('MyDark');
    }
});

