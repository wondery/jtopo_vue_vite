declare function add(out: Vec2Type, v1: Vec2Type, v2: Vec2Type): Vec2Type;

/**
 * 动效节点基类
 *
 *  和视频、雪碧图等动画的主要区别在于：动效参数可以动态修改，低成本快速适应一些场景。
 *
 * - 提供了 play() / pause() 方法，可以控制动效的播放和暂停。
 * - 提供了 ae({...}) 方法，可以设置动效参数。
 ```js
 // 例:
 let node = new RipplingNode();
 node.ae({
 // 涟漪动效参数
 circleNumber: 2,
 });
 node.play();
 ```
 */
export declare abstract class AENode extends Node_2 {
/**
     * 动效参数
     */
    protected aeOptions: {
        [key: string]: any;
    };
    /**
     * 动效动画列表
     */
    animations: Array<Animation_2>;
_serializers: any;
    constructor(text?: string, x?: number, y?: number, w?: number, h?: number);
    /**
     * 设置动效参数
     * @param opt
     */
    abstract ae(opt: any): any;
    /**
     * 启动, 第一次加入到动画系统时执行，仅执行一次
     */
    abstract setupAE(): any;
    /** 暂停动画 */
    pause(): void;
    /** 播放动画 */
    play(): void;
    /**@abstract */
    onUnmounted(): void;
    /**
     * @override
     */
    destroy(): void;
}

/**
 * 锚点，表示对象上的某个位置
 */
export declare abstract class Anchor implements Serializable, IAnchor {
    clazz: number;
    className: string;
name: string;

    /**
     * 锚点类型
     */
    usage: AnchorUsageType;
constructor(name?: string, usageType?: AnchorUsageType);


pointermoveHandler(host: any, stage: Stage, xyInHostLocal: PointLike): void;
    pointerupHandler(host: any, stage: Stage, xyInHostLocal: PointLike): void;
    pointerdownHandler(host: any, stage: Stage, xyInHostLocal: PointLike): void;
}

export declare const AnchorClassNameMap: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
};

export declare enum AnchorClazzType {
    NDCAnchor = 0,
    SegmentAnchor = 1,
    AutoAnchor = 2,
    FixedPointAnchor = 3,
    NodePositionAnchor = 4,
    FunctionAnchor = 5
}

export declare enum AnchorIOType {
    /**
     * 未定义
     */
    NONE = 1,
    /**
     * 输入类型
     */
    INPUT = 2,
    /**
     * 输出类型
     */
    OUTPUT = 4
}

export declare enum AnchorOffsetType {
    /**
     * 绝对偏移
     */
    ABSOLUTE = 1,
    /**
     * 相对偏移
     */
    RELATIVE = 2
}

/**
 * AnchorProxy 是 Anchor类的代理，用于计算锚点在宿主对象上的位置
 */
export declare class AnchorProxy {
    /**
     * 锚点
     */
    anchor: Anchor;
    /**
     * 宿主对象
     */
    host?: Node_2 | Link;
    getName(): string;
    setName(name: string): void;
    constructor(anchor: Anchor, host?: Node_2 | Link);
    isDisplayObjectHost(): boolean;
    /**
     * 计算并转换为点
     * @returns
     */
    toPoint(): PointLike;
    /**
     */
    hasHost(): boolean;
    isNodeHost(): boolean;
    equals(other: AnchorProxy): boolean;
    static calcPointByAnchor(host: Node_2 | Link, anchor: Anchor): PointLike;
    static getPointOnNodeHost(hostNode: Node_2, anchor: Anchor): PointLike;
    static getPointOnLinkHost(hostLink: Link, anchor: Anchor): PointLike;
    static getOnLinkPoint(link: Link, anchorProxy: AnchorProxy): PointLike;
    static getAutoPointOnLink(link: Link, anchorProxy: AnchorProxy, otherAnchorProxy: AnchorProxy): PointLike;
    static toLinkLocalPoint(link: Link, host: Node_2 | Link, pointInHostLocal: PointLike): PointLike;
    toJSON(objIndexMap?: Map<NE, number>): any;
}

export declare enum AnchorUsageType {
    /**
     * 未定义
     */
    NONE = 1,
    /**
     * 可编辑
     */
    EDIT = 2,
    /**
     * 连接
     */
    CONNECT = 4,
    /**
     * 调整锚点
     */
    ADJUST = 8,
    /**
     * 调整锚点
     */
    ADJUST_RESIZE = 16,
    /**
     * 锚点
     */
    ADJUST_ROTATE = 32,
    /**
     * 编辑时可被连接
     */
    CONNECT_EDIT = 6
}

/**
 * 动画实例对象
 *
 * 通常通过AnimationSystem来创建该类实例，例如：
 *
 ```js:line-numbers
 // 通常调用animationSystem的anime方法来创建实例:
 let animation = stage.animationSystem.anime({
 from: 0,
 to: 1,
 update: (n) => {
 //flashBall.y = -100 * (1 - n);
 },
 effect: 'easeInQuart',
 duration: 1000,
 times: Infinity,
 direction: 'alternate'
 });

 // 播放
 animation.play();

 // play() 返回一个Promise对象
 animation.play().then(function(){
 // 播放结束后的处理
 });

 // 暂停
 animation.pause();

 // 取消
 animation.cancel();
 ```
 */
declare class Animation_2 {
    /** 名称 */
    name?: string;
    system?: AnimationSystem_2;
    /** 初始数据集 */
    from: AnimationFrameData;
    /** 结束数据集 */
    to: AnimationFrameData;
    currentTime: number;
    /** 开始时间 */
    startTime: number;
    /** 持续时间, 默认为 1000 毫秒 */
    duration: number;
    /**
     * 设置动画开始之前的延迟时间，默认为 0
     * @deprecated 使用 delay 代替
     */
    delay: number;
    /**
     * 运动方向（animation-direction）
     --normal 是正常运动

     --reverse 反向运动

     --alternate 运动完后，动画返回

     --alternate-reverse 反向运动完后，动画返回
     */
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

    /**
     * 能够返回并设置一个可枚举值来描述一个动画的回放状态。
     */
    playState: 'idle' | 'pending' | 'running' | 'paused' | 'finished';
    /** 每一帧执行的动作函数 */
    update: Function;
    isPause: boolean;
    finished: boolean;
    delayed: boolean;
    /**
     *重复次数（animation-iteration-count），默认1
     --可设置数值如： 5
     --也可设置为无限次: Infinity
     */
    times: number;
    /**
     * 已经播放了多少次
     * @readonly
     */
    playedTimes: number;
/** 结束时的回调函数 */
    onEnd?: Function;


effect: EasingNameType;
    /**关联的对 */
    object?: any;
    /**
     *
     * 通过AnimationSystem来创建实例，直接new的动画并不能播放。
     *
     * start 、end 可以是数字，也可以是包含数字的数组
     * <pre>
     * 创建实例时start、end、time、action参数可以为空， 但是调用play()方法之前要确保都已经被赋过值。
     * </pre>
     */
    constructor(opt?: AnimationOption);
    /**
     * 设置各种参数
     * @since v2.5.0
     * @param opt
     */
    setAttributes(opt: AnimationOption): this;
    /**
     * 设置动画每一帧的回调函数
     * @param action
     */
    onUpdate(action: Function): this;
    /**
     * 取消
     * @returns
     */
    cancel(): this;
    /**
     * 暂停
     * @returns {Animation} self
     */
    pause(): this;
    /**
     * 继续，从暂停处继续, 改成？resume
     * @returns {Animation} self
     */
    continue(): this;
/**
     * 开始
     * @return {Promise} 自身
     */
    play(): Promise<any>;
}
export { Animation_2 as Animation }

declare type AnimationFrameData = number | Array<number | PointLike>;

declare type AnimationOption = {
    /** 动画主对象 */
    object?: any;
    /** 动画名称，方便管理 */
    name?: string;
    /**
     * 控制动画的数据起始值
     */
    from: AnimationFrameData;
    /**
     * 控制动画的数据结束值
     */
    to: AnimationFrameData;
    /**
     * 持续时间
     */
    duration?: number;
    /**
     * 每一帧的动画实际动作
     */
    update: Function;
    /**
     * 动画结束时的回调函数
     */
    onEnd?: Function;
    /**
     * 缓动函数名称
     */
    effect?: EasingNameType;
    /**
     *重复次数（animation-iteration-count），默认1
     --可设置数值如： 5
     --也可设置为无限次: Infinity
     */
    times?: number;
    /**
     * 设置动画开始之前的延迟时间，默认为 0
     */
    delay?: number;
    /**
     * 运动方向（animation-direction）
     --normal 是正常运动

     --reverse 反向运动

     --alternate 运动完后，动画返回

     --alternate-reverse 反向运动完后，动画返回
     */
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'normal';
};

export declare class AnimationSystem extends AnimationSystem_2 {
    /** 对象集合 */
    aeNodes: WeakSet<AENode>;
    constructor();
    /**
     * 是否在动画系统中
     * @param obj
     * @returns
     */
    hasAENode(obj: AENode): boolean;
    /**
     * 添加一个对象AENode到动画系统
     * @param aeNode
     */
    addAENode(aeNode: AENode): void;
    removeAENode(aeNode: AENode): void;
}

/**
 * 动画系统
 *
 ```js
 // 使用动画系统
 let animationSystem = new AnimationSystem();

 // 创建一个动画实例：模拟掉落 (节点从当前高度往下掉落200个像素)
 let animation = animationSystem.anime({
 // node的当前高度
 from: node.y,

 // node当前高度向下 200像素
 to: node.y + 200,

 // 动画动作
 update: (n) => {
 node.y = n;
 },

 // 动画效果-缓动（有弹性的感觉）
 effect: 'easeOutBounce',

 // 动画时间
 duration: 2000,
 });

 // 播放
 animation.play();

 ```
 */
declare class AnimationSystem_2 {
    /** 当前的动画集合 */
    animations: Set<Animation_2>;
    /** 对象集合 */
    aeNodes: WeakSet<any>;
    readonly timeline: {
        begin: string;
        end: number;
    };
    constructor();
    /**@protected */
    add(a: Animation_2): void;
    /**@protected */
    remove(a: Animation_2): void;
    /** 取消并移除所有动画 */
    cancelAll(): void;
    tick(now: number): boolean;
    /**
     * 生成一个动画实例
     * @param opt
     * @deprecated 请使用更剪短anim代替
     */
    anime(opt: AnimationOption): Animation_2;
    /**
     * 生成一个动画实例
     * @param opt
     * @returns
     */
    anim(opt: AnimationOption): Animation_2;
}

/**
 * 圆形弧线
 *
 * 例如:
 ```js
 import {ArcLink} from "@jtopo/core";

 // 构造方法和Link一样
 let link = new ArcLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
 ```
 */
export declare class ArcLink extends Link {
    /**@readonly */
    className: any;
    _shape: Shape;
/**
     * 方向
     *
     * 顺时针：clockwise
     * 逆时针：anticlockwise
     */
    direction: RotateDirectionType;
    constructor(text?: string | null, begin?: Linkable, end?: Linkable, beginAnchorName?: ConnectToNodeAnchorType, endAnchorName?: ConnectToNodeAnchorType);
    /**
     * 获取弧线上的点
     * @override
     * @param t
     * @returns
     */
    getPoint(t: number): PointLike;
    /**
     * @override
     */
    getLocalPoint(t: number, segIndex?: number | null): PointLike;

hitTest(x: number, y: number): boolean;
    /**@protected */
    _inArcSide(a: PointLike, z: PointLike, p: PointLike): boolean;
    /**@protected */
    _measureDistance(a: PointLike, z: PointLike, p: PointLike): CurveMeasureResultType;
}

/**@protected */
export declare class ArrowShape extends PolygonShape {
    className: string;
    isClosed: boolean;
    constructor();
    draw(ctx: CanvasRenderingContext2D, node: Node_2): void;
    drawSVG(svg: SVGElement, ne: Node_2): void;
}

export declare const Assets: AssetsClass;

/**@protected */
export declare class AssetsClass {
    constructor();
    /**
     * 获取一个包中的所有图形
     * @param packageName 包名
     */
    getShapes(packageName: string): any[];
    /**
     * 获取一个图形(实例)
     * @param className 类名
     * @returns
     */
    getShape(className: string): Shape;
    /**
     * 将图形对象绘制到一个canvas上, 适用于静态图形
     * @param shape
     * @param canvas
     * @param opt
     * @returns canvas
     * @protected
     */
    drawToCanvas(shape: Shape, canvas: HTMLCanvasElement, opt?: DrawToCavnasOpt): HTMLCanvasElement;
}

/**@protected */
export declare class AutoAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;
    constructor(name: string, usageType?: AnchorUsageType);
}

/**
 * 自动折线
 *
 * 会根据两端点自动计算折点
 *
 ```js
 // 例如
 import {AutoFoldLink} from "@jtopo/core";

 // 构造方法和Link一样：
 let link = new AutoFoldLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
 ```
 */
export declare class AutoFoldLink extends Link {
    className: any;
    _shape: AutoFoldShape;


    /** a和z自动吸附距离, 变为一条直线 */

    /** 开始折点的偏移量 */
    fold1Offset?: PointLike;
    /** 结束折点的偏移量 */
    fold2Offset?: PointLike;
    /** 中线偏移量 */
    centerOffset?: PointLike;

    _serializers: Array<string>;
    constructor(text?: string | null, begin?: Linkable, end?: Linkable, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
    /**
     * 获取连线段数量
     */
    getSegmentCount(): number;
    getCtrlPoints(): ("middle" | "end" | "begin" | "fold1" | "fold2")[];
    setBeginOffsetGap(n: number): void;
    setEndOffsetGap(n: number): void;



setFold1Offset(dx: number, dy: number): void;
    setFold2Offset(dx: number, dy: number): void;
    setCenterOffset(dx: number, dy: number): void;
    resetOffset(): void;
}

declare class AutoFoldShape extends LinkShape {
anchors: Map<string, Anchor>;
    className: string;
    constructor();
}

/**
 * 三次贝塞尔曲线
 *
 ```js
 // 例如:
 import {BezierLink} from "@jtopo/core";

 // 构造方法和Link一样
 let link = new BezierLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
 ```
 */
export declare class BezierLink extends Link {
    className: string;
    _shape: Shape;
    /**
     * 贝塞尔曲线控制点1
     * @protected
     */
    ctrlPoint1?: PointLike;
    /**
     * 贝塞尔曲线控制点2
     * @protected
     */
    ctrlPoint2?: PointLike;
    _serializers: Array<string>;
    constructor(text?: string | null, begin?: Linkable, end?: Linkable, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
    /**
     * @override
     * @param dx
     * @param dy
     * @returns
     */
    translateWith(dx: number, dy: number): this;
    setCtrlPoint1(p: PointLike): void;
    setCtrlPoint2(p: PointLike): void;
    /**
     * 当没有设置贝塞尔的控制点时，自动计算出控制点的位置
     *
     ```js
     // 默认的计算方法如下：
     function autoCalcCtrlPoint(aORz: PointLike, mid: PointLike) {
     let dx = mid.x - aORz.x;
     let dy = mid.y - aORz.y;
     let cx = (mid.x + aORz.x) / 2;
     let cy = (mid.y + aORz.y) / 2;

     let s = 1 - 0.618;
     return {
     x: cx + dx * s,
     y: cy - dy * s
     }
     }

     // 可以根据需要重写, 例如:
     BezierLink.prototype.autoCalcCtrlPoint = function(aORz, mid, zORa) {
     let dx = mid.x - aORz.x;
     let dy = mid.y - aORz.y;
     let cx = (mid.x + aORz.x) / 2;
     let cy = (mid.y + aORz.y) / 2;

     let len = Math.sqrt(dx * dx + dy * dy) / 2;
     let angle = Math.atan2(dy, dx) + Math.PI / 2;

     return {
     x: cx + len * Math.cos(angle),
     y: cy + len * Math.sin(angle)
     };
     }
     ```
     //  * @param aORz a 或者 z
     //  * @param mid a 与 z 的中点
     //  * @returns
     //  */
    /**
     * 计算控制点1和控制点2的坐标
     * @param a 起点
     * @param z 终点
     * @returns 控制点1和控制点2的坐标
     */
    calcCtrlPoints(a: PointLike, z: PointLike): [PointLike, PointLike];
    /**
     * 重置控制点-取消自定义的位置，恢复到自动计算
     */
    resetCtrlPoint(): void;
/**
     * 根据参数t,获取曲线上某点
     * @override
     * @param t 区间 [0,1]
     * @returns
     */
    getPoint(t: number): PointLike;
    /**
     * @override
     */
    getLocalPoint(t: number, segIndex?: number | null): PointLike;
    _updatePoints(): PointLike[];
    hitTest(x: number, y: number): boolean;

}

export declare type BuildCircleOpt = {
    /** 开始角度，默认0 */
    beginAngle?: number;
    /** 结束角度，默认2π */
    endAngle?: number;
    /** 圆环的顶点数，小于3时，按3边形处理 */
    vertexCount?: number;
};

/**
 * 相机对象，更直观简单的方式控制画面的显示、缩放。
 ```js
 let camera = stage.camera;

 // 看向某个坐标 (世界坐标系) , 该坐标将移到画布中心
 camera.lookAt(100, 100);

 // 看向指定对象或者一组对象的中心, 该点将被置于画布中心
 camera.lookAtObject(node);

 // 聚焦在指定对象（及子节点）上，其他对象不可见
 camera.lookOnly(node);

 // 缩放到指定系数
 camera.zoom(2);

 // 缩放最大极限, 默认:10 (最大能放大10倍)
 camera.zoomInLimit = 2;

 // 缩放最小极限，默认:0.1 (最小能缩放到原来的十分之一)
 camera.zoomOutLimit = 0.5;

 // 缩放最大极限, 默认:10 (最大能放大10倍)
 camera.zoomInLimit = 2;
 ```
 * @since 2.5.0
 */
export declare class Camera extends EventTarget_2<CameraEventTypes, CameraEvent> {





/** 是否允许滚轮缩放 */
    wheelZoomEnabled: boolean;
/** 放大系数, 默认1.25 */
    zoomInFactor: number;
    /** 缩小系数, 默认0.8 */
    zoomOutFactor: number;
    /**
     * 缩放最大极限, 默认:10 (最大能放大10倍)
     ```
     //例如：限制最大能缩放2倍
     camera.zoomInLimit = 2;
     ```
     */
    zoomInLimit: number;
    /**
     * 缩放最小极限，默认:0.1 (最小能缩放到原来的十分之一)
     ```
     //例如：限制最小能缩放到原来的一半
     camera.zoomOutLimit = 0.5;
     ```
     */
    zoomOutLimit: number;
/**
     * 当前看向的x坐标
     * @readonly
     */
    lookAtX: number;
    /**
     * 当前看向的y坐标
     * @readonly
     */
    lookAtY: number;
    /**@protected */
    localView: LocalView;
    constructor(stage: Stage);

    /**
     * 锁定相机 (一直保持当前位置和缩放，不再响应滚轮缩放、和拖拽移动)
     */
    lock(): void;
    /**
     * 解锁相机
     */
    unlock(): void;
    /**
     * 相机是否被锁定
     */
    set locked(v: boolean);
    /**
     * 相机是否被锁定
     */
    get locked(): boolean;
    /**
     * 排除某个图元, 该图元对于相机不可见
     * @param obj
     */
    exclude(obj: NE): void;
    /**
     * 恢复某个图元, 该图元对于相机可见
     * @param obj
     */
    include(obj: NE): void;
    /**
     * 对象是否对相机可见
     * @param obj
     * @returns
     */
    canSee(obj: NE): boolean;
    /**
     * 看向某个坐标 (世界坐标系) , 该坐标将移到画布中心
     * @param x
     * @param y
     */
    lookAt(x: number, y: number): void;
/**
     * 缩小(镜头拉远)
     */
    zoomOut(): void;
    /**
     * 放大（镜头推进）
     */
    zoomIn(): void;
    /**
     * 缩放到指定系数
     * @param s 缩放系数
     */
    zoom(s: number): void;
    /**
     * 指定坐标为中心，进行缩放
     * <p>会抛出zoom事件, 可捕获,如：</p>
     ```js
     camera.on('zoom', (event)=>{
     event.preventDefault(); // 阻止缩放
     })
     ```
     * @param s 缩放系数
     * @param cx 缩放中心的x坐标 （世界坐标）
     * @param cy 缩放中心的y坐标 （世界坐标）
     */
    zoomBy(s: number, cx?: number, cy?: number): void;
    /** 世界坐标，转成屏幕坐标 */
    toScreenXY(x: number, y: number): {
        x: number;
        y: number;
    };
    /** 屏幕坐标，转成世界坐标 */
    toWorldXY(x: number, y: number): {
        x: number;
        y: number;
    };
    /**
     * 屏幕坐标下的矩形，变换到Layer坐标系
     * @param rect
     */
    toWorldRect(rect: Rectangle): Rectangle;
    /**
     * 将世界坐标系下的矩形，变换到屏幕坐标系
     * @param rect
     */
    toScreenRect(rect: Rectangle): Rectangle;
/**
     * 聚焦在指定对象（及子节点）上，其他对象不可见
     * @param object 再次聚焦或者为null时会切换或取消聚焦
     */
    lookOnly(object: NE | null): void;
    /**
     * 获取聚焦的对象
     */
    getShowOnlyObject(): NE;
    /**
     * 缩放到画布1：1并居中
     */
    zoomToFit(opt?: {
        padding?: number;
    }): void;
    /**
     * ‘看向’指定Layer的内容中心
     *  @param layer 指定Layer, 默认为当前Layer
     */
    lookAtContentCenter(layer?: Layer): void;
    /**
     * "看向"指定对象或者一组对象的中心(置于画布中心)
     */
    lookAtObject(obj: NE | NE[]): void;
    _updateMatrix(): void;
    reset(): void;


    isDirty(): boolean;
    markDirty(): void;
    clearDirty(): void;
    getTransform(): Transform;
    getScreenTransform(): Transform;
    getObjectScreenTransform(obj: NE): Transform;
    get offsetX(): number;
    set offsetX(v: number);
    get offsetY(): number;
    set offsetY(v: number);
    get scale(): number;
    set scale(v: number);
}

export declare class CameraEvent<K extends keyof CameraEventTypes = keyof CameraEventTypes> extends JTopoEvent<CameraEventTypes, K> {
}

declare type CameraEventTypes = {
    zoom: {
        scale: number;
        afterScale: number;
        factor: number;
        cancelable?: boolean;
        x: number;
        y: number;
    };
    lookAt: {
        cancelable?: boolean;
        x: number;
        y: number;
    };
};

/**
 * Canvas节点
 *
 ```js
 let canvas = document.createElement('canvas');
 let canvasNode = new CanvasNode('', 0, 220, 100, 60);
 canvasNode.setCanvas(canvas);
 ```
 * 注: Canvas节点无法序列化, 需要开发人员自己实现(例如将数据存入.data属性中，画面加载后，再从.data属性中读取数据并绘制)
 ```js
 let canvasNode = new CanvasNode(null, 0, 220, 100, 60);
 canvasNode.type = 'MyCanvasNode';
 // for: 序列化
 canvasNode.data = {
 color: 'red'
 };
 canvasNode.setCanvas(canvas);

 // 反序列化
 stage.fromJSON(json).then(()=>{
 // 获取Layer对象
 let layer = stage.getCurrentLayer();

 // 获取Layer中的所有CanvasNode对象
 let canvasNodes = layer.querySelectorAll(e=> e.type == 'MyCanvasNode');

 canvasNodes.forEach(canvasNode => {
 let data = canvasNode.data;

 let cavnas; // TODO:生成或获取cavnas对象...
 canvasNode.setCanvas(cavnas);

 // 节点尺寸变化时（重绘）
 canvasNode.onSizeChanged = function (newWidth, newHeight) {
 canvas.width = newWidth;
 canvas.height = newHeight;
 ctx.save();
 ctx.fillStyle = data.color;
 ctx.beginPath();
 ctx.arc(newWidth / 2, newHeight / 2, newWidth / 2, 0, Math.PI * 2);
 ctx.fill();
 ctx.restore();
 };
 });
 });
 ```
 */
export declare class CanvasNode extends Node_2 {
    className: any;
    /**
     * @readonly
     */
    canvas?: HTMLCanvasElement;
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
/**
     * 设置canvas作为节点的绘制内容
     *
     * @param
     */
    setCanvas(canvas: HTMLCanvasElement): void;
    /**
     * 当节点尺寸发生变化时
     *
     * 本方法默认会自动调整canvas的大小 （canvas上的内容会被清空，需要重绘）
     *
     * 新的尺寸是在节点内绘制区域的宽度（受节点边框粗细和内边距的影响）
     *
     * @param newWidth 宽度
     * @param newHeight 高度
     */
    onSizeChanged(newWidth: number, newHeight: number): void;
}

/**@ignore */
declare type ClassPropertyNamesExclude<T, E> = Exclude<keyof FilterMethods<T>, E>;

/** Link连接点 */
export declare type ConnectToLinkAnchorType = 'begin' | 'end' | 'auto' | 'middle';

/** Node-默认连接点 */
export declare type ConnectToNodeAnchorType = 'lt' | 'ct' | 'rt' | 'lm' | 'center' | 'rm' | 'lb' | 'cb' | 'rb';

export declare const ConnectToNodePosition: Readonly<{
    lt: "lt";
    ct: "ct";
    rt: "rt";
    lm: "lm";
    rm: "rm";
    lb: "lb";
    cb: "cb";
    rb: "rb";
    center: "center";
    auto: "auto";
}>;

export declare interface Container<T> {
    getChildren(): Array<T>;
    removeAllChildren(): T;
    addChild(child: T): T;
    removeChild(child: T): T;
    hasChild(child: T): boolean;
    contains(child: T): boolean;
}
/**@ignore */
export declare function copyKeyboardEvent(event: KeyboardEvent): KeyboardEvent;

export declare type CoreIconNames = 'Rect' | 'Ellipse' | 'Arrow' | 'Triangle' | 'Diamond';

export declare type CoreNENames = 'Node' | 'ImageNode' | 'TextNode' | 'EllipseNode' | 'TipNode' | 'ShapeNode' | 'VideoNode' | 'RatioNode' | 'CanvasNode' | 'Link' | 'FoldLink' | 'QuadBezierLink' | 'AutoFoldLink' | 'BezierLink' | 'ArcLink' | 'ZShapeLink' | 'HtmlNode';

/**
 * 根据图生成最小生成树
 */
declare function createMinimalSpanningTree(graph: Graph): Graph;

declare function cross(v1: Vec2Type, v2: Vec2Type): number;

export declare const Cursor: Readonly<{
    grabbing: "grabbing";
    default: "default";
    grab: "grab";
    auto: "auto";
    move: "move";
    hand: "hand";
    crosshair: "crosshair";
    s_resize: "s-resize";
    n_resize: "n-resize";
    w_resize: "w-resize";
    e_resize: "e-resize";
    ne_resize: "ne-resize";
    se_resize: "se-resize";
    sw_resize: "sw-resize";
    nw_resize: "nw-resize";
}>;

export declare type CurveMeasureResultType = {
    dist: number;
    t: number;
};

/**@protected */
export declare type CustomNodeShapeOption = {
    /**包名称 */
    package: string;
    /** 类名称 */
    className: string;
    /** 默认和建议宽度 */
    width?: number;
    /** 默认和建议高度 */
    height?: number;
    /** 描述 */
    desc?: string;
    /** 连接点 */
    connections?: Array<{
        name: string;
        x: number;
        y: number;
    }>;
    /** 是否闭合 */
    isClosed?: boolean;
    /** 绘制函数 */
    draw: (ctx: CanvasRenderingContext2D, node: NE) => void;
};

export declare const Debug: {
    paintAABB: boolean;
    debugInfo: any;
    build: string;
};


export declare function delayRun(key: Object, f: () => void, delayTime: number): void;

/**@protected */
export declare class DiamondShape extends PolygonShape {
    className: string;
    constructor();
}

export declare const Direction: Readonly<{
    horizontal: "horizontal";
    vertical: "vertical";
    h: "h";
    v: "v";
    anticlockwise: "anticlockwise";
    clockwise: "clockwise";
}>;

export declare type DirectionType = 'up' | 'down' | 'left' | 'right';

declare function dot(v1: Vec2Type, v2: Vec2Type): number;

/**@protected */
export declare type DrawToCavnasOpt = {
    size: number;
    strokeStyle?: string;
    fillStyle?: string;
    padding?: number;
};

export declare type EasingNameType = 'easeLinear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';

/**
 * 边 (图系统范畴内)
 */
declare class Edge {
    id: number;
    weight: number;
    from: Vertext;
    to: Vertext;
    object: any;
    constructor(from: Vertext, to: Vertext);
    /**
     * 是否自环（Loop）：若一条边的两个顶点为同一顶点，则此边称作自环。
     */
    isLoop(): boolean;
    /**
     * 是否和指定边邻接
     * @param edge
     */
    isAdjacent(edge: Edge): boolean;
}

/**
 * 动效系统

 ```js

 // stage.effectSystem.动效(对象, 动效参数:{参数n:参数值})
 // 例如:
 stage.effectSystem.flash(node, {times: 5, duration:500}).play();
 ```

 * 一个动效源码实现：
 ```ts

 // 生成一个线条流动的动效动画实例
 flow(nodeOrLink: Node | Link, opt: { lineDash?: Array<number>, direction?: 'clockwise'|'anticlockwise' } = {}) {
 let lineDash = opt.lineDash || [3, 2];
 let direction = opt.direction || 'clockwise';

 let dir  = direction == 'clockwise' ? 1 : -1;

 let animationSystem = this.animationSystem;

 nodeOrLink.setStyles({
 lineDash: lineDash
 });

 let animation = animationSystem.anime({
 from: [0],
 to: [300],
 update: (arr) => {
 nodeOrLink.setStyles({
 lineDashOffset: -arr[0] * dir
 });
 },
 times: 20,
 duration: 10000
 });
 return animation;
 }
 ```

 */
declare class EffectSystem {
    animationSystem: AnimationSystem;
    stage: Stage;
    constructor(stage: Stage, animationSystem: AnimationSystem);
    /**
     * 生成一个闪烁的动效动画
     * @param nodeOrLink
     * @param times
     * @param duration
     * @returns 一个闪动动画
     */
    flash(nodeOrLink: Node_2 | Link, opt?: FlashOpt): Animation_2;
    /**
     * 生成一个线条流动的动效动画实例
     * @param nodeOrLink
     */
    flow(nodeOrLink: Node_2 | Link, opt?: FlowOpt): Animation_2;
    /**
     * 在连线的中间位置放置一个文本符号(默认是emoji符号：❌)
     *
     * 可以用来表示：断开、告警、状态等
     *
     * 类似的其他emoji符号：🚫 ❗ ️💢️ ❓ ✅等等
     *
     * @param node
     * @param color
     */
    linkMark(link: Link, opt?: {
        font?: string;
        color?: string;
        text?: string;
    }): Node_2;
}

/**
 * 椭圆节点
 ``` js
 let ellipseNode = new EllipseNode('Ellipse', 181, 48);
 ellipseNode.resize(50, 50);
 ```
 */
export declare class EllipseNode extends Node_2 {
    /**
     * @readonly
     */
    className: any;
    /**
     * @readonly
     * @protected
     */
    _shape: Shape;
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 当做圆形，设置半径，会同时修改width和height
     * @param {number} r 圆半径
     */
    setRadius(r?: number): void;
    /**
     * 获取对象边框或者线上某一点(对象内坐标系)
     */
    getLocalPoint(t: number, segIndex?: number): PointLike;
    set radius(r: number);
    get radius(): number;
}

/**@protected */
export declare class EllipseShape extends Shape {
    className: string;
    constructor();
    draw(ctx: CanvasRenderingContext2D, node: Node_2): void;
    drawSVG(svg: SVGElement, obj: Node_2): void;
    getIntersect(x: number, y: number, obj: NE): Intersect;
}

declare class EventBus<E extends Record<string, any> = {}> {

    /**
     * 增加事件监听
     * @param type 事件类型
     * @param callback 回调函数
     * @param options 选项，once 为 true 时表示只监听一次，执行后自动移除
     */
    on<K extends keyof E>(type: K, callback: EventCallback<E[K]>, options?: {
        once?: boolean;
    }): () => void;
    /**
     * 移除一个事件监听
     * @param type
     * @param callback
     */
    off<K extends keyof E>(type: K, callback: EventCallback<E[K]>): void;
    /**
     * 发送事件
     */
    emit<K extends keyof E>(type: K, data: E[K]): boolean;
    /**
     * 获取事件监听器数量（用于调试）
     */
    getListenerCount<K extends keyof E>(type: K): number;
    /**
     * 是否有该类型的监听
     * @param type
     */
    hasListener<K extends keyof E>(type: K): boolean;
    /**
     * 添加事件监听
     * @param type 事件类型
     * @param callback 回调函数
     * @param options 选项，once 为 true 时表示只监听一次，执行后自动移除
     */
    addEventListener<K extends keyof E>(type: K, callback: EventCallback<E[K]>, options?: {
        once?: boolean;
    }): () => void;
    /**
     * 移除事件监听
     * @param type
     * @param callback
     */
    removeEventListener<K extends keyof E>(type: K, callback: EventCallback<E[K]>): void;
    /**
     * 分发事件
     * @param event
     */
    dispatchEvent<K extends keyof E>(event: {
        type: K;
    } & E[K]): boolean;
}

declare type EventCallback<T> = (event: T) => void;

declare type EventCallback_2<T> = (event: T) => void;

declare type EventsMap = {
    [key in KeyboardEventType]: KeyboardEvent;
};

declare type EventsMap_2 = {
    [key in InputEventType]: PointerEvent | TouchEvent;
};

declare type EventsMap_3 = {
    'dragstart': SelectedGroupEvent;
    'dragend': SelectedGroupEvent;
};

declare type EventsMap_4 = {
    loaded: {
        resource: HTMLImageElement | HTMLCanvasElement;
    };
};

/**
 * 事件对象, 可以监听和分发事件
 */
declare class EventTarget_2<T extends Record<string, any> = {}, E extends Record<string, any> = {}> {
    protected listeners: Map<keyof T, Array<EventCallback_2<T[keyof T]>>>;
    constructor();
    /**
     * 是否有该类型的监听
     * @param type
     */
    hasListener<K extends keyof T>(type: K): boolean;
    /**
     * 增加事件监听
     * @param type 事件类型
     * @param  callback
     */
    addEventListener<K extends keyof T>(type: K, callback: EventCallback_2<T[K]>): () => void;
    /**
     * 移除一个事件监听
     * @param type
     * @param callback
     */
    removeEventListener<K extends keyof T>(type: K, callback: EventCallback_2<T[K]>): any;
    /**
     * 分发事件
     * @param event
     */
    dispatchEvent(event: E): void;
    /** addEventLister的别名 */
    on<K extends keyof T>(type: K, callback: EventCallback_2<T[K]>): () => void;
}
export { EventTarget_2 as EventTarget }

declare type EventTypes = {
    renderAfter: {
        timeUsed: number;
    };
};

/**
 * 导出系统，可以导出为图片、导出并下载图片、导出json文件
 */
declare class ExportSystem {
    render: OverviewRender;
    stage: Stage;
    constructor(stage: Stage);
    /**
     * 将指定DisplayObject对象转成Base64图片编码
     *
     * stage.toDataURL([node1, node2]);
     *
     * 返回示例: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby...
     *
     * @param postProcessing 后期效果处理
     * @returns
     */
    toDataURL(objects: Array<NE | Layer>): Promise<string>;
    toBlob(objects: Array<NE | Layer>): Promise<Blob>;
    /**
     * 将指定对象转成Image对象
     * @param objects
     * @returns
     */
    toImage(objects: Array<NE | Layer>): Promise<HTMLImageElement>;
    /**
     * 导出图片
     */
    saveAsLocalImage(objects?: Array<NE | Layer>, fileName?: string): void;
    /**
     * 导出成图片，并在浏览器新标签页打开
     */
    saveImageInfo(objects?: Array<NE | Layer>): Promise<void>;
    /**
     * 下载为文件
     * @param fileName
     * @param content
     */
    download(fileName: string, content: string, type?: string): void;
saveDataAsFile(data: string, filename: string): void;
}

/**@ignore */
declare type FilterMethods<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

/**
 * 端点: 固定的一个坐标值
 ```js
 import {FixedPointAnchor} from '@jtopo/core';

 // 示例
 let anchor = new FixedPointAnchor(12, 20);
 link.setBegin(anchor);

 等价于:
 link.setBegin({x:12, y:20});

 // node的右上角
 let anchor = new FixedPointAnchor(node.width/2, -node.height/2, fromNode);

 // node的中心
 let anchor = new FixedPointAnchor(0, 0, fromNode);

 // node的左下角
 let anchor = new FixedPointAnchor(-node.width/2, node.height/2, 0, fromNode);
 ```
 * @protected
 */
export declare class FixedPointAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;
    x: number;
    y: number;
/**
     *
     * @param x
     * @param y
     */
    constructor(x: number, y: number);
}

/**
 * 闪烁动效参数
 */
declare type FlashOpt = {
    /**
     * 闪烁次数
     */
    times?: number;
    /**
     * 持续时间
     */
    duration?: number;
};

/** 线条（虚线）流动动效参数 */
declare type FlowOpt = {
    /**
     * 虚线样式, 如: [3, 2]
     */
    lineDash?: Array<number>;
    /**
     * 方向：clockwise(顺时针) | anticlockwise (逆时针)
     */
    direction?: 'clockwise' | 'anticlockwise';
    /**
     * 速度，默认: 10000毫秒, 越小流动速度越快
     */
    duration?: number;
    /**
     * lineDashOffset的总偏移量, 默认300
     */
    distance?: number;
};

/**
 * cavnas 设置字体只能通过一个 font 属性，
 *
 * 该类可以对font属性里的属性做细化操作，可以单独设置字体、字号、粗体、斜体
 *
 ```js
 // 例如:
 let fontInfo = new FontInfo('normal normal 10px sans-arial');

 fontInfo.setFamily('arial');
 fontInfo.setSize('15px');
 fontInfo.setBold('bold');
 fontInfo.setItalic('normal');

 // 粗体、斜体切换
 fontInfo.toogleBold();
 fontInfo.toogleItalic();

 node.setStyles({
 font: fontInfo.toStyleFont() //->"bold normal 15px arial"
 });
 ```
 *
 */
export declare class FontInfo {
    boldWeight: string;
    italicWeight: string;
    size: string;
    family: string;
    constructor(fontStr: string);

    /**
     * 获取字体权重
     * @returns
     */
    getFontWeight(): string;
    /**
     * 设置字体权重
     * setFontWeight('bold')、setFontWeight('italic')
     * setFontWeight('bold normal')、setFontWeight('normal italic')、setFontWeight('bold italic')
     * @param weight 字体权重
     */
    setWeight(weight: string): void;
    /**
     * 设置字体
     * @param family 字体
     */
    setFamily(family: string): void;
    /**
     * 设置字体大小
     * @param size 字体大小
     */
    setSize(size: string): void;
    /**
     * 设置加粗
     * @param bold 加粗
     */
    setBold(bold: string): void;
    /**
     * 设置斜体
     * @param italic 斜体
     */
    setItalic(italic: string): void;
    /**
     * 切换加粗
     */
    toogleBold(): void;
    /**
     * 切换斜体
     */
    toogleItalic(): void;
    /**
     * 转换为符合canvas的样式字符串
     *
     * @returns
     */
    toStyleFont(): string;
}

/**
 * 字体工具类， 提供了一些文本尺寸测量功能
 *
 * 可以将测量结果缓存来提高性能
 */
export declare class FontUtil {
    constructor();
    /**
     * 测量单行文本尺寸
     *
     * （谷歌浏览器默认的字体是："10px sans-serif"）
     *
     * let size = FontUtil.measureTextSize('测试文本', 'normal 12px 宋体');
     *
     * let width = size.width;
     * let height = size.height;
     */
    static measureTextSize(text: string, font?: string): {
        width: number;
        height: number;
    };
    /**
     * 测量多行尺寸
     *
     * （谷歌浏览器默认的字体是："10px sans-serif"）
     *
     * let size = FontUtil.measureTextArraySize(['第一行', '第二行长度'], 'normal 12px 宋体');
     *
     * let width = size.width;
     * let height = size.height;
     */
    static measureTextArraySize(textArr: Array<string>, font: string): {
        width: number;
        height: number;
    };
}

/**
 * 斥力布局
 *
 * 当前版本暂不支持变换（缩放、平移、旋转等）
 */
export declare class ForceDirectLayout {
    frame_width: number;
    frame_height: number;
    origin: Node_2;
    originWeight: number;
    speed: number;
    gravity: number;
    maxForceDistance: number;
    originEdges: any[];
    selectedNode: number;
    nodes: Node_2[];

    /**
     * @param originNode 原点
     * @param frame_width
     * @param frame_height
     */
    constructor(originNode: Node_2, frame_width: number, frame_height: number);
    initNodes(originNode: Node_2): void;
    initialize(): void;
    originForce(nodeI: any, distance: any): void;
    attractiveForce(nodeI: any, nodeJ: any, distance: any): void;
    repulsiveForce(nodeI: any, nodeJ: any, distance: any): void;
    /**
     *  执行布局
     *
     *  暂时不支持动画参数
     */
    doLayout(): void;
    /**
     * 应用一次,
     */
    applyForce(): void;
    bounds(node: Node_2): void;
    setOriginEdgeWeight(node: any, weight: any): void;
    addNode(node: any, mass: any): void;
    getLink(node1Id: any, node2Id: any): any;
    addLink(node1: any, node2: any, weight: any): void;
}

declare type FromJsonInfo = {
    resourcesArr: JsonResourcesType[];
    objJson: SerializedDisplayObjectType;
    styleIndexMap: Map<number, Style>;
    shapeIndexMap: Map<number, Shape>;
};

/**@protected */
export declare class FunctionAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;
    constructor(name: string | null, usageType?: AnchorUsageType);
}

export declare const FunctionName: Readonly<{
    AutoFoldLinkCenter: "com.jtopo.AutoFoldLink.center";
    AutoFoldLinkFold1: "fold1";
    AutoFoldLinkFold2: "fold2";
    LinkCenter: "center";
    LinkBegin: "begin";
    LinkEnd: "end";
    QuadBezierLinkCtrlPoint: "ctrlPoint";
    BezierLinkCtrlPoint1: "ctrlPoint1";
    BezierLinkCtrlPoint2: "ctrlPoint2";
    QuadBezierLinkCenter: "com.jtopo.QuadBezierLink.center";
    BezierLinkCenter: "com.jtopo.BezierLink.center";
    ArcLinkCenter: "com.jtopo.ArcLink.center";
}>;

/**
 * 几何顶点（坐标）生成与操作工具类
 *
 * 此类生成的所有顶点坐标均经过归一化（[-1, 1]）处理。
 *
 * 归一化后的顶点坐标极大地简化了图形变换操作，如缩放、旋转、斜切等。
 *
 * @since 2.6.0
 */
export declare abstract class GeomUtils {
    /**
     * 归一化（[-1, 1]）到一个尺寸为2x2的正方形内
     *
     * @param points 顶点坐标数组
     * @returns 坐标归一化后的坐标数组
     */
    static normalizePoints(points: PointLike[]): {
        x: number;
        y: number;
    }[];
    /**
     * 点坐标转换为法向向量
     * @param points 点坐标数组
     * @param isClosed 是否闭合
     * @returns 向量数组
     */
    static pointsToNormalVecs(out: Array<vec2>, points: Array<PointLike>, isClosed?: boolean): void;
    /**
     * 旋转点坐标
     * @param normalPoints 归一化坐标数组
     * @param angle
     * @param cx 旋转中心x坐标，默认为几何原点
     * @param cy 旋转中心y坐标, 默认为几何原点
     * @returns
     */
    static rotatePoints(normalPoints: Array<PointLike>, angle: number, cx?: number, cy?: number): PointLike[];
    /**
     * 将所有矩形的相关位置和尺寸投影到另外一个矩形内以后的矩形列表
     * @protected
     */
    static normalizeRects(rects: Array<Rectangle>, projectRect: Rectangle): Rectangle[];
    /**
     * 计算一组点的最小外接矩形（Bounding Box）
     * @param points 点集合
     * @returns 包含所有点的最小矩形
     */
    static getBoundingBox(points: Array<PointLike>): Rectangle;
    static isPointInPolygon(point: PointLike, polygon: Array<PointLike>): boolean;
    static getLineIntersectPoint(p1: PointLike, p2: PointLike, p3: PointLike, p4: PointLike): {
        x: number;
        y: number;
    };
    static getLineIntersectPoints(p1: PointLike, p2: PointLike, segPoints: Array<PointLike>, isClosed: boolean): PointLike[];
    static getFirstIntersectPoint(p1: PointLike, p2: PointLike, segPoints: Array<PointLike>, isClosed: boolean): {
        x: number;
        y: number;
    };
}

/**
 * 图对象，这里的图默认是：有向、连通图
 *

 ```js
 // 代码示例：
 // node&link对象集合
 let objects = layer.children;

 // 转成图对象（0-多个）
 let graphArr = stage.graphSystem.objectsToGraphs(objects);

 let graph = graphArr[0];
 console.log(graph.isTree());

 // 顶点集合
 let vertexes = graph.vertexes;
 console.log('第一个顶点的出度为:', graph.vertexes[0].getOutDegree());

 // 边集合
 let edges = graph.edges;
 // ...
 ```
 */
export declare class Graph {
    /**
     * 有向图还是无向图
     */
    hasDirection: boolean;
    /**
     * 顶点
     */
    vertexes: Array<Vertext>;
    /**
     * 边
     */
    edges: Array<Edge>;
    /**
     * 生成0-n棵虚拟树( 提出去放到system)
     * @param {Array} displayObjects
     */
    constructor(vertexes: Array<Vertext>, edges: Array<Edge>);
    /**
     * 是否零图(有节点，无边)
     */
    isZero(): boolean;
    /**
     * 是否平凡图(仅有一个节点，无边)
     */
    isAlone(): boolean;
    /**
     * 遍历整个图所有节点和边, 深度优先
     */
    traverse(begin?: Vertext, type?: 'depth' | 'breadth', rs?: any[], history?: Set<unknown>): any[];
    /**
     * 获取最大度顶点
     */
    getMaxDegreeVertext(): Vertext;
    /**
     * 获取最小度
     */
    getMinDegree(): number;
    getPathList(u: Vertext, v: Vertext, history?: Set<unknown>): Array<Path>;
    /**
     * 阶（Order）：图G中点集V的大小称作图G的阶。
     */
    getOrder(): number;
    /**
     * 目前版本暂未实现
     * 桥（Bridge）：若去掉一条边，便会使得整个图不连通，该边称为桥。
     */
    isBridge(): void;
    /**
     * 目前版本暂未实现
     *
     * 判断给定图是否当前图的子图。
     *
     * 子图（Sub-Graph）：当图G'=(V',E')其中V‘包含于V，E’包含于E，则G'称作图G=(V,E)的子图。每个图都是本身的子图。
     * @param g
     */
    isSubGraph(g: Graph): void;
    /**
     * 是不是一棵树
     * 图是树需要满足三个条件：
     * 1. 图中结点均连通，即结点属于同一个集合；
     * 2. 没有回路
     * 3. 是无向的
     */
    isTree(): boolean;
    /**
     * 严格按照方向->从指定节点遍历所有顶点
     * 1. 广度优先
     * 2. 到头或者再次遇到自己结束
     * @param graph
     * @returns
     */
    travelNext(rootVetext: Vertext): any[];
    clone(): Graph;
    check(): void;
}

/**
 * 图系统 （贴合数学上的图论）
 *
 * 一、提供静态方法，可以把Node/Link对象集合转成 图对象；
 *
 * 二、根据图对象可以更方便的分析对象关系，例如：
 * 1. 某个节点的出入度、邻接节点列表
 * 2. 图的遍历
 * 3. 从一个节点到另外一个节点的路径信息等
 *
 * 提供、提供常用算法，例如：
 * 1. 最小生成树
 * 2. 判断一个图是否是“树”（ 是否有回路 等）
 * 3. 是否零图
 * 3. 图的阶（Order）、是否零图、是否平凡图等
 *

 ```js
 // 代码示例：
 // node&link对象集合
 let objects = layer.children;

 // 转成图对象（0-多个）
 let graphArr = stage.graphSystem.objectsToGraphs(objects);

 let graph = graphArr[0];
 console.log(graph.isTree());

 // 顶点集合
 let vertexes = graph.vertexes;
 console.log('第一个顶点的出度为:', graph.vertexes[0].getOutDegree());

 // 边集合
 let edges = graph.edges;
 // ...

 ```
 */
export declare class GraphSystem {
    /**
     * 根据图生成最小生成树
     */
    static createMinimalSpanningTree: typeof createMinimalSpanningTree;
    getNodes(graph: Graph): any[];
    getLinks(graph: Graph): any[];
    /**
     * 将Node或者Link集合转成图列表
     * @param displayObjects
     * @returns
     */
    objectsToGraphs(displayObjects: Array<Node_2 | Link>): Array<Graph>;
    toGraphs(vertexes: Array<Vertext>, edges: Array<Edge>): Array<Graph>;
    travelVertext(v: Vertext, subVertexes?: Array<Vertext>, subEdges?: Array<Edge>, markSet?: Set<any>): void;
    /**
     * 生成1棵虚拟树( 提出去放到system)
     * @returns Array
     */
    toTree(graph: Graph): VirtualTree;
}

/**
 * 处于最顶层，响应鼠标操作，对应一个Canvas
 * @protected
 */
export declare class HandlerLayer extends Layer {
    readonly className: any;


constructor();
    _pickUp(x?: number, y?: number): NE | null;
/**
     * @protected
     */
    pointeroutHandler(event: any): void;
    /**
     * @protected
     */
    pointerupHandler(): void;
    /**
     * @protected
     */
    update(): boolean;
}

export declare interface HasVisbility {
    show(): any;
    hide(): any;
    isVisible(): boolean;
}

/**
 * HTML节点
 *
 * 可以使用 HTML 作为节点内容，功能强大
 *
 ```js
 import { HtmlNode } from '@jtopo/core';
 let htmlNode = new HtmlNode(null, 0, 220, 100, 60);
 htmlNode.setHtml(`
 <style>
 div{
 width:100%;
 height:100%;
 background-color:red;
 }
 </style>
 <div>Hello World</div>`);
 ```
 * - 不同浏览器下HTML的显示效果可能有差异
 * - 仅支持静态类的内容（图片/视频不支持，图片src仅支持base64编码）
 * - 多测试
 */
export declare class HtmlNode extends Node_2 {
    className: any;
protected _domElement?: HTMLElement;
/**
     * 图片对象, 只读，不要修改 绘制的时候使用
     */
    imageObject?: HTMLImageElement;
/**
     * 导出占位符文本, 默认：HTML
     */
    exportPlaceholderText: string;
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);

/**
     * 设置html
     */
    setHtml(html: string): void;
    /**
     *
     * @param domElement
     */
    setDom(domElement: HTMLElement): void;
    getDom(): HTMLElement | null;

/**
     * 获取html
     */
    get html(): string;
    /**
     * 设置html
     */
    set html(v: string);
}

export declare interface IAnchor {
    clazz: number;
    name: string;
    usage: AnchorUsageType;
    pointermoveHandler(host: Node_2 | Link | null, stage: Stage, xyInHostLocal: PointLike): any;
    pointerupHandler(host: Node_2 | Link | null, stage: Stage, xyInHostLocal: PointLike): any;
    pointerdownHandler(host: Node_2 | Link | null, stage: Stage, xyInHostLocal: PointLike): any;
}

/**
 * 图片节点
 *
 ```js
 let imgNode = new ImageNode('', 0, 220, 100, 60);
 // 图片
 imgNode.setImage('./assets/img/camer.png');
 ```
 */
export declare class ImageNode extends Node_2 {
    className: any;
    /**
     * 图片对象, 只读，不要修改 绘制的时候使用
     * @readonly
     */
    imageObject?: HTMLImageElement;

    /**
     * @since 2.5.0
     */
    get image(): string | HTMLImageElement;
    /**
     * @since 2.5.0
     */
    set image(v: string | HTMLImageElement);

    /**
     * 获取图片的src (方便编辑或序列化时作为字符串来操作)
     *
     * ```js
     * // 读取或判断
     * node.imageSrc === './img/abc.png'; // true
     * node.imageSrc === 'data:image/png;base64,.....'; // true
     * ```
     */
    get imageSrc(): string;
    /**
     * 使用src来设置图片 (方便编辑或序列化时作为字符串来操作)
     *
     * ```js
     * // 设置
     * node.imageSrc = './img/abc.png';
     * node.imageSrc = 'data:image/png;base64,.....';
     * ```
     */
    set imageSrc(v: string);
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
/**@protected */
    protected _drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void;
    /**
     * 设置节点的内容：（可以是图片、canvas）
     *
     ```js:line-numbers
     // 图片(jpg、png、svg、gif 等常见格式)
     let img = new Image();
     img.src = "abc.jpg";
     node.setImage(svgImg);

     // 图片路径
     node.setImage("./img/abc.jpg");

     // 加载后的处理
     node.setImage("./img/abc.jpg").then(function(image){
     node.resize(image.width, image.height);
     });

     // 手动控制图片加载
     let img = new Image();
     img.src = "./img/abc.jpg";
     img.onload = function(){
     node.setImage(img);
     node.resize(img.width, img.height);
     };

     // SVG字符串
     import { ImageUtil } from '@jtopo/core';
     let svgImg = ImageUtil.svgToImage(`<svg xmlns='http://www.w3.org/2000/svg' width="24" height="24"><path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"/></svg>`;
     node.setImage(svgImg);
     ```
     * @param imgObj 图片对象(Image)、图片路径
     * @param fitSize 图片加载完成后，节点尺寸是否自动调整到图片的实际大小, 默认false
     */
    setImage(imgObj: string | HTMLImageElement, fitSize?: boolean): Promise<HTMLImageElement | null>;
/**
     * 调整尺寸到图片的实际大小
     */
    resizeToFitImage(): this;
    /**
     * 获取图片
     *
     * 因为 node.image = 'abc.png' 和 node.setImage('abc.png') 是异步的
     *
     * 所以这里是异步的
     ```js
     node.getImageObject().then(function(image){
     if(image == null){
     return;
     }
     console.log(image);
     })
     ```
     *
     */
    getImageObject(): Promise<HTMLImageElement | null>;
/**@override */
    _toJSON(indexInfo?: ObjectIndexInfo): SerializedDisplayObjectType;
    /**@override */
    _fromJSON(fromJsonInfo: FromJsonInfo): void;
    destroy(): void;
}

/**
 * 图片相关工具类
 */
export declare class ImageUtil {


    /**
     * 创建网格背景图片（图片为Base64编码形式: data:image/svg+xml;charset=UTF-8,....）
     * @param width
     * @param height
     * @param row
     * @param col
     * @param fillStyle
     * @param strokeStyle
     */
    static bgGrid(w: number, h: number, row: number, col: number, fillStyle?: string, strokeStyle?: string): string;
    /**
     * 创建网格背景图片
     *
     * 返回形式: url("data:image/svg+xml;charset=UTF-8,...")
     * @param width
     * @param height
     * @param row
     * @param col
     * @param fillStyle
     * @param strokeStyle
     * @returns
     */
    static createGridImage(width: number, height: number, row: number, col: number, fillStyle: string, strokeStyle: string): string;
    /** 系统默认的‘亮色’背景网格图 */
    static createLightGridImg(fillStyle: string, strokeStyle: string): string;
    /** 系统默认的‘暗色’背景网格图 */
    static createDarkGridImg(fillStyle: string, strokeStyle: string): string;
    /**
     * SVG字符串转成图片格式的URL
     * @returns 'data:image/svg+xml;charset=UTF-8,' + svgString;
     */
    static svgToImageUrl(svgString: string): string;
    /**
     * SVG字符串转成图片格式的URL
     * @returns 'data:image/svg+xml;charset=UTF-8,' + svgString;
     */
    static svgToImage(svgString: string): HTMLImageElement;

    /**
     * 根据图片对象和颜色 生成一个新的Image对象
     * 例如： ImageUtil.colorFilter(image, [255, 0, 0])
     * 或者自定义滤镜：
     ```js
     const filterImg = ImageUtil.colorFilter(img, function (r, g, b, a) {
     g = g > 0 ? 255 : 0;
     return [r, g, b, a];
     });
     ```
     * @param image
     * @param color
     * @returns
     */
    static colorFilter(image: HTMLImageElement, color: Array<number> | Function): HTMLImageElement;
    static parseImgUrl(url: string): string;
    /**
     * 将：./img/abc.png 或 data:image 统一转换为 data:image/xxx 格式
     *
     * 加载图片并转换为DataURL
     * @param imageUrl 图片URL
     * @returns 图片的DataURL数据
     */
    static loadImageAsDataUrl(imageUrl: string): Promise<string>;
    /**
     * SVG字符串转成图片格式的URL
     * 返回形式:
     * data:image/svg+xml;charset=UTF-8,<svg>...</svg>
     *
     * <svg>...</svg> 编码后的
     * @param html svg字符串
     * @param w 宽度
     * @param h 高度
     * @returns data:image/svg+xml;charset=UTF-8,encodedSvg
     */
    static svgToImageDataUrl(html: string, w: number, h: number): string;
    /**
     * 判断图片是否有效
     * @param img 图片对象
     * @returns 是否有效
     */
    static isImageValid(img: HTMLImageElement): boolean;
    /**
     * @deprecated 请使用 loadImageAsBase64 代替
     */
    static loadAndConvertImage(imageUrl: string): Promise<string>;
    /**
     * @deprecated 请使用 loadImageAsDataUrl 代替
     */
    static loadImageAsBase64(imageUrl: string): Promise<string>;
    /**
     * @deprecated 请使用 svgToImageDataUrl 代替
     */
    static svgToImageBase64(html: string, w: number, h: number): string;
    /**
     * @deprecated 代替
     */
    static batchLoadImagesToBase64(imageUrls: string[]): Promise<string[]>;
}

declare const InputEventList: readonly ["pointerdown", "pointerup", "pointermove", "pointerenter", "pointerout", "wheel", "click", "dblclick", "dragstart", "dragend", "dragover", "drop", "touchstart", "touchmove", "touchend"];

declare type InputEventType = typeof InputEventList[number];

/**
 * 输入系统（管理鼠标或触摸信息和状态）, 基类
 */
export declare class InputSystem<T> extends EventTarget_2<EventsMap_2> {
    domElement: HTMLElement;
    type: InputEventType;
    /**
     * 忽略一些事件 来提高性能、降低能耗
     *
     * 图元对象不再触发和响应 pointermove、pointerenter、pointerout事件
     */
    skipPointerMovePicking: boolean;
    /**
     * 当前鼠标选中的对象
     */
    target: T | null;
    /**
     * 上一次鼠标选中的对象
     */
    preTarget: T | null;
    /**
     * 当前鼠标指向的对象
     */
    mouseoverTarget: T | null;
    /**
     * 上一次鼠标指向的对象
     */
    preMouseoverTarget: T | null;
    /**
     * 当前拖拽时的目标对象
     */
    dropTarget: T | null;
    /**
     * 鼠标按下时的坐标（canvas坐标）
     */
    pointerDownX: number;
    /**
     * 鼠标松开时的坐标(canvas坐标)
     */
    pointerDownY: number;
    /**
     * 鼠标或指针的屏幕坐标x(canvas左上角为0,0)
     */
    x: number;
    /**
     * 鼠标或指针的屏幕坐标y(canvas左上角为0,0)
     */
    y: number;
    /**
     * 相对于上一次鼠标或指针x的移动增量（canvas坐标系）
     */
    dx: number;
    /**
     * 相对于上一次鼠标或指针y的移动增量（canvas坐标系）
     */
    dy: number;
    /**
     * 鼠标或指针在世界坐标系下的x坐标
     */
    xInWorld: number;
    /**
     * 鼠标或指针在世界坐标系下的y坐标
     */
    yInWorld: number;
    /**
     * 世界坐标系下的x坐标增量
     */
    dxInWorld: number;
    /**
     * 世界坐标系下的y坐标增量
     */
    dyInWorld: number;
    /**
     * 鼠标或指针是否按下
     */
    isPointerDown: boolean;
    /**
     * 是否右键 (鼠标设备时)
     */
    isRightButton: boolean;
    /**
     * 状态: 是否拖拽结束
     */
    isDragEnd: boolean;
    /**
     * 状态: 是否在拖拽中
     */
    isDraging: boolean;
    /**
     * 状态: 鼠标或指针是否在画布上
     */
    isPointerOn: boolean;
    /**
     * 状态: 是否拖拽的开始
     */
    isDragStart: boolean;
    /**
     * 原始的事件对象
     */
    event: PointerEvent | TouchEvent;
    /**
     * 上一次事件的状态记录
     */
    previous: PreviousType;
/**
     * 状态: 鼠标或指针是否空闲
     */
    isIdle: boolean;
    /**
     * 鼠标或指针空闲时间, 50毫秒内没有动作时认为空闲
     */
    idleTimeout: number;
buttons: number;
    button: number;
    _touchWheel: TouchWheel;
    eventObservable: Observable<TouchEvent | PointerEvent>;
    _worldPosConverter?: () => void;
    constructor(domElement: HTMLElement);



_setTarget(target: T): void;
    _clearTarget(): void;
    _mouseEventForwardToCanvas(canvas: HTMLCanvasElement): void;
    /**
     * @deprecated
     */
    preventDefault(): void;
    reset(): void;
}

export declare interface Interactable {
    pointerdownHandler(event: any): any;
    pointerupHandler(event: any): any;
    pointerenterHandler(event: any): any;
    pointeroutHandler(event: any): any;
    pointermoveHandler(event: any): any;
    clickHandler(event: any): any;
    dblclickHandler(event: any): any;
    dragHandler(event: any): any;
    dragEndHandler(event: any): any;
}

export declare class Intersect {
    x: number;
    y: number;
    object: any;
    seg: Array<PointLike>;
    dist?: number;
    segIndex?: number;
    segLen?: number;
    projectionLen?: number;
    t?: number;
    length: number;
    constructor(x?: number, y?: number);
}

/**
 * 观察者接口
 *
 * 观察者模式中的观察者对象，用于接收 Observable 发出的数据
 *
 * @template T 数据类型
 *
 * @example
 * ```typescript
 * const observer: IObserver<number> = {
 *   next: (value) => console.log('收到值:', value),
 *   error: (err) => console.error('发生错误:', err),
 *   complete: () => console.log('流已完成')
 * };
 * ```
 */
declare interface IObserver<T> {
    /** 接收下一个值的回调函数 */
    next: (value: T) => void;
    /** 接收错误信息的回调函数（可选） */
    error?: (error: Error) => void;
    /** 流完成时的回调函数（可选） */
    complete?: () => void;
}

/**
 * 订阅接口
 *
 * 表示对 Observable 的订阅，提供取消订阅的方法和订阅状态
 *
 * @example
 * ```typescript
 * const subscription = observable.subscribe(observer);
 *
 * // 检查订阅状态
 * if (!subscription.closed) {
 *   console.log('订阅仍然活跃');
 * }
 *
 * // 取消订阅
 * subscription.unsubscribe();
 * ```
 */
declare interface ISubscription {
    /** 取消订阅的方法 */
    unsubscribe(): void;
    /** 订阅是否已关闭 */
    closed: boolean;
}

export declare interface JsonResourcesType {
    type: 'img';
    src: string;
}

/**
 * 事件基类
 * @template T - 事件映射类型，例如{zoom: {scale: number, afterScale: number, factor: number, cancelable?: boolean, x: number, y: number}}
 * @template K - 事件类型键，必须是 T 的键
 * @template TARGET - 事件目标类型，例如 NE
 */
export declare class JTopoEvent<T = any, K extends keyof T = keyof T, TARGET = any> {
    defaultPrevented: boolean;
    cancelable: boolean;
    target?: TARGET;
    type: K;
    constructor(type: K, data?: T[K]);
    preventDefault(): void;
}

/**
 * 完整的 JTopo 事件类型（包含展开的数据属性）
 * 使用此类型可以直接访问事件数据属性，如 event.newWidth 而不是 event.data.newWidth
 */
export declare type JTopoEventType<T, K extends keyof T> = JTopoEvent<T, K> & T[K];

export declare const JTType: {};

/**
 * 键盘抽象
 *
 * 示例：
 ```js

 // 绑定快捷键
 let keyboard = stage.keyboard;

 keyboard.bindKey('Shift+a', ()=> {
 console.log('shift+a');
 });

 // 解绑
 keyboard.unbind('Shift+a');
 ```
 */
export declare class Keyboard extends EventTarget_2<EventsMap, KeyboardEvent> {


/**
     * 是否禁用
     * @readonly
     */
    disabled: boolean;

constructor();
    /** 禁用jtopo的快捷键 */
    disable(): void;
    /** 启用jtopo默认的快捷键 */
    enable(): void;
    isControlDown(): boolean;
    isShiftDown(): boolean;
    isAltDown(): boolean;
    isMetaDown(): boolean;
    /**
     *
     * 绑定按键 (重复绑定会覆盖)
     * @param {string} keyInfo 例如"Control+a" 、"Meta+a"、 ”G" 、”Shift+1“
     * @param {Function} callback 触发处理函数
     */
    bindKey(keyInfo: string, fn: Function, preventDefault?: boolean): void;
    /**
     * 判断按键是否已经注册
     * @param keyInfo
     * @returns
     */
    isKeyRegistered(keyInfo: string): boolean;
    /**
     * 获取按键绑定的函数
     * @param keyInfo
     * @returns
     */
    getKeyBinding(keyInfo: string): KeyboardBindOptions;
    /**
     * 解绑按键
     * @param {String} keyInfo 例如"Control+a" 、"Meta+a"、 ”G" 、”Shift+1“
     * */
    unbind(keyInfo: string): void;
    /**
     * 指定的单个键是否按下
     * @param {String} keyInfo
     * @returns {Boolean}
     */
    isKeydown(keyInfo: string): boolean;
    /**@protected */
    sendKey(keyStr: string, event: any): void;




}

declare type KeyboardBindOptions = {
    keyInfo: string;
    fn: Function;
    preventDefault?: boolean;
};

declare type KeyboardEventType = 'keydown' | 'keyup';

/**
 * 只用作展示的层，每个层对应一个Canvas. 只有加入到Layer中的对象(Node、Link及其子类的实例），才可能被绘制并显示出来.
 *
 ```js

 // 创建
 let layer = new Layer('myLayer');
 stage.addLayer(layer);

 // 常用方法

 // 添加对象
 layer.addChild(node);
 layer.addChildren([node1, node2, link1, link2, node3]);

 // 查找对象
 let node = layer.querySelector('Node[name="node1"]');
 let nodes = layer.querySelectorAll('.myClass');
 let link = layer.querySelector('[text="myLink"]');

 // 设置背景
 // 颜色
 layer.setStyles({
 background: 'gray'
 });

 ```
 */
export declare class Layer extends NE {
    /**
     * @readonly
     */
    className: any;
    /**
     * @readonly
     */
    readonly isLayer: boolean;
    /**
     * @readonly
     */
    stage: Stage;
    /**@protected */
    render: Renderer;
    deep: number;









constructor(stage?: Stage | string);



/** 获取绘制到画布上集合 */
    getRenderSet(): Set<Node_2 | Link>;

/** 请求更新画面一次 */
    update(): void;


/**@protected */
    _pickUp(x?: number, y?: number): NE | null;


get visible(): boolean;
    set visible(v: boolean);
    draw(ctx: any): void;
    /**
     * 强制立即重绘一次，绝大多数情况下应该使用update方法，该方法特殊情况下才可能被用到
     */
    _forceUpdate(): void;
/**
     * 设置样式，对于Layer只支持设置背景,
     *
     * @deprecated 请使用语义setBackground方法
     */
    setStyles(styleOption: PartStyleOptionType): this;
    /**
     * 设置样式，对于Layer只支持设置背景
     * @deprecated
     */
    setBackground(styleOption: {
        background?: string;
        backgroundImage?: string;
        backgroundRepeat?: string;
        backgroundPosition?: string;
        backgroundSize?: string;
    }): this;
    addChild(child: NE): this;
    addChildren(childs: Array<NE>): this;
    /**
     * 递归式 获取所有节点对象
     * @returns 所有节点对象
     */
    getAllNodes(): Array<NE>;
    /**
     * 递归式 获取所有连线对象
     * @returns 所有连线对象
     */
    getAllLinks(): Array<Link>;
    /**
     * 查询所有符合条件的对象
     * @param querySelector
     * @returns
     */
    querySelectorAll(querySelector?: string | ((child: Node_2 | Link) => boolean)): (Node_2 | Link)[];
    /**
     * 查询符合条件的第一个对象
     * @param querySelector
     * @returns
     */
    querySelector(querySelector: string | ((child: Node_2 | Link) => boolean)): Node_2 | Link;
    /**
     * @deprecated 请使用  定时器或requestAnimationFrame 配合 layer.update() 来控制
     */
    loopRender(): void;
    /**
     * @deprecated 请使用  定时器或requestAnimationFrame 配合 layer.update() 来控制
     */
    endLoopRender(): void;







/**
     * 销毁
     */
    destroy(): void;
    /**
     * @deprecated 已过时
     **/
    get displayList(): (Node_2 | Link)[];
    /**
     * @deprecated 已经废弃
     */
    set background(v: any);
    /**
     * 使用亮色网格背景
     * @deprecated 已过时
     */
    useLightGridBackground(): void;
    /**
     * 使用暗色网格背景
     * @deprecated 已过时
     */
    useDarkGridBackground(): void;
}

/**
 * 布局对象
 *
 * 根据对象列表 和 坐标列表来设置对象的坐标
 *
 * 并且可以做变换（平移、旋转、缩放）
 */
declare class Layout<T extends LayoutNode> {
    animationSystem: AnimationSystem_2;
    objects: Array<T>;

/**@readonly */
    x: number;
    /**@readonly */
    y: number;
    /**@readonly */
    scaleX: number;
    /**@readonly */
    scaleY: number;
    /**@readonly */
    width: number;
    /**@readonly */
    height: number;
    /**@readonly */
    rotation: number;
    constructor(objects: Array<T>, positions: Array<PointLike>);
    /**
     * 调整尺寸
     * @param width
     * @param height
     */
    resize(width: number, height: number): this;
    /**
     * 增量调整尺寸
     * @param dw 宽度增量
     * @param dh 高度增量
     */
    resizeWith(dw: number, dh: number): this;
    /**
     * 平移 (将中心的位置平移到指定位置)
     * @param x
     * @param y
     */
    translate(x: number, y: number): this;
    /**
     * 增量平移
     * @param x
     * @param y
     */
    translateWith(x: number, y: number): this;
    /**
     * 缩放
     * @param sx
     * @param sy
     */
    scale(sx: number, sy: number): this;
    /**
     * 按系数缩放, 在当前缩放的基础上再乘以指定缩放系数
     * @param  sx 宽度缩放系数
     * @param  sy 高度缩放系数
     */
    scaleBy(sx: number, sy: number): void;
    /**
     * 旋转
     * @param rotation
     */
    rotate(rotation: number): this;
    /**
     * 增量旋转
     * @param rotation
     */
    rotateWith(rotation: number): this;
/**
     * 执行布局
     * @param animationOption 动画参数
     * @returns
     */
    doLayout(animationOption?: LayoutAnimationOption): this;
}

declare type LayoutAnimationOption = {
    name?: string;
    duration?: number;
    onEnd?: Function;
    effect?: EasingNameType;
    times?: number;
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'normal';
};

export declare interface LayoutNode {
    translate(x: number, y: number): void;
    x: number;
    y: number;
}

/**
 * 布局系统
 */
export declare class LayoutSystem<T extends LayoutNode> {

constructor(animationSystem: AnimationSystem, graphSystem: GraphSystem);
    /**
     * 根据指定的点坐标集合生成布局
     *
     * 对象的个数 <= 点的个数
     *
     * @param objects
     * @param pointArr
     */
    pointsLayout(objects: Array<T>, pointArr: Array<PointLike>): Layout<T>;
    /**
     * 对指定图对象做星形布局
     *
     * 指定的图如果不是一棵树，将自动生成图的最小生成树，然后根据最小生成树生成布局对象
     *
     * @param graph
     * @returns
     */
    starLayout(graph: Graph): Layout<any>;
    /**
     * 对指定图对象做树形布局
     *
     * 指定的图如果不是一棵树，将自动生成图的最小生成树，然后根据最小生成树生成布局对象
     *
     * @param graph
     * @returns
     */
    treeLayout(graph: Graph): Layout<any>;
    /**
     * 遍历一棵树所有顶点-广度优先
     * @param graph
     * @returns
     */
    travelTree(graph: Graph, rootVetext: Vertext): any[];
    /**
     * 调整节点对象的尺寸：尺寸刚好覆盖住所有子节点
     */
    sizeFitToChildren(node: any, padding?: number): void;
}

declare function len(v: Vec2Type): number;

/**
 * 线性渐变
 ```js
 let rg = new LinearGradient(0,0, 20, 20);
 rg.addColorStop(0, 'white');
 rg.addColorStop(0.5, 'red');
 rg.addColorStop(1, 'blue');

 // 也可以一次性设置：
 rg.setColors([[0, 'white'], [0.5, 'red'], [1, 'blue']]);
 ```
 */
export declare class LinearGradient extends StyleGradient implements CanvasGradient {
    className: string;
    /**
     * 开始坐标x
     */
    startX: number;
    /**
     * 结束坐标y
     */
    startY: number;
    /**
     * 结束坐标x
     */
    stopX: number;
    /**
     * 结束坐标y
     */
    stopY: number;
constructor(startX: number, startY: number, stopX: number, stopY: number);
/**
     * 添加颜色停靠点到颜色列表中。
     * @param {Number} offset - 颜色停靠点的偏移量，通常是一个0到1之间的数值，表示在渐变中的位置。
     * @param {String} color - 颜色的表示，可以是CSS颜色字符串，如「rgb」或「#rrggbb」格式。
     */
    addColorStop(offset: number, color: string): void;
    /**
     * 设置颜色并更新状态
     * @param colors {Array} 颜色数组，用于更新当前对象的颜色
     */
    setColors(colors: Array<[number, string]>): void;
    /**@protected */
    getStyle(): CanvasGradient;
}

/**
 * 连线对象，有起点和终端;
 *
 * 创建和设置起止，
 * 有以下形式:

 ```js:line-numbers
 import {Link} from "@jtopo/core";

 // 示例1
 let link = new Link('text', 开始节点, 结束节点, 开始锚点名称, 结束锚点名称);
 let link = new Link('text', beginNode, endNode, 'lm', 'center');

 // 示例2
 let link = new Link('text', 开始锚点, 结束锚点);
 let link = new Link('text', beginNode.getAnchor('lm'), endNode.getAnchor('center'));

 // 示例3
 let link = new Link();
 link.text = 'text';
 link.setBegin(beginNode.getAnchor('lm'));
 link.setEnd(endNode.getAnchor('auto'));

 // 示例4
 let link = new Link('text', beginNode, {x: 10, y:20});
 let link = new Link('text', {x:0, y:0}, {x: 10, y:20});
 ```
 */
export declare class Link extends NE implements Serializable {
    readonly className: string;
/**
     * link相关点坐标集合，link父对象为参考坐标系
     */
    points: Array<PointLike>;

/**
     * 选中时的样式，如果不设置将使用默认的
     */
    selectedStyle?: LinkSelectedStyleOptionsType;
/**
     * @readonly
     */
    _shape: Shape;
    /**
     * 连线中间的的文本对象(Node), 可能为空.
     *
     * 只有第一次为link.text赋值后，label对象就不为空了。
     *
     * link.text和 node.text 有差异：
     * 1. text 在 Node对象中是一个简单的 字符串属性
     * 2. text 在 Link对象中，是 get/set函数，来修改和读取link.label对象的text属性
     *
     * link.label.text = '123'; 的简写就是：link.text = '123';
     */
    label?: Node_2;
    /**
     * 开始箭头对象
     */
    beginArrow?: Node_2;
    /**
     * 结束箭头对象
     */
    endArrow?: Node_2;
    /**
     * 连线的开始对象
     */
    get begin(): AnchorProxy;
    /**
     * 连线的结束对象
     */
    get end(): AnchorProxy;









/**
     * @constructor
     * @param text 文本
     * @param begin 开始对象
     * @param end  结束对象
     * @param beginAnchorName 开始节点对象的'定位点', 可为空，默认为"center"
     * @param endAnchorName  结束节点对象的'定位点', 可为空，默认为"center"
     */
    constructor(text?: string, begin?: Linkable, end?: Linkable, beginAnchorName?: ConnectToLinkAnchorType | ConnectToNodeAnchorType, endAnchorName?: ConnectToLinkAnchorType | ConnectToNodeAnchorType);
    /**
     * 获取并生成线段上某个位置的 ’锚点’
     * @param t
     * @param segIndex
     * @returns
     */
    getSegmentAnchor(t: number, segIndex: number): AnchorProxy;
    /**
     * 根据名称获取并生成一个 ‘锚点‘
     * @param name
     * @returns
     */
    getAnchor(name: ConnectToLinkAnchorType | string): AnchorProxy;
    /**
     * 获取连线段数量
     */
    getSegmentCount(): number;
/**
     * 文本节点的text别名
     *
     * link.text和 node.text 有差异：
     * 1. text 在 Node对象中是一个简单的 字符串属性
     * 2. text 在 Link对象中，是 get/set函数，来修改和读取link.label对象的text属性
     *
     * link.label.text = '123'; 的简写就是：link.text = '123';
     *
     * 如果link.text为null， link.label 对象也为null.
     */
    get text(): string;
    set text(v: string);
    /**
     * 设置文本标签
     * <p>
     * </p>
     * @param textOrNode 文字或者Node对象
     */
    setLabel(textOrNode: string | Node_2): Node_2 | this;
    getLabel(): Node_2;
    /**
     * 获取开始箭头对象
     */
    getBeginArrow(): Node_2;
    /**
     * 设置开始端的箭头
     */
    setBeginArrow(node: Node_2): this;
    /**
     * 获取结束箭头对象
     */
    getEndArrow(): Node_2;
    /**
     * 设置结束端的箭头
     */
    setEndArrow(node: Node_2): this;
/**
     * 设置连线的开始点
     * @param linkTarget 连接对象
     * @param positionName 端点
     */
    setBegin(linkTarget: Linkable, positionName?: ConnectToLinkAnchorType | ConnectToNodeAnchorType): void;
    /**
     * 设置连线的结束点
     * @param linkTarget 连接对象
     * @param positionName 端点
     */
    setEnd(linkTarget: Linkable, positionName?: ConnectToLinkAnchorType | ConnectToNodeAnchorType): void;
    /**
     * 获取连线的开始点坐标
     */
    getBeginPoint(): PointLike;
    /**
     * 获取连线的结束点坐标
     */
    getEndPoint(): PointLike;
/**
     * 绘制
     * @override
     */
    draw(ctx: CanvasRenderingContext2D): this;
/**
     * 增量式平移
     * @override
     */
    translateWith(dx: number, dy: number): this;




getPoints(): PointLike[];
    /**
     * 增加子对象
     */
    addChild(child: NE): this;

updateMatrix(): this;
/**
     * @protected
     */
    _getAABBWithText(): Rectangle;
    /**@protected */
    _upgradeParent(): any;



/**
     * 断开开始连接
     */
    unlinkBegin(): void;
    /**
     * 断开结束连接
     */
    unlinkEnd(): void;
    /**
     * 断开开始和
     */
    unlink(): void;
    /**
     * 从父级移除, 并断开连接
     */
    removeFromParent(): this;
    changeParent(newParent: NE): this;


_setProxies(proxyList: AnchorProxy[]): void;
    hitTest(x: number, y: number): boolean;
getInLinks(): Array<Link>;
    getOutLinks(): Array<Link>;
    destroy(): void;
}

export declare type Linkable = Anchor | PointLike | AnchorProxy | NE;

/**@ignore */
export declare const LinkConst: Readonly<{
    QuadBezierLink: "QuadBezierLink";
    BezierLink: "BezierLink";
    AutoFoldLink: "AutoFoldLink";
    ArcLink: "ArcLink";
    fold1Offset: "fold1Offset";
    fold2Offset: "fold2Offset";
    centerOffset: "centerOffset";
    PathLinkName: "PathLink";
}>;

/** 连线方向, 水平优先 或者 垂直优先 */
export declare type LinkDirectionFirstType = 'horizontal' | 'vertical';

/**
 * 维护一个 AnchorProxy 列表
 */
declare class LinkPath {
    anchorProxyList: Array<AnchorProxy>;
    constructor();
set(anchorProxyList: Array<AnchorProxy>): void;
    setBegin(anchorProxy: AnchorProxy): void;
    setEnd(anchorProxy: AnchorProxy): void;
    getLength(): number;
    getBegin(): AnchorProxy;
    getEnd(): AnchorProxy;
}

export declare const LinkPosition: Readonly<{
    begin: "begin";
    end: "end";
    middle: "middle";
    ctrlPoint: "ctrlPoint";
    ctrlPoint1: "ctrlPoint1";
    ctrlPoint2: "ctrlPoint2";
    fold1: "fold1";
    fold2: "fold2";
    mid: "mid";
    mid1: "mid1";
    mid2: "mid2";
}>;

/**
 * 连线选中状态的样式
 *
 * 选中时连线会呈现阴影
 *
 * 当shadowColor不为null时生效
 *
 * 受以下参数影响（shadowBlur、shadowOffsetX、shadowOffsetY）
 *
 */
export declare type LinkSelectedStyleOptionsType = {
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
};

/**
 * 线条形状, 仅用于连线对象
 */
declare class LinkShape extends Shape {
className: string;
    isClosed: boolean;
    anchors: Map<string, Anchor>;
    constructor();
    draw(ctx: CanvasRenderingContext2D, link: Link): void;
    drawSVG(svg: SVGElement, link: Link): void;
}

export declare interface LinkState extends VisualEntityState {
    points: Array<PointLike>;
    az: Array<PointLike>;
    invertWorldTransform: Transform;
}
/**
 * L形折线
 *
 * 多数情况下被AutoFoldLink所替代, 但L形折线有更好的性能
 *
 ```js
 // 例如:
 import {LShapeLink} from "@jtopo/core";

 // 构造方法和Link一样
 let link = new LShapeLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
 ```
 */
export declare class LShapeLink extends Link {
    /**
     * @readonly
     */
    className: string;

constructor(text?: string | null, begin?: Node_2 | Link | PointLike, end?: Node_2 | Link | PointLike, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
    /**
     * 获取连线段数量
     */
    getSegmentCount(): number;
/**
     * 方向
     *
     * horizontal: 先水平 -> 垂直
     * vertical: 先垂直 -> 水平
     */
    get direction(): 'horizontal' | 'vertical';
    /**
     * 方向
     *
     * horizontal: 先水平 -> 垂直
     * vertical: 先垂直 -> 水平
     */
    set direction(value: 'horizontal' | 'vertical');
}

declare function multiplyC(out: Vec2Type, v1: Vec2Type, c: number): Vec2Type;

/**
 * 归一化坐标，表示在Node上的坐标，范围是 [-1, 1]
 * @protected
 */
export declare class NDCAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;
    /** 锚点在Node上的NDC坐标 */
    x: number;
    /** 锚点在Node上的NDC坐标 */
    y: number;
constructor(name: string, x: number, y: number, usageType?: AnchorUsageType);
    getNormal(): Vec2Type;
}

export declare interface NE {
    addEventListener(type: NEEventType, callback: (e: any) => void): () => {};
    on(type: NEEventType, callback: (e: any) => void): () => {};
    removeEventListener(type: NEEventType, callback: (e: any) => void): void;
    hasListener(type: NEEventType): boolean;
}

/**
 * 网元对象 (Node、Link的父类)
 */
export declare abstract class NE extends VisualEntity implements Container<NE>, Interactable, Serializable {
    /**
     * @protected
     */
    className: string;
    /**
     * 是否响应(鼠标、触摸屏指针），为false的时候，不响应动作
     *
     * @since 2.6.0
     */
    pointerEnabled: boolean;
    /**
     * id, 标识，由开发人员控制和设计
     */
    id?: string | number;
    /**
     * 名称，可以在编辑时指定，运行时通过名称获取对象的引用
     */
    name?: string;
    /**
     * 类型，自定义类型
     *
     * 可用于自定义节点，区分节点类型
     *
     * 比用data属性更方便一点
     */
    type?: string;
    /** 鼠标指向时显示的提示信息，和HTML中dom元素的title属性作用相同 */
    title?: string;
    /**
     * 所属的Layer
     *
     * @since 2.6.0
     */
    ownerLayer?: Layer;
    /**
     * 是否是Node对象, 可以使用 instanceof 替代
     */
    readonly isNode: boolean;
    /**
     * 是否是Link对象, 可以使用 instanceof 替代
     */
    readonly isLink?: boolean;
    /**
     * 是否是Layer对象, 可以使用 instanceof 替代
     */
    readonly isLayer?: boolean;
    /**
     * 上级对象
     */
    parent?: NE;
    /**
     * 子节点（直接下级）
     */
    readonly children: NE[];
    /**
     * 是否可序列化，默认true
     * 如果为false，序列化时将跳过该对象
     */
    serializeable: boolean;


/**@protected 宽度 */
    _width: number;
    /**
     * @protected
     * 高度
     */
    _height: number;




/**
     * 样式
     * @readonly
     */
    style: Style;
    /**
     * @readonly
     */
    _shape: Shape;
/**
     * 通过addClass添加的样式名称列表
     */
    readonly classList: Array<string>;
    /**
     * 选中时的样式，如果不设置将使用默认的
     */
    selectedStyle?: NodeSelectedStyleOptionsType | LinkSelectedStyleOptionsType;

/**
     * 通常存放业务含义的数据
     *
     * 为了安全考虑，防止与对象属性冲突,用户最好使用该对象
     * 用户附加到该对象的自定义属性
     * @since 2.4.0
     */
    _data?: Record<string, any>;
    get data(): Record<string, any>;
    set data(v: Record<string, any>);
    /**
     * @since 2.6.0
     * 存放自定义属性（用于定义节点类型，和业务数据无关）
     */
    readonly attributes: Record<string, any>;
    /**
     * 所有以本对象为结束点的Link对象数组
     */
    readonly inLinks: Array<Link>;
    /**
     * 所有以本对象为开始点的Link对象数组
     */
    readonly outLinks: Array<Link>;


/**
     * 是否冻结（所有下级子节点）
     *
     * 冻结后鼠标拾取到子节点或者本节点都视为拾取了本节点
     *
     * @ignore
     */
    frozen: boolean;
    /**
     * 层级深度, Layer为0，下面第一层子节点为1，依次类推
     *
     * 只读
     */
    deep: number;
    /**
     * 是否显示选中的效果，默认显示
     */
    showSelected: boolean;
    /**
     * 是否可拖拽
     */
    draggable: boolean;
    /**
     * 是否被选中了
     * @readonly
     */
    isSelected: boolean;
    /**
     * 是否可以作为拖拽目标
     * @since 2.4.0
     */
    dropAllowed: boolean;
    constructor();
abstract translateWith(dx: number, dy: number): this;
    /**
     * 修改父对象但保持屏幕坐标不变
     * @param newParent
     */
    abstract changeParent(newParent: NE): this;
translate(x: number, y: number): this;
    scale(x: number, y: number): this;
    rotate(angle: number): this;
    /**
     * 一次性设置多个属性
     *
     ```js
     // 一次性设置多个属性
     obj.setAttributes({
     foo: 'abc',
     bar: false
     });

     ```
     * @param attrs
     * @returns
     */
    setAttributes(attrs: string | {
        [key: string]: any;
    }): this;
    /**
     * 移除一个属性
     ```js
     // 例如:
     obj.removeAttribute('foo');
     ```
     */
    removeAttribute(name: string): void;
    /**
     * 设置自定义属性
     * @param name
     * @param value
     */
    setAttribute(name: string, value: any): void;
    _markAttrDirty(): void;
    /**
     * 读取某个属性值
     ```js
     // 例如:
     let v1 = obj.getAttribute('foo');       //如果foo属性不存在，则返回undefined
     let v2 = obj.getAttribute('bar', 123);  //如果bar属性不存在，则返回123
     ```
     * @param name
     * @param defaultValue 如果属性值为空时的默认替代
     * @returns
     */
    getAttribute(name: string, defaultValue?: any): any;
    /**
     * 获取对象在Layer中的aabb包围盒 (世界坐标系)
     * @param recursive 是否将子节点包含在内
     * @returns
     */
    getAABB(recursive?: boolean): Rectangle;
    /**@protected */
    dragHandler(inputSystem: InputSystem<NE>): void;
    /**
     * 获取形状对象
     * @returns
     */
    getShape(): Shape;
    /**
     * 读取某个样式的值
     */
    getStyle(name: string): any;
/**
     * 背景和边框的设置语法参考css样式, 图形绘制的语法使用cavnas属性设置，如下:
     ```js
     node.setStyles({
     // 用类似css语法设置节点的：边框、字体、背景 的属性
     border: '10px gray',
     borderRadius: 10,
     font: 'bold 20px serif',
     color: 'gray',
     backgroundColor: "rgba(128,128,128,0.2)",

     // 内边距（边框和图形的间距）
     padding: 10,

     // 用Canvas绘图属性来设置节点内图形的：填充、画笔粗细、颜色、字体位置
     strokeStyle: 'gray',
     fillStyle: 'rgba(0,0,255,0.2)',
     lineWidth: 3,
     textPosition: 'center',
     textBaseline: 'middle',
     });
     ```
     */
    setStyles(styles: PartStyleOptionType): this;
    /**
     * 设置某一个样式
     */
    setStyle(styleName: StyleKeyType, value: any): this;
/**
     * 获取：主题、自定义样式类、css方法三者层叠后的样式结果
     *
     * (只读，不要修改返回的对象)
     */
    getComputedStyle(): Style;
    /**
     * 清除通过css或setStyles定义的所有样式
     */
    clearStyles(): this;
    /**
     * 增加一个样式
     ```js
     obj.addClass('.focus');
     ```
     * @param styleName
     */
    addClass(styleName: string): this;
    /**
     * 移除一个样式
     ```js
     obj.removeClass('.focus');
     ```
     * @param styleName
     */
    removeClass(styleName: string): void;
    /**
     * 检测是否拥有某个样式类
     ```js
     node.hasClass('.focus');
     ```
     * @param styleName
     * @since 2.4.0
     */
    hasClass(styleName: string): boolean;
    /**
     * 移除所有通过addClass添加的样式
     ```js
     obj.removeAllClass();
     ```
     */
    removeAllClass(): this;
    /**
     * 是否被任意Link连接到
     * @since 2.4.0
     * */
    isConnected(): boolean;
    /**
     * 获取对象上某一点
     *
     * @param t [0-1] 在线段上的比例
     * @param segIndex 线段索引(矩形，有4条线段，索引：[0-3]）可选项
     */
    getPoint(t: number, segIndex?: number): PointLike;
    /**
     * 获取对象上某一点(本地坐标系)
     *
     * @param t [0-1] 在线段上的比例
     * @param segIndex 线段索引(Node是矩形，有4条线段，索引：[0-3]）可选项
     */
    getLocalPoint(t: number, segIndex?: number | null): PointLike;
    /**
     * @protected
     * @returns
     */
    _findChildren(filter: (child: NE) => boolean, recursive?: boolean): Array<NE>;
    /**
     * @protected
     */
    _findChild(filter: (ne: NE) => boolean, recursive?: boolean): NE | null;
    /**
     * 对象选择器
     *
     * 语法兼容DOM的Selector API标准（并不支持标准里的所有语法）
     *
     * 支持的语法形式如下：
     ```js
     // 最灵活的查询方式 (推荐)
     let arr = layer.querySelectorAll(obj => obj.x > 20 && obj.y < 100);
     let activeNodes = layer.querySelectorAll(obj => obj.hasClass('.active'));

     //obj.querySelector(类名称)， 例如:
     let ellipseNodes = layer.querySelectorAll('EllipseNode');
     let links = layer.querySelector('Link');

     //obj.querySelector(样式名称)，例如:
     let serverNodes = layer.querySelectorAll('.server');
     let activedObjs = layer.querySelectorAll('.active');

     //obj.querySelector(ID);
     let obj = layer.querySelectorAll('#123')[0];

     //obj.querySelector([属性名称=""]);
     let arr = layer.querySelectorAll('[text="abc"]');
     let arr2 = layer.querySelectorAll('[draggable=true]');

     // obj.querySelector(类名称|样式名称[属性名称=""]);
     let obj = layer.querySelector('TextNode[x<=-200]');
     let obj2 = layer.querySelector('.server[text="X86"]');

     ```
     * @param querySelector
     * @returns
     */
    querySelectorAll(querySelector?: string | ((child: Node_2 | Link) => boolean)): NE[];
    /**
     * 功能类似querySelectorAll,但只返回第一个满足条件的对象或者null
     * @param querySelector
     * @returns
     */
    querySelector(querySelector: string | ((child: Node_2 | Link) => boolean)): NE;
    getInLinks(): Array<Link>;
    getOutLinks(): Array<Link>;
    /**@protected */
    pointerdownHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    pointerupHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    pointermoveHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    pointerenterHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    pointeroutHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    dragEndHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    clickHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    dblclickHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    dropHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    dragoverHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    dragoutHandler(inputSystem: InputSystem<NE>): void;
    /**@protected */
    selectedHandler(): void;
    /**@protected */
    unselectedHandler(): void;
    /**
     * 添加一个子对象
     */
    appendChild(child: NE): this;
    /**
     * 对子对象进行排序
     * @param sortFn 排序函数
     * @returns
     * @since 2.6.17
     */
    sortChildren(sortFn: (a: NE, b: NE) => number): this;
/**
     * 获取所有子对象
     */
    getChildren(): NE[];
    /**
     * 是否拥有某个下级子对象
     */
    hasChild(child: NE): boolean;
    /**
     * 是否拥有子对象
     */
    hasChildren(): boolean;
    /**
     * 从父容器中移除
     ```js
     // 等价于：
     if (this.parent) {
     this.parent.removeChild(this);
     }
     ```
     */
    removeFromParent(): this;
    /**
     * 一次性若干个对象，比单个增加速度快很多，数量越多越明显！
     *
     * 数量有上限(大于10万), 请使用 addChildren 代替
     *
     * 注意：避免互为子节点、重复添加
     *
     ```js
     parent.append(node1, node2, node3, ...);
     ```
     *@since 2.6.17*
     */
    append(...childs: Array<NE>): this;
    /**
     * 在最前面添加对象
     *
     * 注意：避免互为子节点、重复添加
     ```js
     parent.prepend(node1, node2, node3, ...);
     ```
     *@since 2.6.17
     */
    prepend(...childs: Array<NE>): this;
    /**
     * 移除一个子对象
     */
    removeChild(child: NE): this;
    /**
     * 移除多个子对象, 比单个移除速度快很多，数量越多越明显！
     */
    removeChildren(childs: Array<NE>): this;
    /**
     * 移除所有子对象
     */
    removeAllChildren(): this;
    /**
     *隐藏所有下级节点
     */
    hideAllChildren(): this;
    /**
     * 显示所有下级节点
     */
    showAllChildren(): this;
/**
     * 获取'root'对象, 沿着parent一直向上追溯 , 直到parent为null或Layer对象结束
     */
    getRoot(): this;
    /**
     * 当从Layer对象树中删除时
     */
    onUnmounted(): void;
    /**
     * 将一个世界坐标转到本地坐标系
     * @since 2.6.0
     * @param  x
     * @param  y
     */
    worldToLocalXY(x: number, y: number): {
        x: number;
        y: number;
    };
    /**
     * 将一个本地坐标转到世界坐标系
     * @since 2.5.0
     * @param  x
     * @param  y
     */
    localToWorldXY(x: number, y: number): {
        x: number;
        y: number;
    };



/**
     * 获取所有连接到本对象的Link
     */
    getLinks(): Array<Link>;
updateMatrix(): this;


/**
     * @protected
     */
    getK(t: number, segIndex?: any): number;
    /**
     * 是否超出了父节点的矩形区域
     * @protected
     */
    isOutOfParent(): boolean;
    /**
     * 方法返回一个布尔值，表示一个对象是否是给定节点的后代，即该节点本身、其直接子节点（children）、子节点的直接子节点等。
     * 备注： 节点包含在自身内部。
     * @param targe
     */
    contains(targe: NE): boolean;
    /**
     * 是否可被拾取到，默认返回：pointerEnabled 属性
     ```js
     pickable() {
     return this.pointerEnabled;
     }
     ```
     */
    pickable(): boolean;
    /**
     *
     * 销毁，释放相关的资源引用,一旦销毁，对象不能再被访问，访问就会报错。
     *
     * 注意：销毁后，所有事件回调、动画、定时器等均不能再访问，否则会报错。
     */
    destroy(): void;
toJSON(): any;


/**
     * 请求更新画面
     */
    update(): void;
    getConnectAutoPoint(worldPoint: PointLike): PointLike;
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    get z(): number;
    set z(v: number);
    get width(): number;
    /**
     * 设置宽度
     *
     * 注意：宽度不能为0
     */
    set width(v: number);
    get height(): number;
    /**
     * 设置高度
     *
     * 注意：高度不能为0
     */
    set height(v: number);
    /**
     * 旋转角度 (弧度)
     */
    get rotation(): number;
    /**
     * 设置旋转角度 (弧度)
     */
    set rotation(v: number);
    get scaleX(): number;
    set scaleX(v: number);
    get scaleY(): number;
    set scaleY(v: number);
    get skewX(): number;
    set skewX(v: number);
    get skewY(): number;
    set skewY(v: number);
    /**@since 2.4.0 */
    get left(): number;
    set left(v: number);
    /**@since 2.4.0 */
    get right(): number;
    set right(v: number);
    /**@since 2.4.0 */
    get top(): number;
    set top(v: number);
    /**@since 2.4.0 */
    get bottom(): number;
    set bottom(v: number);
    /**
     * 设置zIndex
     * 相同父节点下的兄弟节点之间才有意义
     *
     * 通常情况下不要修改
     * @deprecated 请使用 sortChildren 或者 NEHelper.raiseToTop、NEHelper.lowerToBottom等方法代替
     */
    set zIndex(v: number);
    /**
     * @deprecated 请使用 sortChildren 或者 NEHelper.raiseToTop、NEHelper.lowerToBottom等方法代替
     */
    get zIndex(): number;
    /**
     * 设置zIndex
     * @param  index 建议范围 [1, 999]
     * @deprecated 请使用 sortChildren 或者 NEHelper.raiseToTop、NEHelper.lowerToBottom等方法代替
     */
    setZIndex(index: number): void;
    /**
     * 更新直接下级子对象的zIndex
     * @deprecated 请使用 sortChildren 或者 NEHelper.raiseToTop、NEHelper.lowerToBottom等方法代替
     */
    updateZIndex(): this;
    /**
     * 一次性增加多个对象, 比单个增加速度快很多，数量越多越明显！
     *
     * 注意：避免互为子节点、重复添加
     */
    addChildren(childs: Array<NE>): this;
    /**
     * 增加子对象
     */
    addChild(child: NE): this;
    /**
     * 获取前一个兄弟节点
     * @returns 前一个兄弟节点
     */
    get previousSibling(): NE | null;
    /**
     * 获取下一个兄弟节点
     * @returns 下一个兄弟节点
     */
    get nextSibling(): NE | null;
    /**
     * 获取节点在父节点中的索引
     * @returns 节点在父节点中的索引
     */
    getIndex(): number;
}

export declare type NearestInfo = {
    object: any;
    anchorName: string;
    distance: number;
};

export declare type NEEventType = 'pointerdown' | 'pointerup' | 'pointermove' | 'pointerenter' | 'pointerout' | 'click' | 'dblclick';

declare function negate(out: Vec2Type, a: Vec2Type): Vec2Type;

/**
 * 一些操作Node和Link的辅助方法
 */
export declare class NEHelper {

/**@protected */
    static anchorToLocalPoint(obj: Node_2 | Link, name: RectPositionType): PointLike;
    /**@protected */
    static getNearestPoint(ne: Node_2 | Link, worldPoint: PointLike): Intersect;
    /**
     * 断开对象的连接关系
     * @param obj
     * @param excepts 需要排除掉的
     */
    static unlinks(obj: NE, excepts?: Array<Link>): void;
    /** 和后面的兄弟元素交换位置 （编辑时的：上移一层） */
    static raise(element: NE): boolean;
    /**  和前面的兄弟元素交换位置 （编辑时的：上移动一层）*/
    static lower(element: NE): boolean;
    /** 将元素置顶（显示在最上层- 父节点相同） */
    static raiseToTop(element: NE): boolean;
    /** 将元素置底（显示在最下层- 父节点相同） */
    static lowerToBottom(element: NE): boolean;
}

/**
 * 节点对象
 *
 * 核心属性：坐标(x,y)和尺寸(width, height)
 *
 * 创建一个节点, 有以下几种形式：

 ```js:line-numbers
 // 留意: 要先引入Node，因浏览器有一个同名的Node对象，忘记导入会出错
 import {Node} from '@jtopo/core';

 // 示例:
 let node = new Node();
 let node = new Node('name');

 let node = new Node('name', x, y);
 let node = new Node('name', 10, 10);

 let node = new Node('name', x, y, width, height);
 let node = new Node('name', 10, 10, 30, 30);

 let node = new Node(null, x, y, width, height);

 // 尺寸
 node.resize(40, 40);

 // 等价于
 node.width = 40;
 node.height = 40;

 // 位置 (x、y代表了节点的中心在父节点的坐标)
 node.setXY(100, 100);

 // 和setXY完全等价，可看作是translate的简写
 node.translate(100, 100);

 // 单独设置x坐标
 node.x = 100;
 // 单独设置y坐标
 node.y = 100;

 // 也可以通过left、bottom、top、right设置节点位置(会根据宽度自动计算出x、y)
 node.left = 0;
 node.bottom = 0;
 node.top = 0;
 node.right = 0;
 ```
 *
 */
declare class Node_2 extends NE implements Transformable, Interactable, Serializable {
    /**
     * @readonly
     */
    className: string;
/** 是否跟随父节点旋转 */
    rotateWithParent: boolean;
    /**
     * 原点位置
     * @readonly
     */
    originPosition: RectPositionType;
    /**
     * 选中时的样式，如果不设置将使用默认的
     */
    selectedStyle?: NodeSelectedStyleOptionsType;
get text(): string;
    set text(v: string);
    /**
     * 是否是Node类的对象, 主要用于和Link区分
     */
    isNode: boolean;
    /**@protected */
    _zIndex: number;

/**@protected */
    protected _getShapeSize(): {
        width: number;
        height: number;
    };
    /**
     * 所有参数可以为空，通过其他方法按需设置
     * @param text 文本
     * @param x 坐标x
     * @param y 坐标y
     * @param width 宽度
     * @param height 高度
     */
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 根据本地坐标并生成一个 ’锚点‘
     * @param x
     * @param y
     * @returns
     */
    getPointAnchor(x: number, y: number): AnchorProxy;
    /**
     * 获取并生成线段上某个位置的 ’锚点’
     * @param t
     * @param segIndex
     * @returns
     */
    getSegmentAnchor(t: number, segIndex: number): AnchorProxy;
    /**
     * 根据名称获取并生成一个 ‘锚点‘
     * @param name
     * @returns
     */
    getAnchor(name: ConnectToNodeAnchorType | string): AnchorProxy;
    /**
     * 将节点定位到连线的某个位置上，该位置随连线变化而变
     *
     * @param t 位置百分比
     * @param lineSegmentIndex 线段索引（默认是null，表示中间的线段）
     */
    setOriginOnLink(t: number, lineSegmentIndex?: any): this;
/**@protected */
    _afterStyleComputed(): void;
    /**@protected */
    _afterUpdateMatrix(): void;


/**@protected */
    protected _updateShapeSize(): void;
setText(v: string): void;

protected _strokeAndFill(ctx: CanvasRenderingContext2D): void;
    /**
     * @override
     * @param ctx
     */
    draw(ctx: CanvasRenderingContext2D): void;

/**@protected */
    _paintText(ctx: CanvasRenderingContext2D): void;
setOriginPosition(position: RectPositionType): this;
    /**
     * 增量平移对象, 在对象原有的坐标基础上，增加偏移(dx,dy)。相当于: x += dx; y += dy。
     * @param  dx
     * @param  dy
     */
    translateWith(x: number, y: number): this;
    /**
     * 平移对象到指定位置(x,y)
     * @deprecated
     */
    translateTo(x: number, y: number): this;
    /**
     * 平移对象，与setXY()完全等价
     *
     * 只是从图形的语义上平移更接近本质：有相对性的意识
     *
     * @param  x
     * @param  y
     */
    translate(x: number, y: number): this;
    /**
     * 设置坐标， translate的简写
     * @param x
     * @param y
     */
    setXY(x: number, y: number): this;
    /**
     * 设置尺寸
     * @param width 宽度
     * @param height 高度
     */
    resize(width: number, height: number): this;
    /**
     * 设置尺寸, 与resize完全等价
     * @param width 宽度
     * @param height 高度
     */
    setSize(width: number, height: number): this;
    /**
     * 错切
     * @param skewX
     * @param skewY
     * @returns
     */
    skew(skewX: number, skewY: number): this;
    /**
     * 原有尺寸基础上增加
     * @param w
     * @param h
     * @returns
     */
    resizeWith(w: number, h: number): this;
    /**
     * 按系数缩放, 在当前缩放的基础上再乘以指定缩放系数
     * @param  sx 宽度缩放系数
     * @param  sy 高度缩放系数
     */
    scaleBy(x: number, y: number): this;
    /**
     * 缩放
     * @param sx 水平缩放系数
     * @param sy 垂直缩放系数
     */
    scale(x: number, y: number): this;
    /**
     * 旋转
     * @param angle 旋转角度（弧度）
     */
    rotate(angle: number): this;
    /**
     * 旋转-增量性
     * @param dAngle 旋转角度的增量（弧度制）
     */
    rotateWith(dAngle: number): this;
/**
     * 修改父对象但保持世界坐标不变
     * @param newParent
     * @returns
     */
    changeParent(newParent: NE): this;
    /**
     * 得到对象内部位置坐标（参照左上角为 -1,-1）
     * @param  name 位置名称
     * @protected
     */
    _positionToLocalPoint(name: RectPositionType): PointLike;
/**
     * 判断给定的坐标（世界坐标系）是否在对象内部
     *
     * @param x
     * @param y
     * @returns
     */
    hitTest(x: number, y: number): boolean;
    /**
     * 判断文本是否为空
     * @protected
     */
    _isTextBlank(): boolean;
    /**@protected */
    _getTextRect(): Rectangle;
    /**
     * @protected
     */
    _getTextAABB(): Rectangle;
    /**
     * @protected
     */
    _getAABBWithText(): Rectangle;
    destroy(): void;
}
export { Node_2 as Node }

export declare type NodeAnchorNamesType = keyof typeof ConnectToNodePosition;

/**
 * 一些操作Node的辅助方法
 */
export declare class NodeHelper {
    /**
     * 固定住某个点位置，改变尺寸
     * @param rectPosition
     * @param w
     * @param h
     */
    static resizeByFixedPoint(node: Node_2, rectPosition: RectPositionType, w: number, h: number): Node_2;
    /**
     * 绕指定点旋转, 同时改变自身位置和旋转角度 (父坐标系)
     * @param centerX - 圆心 X 坐标
     * @param centerY - 圆心 Y 坐标
     * @param radius - 圆周半径
     * @param angle - 角度（弧度）
     */
    static rotateAround(node: Node_2, centerX: number, centerY: number, radius: number, angle: number): Node_2;
/**
     * 如果link两端在同一个父类，link不在里面就更新到这个父类里，并返回所有更新了parent的link
     * @param obj
     * @protected
     */
    static _upgradeLinks(obj: NE): Array<Link>;
    /**
     *  返回所有对象的矩形复合而成的更大矩形
     */
    static getUnionRect(arr: Array<NE>): Rectangle;
    /**
     * 增量平移，但子节点保持屏幕坐标不变
     * @param node
     * @param dx 增量x
     * @param dy 增量y
     */
    static setXYButChildFixed(node: Node_2, dx: number, dy: number): void;
    /**
     * 调整节点对象的尺寸：尺寸刚好覆盖住所有子节点
     */
    static sizeFitToChildren(node: Node_2, padding?: number): void;
    /**
     * 将一组Node的中心点平移到指定x，y
     * @param {Array} objects
     * @param {number} x
     * @param {number} y
     */
    static translateNodesCenterTo(objects: Array<Node_2>, x: number, y: number): void;
    /**
     * 先序递归遍历Node和Link，从指定节点或者连线开始
     * @static
     * @param {NE} nodeOrLink 开始对象，可以是Node也可以是Link
     * @returns Array 先序排序好的对象数组，有Node、Link对象
     */
    static travel(nodeOrLink: NE, fn: Function, parent?: NE | null, rs?: Array<NE>): NE[];
}

/**@protected */
export declare class NodePositionAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;

    constructor(name: RectPositionType, usageType?: AnchorUsageType);
    getNormal(): any;
}

/**
 * 节点选中状态的样式
 *
 * - 当borderWidth > 0 时，
 *  选中时节点周围会呈现一个边框，受以下参数影响（borderWidth、borderColor）
 *
 * - 当borderWidth为null或 == 0 时，
 *  选中时节点会呈现阴影，受以下参数影响（shadowColor、shadowBlur、shadowOffsetX、shadowOffsetY）
 *
 */
export declare type NodeSelectedStyleOptionsType = {
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    padding?: number;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
};

declare interface NodeState extends VisualEntityState {
    textDirty: boolean;
    textWidth: number;
    textHeight: number;
    textArr: Array<string>;
    textLineHeight: number;
    textPositionCache: {
        x: number;
        y: number;
    };
    hasBorder: boolean;
    hasBackgroundColor: boolean;
    shapeSize: {
        width: number;
        height: number;
    };
}

declare function normalize(out: Vec2Type, v: Vec2Type): Vec2Type;

declare class OBB {
    points: Array<PointLike>;
    aabb: Rectangle;
    localPoints: Array<PointLike>;
    constructor();
    contains(x: number, y: number): boolean;
    static toAABB(out: Rectangle, points: Array<PointLike>, lineWidth?: number): Rectangle;
}

declare type ObjectIndexInfo = {
    objects: Array<NE>;
    objIndexMap: Map<NE, number>;
    styleIndexMap: Map<Style, number>;
    styles: Array<any>;
    resourcesIndexMap: Map<Object, Object>;
    resources: Array<Object>;
    shapeIndexMap: Map<Shape, number>;
    shapes: Array<Shape>;
    indexImage: Function;
};

export declare const ObjectName: Readonly<{
    AutoFoldLinkAnchors: "com.jtopo.AutoFoldLinkAnchors";
}>;

/**
 * 可观察对象类
 *
 * 实现了观察者模式的 Observable 类，用于创建和管理数据流。
 * 支持多种操作符来转换、过滤和组合数据流。
 *
 * @template T 数据类型
 *
 * @example
 * ```typescript
 * // 创建一个简单的 Observable
 * const numbers$ = new Observable<number>(observer => {
 *   observer.next(1);
 *   observer.next(2);
 *   observer.next(3);
 *   observer.complete();
 *   return () => {}; // 清理函数
 * });
 *
 * // 订阅 Observable
 * const subscription = numbers$.subscribe({
 *   next: value => console.log(value), // 输出: 1, 2, 3
 *   complete: () => console.log('完成')
 * });
 *
 * // 取消订阅
 * subscription.unsubscribe();
 * ```
 */
declare class Observable<T> {

    /** 订阅者列表 */

    /** 流是否已完成 */

    /** 错误信息 */

    /**
     * 构造函数
     *
     * @param _subscribe 订阅函数，接收观察者并返回取消订阅函数
     *
     * @example
     * ```typescript
     * // 基本用法
     * const obs = new Observable<number>(observer => {
     *   const timer = setInterval(() => {
     *     observer.next(Math.random());
     *   }, 1000);
     *
     *   return () => clearInterval(timer);
     * });
     * ```
     */
    constructor(_subscribe: (observer: IObserver<T>) => () => void);
    /**
     * 订阅观察者
     *
     * 订阅 Observable 以接收数据流中的值。支持两种订阅方式：
     * 1. 传入完整的 Observer 对象
     * 2. 传入简单的回调函数（只处理 next 事件）
     *
     * @param observer 观察者对象或简单的回调函数
     * @returns 订阅对象，包含取消订阅的方法和订阅状态
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5);
     *
     * // 方式1：使用完整的 Observer 对象
     * const subscription1 = numbers$.subscribe({
     *   next: value => console.log('收到值:', value),
     *   error: err => console.error('错误:', err),
     *   complete: () => console.log('流完成')
     * });
     *
     * // 方式2：使用简单的回调函数
     * const subscription2 = numbers$.subscribe(value => {
     *   console.log('值:', value);
     * });
     *
     * // 取消订阅
     * subscription1.unsubscribe();
     * subscription2.unsubscribe();
     * ```
     *
     * @note 如果 Observable 已经完成或发生错误，新的订阅会立即返回已关闭的订阅
     */
    subscribe(observer: IObserver<T> | ((value: T) => void)): ISubscription;
    /**
     * 移除订阅者
     *
     * 从订阅者列表中移除指定的观察者
     *
     * @param observer 要移除的观察者
     * @private
     */

    /**
     * 发送下一个值
     *
     * 向所有订阅者发送下一个值。如果流已完成或发生错误，则忽略此调用。
     *
     * @param value 要发送的值
     *
     * @example
     * ```typescript
     * const subject = new Observable<number>(observer => {
     *   // 自定义订阅逻辑
     *   return () => {};
     * });
     *
     * subject.subscribe(value => console.log('收到:', value));
     *
     * // 发送值
     * subject.next(42); // 输出: 收到: 42
     * subject.next(100); // 输出: 收到: 100
     * ```
     *
     * @note 如果观察者的 next 回调抛出异常，会被捕获并记录到控制台
     */
    next(value: T): void;
    /**
     * 发送错误
     *
     * 向所有订阅者发送错误信息，并清空订阅者列表。
     * 一旦发送错误，流将不再接受新的值。
     *
     * @param err 错误对象
     *
     * @example
     * ```typescript
     * const subject = new Observable<number>(observer => {
     *   return () => {};
     * });
     *
     * subject.subscribe({
     *   next: value => console.log('值:', value),
     *   error: err => console.error('错误:', err.message)
     * });
     *
     * subject.next(1); // 输出: 值: 1
     * subject.error(new Error('发生错误')); // 输出: 错误: 发生错误
     * subject.next(2); // 不会输出，因为流已错误
     * ```
     *
     * @note 错误发送后，流将不再接受新的订阅或值
     */
    error(err: Error): void;
    /**
     * 完成流
     *
     * 标记流为完成状态，并通知所有订阅者。
     * 完成后流将不再接受新的值或订阅。
     *
     * @example
     * ```typescript
     * const subject = new Observable<number>(observer => {
     *   return () => {};
     * });
     *
     * subject.subscribe({
     *   next: value => console.log('值:', value),
     *   complete: () => console.log('流完成')
     * });
     *
     * subject.next(1); // 输出: 值: 1
     * subject.next(2); // 输出: 值: 2
     * subject.complete(); // 输出: 流完成
     * subject.next(3); // 不会输出，因为流已完成
     * ```
     *
     * @note 完成后流将清空订阅者列表，不再接受新的值
     */
    complete(): void;
    /**
     * 映射操作符
     *
     * 将源 Observable 中的每个值通过映射函数转换为新值，返回新的 Observable。
     *
     * @template R 映射后的数据类型
     * @param mapFn 映射函数，接收当前值和索引，返回新值
     * @returns 新的 Observable，发出映射后的值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5);
     *
     * // 将数字转换为字符串
     * const strings$ = numbers$.map(x => `数字: ${x}`);
     * strings$.subscribe(console.log);
     * // 输出:
     * // 数字: 1
     * // 数字: 2
     * // 数字: 3
     * // 数字: 4
     * // 数字: 5
     *
     * // 使用索引的映射
     * const indexed$ = numbers$.map((value, index) => `${index}: ${value}`);
     * indexed$.subscribe(console.log);
     * // 输出:
     * // 0: 1
     * // 1: 2
     * // 2: 3
     * // 3: 4
     * // 4: 5
     * ```
     *
     * @note 如果映射函数抛出异常，错误会被传递给下游的 error 处理器
     */
    map<R>(mapFn: TypeMapFunction<T, R>): Observable<R>;
    /**
     * 过滤操作符
     *
     * 根据谓词函数过滤源 Observable 中的值，只发出满足条件的值。
     *
     * @param predicate 谓词函数，接收当前值和索引，返回是否保留该值
     * @returns 新的 Observable，只发出满足条件的值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     *
     * // 过滤偶数
     * const evens$ = numbers$.filter(x => x % 2 === 0);
     * evens$.subscribe(console.log);
     * // 输出: 2, 4, 6, 8, 10
     *
     * // 过滤大于5的数
     * const large$ = numbers$.filter(x => x > 5);
     * large$.subscribe(console.log);
     * // 输出: 6, 7, 8, 9, 10
     *
     * // 使用索引过滤（只保留前3个值）
     * const firstThree$ = numbers$.filter((value, index) => index < 3);
     * firstThree$.subscribe(console.log);
     * // 输出: 1, 2, 3
     * ```
     *
     * @note 如果谓词函数抛出异常，错误会被传递给下游的 error 处理器
     */
    filter(predicate: TypePredicate<T>): Observable<T>;
    /**
     * 去重操作符
     *
     * 过滤掉连续重复的值，只发出与前一个值不同的值。
     * 可以使用自定义比较函数来判断两个值是否相等。
     *
     * @param compareFn 可选的比较函数，用于判断两个值是否相等。默认使用严格相等比较
     * @returns 新的 Observable，过滤掉连续重复的值
     *
     * @example
     * ```typescript
     * const values$ = Observable.of(1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4);
     *
     * // 使用默认比较（严格相等）
     * const distinct$ = values$.distinctUntilChanged();
     * distinct$.subscribe(console.log);
     * // 输出: 1, 2, 3, 4
     *
     * // 使用自定义比较函数
     * const objects$ = Observable.of(
     *   { id: 1, name: 'A' },
     *   { id: 1, name: 'B' },
     *   { id: 2, name: 'C' },
     *   { id: 2, name: 'D' }
     * );
     *
     * const distinctById$ = objects$.distinctUntilChanged((a, b) => a.id === b.id);
     * distinctById$.subscribe(console.log);
     * // 输出: { id: 1, name: 'A' }, { id: 2, name: 'C' }
     * ```
     *
     * @note 第一个值总是会被发出，因为没有前一个值进行比较
     */
    distinctUntilChanged(compareFn?: (a: T, b: T) => boolean): Observable<T>;
    /**
     * 节流操作符
     *
     * 限制值的发出频率，在指定时间间隔内最多发出一个值。
     * 如果在时间间隔内收到多个值，会延迟发出最后一个值。
     *
     * @param delay 节流延迟时间（毫秒）
     * @returns 新的 Observable，按指定频率发出值
     *
     * @example
     * ```typescript
     * // 创建一个快速发出值的 Observable
     * const rapid$ = Observable.interval(100); // 每100ms发出一个值
     *
     * // 节流到每500ms最多发出一个值
     * const throttled$ = rapid$.throttle(500);
     * throttled$.subscribe(console.log);
     * // 输出: 0, 4, 9, 14, 19... (大约每500ms一个值)
     *
     * // 用于限制用户输入频率
     * const input$ = new Observable<string>(observer => {
     *   // 模拟用户快速输入
     *   const values = ['h', 'he', 'hel', 'hell', 'hello'];
     *   values.forEach((val, i) => {
     *     setTimeout(() => observer.next(val), i * 50);
     *   });
     *   return () => {};
     * });
     *
     * const throttledInput$ = input$.throttle(200);
     * throttledInput$.subscribe(console.log);
     * // 输出: h, hello (中间的值被节流)
     * ```
     *
     * @note 节流会确保在指定时间间隔内最多发出一个值，适合限制高频事件
     */
    throttle(delay: number): Observable<T>;
    /**
     * 防抖操作符
     *
     * 延迟发出值，直到源 Observable 停止发出新值达到指定的延迟时间。
     * 如果在延迟时间内收到新值，会重新开始计时。
     *
     * @param delay 防抖延迟时间（毫秒）
     * @returns 新的 Observable，延迟发出最后一个值
     *
     * @example
     * ```typescript
     * // 模拟用户输入搜索
     * const searchInput$ = new Observable<string>(observer => {
     *   const inputs = ['a', 'ap', 'app', 'appl', 'apple'];
     *   inputs.forEach((input, i) => {
     *     setTimeout(() => observer.next(input), i * 100);
     *   });
     *   return () => {};
     * });
     *
     * // 防抖300ms，只在用户停止输入后发出请求
     * const debouncedSearch$ = searchInput$.debounce(300);
     * debouncedSearch$.subscribe(searchTerm => {
     *   console.log('搜索:', searchTerm); // 只输出: 搜索: apple
     * });
     *
     * // 用于窗口大小变化事件
     * const resize$ = new Observable<Event>(observer => {
     *   window.addEventListener('resize', observer.next);
     *   return () => window.removeEventListener('resize', observer.next);
     * });
     *
     * const debouncedResize$ = resize$.debounce(250);
     * debouncedResize$.subscribe(() => {
     *   console.log('窗口大小已稳定');
     * });
     * ```
     *
     * @note 防抖会等待指定时间没有新值后才发出最后一个值，适合处理用户输入等场景
     */
    debounce(delay: number): Observable<T>;
    /**
     * 合并操作符
     *
     * 将当前 Observable 与另一个 Observable 合并，同时发出两个流中的所有值。
     * 合并后的流会在任一源流完成时完成。
     *
     * @template U 另一个 Observable 的数据类型
     * @param other 要合并的另一个 Observable
     * @returns 新的 Observable，发出两个流中的所有值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3);
     * const letters$ = Observable.of('a', 'b', 'c');
     *
     * // 合并两个流
     * const merged$ = numbers$.merge(letters$);
     * merged$.subscribe(console.log);
     * // 输出: 1, a, 2, b, 3, c (顺序可能不同)
     *
     * // 合并多个时间间隔
     * const fast$ = Observable.interval(100).take(5);
     * const slow$ = Observable.interval(300).take(3);
     *
     * const combined$ = fast$.merge(slow$);
     * combined$.subscribe(console.log);
     * // 输出: 0, 1, 0, 2, 3, 1, 4, 2 (时间间隔混合)
     * ```
     *
     * @note 合并后的流会在任一源流完成时完成，不会等待所有流都完成
     */
    merge<U>(other: Observable<U>): Observable<T | U>;
    /**
     * 合并映射操作符
     *
     * 将源 Observable 中的每个值映射为一个新的 Observable，然后将所有内部 Observable 的值合并到一个流中。
     * 与 map 不同，mergeMap 会"展平"内部 Observable，而不是发出 Observable 本身。
     *
     * @template R 内部 Observable 的数据类型
     * @param mapFn 映射函数，将源值转换为 Observable
     * @returns 新的 Observable，发出所有内部 Observable 的值
     *
     * @example
     * ```typescript
     * // 模拟搜索建议
     * const searchTerms$ = Observable.of('react', 'angular', 'vue');
     *
     * const searchSuggestions$ = searchTerms$.mergeMap(term => {
     *   // 模拟异步搜索
     *   return new Observable<string[]>(observer => {
     *     setTimeout(() => {
     *       const suggestions = [
     *         `${term} tutorial`,
     *         `${term} documentation`,
     *         `${term} examples`
     *       ];
     *       observer.next(suggestions);
     *       observer.complete();
     *     }, Math.random() * 1000);
     *     return () => {};
     *   });
     * });
     *
     * searchSuggestions$.subscribe(suggestions => {
     *   console.log('建议:', suggestions);
     * });
     * // 输出: 建议: ['react tutorial', 'react documentation', 'react examples']
     * //      建议: ['angular tutorial', 'angular documentation', 'angular examples']
     * //      建议: ['vue tutorial', 'vue documentation', 'vue examples']
     *
     * // 处理嵌套数组
     * const nested$ = Observable.of([1, 2], [3, 4], [5, 6]);
     * const flattened$ = nested$.mergeMap(arr => Observable.fromArray(arr));
     * flattened$.subscribe(console.log);
     * // 输出: 1, 2, 3, 4, 5, 6
     * ```
     *
     * @note mergeMap 会同时处理所有内部 Observable，适合处理并发异步操作
     */
    mergeMap<R>(mapFn: (value: T) => Observable<R>): Observable<R>;
    /**
     * 取前N个值
     *
     * 只发出源 Observable 的前 count 个值，然后完成流。
     * 如果源流中的值少于 count 个，则发出所有可用的值。
     *
     * @param count 要取的值数量
     * @returns 新的 Observable，只发出前 count 个值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     *
     * // 只取前3个值
     * const firstThree$ = numbers$.take(3);
     * firstThree$.subscribe(console.log);
     * // 输出: 1, 2, 3
     *
     * // 取前5个值
     * const firstFive$ = numbers$.take(5);
     * firstFive$.subscribe(console.log);
     * // 输出: 1, 2, 3, 4, 5
     *
     * // 如果源流只有3个值，但要求取5个
     * const short$ = Observable.of(1, 2, 3);
     * const takeFive$ = short$.take(5);
     * takeFive$.subscribe(console.log);
     * // 输出: 1, 2, 3 (只输出可用的值)
     * ```
     *
     * @note 如果 count 为 0 或负数，会立即完成流而不发出任何值
     */
    take(count: number): Observable<T>;
    /**
     * 跳过前N个值
     *
     * 跳过源 Observable 的前 count 个值，然后发出剩余的所有值。
     * 如果源流中的值少于或等于 count 个，则不会发出任何值，流会正常完成。
     *
     * @param count 要跳过的值数量
     * @returns 新的 Observable，跳过前 count 个值后发出剩余值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     *
     * // 跳过前3个值
     * const skipThree$ = numbers$.skip(3);
     * skipThree$.subscribe(console.log);
     * // 输出: 4, 5, 6, 7, 8, 9, 10
     *
     * // 跳过前5个值
     * const skipFive$ = numbers$.skip(5);
     * skipFive$.subscribe(console.log);
     * // 输出: 6, 7, 8, 9, 10
     *
     * // 边界情况：跳过所有值
     * const skipAll$ = numbers$.skip(10);
     * skipAll$.subscribe(console.log);
     * // 输出: (无输出，流正常完成)
     *
     * // 边界情况：跳过超过流长度的值
     * const short$ = Observable.of(1, 2, 3);
     * const skipMore$ = short$.skip(5);
     * skipMore$.subscribe({
     *   next: console.log,
     *   complete: () => console.log('流完成，没有值被发出')
     * });
     * // 输出: 流完成，没有值被发出
     *
     * // 边界情况：跳过0个值
     * const skipNone$ = numbers$.skip(0);
     * skipNone$.subscribe(console.log);
     * // 输出: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 (所有值)
     * ```
     *
     * @note 如果 count 为 0 或负数，会发出所有值；如果 count 大于等于流长度，不会发出任何值
     */
    skip(count: number): Observable<T>;
    /**
     * 静态方法：创建可观察对象
     *
     * 使用自定义订阅函数创建 Observable 的便捷方法。
     * 与直接使用构造函数效果相同，但提供了更清晰的 API。
     *
     * @template T 数据类型
     * @param subscribeFn 订阅函数，接收观察者并返回取消订阅函数
     * @returns 新的 Observable 实例
     *
     * @example
     * ```typescript
     * // 创建一个简单的计数器
     * const counter$ = Observable.create<number>(observer => {
     *   let count = 0;
     *   const timer = setInterval(() => {
     *     observer.next(count++);
     *   }, 1000);
     *
     *   return () => clearInterval(timer);
     * });
     *
     * // 订阅计数器
     * const subscription = counter$.subscribe(console.log);
     * // 输出: 0, 1, 2, 3, 4...
     *
     * // 5秒后取消订阅
     * setTimeout(() => subscription.unsubscribe(), 5000);
     * ```
     */
    static create<T>(subscribeFn: (observer: IObserver<T>) => () => void): Observable<T>;
    /**
     * 静态方法：从数组创建可观察对象
     *
     * 将数组转换为 Observable，依次发出数组中的每个值，然后完成流。
     *
     * @template T 数组元素类型
     * @param array 要转换的数组
     * @returns 新的 Observable，依次发出数组中的值
     *
     * @example
     * ```typescript
     * const numbers = [1, 2, 3, 4, 5];
     * const numbers$ = Observable.fromArray(numbers);
     *
     * numbers$.subscribe({
     *   next: value => console.log('值:', value),
     *   complete: () => console.log('数组处理完成')
     * });
     * // 输出:
     * // 值: 1
     * // 值: 2
     * // 值: 3
     * // 值: 4
     * // 值: 5
     * // 数组处理完成
     *
     * // 处理字符串数组
     * const words = ['hello', 'world', 'rxjs'];
     * const words$ = Observable.fromArray(words);
     * words$.subscribe(console.log);
     * // 输出: hello, world, rxjs
     * ```
     */
    static fromArray<T>(array: T[]): Observable<T>;
    /**
     * 静态方法：创建定时器可观察对象
     *
     * 创建一个按指定时间间隔发出递增数字的 Observable。
     * 从 0 开始，每隔 period 毫秒发出下一个数字。
     *
     * @param period 时间间隔（毫秒）
     * @returns 新的 Observable，按指定间隔发出数字
     *
     * @example
     * ```typescript
     * // 每秒发出一个数字
     * const timer$ = Observable.interval(1000);
     * timer$.subscribe(console.log);
     * // 输出: 0, 1, 2, 3, 4... (每秒一个)
     *
     * // 每500毫秒发出一个数字
     * const fastTimer$ = Observable.interval(500);
     * fastTimer$.subscribe(console.log);
     * // 输出: 0, 1, 2, 3, 4... (每500ms一个)
     *
     * // 结合 take 操作符限制数量
     * const limitedTimer$ = Observable.interval(1000).take(5);
     * limitedTimer$.subscribe({
     *   next: console.log,
     *   complete: () => console.log('定时器完成')
     * });
     * // 输出: 0, 1, 2, 3, 4, 定时器完成
     * ```
     *
     * @note 定时器会一直运行直到被取消订阅，记得在适当时机取消订阅以避免内存泄漏
     */
    static interval(period: number): Observable<number>;
    /**
     * 静态方法：合并多个可观察对象
     *
     * 将多个 Observable 合并为一个，同时发出所有源流中的值。
     * 当所有源流都完成时，合并后的流才会完成。
     *
     * @template T 数据类型
     * @param observables 要合并的 Observable 数组
     * @returns 新的 Observable，发出所有源流的值
     *
     * @example
     * ```typescript
     * const source1$ = Observable.of(1, 2, 3);
     * const source2$ = Observable.of('a', 'b', 'c');
     * const source3$ = Observable.of(true, false);
     *
     * // 合并多个流
     * const merged$ = Observable.merge(source1$, source2$, source3$);
     * merged$.subscribe(console.log);
     * // 输出: 1, a, true, 2, b, false, 3, c (顺序可能不同)
     *
     * // 合并同类型的流
     * const numbers1$ = Observable.of(1, 2, 3);
     * const numbers2$ = Observable.of(4, 5, 6);
     * const allNumbers$ = Observable.merge(numbers1$, numbers2$);
     * allNumbers$.subscribe(console.log);
     * // 输出: 1, 4, 2, 5, 3, 6 (顺序可能不同)
     * ```
     *
     * @note 合并后的流会在所有源流都完成时才完成
     */
    static merge<T>(...observables: Observable<T>[]): Observable<T>;
    /**
     * 静态方法：创建空的可观察对象
     *
     * 创建一个不发出任何值，立即完成的 Observable。
     * 常用于表示"没有数据"或作为其他操作符的默认值。
     *
     * @template T 数据类型
     * @returns 新的 Observable，立即完成而不发出任何值
     *
     * @example
     * ```typescript
     * const empty$ = Observable.empty<number>();
     *
     * empty$.subscribe({
     *   next: value => console.log('值:', value), // 不会执行
     *   complete: () => console.log('空流完成') // 会执行
     * });
     * // 输出: 空流完成
     *
     * // 作为条件操作符的默认值
     * const condition = false;
     * const data$ = condition
     *   ? Observable.of(1, 2, 3)
     *   : Observable.empty<number>();
     *
     * data$.subscribe(console.log); // 不会输出任何值
     * ```
     */
    static empty<T>(): Observable<T>;
    /**
     * 静态方法：从事件创建可观察对象
     *
     * 从支持 addEventListener 的对象（如 DOM 元素、Window、Document 等）创建 Observable。
     * 当指定的事件触发时，Observable 会发出事件对象。
     *
     * @template T 事件数据类型，默认为 Event
     * @param target 支持 addEventListener 的目标对象
     * @param eventName 要监听的事件名称
     * @param options 可选的事件监听选项（如 capture、passive 等）
     * @returns 新的 Observable，发出事件对象
     *
     * @example
     * ```typescript
     * // 监听 DOM 元素的点击事件
     * const button = document.getElementById('myButton');
     * const click$ = Observable.fromEvent<MouseEvent>(button, 'click');
     * click$.subscribe(event => {
     *   console.log('按钮被点击:', event.clientX, event.clientY);
     * });
     *
     * // 监听窗口大小变化事件
     * const resize$ = Observable.fromEvent<Event>(window, 'resize');
     * resize$.subscribe(() => {
     *   console.log('窗口大小已改变');
     * });
     *
     * // 监听键盘事件
     * const keydown$ = Observable.fromEvent<KeyboardEvent>(document, 'keydown');
     * keydown$.subscribe(event => {
     *   console.log('按键:', event.key, '代码:', event.code);
     * });
     *
     * // 监听鼠标移动事件（带选项）
     * const mousemove$ = Observable.fromEvent<MouseEvent>(
     *   document,
     *   'mousemove',
     *   { passive: true }
     * );
     * mousemove$.subscribe(event => {
     *   console.log('鼠标位置:', event.clientX, event.clientY);
     * });
     *
     * // 监听自定义事件
     * const customEvent$ = Observable.fromEvent<CustomEvent>(
     *   window,
     *   'customEvent'
     * );
     * customEvent$.subscribe(event => {
     *   console.log('自定义事件数据:', event.detail);
     * });
     *
     * // 监听音频/视频元素事件
     * const video = document.querySelector('video');
     * const play$ = Observable.fromEvent<Event>(video, 'play');
     * const pause$ = Observable.fromEvent<Event>(video, 'pause');
     *
     * play$.subscribe(() => console.log('视频开始播放'));
     * pause$.subscribe(() => console.log('视频暂停'));
     * ```
     *
     * @note 当 Observable 被取消订阅时，会自动移除事件监听器，避免内存泄漏
     */
    static fromEvent<T = Event>(target: EventTarget, eventName: string, options?: boolean | AddEventListenerOptions): Observable<T>;
    /**
     * 静态方法：从事件总线创建可观察对象
     *
     * 从 EventBus 实例创建 Observable，监听指定类型的事件。
     * 当事件总线发出指定类型的事件时，Observable 会发出事件数据。
     *
     * @template T 事件类型映射，例如 { click: MouseEvent, keydown: KeyboardEvent }
     * @template K 事件类型键，必须是 T 的键之一
     * @param eventBus 事件总线实例
     * @param type 要监听的事件类型
     * @returns 新的 Observable，发出指定类型的事件数据
     *
     * @example
     * ```typescript
     * // 定义事件类型映射
     * interface AppEvents {
     *   userLogin: { userId: string; username: string };
     *   userLogout: { userId: string };
     *   messageReceived: { from: string; content: string };
     * }
     *
     * const eventBus = new EventBus<AppEvents>();
     *
     * // 监听用户登录事件
     * const login$ = Observable.fromEventBus(eventBus, 'userLogin');
     * login$.subscribe(data => {
     *   console.log('用户登录:', data.userId, data.username);
     *   // data 的类型是 { userId: string; username: string }
     * });
     *
     * // 监听消息接收事件
     * const messages$ = Observable.fromEventBus(eventBus, 'messageReceived');
     * messages$.subscribe(data => {
     *   console.log('收到消息:', data.from, data.content);
     *   // data 的类型是 { from: string; content: string }
     * });
     *
     * // 发送事件
     * eventBus.emit('userLogin', { userId: '123', username: 'alice' });
     * // login$ 会发出: { userId: '123', username: 'alice' }
     * ```
     *
     * @note 当 Observable 被取消订阅时，会自动从事件总线移除监听器，避免内存泄漏
     */
    static fromEventBus<T extends Record<string, any>, K extends keyof T>(eventBus: EventBus<T>, type: K): Observable<T[K]>;
    /**
     * 累积操作符
     *
     * 对源 Observable 的值进行累积计算，每次发出累积结果。
     *
     * @template T 源数据类型
     * @template R 累积结果类型
     * @param accumulator 累积函数，接收当前累积值和新的值，返回新的累积值
     * @param seed 初始累积值
     * @returns 新的 Observable，发出累积结果
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5);
     *
     * // 计算总和
     * const sum$ = numbers$.scan((acc, value) => acc + value, 0);
     * sum$.subscribe(console.log);
     * // 输出: 1, 3, 6, 10, 15
     *
     * // 收集所有值到数组
     * const collected$ = numbers$.scan((acc, value) => [...acc, value], [] as number[]);
     * collected$.subscribe(console.log);
     * // 输出: [1], [1,2], [1,2,3], [1,2,3,4], [1,2,3,4,5]
     * ```
     */
    scan<R>(accumulator: (acc: R, value: T, index: number) => R, seed: R): Observable<R>;
    /**
     * 开始值操作符
     *
     * 在源 Observable 开始发出值之前，先发出指定的初始值。
     *
     * @param initialValue 初始值
     * @returns 新的 Observable，先发出初始值，然后发出源 Observable 的值
     *
     * @example
     * ```typescript
     * const delayed$ = Observable.interval(1000).take(3);
     *
     * // 添加初始值
     * const withInitial$ = delayed$.startWith(0);
     * withInitial$.subscribe(console.log);
     * // 输出: 0, 0, 1, 2
     *
     * // 多个初始值
     * const multipleInitial$ = delayed$.startWith(-2, -1);
     * multipleInitial$.subscribe(console.log);
     * // 输出: -2, -1, 0, 1, 2
     * ```
     */
    startWith(...initialValues: T[]): Observable<T>;
    /**
     * 静态方法：创建只发出指定值的可观察对象
     *
     * 创建一个发出指定值序列的 Observable，发出所有值后立即完成。
     * 这是创建简单数据流最常用的方法。
     *
     * @template T 数据类型
     * @param values 要发出的值序列
     * @returns 新的 Observable，依次发出所有值
     *
     * @example
     * ```typescript
     * // 发出单个值
     * const single$ = Observable.of(42);
     * single$.subscribe(console.log);
     * // 输出: 42
     *
     * // 发出多个值
     * const multiple$ = Observable.of(1, 2, 3, 4, 5);
     * multiple$.subscribe(console.log);
     * // 输出: 1, 2, 3, 4, 5
     *
     * // 发出不同类型的值
     * const mixed$ = Observable.of('hello', 42, true, { name: 'world' });
     * mixed$.subscribe(console.log);
     * // 输出: hello, 42, true, { name: 'world' }
     *
     * // 不传参数创建空流
     * const empty$ = Observable.of();
     * empty$.subscribe({
     *   next: console.log, // 不会执行
     *   complete: () => console.log('完成') // 会执行
     * });
     * // 输出: 完成
     * ```
     */
    static of<T>(...values: T[]): Observable<T>;
    /**
     * 缓冲操作符
     *
     * 缓冲源 Observable 的值，每隔 step 个值发出一次缓冲的值。
     *
     * @param count 缓冲的值数量
     * @param step 每隔多少个值发出一次缓冲的值
     * @returns 新的 Observable，发出缓冲的值
     *
     * @example
     * ```typescript
     * const numbers$ = Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     * const buffered$ = numbers$.bufferCount(3, 2);
     * buffered$.subscribe(console.log);
     * // 输出: [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9, 10]]
     * ```
     *
     * @note 如果 step 为 1，则每隔一个值发出一次缓冲的值
     */
    bufferCount(count: number, step: number): Observable<T[]>;
    /**
     * 缓冲区大小操作符（类似 ReplaySubject）
     *
     * 维护一个固定大小的缓冲区，保留最近 bufferSize 个值。
     * 当新的订阅者订阅时，会立即同步发出缓冲区中的所有历史值，然后继续发出新的值。
     *
     * @param bufferSize 缓冲区大小，最多保留多少个历史值
     * @returns 新的 Observable，新订阅时会先收到历史值，然后继续接收新值
     *
     * @example
     * ```typescript
     * // 创建一个会发出多个值的 Observable
     * const source$ = new Observable<number>(observer => {
     *   observer.next(1);
     *   observer.next(2);
     *   observer.next(3);
     *   setTimeout(() => observer.next(4), 100);
     *   setTimeout(() => observer.next(5), 200);
     *   return () => {};
     * });
     *
     * // 使用 bufferSize 操作符，保留最近 3 个值
     * const buffered$ = source$.bufferSize(3);
     *
     * // 先发出一些值
     * buffered$.subscribe(value => console.log('订阅1:', value));
     * // 输出: 订阅1: 1, 订阅1: 2, 订阅1: 3
     *
     * // 稍后再订阅，会立即收到缓冲区中的值（最近3个）
     * setTimeout(() => {
     *   buffered$.subscribe(value => console.log('订阅2:', value));
     *   // 如果此时缓冲区有 [2, 3, 4]，会输出: 订阅2: 2, 订阅2: 3, 订阅2: 4
     *   // 然后继续接收新值: 订阅2: 5
     * }, 150);
     *
     * // 场景：状态管理，新订阅者需要知道当前状态
     * const state$ = new Observable<string>(observer => {
     *   observer.next('initialized');
     *   observer.next('loading');
     *   observer.next('ready');
     *   return () => {};
     * });
     *
     * const stateWithHistory$ = state$.bufferSize(1); // 只保留最新状态
     *
     * // 第一个订阅者
     * stateWithHistory$.subscribe(state => console.log('状态1:', state));
     * // 输出: 状态1: initialized, 状态1: loading, 状态1: ready
     *
     * // 第二个订阅者（稍后订阅）
     * setTimeout(() => {
     *   stateWithHistory$.subscribe(state => console.log('状态2:', state));
     *   // 输出: 状态2: ready (只保留最新一个)
     * }, 100);
     * ```
     *
     * @note
     * - bufferSize 为 0 时，行为等同于原始 Observable（不缓存）
     * - bufferSize 为 1 时，类似 BehaviorSubject，只保留最新值
     * - 缓冲区使用 FIFO（先进先出）策略，超出大小限制时丢弃最旧的值
     * - 新订阅者会立即同步收到缓冲区中的所有值，然后继续接收新值
     */
    bufferSize(bufferSize: number): Observable<T>;
    destroy(): void;
}

/**
 * 缩略图对象
 */
declare class Overview {
    /**
     * 是否可见
     */
    visible: boolean;
    /**
     * 绘制对象极限, 超过该极限缩略图上不再绘制细节
     */
    objectLimit: number;
readonly domElement: HTMLCanvasElement;
















/**
     * 内置对象，用户无法创建
     */
    constructor(stage: Stage);
    /**
     * @override
     * @param domStyle
     */
    setStyles(domStyle: any): this;
/**
     * 显示
     */
    show(): this;
    /** 隐藏
     */
    hide(): this;
    /**
     * 设置缩略图的尺寸
     */
    setSize(w: number, h: number): void;

/**
     * 更新绘制一次
     */
    update(): void;
    markDirty(delay?: number): void;





}
/** 部分样式配置 */
export declare type PartStyleOptionType = {
    [key in StyleKeyType]?: any;
};

/**
 * 路径 (图系统范畴内)
 *
 * 由顶点和边构成
 *
 */
declare class Path {
    /**
     * 顶点列表
     */
    vertexes: Array<Vertext>;
    /**
     * 边列表
     */
    edges: Array<Edge>;
    constructor(vertexes: Array<Vertext>);
    /**
     * 路径是否‘闭’
     * @param path
     * @returns
     */
    isClose(path: Array<Vertext>): boolean;
    /**
     * 行迹（Trace）：如果路径P(u,v)中的边各不相同，则该路径称为u到v的一条行迹。
     */
    isTrace(path: Array<Vertext>): boolean;
    /**
     *
     * 是否回路: 闭的行迹称作回路（Circuit)
     * @param path
     */
    isCircuit(path: any): boolean;
    /**
     * 轨道（Track）：如果路径P(u,v)中的顶点各不相同，则该路径称为u到v的一条轨道。
     */
    isTrack(path: any): boolean;
    /**
     * 是否圈：闭的轨称作圈。
     * @param path
     */
    isCycle(path: any): boolean;
}

/**
 * 路径连线
 *
 * 可以穿过多个坐标点，形成路径
 *
 * 例如:
 ```js
 import {PathLink} from "@jtopo/core";

 let link = new PathLink();
 link.setPath([
 [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}]
 ]);

 ```
 * @since 2.5.0
 */
export declare class PathLink extends Link {
    /**
     * @readonly
     */
    readonly className: any;
    constructor(text?: string | null, begin?: Linkable, end?: Linkable, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
/**
     * 设置路径
     * @param {Array<Linkable>} targets
     */
    setPath(targets: Array<Linkable>): void;
}

/**
 * 只是提供了一些操作点和点集合的静态方法
 */
export declare abstract class Point {
    static PointClosestEpsilon: number;
    static isLikePoint(object: any): boolean;
    static looksSame(p1: PointLike, p2: PointLike, e: number): boolean;
    static middle(p1: PointLike, p2: PointLike): {
        x: number;
        y: number;
    };
    static getAngle(x: number, y: number, x2: number, y2: number): number;
    /**
     * 点(x,y) 绕点 (cx,cy) 旋转angle后的坐标
     * @param x
     * @param y
     * @param cx
     * @param cy
     * @param angle
     */
    static rotate(x: number, y: number, cx: number, cy: number, angle: number): PointLike;
    /**
     * 计算两点之间的距离
     * @param x
     * @param y
     * @param x2
     * @param y2
     * @returns
     */
    static distance(x: number, y: number, x2: number, y2: number): number;
/**
     * 将一系列的点合并成更少的点，使得相邻的点在某方向上变化不大时仅保留一个点，以减少最终结果中点的数量。
     * @param points
     * @param epsilon 参数是判断两个方向是否相近的阈值。
     * @returns
     */
    static mergeClosestPoints(points: Array<PointLike>, epsilon?: number): PointLike[];



/**
     * 根据给定的比例t，计算出线段上一点
     * @param {PointLike} a - 第一个点的坐标
     * @param {PointLike} b - 第二个点的坐标
     * @param {number} t - 比例值，公式：(1-t) * a + t*b
     * @returns {PointLike} - 插值点的坐标
     */
    static lerp(a: PointLike, b: PointLike, t: number): PointLike;
/**
     * 计算多点线上某一点的坐标
     * @param points 多点坐标数组
     * @param t 线上某点的相对位置 [0-1]
     * @param offset 偏移量
     * @returns 线上某点的坐标
     */
    static lerpOnLines(points: Array<PointLike>, t: number, isClosed: boolean): PointLike;
}

export declare type PointLike = {
    x: number;
    y: number;
};

export declare type Pojo = {
    [key: string]: any;
};

/**
 * 多边形
 *
 * 由多个连续的点坐标构成
 */
export declare class PolygonShape extends Shape {
    className: any;
    /**
     * 是否封闭图形（最后一个点是否连接到第一个点形成封闭图形），默认true
     */
    isClosed: boolean;
    /**
     * 是否更新了数据
     */
    dirty: boolean;
    /**
     * 构造函数
     * @param normalPoints 归一化点列表 x和y取值区间:[-1, 1]
     */
    constructor(normalPoints: PointLike[]);
    /**
     * 更新数据点
     * @param normalPoints 归一化点列表 x和y取值区间:[-1, 1]
     */
    updatePoints(normalPoints: Array<PointLike>): void;
    draw(ctx: CanvasRenderingContext2D, node: NE): void;
    drawSVG(svg: SVGElement, obj: NE): void;
    /**
     * 旋转
     * @param angle 角度(弧度)
     * @returns
     */
    rotate(angle: number): this;
    /**
     * 缩放，对于shape而言，宽高的缩放不一致时才有意义（用于压扁、变宽）
     * @param scaleX
     * @param scaleY
     * @returns
     */
    scale(scaleX: number, scaleY: number): this;
    /**
     * 倾斜
     * @param scaleX
     * @param scaleY
     * @returns
     */
    skew(scaleX: number, scaleY: number): this;
}

declare type PreviousType = {
    type: InputEventType;
    x: number;
    y: number;
    dx: number;
    dy: number;
    xInWorld: number;
    yInWorld: number;
    dxInWorld: number;
    dyInWorld: number;
    isDraging: boolean;
    isPointDown: boolean;
    isPointerOn: boolean;
    isDragStart: boolean;
    isDragEnd: boolean;
    timeStamp: number;
};

declare function projection(out: Vec2Type, v: Vec2Type, n: Vec2Type): Vec2Type;

/**
 * 曲线（二次贝塞尔）
 ```js
 // 例如:
 import {QuadBezierLink} from "@jtopo/core";

 // 构造方法和Link一样
 let link = new QuadBezierLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
 ```
 */
export declare class QuadBezierLink extends Link {
    className: string;
    ctrlPoint?: PointLike;
    _shape: Shape;
    _serializers: Array<string>;
    /**
     * 方向，有垂直、水平两种 取值为：'horizontal' 或者 'vertical' ，默认为 'horizontal'
     */
    direction: LinkDirectionFirstType;
    constructor(text?: string | null, begin?: Linkable, end?: Linkable, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
    /**
     * @override
     */
    _updatePoints(): PointLike[];
    /**
     * @override
     * @param dx
     * @param dy
     * @returns
     */
    translateWith(dx: number, dy: number): this;
    /**
     * 当没有设置控制点时，自动计算出控制点的位
     ```js
     // 默认计算算法如下：
     function autoCalcCtrlPoint(a, z) {
     let midX = (a.x + z.x) / 2;
     let midY = (a.y + z.y) / 2;

     if (this.direction == Direction.horizontal) {
     midY += (z.y - a.y) / 2;
     } else {
     midY -= (z.y - a.y) / 2;
     }

     let mid = {
     x: midX,
     y: midY
     };
     return mid;
     }

     // 可以根据需要重写, 例如:
     QuadBezierLink.prototype.autoCalcCtrlPoint = function(ax:number, ay:number, zx: number, zy: number) {
     let midX = (ax + zx) / 2;
     let midY = (ay + zy) / 2;

     // TODO: ....
     let mid = {
     x: midX,
     y: midY
     };
     return mid;
     }
     ```
     */
    autoCalcCtrlPoint(ax: number, ay: number, zx: number, zy: number): PointLike;
/**
     * 设置控制点
     * @param p
     */
    setCtrlPoint(p: PointLike): void;
    /**
     * 重置控制点-取消自定义的位置，恢复到自动计算
     */
    resetCtrlPoint(): void;
/**
     * 根据参数t,获取曲线上某点
     * @param t 区间 [0,1]
     * @returns
     */
    getPoint(t: number): PointLike;
    /**
     * @override
     */
    getLocalPoint(t: number, segIndex?: number | null): PointLike;

hitTest(x: number, y: number): boolean;

}

/**
 * 放射渐变
 ```js
 let rg = new RadialGradient(0,0, 20, 0, 0, 30);
 rg.addColorStop(0, 'white');
 rg.addColorStop(0.5, 'red');
 rg.addColorStop(1, 'blue');

 //也可以一次性设置：
 rg.setColors([[0, 'white'], [0.5, 'red'], [1, 'blue']]);
 ```
 */
export declare class RadialGradient extends StyleGradient implements CanvasGradient {
    className: string;
    /**
     * 开始坐标x
     */
    xStart: number;
    /**
     * 开始坐标y
     */
    yStart: number;
    /**
     * 结束坐标x
     */
    xStop: number;
    /** 结束坐标y */
    yStop: number;
    /**
     * 开始圆的半径
     */
    radiusStart: number;
    /**
     * 结束圆的半径
     */
    radiusEnd: number;
constructor(xStart: number, yStart: number, radiusStart: number, xStop: number, yStop: number, radiusEnd: number);
/**
     * 添加颜色停靠点到颜色列表中。
     * @param {Number} offset - 颜色停靠点的偏移量，通常是一个0到1之间的数值，表示在渐变中的位置。
     * @param {String} color - 颜色的表示，可以是CSS颜色字符串，如「rgb」或「#rrggbb」格式。
     */
    addColorStop(offset: number, color: string): void;
    /**
     * 设置颜色并更新状态
     * @param colors {Array} 颜色数组，用于更新当前对象的颜色
     */
    setColors(colors: Array<[number, string]>): void;
    /**@protected */
    getStyle(): CanvasGradient;
}

/**
 * 随机生成颜色（不是完全随机，有jtopo的主题方案）
 * 返回示例： '#c5aa99'
 *
 * @deprecated 已过时，未来将被删除
 *
 * @returns {String} 十六进制颜色字符串
 */
export declare function randomColor(): string;

export declare type RatioDirection = DirectionType;

/**
 * 矩形类型，四个核心属性：x、y、width、height
 *
 * 和 Node 节点不同，Rect的坐标原点在左上角，不在中间
 */
export declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    setTo(x?: number, y?: number, width?: number, height?: number): this;
    getRect(): this;
    clone(): Rectangle;
    toString(): string;
    equals(rect: Rectangle): boolean;
    containsRect(rect: Rectangle): boolean;
    isEmpty(): boolean;
    contains(x: number, y: number, precision?: number): boolean;
    isIntersectRect(rect: Rectangle): boolean;
    /** 获取矩形中心点坐标 */
    getCenter(): {
        x: number;
        y: number;
    };
    toPoints(): {
        x: number;
        y: number;
    }[];
    static union(out: Rectangle, rect: Rectangle): Rectangle;
    static unionRects(rects: Array<Rectangle>): Rectangle;
    get left(): number;
    set left(v: number);
    get right(): number;
    set right(v: number);
    get top(): number;
    set top(v: number);
    get bottom(): number;
    set bottom(v: number);
    /** 获取矩形中心点x坐标 */
    get center(): number;
    set center(v: number);
    /** 获取矩形中心点y坐标 */
    get middle(): number;
    set middle(v: number);
}

export declare const RectPosition: Readonly<{
    lt: "lt";
    ct: "ct";
    rt: "rt";
    lm: "lm";
    rm: "rm";
    lb: "lb";
    cb: "cb";
    rb: "rb";
    center: "center";
}>;

export declare const RectPositionNormalized: {
    lt: [number, number];
    ct: [number, number];
    rt: [number, number];
    lm: [number, number];
    center: [number, number];
    rm: [number, number];
    lb: [number, number];
    cb: [number, number];
    rb: [number, number];
};

/** 矩形方位 */
export declare type RectPositionType = 'lt' | 'ct' | 'rt' | 'lm' | 'center' | 'rm' | 'lb' | 'cb' | 'rb';

export declare const RectPositionUnitNormals: {
    lt: [number, number];
    ct: [number, number];
    rt: [number, number];
    lm: [number, number];
    center: [number, number];
    rm: [number, number];
    lb: [number, number];
    cb: [number, number];
    rb: [number, number];
};

/**@protected */
export declare class RectShape extends PolygonShape {
    className: string;
    isClosed: boolean;
    isUnit: boolean;
    constructor();
    draw(ctx: CanvasRenderingContext2D, node: Node_2): void;
    drawSVG(svg: SVGElement, node: Node_2): void;
}

export declare interface Registerable {
}

/** 通过Assets.regShape 注册的图形 */
export declare class RegShape extends Shape {
    className: any;
    draw(ctx: CanvasRenderingContext2D, node: NE): void;
    drawSVG(svg: SVGElement, node: NE): void;
}

/**
 * 用于注册自定义的类、图形、函数
 *
 * 自定义的类需要序列化时，需要先注册
 */
export declare class RegSystem {




/**
     * 注册自定义的图形（实例）
     *
     * 例: regShape('com.myapp', 'MyShape', MyShape);
     *
     * @param packageName 包名
     * @param name 图形名
     * @param shape 图形
     */
    static regShape(packageName: string, name: string, shape: Shape): void;
    /**
     * 获取自定义图形（实例）
     * @param name 图形名 例: com.myapp.MyShape
     * @returns 图形
     */
    static getShape(name: string): Shape;
    static hasShapeInstance(name: string): boolean;
    /**
     * 获取某个包中的所有图形（实例）
     * @param packageName 包名
     */
    static getShapes(packageName: string): any[];
    /**
     * 注册自定义的函数
     * @param packageName 包名
     * @param name 函数名
     * @param fn 函数
     */
    static regFunction(packageName: string, name: string, fn: Function): void;
    /**
     * 获取自定义的函数
     *
     * @param name 函数名
     * @returns 函数
     */
    static getFunction(name: string): Function;
    /**
     * 注册自定义的类 （类必须提供默认不带参数的构造函数）
     *
     * @param packageName 包名
     * @param name 类名
     * @param clazz 类
     */
    static regClass(packageName: string, name: string, clazz: new (...args: any[]) => any): void;
    /**
     * 获取自定义的类
     * @param name 类名
     * @returns 类
     */
    static getClass(name: string): new (...args: any[]) => any;
    /**
     * 获取实例的类名
     * @param instance 实例
     * @returns 类名
     */
    static getObjectClassName(instance: Object): string;
    static newInstance(fullClassName: string): any;
    /**
     * 获取空实例
     * @param className
     * @returns
     */
    static getEmptyInstance(className: string): Object;
    static _sysRegClass(clazz: new (...args: any[]) => any): void;
    static _sysRegClasses(clazzes?: Array<new (...args: any[]) => any>): void;
    static _sysRegFunction(name: string, fn: Function): void;
}
declare type RenderState = {
    treeDirty: boolean;
    requestRepaint: boolean;
    renderTimes: number;
    flattenList: Array<Node_2 | Link>;
    dirtySet: Set<Node_2 | Link>;
    renderSet: Set<Node_2 | Link>;
    renderList: Array<Node_2 | Link>;
};

/**@ignore */
declare class RenderSystem extends EventTarget_2<EventTypes, RenderSystemEvent> {

constructor(stage: Stage);
    start(): void;
    _tickLayer(layer: Layer, time: number): void;

    pause(): void;
    resume(): void;
}

declare class RenderSystemEvent<K extends keyof EventTypes = keyof EventTypes> extends JTopoEvent<EventTypes, K> {
}

export declare class ResourceEvent<K extends keyof EventsMap_4 = keyof EventsMap_4> extends JTopoEvent<EventsMap_4, K> {
}

export declare const ResourceSystem: ResourceSystemBase;
export declare type RotateDirectionType = 'clockwise' | 'anticlockwise';

declare function scale(out: Vec2Type, v: Vec2Type, s: number): Vec2Type;

/**
 * 端点：表示连接到Node或Link的某一个线段上
 ```js
 import {SegmentAnchor} from '@jtopo/core';

 // 示例
 let anchor = new SegmentAnchor(link2, 0.5, 0);
 link.setBegin(anchor);
 ```
 * @protected
 */
export declare class SegmentAnchor extends Anchor {
    /**
     * @readonly
     */
    className: string;
    t: number;
    segIndex: number;
    name: string;
constructor(name: string | null, t: number, segIndex?: number, usageType?: AnchorUsageType);
}

/**
 * 当前选中的对象组(由鼠标点击 或者 框选)
 *
 ```js
 // 当前被选中的对象集合,有Node、Link
 let objects = stage.selectedGroup.objects;

 // 判断obj是否在选中组中
 stage.selectedGroup.has(obj);

 // 判断选中组是否为空
 stage.selectedGroup.isEmpty();
 ```
 */
export declare class SelectedGroup extends EventTarget_2<EventsMap_3, SelectedGroupEvent> {
    /**
     * 当前被选中的对象集合,有Node、Link
     * @readonly
     */
    objects: any[];
constructor();
    /**
     * 是否为空
     * @returns
     */
    isEmpty(): boolean;


getTopObjects(): Array<NE>;
    /**@protected */
    addAll(childs: Array<NE>): this;
    add(child: NE): this;
removeAll(): this;
    /**@protected */
    has(child: NE): boolean;
    reset(): void;
}

export declare class SelectedGroupEvent<K extends keyof EventsMap_3 = keyof EventsMap_3> extends JTopoEvent<EventsMap_3, K> {
}

export declare interface Serializable {
    _serializers: string[];
    _allwaysSerializers?: string[];
}

/** 可被序列化的 */
export declare type SerializeableType = {
    [key: string]: any;
};

export declare type SerializedDisplayObjectType = {
    [key: string]: any;
    className: string;
    id?: number | string;
    name?: string;
    type?: string;
    attributes?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    pointerEnabled?: boolean;
    visible?: boolean;
    zIndex?: number;
    style?: number;
    shape?: any;
    beginArrow?: {};
    endArrow?: {};
} & (SerializedLayerType | SerializedNodeType | SerializedLinkType);

/**
 * 序列化后的json格式
 */
export declare type SerializedJsonType = {
    /** jtopo版本 */
    version: string;
    /** 序列化类型 */
    SerializeType: 'Stage' | 'Layer' | 'Objects';
    Roots: Array<any>;
    /** 用户自定义的样式 */
    CustomStyle: {
        /** 当前使用的主题 */
        [themeName: string]: any;
        /** 用户自定义的主题 */
        themes?: {
            [key: string]: ThemeType;
        };
        /** 通过defClass定义的样式 */
        styles?: {
            [key: string]: PartStyleOptionType;
        };
    };
    Styles: Array<any>;
    /** 资源 */
    Resources: any[];
    Shapes: Array<any>;
    DisplayObjects: Array<SerializedDisplayObjectType>;
    /** 编辑信息 */
    EditInfo?: {
        /** 禁止编辑的节点 */
        uneditable?: Array<number>;
        /** 禁止连线的节点 */
        unconnectable?: Array<number>;
    };
};

declare type SerializedLayerType = {
    isLayer: true;
};

export declare type SerializedLinkType = {
    isLink: true;
    label?: number;
    parent?: number;
    path?: [];
    begin?: {};
    end?: {};
    beginArrow?: number;
    endArrow?: number;
};

declare type SerializedNodeType = {
    isNode: true;
    image?: number;
    parent?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    skewX?: number;
    skewY?: number;
};

/**
 * 序列化系统
 *
 * 核心功能：将对象转成json 或者 将json转成对象
 */
export declare class SerializerSystem {
constructor(stage: Stage);
    static numberFixed: number;
    /**
     * 设置序列化时保留的小数点后的位数，如果为null，则不对数字做任何截取
     *
     * 默认保留小数点后6位数字
     */
    setNumberFixed(n: number): void;
    /**
     * 将对象列表转成json
     * @param objArr
     * @param imageToBase64
     */
    objectsToJSON(objArr: Array<NE>, serializeType?: 'Stage' | 'Layer' | 'Objects'): SerializedJsonType;
    /**
     * 将json转成对象列表
     * @param json
     * @param objMap
     */
    jsonToObjects(json: SerializedJsonType, objMap?: Map<number, NE>): Array<NE>;
/**
     *  将’组件‘json转成对象(Node或者Link)
     * @param componentJson
     * @returns
     */
    componentToObjects(componentJson: string): Array<Node_2 | Link>;
    /**
     * 对象列表转成json 成为’组件‘
     * @param objArr
     * @returns
     */
    objectsToComponent(objArr: Array<Node_2 | Link>): string;
/**@protected */
    _getState(layer: Layer, cacheMap: WeakMap<Object, NE>): SerializedJsonType;
    /**@protected */
    _restoreFromState(json: SerializedJsonType, cacheMap: WeakMap<Object, NE>): any[];
}

/**@ignore */
export declare function setProto(value: any): (target: any, key: string) => void;

/**
 * 图形抽象基类
 */
export declare abstract class Shape implements Serializable {
    /**
     * 类名称
     * @readonly
     */
    className: any;
/**
     * 是否封闭图形（最后一个点是否连接到第一个点形成封闭图形），默认true
     */
    isClosed: boolean;
    /** 默认或建议的宽度，默认32 */
    width: number;
    /** 默认或建议的高度，默认32 */
    height: number;
    /**
     * 顶点集合(归一化坐标)
     * @readonly
     */
    vertices: Array<PointLike>;
isUnit: boolean;
/**
     * 实例的命名空间
     *@protected
     */
    namespace: string;
constructor();
    /**
     * 绘制图形
     * @param ctx
     * @param object
     * @param points
     */
    abstract draw(ctx: CanvasRenderingContext2D, object: NE): any;
    abstract drawSVG(svg: SVGElement, node: NE): any;
    getAnchors(): Map<string, Anchor>;
    hasAnchor(name: string): boolean;
    /**
     * 设置连接点
     * @param connections
     */
    setConnections(connections: Array<{
        name: string;
        x: number;
        y: number;
        usage?: AnchorUsageType;
    }>): void;
    /**
     * 获取连接点
     * @param name
     * @returns
     */
    getConnectionAnchor(name: string): Anchor;
    /**
     * 获取所有连接点
     * @returns
     */
    getConnectionAnchors(): IterableIterator<Anchor>;
    /**
     * 获取 图形上距离(x,y)最近的点
     * @param x
     * @param y
     */
    getIntersect(x: number, y: number, obj: NE): Intersect;
    /**
     * 获取连接点 (x,y) -> 本对象中心 与边框的交点
     * @param worldPoint
     * @returns
     */
    getConnectAutoPoint(x: number, y: number, obj: NE): {
        x: number;
        y: number;
    };
    toJSON(): any;
    static fromJSON(json: any): Shape;
    /**
     * 生成二维网格坐标数组
     * @param rows 行
     * @param cols 列
     * @returns PointLike[] 顶点坐标集合
     */
    static grid(rows: number, cols: number): PointLike[];
    /**
     * 生成二维内网格坐标数组(有内边距)
     * @param rows 行
     * @param cols 列
     * @returns PointLike[] 顶点坐标集合
     */
    static innerGrid(rows: number, cols: number): PointLike[];
    /**
     * 生成圆环点坐标
     * @param opt
     * @returns PointLike[] 顶点坐标集合
     */
    static circle(opt: BuildCircleOpt): any[];
    /**
     * 生成 正多边形 (最小为3边形，小于3边形时，按3边形处理)
     * @param edgeCount 边数
     * @returns PointLike[] 顶点坐标集合
     */
    static polygon(edgeCount: number): any[];
}

/**
 * 几何形状生成器, 用于生成几何形状的顶点坐标
 *
 ```js
 // 生成一个10x10的网格
 let points = ShapeBuilder.grid(10, 10);
 console.log(points);

 // 生成一个圆环
 let circlePoints = ShapeBuilder.circle({ vertexCount: 10 });
 console.log(circlePoints);

 // 生成一个正多边形
 let polygonPoints = ShapeBuilder.polygon(5);
 console.log(polygonPoints);

 // 生成一个三角形
 let trianglePoints = ShapeBuilder.circle({ vertexCount: 3, beginAngle: 0, endAngle: Math.PI * 2 });
 console.log(trianglePoints);
 ```
 */
export declare class ShapeBuilder {
    /**
     * 生成二维网格坐标(外边框)数组
     * @param rows 行
     * @param cols 列
     * @returns PointLike[] 顶点坐标集合
     */
    static grid(rows: number, cols: number): PointLike[];
    /**
     * 生成二维内网格坐标数组
     * @param rows 行
     * @param cols 列
     * @returns PointLike[] 顶点坐标集合
     */
    static innerGrid(rows: number, cols: number): PointLike[];
    /**
     * 生成圆环点坐标
     * @param opt
     * @returns PointLike[] 顶点坐标集合
     */
    static circle(opt: BuildCircleOpt): any[];
    /**
     * 生成 正多边形 (最小为3边形，小于3边形时，按3边形处理)
     * @param edgeCount 边数
     * @returns PointLike[] 顶点坐标集合
     */
    static polygon(edgeCount: number): any[];
}

/**
 * 几何图形节点
 *
 ```js
 let shapeNode = new Node('', 0, 220, 100, 100);

 // 创建多边形shape
 const points = Shape.polygon(5);
 const shape = new PolygonShape(points);
 shapeNode.setShape(shape);

 ```
 */
export declare class ShapeNode extends Node_2 {
    className: any;
    _shape: Shape;
get shape(): Shape;
    set shape(v: Shape);
    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 设置节点的形状
     */
    setShape(shape: Shape): void;
    hitTest(x: number, y: number): boolean;
    /**@override */
    _getOBBPoints(): PointLike[];
    protected _strokeAndFill(ctx: any): void;
    protected drawShape(ctx: CanvasRenderingContext2D): void;
/**@override */
    _toJSON(indexInfo?: ObjectIndexInfo): SerializedDisplayObjectType;
    /**@override */
    _fromJSON(fromJsonInfo: FromJsonInfo): void;
}

declare type ShowGridOptions = {
    /**
     * 网格背景颜色
     */
    backgroundColor?: string;
    /**
     * 小网格大小
     */
    minorSize?: number;
    /**
     * 大网格大小
     */
    majorSize?: number;
    /**
     * 大网格颜色
     */
    majorColor?: string;
    /**
     * 小网格颜色
     */
    minorColor?: string;
};
declare type SpriteAnimationOptions = {
    /** 雪碧图中的索引 */
    frameIndex: number;
    /** 一共多少帧 */
    frameCount: number;
    /** 雪碧图总行数 */
    totalRows: number;
    /** 雪碧图总列数 */
    totalColumns: number;
    /** 如果帧数大于1, 视作动画, 指定播放时长, 单位：毫秒 */
    duration?: number;
};

/**
 * Sprite节点(雪碧图)
 *
 ```js
 // 示例
 let spriteNode = new SpriteNode('', 0, 220, 100, 60);
 spriteNode.setSprite('./assets/img/sprite.png', {
 totalRows: 32,      // 雪碧图总行数
 totalColumns: 32,   // 雪碧图总列数
 frameIndex: 0,      // 在雪碧图中的索引 （看作网格，从左到右，从上到下，从0开始数）
 frameCount: 10,     // 一共多少帧 （从索引开始，一共多少个格子）
 duration: 5000      // 5秒播放完毕
 }).then(() => {
 // 取消节点的自动尺寸
 spriteNode.autoSize = false;
 // 指定尺寸
 spriteNode.resize(100, 100);
 });
 ```
 * - 通常情况下，雪碧图的性能表现很好。
 */
export declare class SpriteNode extends ImageNode {
    className: string;
    _animation: SpriteAnimation | null;
    /** 自动调整尺寸到帧尺寸 */
    _autoSize: boolean;
animation: Animation;

    constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
    /**
     * 改变 索引、帧数、动画时长
     */
    changeSprite(opt: {
        /** 雪碧图中的索引 */
        frameIndex?: number;
        /** 一共多少帧 */
        frameCount?: number;
        /** 动画时长, 单位：毫秒 */
        duration?: number;
    }): void;
    /**
     * 设置雪碧图
     *
     ```js
     // 示例
     spriteNode.setSprite('./assets/img/sprite.png', {
     totalRows: 32,      // 雪碧图总行数
     totalColumns: 32,   // 雪碧图总列数
     frameIndex: 0,      // 在雪碧图中的索引 （看作网格，从左到右，从上到下，从0开始数）
     frameCount: 10,     // 一共多少帧 （从索引开始，一共多少个格子）
     duration: 5000      // 5秒播放完毕
     });
     ```
     */
    setSprite(img: string | HTMLImageElement, opt: {
        /** 雪碧图中的索引 */
        frameIndex: number;
        /** 一共多少帧 */
        frameCount: number;
        /** 雪碧图总行数 */
        totalRows: number;
        /** 雪碧图总列数 */
        totalColumns: number;
        /** 如果帧数大于1, 视作动画, 指定播放时长, 单位：毫秒 */
        duration?: number;
    }): Promise<HTMLImageElement | null>;
    setImage(imgObj: string | HTMLImageElement): Promise<HTMLImageElement | null>;
    /**@protected */
    protected _drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void;
    /**
     * 设置节点尺寸到帧的实际像素尺寸
     */
    resizeToFrame(): this;
    /**
     * 播放动画
     */
    play(): this;
    /**
     * 暂停动画
     */
    pause(): this;
    update(): void;
    /**@abstract */
    onUnmounted(): void;
    /**
     * 改变雪碧图中的索引
     */
    set frameIndex(v: number);
    get frameIndex(): number;
    /**
     * 改变帧数
     */
    set frameCount(v: number);
    get frameCount(): number;
    /**
     * 改变动画时长
     */
    set duration(v: number);
    get duration(): number;
    set autoSize(v: boolean);
    get autoSize(): boolean;
    get totalRows(): number;
    set totalRows(v: number);
    get totalColumns(): number;
    set totalColumns(v: number);
    destroy(): void;
}

/**
 * 顶层场景对象，下面可以有多个Layer, 一个Layer可以充当一个场景
 * 创建时需要一个dom对象，通常是一个div，来作为渲染目标
 ```js
 const stage = new Stage(document.getElementById('divId'));

 // 常用的一些方法:
 // 全屏（浏览器内)
 stage.fullWindow();

 // 全屏（铺满物理显示器)
 stage.fullScreen();
 ```
 */
export declare class Stage extends EventTarget_2<StageEventsMap, StageEvent> {
    /** 版本号 */
    version: string;
    /**
     * 顶层dom元素, new Stage(...)时指定的Dom对象
     */
    domElement: HTMLElement;
    /**
     * 键盘抽象
     */
    keyboard: Keyboard;
/**
     * 仅系统内部控制用
     * @protected
     * @ignore
     */
    handlerLayer: HandlerLayer;
    /**
     * 加入Stage的Layer集合
     */
    viewLayers: Array<Layer>;
    /**
     * 当前选中的对象组(由鼠标点击 或者 框选)
     */
    selectedGroup: SelectedGroup;
    /**
     * 缩略图对象
     */
    overview: Overview;
    /**
     * 宽度，随顶层的dom元素变化
     * */
    width: number;
    /**
     * 高度，随最顶层的dom元素变化
     */
    height: number;
    halfWidth: number;
    halfHeight: number;
    /**
     * 存放Layer的Dom对象，不要改动
     * @protected
     */
    layersContainer: HTMLElement;
/**
     * UI/DOM对象的容器对象，不要改动
     */
    uiContainer: HTMLElement;
    /** 是否启用浏览器默认的右键菜单, 默认隐藏浏览器的右键菜单 */
    contextmenuEnabled: boolean;
    /**
     * @deprecated 请使用 contextmenuEnabled 代替
     */
    get enableContextmenu(): boolean;
    /**
     * 调试信息面板，打开后会在左上角显示鼠标坐标信息、选中对象的定位信息等
     ```js
     // 可以通过以下方法打开，方便调试
     stage.showDebugPanel();
     ```
     */
    debugPanel: DebugPanel;
    /**
     * 显示和操作模式，不同模式下的操作行为会有一些差别。
     *
     * 默认模式(normal)下, 鼠标左键选择对象，右键是拖拽画布;
     *
     * 框选模式（select）下，鼠标左键可以一次性框选多个对象
     *
     * 拖拽模式(drag)下，鼠标只能拖拽画布，不能选中对象;
     *
     * 查看模式（view）下，只能看，不能进行任何操作。
     *
     */
    mode: StageModeType;
    /** 是否已经销毁 */
    destroyed: boolean;
    /**
     *
     * 输入系统对象，存储鼠标相关信息, 例如：
     ```js
     // 鼠标指针在画布上的位置 x
     let xInCanvas = stage.inputSystem.x;

     // 鼠标指针在世界坐标系的位置 x
     let xInWorld = stage.inputSystem.xInWorld;

     // 鼠标最后一次按下时的坐标
     let downX = stage.inputSystem.pointerDownX;

     // 当前鼠标是否在拖拽中
     let isDraging = stage.inputSystem.isDraging;
     ```
     */
    inputSystem: InputSystem<NE>;
    /**
     * 动画系统
     */
    animationSystem: AnimationSystem;
    /**
     * 动效系统
     */
    effectSystem: EffectSystem;
    /**
     * 布局控制系统
     */
    layoutSystem: LayoutSystem<LayoutNode>;
    /**
     * 图系统(图论相关)
     */
    graphSystem: GraphSystem;
    /**
     * 样式系统
     */
    styleSystem: StyleSystem;
    /**
     * 渲染
     */
    renderSystem: RenderSystem;
    /**
     * 导出系统
     */
    exportSystem: ExportSystem;
    /**
     * 序列化系统
     */
    serializerSystem: SerializerSystem;

/**
     * 当前相机
     */
    camera: Camera;
    /**
     * 资源加载系统
     */
    resourceSystem: ResourceSystemBase;




    /** 参数配置 */
    config: StageConfig;
/**
     * 渲染目标Dom对象（或dom对象的id）
     * @param rendererDom
     */
    constructor(rendererDom: HTMLElement | string, config?: StageConfig);
    getRect(): Rectangle;


/** 指定尺寸（仅在 stage.config.autoResize为false的时候有效) */
    resize(newWidth: number, newHeight: number): void;
    /**
     * 显示左上角的调试信息
     */
    showDebugPanel(): void;
    /**
     * 隐藏左上角的调试信息
     */
    hideDebugPanel(): void;
    /**
     * 显示缩略图 （所在div的css属性position为 absolute）
     * 可通过css样式来定位，例如：
     ```js
     stage.showOverview({
     left: 0,
     bottom: -1
     });
     ```
     */
    showOverview(styles?: Object): void;
    /**
     * 隐藏缩略图
     */
    hideOverview(): void;
    /**
     * 加入一个Layer
     *
     * Layer如果设置了背景，可能会遮挡住下面的Layer。
     *
     * 一个Stage下，最多可以添加8个Layer
     */
    addLayer(layer: Layer): void;
/**
     * 移除一个Layer
     * @param layer
     */
    removeLayer(layer: Layer): this;
    /**
     * 移除一个Layer
     * @param layer
     * @deprecated 已过时 removeLayer 代替
     */
    removeChild(layer: Layer): this;
    /**
     * 显示
     *
     * 所有Layer可见, 既:调用所有Layer的show方法
     */
    show(): Promise<HTMLImageElement | HTMLCanvasElement>;
    /**
     * 所有Layer不可见（脚本和动画仍然在执行）
     */
    hide(): void;
    /**
     * 请求重绘一次（不立即绘制，而是在下一帧的时间窗口重绘）
     *
     * 极短时间内的多次请求会合并成一次绘制，不用担心性能问题
     */
    update(): void;
/**
     * 获取整个Stage的图像数据，Base64编码
     *
     * 例如： data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby...
     */
    toDataURL(): Promise<string>;
    /**
     * 导出成图片并在浏览器新标签页打开
     */
    saveImageInfo(): Promise<string>;
    /**
     * 导出图片并下载到本地
     */
    saveAsLocalImage(): void;
    /**
     * 在浏览器窗口内全屏
     */
    fullWindow(): void;
    /**
     * 整个浏览器全屏
     */
    fullScreen(): void;
    /**
     * 设置场景模式,模式有：normal（默认值)、select(框选)、edit(编辑)、drag(拖拽)
     *
     * 触发 'modeChange'事件，可捕获
     * @param mode 场景模式
     */
    setMode(mode: StageModeType): void;










_setTitle(title: string): void;

/**
     * 显示坐标轴
     */
    showAxis(): this;
    /**
     * 隐藏坐标轴
     */
    hideAxis(): this;
    /**
     * 显示标尺
     * 可以设置：主颜色，是否显示贴边的轴线（默认不显示）
     * @param options { majorColor?: string, showBorderLines?: boolean }
         * @returns { Stage }
         */
     showRuler(options?: {
         majorColor?: string;
         showBorderLines?: boolean;
     }): void;
     hideRuler(): void;
     /**
      * 显示网格辅助
      * @param options { ShowGridOptions }
      * @returns { Stage }
      */
     showGrid(options?: ShowGridOptions): void;
     /**
      * 隐藏网格辅助
      */
     hideGrid(): void;
     /**
      * 设置背景
      * @param background
      */
     setBackground(styleOption: {
         background?: string;
         backgroundImage?: string;
         backgroundRepeat?: string;
         backgroundPosition?: string;
         backgroundSize?: string;
     }): void;

/**
      * 获取当前光标, 相当于读取: cavnas.style.cursor;
      */
     getCursor(): string;
     /**
      * 设置光标, 相当于: cavnas.style.cursor = cursor;
      * @param cursor
      */
     setCursor(cursor: string): string;
     /**
      * 下载为json文件
      */
     download(fileName: string, content: string): void;
     /**
      * 选中指定的对象
      * @protected
      */
     select(objects: Array<NE>): void;
     /**
      * 获取当前最上层的第一个可见Layer
      */
     getCurrentLayer(): Layer | null;
/**
      * 获取所有可见的Layer
      */
     getAllVisibleLayers(): Layer[];
     getCenter(): {
         x: number;
         y: number;
     };
     /**
      * 设置当前相机
      * @param camera
      */
     setCamera(camera: Camera): void;
     toJSON(): SerializedJsonType;
     /**
      * 将所有图片资源转换为Base64打包内嵌进JSON中, 该方法是异步的
      ```js
      // 情形1
      stage.toJSONWithBase64().then(json => {
      console.log(json);
      });

      // 情形2, 同上，使用js的新语法 await
      let json = await stage.toJSONWithBase64();
      ```
      */
     toJSONWithBase64(): Promise<SerializedJsonType>;
     /**
      * 清空当前画面并加载json内容
      *
      ```js
      // 情形1
      stage.fromJSON(json).then(()=>{
      console.log('已经打开');
      });

      // 情形2, 同上，使用js的新语法 await
      await layer.fromJSON(json);
      console.log('已经打开');
      //... 继续其他操作
      ```
      *
      * @param jsonOrString
      * @returns Promise
      */
     fromJSON(json: SerializedJsonType, existObjectMap?: Map<Object, NE>): Promise<boolean>;
/**
      * 销毁
      */
     destroy(cleanCache?: boolean): void;
    }

    export declare type StageConfig = {
        /**
         * 是否启用drop，默认开启
         */
        dropAllowed: boolean;
        /** 是否自动调整尺寸（通过监控外层的容器尺寸） */
        autoResize: boolean;
    };

    export declare class StageEvent<K extends keyof StageEventsMap = keyof StageEventsMap> extends JTopoEvent<StageEventsMap, K> {
    }

    declare type StageEventsMap = {
        resize: {
            newWidth: number;
            newHeight: number;
        };
        fullWindow: {
            cancelable?: boolean;
        };
        fullScreen: {
            cancelable?: boolean;
        };
        modeChange: {
            cancelable?: boolean;
            mode: StageModeType;
            newMode: StageModeType;
        };
        /** 加载json完成 */
        afterLoaded: {
            /** 加载的json */
            json: SerializedJsonType;
        };
    };

    /**
     * StageMode 常量
     */
    export declare const StageMode: Readonly<{
        drag: "drag";
        edit: "edit";
        normal: "normal";
        select: "select";
        view: "view";
        paint: "paint";
    }>;

    /** Stage模式 */
    export declare type StageModeType = 'normal' | 'drag' | 'edit' | 'view' | 'select' | 'paint';

    /**
     * 样式对象, 一般不直接使用
     *
     * 而是通过主题定义、图元的css({...})方法来自动管理
     */
    export declare class Style implements Serializable {
        className: string;

/**
         * 滤镜效果， 例如：
         *
         * 高斯模糊：'blur(5px)'
         *
         * 灰度： 'grayscale(100%)' 用于将图像转换为灰度的滤镜
         *
         * 褐色: 'sepia(100%)' 用于将图像转换为深褐色的滤镜。
         *
         * 锐化： 'contrast(150%) brightness(120%)' 这种滤镜效果可以增强图像的锐度和清晰度，使其看起来更加清晰、鲜明。
         *
         * 颜色矫正: 'saturate(200%) hue-rotate(180deg)' 这种滤镜效果可以调整图像的色彩和色调，使其看起来更加自然、真实。
         *
         * 反色：'invert(100%)' 这种滤镜效果可以将图像中的颜色反转，从而创建出截然不同的视觉效果。
         *
         * 透明度：'opacity(50%)' 这种滤镜效果可以改变图像的透明度，使其看起来更加半透明或不透明。
         *
         * 饱和度：'saturate(200%)' 这种滤镜效果可以改变图像的饱和度，使其看起来更加鲜艳或柔和。
         *
         * 对比度：'contrast(200%)' 这种滤镜效果可以增加或减少图像的对比度，从而改变其亮度和明暗程度。
         *
         * 色调： 'hue-rotate(90deg)' 用于对图像应用滤镜以设置图像的色调旋转.
         */
        filter?: string;
        /**
         * 于设置图片是否平滑，也就是是否抗锯齿
         *
         * true 表示图片平滑（默认值），false 表示图片不平滑
         */
        imageSmoothingEnabled?: boolean;
        /**
         * 边框宽度
         */
        borderWidth?: number;
        /**
         * 整体透明度
         */
        globalAlpha?: number;
        /**
         * 绘制模式
         */
        globalCompositeOperation?: GlobalCompositeOperation;
        /**
         * 填充样式, 如: "red"、"gray"、"rgb(1,0,0)"、 "#FF0000"、"rgba(255,0,0,0.8)"
         */
        fillStyle?: string | CanvasGradient | CanvasPattern;
        /**
         * 线条样式, 对于Node而言就是边框线条。
         *
         * 如: "red"、"gray"、"rgb(1,0,0)"、 "#FF0000"、"rgba(255,0,0,0.8)"
         */
        strokeStyle?: string | CanvasGradient | CanvasPattern;
        /**
         * 阴影
         */
        shadowBlur?: number;
        /**
         * 阴影颜色, 如: "red"、"gray"、"rgb(1,0,0)"、 "#FF0000"、"rgba(255,0,0,0.8)"
         */
        shadowColor?: string;
        /**
         * 阴影X方向的长度
         */
        shadowOffsetX?: number;
        /**
         * 阴影y方向的长度
         */
        shadowOffsetY?: number;
        /**
         * 文本水平偏移量
         */
        textOffsetX?: number;
        /**
         * 文本垂直偏移量
         */
        textOffsetY?: number;
        /**
         * lineCap
         */
        lineCap?: CanvasLineCap;
        /**
         * lineJoin
         */
        lineJoin?: CanvasLineJoin;
        /**
         * 线宽度
         */
        _lineWidth?: number;
        miterLimit?: number;
        /**
         * 字体, 如: "bold 20px sans-serif"
         */
        font?: string;
        /**
         * 字体左右对齐方式
         */
        textAlign?: CanvasTextAlign;
        /**
         * 字体基线
         */
        textBaseline?: CanvasTextBaseline;
        /**
         * 虚线，例如[3,2]
         */
        lineDash?: number[];
        /**
         * 虚线偏移量
         */
        lineDashOffset?: number;
        /**
         * 文字位置
         */
        textPosition?: RectPositionType;
        /**
         * 文字颜色, 如: "red"、"gray"、"rgb(1,0,0)"、 "#FF0000"、"rgba(255,0,0,0.8)"
         */
        color?: string;
        /**
         * 边框和图形的间距
         */
        padding?: number;
/**
         * 边框样式
         */
        borderStyle: null | 'solid' | 'dashed' | 'dotted';
        /**
         * 边框颜色, 如: "gray", "rgb(1,0,0)", "#FF0000"
         */
        borderColor?: string;
        /**
         * 边框圆角, 如: 5
         *
         * 也支持支持数组: [0, 10, 20, 30]，四个角（比较老的浏览器可能不支持）
         */
        borderRadius?: number | [number, number, number, number];
        /**
         * 文字行高
         */
        lineHeight?: number;
        /**
         * 背景颜色
         */
        backgroundColor?: string;
constructor(init?: PartStyleOptionType);
        set lineWidth(v: number);
        get lineWidth(): number;

toJSON(imageIndexFn?: Function): SerializedDisplayObjectType;

applyTo(ctx: CanvasRenderingContext2D): void;
        computePadding(): number;
/**
         * 测量字符串在某个样式下的尺寸（以下因素均可能影响结果：文本是否多行、字体、字号、行高）
         * @param lineCount text的行数
         */
        static measureText(text: string | Array<string>, style: Style, lineCount: number, defaultFont?: string): {
            width: number;
            height: number;
            lineHeight: number;
        };
        get border(): any;
        /**
         * 边框, 如: solid 1px gray
         */
        set border(v: any);
        /**
         * 字体大小， 例如： '20px', '12px'
         */
        set fontSize(size: string | number);
        get fontSize(): string | number;
        /**
         * 字体名称， 例如： 'sans-serif', 'serif'
         */
        set fontFamily(family: string);
        get fontFamily(): string;
        /**
         * 字体重量, 如 : "bold" 、"italic" 、"bold italic"
         */
        set fontWeight(weight: string);
        get fontWeight(): string;
    }

    declare abstract class StyleGradient {
        /**
         * 颜色列表
         * 例如: [[0, 'white'], [1, 'blue']]
         * 例如：[[0, 'white'], [0.5, 'red'], [1, 'blue']]
         */
        colors: Array<[number, string]>;

dirty: boolean;
constructor();
        update(): void;
        toJSON(): {};
        abstract getStyle(): CanvasPattern | CanvasGradient | null;
    }

    /**
     * 样式属性名字
     */
    export declare type StyleKeyType = ClassPropertyNamesExclude<Style, `_${string}` | 'className' | 'dirty'>;

    declare class StyleManager {

        constructor();
        addOrReplaceClass(className: string, style: string): void;
        init(): void;
    }

    /**
     * 图案填充样式
     ```js
     let pattern = new StylePattern('./assets/img/pattern.jpg', 'repeat');

     node.setStyles({
     fillStyle: pattern
     })
     ```
     */
    export declare class StylePattern implements CanvasPattern {
        className: string;
        /** 重复: 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y' */
        repetition: string;
dirty: boolean;



constructor(imagePath: string, repetitionStyle?: any);
        update(): void;
        toJSON(): {};
/**@protected */
        getStyle(): CanvasPattern;
        get image(): string;
        set image(src: string);
        setTransform(transform?: DOMMatrix2DInit): void;
    }

    /**
     * 样式系统
     ```js
     // 设置’主题‘，系统目前自带了两个, 例如：
     stage.styleStyle.setTheme('DefaultDark');
     stage.styleStyle.setTheme('DefaultLight');

     // 定义一个样式
     stage.styleSystem.defClass('.active', {
     color: 'red',
     font: '10px sans-serif'
     });

     //
     node.addClass('.active');
     link.addClass('.active');

     node.removeClass('.active');
     ```
     */
    export declare class StyleSystem {
        /**
         * 所有主题
         * @since 2.4.0
         */
        themes: {};

/**
         * 当前主题
         * @since 2.4.0
         */
        currentTheme: Theme;
        styleManager: StyleManager;
        constructor(stage: Stage);
        addTheme(theme: Theme): void;
        getTheme(name: string): Theme;
clear(): void;
/**
         * 定义一个样式
         *
         *  例如： defClass('.mystyle', {color:'red', ...})
         *
         * @param name .开头的名称 或者 类名称
         * @param styleOpt
         */
        defClass(name: string, styleOpt: PartStyleOptionType): void;
        /**
         * 移除一个样式, 通过addClass添加到某个节点或者连线的需要手工移除
         *
         * 通常用来移除 非.开头的定义，例如：removeClass('Node')
         * @param name
         */
        removeClass(name: string): void;
        getClass(name: string): any;

/**
         * 设置主题
         * @param themeName 名称
         */
        setTheme(themeName: 'DefaultLight' | 'DefaultDark' | string): void;
/**
         * 基于某个主题，定义新的主题
         * @param newThemeName 新主题的名称
         * @param themeBaseName
         */
        defTheme(newThemeName: string, themeBaseName: string): Theme;
    }

    declare type SuccessCallback = {
        canceled: boolean;
        cacheObj?: Object;
        next?: Function;
    } & Function;

    export declare const TextAlign: Readonly<{
        left: "left";
        center: "center";
        right: "right";
    }>;

    /** 文本对齐 */
    export declare type TextAlignType = 'start' | 'end' | 'left' | 'right' | 'center';

    export declare const TextBaseline: Readonly<{
        top: "top";
        middle: "middle";
        bottom: "bottom";
    }>;

    /** 文本基线 */
    export declare type TextBaselineType = 'top' | 'bottom' | 'middle' | 'alphabetic' | 'hanging';

    /**
     * 文本节点
     *
     ```js
     // 示例
     let textNode = new TextNode('This is a\nTextNode with \ntext warp.', 81, 283);

     // 节点的尺寸随文本内容自动调整
     textNode.autoSize = true;

     // 自动调整方向 （防止文字顶部朝下）
     textNode.autoDirection = true;

     textNode.setStyles({
     padding: 5,
     lineHeight: 12,
     border: 'solid 2px #E1E1E1',
     font: 'italic 12px arial',
     color: 'rgba(0, 154, 147,1)'
     });
     ```
     */
    export declare class TextNode extends Node_2 {
        className: any;


constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number, autoSize?: boolean);
        /**
         * 尺寸是否自动适应文本
         */
        get autoSize(): boolean;
        set autoSize(v: boolean);
        /**
         * 是否自动调整方向 （防止文字顶部朝下）
         **/
        get autoDirection(): boolean;
        set autoDirection(v: boolean);

/**
         * 节点尺寸自动缩放至适合文本
         */
        resizeToFitText(): this;
}

    export declare const TextPosition: Readonly<{
        lt: "lt";
        ct: "ct";
        rt: "rt";
        lm: "lm";
        rm: "rm";
        lb: "lb";
        cb: "cb";
        rb: "rb";
        center: "center";
    }>;

    /**
     * 主题
     * @since 2.4.0
     */
    export declare class Theme {
        /** 名称 */
        readonly name: string;
        /**@protected */

        constructor(name: string, config: ThemeContentType);
/**
         * 设置某类的样式
         *
         * 例如：theme.setStyle('Node', {fillStyle:'blue'});
         *
         * @param className 类名称
         * @param style
         */
        setStyle(className: ThemeStyleNameType, style: PartStyleOptionType): void;
        /**
         *  根据类名称获取样式
         *  例如：let styles = theme.getStyle('Node');
         */
        getStyle(className: ThemeStyleNameType): any;
    }

    /**
     * 主题配置类型定义
     * 该类型定义了不同图形元素（如区域、层、节点、链接等）的样式配置选项。
     * 每个图形元素都对应一个样式配置对象（StyleOpt）。
     * @since 2.4.0
     */
    export declare class ThemeContent {
        /** 图形默认的填充色（没有指定填充色时） */
        DefaultConfig?: {
            fillStyle: string;
            strokeStyle: string;
            font: "12px sans-serif";
            textAlign: "center";
            textBaseline: "middle";
        };
        /**
         * 鼠标框选矩形的样式配置
         */
        SelectArea?: PartStyleOptionType;
        /**
         * 选中节点的样式配置
         * 该样式配置对象的属性值为选中节点的样式。
         *
         * 如果 borderWidth > 0, 则绘制一个矩形框
         */
        NodeSelectedStyle?: NodeSelectedStyleOptionsType;
        /**
         * 选中节点的样式配置
         * 该样式配置对象的属性值为选中节点的样式。
         */
        LinkSelectedStyle?: LinkSelectedStyleOptionsType;
        /**
         * Link箭头的样式配置
         */
        ['Link.Arrow']?: PartStyleOptionType;
        /**
         * Link文本的样式配置
         */
        ['Link.Label']?: PartStyleOptionType;
        Node: PartStyleOptionType;
        ImageNode: PartStyleOptionType;
        CanvasNode: PartStyleOptionType;
        TextNode: PartStyleOptionType;
        EllipseNode: PartStyleOptionType;
        TipNode: PartStyleOptionType;
        ShapeNode: PartStyleOptionType;
        VideoNode: PartStyleOptionType;
        HtmlNode: PartStyleOptionType;
        RatioNode: PartStyleOptionType;
        Link: PartStyleOptionType;
        FoldLink: PartStyleOptionType;
        QuadBezierLink: PartStyleOptionType;
        AutoFoldLink: PartStyleOptionType;
        BezierLink: PartStyleOptionType;
        ArcLink?: PartStyleOptionType;
        ZShapeLink?: PartStyleOptionType;
        constructor(init?: ThemeContentType);
        toJSON(): {};
    }

    export declare type ThemeContentType = {
        DefaultConfig?: {
            fillStyle?: string;
            strokeStyle?: string;
            font?: string;
        };
        Layer?: PartStyleOptionType;
        SelectArea?: PartStyleOptionType;
        SelectedStyle?: NodeSelectedStyleOptionsType;
        "Link.Arrow"?: PartStyleOptionType;
        "Link.Label"?: PartStyleOptionType;
    } & {
        [key in CoreNENames]?: PartStyleOptionType;
    };

    /**
     * 主题样式名称类型
     */
    export declare type ThemeStyleNameType = Exclude<keyof ThemeContent, 'toJSON'> | (string & {});

    declare type ThemeType = {
        name: string;
        content: ThemeContentType;
    };

    /**
     * 提示、角标节点, 通常用于告警、提示。 节点的原点(0,0)默认是最下方居中位置
     */
    export declare class TipNode extends TextNode {
        /**
         * @readonly
         */
        className: any;
        arrowsSize: number;
        _shape: Shape;
        originPosition: RectPositionType;
constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
}

    /**@protected */
    export declare class TipShape extends RectShape {
        className: string;
        constructor();
        draw(ctx: CanvasRenderingContext2D, node: TipNode): void;
    }

    export declare type ToJsonOptionType = {
        /**
         * 是否将图片以base64的形式内联到json
         *
         * 默认值: false
         *
         * 1. GIF图片（目前不能内联）
         * 2. 性能敏感时，不要使用内联
         */
        imageToBase64?: boolean;
    };

    /**
     * 移动端触摸处理
     * @ignore
     */
    declare class TouchWheel {
        /**
         * 触发缩放阈值，单位为像素
         */
        zomThreshold: number;
        constructor();
        /**
         * 当前触摸点的数量
         */
        touchsCount: number;

_TouchZoomHandler?: (e: TouchEvent, scaleFactor: number, canvas: HTMLElement) => void;
        _TouchDragHandler?: (dx: number, dy: number) => void;





}

    /**
     * 变换矩阵
     * @protected
     */
    export declare class Transform {
        m: Float32Array;
        static allocate(): Transform;
        constructor();
        release(): void;
        copy(): Transform;
        identity(): void;
        skew(sx: number, sy: number): void;
        transform(scaleX: number, skewX: any, skewY: any, scaleY: any, x: any, y: any): void;
        point(point: PointLike): {
            x: number;
            y: number;
        };
        pointXY(x: number, y: number): {
            x: number;
            y: number;
        };
        vec(out: Vec2Type, v: Vec2Type): Vec2Type;
        points(out: PointLike[], points: PointLike[]): PointLike[];
        translate(x: any, y: any): this;
        translateTo(x: any, y: any): this;
        scale(sx: any, sy: any): this;
        hasRotation(): boolean;
        getRotation(): number;
        rotate(rad: number): this;
        static multiply(out: Transform, t1: Transform, t2: Transform): void;
        invert(): Transform;
        static invert(out: Transform, t: Transform): Transform;
        static fillFrom(target: Transform, m: Float32Array): void;
        /**
         * 绕指定坐标x，y，旋转
         * @param angle
         * @param x
         * @param y
         */
        rotateByXY(x: number, y: number, angle: number): void;
    }

    export declare interface Transformable {
        translate(x: number, y: number): this;
        scale(x: number, y: number): this;
        rotate(angle: number): this;
    }

    /**@protected */
    export declare class TriangleShape extends PolygonShape {
        className: string;
        constructor();
    }

    /**
     * 映射函数类型
     *
     * 用于将一种类型的数据转换为另一种类型的函数
     *
     * @template T 源数据类型
     * @template R 目标数据类型
     * @param value 当前值
     * @param index 当前值的索引
     * @returns 转换后的值
     *
     * @example
     * ```typescript
     * const double: MapFunction<number, number> = (value, index) => value * 2;
     * ```
     */
    declare type TypeMapFunction<T, R> = (value: T, index: number) => R;

    /**
     * 谓词函数类型
     *
     * 用于判断条件是否满足的函数类型，通常用于过滤操作
     *
     * @template T 数据类型
     * @param value 当前值
     * @param index 当前值的索引
     * @returns 是否满足条件
     *
     * @example
     * ```typescript
     * const isEven: Predicate<number> = (value, index) => value % 2 === 0;
     * ```
     */
    declare type TypePredicate<T> = (value: T, index: number) => boolean;

    export declare let util: any;

    export declare const _V: number[];

    /**
     * 二维向量计算
     */
    declare class vec2 {
        static multiplyC: typeof multiplyC;
        static scale: typeof scale;
        static len: typeof len;
        static negate: typeof negate;
        static add: typeof add;
        static normalize: typeof normalize;
        static dot: typeof dot;
        static projection: typeof projection;
        static cross: typeof cross;
    }

    declare type Vec2Type = [number, number] | [number?, number?];

    export declare const VERSION = "#version#";

    /**
     * 顶点（图系统范畴内）
     */
    declare class Vertext {
        id: number;
        inputs: Array<Edge>;
        outputs: Array<Edge>;
        object: any;
        constructor();
        /**
         * 度（Degree）：一个顶点的度是指与该顶点相关联的边的条数，顶点v的度记作d(v)。
         *
         * 对于有向图来说，一个顶点的度可细分为入度和出度。
         *
         * @returns
         */
        getDegree(): number;
        /**
         * 入度（In-degree）: 一个顶点的入度是指与其关联的各边之中，以其为终点的边数
         * @returns
         */
        getInDegree(): number;
        /**
         * 出度（Out-degree）：出度则是相对的概念，指以该顶点为起点的边数。
         * @returns
         */
        getOutDegree(): number;
        /**
         * 获取邻接节点列表
         */
        getAdjacentList(): Vertext[];
    }

    export declare interface VideoNode {
        addEventListener(type: VideoNodeEvents, callback: (e: any) => void): () => {};
        on(type: VideoNodeEvents, callback: (e: any) => void): () => {};
        removeEventListener(type: VideoNodeEvents, callback: (e: any) => void): void;
        hasListener(type: VideoNodeEvents): boolean;
    }

    /**
     * 视频节点
     *
     ```js
     import { VideoNode } from '@jtopo/core';
     let videoNode = new VideoNode(null, 0, 220, 100, 60);

     // 图片：未播放时显示
     videoNode.setImage('./assets/img/camer.png');

     // 自动播放（视频加载后）
     videoNode.autoplay = true;

     // 视频源：支持类型参考各浏览器，MP4、mov等
     videoNode.setVideo('./assets/video/video_demo.mov');

     layer.addChild(videoNode);
     ```
     */
    export declare class VideoNode extends ImageNode {
        className: string;


/**
         * 是否自动播放
         */
        autoplay: boolean;
        /**
         * 是否正在播放
         */
        isPlaying: boolean;
constructor(text?: string | null, x?: number, y?: number, w?: number, h?: number);
        /**
         * 显示封面图片
         * @deprecated 已过时，未来将移除
         */
        showCover(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 设置视频
         * @param {string} video 视频文件路径
         */
        setVideo(video: string | HTMLVideoElement): void;

destroy(): void;
    }

    declare type VideoNodeEvents = NEEventType | 'play' | 'pause' | 'ended';

    /**
     * 虚拟节点
     *
     * 布局计算时不实际操作节点对象，而是节点对象生成的虚拟节点
     */
    declare class VirtualNode {
        x: number;
        y: number;
        width: number;
        height: number;
        rect: Rectangle;
        parent?: VirtualNode;
        children: any[];
        level: number;
        object: any;
        constructor(x?: number, y?: number, w?: number, h?: number);
        fromObject(object: any): void;
        setObject(object: any): void;
        getRect(recursive?: boolean): Rectangle;
        getChildrenRect(recursive: any): any;
        translateWith(dx: number, dy: number): void;
        translate(x: number, y: number): void;
        addChild(child: VirtualNode): void;
        translateWithRecursive(dx: number, dy: number): void;
        flatten(cond?: Function): VirtualNode[];
        toString(): string;
        /**
         *  返回所有对象的矩形复合而成的更大矩形
         */
        static getVNodeUnionRect(arr: Array<any>): any;
        static flatten(arr: Array<any>, cond?: Function): any[];
    }

    /**
     * 虚拟树
     */
    declare class VirtualTree {
        root: VirtualNode;
        descendants: Array<VirtualNode>;
        allVirtualNodes: Array<VirtualNode>;
        allObjects: Array<any>;
        indexData: Array<Array<VirtualNode>>;
        deep: number;
        constructor(root: VirtualNode);
        index(): void;
        getRect(): Rectangle;
        centerTo(x: any, y: any): this;
        translateTo(x: any, y: any): this;
        translateWith(dx: any, dy: any): this;
        getLeafs(): VirtualNode[];
    }

    declare abstract class VisualEntity extends EventTarget_2 implements HasVisbility, Transformable {


_matrixDirty: boolean;
        /**
         * 渲染前回调
         ```js
         obj.beforeRender = function(){
         if(this.x < 0){
         this.x = 0;
         }
         //...
         }
         ```
         */
        beforeRender?: Function;
        /**
         * 渲染后回调
         */
        afterRender?: Function;

/**
         * 是否已经被销毁
         * @readonly
         */
        destroyed: boolean;
        readonly _obb: OBB;
        constructor();
        abstract translate(x: number, y: number): this;
        abstract scale(x: number, y: number): this;
        abstract rotate(angle: number): this;
        abstract draw(ctx: CanvasRenderingContext2D): any;

/**
         * 获取世界坐标系变换
         * @returns
         */
        getWorldTransform(): Transform;
        /**
         * 标记矩阵脏, 需要重新计算触发重绘
         */
        markMatrixDirty(): void;
        get visible(): boolean;
        set visible(v: boolean);
        /**
         * 显示
         */
        show(): this;
        /**
         * 隐藏
         */
        hide(): this;
        /** 判断是否可见 */
        isVisible(): boolean;
/**
         * 销毁
         */
        destroy(): void;
    }

    declare interface VisualEntityState {
        needPaint: boolean;
        isOutOfViewport: boolean;
        attrDirty: boolean;
        renderIndex: number;
    }

    /**
     * Z形折线
     *
     * 多数情况下被AutoFoldLink所替代, 但Z形折线有更好的性能
     *
     ```js
     // 例如:
     import {ZShapeLink} from "@jtopo/core";

     // 构造方法和Link一样
     let link = new ZShapeLink('text', 开始对象, 结束对象, 开始锚点名称, 结束锚点名称);
     ```
     */
    export declare class ZShapeLink extends Link {
        /**
         * @readonly
         */
        className: string;

constructor(text?: string | null, begin?: Node_2 | Link | PointLike, end?: Node_2 | Link | PointLike, beginEndpointName?: ConnectToNodeAnchorType, endEndpointName?: ConnectToNodeAnchorType);
        /**
         * 获取连线段数量
         */
        getSegmentCount(): number;


/**
         * 方向
         *
         * horizontal: 先水平 -> 垂直 -> 水平
         * vertical: 先垂直 -> 水平 -> 垂直
         */
        get direction(): 'horizontal' | 'vertical';
        /**
         * 方向
         *
         * horizontal: 先水平 -> 垂直 -> 水平
         * vertical: 先垂直 -> 水平 -> 垂直
         */
        set direction(value: 'horizontal' | 'vertical');
    }

    export { }
