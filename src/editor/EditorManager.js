import { Stage, Layer, Node, Link, Assets, Shape, VERSION } from '@jtopo/core';
import { Editor } from '@jtopo/editor';

// 左侧图元面板 (这里和在线demo不同，这里使用的是自定义的)
import { IconsPanel } from './IconsPanel';

// 右侧属性面板 (这里和在线demo不同，这里使用的是自定义的)
import { PropertiesPanel } from './PropertiesPanel';

// 工具栏
import { Toolbar } from './Toolbar.js';

/**
 * 
 * 1. 责核心逻辑操作，与UI低耦合
 * 2. 单例/全局变量引用 
 * 
 *  不完善，仅做演示测试能否正常运行使用。
 */
class EditorManager {
    stage;
    layer;
    editor;

    /**
     * 初始化
     */
    init(divObj) {
        // 创建空画面
        const stage = new Stage(divObj);
        const layer = new Layer();
        console.log(VERSION);

        const toolbar = new Toolbar(stage);
        toolbar.showButton('编辑模式');
        toolbar.activeButton('编辑模式');
        toolbar.show();

        /**
         * 显示网格
         */
        stage.showGrid({
            /**
             * 网格背景颜色
             */
            backgroundColor: '#202020',
            /**
             * 小网格大小
             */
            minorSize: 25,
            /**
             * 大网格大小
             */
            majorSize: 100,
            majorColor: '#000000',
            minorColor: 'rgb(15,15,15)',
        });

        stage.styleSystem.setTheme('DefaultDark');
        stage.showAxis();
        stage.addLayer(layer);
        stage.show();

        // 创建编辑器实例
        let editor = new Editor(stage);
        stage.setMode('edit');

        // 保持引用
        this.stage = stage;
        this.layer = layer;
        this.editor = editor;

        this.initEvent();
    }

    initEvent() {
        const stage = this.stage;
        const layer = this.layer;
        const editor = this.editor;

        // 创建左侧的图标面板，并设置图标数据
        let iconPanel = new IconsPanel(stage);
        iconPanel.show();

        // 画布接收到拖拽结束事件时
        editor.on('drop', function () {
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

        // 右侧属性编辑面板
        let propertiesPanel = new PropertiesPanel(editor);

        // 鼠标点中的对象在右侧显示属性面板
        stage.inputSystem.on('pointerdown', function (e) {
            const target = stage.inputSystem.target;
            if (target == null) {
                return;
            }
            propertiesPanel.showProperty(target);
        });

        // 鼠标画出的线类型
        editor.setLinkClassName('AutoFoldLink');

        // 按键切换线型: l : 直连 q: 曲线 b: 贝塞尔 , a: 自动折线
        // TODO: 应该增加菜单或者选项来切换线型
        document.addEventListener('keydown', (event) => {
            if (event.key == 'l') {
                editor.setLinkClassName('Link');
            } else if (event.key == 'q') {
                editor.setLinkClassName('QuadBezierLink');
            } else if (event.key == 'b') {
                editor.setLinkClassName('BezierLink');
            } else if (event.key == 'a') {
                editor.setLinkClassName('AutoFoldLink');
            }
        });

        // 当鼠标画出线时
        editor.on('drawLineStart', (event) => {
            let link = event.object;
            link.css({
                lineWidth: 2,
                strokeStyle: 'gray'
            });
        });

        // 鼠标划线结束
        editor.on('drawLineEnd', (event) => {
            let link = event.object;

            link.text = "Link:" + (Date.now());

            link.css({
                strokeStyle: 'black'
            });
            // 如果按着a键，就增加箭头
            if (editor.keyboard.isKeydown('a')) {
                let endArrow = new Node();
                endArrow.resizeTo(12, 12);
                endArrow.setShape(Shape.Arrow);
                endArrow.css({
                    lineWidth: 2,
                    strokeStyle: 'black'
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
        // editor.openLasted();

        // 去掉自带的编辑器右键菜单
        // editor.popupMenu.remove();
    }
}

// 全局单例
export const editorManager = new EditorManager();