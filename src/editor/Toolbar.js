
/**
 * 工具条
 * <p> 通过按钮触发来调用stage的方法来完成下面的功能: </p>
 * <p> 设置操作模式（默认、框选、编辑、拖拽、查看、锁定） </p>
 * <p> 控制放大、缩小、居中、导出 等</p>
 * 
```js
// 显示
// 工具栏
const toolbar = new Toolbar(stage);

toolbar.show();

// 隐藏
toolbar.hide();
```
*/
export class Toolbar {
    /**
     * 下载时，是否将图标内联到json
     */
    constructor(stage) {
        this.stage = stage;
        this.imageToBase64 = true;
        this.initToolbar(stage, getToolbarHtml());
        stage.domElement.prepend(this.getDom());

        let self = this;
        setTimeout(function () {
            self.initActiveStatus();
        }, 200);
    }

    /**
     * 显示某个按钮
     * @param title 按钮元素的title属性
     */
    showButton(title) {
        let btn = this.domObj.querySelector(`button[title="${title}"]`);
        if (btn != null) {
            btn.style.display = 'block';
        }
    }
    /**
     * 隐藏某个按钮
     * @param title 按钮元素的title属性
     */
    hideButton(title) {
        let btn = this.domObj.querySelector(`button[title="${title}"]`);
        if (btn != null) {
            btn.style.display = 'none';
        }
    }
    getDom() {
        return this.domObj;
    }
    /**
     * 显示
     */
    show() {
        this.domObj.style.display = 'block';
    }
    /**
     * 隐藏
     */
    hide() {
        this.domObj.style.display = 'none';
    }
    remove() {
        this.domObj.remove();
    }

    initActiveStatus() {
        let mode = this.stage.mode;
        if (mode == 'edit') {
            let btn = document.querySelector("button[iconid='edit']");;
            this.activeButton(btn);
        }
    }

    initToolbar(stage, html) {
        let self = this;
        let div = document.createElement('div');
        this.domObj = div;
        div.classList.add('jtopo_toolbar');
        div.innerHTML = html;

        let buttons = div.querySelectorAll('button');
        this.buttons = buttons;

        let fileInput = div.querySelector('input[type="file"]');
        let fileParent = fileInput.parentNode;

        function fileChange(event) {
            //替换掉老的，否则不触发change
            fileParent.innerHTML = '<input type="file"/>';
            initFileEvent();

            let file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = function () {
                try {
                    const json = JSON.parse(this.result);
                    self.stage.fromJSON(json).then(() => {
                        document.title = file.name;
                    });
                } catch (e) {
                    console.log(e);
                    alert('加载出现错误');
                }
            };
        }

        function initFileEvent() {
            fileInput = div.querySelector('input[type="file"]');
            fileInput.addEventListener('change', fileChange);
        }
        initFileEvent();

        this.fileInput = fileInput;


        function doSearch() {
            let layer = stage.getCurrentLayer();

            // @ts-ignore
            let content = div.querySelector('input[type="text"]').value;

            if (content.length > 0) {
                let object = layer.querySelector(function (obj) {
                    return obj.text != null && obj.text.indexOf(content) != -1;
                });
                if (object) {
                    stage.camera.lookAtObject(object);
                    stage.effectSystem.flash(object).play();
                }
            }
        }

        let handlerMap = {
            'cursor': function () {
                stage.setMode('normal');
            },
            'rectangle': function () {
                stage.setMode('select');
            },
            'pan': function () {
                stage.setMode('drag');
            },
            'edit': function () {
                stage.setMode('edit');
            },
            'lock-alt': function () {
                stage.setMode('view');
            },
            'eye': function () {
                if (stage.overview == null || stage.overview.visible == false) {
                    stage.showOverview();
                } else {
                    stage.hideOverview();
                }
            },
            'zoom-in': function () {
                stage.camera.zoomIn();
            },
            'zoom-out': function () {
                stage.camera.zoomOut();
            },
            'back-left': function () {
                stage.camera.lookAt(0, 0);
                stage.camera.zoom(1);
            },
            'minimise': function () {
                stage.camera.zoomToFit();
            },
            'align-center': function () {
                stage.camera.lookAtContentCenter();
            },
            'maximise': function () {
                stage.fullWindow();
            },
            'image': function () {
                stage.saveImageInfo();
            },
            'save': async function () {
                let fileName = prompt('要保存的文件名：');
                let imageToBase64 = self.imageToBase64;

                if (fileName != null) {
                    if (imageToBase64) {
                        stage.toJSONWithBase64().then(json => {
                            let context = JSON.stringify(json);
                            stage.download(fileName + '.json', context);
                        });
                    } else {
                        let json = stage.toJSON();
                        let context = JSON.stringify(json);
                        stage.download(fileName + '.json', context);
                    }
                }
            },
            'upload': function () {
                fileInput.click();
            },
            'search': doSearch
        };

        // @ts-ignore
        div.querySelector('input').onkeydown = function (e) {
            if (e.key == 'Enter') {
                doSearch();
            }
        };

        function addHandler(btn) {
            btn.onclick = function () {
                let content = btn.getAttribute('iconId');
                handlerMap[content]();
                self.activeButton(btn);
            };
        }

        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons[i];
            addHandler(btn);
        }
    }
    /**
     * 激活某个按钮
     * @param btnOrTitle j
     */
    activeButton(btnOrTitle) {
        let btn = btnOrTitle;

        if (typeof btnOrTitle == 'string') {
            btn = this.domObj.querySelector(`button[title="${btnOrTitle}"]`);
        }

        let group = btn.getAttribute('group');
        if (group != null) {
            this.removeAllActive(group);
            btn.classList.add('active');
        }
    }
    removeAllActive(group) {
        let buttons = this.buttons;
        for (let i = 0; i < buttons.length; i++) {
            let btn = buttons[i];
            if (group != btn.getAttribute('group')) {
                continue;
            }
            btn.classList.remove('active');
        }
    }
}


function getToolbarHtml() {
    return `
<div class="group">
<button title="默认" class="item active" group='mode' iconId='cursor'>${getIconHtml('cursor')}</button>
<button title="编辑模式" edit="true" class="item" group='mode' iconId='edit' style="display:none">${getIconHtml('edit')}</button>
<button title="框选模式" class="item" group='mode' iconId='rectangle'>${getIconHtml('rectangle')}</button>
<button title="拖拽模式"  class="item" group='mode' iconId='pan'>${getIconHtml('pan')}</button>
<button title="锁定模式" class="item" group='mode' iconId='lock-alt'>${getIconHtml('lock-alt')}</button>
</div>
<div class="group">
<button title="放大"  class="item" iconId='zoom-in'>${getIconHtml('zoom-in')}</button>
<button title="缩小"  class="item" iconId='zoom-out'>${getIconHtml('zoom-out')}</button>
<button title="居中" class="item" iconId='align-center'>${getIconHtml('align-center')}</button>
<button title="缩放至画布" class="item" iconId='minimise'>${getIconHtml('minimise')}</button>
<button title="取消缩放" class="item" iconId='back-left'>${getIconHtml('back-left')}</button>
</div>
<div class="group">
<button title="缩略图" class="item" iconId='eye'>${getIconHtml('eye')}</button>
<button title="浏览器全屏" class="item" iconId='maximise'>${getIconHtml('maximise')}</button>
<input title="查找" type="text" placeholder="查找" value=""></input>
<button class="item" iconId='search'>${getIconHtml('search')}</button>
</div>
<div class="group">
<button title="导出PNG" class="item" iconId='image'>${getIconHtml('image')}</button>
<button title="打开本地文件" class="item" iconId='upload'>${getIconHtml('upload')}</button>
<button title="保存到本地" class="item" iconId='save'>${getIconHtml('save')}</button>
<div style="display:none;"><input type="file"/></div>
</div>
`;
}

//toolbar icons
let svgIcons = `
<svg viewBox="0 0 24 24" id="zoom-in">
<path d="M4,20 L9.58788778,14.4121122"/>
<path d="M14,16 C10.6862915,16 8,13.3137085 8,10 C8,6.6862915 10.6862915,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,13.3137085 17.3137085,16 14,16 Z"/>
<path d="M16.6666667 10L11.3333333 10M14 7.33333333L14 12.6666667"/>
</svg>
<svg viewBox="0 0 24 24" id="zoom-out">
<path d="M14,16 C10.6862915,16 8,13.3137085 8,10 C8,6.6862915 10.6862915,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,13.3137085 17.3137085,16 14,16 Z"/>
<path d="M16.6666667 10L11.3333333 10M4 20L9.58788778 14.4121122"/>
</svg>
<svg viewBox="0 0 24 24" id="back-left">
<path d="M5,17 L5,15 C5,10.0294373 8.80557963,6 13.5,6 C18.1944204,6 22,10.0294373 22,15"/>
<polyline points="8 15 5 18 2 15"/>
</svg>
<svg viewBox="0 0 24 24" id="align-center">
<path d="M8 10L16 10M6 6L18 6M6 14L18 14M8 18L16 18"/>
</svg>
<svg viewBox="0 0 24 24" id="edit">
<path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"/>
</svg>
<svg viewBox="0 0 24 24" id="lock-alt">
<rect width="14" height="10" x="5" y="11"/>
<path d="M12,3 L12,3 C14.7614237,3 17,5.23857625 17,8 L17,11 L7,11 L7,8 C7,5.23857625 9.23857625,3 12,3 Z"/>
<circle cx="12" cy="16" r="1"/>
</svg>
<svg viewBox="0 0 24 24" id="lock-open">
<path d="M7,7.625 L7,7 C7,4.23857625 9.23857625,2 12,2 L12,2 C14.7614237,2 17,4.23857625 17,7 L17,11"/>
<rect width="14" height="10" x="5" y="11"/>
</svg>
<svg viewBox="0 0 24 24" id="pan">
<path d="M20,14 L20,17 C20,19.209139 18.209139,21 16,21 L10.0216594,21 C8.75045497,21 7.55493392,20.3957659 6.80103128,19.3722467 L3.34541668,14.6808081 C2.81508416,13.9608139 2.94777982,12.950548 3.64605479,12.391928 C4.35756041,11.8227235 5.38335813,11.8798792 6.02722571,12.5246028 L8,14.5 L8,13 L8.00393081,13 L8,11 L8.0174523,6.5 C8.0174523,5.67157288 8.68902517,5 9.5174523,5 C10.3458794,5 11.0174523,5.67157288 11.0174523,6.5 L11.0174523,11 L11.0174523,4.5 C11.0174523,3.67157288 11.6890252,3 12.5174523,3 C13.3458794,3 14.0174523,3.67157288 14.0174523,4.5 L14.0174523,11 L14.0174523,5.5 C14.0174523,4.67157288 14.6890252,4 15.5174523,4 C16.3458794,4 17.0174523,4.67157288 17.0174523,5.5 L17.0174523,11 L17.0174523,7.5 C17.0174523,6.67157288 17.6890252,6 18.5174523,6 C19.3458794,6 20.0174523,6.67157288 20.0174523,7.5 L20.0058962,14 L20,14 Z"/>
</svg>
<svg viewBox="0 0 24 24" id="apps-alt">
<rect x="5" y="5" width="2" height="2"/>
<rect x="11" y="5" width="2" height="2"/>
<rect x="17" y="5" width="2" height="2"/>
<rect x="5" y="11" width="2" height="2"/>
<rect x="11" y="11" width="2" height="2"/>
<rect x="17" y="11" width="2" height="2"/>
<rect x="5" y="17" width="2" height="2"/>
<rect x="11" y="17" width="2" height="2"/>
<rect x="17" y="17" width="2" height="2"/>
</svg>
<svg viewBox="0 0 24 24" id="maximise">
<polyline points="21 16 21 21 16 21"/>
<polyline points="8 21 3 21 3 16"/>
<polyline points="16 3 21 3 21 8"/>
<polyline points="3 8 3 3 8 3"/>
</svg>
<svg viewBox="0 0 24 24" id="minimise">
<polyline points="8 3 8 8 3 8"/>
<polyline points="21 8 16 8 16 3"/>
<polyline points="3 16 8 16 8 21"/>
<polyline points="16 21 16 16 21 16"/>
</svg>
<svg viewBox="0 0 24 24" id="download">
<path d="M12,3 L12,16"/>
<polyline points="7 12 12 17 17 12"/>
<path d="M20,21 L4,21"/>
</svg>
<svg viewBox="0 0 24 24" id="rectangle">
<rect width="18" height="18" x="3" y="3"/>
</svg>
<svg viewBox="0 0 24 24" id="cursor">
<polygon points="7 20 7 4 19 16 12 16 7 21"/>
</svg>
<svg viewBox="0 0 24 24" id="search">
<path d="M14.4121122,14.4121122 L20,20"/>
<circle cx="10" cy="10" r="6"/>
</svg>
<svg viewBox="0 0 24 24" id="eye">
<path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/>
<circle cx="12" cy="12" r="3"/>
</svg>
<svg viewBox="0 0 24 24" id="save">
<path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z"/>
<rect width="10" height="8" x="7" y="13"/>
<rect width="8" height="5" x="8" y="3"/>
</svg>
<svg viewBox="0 0 24 24" id="image">
<rect width="18" height="18" x="3" y="3"/>
<path stroke-linecap="round" d="M3 14l4-4 11 11"/>
<circle cx="13.5" cy="7.5" r="2.5"/>
<path stroke-linecap="round" d="M13.5 16.5L21 9"/>
</svg>
<svg viewBox="0 0 24 24" id="upload">
<path d="M12,4 L12,17"/>
<polyline points="7 8 12 3 17 8"/>
<path d="M20,21 L4,21"/>
</svg>
`;
let svg = document.createElement('div');
svg.innerHTML = svgIcons;
function getIconHtml(iconId) {
    return svg.querySelector('#' + iconId).outerHTML;
}