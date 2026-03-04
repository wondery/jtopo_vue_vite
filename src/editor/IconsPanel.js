
import { IconsPanelConfig } from './IconsPanelConfig';

/**
 * 编辑器左侧的图片面板，功能极简单、不完善，仅做演示使用。
 */
export class IconsPanel{
    stage;
    domElement;
    dargItem;

    constructor(stage) {
        this.stage = stage;
        this.domElement;
        this.initDom();
        this.hide();

        // 加载配置数据
        this.setConfig(IconsPanelConfig);
    }
    initDom() {
        let panel = document.createElement('div');
        panel.classList.add('jtopo_iconsPanel');
        this.stage.layersContainer.appendChild(panel);
        this.domElement = panel;
        return this;
    }
    hide() {
        this.domElement.style.display = 'none';
        return this;
    }
    show() {
        this.domElement.style.display = 'block';
        return this;
    }
    /**
     * 获取当前被拖拽的项
     * @returns 
     */
    getDragItem(){
        return this.dargItem;
    }
    setConfig(data) {
        let self = this;

        data.items.forEach(function(config){
            let item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = config.iconHtml;

            //@ts-ignore
            item.setAttribute('draggable', true);

            // 拖拽开始
            item.ondragstart = function (e) {
                self.dargItem = config;
            };

            self.domElement.appendChild(item);
        });
        return this;
    }
    
}
export {
    IconsPanel as
    default
};