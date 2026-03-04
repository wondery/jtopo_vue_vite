import { EventTarget as X, Assets as W, Link as m, Node as C, EllipseNode as H, Cursor as x, Point as _, NDCAnchor as K, AnchorProxy as O, NEHelper as k, AnchorUsageType as A, FunctionName as v, RectPosition as y, JTopoEvent as q, NE as Q, Rectangle as Y, Layer as j, ResourceSystem as R, StageMode as Z, NodeHelper as J, RegSystem as F, Shape as $ } from "@jtopo/core";
import { PopupMenu as tt, InputTextfield as et, Tooltip as it } from "@jtopo/extensions";
class kt extends X {
  constructor(t, e) {
    super(), this.itemSize = 40, this.stage = t, this.editor = e, this.panelDom;
    let i = document.createElement("div");
    return i.style.display = "none", i.classList.add("jtopo_iconsPanel"), this.stage.uiContainer.appendChild(i), this.panelDom = i, this;
  }
  setConfig(t) {
    let e = this, i = this.panelDom;
    return t.items.forEach(function(n) {
      let s = document.createElement("div");
      if (s.classList.add("item"), s.setAttribute("draggable", !0), s.ondragstart = function(r) {
        e.dargItem = n;
      }, i.appendChild(s), n.shape != null) {
        let r = document.createElement("canvas");
        r.width = e.itemSize, r.height = e.itemSize;
        let a = W.getShape(n.shape);
        if (a == null)
          throw Error("shape not exist: " + n.shape);
        W.drawToCanvas(a, r, { size: 0.8 * e.itemSize, strokeStyle: "black", fillStyle: "white", padding: 2 }), s.appendChild(r);
      } else
        s.innerHTML = n.iconHtml;
      s.addEventListener("touchstart", function(r) {
        r.preventDefault(), e.dargItem = n, e.touchStartHandle(s, r);
      });
    }), this;
  }
  touchStartHandle(t, e) {
    let i = t.cloneNode(!0);
    t.parentNode.appendChild(i);
    let n = e.touches[0], s = n.clientX, r = n.clientY;
    const a = t.offsetLeft, o = t.offsetTop;
    i.style.position = "absolute", i.style.zIndex = "1000";
    const d = function(c) {
      let p = c.touches[0], b = p.clientX - s, f = p.clientY - r;
      i.style.left = a + b + "px", i.style.top = o + f + "px";
    }, l = this, h = function(c) {
      t.removeEventListener("touchmove", d), t.removeEventListener("touchend", h), i.parentNode.removeChild(i), l.editor.mockDrop(c);
    };
    d(e), t.addEventListener("touchmove", d), t.addEventListener("touchend", h);
  }
  getDragItem() {
    return this.dargItem;
  }
  hide() {
    return this.panelDom.style.display = "none", this;
  }
  show() {
    return this.panelDom.style.display = "block", this;
  }
}
class Et {
  constructor(t, e) {
    this.editor = t, this.dat = e, this.gui = new e.GUI(), this.object, this.folders = {};
  }
  setCurrentObject(t) {
    const e = this.editor, i = this.editor.stage;
    i.inputSystem.target = t, i.selectedGroup.removeAll().add(t), t instanceof m ? e.linkCtrlBox.attachTo(t) : t instanceof C && e.nodeResizeBox.attachTo(t), e.update(), this.showProperty(t);
  }
  showProperty(t) {
    if (t == null)
      return;
    this.basic = { id: t.id || "", className: t.className || "", name: t.name || "", type: t.type || "", x: 1, y: 1, imageSrc: "", width: 1, height: 1, text: "", rotation: 0, scaleX: 1, scaleY: 1, skewX: 0, skewY: 0, originPosition: "center", draggable: t.draggable };
    const e = this.editor.stage.styleSystem.currentTheme.getStyle(t.className) || {};
    this.style = { lineDash: null, backgroundColor: e.backgroundColor || "", strokeStyle: e.strokeStyle || "black", fillStyle: e.fillStyle || "black", color: e.color || "black", borderWidth: e.borderWidth || 0, fontSize: e.fontSize || 12, fontFamily: e.fontFamily || "楷体", lineWidth: e.lineWidth || 0, lineCap: "butt", globalAlpha: 1, fontWeight: e.fontWeight || "normal", textPosition: e.textPosition || "cb", textBaseline: e.textBaseline || "top", textAlign: e.textAlign || "center" };
    const i = this.basic, n = this.style;
    Object.keys(i).forEach(function(r) {
      if (t[r] != null) {
        let a = t[r];
        i[r] = a;
      }
    });
    let s = t.getComputedStyle();
    Object.keys(n).forEach(function(r) {
      let a = s[r];
      s[r] != null && (n[r] = a);
    }), this.object == null && (this.object = t, this.init()), this.object = t, this.setFolderValues(i, n), t.isNode && this.getFolder("节点属性") != null ? (this.getFolder("节点属性").show(), this.getFolder("连线属性").hide(), this.getFolder("图层属性").hide()) : this.getFolder("连线属性") != null ? (this.getFolder("连线属性").show(), this.getFolder("节点属性").hide(), this.getFolder("图层属性").hide()) : this.getFolder("图层属性") != null && (this.getFolder("图层属性").show(), this.getFolder("节点属性").hide(), this.getFolder("连线属性").hide());
  }
  newFolder(t) {
    const e = this.gui.addFolder(t);
    return this.folders[t] = e, e;
  }
  getFolder(t) {
    return this.folders[t];
  }
  getCtrollerValue(t, e) {
    return this.getCtroller(t, e).getValue();
  }
  getCtroller(t, e) {
    return this.getFolder(t).__controllers.find((i) => i.property == e);
  }
  setFolderValues(t, e) {
    Object.keys(this.gui.__folders).forEach((i) => {
      this.gui.__folders[i].__controllers.forEach(function(n) {
        let s = n.property;
        t[s] != null ? n.setValue(t[s]) : e[s] != null && n.setValue(e[s]);
      });
    });
  }
  init() {
    const t = this, e = this.editor, i = e.stage, n = this.basic, s = this.style;
    let r = { 实线: "", "虚线1,1": "1,1", "虚线2,2": "2,2", "虚线3,3": "3,3", "虚线7,3": "7,3", "虚线3,7": "3,7", "虚线10,1": "10,1", "虚线1,10": "1,10" };
    function a() {
      let f = this.property, S = this.getValue();
      t.object[f] = S === "" ? null : S, e.update();
    }
    function o() {
      let f = this.property, S = this.getValue(), P = t.object;
      f == "lineDash" && typeof S == "string" && (S = S.split(",")), P.setStyle(f, S === "" ? null : S), e.update();
    }
    const d = this.newFolder("基础属性");
    d.add(n, "id").onFinishChange(a).name("id"), d.add(n, "className").onFinishChange(a).name("className"), d.add(n, "name").onFinishChange(a).name("name"), d.add(n, "type").onFinishChange(a).name("type"), d.open();
    const l = this.newFolder("图层属性");
    l.add(s, "backgroundColor").onChange(o).name("背景颜色"), l.open();
    const h = this.newFolder("节点属性");
    h.add(n, "text").onFinishChange(a).name("文字"), h.add(n, "x").onFinishChange(a), h.add(n, "y").onFinishChange(a), h.add(n, "width", 1).onChange(a).name("宽度"), h.add(n, "height", 1).onChange(a).name("高度"), h.add(n, "scaleX", -3, 3, 0.1).onChange(a).name("缩放X"), h.add(n, "scaleY", -3, 3, 0.1).onChange(a).name("缩放Y"), h.add(n, "skewX", -1, 1, 0.1).onChange(a).name("斜切X"), h.add(n, "skewY", -1, 1, 0.1).onChange(a).name("斜切Y"), h.add(s, "lineWidth", 0, 10).onChange(o).name("线条粗细"), h.add(s, "lineDash", r).onChange(o).name("虚实"), h.add(s, "borderWidth", 0, 10).onChange(o).name("边框粗细"), h.add(s, "fillStyle").onFinishChange(o).name("填充颜色"), h.add(s, "strokeStyle").onFinishChange(o).name("线条颜色"), h.add(n, "imageSrc").onFinishChange(a).name("图片路径"), h.add(s, "globalAlpha", 0, 1, 0.1).onChange(o).name("整体透明度"), h.add(n, "originPosition", { 中心: "center", 左上: "lt", 上中: "ct", 右上: "rt", 左下: "lb", 下中: "cb", 右下: "rb" }).onFinishChange(a).name("原点位置"), h.add(n, "draggable", !0).onChange(a).name("是否可拖拽"), h.open();
    const c = this.newFolder("连线属性");
    c.add(n, "text").onFinishChange(a).name("文字"), c.add(s, "lineWidth", 0, 100).onChange(o).name("线条粗细"), c.add(s, "strokeStyle").onFinishChange(o).name("线条颜色"), c.add(s, "lineDash", r).onChange(o).name("虚实"), c.add(s, "lineCap", { 默认: "butt", 圆形: "round", 矩形: "square" }).onChange(o).name("末端样式"), c.add(s, "globalAlpha", 0, 1, 0.1).onChange(o).name("整体透明度"), c.open();
    const p = this.newFolder("文本");
    p.add(s, "fontFamily", ["sans-serif", "Arial", "宋体", "隶书", "楷体"]).onChange(o).name("字体名称"), p.add(s, "fontSize", { "10px": "10px", "12px": "12px", "14px": "14px", "16px": "16px", "18px": "18px", "20px": "20px", "22px": "22px", "24px": "24px", "26px": "26px", "28px": "28px", "30px": "30px", "32px": "32px", "34px": "34px", "36px": "36px", "38px": "38px", "40px": "40px", "42px": "42px", "44px": "44px", "46px": "46px", "48px": "48px", "50px": "50px", "52px": "52px", "54px": "54px", "56px": "56px", "58px": "58px", "60px": "60px", "62px": "62px", "64px": "64px", "66px": "66px", "68px": "68px" }).onChange(o).name("大小"), p.add(s, "fontWeight", { 正常: "normal", 粗体: "bold", 斜体: "italic", 加粗斜体: "bold italic" }).onChange(o).name("粗细"), p.add(s, "textPosition", { 中心: "center", 左上: "lt", 上中: "ct", 右上: "rt", 左下: "lb", 下中: "cb", 右下: "rb" }).onChange(o).name("位置"), p.add(s, "textAlign", { 左: "left", 中: "center", 右: "right" }).onChange(o).name("水平对齐"), p.add(s, "textBaseline", { 上: "top", 中: "middle", 下: "bottom" }).onChange(o).name("垂直对齐"), p.add(s, "color").onChange(o).name("颜色"), p.open();
    let b = this.gui.domElement;
    b.remove(), i.uiContainer.appendChild(b), b.style.position = "absolute", b.style.right = "-15px", b.style.top = "0px", b.style.zIndex = 1e3;
  }
  open() {
    this.gui.open();
  }
  close() {
    this.gui.close();
  }
  hide() {
    this.gui.domElement.style.display = "none";
  }
  show() {
    this.gui.domElement.style.display = "block";
  }
}
const g = { data: { localLastDocName: "topo_last_doc" }, connectPoint: { size: 14, style: { strokeStyle: "gray", fillStyle: "rgba(255,255,255,0.6)", lineWidth: 1, padding: 3 }, activeStyle: { lineWidth: 1, fillStyle: "rgba(0, 255,255, 0.9)", padding: 1 }, unActiveStyle: { lineWidth: 1, fillStyle: "rgba(255,255,255,0.6)", padding: 3 }, drawStartMinDistance: 7, drawStartDelay: 50 }, connectBox: { anchorDist: 7, nodeDist: 7 }, nodeResizePoint: { width: 13, height: 13, style: { lineWidth: 1, strokeStyle: "gray", fillStyle: "#efefef", padding: 1 } }, nodeRotatePoint: { width: 14, height: 14, style: { lineWidth: 1, strokeStyle: "gray", fillStyle: "#efefef", padding: 1 }, rotateLineStyle: { strokeStyle: "gray", lineDash: [3, 3] }, rotateLineLength: 30 }, crossGuildLine: { styleH: { strokeStyle: "rgba(255,0,0,0.5)", lineWidth: 1 }, styleV: { strokeStyle: "rgba(0,255,0,0.5)", lineWidth: 1 }, axisInfoStyle: { color: "gray", fontSize: 16, fillStyle: "rgba(0,0,0,0)" } }, linkCtrlPoint: { size: 7, style: { lineWidth: 1, strokeStyle: "gray", fillStyle: "rgba(0,255,255,0.9)", padding: 1 }, activeStyle: { globalAlpha: 0.2 }, unactiveStyle: { globalAlpha: 1 }, adjustStyle: { strokeStyle: "gray", fillStyle: "rgba(255,255,255,0.8)", lineWidth: 1, padding: 1 }, ctrlLinkStyle: { lineDash: [2, 2], lineWidth: 1, padding: 2 } }, dropBox: { style: { fillStyle: "rgba(0,0,0,0)", border: "3px solid orange", lineDash: [5, 3], lineWidth: 1 } }, align: { gridSize: 25, minDistance: 5, alignLineStyle: { strokeStyle: "cyan", lineDash: [5, 2], lineWidth: 1 } }, operationTip: { enable: !0 } };
class z extends H {
  constructor(t, e = 0, i = 0, n = 1, s = 1, r) {
    super(null, e, i, n, s), this.isActive = !1, this.isIntersectPoint = !1, this.connectBox = t, this.editor = t.editor, this.stage = this.editor.stage, this.resize(g.connectPoint.size, g.connectPoint.size), this.setStyles(g.connectPoint.style), this.unactive(), this.anchor = r;
  }
  setIntersect(t) {
    this.intersect = t;
  }
  pointerenterHandler() {
    this.active();
  }
  pointeroutHandler() {
    this.stage.setCursor(x.auto), this.unactive();
  }
  pointermoveHandler() {
  }
  pointerdownHandler() {
    event.preventDefault(), this.editor.stage.setCursor(x.auto), this.link = null;
  }
  dragHandler(t) {
    if (t.buttons == 2)
      return;
    const e = this.editor, i = e.stage;
    this.connectBox.activedPoint && this.connectBox.activedPoint.unactive();
    const n = this.connectBox.target;
    if (t.isDragStart) {
      let s;
      if (this.isIntersectPoint) {
        let r = this.connectBox.intersect;
        s = n.getSegmentAnchor(r.t, r.segIndex);
      } else
        s = n.getAnchor(this.name);
      return void (this.drawStartInfo = { x: t.x, y: t.y, beginAnchorProxy: s, timeStamp: Date.now() });
    }
    if (this.drawStartInfo != null) {
      let s = _.distance(this.drawStartInfo.x, this.drawStartInfo.y, t.x, t.y);
      if (Date.now() - this.drawStartInfo.timeStamp > g.connectPoint.drawStartDelay && s > g.connectPoint.drawStartMinDistance) {
        this.editor.record("绘制新线");
        let r = { x: i.inputSystem.xInWorld, y: i.inputSystem.yInWorld };
        const a = e.instanceManager.lineDrawn(n, r, this.drawStartInfo.beginAnchorProxy);
        this.link = a;
        let o = a.parent.worldToLocalXY(i.inputSystem.xInWorld, i.inputSystem.yInWorld);
        a.setEnd(o), this.drawStartInfo = null;
      }
    }
    if (this.link != null && this.link.end != null) {
      let s = this.link.parent.worldToLocalXY(i.inputSystem.xInWorld, i.inputSystem.yInWorld);
      this.link.setEnd(s), this.anchorProxy = this.connectBox.findConnectableEndpoint([this.link, this.link.end.host]);
    }
  }
  pointerupHandler(t) {
    this.show(), this.editor.update(), this.editor.stage.setCursor(x.auto), this.link != null && (this.anchorProxy && (this.anchorProxy.equals(this.link.begin) ? this.link.removeFromParent() : (this.link.setEnd(this.anchorProxy), this.link._upgradeParent(), this.editor.instanceManager.lineDrawingFinished(this.link))), this.editor.recordEnd("绘制新线")), this.link = null;
  }
  active() {
    this.isActive = !0, this.setStyles(g.connectPoint.activeStyle), this.scale(1.2, 1.2);
  }
  unactive() {
    this.isActive = !1, this.setStyles(g.connectPoint.unActiveStyle), this.scale(1, 1);
  }
}
const T = navigator.userAgent.toUpperCase().indexOf("MAC OS") != -1 ? "Meta" : "Control", M = { CtrlOrCmd: T, CreateGroup: T, DropTo_leader: "Shift", Delete: ["Delete", "Meta+Backspace"], Select_all: T + "+a", Select_invert: T + "+i", Cut: T + "+x", Copy: T + "+c", Paste: T + "+v", Save: T + "+s", Open: T + "+o", Undo: T + "+z", Redo: T + "+shift+z", Copy_style: "Shift+c", paste_Style: "Shift+v", Move_up: "ArrowUp", Move_down: "ArrowDown", Move_left: "ArrowLeft", Move_right: "ArrowRight", Layout_grid: "g", LocalView: "/", ResizeKeepAspectRatio: "shift", Cancel: "Escape", DisableNodeAlign: "Alt" };
class E {
  static isUpdateMatrixed(t) {
    return t._obb != null && t._obb.points != null && t._obb.points.length >= 2;
  }
  static connectable(t, e, i) {
    return E.isUpdateMatrixed(t) && i.indexOf(t) == -1 && e.isConnectable(t);
  }
  static aliagnAble(t, e) {
    return (i) => i.isNode && i !== e && i !== i.parent.beginArrow && i !== i.parent.endArrow && i !== i.parent.label;
  }
  static isAlignable(t) {
    return !(t.keyboard.isKeydown(M.DisableNodeAlign) || t.stage.selectedGroup.objects.length > 1);
  }
}
class nt extends C {
  constructor(t, e = 0, i = 0, n = 1, s = 1) {
    super(null, e, i, n, s), this.editor = t;
    let r = new K("intersectPoint", 0, -1);
    this.ctrlIntersectPoint = this.createAnchorPoint("intersectPoint", r), this.ctrlIntersectPoint.isIntersectPoint = !0, this.ctrlIntersectPoint.hide();
  }
  setTarget(t) {
    if (this.editor.isConnectable(t)) {
      if (this.target !== t) {
        if (this.target = t, t != null && (t instanceof C || t instanceof m)) {
          this.removeAllChildren(), this.addChild(this.ctrlIntersectPoint);
          let e = G(t);
          for (let i of e)
            this.createAnchorPoint(i.name, i);
        }
        this.adjustConnectNodes();
      }
      this.children.forEach((e) => e.unactive()), this.ctrlIntersectPoint.hide(), this.show();
    }
  }
  adjustConnectNodes() {
    if (this.target == null || this.target.parent == null)
      return void this.clearTarget();
    const t = this.target;
    let e = this.editor.stage.camera.getObjectScreenTransform(t);
    const i = this.children;
    for (let n = 0; n < i.length; n++) {
      const s = i[n];
      if (!s.isIntersectPoint) {
        if (s.name != null) {
          let r = s.anchor, a = O.calcPointByAnchor(t, r), o = e.point(a);
          s.translate(o.x, o.y);
        }
      }
    }
  }
  setTargetWithName(t, e) {
    if (e == null)
      throw new Error("activeNameOrPoint is null");
    this.setTarget(t), this.activePointByName(e), this.show();
  }
  clearActived() {
    this.activedPoint && this.activedPoint.unactive(), this.ctrlIntersectPoint.hide();
  }
  activePointByName(t) {
    this.activedPoint && this.activedPoint.unactive();
    let e = this.children.filter((i) => i.name == t)[0];
    this.activedPoint = e, e.active(), this.ctrlIntersectPoint.hide();
  }
  showIntersectAnchor(t) {
    if (this.intersect = t, t == null)
      return void this.ctrlIntersectPoint.hide();
    let e = t.t, i = t.segIndex;
    const n = this.target;
    let s = n.getLocalPoint(e, i), r = this.editor.stage.camera.getObjectScreenTransform(n).point(s);
    this.ctrlIntersectPoint.translate(r.x, r.y), this.ctrlIntersectPoint.setStyles(g.connectPoint.activeStyle), this.ctrlIntersectPoint.show();
  }
  createAnchorPoint(t, e) {
    const i = new z(this, 0, 0, 1, 1, e);
    return i.name = t, i.connectBox = this, this.addChild(i), i;
  }
  getObjectsIntersect(t) {
    let e = this.editor.stage, i = { x: e.inputSystem.xInWorld, y: e.inputSystem.yInWorld };
    const n = g.connectBox.nodeDist;
    let s = Number.MAX_SAFE_INTEGER, r = null;
    for (let a = 0; a < t.length; a++) {
      const o = t[a];
      let d = k.getNearestPoint(o, i);
      d.dist < n && d.dist < s && (s = d.dist, d.object = o, r = d);
    }
    return r;
  }
  getConnectableEndpointFromObjects(t) {
    const e = this.editor, i = this, n = e.stage, s = n.inputSystem, r = { x: s.x, y: s.y }, a = this.getNearestAnchorOnObjects(n.camera, r, t, g.connectPoint.size / 2), o = e.keyboard.isControlDown();
    if (a.length == 0 && !o) {
      let l = function(h, c) {
        const p = h.getCurrentLayer(), b = { x: h.inputSystem.xInWorld, y: h.inputSystem.yInWorld };
        let f = [];
        p.getRenderSet().forEach((L) => {
          L.isNode && f.push(L);
        });
        let S = f.map((L, B) => {
          let D = L._obb.aabb.getCenter();
          return { index: B, dist: _.distance(b.x, b.y, D.x, D.y) };
        });
        if (S = S.filter((L) => L.dist <= c), S.length == 0)
          return null;
        S.sort((L, B) => L.dist - B.dist);
        let P = S[0].index;
        return f[P];
      }(n, 100);
      return this.editor.isConnectable(l) && i.setTarget(l), null;
    }
    if (a.length > 0) {
      a.sort((b, f) => {
        let S = b.object, P = f.object;
        return o ? (S instanceof m ? 0 : 1) - (P instanceof m ? 0 : 1) : (S instanceof C ? 0 : 1) - (P instanceof C ? 0 : 1);
      });
      const l = a[0], h = l.object;
      let c = l.anchorName;
      const p = h.getAnchor(c);
      return i.setTargetWithName(h, c), p;
    }
    const d = this.getObjectsIntersect(t);
    if (d != null) {
      const l = d.object;
      if (l instanceof C || l instanceof m) {
        i.setTarget(l);
        const h = l.getSegmentAnchor(d.t, d.segIndex);
        return this.showIntersectAnchor(d), h;
      }
      throw new Error("unknow intersect object:" + l);
    }
    return i.clearTarget(), null;
  }
  findConnectableEndpoint(t) {
    const e = this.editor, i = e.stage.camera.localView.getObject()._findChildren(function(n) {
      return E.connectable(n, e, t);
    }, !0);
    return this.getConnectableEndpointFromObjects(i);
  }
  getNearestAnchorOnObjects(t, e, i, n) {
    let s = [];
    for (let r = 0; r < i.length; r++) {
      const a = i[r], o = t.getObjectScreenTransform(a);
      let d = G(a);
      for (let l of d) {
        let h = k.anchorToLocalPoint(a, l.name), c = o.point(h), p = _.distance(c.x, c.y, e.x, e.y);
        if (p < n) {
          const b = { distance: p, object: a, anchorName: l.name };
          s.push(b);
        }
      }
    }
    return s.sort((r, a) => r.distance - a.distance), s;
  }
  update() {
    super.update(), this.adjustConnectNodes();
  }
  clearTarget() {
    this.target = null, this.hide();
  }
  cancel() {
  }
  pointeroutStageHandler() {
  }
  pointerenterStageHandler() {
  }
}
function G(u) {
  let t = u._shape.getConnectionAnchors(), e = [];
  for (let i of t)
    i.usage & A.CONNECT_EDIT && e.push(i);
  return e;
}
class st extends H {
  constructor(t, e) {
    super(), this.isConnectPoint = !0, this.isActive = !1, this.anchor = e, this.linkCtrlBox = t, this.setRadius(g.linkCtrlPoint.size), this.editor = this.linkCtrlBox.editor, this.setStyles(g.linkCtrlPoint.style);
  }
  active() {
    this.setStyles(g.linkCtrlPoint.activeStyle), this.isActive = !0;
  }
  unActive() {
    this.setStyles(g.linkCtrlPoint.unactiveStyle), this.isActive = !1;
  }
  pointermoveHandler(t) {
    this.editor.anchorsBox.hide();
    let e = this.parent.attachedLink, i = this.editor.stage, n = e.parent.worldToLocalXY(i.inputSystem.xInWorld, i.inputSystem.yInWorld);
    this.anchor.pointermoveHandler(e, i, n);
  }
  pointerdownHandler(t) {
    this.editor.stage.setCursor(x.auto), this.canConnectAnchorProxy = null;
  }
  dragHandler(t) {
    let e = this.parent, i = e.parent.stage;
    const n = this.editor;
    let s = e.attachedLink;
    n.anchorsBox.hide();
    const r = this.name, a = this.anchor;
    t.isDragStart && a.usage & A.ADJUST && this.active();
    let o = s.parent.worldToLocalXY(i.inputSystem.xInWorld, i.inputSystem.yInWorld);
    if (r == v.LinkBegin || r == v.LinkEnd)
      return a.pointermoveHandler(s, i, o), void (this.canConnectAnchorProxy = n.anchorsBox.findConnectableEndpoint([s]));
    a.pointermoveHandler(s, i, o), e.update();
  }
  pointerupHandler(t) {
    this.editor.stage.setCursor(x.auto), t.event.preventDefault();
    let e = this.parent.attachedLink, i = this.anchor.name;
    if (this.canConnectAnchorProxy != null && !this.canConnectAnchorProxy.equals(e.begin) && !this.canConnectAnchorProxy.equals(e.end)) {
      let n = this.canConnectAnchorProxy, s = n.host;
      if (s.isLink) {
        let r = s;
        r.end.host !== e && r.begin.host !== e && (i == v.LinkBegin ? e.setBegin(n) : i == v.LinkEnd && e.setEnd(n), e._upgradeParent(), e.updateMatrix());
      } else
        i == v.LinkBegin ? e.setBegin(n) : i == v.LinkEnd && e.setEnd(n), e._upgradeParent(), e.updateMatrix();
    }
    this.isActive && this.unActive(), this.canConnectAnchorProxy = null;
  }
}
class rt extends C {
  constructor(t) {
    super(), this.ctrlPointMap = /* @__PURE__ */ new Map(), this.editor = t, this.init();
  }
  attachTo(t) {
    this.createCtrlPoints(t), this.updateCtrlPoints(), this.show();
  }
  createCtrlPoint(t) {
    let e = new st(this, t);
    return e.name = t.name, this.addChild(e), e;
  }
  updateSize() {
    const t = this.editor.stage.inputSystem.target;
    this.attachedLink && this.attachedLink.parent != null ? this.attachedLink.parent == null || t == null || this.attachedLink != t ? (this.attachedLink = null, this.hide()) : this.attachTo(this.attachedLink) : this.hide();
  }
  createCtrlPoints(t) {
    this.removeAllChildren(), this.ctrlPointMap.clear(), this.attachedLink = t;
    let e = Array.from(t.getShape().getAnchors().values()).filter((n) => n.usage & A.ADJUST), i = e.map((n) => n.name);
    this.anchorNameStr = i.join(",");
    for (let n = 0; n < e.length; n++) {
      let s = e[n], r = s.name, a = this.createCtrlPoint(s);
      this.ctrlPointMap.set(r, a);
    }
    for (let n of this.ctrlPointMap.values()) {
      let s = n.anchor, r = s.name;
      if (s.usage != (A.CONNECT_EDIT | A.ADJUST) && (n.setStyles(g.linkCtrlPoint.adjustStyle), n.isConnectPoint = !1), r == v.QuadBezierLinkCtrlPoint) {
        let a = this.ctrlPointMap.get(v.LinkBegin), o = this._createCtrlLink(n.getAnchor(y.center), a.getAnchor(y.center));
        n.ctrlLine = o;
      } else if (r == v.BezierLinkCtrlPoint1) {
        let a = this.ctrlPointMap.get(v.LinkBegin), o = this._createCtrlLink(n.getAnchor(y.center), a.getAnchor(y.center));
        n.ctrlLine = o;
      } else if (r == v.BezierLinkCtrlPoint2) {
        let a = this.ctrlPointMap.get(v.LinkEnd), o = this._createCtrlLink(n.getAnchor(y.center), a.getAnchor(y.center));
        n.ctrlLine = o;
      }
    }
  }
  _createCtrlLink(t, e) {
    let i = new m(null, t, e);
    return i.setStyles(g.linkCtrlPoint.ctrlLinkStyle), this.addChild(i), i.pointerEnabled = !1, i;
  }
  updateCtrlPoints() {
    const t = this.attachedLink;
    let e = this.editor.stage.camera.getObjectScreenTransform(t);
    for (let i of this.ctrlPointMap.values()) {
      let n = i.anchor, s = O.calcPointByAnchor(t, n), r = e.pointXY(s.x, s.y);
      i.translate(r.x, r.y);
    }
  }
  update() {
    super.update(), this.visible && this.attachedLink != null && this.updateCtrlPoints();
  }
  clearTarget() {
    this.ctrlPointMap.clear(), this.removeAllChildren(), this.hide();
  }
  init() {
    this.ctrlPointMap.clear(), this.hide();
  }
  pointeroutStageHandler() {
  }
  pointerenterStageHandler() {
  }
}
class w extends q {
  constructor(t, e) {
    super(t, e);
  }
}
const at = { lt: y.rb, ct: y.cb, rt: y.lb, rm: y.lm, rb: y.lt, cb: y.ct, lb: y.rt, lm: y.rm, center: y.center };
class ot extends H {
  constructor(t, e) {
    super(), this.nodeResizeBox = t, this.editor = t.editor, this.stage = this.editor.stage, this.selectedGroup = this.stage.selectedGroup, this.resize(g.nodeResizePoint.width, g.nodeResizePoint.height), this.setStyles(g.nodeResizePoint.style), this.name = e;
  }
  pointermoveHandler() {
    let t, e = this.name;
    e == y.lt ? t = x.nw_resize : e == y.ct ? t = x.n_resize : e == y.rt ? t = x.ne_resize : e == y.lm ? t = x.w_resize : e == y.rm ? t = x.e_resize : e == y.lb ? t = x.sw_resize : e == y.cb ? t = x.s_resize : e == y.rb && (t = x.se_resize), this.editor.stage.setCursor(t);
  }
  _anchorToLocalPoint(t, e) {
    return t._positionToLocalPoint(e);
  }
  dragHandler(t) {
    let e = this.nodeResizeBox.editor, i = this.nodeResizeBox.currNode;
    this.handleNodeResize(i, t, e);
  }
  handleNodeResize(t, e, i) {
    let n = this.name, s = t.getWorldTransform(), r = e.xInWorld, a = e.yInWorld, o = s.point(this._anchorToLocalPoint(t, n)), d = r - o.x, l = a - o.y, h = s.invert().vec([0, 0], [d, l]);
    if (d = h[0], l = h[1], n == y.lt ? (d = -d, l = -l) : n == y.ct ? (d = 0, l = -l) : n == y.rt ? l = -l : n == y.lm ? (d = -d, l = 0) : n == y.rm ? l = 0 : n == y.lb ? d = -d : n == y.cb ? d = 0 : y.rb, i.keyboard.isKeydown(M.ResizeKeepAspectRatio) && (l = d * (t.height / (t.width || 1))), this.adjustFixedDirection(t, [d, l], n, s), d != 0 && l != 0 && i.hasListener("resize")) {
      let c = new w("resize", { target: t, details: { dx: d, dy: l, ctrl: n } });
      i.dispatchEvent(c);
    }
  }
  adjustFixedDirection(t, e, i, n) {
    let s = at[i], r = this._anchorToLocalPoint(t, s);
    r = n.point(r), t.resizeWith(e[0], e[1]), t.width < 0 && (t.width = 0), t.height < 0 && (t.height = 0), t.updateMatrix();
    let a = t.getWorldTransform(), o = this._anchorToLocalPoint(t, s);
    o = a.point(o);
    let d = r.x - o.x, l = r.y - o.y;
    t.translateWith(d, l), this.nodeResizeBox.updateSize();
  }
  pointerenterHandler() {
  }
  pointeroutHandler(t) {
  }
  pointerdownHandler(t) {
    t.preventDefault();
  }
  pointerupHandler(t) {
    t.preventDefault();
  }
}
class lt extends H {
  constructor(t, e) {
    super(), this.editor = t.editor, this.stage = this.editor.stage, this.selectedGroup = this.stage.selectedGroup, this.setStyles(g.nodeRotatePoint.style), this.resize(g.nodeRotatePoint.width, g.nodeRotatePoint.height), this.name = e;
  }
  getRotationWithMouse(t, e) {
    let i = e.inputSystem, n = { x: 0, y: 0 }, s = t._shape.getConnectionAnchor(t.originPosition);
    s != null && (n = O.calcPointByAnchor(t, s));
    let r = t.getWorldTransform().point(n);
    return Math.atan2(i.yInWorld - r.y, i.xInWorld - r.x);
  }
  pointermoveHandler() {
    this.stage.setCursor(x.move);
  }
  pointerdownHandler(t) {
    t.preventDefault();
    let e = this.stage;
    if (this.selectedGroup.getTopObjects().length == 0)
      throw new Error("selectedGroup.length is 0!");
    let i = e.inputSystem.target;
    this.elementInitAngle = i.rotation, this.mouseInitAngle = this.getRotationWithMouse(i, e);
  }
  pointerupHandler(t) {
    this.stage.setCursor(x.auto), t.event.preventDefault();
  }
  dragHandler(t) {
    t.event.preventDefault();
    let e = this.parent, i = e.editor, n = i.stage, s = n.inputSystem.target, r = this.getRotationWithMouse(s, n) - this.mouseInitAngle;
    if (s.rotate(this.elementInitAngle + r), e.updateSize(), r != 0 && i.hasListener("rotate")) {
      let a = new w("rotate", { target: s, details: { dAngle: r } });
      i.dispatchEvent(a);
    }
  }
}
const N = { LinkCtrlBox: 10002, NodeCtrlBox: 10001, IntersectPoint: 10003, EditorNewLink: 3 };
class dt extends C {
  constructor(t, e = 0, i = 0, n = 1, s = 1) {
    super(null, e, i, n, s), this.resizePoints = [], this.name = "NodeResizeBox", this.zIndex = N.NodeCtrlBox, this.editor = t, this.pointerEnabled = !1, this.initCtrlPoints(), this.hide();
  }
  initCtrlPoints() {
    let t = this, e = new lt(this, "rotate");
    this.addChild(e), this.rotateNode = e;
    let i = new m();
    i.name = "RotateLink", i.setStyles(g.nodeRotatePoint.rotateLineStyle), i.pointerEnabled = !1, this.rotateLink = i, this.addChild(i), this.rotateLink = i, ["lt", "lb", "rt", "rb"].forEach((n) => {
      let s = new ot(this, n);
      t.resizePoints.push(s);
    }), this.addChildren(this.resizePoints);
  }
  _anchorToLocalPoint(t, e) {
    return t._positionToLocalPoint(e);
  }
  attachTo(t) {
    t != null ? function(e) {
      let i = e.parent;
      return i instanceof m && (i.beginArrow === e || i.endArrow === e);
    }(t) || (this.currNode = t, this.updateSize(), this.show()) : this.clearTarget();
  }
  updateSize() {
    let t = this.currNode;
    if (t == null || t.isSelected == 0 || t.parent == null)
      return this.currNode = null, void this.hide();
    let e = this.editor.stage.camera, i = this.currNode;
    i.updateMatrix();
    let n = e.getObjectScreenTransform(i);
    {
      let s = this._anchorToLocalPoint(i, y.ct), r = n.point(s);
      s.y -= g.nodeRotatePoint.rotateLineLength, s = n.point(s), this.rotateNode.translate(s.x, s.y), this.rotateLink.setBegin(r), this.rotateLink.setEnd(s);
    }
    for (let s = 0; s < this.resizePoints.length; s++) {
      let r = this.resizePoints[s], a = this._anchorToLocalPoint(i, r.name);
      a = n.point(a), r.translate(a.x, a.y);
    }
  }
  update() {
    super.update(), this.visible && this.currNode != null && this.updateSize();
  }
  clearTarget() {
    this.currNode = null, this.hide();
  }
  pointeroutStageHandler() {
  }
  pointerenterStageHandler() {
  }
}
const ht = { getItem: function(u) {
  return localStorage.getItem(u);
}, setItem: function(u, t) {
  localStorage.setItem(u, t);
}, saveWithVersion(u, t) {
  u += Date.now(), this.setItem(u, t);
}, getAllVersions: (u) => Object.keys(localStorage).filter((t) => t.startsWith(u)).sort(), getLastVersion(u, t) {
  let e = this.getAllVersions(u).reverse();
  if (e.length == 0)
    return;
  t == null && (t = 0), t + 1 >= e.length && (t = e.length - 1);
  let i = e[t];
  return this.getItem(i);
} };
class ct {
  constructor(t, e, i) {
    this.type = t, this.undoFn = i, this.redoFn = e;
  }
  redo() {
    this.redoFn();
  }
  undo() {
    this.undoFn();
  }
}
class ut extends EventTarget {
  constructor(t) {
    super(), this.historyMaxLength = 10, this.editor = t, this.undoHistory = [], this.redoHistory = [];
  }
  clear() {
    this.undoHistory = [], this.redoHistory = [];
  }
  push(t, e, i) {
    let n = new ct(t, e, i);
    return n.editor = this.editor, this.redoHistory.length = 0, this.undoHistory.push(n), this.checkHistoryLength(), n;
  }
  undo() {
    if (this.undoHistory.length == 0)
      return null;
    let t = this.undoHistory.pop();
    return t.undo(), this.redoHistory.push(t), this.checkHistoryLength(), t;
  }
  redo() {
    if (this.redoHistory.length == 0)
      return null;
    let t = this.redoHistory.pop();
    return t.redo(), this.undoHistory.push(t), this.checkHistoryLength(), t;
  }
  checkHistoryLength() {
    this.undoHistory.length > this.historyMaxLength && this.undoHistory.shift(), this.redoHistory.length > this.historyMaxLength && this.redoHistory.shift();
  }
}
class pt {
  constructor(t) {
    this.editor = t, this.init();
  }
  unbind(t) {
    this.editor.stage.keyboard.unbind(t);
  }
  init() {
    const t = this.editor, e = t.stage, i = t.getCurrentLayer();
    let n = t.stage.keyboard;
    const s = t.keyConfig;
    function r(a, o, d = !0) {
      !Array.isArray(a) && (a = [a]), a.forEach((l) => {
        n.bindKey(l, function(h) {
          o(h);
        }, d);
      });
    }
    n.addEventListener("keyup", function(a) {
      t.update();
    }), r(s.Delete, (a) => t.editorEventManager.deleteHandler(), !1), r(s.Cut, (a) => t.clipboardManager.cutHandler()), r(s.Copy, (a) => {
      t.showOpTooltip("复制"), t.clipboardManager.copyHandler();
    }, !0), r(s.Paste, (a) => t.clipboardManager.pasteHandler()), r(s.Undo, (a) => {
      t.showOpTooltip("撤销"), t.redoUndoSys.undo(), t.clearCtrlBoxs();
    }), r(s.Redo, (a) => {
      t.showOpTooltip("重做"), t.redoUndoSys.redo(), t.clearCtrlBoxs();
    }), r(s.Select_all, (a) => {
      t.showOpTooltip("全选");
      let o = e.camera.localView.getObject(), d = Q.flatten(o.children, (l) => l.visible == 1);
      e.select(d);
    }), r(s.Select_invert, (a) => {
      t.showOpTooltip("反选");
      let o = e.selectedGroup.getTopObjects();
      const d = Array.from(i.getRenderSet());
      e.select(d.filter((l) => !o.includes(l)));
    }), r(s.Save, (a) => {
      t.showOpTooltip("保存"), t.saveHandler(a, t.imageToBase64);
    }), r(s.Open, (a) => {
      t.showOpTooltip("打开"), t.openLasted();
    }), r(s.Copy_style, (a) => {
      t.showOpTooltip("复制样式"), t.clipboardManager.styleCopyHandler();
    }), r(s.paste_Style, (a) => {
      t.showOpTooltip("粘贴样式"), t.clipboardManager.stylePasteHandler();
    }), r(s.Move_left, (a) => {
      e.selectedGroup.getTopObjects().filter((o) => o.isNode).forEach((o) => {
        o.x -= 1;
      });
    }), r(s.Move_right, (a) => {
      e.selectedGroup.getTopObjects().filter((o) => o.isNode).forEach((o) => {
        o.x += 1;
      });
    }), r(s.Move_up, (a) => {
      e.selectedGroup.getTopObjects().filter((o) => o.isNode).forEach((o) => {
        o.y -= 1;
      });
    }), r(s.Move_down, (a) => {
      e.selectedGroup.getTopObjects().filter((o) => o.isNode).forEach((o) => {
        o.y += 1;
      });
    }), r(s.Cancel, (a) => {
      t.onEsc();
    }), r(s.Layout_grid, (a) => {
      t.layoutManager.doGridLayout();
    }, !1), r(s.LocalView, (a) => {
      t.toogleLocalView();
    }, !1);
  }
}
class I {
  constructor() {
    this.take = 0;
  }
  copyPut(t) {
    this.take = 0, this.type = "copy", this.source = t;
  }
  cutPut(t) {
    this.take = -1, this.type = "cut", this.source = t;
  }
  takeSource() {
    return this.take++, this.source;
  }
  isFirstCutPaste() {
    return this.type == "cut" && this.take == 0;
  }
  clear() {
    this.type = null, this.take = 0, this.source = null;
  }
}
class gt {
  constructor(t) {
    this.cssClipBoard = new I(), this.clipboard = new I(), this.cssClipBoard = new I(), this.editor = t;
  }
  reset() {
    this.clipboard.clear(), this.cssClipBoard.clear();
  }
  copyHandler() {
    let t = this.editor.stage, e = [].concat(t.selectedGroup.getTopObjects());
    if (e.length == 0)
      return;
    let i = e.map((s) => s.parent);
    this.clipboard.copyPut({ type: "objects", parents: i, sourceObjArr: e });
    let n = new w("copy", { target: e });
    this.editor.dispatchEvent(n);
  }
  cutHandler() {
    let t = this.editor, e = t.stage, i = [].concat(e.selectedGroup.getTopObjects());
    if (i.length == 0)
      return;
    let n = i.map((r) => r.parent);
    this.clipboard.cutPut({ type: "objects", parents: n, sourceObjArr: i }), t.record("剪切"), i.forEach((r, a) => {
      n[a].removeChild(r), k.unlinks(r, i);
    }), t.recordEnd("剪切"), e.inputSystem._clearTarget(), t.anchorsBox.clearTarget(), t.nodeResizeBox.clearTarget(), t.linkCtrlBox.clearTarget();
    let s = new w("cut", { target: i });
    this.editor.dispatchEvent(s);
  }
  pasteHandler() {
    let t = this.editor, e = t.stage.inputSystem, i = this.clipboard.takeSource();
    if (i == null || i.sourceObjArr == null || i.sourceObjArr.length == 0)
      return;
    let n = t.stage, s = i.sourceObjArr, r = i.parents;
    r = r.map((b) => {
      let f = n.camera.localView.object;
      return f == null || f.contains(b) ? b : n.camera.localView.object;
    });
    let a = s.map((b) => b._obb.aabb), o = Y.unionRects(a).getCenter(), d = e.xInWorld - o.x, l = e.yInWorld - o.y;
    t.record("粘贴");
    let h = s, c = n.serializerSystem.objectsToJSON(s);
    h = n.serializerSystem.jsonToObjects(c), h.forEach((b, f) => {
      b.translateWith(d, l);
    }), h.forEach((b, f) => {
      r[f].addChild(b);
    }), t.recordEnd("粘贴");
    let p = new w("paste", { target: h });
    this.editor.dispatchEvent(p);
  }
  styleCopyHandler() {
    let t = this.editor.stage, e = t.inputSystem.target;
    e == null && (!t.selectedGroup.isEmpty() && (e = t.selectedGroup.objects[0]), e == null) || this.cssClipBoard.copyPut({ type: "style", parents: [e.parent], sourceObjArr: [e] });
  }
  stylePasteHandler() {
    let t = this.editor, e = this.cssClipBoard.takeSource();
    if (e == null || e.sourceObjArr.length == 0)
      return;
    let i = t.stage.selectedGroup.objects, n = this;
    t.record("粘贴样式");
    let s = e.sourceObjArr[0];
    i.forEach((r) => {
      n.copySetStyle(r, s);
    }), t.recordEnd("粘贴样式");
  }
  copySetStyle(t, e) {
    if (t !== e && t.className == e.className) {
      for (let i = 0; i < e.classList.length; i++)
        t.classList[i] = e.classList[i];
      t.setStyles(e.style);
    }
  }
}
class yt extends C {
  constructor(t, e = 0, i = 0, n = 1, s = 1) {
    super(null, e, i, n, s), this.zIndex = N.NodeCtrlBox, this.editor = t, this.setStyles(g.dropBox.style), this.pointerEnabled = !1, this.currObject, this.hide();
  }
  update() {
    this.visible && this.currObject != null && this.updateSize();
  }
  attachTo(t) {
    return t == null || t instanceof C && !this.editor.isEditable(t) ? (this.currObject = null, void this.hide()) : (this.currObject = t, this.updateSize(), void this.show());
  }
  updateSize() {
    this.currObject != null && this.viewClone(this.currObject);
  }
  viewClone(t) {
    let e = this.editor.stage;
    if (t instanceof j)
      return this.resize(e.width - 10, e.height - 10), this.rotate(0), void this.translate(0.5 * e.width, 0.5 * e.height);
    if (!(t instanceof m) && t instanceof C) {
      let i = e.camera.getObjectScreenTransform(t), n = i.point(t._positionToLocalPoint(y.center)), s = i.point(t._positionToLocalPoint(y.rm)), r = Math.atan2(s.y - n.y, s.x - n.x);
      i.rotate(-r);
      let a = i.point(t._positionToLocalPoint(y.center)), o = i.point(t._positionToLocalPoint(y.rb)), d = 2 * (o.x - a.x), l = 2 * (o.y - a.y), h = 4;
      this.resize(d + 2 * h, l + 2 * h), this.rotate(r), this.translate(n.x, n.y);
    }
  }
}
class bt {
  constructor(t) {
    this._disabled = !1, this.visible = !1, this.editor = t, this.init(t);
  }
  init(t) {
    this.alignInfo = { horizontalType: null, verticalType: null, horizontalTarget: null, verticalTartet: null };
    let e = new m(null, { x: 0, y: 0 }, { x: 100, y: 100 });
    e.name = "Align_x_line", e.setStyles(g.align.alignLineStyle), e.pointerEnabled = !1, this.dxLine = e;
    let i = new m(null, { x: 0, y: 0 }, { x: 100, y: 100 });
    e.name = "Align_y_line", i.setStyles(g.align.alignLineStyle), i.pointerEnabled = !1, this.dyLine = i, e.hide(), i.hide(), t.handlerLayer.addChild(e), t.handlerLayer.addChild(i);
  }
  disable() {
    this._disabled = !0, this.dxLine.hide(), this.dyLine.hide();
  }
  enable() {
    this._disabled = !1;
  }
  getAlignInfo(t, e) {
    const i = this.editor.stage;
    let n = t.target;
    if (i.selectedGroup.objects.length > 1)
      return this.alignInfo.horizontalType = null, this.alignInfo.verticalType = null, this.alignInfo.horizontalTarget = null, this.alignInfo.verticalTartet = null, this.alignInfo;
    let s = E.aliagnAble(n, n);
    const r = i.getCurrentLayer().displayList.filter(s);
    let a = this.editor.stage.camera.scale * e;
    return this.findAlignRectInfo(n._obb.aabb, r, a);
  }
  pointerdownHandler(t) {
    this.dxLine.hide(), this.dyLine.hide();
  }
  pointerupHandler(t) {
    if (this._disabled)
      return;
    let e = t.previous, i = this.dxLine.visible || this.dyLine.visible;
    if (e.type !== "pointermove" || i == 0)
      return;
    this.dxLine.hide(), this.dyLine.hide();
    let n = t.target;
    if (n == null || !E.isAlignable(this.editor))
      return;
    const s = Math.max(1, g.align.gridSize);
    let r = n._obb.aabb, a = this.alignInfo;
    if (a.horizontalType != null) {
      let o = n.parent.getWorldTransform().invert(), d = a.horizontalTarget._obb.aabb[a.horizontalType] - r[a.horizontalType];
      if (d != 0) {
        let l = o.vec([1, 1], [d, 1]);
        n.x += l[0];
      }
    } else
      n.x = Math.round(n.x / s) * s;
    if (a.verticalType != null) {
      let o = n.parent.getWorldTransform().invert(), d = a.verticalTartet._obb.aabb[a.verticalType] - r[a.verticalType];
      if (d != 0) {
        let l = o.vec([1, 1], [1, d]);
        n.y += l[1];
      }
    } else
      n.y = Math.round(n.y / s) * s;
  }
  _dragHandler(t) {
    if (this._disabled)
      return;
    let e = t.target;
    if (e == null || !e.isNode || (this.dxLine.hide(), this.dyLine.hide(), !E.isAlignable(this.editor)))
      return;
    let i = this.dxLine, n = this.dyLine;
    const s = Math.max(0, g.align.minDistance);
    s == 0 ? (this.alignInfo.horizontalType = null, this.alignInfo.verticalType = null, this.alignInfo.horizontalTarget = null, this.alignInfo.verticalTartet = null) : this.alignInfo = this.getAlignInfo(t, s);
    const r = this.alignInfo, a = Math.max(1, g.align.gridSize);
    let o = e._obb.aabb, d = { x: Math.round(o.center / a) * a, y: Math.round(o.middle / a) * a }, l = this.editor.stage.camera.toScreenXY(d.x, d.y);
    if (r.horizontalType != null) {
      let h = this.editor.stage.camera.toScreenRect(e._obb.aabb), c = this.editor.stage.camera.toScreenRect(r.horizontalTarget._obb.aabb), p = c[r.horizontalType], b = (h.middle + c.middle) / 2, f = Math.abs(h.middle - c.middle);
      i.setBegin({ x: p, y: b - f / 2 }), i.setEnd({ x: p, y: b + f / 2 }), i.show();
    } else {
      let h = l.x, c = l.y, p = a;
      i.setBegin({ x: h, y: c - p / 2 }), i.setEnd({ x: h, y: c + p / 2 }), i.show();
    }
    if (r.verticalType != null) {
      let h = this.editor.stage.camera.toScreenRect(e._obb.aabb), c = this.editor.stage.camera.toScreenRect(r.verticalTartet._obb.aabb), p = (h.center + c.center) / 2, b = c[r.verticalType], f = Math.abs(h.center - c.center);
      n.setBegin({ x: p - f / 2, y: b }), n.setEnd({ x: p + f / 2, y: b }), n.show();
    } else {
      let h = l.x, c = l.y, p = a;
      n.setBegin({ x: h - p / 2, y: c }), n.setEnd({ x: h + p / 2, y: c }), n.show();
    }
  }
  findAlignRectInfo(t, e, i) {
    e.map((h) => h._obb.aabb);
    let n, s, r, a, o = Number.MAX_VALUE, d = Number.MAX_VALUE;
    e.sort((h, c) => _.distance(t.center, t.middle, c._obb.aabb.center, c._obb.aabb.middle) - _.distance(t.center, t.middle, h._obb.aabb.center, h._obb.aabb.middle));
    let l = 0;
    for (let h = 0; h < e.length; h++) {
      let c = e[h], p = c._obb.aabb;
      p.isIntersectRect(t) || (l = Math.abs(t.top - p.top), l <= d && l <= i && (a = "top", s = c, d = l), l = Math.abs(t.bottom - p.bottom), l <= d && l <= i && (a = "bottom", s = c, d = l), l = Math.abs(t.middle - p.middle), l <= d && l <= i && (a = "middle", s = c, d = l), l = Math.abs(t.left - p.left), l <= o && l < i && (r = "left", n = c, o = l), l = Math.abs(t.right - p.right), l <= o && l < i && (r = "right", n = c, o = l), l = Math.abs(t.center - p.center), l <= o && l < i && (r = "center", n = c, o = l));
    }
    return { horizontalType: r, verticalType: a, horizontalTarget: n, verticalTartet: s };
  }
}
function V(u, t) {
  let e, i = u.stage.getCurrentLayer(), n = u.stage.camera, s = i.getAllNodes().filter((a) => {
    let o = a;
    return o.visible && o.isSelected != 1 && o.pointerEnabled && n.canSee(o);
  }), r = t.filter((a) => a.isOutOfParent() || a.parent === i);
  for (let a = 0; a < r.length && (e = ft(r[a], s), e == null); a++)
    ;
  return e == null && (e = i, r = r.filter((a) => a.parent !== i)), { parent: e, objects: r };
}
function ft(u, t) {
  const e = u.getAABB(), i = t.filter((n) => n !== u.parent && n !== u && !u.contains(n));
  for (let n = i.length - 1; n >= 0; n--) {
    const s = i[n];
    if (s.getAABB().isIntersectRect(e))
      return s;
  }
  return null;
}
const mt = R.w != null ? R.w.charAt(3) : "1";
class xt {
  constructor(t) {
    this.editor = t, this.init();
  }
  init() {
    let t = this.editor, e = t.stage;
    e.inputSystem;
    let i = t.handlerLayer;
    e.camera.localView.mode == null && (e.addEventListener("modeChange", function(n) {
      let s = n.newMode, r = t.nodeResizeBox, a = t.linkCtrlBox, o = t.dropToBox, d = t.anchorsBox;
      s == Z.edit ? (r.parent == null && i.addChild(r), d.parent == null && i.addChild(d), a.parent == null && i.addChild(a), o.parent == null && i.addChild(o)) : (r.parent != null && i.removeChild(r), d.parent != null && i.removeChild(d), a.parent != null && i.removeChild(a), o.parent != null && i.removeChild(o)), t.update();
    }), e.selectedGroup.addEventListener("dragend", function(n) {
      t.selectedGroupDragHandler(n, e.selectedGroup.getTopObjects());
    }), e.selectedGroup.addEventListener("dragstart", function(n) {
      t.selectedGroupDragEndHandler(n, e.selectedGroup.getTopObjects());
    }));
  }
  deleteHandler() {
    let t = this.editor, e = t.stage.selectedGroup;
    if (mt != "1")
      return null;
    let i = e.getTopObjects();
    if (e.removeAll(), t.anchorsBox.clearTarget(), t.nodeResizeBox.clearTarget(), t.linkCtrlBox.clearTarget(), i.length == 0)
      return;
    const n = new w("deleteBefore", { target: i, cancelable: !0 });
    if (t.dispatchEvent(n), n.defaultPrevented)
      return;
    t.instanceManager.delete(i);
    const s = new w("delete", { target: i });
    t.dispatchEvent(s);
  }
  pointerdownHandler(t) {
    const e = this.editor;
    if (e.stage.getCurrentLayer() == null)
      return void e._hideAllAttaches();
    const i = e.stage.inputSystem;
    let n = e.handlerLayer, s = e.nodeResizeBox, r = e.linkCtrlBox;
    e.alignManager.pointerdownHandler(i);
    let a = n._pickUp();
    if (e.controlTarget = a, e.anchorsBox.hide(), a != null) {
      let o = a.parent;
      return o !== s ? s.hide() : o !== r && r.hide(), a.pointerdownHandler(i), void i.event.preventDefault();
    }
    r.hide(), s.hide();
  }
  mousewheelHandler(t) {
  }
  dblclickHandler(t) {
  }
  pointupHandler(t) {
    const e = this.editor, i = e.stage.inputSystem;
    e.alignManager.pointerupHandler(i);
    let n = e.stage, s = e.controlTarget;
    if (s != null)
      return i.isDragEnd && !(s instanceof z) && e.recordEnd("控制点"), s.pointerupHandler(i), i.event.preventDefault(), void e.update();
    if (i.button == 2)
      return;
    let r = n.inputSystem.target, a = e.nodeResizeBox, o = e.linkCtrlBox;
    if (r != null ? (e.isEditable(r) && (r instanceof m ? o.attachTo(r) : r instanceof C && a.attachTo(r)), e.isConnectable(r) && e.anchorsBox.setTarget(r)) : (e.anchorsBox.clearTarget(), a.clearTarget(), o.clearTarget()), e.dropToBox.currObject != null) {
      let d = e.stage.selectedGroup.getTopObjects(), l = V(e, d), h = l.parent;
      l.objects.forEach((c) => {
        c.changeParent(h), J._upgradeLinks(c).length;
      });
    }
    e.dropToBox.attachTo(null);
  }
  _dragHandler(t) {
    const e = this.editor, i = e.stage.inputSystem;
    if (i.buttons == 2)
      return;
    e.keyboard.isKeydown("Shift") && e.stage.setCursor(x.crosshair);
    let n = e.controlTarget;
    if (n != null)
      return i.isDragStart && !(n instanceof z) && e.record("控制点"), n.dragHandler(i), i.event instanceof MouseEvent && i.event.defaultPrevented == 1 ? void 0 : void i.event.preventDefault();
    e.alignManager._dragHandler(i), e.dropToBox.hide();
    const s = e.keyConfig.DropTo_leader;
    if (e.stage.inputSystem.target && e.keyboard.isKeydown(s)) {
      let r = e.stage.selectedGroup.getTopObjects(), a = V(e, r).parent;
      (a instanceof C && e.isEditable(a) || a instanceof j) && e.dropToBox.attachTo(a);
    }
  }
  pointermoveHandler(t) {
    const e = this.editor;
    let i = e.stage;
    const n = i.inputSystem, s = i.handlerLayer;
    if (i.setCursor(x.auto), e.keyboard.isKeydown("Control") && e.anchorsBox.findConnectableEndpoint([]))
      return;
    let r = s._pickUp();
    if (r !== e.mouseOverTarget && (e.mouseOverTarget != null && e.mouseOverTarget.pointeroutHandler(n), r != null && r.pointerenterHandler(n)), e.mouseOverTarget = r, r != null)
      return void r.pointermoveHandler(n);
    let a = i.getCurrentLayer()._pickUp();
    a != null && (e.stage.setCursor(x.move), a instanceof C && e.isConnectable(a) && e.anchorsBox.setTarget(a));
  }
  pointerenterHandler(t) {
    const e = this.editor;
    e.linkCtrlBox.pointerenterStageHandler(), e.nodeResizeBox.pointerenterStageHandler(), e.anchorsBox.pointerenterStageHandler();
  }
  pointeroutHandler(t) {
    const e = this.editor;
    e.recordName != null && e.recordInterrupt(), e.linkCtrlBox.pointeroutStageHandler(), e.nodeResizeBox.pointeroutStageHandler(), e.anchorsBox.pointeroutStageHandler();
  }
  selectedGroupDragHandler(t, e) {
    const i = this.editor;
    if (i.stage.inputSystem.isDragStart && i.record("对象拖拽"), e.length == 1) {
      const n = e[0];
      i.stage.camera.toScreenRect(n._obb.aabb).getCenter();
    }
  }
  selectedGroupDragEndHandler(t, e) {
    const i = this.editor;
    i.stage.inputSystem.isPointerOn ? (e.forEach((n) => {
      n.isNode && (n.x = Math.round(n.x), n.y = Math.round(n.y));
    }), i.recordEnd("对象拖拽")) : i.recordInterrupt();
  }
}
class St {
  constructor(t) {
    this.editor = t;
  }
  delete(t) {
    let e = this.editor;
    e.record("删除"), t.forEach(function(i) {
      k.unlinks(i), i.removeFromParent();
    });
    {
      let i = e.stage.camera.localView, n = i.getObject();
      n && !(n instanceof j) && t.includes(n) && i.quit();
    }
    e.showOpTooltip("删除"), e.recordEnd("删除");
  }
  _addNewInstance(t) {
    this.editor.stage.camera.localView.getObject().addChild(t);
  }
  create(t) {
    let e = this.editor.stage.camera.localView.getMouseXY(), i = e.x, n = e.y, s = F.newInstance(t);
    if (s instanceof C)
      return s.x = i, s.y = n, s.width = 64, s.height = 64, this._addNewInstance(s), s;
    if (s instanceof m)
      return s.setBegin({ x: i - 40, y: n }), s.setEnd({ x: i + 40, y: n + (t == "Link" ? 0 : 80) }), this._addNewInstance(s), s;
    throw new Error("unknow classname:" + t);
  }
  lineDrawn(t, e, i) {
    let n = this.editor, s = F.newInstance(n.getLinkClassName());
    s.setBegin(i), s.setEnd(e);
    const r = Object.assign({}, n.newLinkProperties);
    r.css && (s.setStyles(r.css), delete r.css), Object.keys(r).forEach((o) => {
      let d = r[o];
      s[o] = typeof d == "function" ? d() : d;
    });
    let a = t.isNode || t.isLink ? t.parent : n.getCurrentLayer();
    return s.zIndex = N.EditorNewLink, a.addChild(s), n.dispatchEvent(new w("linkbegin", { target: s })), s;
  }
  lineDrawingFinished(t) {
    let e = new w("linkend", { target: t });
    this.editor.dispatchEvent(e);
  }
}
class Ct {
  constructor(t) {
    this.editor = t;
  }
  changeLevel(t, e) {
    e == "上移一层" ? k.raise(t) : e == "下移一层" ? k.lower(t) : e == "移至顶部" ? k.raiseToTop(t) : e == "移至底部" && k.lowerToBottom(t);
  }
  evenSpacing(t) {
    let e = this.editor.stage.selectedGroup.getTopObjects();
    e = e.filter((i) => i.isNode || i instanceof m && U(i)), e.length;
  }
  align(t) {
    const e = this.editor;
    let i = e.stage.selectedGroup.getTopObjects();
    if (i = i.filter((r) => r.isNode || r instanceof m && U(r)), i.length == 0)
      return;
    let n = i.map((r) => r._obb.aabb), s = Y.unionRects(n);
    for (let r = 0; r < i.length; r++) {
      let a = i[r], o = a._obb.aabb;
      t == "左对齐" ? a.translateWith(s.x - o.x, 0) : t == "右对齐" ? a.translateWith(s.right - o.right, 0) : t == "顶部对齐" ? a.translateWith(0, s.y - o.y) : t == "底部对齐" ? a.translateWith(0, s.bottom - o.bottom) : t == "水平中心对齐" ? a.translateWith(0, s.middle - o.middle) : t == "垂直中心对齐" && a.translateWith(s.center - o.center, 0);
    }
    e.update();
  }
  doGridLayout() {
    let t = this.editor.stage, e = t.selectedGroup.getTopObjects().filter((o) => o instanceof C);
    if (e.length < 2)
      return;
    let i = Math.ceil(Math.sqrt(e.length)), n = J.getUnionRect(e).getCenter(), s = $.grid(i, i), r = t.layoutSystem.pointsLayout(e, s), a = e[0].width * i;
    r.resize(a, a), r.translate(n.x, n.y), r.doLayout({ effect: "easeInQuart", duration: 300 });
  }
}
function U(u) {
  return !u.begin.isDisplayObjectHost() && !u.end.isDisplayObjectHost();
}
class vt {
  constructor(t) {
    this._disabled = !0, this.editor = t;
  }
  init() {
    const t = this.editor.handlerLayer, e = new m();
    e.name = "guidLineW", e.pointerEnabled = !1, e.setStyles(g.crossGuildLine.styleH), e.hide(), this.guildlineH = e, t.addChild(this.guildlineH);
    const i = new m();
    i.name = "guidLineS", i.pointerEnabled = !1, i.setStyles(g.crossGuildLine.styleV), i.hide(), this.guildlineV = i, t.addChild(this.guildlineV);
  }
  disable() {
    this._disabled = !0, this.hideGuidLine();
  }
  enable() {
    this._disabled = !1, this.guildlineH == null && this.init();
  }
  updateGuildLine() {
    if (this._disabled)
      return;
    const t = this.editor.stage, e = this.guildlineH, i = this.guildlineV, n = t.inputSystem, s = n.x, r = n.y;
    e.setBegin({ x: 0, y: r }), e.setEnd({ x: t.width, y: r }), e.show(), i.setBegin({ x: s, y: 0 }), i.setEnd({ x: s, y: t.height }), i.show();
  }
  hideGuidLine() {
    this.guildlineH.hide(), this.guildlineV.hide();
  }
}
class wt extends X {
  constructor(t) {
    super(), this.existObjectMap = /* @__PURE__ */ new WeakMap(), this.keyConfig = M, this.config = g, this.LinkClassName = "AutoFoldLink", this.newLinkProperties = {}, this.DataCenter = ht, this.imageToBase64 = !1, this._disableEditMap = /* @__PURE__ */ new Map(), this._disableConnectMap = /* @__PURE__ */ new Map(), this.stage = t, t.editor = this, this.handlerLayer = t.handlerLayer, this.keyboard = t.keyboard, this.clipboardManager = new gt(this), this.instanceManager = new St(this), this.editorEventManager = new xt(this), this.keyManager = new pt(this), this.nodeResizeBox = new dt(this), this.anchorsBox = new nt(this), this.linkCtrlBox = new rt(this), this.dropToBox = new yt(this), this.popupMenu = function(e) {
      const i = e.stage;
      let n = new tt(i, `
<div class="header">编辑</div>
<a>剪切</a>
<a>复制</a>
<a>粘贴</a>
<a>删除</a> 
<hr></hr>
<div class="header">前后</div>
<a>上移一层</a>
<a>下移一层</a>
<a>移至顶部</a>
<a>移至底部</a>
<div class="header">对齐</div>
<a>左对齐</a>
<a>右对齐</a>
<a>顶部对齐</a>
<a>底部对齐</a>
<a>水平中心对齐</a>
<a>垂直中心对齐</a>
`);
      return n.addEventListener("select", function(s) {
        const r = s.item;
        let a = i.inputSystem.target;
        r == "剪切" ? e.clipboardManager.cutHandler() : r == "复制" ? e.clipboardManager.copyHandler() : r == "粘贴" ? e.clipboardManager.pasteHandler() : r == "删除" && e.editorEventManager.deleteHandler(), a != null && (r == "上移一层" || r == "下移一层" || r == "移至顶部" || r == "移至底部" ? e.layoutManager.changeLevel(a, r) : r == "左对齐" ? e.layoutManager.align("左对齐") : r == "右对齐" ? e.layoutManager.align("右对齐") : r == "顶部对齐" ? e.layoutManager.align("顶部对齐") : r == "底部对齐" ? e.layoutManager.align("底部对齐") : r == "水平中心对齐" ? e.layoutManager.align("水平中心对齐") : r == "垂直中心对齐" ? e.layoutManager.align("垂直中心对齐") : r == "左右等距" ? e.layoutManager.evenSpacing("左右等距") : r == "上下等距" && e.layoutManager.evenSpacing("上下等距"), e.update());
      }), n;
    }(this), this.stage.inputSystem._clearTarget(), this.controlTarget = null, this.mouseOverTarget = null, this.inputTextfield = new et(t), this.redoUndoSys = new ut(this), this.layoutManager = new Ct(this), this.alignManager = new bt(this), this.opTooltip = new it(t), Object.assign(this.opTooltip.domElement.style, { paddingLeft: "20px", paddingRight: "20px", color: "black" }), this.pointerCrossLineManager = new vt(this);
  }
  setLinkClassName(t) {
    this.LinkClassName = t;
  }
  getLinkClassName() {
    return this.LinkClassName;
  }
  getCurrentLayer() {
    return this.stage.getCurrentLayer();
  }
  defineKeys(t) {
    Object.assign(this.keyConfig, t);
  }
  showOpTooltip(t) {
    g.operationTip.enable && (this.opTooltip.setHtml(t), this.opTooltip.showAt(0.5 * this.stage.width, 0.5 * this.stage.height), this.opTooltip.fadeOut());
  }
  saveHandler(t, e = !1) {
    let i = this;
    if (e == 1)
      return void this.stage.toJSONWithBase64().then((r) => {
        let a = JSON.stringify(r);
        this.DataCenter.setItem(g.data.localLastDocName, a), i.dispatchEvent(new w("save", { details: { imageToBase64: e, json: a } }));
      });
    let n = this.stage.toJSON(), s = JSON.stringify(n);
    this.DataCenter.setItem(g.data.localLastDocName, s), i.dispatchEvent(new w("save", { details: { imageToBase64: e, json: s } }));
  }
  openLasted() {
    let t = this.DataCenter.getItem(g.data.localLastDocName);
    if (t != null) {
      let e = JSON.parse(t);
      return this.stage.fromJSON(e);
    }
    return Promise.resolve(!1);
  }
  _checkState() {
    let t = this.stage.getCurrentLayer();
    return !(t == null || !t.pointerEnabled) || (this._hideAllAttaches(), !1);
  }
  dblclickHandler(t) {
    this.editorEventManager.dblclickHandler(t), this.update();
  }
  wheelHandler(t) {
    this.editorEventManager.mousewheelHandler(t), this.update();
  }
  pointerdownHandler(t) {
    this._checkState() && (this.editorEventManager.pointerdownHandler(t), this.update(), this.stage.inputSystem.event.defaultPrevented || this.popupMenu.hide());
  }
  pointerupHandler(t) {
    if (!this._checkState())
      return;
    this.editorEventManager.pointupHandler(t), this.update();
    let e = this.stage.inputSystem;
    e.button == 2 ? !e.isDragEnd && this.popupMenu.showAt(e.x, e.y) : this.popupMenu.hide();
  }
  _dragHandler(t) {
    this.editorEventManager._dragHandler(t), this.update(), this.pointerCrossLineManager.updateGuildLine();
  }
  pointermoveHandler(t) {
    if (this._checkState())
      return this.stage.inputSystem.isDraging ? this._dragHandler(t) : (this.editorEventManager.pointermoveHandler(t), this.controlTarget && this.stage.handlerLayer.update(), void this.pointerCrossLineManager.updateGuildLine());
  }
  pointerenterHandler(t) {
    this.editorEventManager.pointerenterHandler(t), this.update();
  }
  pointeroutHandler(t) {
    this.editorEventManager.pointeroutHandler(t), this.update();
  }
  dropHandler(t) {
    this.stage.inputSystem.event.defaultPrevented || this.dispatchEvent(t);
  }
  dragoverHandler(t) {
    t.preventDefault(), this.dispatchEvent(t);
  }
  selectedGroupDragHandler(t, e) {
    this.editorEventManager.selectedGroupDragHandler(t, e);
  }
  selectedGroupDragEndHandler(t, e) {
    this.editorEventManager.selectedGroupDragEndHandler(t, e);
  }
  recordInterrupt() {
    this.recordName != null && this.recordEnd(this.recordName), this.recordName = null, this.lastLayerState = null;
  }
  record(t) {
    let e = this.getCurrentLayer();
    if (e == null)
      return;
    let i = e.stage.serializerSystem;
    this.recordName, this.recordName = t, this.lastLayerState = i._getState(e, this.existObjectMap);
  }
  recordEnd(t) {
    this.recordName, this.recordName = null;
    const e = this.existObjectMap;
    let i = this.getCurrentLayer();
    if (i == null)
      return;
    let n = i.stage.serializerSystem, s = this.lastLayerState, r = n._getState(i, e);
    this.redoUndoSys.push(t, function() {
      n._restoreFromState(r, e);
    }, function() {
      n._restoreFromState(s, e);
    });
  }
  update() {
    this.dropToBox.update(), this.nodeResizeBox.update(), this.linkCtrlBox.update(), this.anchorsBox.update();
  }
  _hideAllAttaches() {
    this.dropToBox.hide(), this.nodeResizeBox.hide(), this.linkCtrlBox.hide(), this.anchorsBox.hide(), this.nodeResizeBox.clearTarget(), this.linkCtrlBox.clearTarget(), this.anchorsBox.clearTarget();
  }
  openJson(t) {
    return this.stage.fromJSON(t).then(() => {
      this.dispatchEvent(new w("open", { details: { json: t } }));
    });
  }
  showTip(t, e = "") {
    let i = new Event("log");
    i.msg = t + e, this.dispatchEvent(i);
  }
  create(t) {
    return this.instanceManager.create(t);
  }
  mockDrop(t) {
    const e = t.changedTouches[0], i = this.stage.handlerLayer.render.domElement.getBoundingClientRect(), n = e.clientX - i.left, s = e.clientY - i.top;
    this.stage.inputSystem.x = n, this.stage.inputSystem.y = s, this.dispatchEvent(new PointerEvent("drop"));
  }
  clearCtrlBoxs() {
    this.anchorsBox.clearTarget(), this.nodeResizeBox.clearTarget(), this.linkCtrlBox.clearTarget();
  }
  toogleLocalView() {
    let t = this.stage.inputSystem.target;
    t === this.stage.camera.localView.object ? this.stage.camera.localView.quit() : this.stage.camera.localView.enter(t);
  }
  sendKey(t, e) {
    this.keyboard.sendKey(t, e);
  }
  onEsc() {
    this.anchorsBox.cancel();
  }
  setEditable(t, e) {
    e ? this._disableEditMap.delete(t) : this._disableEditMap.set(t, !0);
  }
  setConnectable(t, e) {
    e ? this._disableConnectMap.delete(t) : this._disableConnectMap.set(t, !0);
  }
  isEditable(t) {
    return t != null && this._disableEditMap.get(t) == null && !!E.isUpdateMatrixed(t) && (!(t.parent instanceof m) || t !== t.parent.label && t !== t.parent.beginArrow && t !== t.parent.endArrow);
  }
  isConnectable(t) {
    if (t == null || !t.visible || !t.pointerEnabled)
      return !1;
    let e = t.parent;
    return (!(e instanceof m) || t !== e.label && e.beginArrow !== t && e.endArrow !== t) && this._disableConnectMap.get(t) == null;
  }
  getEditInfo(t, e) {
    let i = { disableEdit: [], disableConnect: [] };
    for (let n = 0; n < t.length; n++) {
      let s = t[n], r = e.get(s);
      !this.isEditable(s) && r != null && i.disableEdit.push(r), !this.isConnectable(s) && r != null && i.disableConnect.push(r);
    }
    return i.disableEdit.length == 0 && delete i.disableEdit, i.disableConnect.length == 0 && delete i.disableConnect, i.disableEdit || i.disableConnect ? i : null;
  }
  fromEditInfo(t, e) {
    if (t.disableEdit != null)
      for (let i = 0; i < t.disableEdit.length; i++) {
        let n = e[t.disableEdit[i]];
        this.setEditable(n, !1);
      }
    if (t.disableConnect != null)
      for (let i = 0; i < t.disableConnect.length; i++) {
        let n = e[t.disableConnect[i]];
        this.setConnectable(n, !1);
      }
  }
  reset() {
    this._hideAllAttaches(), this.redoUndoSys.clear(), this.clipboardManager.reset(), this.pickedObject = null, this.mouseOverTarget = null, this.controlTarget = null, this.inputTextfield.hide();
  }
}
wt.KeysConfig = M;
export {
  wt as Editor,
  kt as IconsPanel,
  Et as PropertiesPanel
};
