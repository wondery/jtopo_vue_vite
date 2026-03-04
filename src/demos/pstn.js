import {
    Stage, Layer, Node, Link, TipNode, randomColor,
    LShapeLink, ImageNode, HtmlNode
} from '@jtopo/core';

import { RipplingNode, Toolbar } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);
const toolbar = new Toolbar(stage);
toolbar.show();

const nodes = [];
const links = [];

function node(x, y, img, name) {
    const node = new ImageNode(name);
    node.setImage('./assets/img/pstn/' + img, true);
    node.translate(x, y);
    nodes.push(node);
    return node;
}

function linkNode(nodeA, nodeZ, text) {
    const link = new LShapeLink(text, nodeA, nodeZ);
    link.setStyles({
        'lineWidth': 3,
        'strokeStyle': randomColor()
    });
    links.push(link);
    return link;
}

const s1 = node(-387, -72, 'satellite_antenna.png', 'Satellitte Feed');
const s2 = node(-379, 23, 'antenna.png', 'Off air');
const s3 = node(-379, 138, 'msc.png', 'Programing');

const r1 = node(-293, -83, 'router.png');
const r2 = node(-293, -63, 'router.png');
const r3 = node(-293, -43, 'router.png');
const r4 = node(-293, -63, 'router.png');
const r5 = node(-293, 0, 'router.png', 'Encoder');
const r6 = node(-193, 0, 'router.png', 'Scrambler');

const linkr16 = linkNode(r1, r6);
linkNode(r2, r6);
linkNode(r3, r6);
linkNode(r4, r6);
linkNode(r5, r6);


const r7 = node(-293, 67, 'router.png');
const r8 = node(-293, 87, 'router.png');
linkNode(r7, r6);
linkNode(r8, r6);

const dataCloud = node(-100, 0, 'cloud.png');
links.push(new Link(null, dataCloud, r6));

const tw130 = node(0, 0, 'tw130.png');
links.push(new Link(null, tw130, dataCloud));

const pstn = node(-100, 100, 'cloud.png');
linkNode(pstn, tw130);

// WDM
const wdm = node(89, 0, 'wdm.png', 'WDM');
links.push(new Link(null, wdm, tw130));

const testing = node(132, 0, 'testing.png');
links.push(new Link(null, testing, wdm));

const wdm2 = node(171, 0, 'wdm.png', 'WDM');
links.push(new Link(null, wdm2, testing));

const mainframe = node(218, 39, 'mainframe.png');
linkNode(mainframe, wdm2);

const phone = node(302, 60, 'phone.png', 'Phone');
linkNode(phone, mainframe);

const host = node(294, 112, 'host.png', 'Pc');
linkNode(host, mainframe);

const router2 = node(270, 169, 'router2.png', 'STB');
linkNode(router2, mainframe);

const terminal = node(233, 213, 'terminal.png', 'IPTV/SDV');
linkNode(terminal, router2);

const modem = node(187, -64, 'modem.png', 'Modem');
const pc = node(306, -106, 'host.png');
const router3 = node(235, -40, 'router2.png');
const terminal3 = node(300, -13, 'terminal.png');

linkNode(pc, modem);
linkNode(router3, modem);
linkNode(terminal3, router3);

layer.addChildren(links);
layer.addChildren(nodes);

stage.show();


// 表格
let htmlNode = new HtmlNode(null, 0, 225, 160, 100);
htmlNode.setHtml(`
    <style>
        table {
            font-size: 12px;
            width: 100%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: left;
        }
        th {
            background-color:#2775B6;
            color:white;
        }
    </style>
    <table>
        <thead>
            <tr>
                <th>告警设备</th>
                <th>指标</th>
                <th>阈值</th>
            </tr>
        </thead>
        <tbody>
            <tr style="color:red">
                <td>WDM</td>
                <td>20</td>
                <td>30</td>
            </tr>
            <tr>
                <td>Encoder</td>
                <td>21</td>
                <td>31</td>
            </tr>
            <tr>
                <td>STB</td>
                <td>22</td>
                <td>32</td>
            </tr>
        </tbody>
    </table>
`);
layer.addChild(htmlNode);


// ------ 下面的动画、动效 可有可无-------
// 延迟1秒后添加告警节点
setTimeout(() => {
    const alarm = new TipNode("一级告警");
    alarm.pointerEnabled = false;
    alarm.setStyles({
        padding: 3,
        fillStyle: 'red'
    });
    alarm.bottom = -wdm.height;
    alarm.x = -wdm.width/2;
    wdm.addChild(alarm);
    wdm.setStyles({
        filter: 'invert(30%)',
        color: 'red'
    });
    stage.effectSystem.flash(alarm, { tiems: 10, duration: 2000 }).play();

    // 动效
    const aeNode = new RipplingNode(null);
    aeNode.pointerEnabled = false;
    aeNode.resize(60, 60);
    aeNode.ae({
        color: 'orange'
    });
    phone.addChild(aeNode);
}, 900);


const link = links[4];
link.setStyles({
    'strokeStyle': 'red'
});

// 线条流动动效
stage.effectSystem.flow(link).play();

// 给连线打一个标记效果
linkr16.setStyles({ strokeStyle: 'red' });
stage.effectSystem.linkMark(linkr16, {
    // 符号
    text: '💢️',
    // 字体
    font: '16px serif',
});

// 给标记添加点击事件
const flashMarkNode = stage.effectSystem.linkMark(link, {
    // 闪电符号
    text: '⚡️',
    font: '22px serif',
});
flashMarkNode.addEventListener('click', () => {
    alert('查看/弹出闪电详情');
});

