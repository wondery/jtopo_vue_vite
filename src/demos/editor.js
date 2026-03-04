import { Stage, Layer, Node, Shape, Assets, ShapeNode, Link } from '@jtopo/core';
import { Editor } from '@jtopo/editor';
import { AssetsLoader } from '@jtopo/extensions';

// UI组件(工具栏、左侧图标面板、右侧属性面板）
// 可查看源码，参考、修改
import { Toolbar } from './lib/Toolbar.js';
import { IconsPanel } from './lib/IconsPanel.js';
import { PropertiesPanel } from './lib/PropertiesPanel.js';

/*
jtopo提供了编辑器的基础功能，该demo以极简的方式演示核心功能。

实际项目中UI部分需要根据项目需求做扩展和定制。

快捷键：(仅当鼠标在画布上时有效)
    1. ctrl+c/v/x 、delete    ：复制 、粘贴、剪切、删除
    2. ctrl+z 、ctrl+shift+z  ：撤销、重做
    3. ctrl+a             : 全选
    4. ctrl+i             : 反向全选
    5. ctrl+s             : 临时保存浏览器缓存（关闭后仍然存在）
    6. ctrl+o             : 加载最后一次的临时保存内容 
    7. 方向键：            : 微调所有选中节点的坐标
    8. h                 : 隐藏/显示 右侧属性栏
  
鼠标：
    1. 左键：选择节点 或 框选多个 (按住ctrl增加选中或者剔除选中)
    2. 右键拖拽：拖拽画布 (若有浏览器的鼠标手势，需禁用)
    3. 滚轮：缩放
    5. 按住Ctrl，可以画线到连线上任意位置 和 节点边框任意位置
    5. 按住Alt，拖拽节点时不显示自动对齐线，拖拽更自由。
    6. 双击对象，修改文字（输入时ctrl+回车换行, 回车确认）
    7. "/" 进入或退出选定对象的"本地模式"(仅显示选定对象及其子对象)

保存打开本地:
    1. 工具栏最右侧两个按钮

操作系统：
    MacOS系统下: 把ctrl换成cmd
    1. cmd + backspace  : 和delete一样是删除

UI定制扩展：
    左侧图标栏 和 右侧属性修改栏 耦合极低，可以替换成自定义的。
*/

let stage = new Stage('divId');
let layer = new Layer(stage);

stage.showAxis();
stage.show();

const toolbar = new Toolbar(stage);
toolbar.showButton('编辑模式');
toolbar.activeButton('编辑模式');
toolbar.show();

let editor = new Editor(stage);
stage.setMode('edit');

// 方便调试
window.editor = editor;
window.stage = stage;
window.layer = layer;

// 左侧图元面板配置
const leftPanelConfig = {
    items: [
        {
            name: '矩形',
            className: 'Node',
            iconHtml: `
                <svg width="100%" height="100%">
                <rect width="30" height="22" x="6" y = "9"
                stroke="black" stroke-width="1" fill="white"/>
                </svg>
            `,
            properties: {
                text: '文字',
                width: 100,
                height: 50
            }
        },
        {
            name: '圆形',
            className: 'EllipseNode',
            iconHtml: `
            <svg width="100%" height="100%">
            <circle cx="20" cy="20" r="15" 
                stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                text: '圆形',
                width: 50,
                height: 50,
            }
        },
        {
            name: '三角形',
            shape: 'Triangle',
            iconHtml: `
            <svg width="100%" height="100%">
                <polygon points="20,0 40,40 0,40" stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                text: '圆形',
                width: 50,
                height: 50,
            }
        },
        {
            name: '菱形',
            shape: 'Diamond',
            iconHtml: `
            <svg width="100%" height="100%">
                <polygon points="20,0 40,20 20,40 0,20" stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                text: '圆形',
                width: 50,
                height: 50,
            }
        },
        {
            name: 'AND',
            shape: 'demo.electrical.logic_gates.AND',
            iconHtml: `AND`,
        },
        {
            name: 'JK Flip-Flop With SR',
            shape: 'demo.electrical.logic_gates.JK Flip-Flop With SR',
            iconHtml: `JK Flip-Flop With SR`,
        },
        {
            name: '直线',
            className: 'Link',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="21" x2="35" y2="21" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '直线',
            },
            styles: {
                'lineWidth': 1,
            }
        },
        {
            name: '折线',
            className: 'AutoFoldLink',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="10" x2="30" y2="10" stroke="black" stroke-width="1"/>
            <line x1="30" y1="10" x2="30" y2="35" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '折线',
            },
            styles: {
                'lineWidth': 1,
            }
        },

        {
            name: '文字',
            className: 'TextNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                文字
            </div>`,
            properties: {
                text: '文本文字',
                width: 80,
                height: 50,
                autoSize: false,
                autoDirection: false,// 允许旋转
            },
            styles: {
                font: 'bold 12px arial',
                color: 'gray',
            }
        },
        {
            name: '单元',
            className: 'ImageNode',
            iconHtml: `<img width="100%" style="padding:2px;" src="./assets/img/unit.png"/>`,
            properties: {
                text: '单元',
                width: 50,
                height: 50,
                image: './assets/img/unit.png'
            }
        },
        {
            name: '涟漪动效',
            className: 'com.jtopo.extensions.RipplingNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                涟漪
            </div>`,
            styles: {
                'lineWidth': 5,
                'strokeStyle': 'red',
            },
            properties: {
                width: 50,
                height: 50,
            }
        },
        {
            name: '液体动效',
            className: 'com.jtopo.extensions.WaterLikeNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                液体
            </div>`,
        },
        {
            name: '闪烁指示动效',
            className: 'com.jtopo.extensions.BlinkingArrowNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                指示
            </div>`,
            properties: {
                text: '闪烁',
                width: 100,
                height: 50,
            },
            styles: {
                'lineWidth': 5,
                'strokeStyle': 'green',
            }
        }
        // sprite、html-node、chart图表等
    ]
};

// 加载行业图元库（定制)
let libs = [
    // 电力
    '/shapes/instruments.xml',
    //逻辑电路
    '/shapes/logic_gates.xml',
];
let promiseArr = libs.map(url => fetch(url)
    .then(res => res.text())
    .then(xmlContent => {
        AssetsLoader.fromXml(xmlContent);
    }));
await Promise.all(promiseArr);


// 创建左侧的图标面板，并设置图标数据
let iconPanel = new IconsPanel(stage, editor);
iconPanel.setConfig(leftPanelConfig).show();

// 右侧属性编辑面板
let datGui = dat; //dat第三方库: dat.GUI.js
let propertiesPanel = new PropertiesPanel(editor, datGui);

// 画布接收到拖拽结束事件时
editor.addEventListener('drop', function () {
    // 获取左侧面板拖拽'项'对应的配置
    const configItem = iconPanel.getDragItem();
    let instance;

    // 如果拖拽过来的是图标库里的图片
    if (configItem.shape) {
        instance = editor.create("ShapeNode");
        let shape = Assets.getShape(configItem.shape);
        instance.setShape(shape);
        instance.resize(shape.width, shape.height);
        instance.text = shape.className;
    } else {
        instance = editor.create(configItem.className);
    }

    // 初始化属性 和 样式
    if (configItem.properties) {
        Object.assign(instance, configItem.properties);
    }
    if (configItem.styles) {
        instance.setStyles(configItem.styles);
    }
});

// 鼠标点中的对象在右侧显示属性面板
stage.inputSystem.addEventListener('pointerdown', function (e) {
    const target = stage.inputSystem.target;
    if (target == null) {
        propertiesPanel.showProperty(stage.getCurrentLayer());
        return;
    }
    propertiesPanel.showProperty(target);
});

// 当鼠标画出的线类型
editor.setLinkClassName('AutoFoldLink');

// 按键切换线型: l : 直连 q: 二次贝塞尔曲线 b: 贝塞尔 , a: 自动折线
document.addEventListener('keydown', (event) => {
    if (event.key == 'l') {
        editor.setLinkClassName('Link');
    } else if (event.key == 'q') {
        editor.setLinkClassName('QuadBezierLink');
    } else if (event.key == 'b') {
        editor.setLinkClassName('BezierLink');
    } else if (event.key == 'a') {
        editor.setLinkClassName('AutoFoldLink');
    } else if (event.key == 'c') {
        editor.setLinkClassName('ArcLink');
    }
});

// 当鼠标画出线时
editor.addEventListener('linkbegin', (event) => {
    let link = event.target;
    link.setStyles({
        lineWidth: 1
    });
});

// 鼠标划线结束
editor.addEventListener('linkend', (event) => {
    let link = event.target;

    // 如果按着a键，就增加箭头
    if (editor.keyboard.isKeydown('a')) {
        let endArrow = new ShapeNode();
        endArrow.resize(12, 12);
        endArrow.setShape(Assets.getShape('Arrow'));
        endArrow.setStyles({
            lineWidth: link.getStyle('lineWidth')
        });
        link.setEndArrow(endArrow);
    }
    console.log('划线结束');
});

// 左下角显示缩略图
stage.showOverview({
    left: 0,
    bottom: -1
});

// 打开最后一次保存
editor.openLasted();

/**
 * 显示网格背景
 */
stage.showGrid({
    minorColor: 'rgb(15,15,15)',
    majorColor: '#000000',
    backgroundColor: '#202020',
});

// 设置对齐网格大小（根据背景网格大小） 
// 如果节点的宽或者高正好是25的整倍数，效果会更好
editor.config.align.gridSize = 25;
