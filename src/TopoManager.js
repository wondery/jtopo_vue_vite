import { Stage, Layer, Node, Link, VERSION } from '@jtopo/core';
import { dataService } from './DataService';
import * as ext from '@jtopo/extensions';

/**
 * 该类只关心如何绘制
 * 
 * 不关心数据加载和处理
 * 
 * 依赖一个div对象
 */
class TopoManager {
    stage;
    layer;

    /**
     * 初始化，创建一个空画布
     * @param {*} divObj 
     */
    init(divObj) {
        const stage = new Stage(divObj);
        const layer = new Layer(stage);

        console.log(VERSION);

        stage.showAxis();

        stage.show();

        this.stage = stage;
        this.layer = layer;

        this.initEvent();

        // 加载数据并绘制
        let data = dataService.loadData();
        this.render(data);
    }

    // 事件处理初始化
    initEvent() {
        const stage = this.stage;
        const layer = this.layer;

        const inputSystem = stage.inputSystem;

        inputSystem.on('click', () => {
            let xyInLayer = {
                x: layer.mouseX,
                y: layer.mouseY
            };
            console.log('鼠标在layer中的坐标', xyInLayer);

            let xyInCanvas = {
                x: inputSystem.x,
                y: inputSystem.y
            };
            console.log('鼠标在屏幕（画布）上的坐标', xyInCanvas);

            let target = inputSystem.target;
            if (target == null) {
                return;
            }
            console.log('点中了一个对象', target.text);
        });
    }

    /**
     * 根据传入的业务数据制图
     * @param {*} data 业务数据
     */
    render(data) {
        const stage = this.stage;
        const layer = this.layer;

        //TODO: 根据data 来绘制
        const fromNode = new Node('From', -100, 0, 40, 40);
        const toNode = new Node('To', 100, 0, 40, 40);

        // 设置节点填充颜色
        fromNode.setStyles({
            fillStyle: 'orange',
            font: 'bold 12px arial',
        });

        toNode.setStyles({
            fillStyle: 'blue',
        });

        const link = new Link('Link', fromNode, toNode);
        layer.addChild(link);
        layer.addChildren([fromNode, toNode]);

        fromNode.on('mousedown', () => {
            fromNode.text = 'mousedown';
        });
    }
}
export const topoManager = new TopoManager();