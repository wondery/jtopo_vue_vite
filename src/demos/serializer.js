import { Stage, Node, Link, Layer, ImageNode } from '@jtopo/core';
const stage = new Stage('divId');
const layer = new Layer(stage);

// Stage对象的 toJSON() 和 fromJSON() 方法 ，可以保存和加载画面

const fromNode = new ImageNode('From', -100, 0, 50, 50);
fromNode.name = 'jack';
fromNode.setImage('./assets/img/node1.png');

const toNode = new ImageNode('To', 100, 0, 50, 50);
toNode.setImage('./assets/img/node2.png');

const link = new Link('Link', fromNode, toNode);
link.setStyle('borderWidth', 2);

layer.addChild(link);
layer.addChild(fromNode);
layer.addChild(toNode);

let promise = stage.show();

// 等待所有相关图片资源都加载后
promise.then(async () => {
    // 保存为json
    const json = stage.toJSON();

    // 从json中恢复画面
    await stage.fromJSON(json)

    stage.camera.lookAtContentCenter();

    let newLayer = stage.getCurrentLayer();

    // 通过find获取新画面中的对象
    const afterFromNode = newLayer.querySelector('[name="jack"]');
    afterFromNode.text = '双击该节点';

    afterFromNode.addEventListener('dblclick', () => {
        afterFromNode.text = '已双击';
    })
});

