// 导入第三方UI库（右侧属性面板）
import * as dat from 'dat.gui'

/**
 * 右侧属性面板（功能极简单、不完善，仅做演示测试是否能正常运行使用）
 */
export class PropertiesPanel {
    editor;
    gui;
    object;
    folders;
    basic;
    style;
    constructor(editor) {
        this.editor = editor;
        this.gui = new dat.GUI();
        this.object;
        this.folders = {};
    }

    /*
     * 设置对象为当前属性面板对象 
     * @param {DisplayObject} object 
     */
    setCurrentObject(object) {
        const editor = this.editor;
        const stage = this.editor.stage;

        // 下面是固定的一些调用
        stage.inputSystem.target = object;
        stage.selectedGroup.removeAll().add(object);
        if (object.isLink) {
            editor.linkCtrlBox.attachTo(object);
        } else if (object.isNode) {
            editor.nodeCtrlBox.attachTo(object);
        }
        editor.update();

        // 自定义显示
        this.showProperty(object);
    }

    showProperty(obj) {
        if (obj == null) {
            return;
        }

        this.basic = {
            'id': obj.id,
            'name': '',
            'x': 1,
            'y': 1,
            'imageSrc': '',
            'width': 1,
            'height': 1,
            'text': '',
            'rotation': 0,
        };

        const stage = this.editor.stage;
        const theme = stage.styleSystem.currentTheme;
        const clazzStyle = theme.getStyle(obj.className) || {};

        this.style = {
            'lineDash': null,
            'backgroundColor': '',
            'textAlign': clazzStyle.textAlign || 'center',
            'textBaseline': clazzStyle.textAlign || 'middle',
            'strokeStyle': clazzStyle.strokeStyle || 'gray',
            'fillStyle': clazzStyle.fillStyle || 'gray',
            'color': clazzStyle.color || '',
            'borderWidth': 0,
            'fontSize': '12px',
            'fontFamily': 'arial',
            'lineWidth': clazzStyle.lineWidth || 0,
            'lineCap': 'butt',
            'globalAlpha': 1,
        };

        const basic = this.basic;
        const style = this.style;

        Object.keys(basic).forEach(function (key) {
            if (obj[key] != null) {
                let value = obj[key];
                basic[key] = value;
            }
        });

        let objComputedStyle = obj.getComputedStyle();
        Object.keys(style).forEach(function (key) {
            let value = objComputedStyle[key];
            if (value != null) {
                style[key] = value;
            }
        });
        if (this.object == null) {
            this.object = obj;
            this.init();
        }
        this.object = obj;

        this.setFolderValues(basic, style);

        if (obj.isNode && this.getFolder('节点属性') != null) {
            this.getFolder('节点属性').show();
            this.getFolder('连线属性').hide();
        } else if (this.getFolder('连线属性') != null) {
            this.getFolder('连线属性').show();
            this.getFolder('节点属性').hide();
        }
    }
    newFolder(name) {
        const folder = this.gui.addFolder(name);
        this.folders[name] = folder;
        return folder;
    }
    getFolder(name) {
        return this.folders[name];
    }
    getCtrollerValue(folderName, name) {
        return this.getCtroller(folderName, name).getValue();
    }
    getCtroller(folderName, name) {
        let controllers = this.getFolder(folderName).__controllers;
        return controllers.find(c => c.property == name);
    }
    setFolderValues(basic, style) {
        let folderNames = Object.keys(this.gui.__folders);
        folderNames.forEach((folderName) => {
            let folder = this.gui.__folders[folderName];
            let controllers = folder.__controllers;
            controllers.forEach(function (ctrl) {
                let property = ctrl.property;
                if (basic[property] != null) {
                    ctrl.setValue(basic[property]);
                } else if (style[property] != null) {
                    ctrl.setValue(style[property]);
                } else {
                }
            });
        });
    }
    init() {
        const self = this;
        const editor = this.editor;
        const stage = editor.stage;
        const basic = this.basic;
        const style = this.style;

        let lineDashMap = {
            '实线': '',
            '虚线1,1': '1,1',
            '虚线2,2': '2,2',
            '虚线3,3': '3,3',
            '虚线7,3': '7,3',
            '虚线3,7': '3,7',
            '虚线10,1': '10,1',
            '虚线1,10': '1,10',
        };

        let fontFamilys = ['Arial', 'serif', 'sans-serif'];
        let lineCapMap = {
            '默认': 'butt',
            '圆形': 'round',
            '矩形': 'square'
        };

        function basicOnChange() {
            let property = this.property;
            let value = this.getValue();
            let object = self.object;
            object[property] = value;
            editor.update();
        }

        function styleOnChange() {
            let property = this.property;
            let value = this.getValue();
            let object = self.object;

            if (property == 'lineDash') {
                if (value == null || value == '') {
                    value = null;
                } else {
                    if (typeof value == 'string') {
                        value = value.split(',');
                    }
                }
            }
            object.setStyle(property, value);
            editor.update();
        }

        const basicFolder = this.newFolder('基础属性');
        basicFolder.add(basic, 'name').onFinishChange(basicOnChange).name('name');
        basicFolder.add(basic, 'text').onFinishChange(basicOnChange).name('文字');
        basicFolder.add(style, 'globalAlpha', 0, 1, 0.1).onChange(styleOnChange).name('整体透明度');
        basicFolder.add(style, 'strokeStyle').onFinishChange(styleOnChange).name('线条颜色');
        basicFolder.open();

        const nodeFolder = this.newFolder('节点属性');
        nodeFolder.add(basic, 'x').onFinishChange(basicOnChange);
        nodeFolder.add(basic, 'y').onFinishChange(basicOnChange);
        nodeFolder.add(basic, 'width', 1).onFinishChange(basicOnChange).name('宽度');
        nodeFolder.add(basic, 'height', 1).onFinishChange(basicOnChange).name('高度');

        nodeFolder.add(style, 'borderWidth', 0, 10).onChange(styleOnChange).name('边框粗细');
        nodeFolder.add(style, 'lineWidth', 0, 10).onChange(styleOnChange).name('线条粗细');
        nodeFolder.add(style, 'lineDash', lineDashMap).onChange(styleOnChange).name('虚实');
        nodeFolder.add(style, 'fillStyle').onFinishChange(styleOnChange).name('填充颜色');
        nodeFolder.open();

        const linkFolder = this.newFolder('连线属性');
        linkFolder.add(style, 'lineWidth', 0, 100).onChange(styleOnChange).name('线条粗细');
        linkFolder.add(style, 'lineDash', lineDashMap).onChange(styleOnChange).name('虚实');
        linkFolder.add(style, 'lineCap', lineCapMap).onChange(styleOnChange).name('末端样式');
        linkFolder.open();

        const fontFolder = this.newFolder('文本');
        fontFolder.add(style, 'fontFamily', fontFamilys).onChange(styleOnChange).name('字体名称');
        fontFolder.add(style, 'fontSize', 1, 1000).onChange(styleOnChange).name('大小');
        fontFolder.add(style, 'color').onChange(styleOnChange).name('颜色');

        fontFolder.open();

        let dom = this.gui.domElement;
        dom.remove();
        stage.layersContainer.appendChild(dom);
        dom.style.position = 'absolute';
        dom.style.right = '-15px';
        dom.style.top = '0px';
        dom.style.zIndex = 1000;
    }
    open() {
        this.gui.open();
    }
    close() {
        this.gui.close();
    }
    hide() {
        this.gui.domElement.style.display = 'none';
    }
    show() {
        this.gui.domElement.style.display = 'block';
    }
}