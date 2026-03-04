<template>
    <!-- jtopo用于渲染的div -->
    <div id="divId" style="height:calc(100vh - 50px); width: 100%px; border: 1px solid gray"></div>
</template>

<script>
import { topoManager } from "./TopoManager";

// 可以绑定要绘制的数据，但别绑定jtopo对象
export default {
    mounted() {
        // 初始化
        topoManager.init(document.getElementById("divId"));
    },
};
</script>
