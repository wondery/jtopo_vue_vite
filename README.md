
# jtopo 上手项目模版
    jtopo: 2.6.30 试用版(过期后，画面将只能查看，无法点击操作)
    UI框架：VUE
    打包工具: Vite

# 项目初始化安装
    npm install

    或者（适用于卸载后重新安装）:
    npm install ./jtopo_npm/core
    npm install ./jtopo_npm/extensions
    npm install ./jtopo_npm/editor

# 卸载jtopo
    npm uninstall @jtopo/editor
    npm uninstall @jtopo/extensions
    npm uninstall @jtopo/core 

# 运行
    npm run dev

# 打包
    npm run build

# 访问
    默认demo
    http://localhost:3000

    编辑器demo
    http://localhost:3000/editor.html

# 目录结构说明
    src         源码
    jtopo_npm   jtopo的本地npm目录
    dist        打包目录
    src/demos   示例代码片段，供参考

# 更多信息
    Vite: https://cn.vitejs.dev/guide/
    jtopo: www.jtopo.com
    试用版仅用于 **本地开发、测试、技术可行性验证**，商用需要购买授权。

    虽然项目里用到vue和vite，但jtopo和vue、vite并没有依赖关系，可以换做别的框架和打包工具。

# 其他
    成功运行后，有了初步了解就可以重新创建自己的新项目了。
    jtopo提供了很好的类型提示，写代码时会有API智能提示。
    如果使用Typescript语言，会有很好的API智能提示体验。