import { Stage, Layer, Node } from '@jtopo/core';
// jtopo拥有强大的组合能力，每个Node 都可以作为容器使用
// 该示例演示在 两个‘分组’之间拖拽

const stage = new Stage('divId');
const layer = new Layer(stage);
const inputSystem = stage.inputSystem;
const styleSystem = stage.styleSystem;


layer.useDarkGridBackground();
stage.styleSystem.setTheme('DefaultDark');

// '分组' 
styleSystem.defClass('.group', {
    borderColor: '#F0F0F0',
    borderRadius: 5,
    borderWidth: 1,
    padding: 8,
    backgroundColor: 'rgba(128,128,128,0.2)',
    lineWidth: 1,
    strokeStyle: 'gray',
    fontSize: '12px',
});

// '焦点'
styleSystem.defClass('.focus', {
    borderWidth: 3,
    borderColor: 'yellow'
});

// 原点（0，0），就是父节点的中心 (0,0)
const group1 = new Node('Group1', -200, 0, 200, 300);
group1.dropAllowed = true;
group1.addClass('.group');
group1.draggable = false;
layer.addChild(group1);

const group2 = new Node('Group2', 100, 0, 300, 300);
group2.dropAllowed = true;
group2.addClass('.group');
group2.draggable = false;
layer.addChild(group2);

const blueNode = new Node('blue', 0, 60, 50, 30);
blueNode.setStyles({
    fillStyle: '#3586E3',
});
group1.addChild(blueNode);

const redNode = new Node('red', 0, 20, 100, 60);
redNode.setStyles({
    backgroundColor: '#D73417',
});
group2.addChild(redNode);

// --- 两个分组来回拖拽
group2.addEventListener('dropover', () => {
    group2.addClass('.focus');
});
group2.addEventListener('drop', () => {
    let target = inputSystem.target;
    target.changeParent(group2);
    group2.removeClass('.focus');
});
group2.addEventListener('dropout', () => {
    group2.removeClass('.focus');
});

group1.addEventListener('dropover', () => {
    group1.addClass('.focus');
});
group1.addEventListener('drop', () => {
    let target = inputSystem.target;
    target.changeParent(group1);
    group1.removeClass('.focus');
});
group1.addEventListener('dropout', () => {
    group1.removeClass('.focus');
});

stage.show();