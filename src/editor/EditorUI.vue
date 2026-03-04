<template>
    <!-- jtopo用于渲染的div -->
    <div id="divId" style="height:calc(100vh - 1px); width: 100%px; border: 1px solid gray"></div>
</template>

<script>
import { editorManager } from "./EditorManager";

// 可以绑定要绘制的数据，但别绑定jtopo对象
export default {
    mounted() {
        // 初始化
        editorManager.init(document.getElementById("divId"));
    }
};
</script>
<style>
    body {
        margin: 0;
        padding: 0;
    }
    #divId {
        margin: 0;
        padding: 0;
    }
</style>
