
<template>
    <!-- jtopo用于渲染的div -->
    <div id="divId" style="height:600px;width:100%px;border:1px solid gray"></div>
</template>

<script>
    import {Stage, Layer, Node, Link} from 'jtopo';

    function initCreate(){
        var stage = new Stage('divId');
        var layer = new Layer('default');
        stage.addChild(layer);
        
        stage.show();

        // 方便控制台调测
        window.stage = stage;
        window.layer = layer;

        return {
            stage, layer
        };
    }

    function drawData(layer){
        var fromNode = new Node('From', 200, 200, 40, 40);
        var toNode   = new Node('To',   400, 200, 40, 40);

        // 设置节点填充颜色
        fromNode.css({
            backgroundColor: 'orange',
            border: 'solid 1px gray',
            font: 'bold 12px arial',
        });

        toNode.css({
            background: 'blue',
        });
        var link = new Link('Link',fromNode,toNode);
        layer.addChild(link);

        fromNode.on('mousedown', (event)=>{
            fromNode.text = 'mousedown';
        });

        layer.addChild(fromNode);
        layer.addChild(toNode);
    }

    // 可以绑定要绘制的数据，但别绑定jtopo对象
    export default {
        mounted(){
            let {layer} = initCreate();
            drawData(layer); 
        }
    }

</script>

