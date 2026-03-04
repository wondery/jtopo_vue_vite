import {
    Stage, Layer, EllipseNode, TextNode, VideoNode,
    CanvasNode, SpriteNode, ImageNode, ShapeNode, PolygonShape,
     HtmlNode, ImageUtil, GeomUtils
} from '@jtopo/core';

// 扩展包: 工具栏、动效节点
import {
    Toolbar, BlinkingArrowNode, WaterLikeNode, RatioNode, RipplingNode, GifNode
} from '@jtopo/extensions';

// 可以动手修改、删减下面的代码，只保留自己感兴趣的部分
const stage = new Stage(document.getElementById('divId'));
const animationSystem = stage.animationSystem;
const layer = new Layer(stage);

// 工具栏(可选)
const toolbar = new Toolbar(stage);
toolbar.show();

// 显示x、y坐标轴辅助(可选)
stage.showAxis();

// 使用暗色网格背景(可选)
layer.useDarkGridBackground();

// 设置为默认暗色主题(可选)
stage.styleSystem.setTheme('DefaultDark');

// 文本节点
{
    let textNode = new TextNode('This\nis a TextNode\nwith warp contents.', -200, -200);
    textNode.setStyles({
        font: 'italic 12px sans-serif',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'rgb(0, 154, 147)',
    });
    layer.addChild(textNode);
}

// 椭圆节点
{
    let ellipse = new EllipseNode('ellipse');
    ellipse.setXY(-200, 0);
    ellipse.resize(42, 42);
    ellipse.setStyles({
        fontSize: '10px',
        textPosition: 'center',
        textBaseline: 'middle'
    });
    // 附加数据
    ellipse.data = { id: 123, type: "核心", speed: 1000, xxx: 'xxxx' };
    layer.addChild(ellipse);
}

// 图片节点
{
    let imgNode = new ImageNode('Image', 0, 0, 64, 64);
    // png、jpg、jpeg 、svg、gif 路径 或者 new Image()创建的对象均可
    imgNode.setImage('/statics/logo.svg');
    layer.addChild(imgNode);
}

// Shape节点
{
    let shapeNode = new ShapeNode('y= cos(4 * x)', 0, -200, 100, 50);
    shapeNode.setStyles({
        strokeStyle: 'rgb(0, 154, 147)',
        lineWidth: 2,
    });

    function cos4xLine() {
        let points = [];
        for (let x = 0; x <= Math.PI; x += 0.1) {
            let y = Math.cos(4 * x);
            points.push({ x: x, y: y });
        }
        // console.log(points.length);
        return GeomUtils.normalizePoints(points);
    }

    let points = cos4xLine();
    let shape = new PolygonShape(points);
    shape.isClosed = false;
    shapeNode.setShape(shape);
    layer.addChild(shapeNode);
}

// Canvas节点
{
    let canvasNode = new CanvasNode('Canvas', 200, -200, 32, 32);
    canvasNode.setStyles({
        color: 'white',
    });
    layer.addChild(canvasNode);

    let canvas = document.createElement('canvas');
    canvas.width = canvasNode.width;
    canvas.height = canvasNode.height;
    canvasNode.setCanvas(canvas);
    // 绘制任意内容
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    // 节点尺寸变化时（重绘）
    canvasNode.onSizeChanged = function (newWidth, newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(newWidth / 2, newHeight / 2, newWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    setTimeout(() => {
        canvasNode.resize(64, 64);
    }, 1000);
}

// 图片节点2: 风扇旋转 (可以动态拼装字符串为svg图片)
{
    let fanSvgImg = ImageUtil.svgToImage(`<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="6" fill="rgba(128,128,128,0.8)"/>
        <path d="M32 32 L32 8 A24 24 0 0 1 56 32 Z" fill="gray" transform="rotate(0, 32, 32)"/>
        <path d="M32 32 L32 8 A24 24 0 0 1 56 32 Z" fill="gray" transform="rotate(120, 32, 32)"/>
        <path d="M32 32 L32 8 A24 24 0 0 1 56 32 Z" fill="gray" transform="rotate(240, 32, 32)"/>
    </svg>`);

    let node = new ImageNode(null, 0, 100);
    node.setImage(fanSvgImg);
    layer.addChild(node);

    // 旋转动画
    animationSystem.anime({
        from: 0,
        to: 2 * Math.PI,
        update: (n) => {
            node.rotate(n);
        },
        times: Infinity,
        duration: 2000,
    }).play();

    fanSvgImg.onload = function () {
        // 调整为图片的实际尺寸
        node.resize(fanSvgImg.width, fanSvgImg.height);
    };
}

// 动效节点: '涟漪‘
{
    let rippNode = new RipplingNode(null, 200, 0, 50, 50);
    // 动效参数设置
    rippNode.ae({
        circleNumber: 3,
    });
    rippNode.setStyles({
        lineWidth: 6,   // 圆环的最大宽度
        strokeStyle: 'cyan', // 圆环颜色
    });
    layer.addChild(rippNode);
}

// 动效节点: '水'
{
    let waterNode = new WaterLikeNode(null, -200, 100, 50, 50);
    waterNode.setStyles({
        // borderRadius: waterNode.width * 0.5, // 圆角=尺寸的一半，就构成了圆形
        fillStyle: 'cyan',
        lineWidth: 0,
        textPosition: 'center',
        color: 'gray',
    });
    layer.addChild(waterNode);

    animationSystem.anime({
        from: 0,
        to: 1,
        update: (n) => {
            waterNode.text = (n*100).toFixed(2);
            waterNode.ae({
                capacity: n,            // 水位越来越高
                waveHeight: 10 - n * 10 // 波动越来越小
            });
        },
        times: Infinity,
        duration: 10000,
    }).play();
}

// 动效节点: '水2'
{
    let waterNode = new WaterLikeNode('0%', -100, 100, 40, 60);
    waterNode.setStyles({
        // 设置左下和右下的圆角
        borderRadius: [0, 0, 20, 20],
        strokeStyle: 'gray',
        textPosition: 'center',
        textAlign: 'center',
        color: '#cfcfcf',
    });
    layer.addChild(waterNode);

    // '模拟水位变化'
    animationSystem.anime({
        from: 0,
        to: 0.5,
        update: (n) => {
            waterNode.ae({
                capacity: n
            });
            // 更新文本
            waterNode.text = Math.round(n * 100) + '%';
        },
        times: 2,
        duration: 6000,
    }).play();
}

// 比率节点
{
    let ratioNode = new RatioNode('', -200, 220, 100, 33);

    // Ratio图形相关属性
    ratioNode.setAttributes({
        'ratio': 0,
        'direction': 'right'
    });

    // 样式
    ratioNode.setStyles({
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 5,
        fillStyle: 'orange',
    });
    layer.addChild(ratioNode);

    // 动画： n在5秒内，从0逐渐变为1
    animationSystem.anime({
        from: 0,
        to: 1,
        duration: 5000,
        update: function (n) {
            ratioNode.setStyles({ 'fillStyle': n > 0.8 ? 'orange' : 'green' });
            ratioNode.setAttribute('ratio', n);
            ratioNode.text = Math.round(n * 100) + '%';
        }
    }).play()
}

// 动效节点: '闪烁指示'1 
{
    let blinkNode = new BlinkingArrowNode(null, 100, 100, 50, 10);
    blinkNode.ae({
        arrowNumbers: 7
    });
    blinkNode.setStyles({
        lineWidth: 3,
        strokeStyle: 'white',
    });
    layer.addChild(blinkNode);
}

// 动效节点: '闪烁指示'2 
{
    let blinkNode = new BlinkingArrowNode(null, 200, 120, 60, 30);
    blinkNode.ae({
        arrowNumbers: 5
    });
    blinkNode.setStyles({
        lineWidth: 5,
        strokeStyle: 'cyan',
    });
    blinkNode.rotate(Math.PI / 2);
    layer.addChild(blinkNode);
}

// 视频节点
{
    var videoNode = new VideoNode('video', 0, 220, 100, 60);
    // 视频加载后自动播放
    videoNode.autoplay = true;
    // 图片：未播放时显示
    videoNode.setImage('./assets/img/camer.png');
    // 视频源：支持类型参考各浏览器，MP4、mov等
    videoNode.setVideo('./assets/video/warehouse.mp4');

    // 点击播放/暂停
    videoNode.addEventListener('pointerup', function () {
        if (videoNode.isPlaying) {
            videoNode.pause();
        } else {
            videoNode.play();
        }
    });

    // 播放结束
    videoNode.addEventListener('ended', function () {
        // 再次播放，循环
        videoNode.play();
    });
    layer.addChild(videoNode);
}

// 节点可以组合
{
    // 角标节点
    let tipNode = new EllipseNode('3');
    tipNode.setStyles({
        lineWidth: 1,
        strokeStyle: '#E1E1E1',
        fillStyle: 'red', // 填充颜色：红色
        textPosition: 'center', // 文本位置：居中
        textBaseline: 'middle', // 文本定位基线，参考:html5-canvas API
        color: 'white' // 文本颜色
    });
    tipNode.resize(16, 16);

    // 平移中心到imgNode的右上角
    // 子节点的坐标是相对于父节点的, 比如子节点的坐标为0,0的话，显示出来就位于父节点的中心
    tipNode.x = videoNode.width / 2;
    tipNode.y = -videoNode.height / 2;
    tipNode.draggable = false;

    // 把上面创建的红色圆角标作为imgNode的子节点
    videoNode.addChild(tipNode);
}

// gif节点
{
    let gifNode = new GifNode('gif', -100, -100, 100, 100);
    //路径必须以 .gif 结尾
    gifNode.setImage('/statics/effect02.gif');
    layer.addChild(gifNode);
}

// Sprite节点
{
    let spriteNode = new SpriteNode('sprite', 100, -100);
    spriteNode.setSprite('./assets/img/fires_sprite.png', {
        totalRows: 4,
        totalColumns: 8,
        frameIndex: 0,
        frameCount: 32,
        duration: 5000,
    }).then(() => {
        // 取消节点的自动尺寸
        spriteNode.autoSize = false;
        // 指定尺寸
        spriteNode.resize(100, 100);
    });
    layer.addChild(spriteNode);
}

// html节点
{
    const htmlNode = new HtmlNode('Html-Table', 200, 220, 130, 100);
    htmlNode.setStyles({ color: 'white' });
    htmlNode.setHtml(`
        <style type="text/css">
            table {
                color: #cfcfcf;
                font-size: 12px;
                width: 100%;
                border-collapse: collapse;
                font-family: Arial, sans-serif;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 4px;
                text-align: left;
            }
            th {
                background-color:#2775B6;
            }
            tr:nth-child(even) {
                background-color:rgb(61, 61, 61);
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>A1</th>
                    <th>B2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>A</td>
                    <td>20</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>21</td>
                    <td>31</td>
                </tr>
                <tr>
                    <td>C</td>
                    <td>22</td>
                    <td>32</td>
                </tr>
            </tbody>
        </table>
    `);
    layer.addChild(htmlNode);
}

// 最后一步：显示出来
stage.show();