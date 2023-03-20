export const version = '1.4.6';

/** 文本位置 */
export type TextPosition = 'lt' | 'ct' | 'rt' | 'lm' | 'center' | 'rm' | 'lb' | 'cb' | 'rb';

/** 连接点 */
export type ConnectPosition = 'lt' | 'ct' | 'rt' | 'lm' | 'center' | 'rm' | 'lb' | 'cb' | 'rb' | 'nearest' | null;

/** 文本对齐 */
export type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center';

/** 文本基线 */
export type TextBaseline = 'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging';

/** Stage模式 */
export type StageMode = 'normal' | 'drag' | 'edit' | 'view' | 'select';

/** 鼠标事件 */
export type MouseEventType = 'mousedown' | 'mouseup' | 'mousemove' | 'mouseenter'
    | 'mouseout' | 'mousewheel' | 'click' | 'dblclick';


export type RatioDirection = 'up' | 'down' | 'left' | 'right';
export type LinkDirection = 'horizontal' | 'vertical';

export class EventTarget {

    /**
     * 是否有该类型的监听
     * @param {String} type 
     */
    hasListener(type: MouseEventType): void;

    /**
    * 增加事件监听
    * @param {String} type 事件类型
    * @param {Function} callback 
    */
    addEventListener(type: MouseEventType, callback: Function): void;

    /**
     * 移除一个事件监听
     * @param {String} type 
     * @param {Function} callback 
     */
    removeEventListener(type: MouseEventType, callback: Function): void;

    /**
     * 分发事件
     * @param {Event} event 
     */
    dispatchEvent(event: Event): void;

    /**
     * 增加监听事件, 功能完全等同于addEventListener，一种简写
     * @param {MouseEventType} type 事件类型 
     * @param {fucntion} callback 事件处理函数
     */
    on(type: MouseEventType, callback: Function): void;
}


export class Point {
    x: number;
    y: number;
}

export class Toolbar {
    /**
     * 显示
     */
    show(): DisplayObject;

    /** 
    * 隐藏
    */
    hide(): DisplayObject;
}

export class HtmlImage {
    /**
     * 
     * @param {String} html html片段
     * @param {Number} width 宽
     * @param {Number} height 高
     * @param {Number} opacity 透明度
     */
    constructor(html: string, width: number, height: number, opacity: null | number);
}


export class DisplayObject extends EventTarget {
    setXY(x: number, y: number): DisplayObject;

    getName(): string;
    setName(name: string): void;

    /**
    * 绘制具体内容
    * @param {Object} ctx Canvas.context
    */
    draw(ctx: CanvasRenderingContext2D): DisplayObject;

    /**
     * 增量平移对象, 在对象原有的坐标基础上，增加偏移(dx,dy)。相当于: x += dx; y += dy。
     * @param {Number} dx
     * @param {Number} dy
     */
    translateWith(dx: number, dy: number): DisplayObject;

    /**
     * 平移对象到指定位置(x,y)
     * @param {Number} x
     * @param {Number} y
     */
    translateTo(x: number, y: number): DisplayObject;


    /**
 * 平移对象的中心点到指定位置(x,y), 这是一个很有的方法
 * @param {Number} x
 * @param {Number} y
 */
    translateCenterTo(x: number, y: number): DisplayObject;


    /**
     * 获取中心点 {x,y}, 即： {x: this.x + this.width/2, y:this.y + this.height/2}
     * @returns {object} {x:xx, y:xx}
     */
    getCenter(): { x: number, y: number };


    /**
     * 设置尺寸
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    resizeTo(width: number, height: number): DisplayObject;


    /**
     * 旋转
     * @param {number} angle 旋转角度（弧度）
     */
    rotateTo(angle: number): DisplayObject;

    /**
     * 语法上支持一部分css样式
     * 
     * <p>可以每次设置一个样式，如：obj.css('border', '1px solid '); </p>
     * <p>也可以一次设置一组样式，如: obj.css({ name:value, name2:value2,...  });</p>
     * @param {String} name
     * @param {String} value 如果不填写，就是读取样式
     */
    css(name: string | Style, value: null | Object): DisplayObject;


    /**
     * 显示
     */
    show(): DisplayObject;

    /** 
    * 隐藏
    */
    hide(): DisplayObject;

    /**
     * 设置用户自定义数据
     * <p>直接在节点对象上增加属性不是稳妥的方法，若要向节点增加额外的属性，应该调用此方法</p>
     * 
     * @param {any} data
     */
    setUserData(data: any): DisplayObject;

    /**
     * 读取用户自定义的数据
     */
    getUserData(): any;

    /**
     * 移除用户自定义的数据
     */
    removeUserData(): DisplayObject;

    /**
     * 增加子对象
     * @param {DisplayObject} child 
     */
    addChild(child: DisplayObject): DisplayObject;

    /**
    * 设置zIndex
    * @param {Number} index 
    */
    setzIndex(index: number): void;

    /**
     * 所有子节点按zIndex排序-升序
     */
    updatezIndex(): void;

    /**
     * 获取所有子对象
     * @param {Array<DisplayObject>} childs
     */
    getChildren(): Array<DisplayObject>;

    /**
    * 是否拥有子对象
    * @param {DisplayObject} child 
    */
    hasChild(child: DisplayObject): boolean;


    /**
    * 从父容器中移除 
    */
    remove(): void;

    /**
     * 一次性增加多个对象, 比单个增加速度快多，数量越多越明显！
     * @param {DisplayObject} childs
     */
    addChilds(childs: Array<DisplayObject>): void;

    /**
     * 移除一个子对象
     * @param {DisplayObject} child 
     */
    removeChild(child: DisplayObject): void;

    /**
     * 移除多个子对象
     * @param {Array<DisplayObject>} childs
     */
    removeChilds(childs: Array<DisplayObject>): void;

    /**
     * 移除所有子对象
     */
    removeAllChild(): void;

    /**
    * 将一个stage坐标转换到本地坐标系
    * @param {Number} x 
    * @param {Number} y 
    */
    stageToLocalXY(x: number, y: number): Point;


    /**
     * 将一个本地坐标转到stage坐标系
     * @param {Number} x 
     * @param {Number} y 
     */
    toStageXY(x: number, y: number): Point;

    /**
     * 将一个本地坐标转到Layer坐标系
     * @param {Number} x 
     * @param {Number} y 
     * @return {Object} {x:Number, y:Number}
     */
    toLayerXY(x: number, y: number): Point;

    /**
    * 唯一标志，不能有重复, 开发人员不要自己设置
    */
    id: number;

    /** 名称 */
    name: string;

    /**
     * 是否可见
     */
    visible: boolean;

    /**
     * 坐标x
     */
    x: number;
    /**
     * 坐标y
     */
    y: number;


    /**
     * zIndex显示前后排序
     * <p>Node默认为2，Link默认为1, Link默认绘制在Node的后面</p>
     */
    zIndex: number;


    /**
     * 宽度
     */
    width: number;
    /**
     * 高度
     */
    height: number;

    /**
     * 水平缩放系数
     */
    scaleX: number;

    /**
     * 垂直缩放系数
     */
    scaleY: number;

    /**
     * 层级深度, Layer为0，下面第一层子节点为1，依次类推
     */
    deep: number;

    /**
     * 旋转角度
     */
    rotation: number;

    /**
     * 上级对象
     */
    parent: DisplayObject;
    /**
     * 样式
     */
    style: Style;
    /**
     * 选中时的样式，如果不设置将使用默认的
     */
    selectedStyle: Style;

    /**
     * 为了安全考虑，防止与对象属性冲突,用户最好使用该对象
     * 用户附加到该对象的自定义属性
     */
    userData: Object;

    /**
     * 是否显示选中的效果，默认显示
     */
    showSelected: true | boolean;

    /**
     * 是否响应鼠标，为false的时候，不响应鼠标的动作
     */
    mouseEnabled: true | boolean;

    /**
     * 是否可拖拽
     */
    draggable: true | boolean;

    /**
     * 是否可以调整角度、尺寸，仅仅编辑模式有意义
     */
    editable: true | boolean;

    /**
     * 是否可连线，仅仅编辑模式有意义
     */
    connectable: true | boolean;

    /**
     * 子节点集合
     */
    children: Array<DisplayObject>;


    /**
     * 是否冻结（所有下级子节点），冻结后鼠标拾取到子节点或者本节点都视为本节点
     */
    frozen: false | boolean;


    /**
     * 本地坐标系的原点，默认为[0,0], 父节点的左上角
     */
    origin: Array<number>;

    /**
     * 是否跟随父节点(当父节点是Link的时候)旋转
     **/
    originAutoRotate: true | boolean;

    /**
     * 原点偏移量
     */
    originOffset: number | { x: number, y: number };

    /*
     * 序列化属性列表
     */
    serializers: Array<string>;
}

export class Style {
    /** 边框 */
    border: 'solid 1px gray' | '';

    borderStyle: 'solid' | 'dashed';

    /** 边框颜色 */
    borderColor: string;

    /** 边框宽度 */
    borderWidth: number;

    background: 'white url("./xx.png") no-repeat';

    /** 
     * 节点图片 或者 背景图片
    */
    backgroundImage: 'url("./xx/xxx.png")' | '';
    backgroundColor: string;

    font: 'bold 12px arial' | '';

    textPosition: TextPosition;
    textAlign: TextAlign;
    textBaseLine: TextBaseline;

    /**
     * 透明度
     */
    globalAlpha: number;

    /**
     * lineCap
     */
    lineCap: 'butt' | 'round' | 'square';
}


/**
 * 节点对象
 */
export class Node extends DisplayObject {

    /**
     * 所有参数可以为空，通过其他方法按需设置
     * @param {string} text 文本
     * @param {x} x 坐标x
     * @param {y} y 坐标y
     * @param {number} width 宽度
     * @param {number} height 高度
     */
    constructor(text: null | string, x: null | number, y: null | number, width: null | number, height: null | number);


    /**
     * 节点文本
     * <p> 多行直接可以使用\n换行 </p>  
     */
    text: string;

    /**
    * 文本水平偏移量
    */
    textOffsetX: null | number;

    /**
     * 文本垂直偏移量
     */
    textOffsetY: null | number;

    readonly isNode: true;

    /**
 * 所有以本节点为结束点的Link对象数组
 */
    inLinks: null | Array<Link>;

    /**
     * 所有以本节点为开始点的Link对象数组
     */
    outLinks: null | Array<Link>

    /**
     * 设置图片
     */
    setImage(img: string | HTMLImageElement | HTMLCanvasElement | HtmlImage, fitSize: null | boolean): void

}
/**
 * 文本节点
 */
export class TextNode extends Node {
}
/**
 * 圆形节点
 */
export class CircleNode extends Node {
    /**
     * 设置半径
     * @param {number} r 圆半径 
     */
    setRadius(r: number): void;
}
/**
 * 多边形节点
 */
export class PolygonNode extends Node {
    /**
     * 设置坐标数组
     * @param {Array} coordinates 如：[[10, 10], [20, 13], [45, 66]....]
     */
    setCoordinates(coordinates: Array<Array<number>>): void;

    /**
   * 旋转节点内的形状
   * @param {Number} angle 旋转度数（弧度）
   */
    rotateContent(angle: number): void;
}


/**
 * 比率节点 ，用矩形填充的方式表达：比例、利用率、占比、进度条
 * <p>可以设置方向</p>
 */
export class RatioNode extends Node {
    /**
    * 比率：通常取值范围是[0-1], 默认: 0.5
    * @alias RatioNode.prototype.ratio
    * @type number 
    */
    ratio: number;

    /**
    * 方向，朝向：right、left、up、down ，默认：right
    */
    direction: RatioDirection;
}


/**
 * 连线对象
 */
export class Link extends DisplayObject {

    constructor(name:null|string, begin: DisplayObject, end: DisplayObject, beginPosition: ConnectPosition, endPosition: ConnectPosition);
}

/**
 * 半圆弧
 */
export class ArcLink extends Link {
    constructor(name:null|string, begin: DisplayObject, end: DisplayObject, beginPosition: ConnectPosition, endPosition: ConnectPosition);
}

/**
 * 贝塞尔
 */
export class BesizerLink extends Link {
    constructor(name:null|string, begin: DisplayObject, end: DisplayObject, beginPosition: ConnectPosition, endPosition: ConnectPosition);
}


/**
 * 弧线
 */
export class CurveLink extends Link {
    constructor(name:null|string, begin: DisplayObject, end: DisplayObject, beginPosition: ConnectPosition, endPosition: ConnectPosition);
    /**
     * 控制点的偏移方向
     */
    direction: LinkDirection;
}

/**
 * 折线
 */
export class FoldLink extends Link {
    /**
     * 方向，有垂直、水平两种 取值为：'horizontal' 或者 'vertical' ，默认为 'horizontal'
     */
    direction: LinkDirection;
}

/**
 * 自动折线
 */
export class AutoFoldLink extends Link {
}



/**
 * 层对象
 */
export class Layer extends DisplayObject {
    /**
    * 更新，申请画面重绘
    */
    update(): void;

    /**
     * 强制重绘
     */
    forceUpdate(): void;


    /**
    * 根据属性来查找Layer中的对象
    * <p>例如：layer.find('text', 'node_3'); 会返回对象的text属性是 'node_3'的所有对象 </p>.
    * <p>例如：layer.find('name', 'obj_name');</p>.
    * <p>例如：layer.find('isNode', true); 会返回所有Node对象 </p>.
    * <p>例如：layer.find('isLink', true); 会返回所有Link对象 </p>.
    * @param {String} name 属性名称
    * @param {any} value 属性值 
    * @param {Boolean} recursive 是否递归查找下级子节点
    */
    find(name: string, value: any, recursive: boolean): Array<DisplayObject>;


    /**
    * 平移Layer，将node对象作为画布显示的中心
    * @param {Node} node 可为null 
    */
    centerBy(node: Node): void;

    /**
     * 从json加载还没
     * @param json 
     */
    openJson(json: string): void;

    /**
     * 取消Layer的缩放
     */
    cancelZoom(): void;
}

export class Stage extends EventTarget {
    /**
   * 一个Dom节点对象或者一个dom的ID
   * @param {string} domOrId or id
   */
    constructor(domOrId: string | HTMLElement);

    /** 创建Stage时的dom对象 */
    domElement: HTMLElement;

    /** 是否可见 */
    visible: false | boolean;

    /** 当前视图模式 */
    mode: string;

    /** 是否可以缩放 */
    wheelZoom: true | boolean;

    /** 当前鼠标的详细信息 */
    mouseInfo: Object;

    /** 当前鼠标按下时拾取的对象 */
    pickedObject: DisplayObject | null;

    /**
     * 所有添加进来的layer
     */
    children: Array<Layer>;

    /**
     * 宽度
     * @type Number
     */
    width: number;

    /**
     * 高度
     * @type Number
     */
    height: number;

    /**
    * 工具条
    * @type {Toolbar}
    */
    toolbar: Toolbar;

    /**
     * 显示
     */
    show(): void;

    /** 
    * 隐藏
    */
    hide(): void;

    /**
     * 添加Layer
     * @param layer Layer
     */
    addChild(layer: Layer): void;

    /**
   * 移除一个Layer
   * @param {Layer} layer 
   */
    removeChild(layer: Layer): void;

    /**
     * 取消所有Layer的缩放和偏移
     */
    cancelZoom(): void;

    /**
   * 缩放到画布1：1并居中
   */
    zoomFullStage(): void;

    /**
     * 居中显示
     */
    translateToCenter(): void;

    /**
        * 导出图片到本地
        */
    saveAsLocalImage(): void;

    /**
     * 在浏览器内全屏
     */
    fullWindow(): void;

    /**
    * 整个显示器全屏, 抛出fullScreen事件
    */
    fullScreen(): void;

    /**
     * 显示工具条
     */
    showToolbar(): void;

    /**
    * 隐藏工具条
    */
    hideToolbar(): void;

    /**
     * 显示缩略图 （所在div的css属性position为 absolute）
     * <pre>
     * 可通过css样式来定位，例如：
    stage.showOverview({
        left: 0,
        bottom: -1
    });
     * </pre>
     * @param {Object} styles
     */
    showOverview(styles: Object): void;

    /**
   * 隐藏缩略图
   */
    hideOverview(): void;

    /**
    * 设置场景模式,模式有：normal（默认值)、select(框选)、edit(编辑)、drag(拖拽)
    * 
    * 触发 'modeChange'事件，可捕获
    * @param {string} mode 场景模式
    */
    setMode(mode: StageMode): void;

    /**
    * 获取鼠标在Stage中(cavnas上0的坐标{x,y}
    */
    getMousePoint(): Point;

    /**
    * 获取鼠标在Stage中(cavnas上）按下时的坐标{x,y}
    */
    getMouseDownPoint(): Point;

    /**
     * 设置光标, 相当于: cavnas.style.cursor = cursor;
     * @param {string} cursor
     */
    setCursor(cursor: string): void;

    /**
   * 下载为json文件
   * @param {String} fileName
   */
    download(fileName: string): void;

}