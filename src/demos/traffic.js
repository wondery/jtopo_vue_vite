import {
    Stage, Layer, Node, EllipseNode, TextNode, Link, NodeHelper,
} from '@jtopo/core';
import { Tooltip,Toolbar } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

const toolbar = new Toolbar(stage);
toolbar.show();

stage.showAxis();

const nodes = [];
const links = [];

// 站点样式
stage.styleSystem.defClass('.station', {
    fillStyle: 'white'
});

function draw(data) {
    // 站点标签
    data.labels.forEach(function (label) {
        let node = new TextNode(label.text, label.x, label.y);
        node.pointerEnabled = false;
        nodes.push(node);
    });

    // key: 站点id， value：Node对象
    const stationMap = new Map();

    //  圆形站点
    data.stations.forEach(function (station) {
        let node = new EllipseNode(null, station.x, station.y, 12, 12);
        node.addClass('.station');
        nodes.push(node);

        node.data = station;

        // key: 站点id， value：Node对象
        stationMap.set(station.id, node);
    });

    // 线路
    data.lines.forEach((line, index) => {
        let preNode = null;

        line.stations.forEach(function (idOrObj, sIndex) {
            const id = idOrObj.id ? idOrObj.id : idOrObj;

            let nextNode = stationMap.get(id);
            if (preNode == null) {
                preNode = nextNode;
                return;
            }

            const link = new Link(null, preNode, nextNode);

            link.title = line.name + ' 号线';

            link.setStyles({
                lineWidth: 8,
                strokeStyle: line.color
            });

            if (index % 2 === 0) {
                stage.effectSystem.flow(link).play();
            }
            links.push(link);
            preNode = nextNode;
        });
    });

    layer.addChildren(links);
    layer.addChildren(nodes);
}

// 加载数据，完成后调用draw绘制
fetch('./assets/data/Shanghai_Metro.json')
    .then(response => response.json())
    .then(draw)
    .then(() => {
        stage.show();
        stage.showOverview();
        stage.camera.lookAtContentCenter();
    })

// 鼠标指向小提示
const tooltip = new Tooltip(stage);

// 添加交互事件
stage.inputSystem.addEventListener('pointermove', () => {
    // 获取鼠标经过的对象
    let target = stage.inputSystem.mouseoverTarget;

    if (target instanceof Node) {
        // 增加鼠标悬信息浮框
        let input = stage.inputSystem;

        // 获取节点上的数据
        let data = target.data;

        tooltip.setHtml(`
            <div>站点信息:
            <ul style="padding-left:20px">
                <li>状态 : <span style="color:green;">良好</span></li>
                <li>name : <span style="color:orange;">${data.name}</span></li>
                <li>参数2 : <span style="color:red;">456</span></li>
                <li>参数3 : <span style="color:blue;">xxx</span></li>
            </ul>
            </div>`);
        // +5 ,防止遮挡住鼠标
        tooltip.showAt(input.x + 5, input.y + 5);
    }
});
