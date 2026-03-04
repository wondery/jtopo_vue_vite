import { Stage, Layer, TextNode } from '@jtopo/core';

const div = document.getElementById('divId');
const stage = new Stage(div);
const layer = new Layer(stage);

let node = new TextNode('点击切换背景');
node.setStyles({
    color: 'gray',
    fontSize: 24
});
layer.addChild(node);


// 设置方式：
let types = [
    {
        // 1. 图片重复
        background: 'url(./assets/img/pattern.jpg) repeat',
    },
    {
        // 2. 图片拉伸: 自动到画布大小
        background: 'url(./assets/img/blue_bg.png)',
        backgroundSize: '100% 100%'
    },
    {
        // 3. 颜色
        background: 'rgba(232,232,232,0.4)',
    },
    {
        // 4. 白色网格(不重复)
        background: 'url(./assets/img/pattern.jpg)',
        backgroundRepeat: "no-repeat",
        backgroundSize: '50% 50%',
        backgroundPosition: 'center'
    },
    {
        // 5. 清除背景 (完全透明)
        background: null
    }
];

// 点击切换
let n = 0;
stage.inputSystem.addEventListener('click', () => {
    // 网格背景颜色优先级高于背景颜色，所以需要先隐藏网格背景
    stage.hideGrid();

    n = n > types.length - 1 ? 0 : n;
    stage.setBackground(types[n++]);
});

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
    /**
     * 大网格颜色
     */
    majorColor: '#000000',
    /**
     * 小网格颜色
     */
    minorColor: 'rgb(15,15,15)',
});

stage.show();