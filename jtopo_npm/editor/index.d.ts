import { Anchor } from '@jtopo/core';
import { AnchorProxy } from '@jtopo/core';
import { EllipseNode } from '@jtopo/core';
import { EventTarget as EventTarget_2 } from '@jtopo/core';
import { HandlerLayer } from '@jtopo/core';
import { InputSystem } from '@jtopo/core';
import { InputTextfield } from '@jtopo/extensions';
import { Intersect } from '@jtopo/core';
import { JTopoEvent } from '@jtopo/core';
import { Keyboard } from '@jtopo/core';
import { Layer } from '@jtopo/core';
import { Link } from '@jtopo/core';
import { NE } from '@jtopo/core';
import { Node as Node_2 } from '@jtopo/core';
import { PointLike } from '@jtopo/core';
import { PopupMenu } from '@jtopo/extensions';
import { RectPositionType } from '@jtopo/core';
import { SerializedJsonType } from '@jtopo/core';
import { Stage } from '@jtopo/core';
import { Tooltip } from '@jtopo/extensions';

declare type AlignInfo = {
    horizontalTarget?: Node_2;
    verticalTartet?: Node_2;
    horizontalType?: 'left' | 'center' | 'right';
    verticalType?: 'top' | 'middle' | 'bottom';
};

/**
 * 剪切板对象
 */
declare class ClipBoard {
    type: 'cut' | 'copy';
    take: number;
    source: CopyPutType;
    constructor();
    copyPut(source: CopyPutType): void;
    cutPut(source: CopyPutType): void;
    takeSource(): CopyPutType;
    isFirstCutPaste(): boolean;
    clear(): void;
}

declare type CopyPutType = {
    type: 'objects' | 'style';
    sourceObjArr: NE[];
    parents: NE[];
};

declare class DropToBox extends Node_2 {
    editor: Editor;
    currObject: NE;
    constructor(editor: Editor, x?: number, y?: number, w?: number, h?: number);
    update(): void;
    attachTo(nodeOrLink: Node_2 | Layer | null): void;
    updateSize(): void;
    viewClone(target: NE): void;
}

declare class EditEvent extends JTopoEvent {
    type: EditEventType;
    /**
     * 事件关联的对象
     */
    target?: Object | Object[];
    /**
     * 事件详情
     */
    details?: any;
    constructor(type: EditEventType, initData?: Partial<EditEvent>);
}

declare type EditEventType = 'save' | 'deleteBefore' | 'delete' | 'copy' | 'cut' | 'paste' | 'rotate' | 'resize' | 'open' | 'linkbegin' | 'linkend';

/**
 * 编辑器
 * @protected
 */
export declare class Editor extends EventTarget_2<EventsMap> {
    /**
     * Stage对象
     */
    stage: Stage;
    /**@protected */
    handlerLayer: HandlerLayer;
/**
     * 快捷键配置
     * @protected
     */
    keyConfig: {
        CtrlOrCmd: string;
        CreateGroup: string;
        DropTo_leader: string;
        Delete: string[];
        Select_all: string;
        Select_invert: string;
        Cut: string;
        Copy: string;
        Paste: string;
        Save: string;
        Open: string;
        Undo: string;
        Redo: string;
        Copy_style: string;
        paste_Style: string;
        Move_up: string;
        Move_down: string;
        Move_left: string;
        Move_right: string;
        Layout_grid: string;
        LocalView: string;
        ResizeKeepAspectRatio: string;
        Cancel: string;
        DisableNodeAlign: string;
    };
    /**
     * 编辑器配置
     * @protected
     */
    config: {
        data: {
            localLastDocName: string;
        };
        connectPoint: {
            size: number;
            style: {
                strokeStyle: string;
                fillStyle: string;
                lineWidth: number;
                padding: number;
            };
            activeStyle: {
                lineWidth: number;
                fillStyle: string;
                padding: number;
            };
            unActiveStyle: {
                lineWidth: number;
                fillStyle: string;
                padding: number;
            };
            drawStartMinDistance: number;
            drawStartDelay: number;
        };
        connectBox: {
            anchorDist: number;
            nodeDist: number;
        };
        nodeResizePoint: {
            width: number;
            height: number;
            style: {
                lineWidth: number;
                strokeStyle: string;
                fillStyle: string;
                padding: number;
            };
        };
        nodeRotatePoint: {
            width: number;
            height: number;
            style: {
                lineWidth: number;
                strokeStyle: string;
                fillStyle: string;
                padding: number;
            };
            rotateLineStyle: {
                strokeStyle: string;
                lineDash: number[];
            };
            rotateLineLength: number;
        };
        crossGuildLine: {
            styleH: {
                strokeStyle: string;
                lineWidth: number;
            };
            styleV: {
                strokeStyle: string;
                lineWidth: number;
            };
            axisInfoStyle: {
                color: string;
                fontSize: number;
                fillStyle: string;
            };
        };
        linkCtrlPoint: {
            size: number;
            style: {
                lineWidth: number;
                strokeStyle: string;
                fillStyle: string;
                padding: number;
            };
            activeStyle: {
                globalAlpha: number;
            };
            unactiveStyle: {
                globalAlpha: number;
            };
            adjustStyle: {
                strokeStyle: string;
                fillStyle: string;
                lineWidth: number;
                padding: number;
            };
            ctrlLinkStyle: {
                lineDash: number[];
                lineWidth: number;
                padding: number;
            };
        };
        dropBox: {
            style: {
                fillStyle: string;
                border: string;
                lineDash: number[];
                lineWidth: number;
            };
        };
        align: {
            gridSize: number;
            minDistance: number;
            alignLineStyle: {
                strokeStyle: string;
                lineDash: number[];
                lineWidth: number;
            };
        };
        operationTip: {
            enable: boolean;
        };
    };
    keyboard: Keyboard;
    nodeResizeBox: NodeResizeBox;
    linkCtrlBox: LinkCtrlBox;
    anchorsBox: AnchorsBox;
    dropToBox: DropToBox;
    editorEventManager: EditorEventManager;
    keyManager: KeyManager;
    clipboardManager: ClipboardManager;
    layoutManager: LayoutManager;
    instanceManager: InstanceManager;
    /**
     * 弹出菜单对象
     */
    popupMenu: PopupMenu;
    /**
     * 当前鼠标操作的一个对象
     */
    pickedObject?: NE;
    mouseOverTarget?: NE;
    controlTarget?: any;
    inputTextfield: InputTextfield;
    redoUndoSys: RedoUndoSystem;
    alignManager: AlignManager;
    opTooltip: Tooltip;
    /**
     * 当前鼠标划线的类名称, 默认：AutoFoldLink ，可以修改成其它Link的类名称如: "Link"、"FoldLink"
     * @deprecated 请使用stage.getLinkClassName()来替代
     */
    LinkClassName: string;
    recordName?: string;
    lastLayerState?: SerializedJsonType;
    newLinkProperties: any;
    static KeysConfig: {
        CtrlOrCmd: string;
        CreateGroup: string;
        DropTo_leader: string;
        Delete: string[];
        Select_all: string;
        Select_invert: string;
        Cut: string;
        Copy: string;
        Paste: string;
        Save: string;
        Open: string;
        Undo: string;
        Redo: string;
        Copy_style: string;
        paste_Style: string;
        Move_up: string;
        Move_down: string;
        Move_left: string;
        Move_right: string;
        Layout_grid: string;
        LocalView: string;
        ResizeKeepAspectRatio: string;
        Cancel: string;
        DisableNodeAlign: string;
    };
    DataCenter: {
        getItem: (key: any) => string;
        setItem: (key: any, value: any) => void;
        saveWithVersion(key: any, value: any): void;
        getAllVersions(key: any): string[];
        getLastVersion(key: any, n: any): any;
    };
    rulerW?: Link;
    rulerS?: Link;
    guildAxis?: Node_2;
    imageToBase64: boolean;
    /**
     * 当鼠标画出线时的回调处理函数
     *
     * 已过时， 请使用事件监听的方式来替代该回调, 例如：
     ```js
     // 开始划线
     editor.on('linebegin', (event)=> {
     let link = event.object;
     console.log(link);
     });

     // 结束划线
     editor.on('linkend', (event)=> {
     let link = event.object;
     console.log(link);
     });
     ```
     *
     * @deprecated
     * @param link
     */
    onLinkCreate: null;



    /**
     *
     * @param {Stage} stage
     */
    constructor(stage: Stage);
    /**
     * 设置鼠标划线的类名称, 默认：AutoFoldLink ，可以修改成其它Link的类名称如: "Link"、"FoldLink"
     */
    setLinkClassName(className: string): void;
    getLinkClassName(): string;
    /**
     * 获取当前Layer
     */
    getCurrentLayer(): Layer | null;
    defineKeys(config: Partial<typeof KeysConfig>): void;
    /**
     * 画布中间显示提示信息-很短暂停留后消失
     */
    showOpTooltip(msg: string): void;
    /**
     * 保存到浏览器缓存
     * @param event
     * @param imageToBase64
     */
    saveHandler(event: any, imageToBase64?: boolean): void;
    /**
     * 从浏览器缓存中打开最后一次的保存
     */
    openLasted(): Promise<boolean>;















/**
     * 请求刷新
     */
    update(): void;
    _hideAllAttaches(): void;
    /**
     * 打开一个json文档
     */
    openJson(json: SerializedJsonType): Promise<void>;
/**
     * 根据data生成一个图元实例
     * @param data
     */
    create(className: string): Node_2 | Link;
    /**
     * 移动设备上没有drop事件，这里模拟一个
     * @param touchEvent
     */
    mockDrop(touchEvent: TouchEvent): void;
    clearCtrlBoxs(): void;
    toogleLocalView(): void;
    /**
     * 模拟一次按键,
     例如:
     ```
     editor.sendKey('Control+a'); // windows
     editor.sendKey('Meta+a'); // macos

     editor.sendKey('delete');

     editor.sendKey('Control+z'); // windows
     editor.sendKey('Meta+z'); // macos 撤销
     ```
     */
    sendKey(keyStr: string, event?: any): void;
    onEsc(): void;
    /**
     * 设置对象是否可编辑
     * @param obj
     * @param editable
     */
    setEditable(obj: NE, editable: boolean): void;
    /**
     * 设置对象是否可连线
     * @param obj
     * @param connectable
     */
    setConnectable(obj: NE, connectable: boolean): void;
    /**
     * 判断对象是否可编辑
     * @param obj
     * @returns
     */
    isEditable(obj: Node_2 | Link): boolean;
    /**
     * 判断对象是否可连线
     * @param obj
     * @returns
     */
    isConnectable(obj: NE): boolean;
    getEditInfo(objectArray: Array<Node_2 | Link>, objectIndexMap: Map<NE, number>): {
        disableEdit: any[];
        disableConnect: any[];
    };
    fromEditInfo(editInfo: any, objectArray: Array<NE>): void;
    reset(): void;
}
declare type EventsMap = {
    [key in EditEventType]: EditEvent;
};

/**
 * 编辑器左侧的图片面板，功能极简单，演示用
 * @deprecated 请使用开源的 IconsPanel.js 代替
 */
export declare class IconsPanel extends EventTarget_2 {
    stage: any;
    editor: any;
    panelDom: any;
    dargItem: any;
    itemSize: number;
    constructor(stage: any, editor: any);
    setConfig(data: any): this;
    touchStartHandle(item: any, e: any): void;
    /**
     * 获取当前被拖拽的图标
     * @returns
     */
    getDragItem(): any;
    hide(): this;
    show(): this;
}

/**
 * 默认的按键配置
 */
declare const KeysConfig: {
    CtrlOrCmd: string;
    CreateGroup: string;
    DropTo_leader: string;
    Delete: string[];
    /** 全选 */
    Select_all: string;
    Select_invert: string;
    Cut: string;
    Copy: string;
    Paste: string;
    Save: string;
    Open: string;
    /** 撤销 */
    Undo: string;
    Redo: string;
    /** 样式辅助 */
    Copy_style: string;
    paste_Style: string;
    Move_up: string;
    Move_down: string;
    Move_left: string;
    Move_right: string;
    Layout_grid: string;
    LocalView: string;
    ResizeKeepAspectRatio: string;
    Cancel: string;
    /** 禁用 节点拖拽时的辅助对齐 */
    DisableNodeAlign: string;
};
declare class LinkCtrlBox extends Node_2 {
    editor: Editor;
    attachedLink?: Link;
    anchorNameStr?: string;

    constructor(editor: Editor);
    attachTo(link: Link): void;
    createCtrlPoint(anchor: Anchor): LinkCtrlPoint;
    updateSize(): void;
    createCtrlPoints(link: Link): void;
    _createCtrlLink(begin: AnchorProxy, end: AnchorProxy): Link;
    updateCtrlPoints(): void;
    update(): void;
    clearTarget(): void;
    init(): void;
    pointeroutStageHandler(): void;
    pointerenterStageHandler(): void;
}


/**
 * @ignore
 * @deprecated 请使用开源的 PropertiesPanel.js 代替
 */
export declare class PropertiesPanel {
    editor: Editor;
    gui: any;
    object: NE;
    folders: any;
    basic: any;
    style: any;
    dat: any;
    constructor(editor: any, dat: any);
    setCurrentObject(object: NE | Layer): void;
    showProperty(obj: NE): void;
    newFolder(name: string): any;
    getFolder(name: string): any;
    getCtrollerValue(folderName: string, name: string): any;
    getCtroller(folderName: string, name: string): any;
    setFolderValues(basic: any, style: any): void;
    init(): void;
    open(): void;
    close(): void;
    hide(): void;
    show(): void;
}
export { }
