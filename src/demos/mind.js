import {
    Stage, Layer, Link, EllipseNode, TextNode, randomColor,
    QuadBezierLink
} from '@jtopo/core';
import { Toolbar } from '@jtopo/extensions';

const stage = new Stage('divId');
const layer = new Layer(stage);

// 工具栏
const toolbar = new Toolbar(stage);
toolbar.show();
stage.showOverview();

const layoutSystem = stage.layoutSystem;

stage.styleSystem.defClass('.node', {
    border: '1px solid',
    borderRadius: 10,
    color: 'white',
    fontSize: 24,
    padding: 10
});
stage.styleSystem.defClass('.link', {
    lineWidth: 5,
    strokeStyle: 'gray',
});


const nodes = [];

function addNode(text, color) {
    const node = new TextNode(text);
    node.title = text;
    node.addClass('.node');
    node.setStyles({
        backgroundColor: color,
    });

    node.resize(100, 50);

    layer.addChild(node);
    nodes.push(node);
    return node;
}
function addLink(nodeA, nodeZ) {
    const link = new QuadBezierLink('', nodeA, nodeZ, 'rm', 'lm');
    link.addClass('.link');
    layer.addChild(link);
    return link;
}

// 监听整个文档的粘贴事件
document.addEventListener('paste', function (event) {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    // 打印粘贴的文本内容
    console.log('粘贴的文本内容是：', pastedText);
    layer.removeAllChildren();

    parseAndDraw(pastedText);
});

// 示例使用
let markdown = `
# AI生成脑图流程
## 1.生成文本
### 和AI模型对话

#### 示例：生成 初一下学期语法脑图，以markdown格式输出
#### 语法参考: 生成 xxxx 脑图，以markdown格式输出

##### 复制生成的结果
    - 点击AI对话框里的复制按钮

## 2. 转成图形
    - 打开本网页
    - ctrl + v 粘贴
    - 导出为图片 本页面顶部工具栏右数第三个按钮
`;

function parseAndDraw(markdownText) {
    let json = markdownToJson(markdownText);
    console.log(json);

    function gen(curr, parent, color, deep) {
        const node = addNode(curr.name, color);
        let fontSize = 24 - deep * 2;
        let padding = 15 - deep;

        if (fontSize < 12) {
            fontSize = 12;
            padding = 6;
        }

        node.setStyles({
            fontSize: fontSize,
            padding: padding,
        });

        if (parent != null) {
            addLink(parent, node);
        }

        if (curr.children == null) {
            return;
        }
        color = randomColor();
        curr.children.forEach(child => {
            gen(child, node, color, deep + 1);
        });
    }

    if(json.children.length == 1) {
        gen(json.children[0], null, randomColor(), 1);
    } else {
        gen(json, null, randomColor(), 1);
    }
    doLayout();
}
parseAndDraw(markdown);

function doLayout() {
    const graphArr = stage.graphSystem.objectsToGraphs(layer.children.filter(c => c.visible));

    // 得到第一个树形有向图对象
    const graph = graphArr.filter(g => g.isTree())[0];

    // 生成星形布局对象
    let layout = layoutSystem.treeLayout(graph);
    layout.rotate(-Math.PI / 2);
    layout.doLayout();

    // 动画
    stage.animationSystem.anime({
        // 角度, 缩放, 平移
        from: [0, 0.1, 600, -600],
        to: [-Math.PI / 2, 1, 0, 0],

        update: (arr) => {
            layout.scale(arr[1], arr[1])

            // 执行布局
            layout.doLayout();
        },
        duration: 1000,
        effect: 'easeOutCubic'
    }).play();

}

doLayout();


function markdownToJson(markdown) {
    let result = {
        name: '主题',
        children: []
    };

    let lines = markdown.split('\n').filter(line => line.trim());
    let stack = [result];
    let currentHeadingLevel = 0;  // 跟踪当前标题级别

    lines.forEach(line => {
        let level = 0;
        let originalText = line.trim();
        let content = '';
        
        // 计算标题级别 (#)
        if (line.match(/^#+/)) {
            level = line.match(/^#+/)[0].length;
            content = line.replace(/^#+\s*/, '');
            currentHeadingLevel = level;  // 更新当前标题级别
        } 
        // 计算列表项级别
        else {
            const indentCount = (line.match(/^[\s\t]*/)[0]
                .replace(/\t/g, '    '))
                .length;
            
            const isListItem = line.trim().startsWith('-');
            
            if (isListItem) {
                // 列表项级别 = 当前标题级别 + 缩进级别
                const indentLevel = Math.floor(indentCount / 2);
                level = currentHeadingLevel + indentLevel;
                content = line.replace(/^[\s\t]*-\s*/, '');
            } else {
                // 非列表项使用相同逻辑
                const indentLevel = Math.floor(indentCount / 2);
                level = currentHeadingLevel + indentLevel;
                content = line.trim();
            }
        }

        // 确保级别至少为1
        level = Math.max(1, level);
        
        // 处理加粗文本
        content = content.replace(/\*\*(.*?)\*\*/g, '$1');

        const node = {
            name: autoWarp(content.trim(), 8),
            children: [],
            originalText: originalText
        };

        // 调整堆栈以匹配当前级别
        while (stack.length > level) {
            stack.pop();
        }

        // 确保始终有父节点
        if (stack.length === 0) {
            stack.push(result);
        }

        stack[stack.length - 1].children.push(node);
        stack.push(node);
    });

    return result;
}

function autoWarp(str, charCount) {
    if (str.length <= charCount) {
        return str;
    }
    // 用于存储最终结果的数组
    let result = [];
    // 遍历字符串，每隔 charCount 个字符插入换行符
    for (let i = 0; i < str.length; i += charCount) {

        // 截取从 i 开始，长度为 charCount 的子字符串
        result.push(str.slice(i, i + charCount));
    }
    // 使用换行符将数组中的子字符串连接起来
    return result.join('\n');
}

stage.show();
