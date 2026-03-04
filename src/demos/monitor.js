import { Stage, Layer, VideoNode, ShapeBuilder } from '@jtopo/core';

const stage = new Stage('divId');
const layer = new Layer(stage);


function newVideo(name, image, video) {
    const videoNode = new VideoNode(name, 20, 20, 300, 200);
    videoNode.setImage('./assets/img/' + image);
    videoNode.setVideo('./assets/video/' + video);
    layer.addChild(videoNode);

    // 双击播放
    videoNode.addEventListener('dblclick', function () {
        videoNode.play();
    });

    // 结束时重新播放
    videoNode.addEventListener('ended', function () {
        videoNode.play();
    });
}

const names = ['公路', '超市A', '公路', '公路'];
const images = ['camer.png', 'camer.png', 'camer.png', 'camer.png'];
const videos = ['warehouse.mp4', 'warehouse.mp4', 'warehouse.mp4', 'warehouse.mp4'];

for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const image = images[i];
    const video = videos[i];
    newVideo(name, image, video);
}

// 根据形状生成’布局‘对象
const layout = stage.layoutSystem.pointsLayout(layer.children, ShapeBuilder.grid(2, 2));

// 调整尺寸(所有节点中心构成的矩形尺寸）
layout.resize(320, 220);
layout.doLayout({
    effect: 'easeInQuart',
});

// 循环渲染(视频需要不停绘制)
function loopRender() {
    layer.update();
    requestAnimationFrame(loopRender);
}
loopRender();

stage.show();