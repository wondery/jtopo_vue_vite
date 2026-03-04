import { AENode } from '@jtopo/core';
import { Animation as Animation_2 } from '@jtopo/core';
import { EasingNameType } from '@jtopo/core';
import { EventTarget as EventTarget_2 } from '@jtopo/core';
import { ImageNode } from '@jtopo/core';
import { JTopoEvent } from '@jtopo/core';
import { Link } from '@jtopo/core';
import { Node as Node_2 } from '@jtopo/core';
import { PointLike } from '@jtopo/core';
import { SerializeableType } from '@jtopo/core';
import { Shape } from '@jtopo/core';
import { ShapeNode } from '@jtopo/core';
import { Stage } from '@jtopo/core';

/** XML-Shape 资源管理 */
export declare const AssetsLoader: {
    /** 从xml文本中加载图形到Assets库 */
    fromXml: typeof loadShapesFromXml;
};

/**
 * 闪烁指示动效节点
 */
export declare class BlinkingArrowNode extends AENode {
    /**@readonly */
    className: any;
    /**
     * 动效参数, 可序列化
     */
    protected aeOptions: BlinkingArrowOption;
    /** 动效状态 */

    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    ae(opt: BlinkingArrowOption): void;
    setupAE(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    destroy(): void;
}

declare type BlinkingArrowOption = {
    /** 箭头数量 */
    arrowNumbers?: number;
    /** 闪烁频率 */
    blinkFrequency?: number;
} & SerializeableType;

declare type EventsMap = {
    'select': {
        item: string;
        cancelable?: boolean;
    };
};

declare type EventsMap_2 = {
    confirm: {
        target: Node_2 | Link;
        text: string;
    };
    cancel: {
        target: Node_2 | Link;
    };
};

declare type EventsMap_3 = {
    [key in TopoActionName]: TopoAction;
};

/**
 * Gif动图节点
 *
 ```js
 let gifNode = new GifNode('', 0, 0, 100, 60);

 // 路径必须以 .gif 结尾
 gifNode.setImage('./assets/img/effect.gif');
 ```
 * - 如果不是动图，使用ImageNode节点更合适。
 * - 大部分情况下，可以使用雪碧图来代替GIF。
 * - 注意：性能敏感的场景，减少使用。
 */
export declare class GifNode extends ImageNode {
    className: any;
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * @override
     * @protected
     */
    protected _drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void;
    /**
     * @override
     */
    removeFromParent(): this;
}

/**
 * 编辑输入框, 用于编辑节点/连线的文本
 *
 * - 双击节点/连线时弹出
 * - ctrl + enter 换行
 * - esc 取消
 * - enter 确认
 */
export declare class InputTextfield extends EventTarget_2<EventsMap_2> {






    /**r
     * 是否禁用
     */
    disabled: boolean;
    enabledModes: string[];
    constructor(stage: Stage);











    hide(): void;




    destroy(): void;
}

export declare class InputTextfieldEvent<K extends keyof EventsMap_2> extends JTopoEvent<EventsMap_2, K> {
}

/**
 * L型接头
 * @protected
 */
export declare class JointLNode extends Node_2 {
    /**
     * @readonly
     */
    className: any;
constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * 从xml文本中加载图形到Assets库
 * @param xmlText
 * @returns
 */
declare function loadShapesFromXml(xmlText: string): XMLShape[];

/**
 * 右键弹出菜单
 * @class
 */
export declare class PopupMenu extends EventTarget_2<EventsMap> {
    stage: Stage;
    domElement: HTMLElement;
    html: string;
    /**
     *
     * @param {State} stage
     * @param {String} html
     */
    constructor(stage: Stage, html: string);
    remove(): void;
    /**
     * 设置菜单内容
     * @param {String} html
     */
    setHtml(html: string): HTMLDivElement;
    initEvent(dom: HTMLElement): void;
    /**
     * 在x，y出显示
     * @param {Number} x
     * @param {Number} y
     */
    showAt(x: number, y: number): void;
    /**
     * 隐藏
     */
    hide(): void;
}

export declare class PopupMenuEvent<K extends keyof EventsMap> extends JTopoEvent<EventsMap, K> {
}

/**
 * 用来表示比率、进度的节点。
 *
 ```js
 let ratioNode = new RatioNode('', -200, 220, 100, 33);
 // 属性
 ratioNode.setAttributes({
 'ratio': 0,
 'direction': 'right'
 });
 ```
 */
export declare class RatioNode extends ShapeNode {
    /**
     * @readonly
     */
    className: any;
    /**
     * 自定义属性
     */
    readonly attributes: RatioOpt;
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
}

declare type RatioOpt = {
    /**
     * 比率：通常取值范围是[0-1], 默认: 0.5
     */
    ratio: number;
    /**
     * 方向，朝向： ，默认：right
     */
    direction: 'right' | 'left' | 'up' | 'down';
};

/**
 * 涟漪动效节点
 *
 * 该节点不显示文本、边框、没有样式，只显示涟漪动效。
 */
export declare class RipplingNode extends AENode {
/**
     * 动效参数
     */
    protected aeOptions: RipplingOption;
constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 设置动效参数
     */
    ae(opt: RipplingOption): void;
    _onAEChanged(): void;
    _afterStyleComputed(): void;
    setupAE(): void;
    set width(w: number);
    get width(): number;
    set height(h: number);
    get height(): number;
    draw(ctx: CanvasRenderingContext2D): void;
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;
    _renderSVG(svg: SVGElement): void;
}

declare type RipplingOption = {
    /** 圆环数量，默认2 */
    circleNumber?: number;
};

/**
 * 工具条
 * <p> 通过按钮触发来调用stage的方法来完成下面的功能: </p>
 * <p> 设置操作模式（默认、框选、编辑、拖拽、查看、锁定） </p>
 * <p> 控制放大、缩小、居中、导出 等</p>
 *
 ```js
 // 显示
 import { Toolbar } from '@jtopo/extensions';

 // 工具栏
 const toolbar = new Toolbar(stage);

 toolbar.show();

 // 隐藏
 toolbar.hide();
 ```
 */
export declare class Toolbar {
    stage: Stage;
    domObj: HTMLElement;
    buttons: NodeListOf<HTMLButtonElement>;
    fileInput: HTMLElement;
    /**
     * 下载时，是否将图标内联到json
     */
    imageToBase64: boolean;
    /**
     * @param {Stage} stage
     */
    constructor(stage: Stage);
    /**
     * 显示某个按钮
     * @param title 按钮元素的title属性
     */
    showButton(title: string): void;
    /**
     * 隐藏某个按钮
     * @param title 按钮元素的title属性
     */
    hideButton(title: string): void;
    getDom(): HTMLElement;
    /**
     * 显示
     */
    show(): void;
    /**
     * 隐藏
     */
    hide(): void;
    remove(): void;
    initActiveStatus(): void;
    initToolbar(stage: Stage, html: any): void;
    /**
     * 激活某个按钮
     * @param btnOrTitle j
     */
    activeButton(btnOrTitle: any): void;
    removeAllActive(group: any): void;
}

/**
 * 小提示
 ```js
 // 示例
 var tooltip = new Tooltip(stage);
 tooltip.setHtml('小提示: 可以是html哦');

 node.on('pointermove', function (event) {
 let input = stage.inputSystem;
 tooltip.showAt(input.x, input.y);
 });
 ```
 */
export declare class Tooltip extends EventTarget_2 {
    stage: Stage;
    domElement: HTMLElement;
    /**
     *
     * @param {Stage} stage
     */
    constructor(stage: Stage);
    /** 禁用 */
    disable(): void;
    /** 启用 */
    enabled(): void;
    /**
     * 设置显示的html内容
     * @param {String} html
     */
    setHtml(html: string): HTMLElement;
/**
     * 显示提示框
     * @param {Number} x
     * @param {Number} y
     */
    showAt(x: number, y: number): void;
    /**
     * 隐藏提示框
     */
    fadeOut(): void;
}

declare interface TopoAction {
    name: TopoActionName;
    args: Array<any>;
}

declare type TopoActionName = keyof typeof TopoOperator;

/**
 * 动画选项
 */
declare interface TopoAnimationOptions {
    /**
     * 动画时长
     */
    duration?: number;
    /**
     * 动画缓动效果
     */
    effect?: EasingNameType;
}

/**
 * Topo动画器
 */
declare class TopoAnimator {
    topo: TopoBase;
    animation: Animation_2;
    /**
     * 每个动画的默认时长，单位：毫秒
     */
    defaultDuration: number;
    /**
     * 每个动画的默认缓动效果
     */
    defaultEffect: EasingNameType;
    /**
     * 默认动画选项
     */
    defaultAnimationOptions: TopoAnimationOptions;
    constructor(topo: TopoBase);
    /**
     * 设置默认动画选项
     * @param options 动画选项
     */
    setTopoAnimationOptions(options: TopoAnimationOptions): void;
    /**
     * 动画方式移动到指定位置
     * @param x 目标点x坐标
     * @param y 目标点y坐标
     * @param options 动画选项
     */
    moveTo(x: number, y: number, options?: TopoAnimationOptions): any;
    /**
     * 动画方式移动到指定位置
     * @param p 目标点
     * @param options 动画选项
     */
    moveTo(p: PointLike, options?: TopoAnimationOptions): any;
    /**
     * 动画方式朝向指定点
     * @param x 目标点x坐标
     * @param y 目标点y坐标
     * @param options 动画选项
     */
    faceTo(x: number, y: number, options?: TopoAnimationOptions): any;
    /**
     * 动画方式朝向指定点
     * @param p 目标点
     * @param options 动画选项
     */
    faceTo(p: PointLike, options?: TopoAnimationOptions): any;
    /**
     * 动画方式前进指定距离
     * @param distance 前进距离
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    forward(distance: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式后退指定距离
     * @param distance 后退距离
     * @param options 动画选项
     */
    back(distance: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式转向指定角度(增量)
     * @param angle 角度增量(弧度)
     * @param options 动画选项
     */
    turn(angle: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式左转指定角度
     * @param angle 角度(弧度)，默认为π/2
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    turnLeft(angle?: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式右转指定角度
     * @param angle 角度(弧度)，默认为π/2
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    turnRight(angle?: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式转向到指定角度(绝对角度)
     * @param angle 目标角度(弧度)
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    turnTo(angle: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 动画方式移动到标记位置
     * @param name 标记名称
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    moveToMark(name: string, options?: TopoAnimationOptions): any;
    /**
     * 动画方式面向标记
     * @param name 标记名称
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    faceToMark(name: string, options?: TopoAnimationOptions): any;
    /**
     * 动画方式恢复到标记的位置和方向
     * @param name 标记名称
     * @param options 动画选项
     * @returns Promise 动画完成后resolve
     */
    restoreToMark(name: string, options?: TopoAnimationOptions): Promise<[any, void]>;

    /**
     * 停止并取消当前动画
     */
    abort(): this;
}

/**
 * 一种符合人类直觉的拓扑绘制、操控对象
 */
declare class TopoBase extends EventTarget_2<EventsMap_3> {



    protected marks: Record<string, TopoMark>;
    constructor();
    /** 位置改变时触发 */
    protected onPositionChanged(): void;
    /** 方向改变时触发 */
    protected onDirectionChanged(): void;
    /**
     * 清空所有状态，恢复到初始状态
     */
    reset(): this;
    /**
     * 移动到某点，方向不变
     * @param x 点的x坐标
     * @param y 点的y坐标
     * @returns
     */
    moveTo(x: number, y: number): this;
    /**
     * 移动到某点对象(有x,y坐标的对象都可以)，方向不变
     * @param p PointLike
     */
    moveTo(p: PointLike): this;
    /**
     * 前进指定距离
     *
     * - 基于当前方向
     * - 位置改变
     * - 方向不变
     * @param distance 距离
     * @returns
     */
    forward(distance: number): this;
    /**
     * 后退指定距离
     *
     * - 基于当前方向
     * - 位置改变
     * - 方向不变
     * @param distance 距离
     * @returns
     */
    back(distance: number): void;
    /**
     * 转向到指定角度（绝对角度，无论之前转向了多少）
     * @param angle 角度(弧度制) 2*PI为一周
     */
    turnTo(angle: number): this;
    /**
     * 转向 （增量：基于当前方向）
     *
     * 1. 在当前已经转向的基础上，再转向指定角度
     * 2. 负数为逆时针（向左），正数为顺时针（向右）
     * @param angle 角度(弧度制) 2*PI为一周
     */
    turn(angle: number): this;
    /**
     * 左转(逆时针), 基于当前方向
     * @param angle 角度(弧度制) 2*PI为一周
     */
    turnLeft(angle?: number): this;
    /**
     * 右转(顺时针), 基于当前方向
     * @param angle 角度(弧度制) 2*PI为一周
     */
    turnRight(angle?: number): this;
    /**
     * 面向某点 (方向改变，位置不变)
     */
    faceTo(p: PointLike): any;
    /**
     * 面向某点 (方向改变，位置不变)
     */
    faceTo(x: number, y: number): any;
    /**
     * 把当前位置打上标记， 如果标记名称已存在，则覆盖
     * @param name 标记名称
     */
    mark(name: string): this;
    /**
     * 判断是否存在标记
     * @param name 标记名称
     */
    hasMark(name: string): boolean;
    /**
     * 获取标记信息
     * @param name 标记名称, 如果不存在，则抛出错误
     */
    getMark(name: string): TopoMark;
    /**
     * 移动到标记位置, 方向不变
     * @param name 标记名称, 如果不存在，则抛出错误
     */
    moveToMark(name: string): this;
    /**
     * 位置和方向恢复到标记时的状态
     * @param name 标记名称, 如果不存在，则抛出错误
     */
    restoreToMark(name: string): this;
    /**
     * 移除所有标记
     */
    removeAllMarks(): void;
    /**
     * 移除指定的标记
     * @param name 标记名称
     */
    removeMark(name: string): boolean;
    /**
     * 获取所有标记
     */
    getMarks(): Record<string, TopoMark>;
    /**
     * 添加一些标记
     *
     * 如果标记名称已存在，则覆盖
     * @param marks 标记
     */
    addMarks(marks: Record<string, TopoMark>): void;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get direction(): number;
    set direction(value: number);
}

/**
 * 拓扑位置的标记信息, 含有位置信息和角度信息
 */
declare class TopoMark {
    /**
     * 位置x
     */
    x: number;
    /**
     * 位置y
     */
    y: number;
    /**
     * 方向（角度）
     */
    direction: number;
    constructor(x: number, y: number, direction: number);
}

declare const TopoOperator: {
    readonly forward: "forward";
    readonly back: "back";
    readonly moveTo: "moveTo";
    readonly mark: "mark";
    readonly turn: "turn";
    readonly turnLeft: "turnLeft";
    readonly turnRight: "turnRight";
    readonly faceTo: "faceTo";
    readonly faceToMark: "faceToMark";
};

/**
 * 一个抽象的'机器人'，行为贴合人类直觉。
 *
 * 机器人可以移动、前进、左转、右转、朝向、放下物体等操作。
 *
 * 可以携带一个或多个物体, 被携带的物体坐标和旋转角度会始终和机器人保持一致。
 *
 * 适合模拟一些会移动的物体，如：机器人、车辆、搬运工等。
 *
 * ```js
 // 创建一个机器人
 const robot = new TopoRobot(stage);

 // 创建一个物体，作为机器人可视化的实体，否则就是个完全隐形的
 const body = new Node(stage, 0, 0);
 layer.addChild(body);
 robot.setBody(body);

 // 创建一个物体
 const object = new Node(stage, 100, 100);
 layer.addChild(object);

 robot.faceTo(object) // 面向物体
 .moveTo(object) // 移动到物体位置
 .carry(object) // 拿起物体
 .faceTo({x: 100, y: 200}) // 面向目标点
 .forward(100) // 前进100
 .turnLeft() // 左转
 .forward(100) // 前进100
 .putDown(object); // 放下物体
 // 上面一系列动作将会在一瞬间完成

 // 如果需要分步骤执行，可以使用动画
 // 结合await语法甚至可以方便的在for循环内执行各种异步动画

 // 使用机器人动画器行动
 let animator = robot.animator;

 for(let i=0; i<10; i++) {
 await animator.faceTo(object); // 面向物体, 默认会有1秒转动的动画

 await animator.moveTo(object, {duration: 1000}); // 1秒的时间移动到物体位置

 await animator.carry(object) // 携带物体

 await animator.turnLeft(Math.PI / 2); // 左转90度

 // 0.3秒的时间把物体扔向前方100的距离
 let angle = 0; // 0度，表示正前方, -90度表示左手方向, 90度表示右手方向
 let distance = 100;
 await animator.throw(object,angle, distance, {duration: 300});
 }

 // 需要瞬间完成的，直接使用robot对象
 // 需要动画的，使用animator对象
 *
 * ```
 */
export declare class TopoRobot extends TopoBase {
    /**
     * 机器人的身体
     */
    body?: Node_2;
    /**
     * 被拿起的物体列表
     */
    carriedObjects: Array<Node_2>;
    /**
     * 动画控制器
     */
    animator: TopoRobotAnimator;
constructor(stage: Stage);
    protected onPositionChanged(): void;
    protected onDirectionChanged(): void;
    /**
     * 设置机器人的身体
     * @param node
     * @returns
     */
    setBody(node: Node_2): this;
    /**
     * 携带物体 (携带后对象的位置和方向将和机器人保持一致)
     * @param obj
     * @returns
     */
    carry(obj: Node_2 | Array<Node_2>): this;
    /**
     * 扔出物体 (朝指定方向扔出指定距离)
     * @param obj
     * @param angle 相对当前朝向的角度, 0度表示正前方, -90度表示左手方向, 90度表示右手方向
     * @param distance 扔出的距离
     * @returns
     */
    throw(obj: Node_2, angle?: number, distance?: number): this;
    /**
     * 将物体抛向指定坐标
     * @param obj 要抛出的物体
     * @param p 目标坐标
     * @returns
     */
    throwTo(obj: Node_2, p: PointLike): any;
    /**
     * 将物体抛向指定坐标
     * @param obj 要抛出的物体
     * @param x 目标x坐标
     * @param y 目标y坐标
     * @returns
     */
    throwTo(obj: Node_2, x: number, y: number): any;
    /**
     * 放在当前位置（脚下）
     * @param obj
     * @returns
     */
    putDown(obj: Node_2): this;
    /**
     * @override
     */
    reset(): this;
}

declare class TopoRobotAnimator extends TopoAnimator {
    topo: TopoRobot;
    constructor(topo: TopoRobot);
    /**
     * 携带物体 (携带后对象的位置和方向将和机器人保持一致)
     * @param obj
     * @param options 动画选项
     * @returns
     */
    carry(obj: Node_2 | Array<Node_2>, options?: TopoAnimationOptions): Promise<any>;
    /**
     * 扔出物体 (朝指定方向扔出指定距离)
     * @param obj
     * @param angle 相对当前朝向的角度, 0度表示正前方, -90度表示左手方向, 90度表示右手方向
     * @param distance 扔出的距离
     * @param options 动画选项
     */
    throw(obj: Node_2, angle?: number, distance?: number, options?: TopoAnimationOptions): Promise<any>;
    /**
     * 将物体抛向指定坐标
     * @param obj 要抛出的物体
     * @param p 目标坐标
     */
    throwTo(obj: Node_2, p: PointLike, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 将物体抛向指定坐标
     * @param obj 要抛出的物体
     * @param x 目标x坐标
     * @param y 目标y坐标
     * @param options 动画选项
     */
    throwTo(obj: Node_2, x: number, y: number, options?: TopoAnimationOptions): Promise<void>;
    /**
     * 放下物体
     * @param obj 要放下的物体
     * @param options 动画选项
     */
    putDown(obj: Node_2, options?: TopoAnimationOptions): Promise<any>;
}

/**
 * “水” 动效节点
 */
export declare class WaterLikeNode extends AENode {
    /**
     * @readonly
     */
    className: any;
    /**
     * 动效参数, 可序列化
     */
    protected aeOptions: WaterLikeOption;
constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 设置动效参数
     * @param opt
     */
    ae(opt: WaterLikeOption): void;
    _afterStyleComputed(): void;
_onAEChanged(): void;
    setupAE(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    set width(w: number);
    get width(): number;
    set height(h: number);
    get height(): number;
    destroy(): void;
}

declare type WaterLikeOption = {
    /** 水高度百分比 */
    capacity?: number;
    /** 水波高度 */
    waveHeight?: number;
};

/**
 *
 * 和图片的主要区别：1. 是矢量的 2. 可以设置线条颜色、粗细 3. 可以设置填充颜色
 */
declare class XMLShape extends Shape {
    className: string;
    desc?: string;
    _pathArray?: Array<any>;
    aspect: "variable" | "fixed";
    constructor();
    draw(ctx: CanvasRenderingContext2D, node: Node_2): void;
    drawSVG(svg: SVGElement, node: Node_2): void;
}

export { }
