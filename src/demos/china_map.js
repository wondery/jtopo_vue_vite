import {
    Stage, Layer, Node, BezierLink, randomColor, GeomUtils, PolygonShape, ShapeNode
} from '@jtopo/core';
import { Tooltip, Toolbar } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

const toolbar = new Toolbar(stage); 
toolbar.show();

stage.styleSystem.defClass('.area', {
    'textPosition': 'center',
    'textBaseline': 'middle',
    'color': 'white',
    'font': '3px arial',
    'lineJoin': 'round',
    'lineWidth': 1,
});

const nodeMap = {};

// 地图局部(数据来自互联网)
// 绘制
function draw(data) {
    data.features.forEach(function (feature) {
        var properties = feature.properties;
        var name = properties.name;
        var type = feature.geometry.type;

        if (type == 'Polygon') {
            var coordinates = feature.geometry.coordinates[0];
            addShapeNode(name, coordinates, properties);
        } else if (type == 'MultiPolygon') {
            var coordinatesArr = feature.geometry.coordinates[0];
            coordinatesArr.forEach(function (coordinates) {
                addShapeNode(name, coordinates, properties);
            });
        }
    });
    stage.show();
    stage.camera.lookAtContentCenter();
    stage.showOverview();

    addLink('北京', '河南', 'orange');
    addLink('河南', '山东', 'orange');
    addLink('山东', '上海', 'orange');

    addLink('河南', '云南', 'orange');
    addLink('河南', '宁夏', 'orange');

    addLink('四川', '青海', 'blue');
    addLink('青海', '新疆', 'blue');
}

function addShapeNode(name, coordinates, properties) {
    // 数据格式从[x,y], 形式转成 {x:n,y:n}
    const points = coordinates.map(function (c) {
        return { x: c[0], y: -c[1]};
    });

    // 获取点坐标集合的包围盒矩形
    const rect = GeomUtils.getBoundingBox(points);
    const center = rect.getCenter();
    
    // 根据shape创建Node
    let shapeNode = new ShapeNode(name);
    shapeNode.draggable = false;
    shapeNode.data = properties;

    // 原始数据很小，这里放大10倍
    shapeNode.resize(rect.width * 10, rect.height * 10);
    shapeNode.translate(center.x * 10, center.y * 10);

    // 归一化
    const normalizedPoints = GeomUtils.normalizePoints(points);

    // 生成shape
    const shape = new PolygonShape(normalizedPoints);
    shapeNode.setShape(shape);

    shapeNode.addClass('.area');
    shapeNode.setStyles({
        'fillStyle': randomColor()
    });

    // 调整文本不齐的地方， demo简单，不去自动计算了
    if (name == '内蒙古') {
        shapeNode.setStyles({ textOffsetY: 30 });
    }
    if (name == '河北') {
        shapeNode.setStyles({ textOffsetX: -10 });
    }
    if (name == '甘肃') {
        shapeNode.setStyles({ textOffsetY: -10 });
    }
    nodeMap[name] = shapeNode;
    // 增加鼠标悬信息浮框
    addTooltip(shapeNode);

    layer.addChild(shapeNode);
}

function addLink(from, to, color) {
    const fromNode = nodeMap[from];
    const toNode = nodeMap[to];
    const name = '';

    const link = new BezierLink(name, fromNode, toNode);
    link.setStyles({
        'strokeStyle': color,
        'lineDash': [6, 2]
    });
    link.pointerEnabled = false;
    layer.addChild(link);

    flowLink(link);
}


// 加载数据，完成后调用draw绘制
fetch('./assets/data/china_map.json')
    .then(response => response.json())
    .then(draw);


// 连线流动
function flowLink(link) {
    let offset = 0;
    setInterval(function () {
        if (++offset > 16) offset = 0;

        link.setStyles({
            lineDashOffset: -offset
        });

        layer.update();
    }, 1000 / 24);
}


// ---------- 下面是增加交互，可有可无 ----------
// 鼠标放到节点上，会出现一个漂浮的信息框
const tooltip = new Tooltip(stage);
tooltip.setHtml();

function addTooltip(node) {
    const data = node.data;
    const input = stage.inputSystem;

    node.addEventListener('pointermove', function (event) {
        let html = `
        <div>业务信息:
        <ul style="padding-left:20px">
            <li>地区 : <span style="color:green;">${data.name}</span></li>
            <li>参数 : <span style="color:orange;">123</span></li>
            <li>参数2 : <span style="color:red;">456</span></li>
            <li>参数3 : <span style="color:blue;">xxx</span></li>
        </ul>
        </div>`;
        tooltip.setHtml(html);
        tooltip.showAt(input.x, input.y);
    });
}