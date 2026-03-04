import { JTopoEvent as T, EventTarget as k, Node as B, Link as H, Rectangle as R, setProto as v, RegSystem as b, AENode as O, Animation as w, Shape as F, AnchorUsageType as q, ShapeNode as J, ImageNode as U } from "@jtopo/core";
class X extends T {
}
class wt extends k {
  constructor(t, e) {
    super(), this.stage = t, this.domElement = this.setHtml(e);
  }
  remove() {
    this.domElement != null && this.domElement.remove();
  }
  setHtml(t) {
    this.html = t, this.remove();
    let e = document.createElement("div");
    return e.classList.add("jtopo_popoupmenu"), this.stage.uiContainer.appendChild(e), e.innerHTML = t, this.initEvent(e), this.domElement = e, this.hide(), e;
  }
  initEvent(t) {
    let e = this;
    t.querySelectorAll("a").forEach(function(i) {
      i.addEventListener("click", function(o) {
        let n = new X("select", { cancelable: !0, item: this.innerHTML });
        e.dispatchEvent(n), n.defaultPrevented || e.hide();
      });
    });
  }
  showAt(t, e) {
    let i = this.domElement, o = this.stage;
    i.style.display = "block", e + i.offsetHeight >= o.height && e > o.height / 2 && (e -= i.offsetHeight), t + i.offsetWidth >= o.width && t > o.width / 2 && (t -= i.offsetWidth), i.style.left = t + "px", i.style.top = e + "px";
  }
  hide() {
    this.domElement.style.display = "none";
  }
}
class bt extends k {
  constructor(t) {
    super(), this.stage = t, this.domElement = document.createElement("div"), this.domElement.classList.add("jtopo_tooltip"), this.domElement.style.transition = "opacity 1s ease-in-out", this.stage.uiContainer.appendChild(this.domElement), this.initEvent(), this.fadeOut();
  }
  disable() {
    this.domElement && this.domElement.remove();
  }
  enabled() {
    this.domElement && this.domElement.parentNode == null && this.stage.uiContainer.appendChild(this.domElement);
  }
  setHtml(t) {
    return this.domElement.innerHTML = t, this.domElement;
  }
  initEvent() {
    const t = this, e = this.stage.inputSystem;
    e.addEventListener("pointerdown", function() {
      t.fadeOut();
    }), e.addEventListener("pointerup", function() {
      t.fadeOut();
    }), e.addEventListener("pointermove", function() {
      e.mouseoverTarget == null && t.fadeOut();
    });
  }
  showAt(t, e) {
    this.domElement.style.display = "block", this.domElement.style.left = t + "px", this.domElement.style.top = e + "px", requestAnimationFrame(() => {
      this.domElement.style.opacity = "1";
    });
  }
  fadeOut() {
    this.domElement.style.opacity = "0", setTimeout(() => {
      this.domElement.style.opacity === "0" && (this.domElement.style.display = "none");
    }, 100);
  }
}
let D = document.createElement("div");
D.innerHTML = `
<svg viewBox="0 0 24 24" id="zoom-in">
<path d="M4,20 L9.58788778,14.4121122"/>
<path d="M14,16 C10.6862915,16 8,13.3137085 8,10 C8,6.6862915 10.6862915,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,13.3137085 17.3137085,16 14,16 Z"/>
<path d="M16.6666667 10L11.3333333 10M14 7.33333333L14 12.6666667"/>
</svg>
<svg viewBox="0 0 24 24" id="zoom-out">
<path d="M14,16 C10.6862915,16 8,13.3137085 8,10 C8,6.6862915 10.6862915,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,13.3137085 17.3137085,16 14,16 Z"/>
<path d="M16.6666667 10L11.3333333 10M4 20L9.58788778 14.4121122"/>
</svg>
<svg viewBox="0 0 24 24" id="back-left">
<path d="M5,17 L5,15 C5,10.0294373 8.80557963,6 13.5,6 C18.1944204,6 22,10.0294373 22,15"/>
<polyline points="8 15 5 18 2 15"/>
</svg>
<svg viewBox="0 0 24 24" id="align-center">
<path d="M8 10L16 10M6 6L18 6M6 14L18 14M8 18L16 18"/>
</svg>
<svg viewBox="0 0 24 24" id="edit">
<path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"/>
</svg>
<svg viewBox="0 0 24 24" id="lock-alt">
<rect width="14" height="10" x="5" y="11"/>
<path d="M12,3 L12,3 C14.7614237,3 17,5.23857625 17,8 L17,11 L7,11 L7,8 C7,5.23857625 9.23857625,3 12,3 Z"/>
<circle cx="12" cy="16" r="1"/>
</svg>
<svg viewBox="0 0 24 24" id="lock-open">
<path d="M7,7.625 L7,7 C7,4.23857625 9.23857625,2 12,2 L12,2 C14.7614237,2 17,4.23857625 17,7 L17,11"/>
<rect width="14" height="10" x="5" y="11"/>
</svg>
<svg viewBox="0 0 24 24" id="pan">
<path d="M20,14 L20,17 C20,19.209139 18.209139,21 16,21 L10.0216594,21 C8.75045497,21 7.55493392,20.3957659 6.80103128,19.3722467 L3.34541668,14.6808081 C2.81508416,13.9608139 2.94777982,12.950548 3.64605479,12.391928 C4.35756041,11.8227235 5.38335813,11.8798792 6.02722571,12.5246028 L8,14.5 L8,13 L8.00393081,13 L8,11 L8.0174523,6.5 C8.0174523,5.67157288 8.68902517,5 9.5174523,5 C10.3458794,5 11.0174523,5.67157288 11.0174523,6.5 L11.0174523,11 L11.0174523,4.5 C11.0174523,3.67157288 11.6890252,3 12.5174523,3 C13.3458794,3 14.0174523,3.67157288 14.0174523,4.5 L14.0174523,11 L14.0174523,5.5 C14.0174523,4.67157288 14.6890252,4 15.5174523,4 C16.3458794,4 17.0174523,4.67157288 17.0174523,5.5 L17.0174523,11 L17.0174523,7.5 C17.0174523,6.67157288 17.6890252,6 18.5174523,6 C19.3458794,6 20.0174523,6.67157288 20.0174523,7.5 L20.0058962,14 L20,14 Z"/>
</svg>
<svg viewBox="0 0 24 24" id="apps-alt">
<rect x="5" y="5" width="2" height="2"/>
<rect x="11" y="5" width="2" height="2"/>
<rect x="17" y="5" width="2" height="2"/>
<rect x="5" y="11" width="2" height="2"/>
<rect x="11" y="11" width="2" height="2"/>
<rect x="17" y="11" width="2" height="2"/>
<rect x="5" y="17" width="2" height="2"/>
<rect x="11" y="17" width="2" height="2"/>
<rect x="17" y="17" width="2" height="2"/>
</svg>
<svg viewBox="0 0 24 24" id="maximise">
<polyline points="21 16 21 21 16 21"/>
<polyline points="8 21 3 21 3 16"/>
<polyline points="16 3 21 3 21 8"/>
<polyline points="3 8 3 3 8 3"/>
</svg>
<svg viewBox="0 0 24 24" id="minimise">
<polyline points="8 3 8 8 3 8"/>
<polyline points="21 8 16 8 16 3"/>
<polyline points="3 16 8 16 8 21"/>
<polyline points="16 21 16 16 21 16"/>
</svg>
<svg viewBox="0 0 24 24" id="download">
<path d="M12,3 L12,16"/>
<polyline points="7 12 12 17 17 12"/>
<path d="M20,21 L4,21"/>
</svg>
<svg viewBox="0 0 24 24" id="rectangle">
<rect width="18" height="18" x="3" y="3"/>
</svg>
<svg viewBox="0 0 24 24" id="cursor">
<polygon points="7 20 7 4 19 16 12 16 7 21"/>
</svg>
<svg viewBox="0 0 24 24" id="search">
<path d="M14.4121122,14.4121122 L20,20"/>
<circle cx="10" cy="10" r="6"/>
</svg>
<svg viewBox="0 0 24 24" id="eye">
<path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/>
<circle cx="12" cy="12" r="3"/>
</svg>
<svg viewBox="0 0 24 24" id="save">
<path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z"/>
<rect width="10" height="8" x="7" y="13"/>
<rect width="8" height="5" x="8" y="3"/>
</svg>
<svg viewBox="0 0 24 24" id="image">
<rect width="18" height="18" x="3" y="3"/>
<path stroke-linecap="round" d="M3 14l4-4 11 11"/>
<circle cx="13.5" cy="7.5" r="2.5"/>
<path stroke-linecap="round" d="M13.5 16.5L21 9"/>
</svg>
<svg viewBox="0 0 24 24" id="upload">
<path d="M12,4 L12,17"/>
<polyline points="7 8 12 3 17 8"/>
<path d="M20,21 L4,21"/>
</svg>
`;
let _ = {};
function f(a) {
  return _.get(a).outerHTML;
}
_.get = function(a) {
  return D.querySelector("#" + a);
};
let G = `
<div class="group">
<button title="默认" class="item active" group='mode' iconId='cursor'>` + f("cursor") + `</button>
<button title="编辑模式" edit="true" class="item" group='mode' iconId='edit' style="display:none">` + f("edit") + `</button>
<button title="框选模式" class="item" group='mode' iconId='rectangle'>` + f("rectangle") + `</button>
<button title="拖拽模式"  class="item" group='mode' iconId='pan'>` + f("pan") + `</button>
<button title="锁定模式" class="item" group='mode' iconId='lock-alt'>` + f("lock-alt") + `</button>
</div>
<div class="group">
<button title="放大"  class="item" iconId='zoom-in'>` + f("zoom-in") + `</button>
<button title="缩小"  class="item" iconId='zoom-out'>` + f("zoom-out") + `</button>
<button title="居中" class="item" iconId='align-center'>` + f("align-center") + `</button>
<button title="缩放至画布" class="item" iconId='minimise'>` + f("minimise") + `</button>
<button title="取消缩放" class="item" iconId='back-left'>` + f("back-left") + `</button>
</div>
<div class="group">
<button title="缩略图" class="item" iconId='eye'>` + f("eye") + `</button>
<button title="浏览器全屏" class="item" iconId='maximise'>` + f("maximise") + `</button>
<input title="查找" type="text" placeholder="查找" value=""></input>
<button class="item" iconId='search'>` + _.get("search").outerHTML + `</button>
</div>
<div class="group">
<button title="导出PNG" class="item" iconId='image'>` + f("image") + `</button>
<button title="打开本地文件" class="item" iconId='upload'>` + f("upload") + `</button>
<button title="保存到本地" class="item" iconId='save'>` + f("save") + `</button>
<div style="display:none;"><input type="file"/></div>
</div>
`;
class vt {
  constructor(t) {
    this.imageToBase64 = !0, this.stage = t, this.initToolbar(t, G), t.domElement.prepend(this.getDom());
    let e = this;
    setTimeout(function() {
      e.initActiveStatus();
    }, 200);
  }
  showButton(t) {
    let e = this.domObj.querySelector('button[title="' + t + '"]');
    e != null && (e.style.display = "block");
  }
  hideButton(t) {
    let e = this.domObj.querySelector('button[title="' + t + '"]');
    e != null && (e.style.display = "none");
  }
  getDom() {
    return this.domObj;
  }
  show() {
    this.domObj.style.display = "block";
  }
  hide() {
    this.domObj.style.display = "none";
  }
  remove() {
    this.domObj.remove();
  }
  initActiveStatus() {
    if (this.stage.mode == "edit") {
      let t = document.querySelector("button[iconid='edit']");
      this.activeButton(t);
    }
  }
  initToolbar(t, e) {
    let i = this, o = document.createElement("div");
    this.domObj = o, o.classList.add("jtopo_toolbar"), o.innerHTML = e;
    let n = o.querySelectorAll("button");
    this.buttons = n;
    let s = o.querySelector('input[type="file"]'), l = s.parentNode;
    function r(p) {
      l.innerHTML = '<input type="file"/>', h();
      let m = p.target.files[0];
      const g = new FileReader();
      g.readAsText(m), g.onload = function() {
        try {
          const x = JSON.parse(this.result);
          i.stage.fromJSON(x).then(() => {
            document.title = m.name;
          });
        } catch (x) {
          console.log(x), alert("加载出现错误");
        }
      };
    }
    function h() {
      s = o.querySelector('input[type="file"]'), s.addEventListener("change", r);
    }
    function c() {
      let p = t.getCurrentLayer(), m = o.querySelector('input[type="text"]').value;
      if (m.length > 0) {
        let g = p.querySelector(function(x) {
          return x.text != null && x.text.indexOf(m) != -1;
        });
        g && (t.camera.lookAtObject(g), t.effectSystem.flash(g).play());
      }
    }
    h(), this.fileInput = s;
    let d = { cursor: function() {
      t.setMode("normal");
    }, rectangle: function() {
      t.setMode("select");
    }, pan: function() {
      t.setMode("drag");
    }, edit: function() {
      t.setMode("edit");
    }, "lock-alt": function() {
      t.setMode("view");
    }, eye: function() {
      t.overview == null || t.overview.visible == 0 ? t.showOverview() : t.hideOverview();
    }, "zoom-in": function() {
      t.camera.zoomIn();
    }, "zoom-out": function() {
      t.camera.zoomOut();
    }, "back-left": function() {
      t.camera.lookAt(0, 0), t.camera.zoom(1);
    }, minimise: function() {
      t.camera.zoomToFit();
    }, "align-center": function() {
      t.camera.lookAtContentCenter();
    }, maximise: function() {
      t.fullWindow();
    }, image: function() {
      t.saveImageInfo();
    }, save: async function() {
      let p = prompt("要保存的文件名："), m = i.imageToBase64;
      if (p != null)
        if (m)
          t.toJSONWithBase64().then((g) => {
            let x = JSON.stringify(g);
            t.download(p + ".json", x);
          });
        else {
          let g = t.toJSON(), x = JSON.stringify(g);
          t.download(p + ".json", x);
        }
    }, upload: function() {
      s.click();
    }, search: c };
    function u(p) {
      p.onclick = function() {
        let m = p.getAttribute("iconId");
        d[m](), i.activeButton(p);
      };
    }
    o.querySelector("input").onkeydown = function(p) {
      p.key == "Enter" && c();
    };
    for (let p = 0; p < n.length; p++)
      u(n[p]);
  }
  activeButton(t) {
    let e = t;
    typeof t == "string" && (e = this.domObj.querySelector('button[title="' + t + '"]'));
    let i = e.getAttribute("group");
    i != null && (this.removeAllActive(i), e.classList.add("active"));
  }
  removeAllActive(t) {
    let e = this.buttons;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      t == o.getAttribute("group") && o.classList.remove("active");
    }
  }
}
class A extends T {
}
class kt extends k {
  constructor(t) {
    super(), this.disabled = !1, this.enabledModes = ["edit"], this.stage = t;
    let e = document.createElement("textarea");
    e.classList.add("jtopo_input_textfield"), this.stage.uiContainer.appendChild(e), this.measurementSpan = this.createMeasurementSpan();
    let i = this;
    e.onkeydown = function(o) {
      i.onkeydown(o);
    }, e.oninput = function(o) {
      i.inputHandler(o);
    }, this.textarea = e, t.inputSystem.addEventListener("dblclick", this.dblclickHandler.bind(this)), t.inputSystem.addEventListener("pointerdown", this.pointerdownHandler.bind(this)), t.inputSystem.addEventListener("pointerup", this.pointerupHandler.bind(this)), t.inputSystem.addEventListener("pointermove", this.pointerHandler.bind(this)), document.addEventListener("pointerdown", this.docPointdownHandler.bind(this)), t.camera.addEventListener("zoom", this.zoomHandler.bind(this));
  }
  zoomHandler(t) {
    this.hide();
  }
  docPointdownHandler(t) {
    let e = t.target;
    e != null ? e !== this.textarea && this.hide() : this.hide();
  }
  inputHandler(t) {
    this.target != null && this.adjustTextareaWidth();
  }
  createMeasurementSpan() {
    let t = document.createElement("span");
    return t.classList.add("jtopo_measurement_span"), t.style.visibility = "hidden", t.style.position = "absolute", t.style.whiteSpace = "pre-wrap", t.style.wordWrap = "none", t.style.display = "inline-block", t.style.minWidth = "10px", this.stage.uiContainer.appendChild(t), t;
  }
  dblclickHandler(t) {
    if (this.disabled || this.enabledModes.indexOf(this.stage.mode) == -1)
      return;
    let e = this.stage.inputSystem.target;
    e != null ? this.attachTo(e) : this.cancel();
  }
  pointerHandler(t) {
    this.stage.inputSystem.isPointerDown && this.cancel();
  }
  pointerdownHandler(t) {
    this.stage.inputSystem.target == null && this.cancel();
  }
  pointerupHandler(t) {
    this.stage.inputSystem.target == null && this.cancel();
  }
  attachTo(t) {
    let e;
    if (this.hide(), this.target = t, t instanceof B ? e = t : t instanceof H && (e = t.getLabel()), e == null)
      return;
    const i = e._state;
    let o = new R(0, 0, i.textWidth, i.textHeight), n = this.stage.camera.toScreenRect(o), s = e.getComputedStyle(), l = parseInt(s.fontSize) * this.stage.camera.scale;
    Object.assign(this.textarea.style, { fontFamily: s.fontFamily, fontWeight: s.fontWeight, fontSize: l + "px" }), Object.assign(this.measurementSpan.style, { fontFamily: s.fontFamily, fontWeight: s.fontWeight, fontSize: l + "px" });
    let r = s.textAlign, h = s.textBaseline, c = i.textPositionCache, d = e.localToWorldXY(c.x, c.y), u = this.stage.camera.toScreenXY(d.x, d.y), p = Math.max(n.width, 30), m = Math.max(n.height, 20), g = u.x - p / 2, x = u.y - m / 2;
    r == "left" ? g = u.x - p / 2 : r == "right" && (g = u.x + p / 2), h == "top" ? x = u.y - m / 2 : h == "bottom" && (x = u.y + m / 2), this.textX = g, this.textY = x, this.setValue(e.text), this.show();
  }
  setValue(t) {
    this.textarea.value = t, this.adjustTextareaWidth();
  }
  show() {
    this.textarea.style.display = "block", this.textarea.focus(), this.textarea.select(), this.textarea.style.left = this.textX + "px", this.textarea.style.top = this.textY + "px", this.adjustTextareaWidth();
  }
  hide() {
    this.textarea.style.display = "none";
  }
  onkeydown(t) {
    if (t.key != "Escape") {
      if (t.key == "Enter") {
        if (t.ctrlKey) {
          const e = this.textarea, i = e.selectionStart, o = e.selectionEnd;
          e.value = e.value.substring(0, i) + `
` + e.value.substring(o), e.selectionStart = e.selectionEnd = i + 1, this.adjustTextareaWidth();
        } else {
          if (this.target == null)
            return;
          this.applyInput();
        }
        t.preventDefault();
      }
    } else
      this.cancel();
  }
  applyInput() {
    let t = this.target;
    if (t == null)
      return;
    const e = this.textarea;
    let i = new A("confirm", { target: t, text: e.value });
    this.dispatchEvent(i), this.hide(), i.defaultPrevented || (t.text = e.value);
  }
  cancel() {
    let t = this.target;
    t != null && (this.hide(), this.dispatchEvent(new A("cancel", { target: t })));
  }
  adjustTextareaWidth() {
    let t = this.measurementSpan;
    t.textContent = this.textarea.value;
    const e = t.offsetWidth + 10;
    this.textarea.style.width = e + "px", this.textarea.style.height = "auto", this.textarea.style.height = this.textarea.scrollHeight + "px";
  }
  destroy() {
    this.textarea.onkeydown = null, this.textarea.oninput = null;
    const t = this.stage.inputSystem;
    t.removeEventListener("dblclick", this.dblclickHandler.bind(this)), t.removeEventListener("pointerdown", this.pointerdownHandler.bind(this)), t.removeEventListener("pointerup", this.pointerupHandler.bind(this)), t.removeEventListener("pointermove", this.pointerHandler.bind(this)), document.removeEventListener("pointerdown", this.docPointdownHandler.bind(this)), this.textarea.remove();
  }
}
var Y = Object.defineProperty, Z = Object.getOwnPropertyDescriptor;
class j extends B {
  constructor(t, e = 0, i = 0, o = 1, n = 1) {
    super(t, e, i, o, n), this._drawData = { a: { x: 0, y: 0 }, z: { x: 0, y: 0 } };
  }
  _beforDraw() {
    let t = this.inLinks, e = this.outLinks;
    const i = this;
    let o = 0, n = 0;
    t.length > 0 && (o = P(i.inLinks[0].getBeginPoint(), i)), e.length > 0 && (n = P(i.outLinks[0].getEndPoint(), i));
    let s = Math.min(this.width / 2, this.height / 2);
    this._drawData.a = { x: Math.cos(o) / 1.618 * s, y: Math.sin(o) / 1.618 * s }, this._drawData.z = { x: Math.cos(n) / 1.618 * s, y: Math.sin(n) / 1.618 * s };
  }
  draw(t) {
    t.strokeStyle = "blue", t.lineCap = "square", t.lineWidth = 20, this._beforDraw();
    let e = this._drawData.a, i = this._drawData.z;
    t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(e.x / 1.618, e.y / 1.618), t.quadraticCurveTo(0, 0, i.x / 1.618, i.y / 1.618), t.lineTo(i.x, i.y), t.stroke();
  }
}
function P(a, t) {
  let e = a.x - t.x, i = a.y - t.y;
  return Math.atan2(i, e);
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? Z(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && Y(t, e, n);
})([v("JointLNode")], j.prototype, "className", 2), b.regClass("com.jtopo.extensions", "JointLNode", j);
var V = Object.defineProperty, K = Object.getOwnPropertyDescriptor;
class N extends O {
  constructor(t, e = 0, i = 0, o = 1, n = 1) {
    super(t, e, i, o, n), this.aeOptions = { arrowNumbers: 5, blinkFrequency: 1e3 }, this.aeStatus = {};
  }
  ae(t) {
    Object.assign(this.aeOptions, t);
  }
  setupAE() {
    let t = [];
    this.aeStatus.alphas = t;
    let e = this.aeOptions.arrowNumbers;
    for (let n = 0; n < e; n++)
      t.push(0.5);
    let i = this, o = new w();
    o.name = "BlinkingArrow", o.setAttributes({ from: 0, to: e, duration: i.aeOptions.blinkFrequency, times: 1 / 0, update: (n) => {
      let s = Math.round(n);
      s > e || (s > 0 && (t[s - 1] = 0.5), s == 0 && (t[t.length - 1] = 0.5), t[s] = 1, i.update());
    } }), this.animations.push(o);
  }
  draw(t) {
    let e = this.width, i = this.height, o = this.getComputedStyle();
    o.applyTo(t);
    let n = o.borderWidth || 0, s = o.padding || 0, l = 0.5 * -e + n + s, r = (e - (2 * s + 2 * n)) / this.aeOptions.arrowNumbers, h = this.aeStatus.alphas;
    for (let c = 0; c < this.aeOptions.arrowNumbers; c++)
      t.save(), t.beginPath(), h[c] == 1 && (t.shadowOffsetY = 2, t.shadowOffsetX = 2, t.shadowColor = o.strokeStyle || "gray", t.lineWidth = 0.5 * o.lineWidth + 0.5 * h[c] * o.lineWidth, t.shadowBlur = 13 * h[c]), t.globalAlpha = h[c], t.moveTo(l + r * c, 0.5 * -i), t.lineTo(l + r * c + 0.5 * r, 0), t.lineTo(l + r * c, 0.5 * i), t.stroke(), t.restore();
    this._paintText(t);
  }
  destroy() {
    super.destroy(), this.aeStatus = null;
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? K(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && V(t, e, n);
})([v("BlinkingArrowNode")], N.prototype, "className", 2), b.regClass("com.jtopo.extensions", "BlinkingArrowNode", N);
var Q = Object.defineProperty, $ = Object.getOwnPropertyDescriptor;
class I extends O {
  constructor(t, e = 0, i = 0, o = 50, n = 50) {
    super(t, e, i, o, n), this.aeOptions = { circleNumber: 2 }, this.aeStatus = { circles: [], radiusMax: 1, radiusDx: 0, circleNumber: 0, lineWidthMax: 6 };
  }
  ae(t) {
    Object.assign(this.aeOptions, t), this._onAEChanged();
  }
  _onAEChanged() {
    let t = this.aeStatus, e = this.aeOptions, i = this.width, o = this.height, n = 0.5 * Math.min(i, o), s = e.circleNumber || 5;
    if (t.circleNumber !== s) {
      t.circleNumber = s;
      const l = [];
      for (let r = 0; r < t.circleNumber; r++)
        l.push({ radius: 0, lineWidth: 0, globalAlpha: 0 });
      t.circles = l;
    }
    t.radiusMax !== n && this.animations && this.animations.forEach((l) => {
      l.to = [t.radiusMax];
    }), t.radiusMax = n, t.radiusDx = t.radiusMax / s;
  }
  _afterStyleComputed() {
    super._afterStyleComputed(), this.aeStatus.lineWidthMax = this.getComputedStyle().lineWidth || 6;
  }
  setupAE() {
    let t = this.aeStatus;
    this._onAEChanged();
    let e = new w({ object: this, name: "Rippling", from: [1], to: [t.radiusMax], update: (i) => {
      let o = t.circles, n = Math.max(i[0], 0);
      for (let s = 0; s < o.length; s++) {
        let l = o[s], r = n + s * t.radiusDx;
        r > t.radiusMax && (r %= t.radiusMax);
        let h = r / t.radiusMax;
        l.radius = r, l.lineWidth = h * t.lineWidthMax, l.globalAlpha = 1 - Math.min(1, r / t.radiusMax);
      }
    }, times: 1 / 0, duration: 2e3 });
    this.animations.push(e);
  }
  set width(t) {
    super.width = t, this._onAEChanged();
  }
  get width() {
    return this._width;
  }
  set height(t) {
    super.height = t, this._onAEChanged();
  }
  get height() {
    return this._height;
  }
  draw(t) {
    let e = this.aeStatus.circles, i = this.getComputedStyle();
    t.strokeStyle = i.strokeStyle;
    for (let o = 0; o < e.length; o++) {
      let n = e[o];
      t.beginPath(), t.lineWidth = n.lineWidth, t.globalAlpha = n.globalAlpha, t.ellipse(0, 0, n.radius, n.radius, 0, 0, 2 * Math.PI), t.stroke();
    }
  }
  _renderSVG(t) {
    if (this._ctx == null) {
      const e = document.createElement("canvas");
      this._canvas = e, this._ctx = e.getContext("2d");
    }
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? $(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && Q(t, e, n);
})([v("RipplingNode")], I.prototype, "className", 2), b.regClass("com.jtopo.extensions", "RipplingNode", I);
var tt = Object.defineProperty, et = Object.getOwnPropertyDescriptor;
class z extends O {
  constructor(t, e = 0, i = 0, o = 1, n = 1) {
    super(t, e, i, o, n), this.aeOptions = { capacity: 0.5, waveHeight: 10 }, this.aeStatus = { leftPoints: [], rightPoints: [], capacity: 0, width: -1, height: -1, waveHeight: 0 }, this.setStyle("fillStyle", "#43b1f5");
  }
  ae(t) {
    Object.assign(this.aeOptions, t), this._onAEChanged();
  }
  _afterStyleComputed() {
    super._afterStyleComputed(), this._onAEChanged();
  }
  _updateWaveline() {
    const t = this.aeStatus;
    let e = t.leftPoints, i = t.rightPoints, o = t.height * (1 - t.capacity) - 0.5 * t.height;
    e[0].y = o, e[1].y = o + t.waveHeight, e[2].y = o - t.waveHeight, e[3].y = o, i[0].y = e[0].y, i[1].y = e[1].y, i[2].y = e[2].y, i[3].y = e[3].y;
  }
  _onAEChanged() {
    const t = this.aeStatus, e = this._getShapeSize(), i = this.aeOptions.waveHeight == null ? 10 : this.aeOptions.waveHeight, o = this.aeOptions.capacity == null ? 0.5 : this.aeOptions.capacity;
    if (t.width !== e.width || t.height !== e.height) {
      this._updateShapeSize();
      let n = this._getShapeSize().width, s = -n / 2, l = [{ x: s, y: 0 }, { x: s + n / 4, y: 0 }, { x: s + n - n / 4, y: 0 }, { x: s + n, y: 0 }], r = l.map((h) => ({ x: h.x + n, y: h.y }));
      t.leftPoints = l, t.rightPoints = r;
    }
    t.waveHeight = i, t.width = e.width, t.height = e.height, t.capacity = o, this._updateWaveline();
  }
  setupAE() {
    const t = this.aeStatus;
    let e = new w({ name: "WaterLike", from: 0, to: 1, duration: 1500, times: 1 / 0, update: (i) => {
      let o = t.width, n = 0.01 * o, s = 0.5 * o, l = t.leftPoints, r = t.rightPoints;
      r[0].x >= s && (r[0].x = -s - o, r[1].x = r[0].x + o / 4, r[3].x = r[0].x + o, r[2].x = r[3].x - o / 4), l[0].x >= s && (l[0].x = -s - o, l[1].x = l[0].x + o / 4, l[3].x = l[0].x + o, l[2].x = l[3].x - o / 4), l.forEach((h, c) => {
        h.x += n;
      }), r.forEach((h, c) => {
        h.x += n;
      });
    } });
    this._onAEChanged(), this.animations.push(e);
  }
  draw(t) {
    let e = this._getShapeSize(), i = e.width, o = e.height, n = this.getComputedStyle();
    n.applyTo(t);
    let s = n.lineWidth, l = 0.5 * -i, r = 0.5 * -o;
    t.beginPath(), n.borderRadius != null ? t.roundRect(l, r, i, o, n.borderRadius) : t.rect(l, r, i, o), t.closePath(), s != 0 && t.stroke();
    {
      t.save();
      let h = 0.5 * s;
      t.beginPath(), n.borderRadius != null ? t.roundRect(l + h, r + h, i - s, o - s, n.borderRadius) : t.rect(l + h, r + h, i - s, o - s), t.closePath(), s != 0 && (t.lineWidth = 2 * s, t.strokeStyle = "rgba(0,0,0,0)", t.stroke()), t.clip();
      let c = this.aeStatus.leftPoints, d = this.aeStatus.rightPoints;
      if (t.beginPath(), c[0].x >= d[0].x) {
        let u = c;
        c = d, d = u;
      }
      t.moveTo(c[0].x, c[0].y), t.bezierCurveTo(c[1].x, c[1].y, c[2].x, c[2].y, c[3].x, c[3].y), t.bezierCurveTo(d[1].x, d[1].y, d[2].x, d[2].y, d[3].x, d[3].y), t.lineTo(d[3].x, -r), t.lineTo(c[0].x, -r), t.lineTo(c[0].x, c[0].y), t.closePath(), t.fillStyle = n.fillStyle || "#43b1f5", t.fill(), t.restore();
    }
    n.color && (t.fillStyle = n.color), this._paintText(t);
  }
  set width(t) {
    super.width = t, this._onAEChanged();
  }
  get width() {
    return this._width;
  }
  set height(t) {
    super.height = t, this._onAEChanged();
  }
  get height() {
    return this._height;
  }
  destroy() {
    super.destroy(), this.aeStatus = null;
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? et(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && tt(t, e, n);
})([v("WaterLikeNode")], z.prototype, "className", 2), b.regClass("com.jtopo.extensions", "WaterLikeNode", z);
class it {
  constructor(t) {
    this.documentElement = this.textToElement(t);
  }
  textToElement(t) {
    return new DOMParser().parseFromString(t, "text/xml").documentElement;
  }
  toJson() {
    const t = this.documentElement;
    let e = t.children, i = t.getAttribute("name");
    if (i == null)
      throw new Error("category is null");
    let o = [], n = { package: i, shapes: o };
    for (let s = 0; s < e.length; s++) {
      let l = e[s], r = l.getAttribute("name"), h = parseFloat(l.getAttribute("w")), c = parseFloat(l.getAttribute("h")), d = [], u = l.getElementsByTagName("connections")[0];
      u != null && (d = this.domChildrenToJson(u, 1, 1));
      let p = this.parse(l.getElementsByTagName("background")[0], h, c), m = this.parse(l.getElementsByTagName("foreground")[0], h, c), g = { className: r, width: h, height: c };
      d.length > 0 && (g.connections = d), p.length > 0 && (g.background = p), m.length > 0 && (g.foreground = m), o.push(g);
    }
    return n;
  }
  domChildrenToJson(t, e, i) {
    let o = t.children, n = [];
    for (let s = 0; s < o.length; s++) {
      let l = this.domToJson(o[s], e, i);
      n.push(l);
    }
    return n;
  }
  domToJson(t, e, i) {
    let o = { T: t.tagName }, n = t.attributes;
    for (let s = 0; s < n.length; s++) {
      let l = n[s], r = l.name, h = l.value;
      (r == "x" || r == "y" || r == "arcsize" || r == "w" || r == "h" || r == "x1" || r == "y1" || r == "x2" || r == "y2" || r == "x3" || r == "y3" || r == "cx" || r == "cy" || r == "limit" || r == "fontsize" || r == "x-axis-rotation" || r == "large-arc-flag" || r == "sweep-flag" || r == "r" || r == "rx" || r == "ry" || r == "stroke-width" || r == "stroke-dasharray" || r == "stroke-dashoffset" || r == "stroke-linecap" || r == "stroke-linejoin" || r == "stroke-miterlimit" || r == "stroke-opacity" || r == "stroke-width" || r == "stroke-dasharray") && (h = parseFloat(h)), o[r] = h;
    }
    return this.unitCmd(o, e, i), o;
  }
  parse(t, e, i) {
    let o = [];
    if (t == null)
      return [];
    let n = t.children;
    for (let s = 0; s < n.length; s++) {
      let l = n[s];
      if (l.tagName == "path") {
        let r = this.domChildrenToJson(l, e, i);
        o.push({ T: "path", m: r });
      } else
        o.push(this.domToJson(l, e, i));
    }
    return o;
  }
  unitCmd(t, e, i) {
    t.x != null && (t.x = t.x / e), t.y != null && (t.y = t.y / i), t.x1 != null && (t.x1 = t.x1 / e), t.y1 != null && (t.y1 = t.y1 / i), t.x2 != null && (t.x2 = t.x2 / e), t.y2 != null && (t.y2 = t.y2 / i), t.x3 != null && (t.x3 = t.x3 / e), t.y3 != null && (t.y3 = t.y3 / i), t.rx != null && (t.rx = t.rx / e), t.ry != null && (t.ry = t.ry / i), t.w != null && (t.w = t.w / e), t.h != null && (t.h = t.h / i), t.r != null && (t.r = t.r / Math.max(e, i)), t.arcsize != null && (t.arcsize = t.arcsize / Math.max(e, i));
  }
}
var nt = Object.defineProperty, ot = Object.getOwnPropertyDescriptor;
const st = new class {
  constructor() {
  }
  getPathInfo(a, t, e) {
    let i = "", o = !1;
    for (let n = 0; n < a.length; n++) {
      let s = a[n], l = s.T;
      l == "move" ? i += "M" + s.x * t + " " + s.y * e : l == "line" ? i += "L" + s.x * t + " " + s.y * e : l == "arc" ? i += "A" + s.rx * t + " " + s.ry * e + " " + s["x-axis-rotation"] + " " + s["large-arc-flag"] + " " + s["sweep-flag"] + " " + s.x * t + " " + s.y * e : l == "curve" ? i += "C" + s.x1 * t + " " + s.y1 * e + " " + s.x2 * t + " " + s.y2 * e + " " + s.x3 * t + " " + s.y3 * e : l == "close" && (i += "Z", o = !0);
    }
    return { isClosed: o, pathStr: i };
  }
  drawPathArray(a, t, e = 1, i = 1, o = 1) {
    let n, s = null, l = null, r = e, h = i;
    for (let c = 0; c < t.length; c++) {
      let d = t[c], u = d.T;
      if (u == "path") {
        let p = this.getPathInfo(d.m, r, h);
        n = new Path2D(p.pathStr), p.isClosed && n.closePath();
      } else if (u == "move")
        s = d.x, l = d.y, a.moveTo(d.x * r, d.y * h);
      else if (u == "close")
        a.closePath();
      else if (u == "line")
        s = d.x, l = d.y, a.lineTo(d.x * r, d.y * h);
      else if (u == "rect")
        a.beginPath(), d.x == null || a.rect(d.x * r, d.y * h, d.w * r, d.h * h);
      else if (u == "roundrect")
        a.beginPath(), d.x == null || a.roundRect(d.x * r, d.y * h, d.w * r, d.h * h, d.arcsize * Math.max(r, h));
      else if (u == "circle")
        a.beginPath(), a.arc(d.cx * r, d.cy * h, d.r * Math.max(r, h), 0, 2 * Math.PI);
      else if (u == "ellipse")
        a.beginPath(), a.ellipse((d.x + d.w / 2) * r, (d.y + d.h / 2) * h, d.w / 2 * r, d.h / 2 * h, 0, 0, 2 * Math.PI);
      else if (u == "arc") {
        let p = "M" + s * r + " " + l * h + " A" + d.rx * r + " " + d.ry * h + " " + d["x-axis-rotation"] + " " + d["large-arc-flag"] + " " + d["sweep-flag"] + " " + d.x * r + " " + d.y * h, m = new Path2D(p);
        o > 0 && a.stroke(m), s = d.x, l = d.y;
      } else
        u == "curve" ? a.bezierCurveTo(d.x1 * r, d.y1 * h, d.x2 * r, d.y2 * h, d.x3 * r, d.y3 * h) : u == "text" ? (a.textAlign = d.align, a.textBaseline = d.valign, a.fillText(d.str, d.x * r, d.y * h)) : u == "fontsize" ? a.font = "normal " + d.size + "px sans-serif" : u == "fontcolor" ? a.fillStyle = d.color : u == "miterlimit" ? a.miterLimit = d.limit : u == "linecap" ? a.lineCap = d.cap : u == "linejoin" ? a.linejoin = d.join : u == "stroke" ? n != null ? (o > 0 && a.stroke(n), n = null) : o > 0 && a.stroke() : u == "fill" ? n != null ? (a.fill(n), n = null) : a.fill() : u == "strokewidth" ? a.lineWidth = d.width : u == "fillstroke" ? n != null ? (a.fill(n), o > 0 && a.stroke(n), n = null) : (a.fill(), o > 0 && a.stroke()) : u == "strokecolor" ? a.strokeStyle = d.color : u == "fillcolor" ? a.fillStyle = d.color : u == "save" ? a.save() : u == "restore" && a.restore();
    }
  }
}();
class L extends F {
  constructor() {
    super(), this.aspect = "variable";
  }
  draw(t, e) {
    if (this._pathArray == null)
      return;
    let i = e.getComputedStyle().lineWidth, o = e._state.shapeSize, n = 0.5 * -o.width, s = 0.5 * -o.height;
    t.save(), t.translate(n, s), st.drawPathArray(t, this._pathArray, o.width, o.height, i), t.restore();
  }
  drawSVG(t, e) {
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? ot(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && nt(t, e, n);
})([v("XMLShape")], L.prototype, "className", 2), b.regClass("com.jtopo.extensions", "XMLShape", L);
const Mt = { fromXml: function(a) {
  let t = new it(a).toJson();
  return t.shapes.map((e) => {
    let i = function(o, n) {
      let s = new L();
      s.width = n.width, s.height = n.height, s.namespace = o + "." + n.className;
      let l = [], r = n.background;
      r && (l = l.concat(r));
      let h = n.foreground;
      return h && (l = l.concat(h)), s._pathArray = l, n.connections && (n.connections.forEach((c) => {
        c.x = 2 * c.x - 1, c.y = 2 * c.y - 1, c.usage = c.usage || q.CONNECT_EDIT;
      }), s.setConnections(n.connections)), s;
    }(t.package, e);
    return b.regShape(t.package, e.className, i), i;
  });
} };
var rt = Object.defineProperty, at = Object.getOwnPropertyDescriptor;
class C extends J {
  constructor(t, e = 0, i = 0, o = 1, n = 1) {
    super(t, e, i, o, n), this.setAttributes({ ratio: 0.5, direction: "right" });
  }
  drawShape(t) {
    let e = this;
    const i = this.width, o = this.height;
    let n = e.getAttribute("ratio"), s = e.getAttribute("direction"), l = e.getComputedStyle();
    l.fillStyle && (t.fillStyle = l.fillStyle);
    let r = l.borderWidth || 0, h = l.padding || 0, c = 2 * h + 2 * r, d = 0.5 * -i + r + h, u = 0.5 * -o + r + h, p = (i - c) * n, m = (o - c) * n;
    if (s == "right")
      m = o - c;
    else if (s == "down")
      p = i - c;
    else if (s == "left")
      d = 0.5 * -i + i - r - h - p, m = o - c;
    else {
      if (s != "up")
        throw new Error("Unknow direction:" + s);
      u = 0.5 * -o + o - r - h - m, p = i - c;
    }
    t.beginPath(), t.rect(d, u, p, m), t.fill();
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? at(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && rt(t, e, n);
})([v("RatioNode")], C.prototype, "className", 2), Object.defineProperties(C.prototype, { ratio: { set(a) {
  this.setAttribute("ratio", a);
}, get() {
  return this.getAttribute("ratio");
} }, direction: { set(a) {
  this.setAttribute("direction", a);
}, get() {
  return this.getAttribute("direction");
} } }), b.regClass("com.jtopo.extensions", "RatioNode", C);
const E = new class extends k {
  constructor() {
    super(), this.canvasCache = /* @__PURE__ */ new Map(), this.nodeSetMap = /* @__PURE__ */ new Map(), this.init();
  }
  getCanvas(a) {
    let t = this.canvasCache.get(a.imageSrc);
    return t == null ? null : t.canvas;
  }
  addNode(a) {
    let t = a.imageSrc, e = "play", i = this.nodeSetMap.get(t);
    i == null && (i = /* @__PURE__ */ new Set(), this.nodeSetMap.set(t, i), e = "load"), i.add(a), e == "load" ? this.worker.postMessage({ method: e, args: { url: t, basePath: location.href } }) : this.play(t);
  }
  hasNode(a) {
    let t = this.nodeSetMap.get(a.imageSrc);
    return t != null && t.has(a);
  }
  removeNode(a) {
    let t = a.imageSrc, e = this.nodeSetMap.get(t);
    e != null && e.size != 0 && (e.delete(a), e.size == 0 && this.stop(t));
  }
  play(a) {
    this.worker.postMessage({ method: "play", args: { url: a } });
  }
  stop(a) {
    this.worker.postMessage({ method: "stop", args: { url: a } });
  }
  onDraw(a) {
    let t = this.nodeSetMap.get(a);
    if (t != null && t.size != 0)
      for (let e of t)
        e.update();
  }
  init() {
    const a = this, t = new Blob(['function o(t){var e=0;if(71!==t[e++]||73!==t[e++]||70!==t[e++]||56!==t[e++]||56!=(t[e++]+1&253)||97!==t[e++])throw new Error("Invalid GIF 87a/89a header.");var r=t[e++]|t[e++]<<8,a=t[e++]|t[e++]<<8,n=t[e++],i=n>>7,l=1<<1+(7&n);t[e++],t[e++];var o=null,s=null;i&&(o=e,s=l,e+=3*l);var h=!0,f=[],d=0,c=null,u=0,g=null;for(this.width=r,this.height=a;h&&e<t.length;)switch(t[e++]){case 33:switch(t[e++]){case 255:if(11!==t[e]||78==t[e+1]&&69==t[e+2]&&84==t[e+3]&&83==t[e+4]&&67==t[e+5]&&65==t[e+6]&&80==t[e+7]&&69==t[e+8]&&50==t[e+9]&&46==t[e+10]&&48==t[e+11]&&3==t[e+12]&&1==t[e+13]&&0==t[e+16])e+=14,g=t[e++]|t[e++]<<8,e++;else for(e+=12;;){if(!((F=t[e++])>=0))throw Error("Invalid block size");if(0===F)break;e+=F}break;case 249:if(4!==t[e++]||0!==t[e+4])throw new Error("Invalid graphics extension block.");var w=t[e++];d=t[e++]|t[e++]<<8,c=t[e++],1&w||(c=null),u=w>>2&7,e++;break;case 1:case 254:for(;;){if(!((F=t[e++])>=0))throw Error("Invalid block size");if(0===F)break;e+=F}break;default:throw new Error("Unknown graphic control label: 0x"+t[e-1].toString(16))}break;case 44:var p=t[e++]|t[e++]<<8,m=t[e++]|t[e++]<<8,v=t[e++]|t[e++]<<8,b=t[e++]|t[e++]<<8,k=t[e++],y=k>>6&1,x=1<<1+(7&k),A=o,E=s,I=!1;k>>7&&(I=!0,A=e,E=x,e+=3*x);var _=e;for(e++;;){var F;if(!((F=t[e++])>=0))throw Error("Invalid block size");if(0===F)break;e+=F}f.push({x:p,y:m,width:v,height:b,has_local_palette:I,palette_offset:A,palette_size:E,data_offset:_,data_length:e-_,transparent_index:c,interlaced:!!y,delay:d,disposal:u,pixelsArray:new Uint8Array(v*b)});break;case 59:h=!1;break;default:throw new Error("Unknown gif block: 0x"+t[e-1].toString(16))}this.numFrames=function(){return f.length},this.loopCount=function(){return g},this.frameInfo=function(t){if(t<0||t>=f.length)throw new Error("Frame index out of range.");return f[t]},this.decodeAndBlitFrameRGBA=function(e,a){var n=this.frameInfo(e),i=n.width*n.height,l=n.pixelsArray;l.fill(0),function(t,e,r,a){for(var n=t[e++],i=1<<n,l=i+1,o=l+1,s=n+1,h=(1<<s)-1,f=0,d=0,c=0,u=t[e++],g=new Int32Array(4096),w=null;;){for(;f<16&&0!==u;)d|=t[e++]<<f,f+=8,1===u?u=t[e++]:--u;if(f<s)break;var p=d&h;if(d>>=s,f-=s,p!==i){if(p===l)break;for(var m=p<o?p:w,v=0,b=m;b>i;)b=g[b]>>8,++v;var k=b;if(c+v+(m!==p?1:0)>a)return void console.log("Warning, gif stream longer than expected.");r[c++]=k;var y=c+=v;for(m!==p&&(r[c++]=k),b=m;v--;)b=g[b],r[--y]=255&b,b>>=8;null!==w&&o<4096&&(g[o++]=w<<8|k,o>=h+1&&s<12&&(++s,h=h<<1|1)),w=p}else o=l+1,h=(1<<(s=n+1))-1,w=null}c!==a&&console.log("Warning, gif stream shorter than expected.")}(t,n.data_offset,l,i);var o=n.palette_offset,s=n.transparent_index;null===s&&(s=256);var h=n.width,f=r-h,d=h,c=4*(n.y*r+n.x),u=4*((n.y+n.height)*r+n.x),g=c,w=4*f;!0===n.interlaced&&(w+=4*r*7);for(var p=8,m=0,v=l.length;m<v;++m){var b=l[m];if(0===d&&(d=h,(g+=w)>=u&&(w=4*f+4*r*(p-1),g=c+(h+f)*(p<<1),p>>=1)),b===s)g+=4;else{var k=t[o+3*b],y=t[o+3*b+1],x=t[o+3*b+2];a[g++]=k,a[g++]=y,a[g++]=x,a[g++]=255}--d}}}const l=self,e=new Map,i={load:function(t){const r=t.basePath,i=t.url;if(i.startsWith("data:image/gif")){const t=i.split(",")[1],r=atob(t),n=new Uint8Array(r.length);for(let t=0;t<r.length;t++)n[t]=r.charCodeAt(t);const l=n.buffer;let o=new a(i,l);e.set(i,o)}else fetch(new URL(t.url,r).href).then(t=>{if(!t.ok)throw new Error("HTTP status:"+t.status);return t.arrayBuffer()}).then(t=>{let r=new a(i,t);e.set(i,r)}).catch(t=>{n.call("onError",{url:i})})},stop:function(t){let r=e.get(t.url);null!=r&&r.stop()},play:function(t){let r=e.get(t.url);null!=r&&r.play()}},n={call:function(t,e){l.postMessage({method:t,args:e,time:Date.now()})}};l.onmessage=function(t){let e=t.data.method,r=t.data.args;i[e].call(i,r)};class a{constructor(t,e){this.totalFrames=0,this.framenum=0,this.stoped=!0,this.url=t;var r=new o(new Uint8Array(e));this.imageData=new Uint8ClampedArray(r.width*r.height*4),this.totalFrames=r.numFrames(),this.gr=r,n.call("onLoad",{url:t,width:r.width,height:r.height}),this.loopRender()}stop(){this.stoped=!0}play(){this.stoped=!1}loopRender(){const t=this,e=this.gr;var r=this.framenum%this.totalFrames,a=e.frameInfo(r);this.stoped||(0!==r&&2!==a.disposal||this.imageData.fill(0),e.decodeAndBlitFrameRGBA(r,this.imageData),n.call("draw",{url:this.url,width:e.width,height:e.height,pixes:this.imageData})),setTimeout(()=>{t.loopRender(),t.framenum++},10*a.delay)}}'], { type: "application/javascript" }), e = new Worker(URL.createObjectURL(t));
    this.worker = e;
    const i = this.canvasCache, o = { onLoad(n) {
      let s = new ImageData(n.width, n.height), l = document.createElement("canvas");
      l.width = n.width, l.height = n.height;
      let r = l.getContext("2d"), h = { canvas: l, ctx: r, imageData: s };
      i.set(n.url, h), a.play(n.url);
    }, draw(n) {
      let s = i.get(n.url), l = s.imageData;
      l.data.set(n.pixes), s.ctx.putImageData(l, 0, 0), a.onDraw(n.url);
    }, onError(n) {
    } };
    e.onmessage = function(n) {
      let s = n.data, l = s.method, r = s.args;
      s.time, o[l].call(o, r);
    };
  }
}();
var lt = Object.defineProperty, ht = Object.getOwnPropertyDescriptor;
class W extends U {
  constructor(t, e = 0, i = 0, o = 1, n = 1) {
    super(t, e, i, o, n);
  }
  _drawImage(t, e) {
    if (E.hasNode(this)) {
      let i = E.getCanvas(this);
      if (i != null)
        return void t.drawImage(i, 0.5 * -this.width, 0.5 * -this.height, this.width, this.height);
    } else
      this.imageObject != null && (this.imageSrc.endsWith(".gif") || this.imageSrc.startsWith("data:image/gif")) && E.addNode(this);
    t.drawImage(e, 0.5 * -this.width, 0.5 * -this.height, this.width, this.height);
  }
  removeFromParent() {
    return super.removeFromParent(), E.removeNode(this), this;
  }
}
((a, t, e, i) => {
  for (var o, n = i > 1 ? void 0 : i ? ht(t, e) : t, s = a.length - 1; s >= 0; s--)
    (o = a[s]) && (n = (i ? o(t, e, n) : o(n)) || n);
  i && n && lt(t, e, n);
})([v("GifNode")], W.prototype, "className", 2), b.regClass("com.jtopo.extensions", "GifNode", W);
const y = { forward: "forward", back: "back", moveTo: "moveTo", mark: "mark", turn: "turn", turnLeft: "turnLeft", turnRight: "turnRight", faceTo: "faceTo", faceToMark: "faceToMark" };
let dt = Object.keys(y);
class M extends T {
  constructor(t, e) {
    super(t, e);
  }
}
const S = {};
dt.forEach((a) => {
  S[a] = new M(a);
});
let ct = new M("forward"), ut = new M("back"), pt = new M("turn");
class mt {
  constructor(t, e, i) {
    this.x = t, this.y = e, this.direction = i;
  }
}
class gt extends k {
  constructor() {
    super(), this._x = 0, this._y = 0, this._direction = 0, this.reset();
  }
  onPositionChanged() {
  }
  onDirectionChanged() {
  }
  reset() {
    return this.x = 0, this.y = 0, this.direction = 0, this.removeAllMarks(), this;
  }
  moveTo(t, e) {
    return typeof t == "number" && typeof e == "number" ? (this.x = t, this.y = e) : typeof t == "object" && (this.x = t.x, this.y = t.y), this.hasListener(y.moveTo) && this.dispatchEvent(new M(y.moveTo, { target: this, args: [t, e] })), this;
  }
  forward(t) {
    return this.x += t * Math.cos(this.direction), this.y += t * Math.sin(this.direction), this.hasListener(y.forward) && this.dispatchEvent(ct), this;
  }
  back(t) {
    this.forward(-t), this.hasListener(y.back) && this.dispatchEvent(ut);
  }
  turnTo(t) {
    return this.direction = t, this.hasListener(y.turn) && this.dispatchEvent(pt), this;
  }
  turn(t) {
    return this.turnTo(this.direction + t);
  }
  turnLeft(t = Math.PI / 2) {
    return this.turnTo(this.direction - t);
  }
  turnRight(t = Math.PI / 2) {
    return this.turnTo(this.direction + t);
  }
  faceTo(t, e) {
    let i;
    typeof t == "number" && typeof e == "number" ? i = t : typeof t == "object" && (i = t.x, e = t.y);
    let o = Math.atan2(e - this.y, i - this.x);
    if (this.direction = o, this.hasListener(y.faceTo)) {
      let n = S[y.faceTo];
      n.args = arguments[0], this.dispatchEvent(n);
    }
    return this;
  }
  mark(t) {
    if (t == null)
      throw new Error("mark's name is required.");
    if (this.marks[t] = new mt(this.x, this.y, this.direction), this.hasListener(y.mark)) {
      let e = S[y.mark];
      e.args = t, this.dispatchEvent(e);
    }
    return this;
  }
  hasMark(t) {
    return this.marks[t] != null;
  }
  getMark(t) {
    let e = this.marks[t];
    if (e == null)
      throw new Error("mark '" + t + "' not found.");
    return e;
  }
  moveToMark(t) {
    let e = this.getMark(t);
    return this.moveTo(e.x, e.y), this;
  }
  restoreToMark(t) {
    let e = this.getMark(t);
    return this.moveTo(e.x, e.y), this.turnTo(e.direction), this;
  }
  removeAllMarks() {
    this.marks = {};
  }
  removeMark(t) {
    return !!this.hasMark(t) && (delete this.marks[t], !0);
  }
  getMarks() {
    return this.marks;
  }
  addMarks(t) {
    for (let e in t)
      this.marks[e] = t[e];
  }
  get x() {
    return this._x;
  }
  set x(t) {
    t != this._x && (this._x = t, this.onPositionChanged());
  }
  get y() {
    return this._y;
  }
  set y(t) {
    t != this._y && (this._y = t, this.onPositionChanged());
  }
  get direction() {
    return this._direction;
  }
  set direction(t) {
    t != this._direction && (this._direction = t, this.onDirectionChanged());
  }
}
class ft {
  constructor(t) {
    this.defaultDuration = 1e3, this.defaultEffect = "easeLinear", this.defaultAnimationOptions = { duration: 1e3, effect: "easeLinear" }, this.topo = t, this.animation = new w();
  }
  setTopoAnimationOptions(t) {
    this.defaultAnimationOptions.duration = t.duration || 1e3, this.defaultAnimationOptions.effect = t.effect || "easeLinear";
  }
  moveTo(t, e, i) {
    let o, n = this.topo;
    if (typeof t == "number" && typeof e == "number")
      o = { x: t, y: e };
    else {
      if (typeof t != "object" || t.x == null || t.y == null)
        throw new Error("invalid arguments moveTo");
      o = { x: t.x, y: t.y }, i = e;
    }
    return i == null && (i = this.defaultAnimationOptions), this._anime(y.moveTo, o, [n.x, n.y], [o.x, o.y], (s) => {
      n.x = s[0], n.y = s[1];
    }, i);
  }
  faceTo(t, e, i) {
    let o, n = this.topo;
    if (typeof t == "number" && typeof e == "number")
      o = { x: t, y: e };
    else {
      if (typeof t != "object" || t.x == null || t.y == null)
        throw new Error("invalid arguments faceTo");
      o = { x: t.x, y: t.y }, i = e;
    }
    i == null && (i = this.defaultAnimationOptions);
    const s = n.direction;
    let l = Math.atan2(o.y - n.y, o.x - n.x), r = l - s;
    return r > Math.PI ? l = s - (2 * Math.PI - r) : r < -Math.PI && (l = s + (2 * Math.PI + r)), this._anime(y.faceTo, o, [s], [l], (h) => {
      n.direction = h[0];
    }, i);
  }
  forward(t, e) {
    let i = this.topo;
    const o = i.x + t * Math.cos(i.direction), n = i.y + t * Math.sin(i.direction);
    return this._anime(y.forward, t, [i.x, i.y], [o, n], (s) => {
      i.x = s[0], i.y = s[1];
    }, e);
  }
  back(t, e) {
    return this.forward(-t, e);
  }
  turn(t, e) {
    let i = this.topo;
    const o = i.direction, n = o + t;
    return this._anime(y.turn, t, [o], [n], (s) => {
      i.direction = s[0];
    }, e);
  }
  turnLeft(t = Math.PI / 2, e) {
    return this.turn(-t, e);
  }
  turnRight(t = Math.PI / 2, e) {
    return this.turn(t, e);
  }
  turnTo(t, e) {
    let i = this.topo;
    const o = i.direction;
    return this._anime(y.turn, t, [o], [t], (n) => {
      i.direction = n[0];
    }, e);
  }
  moveToMark(t, e) {
    const i = this.topo.getMark(t);
    return this.moveTo(i, e);
  }
  faceToMark(t, e) {
    const i = this.topo.getMark(t);
    return this.faceTo(i, e);
  }
  restoreToMark(t, e) {
    const i = this.topo.getMark(t), o = this.moveTo(i, e), n = this.turnTo(i.direction, e);
    return Promise.all([o, n]);
  }
  _anime(t, e, i, o, n, s) {
    s == null && (s = this.defaultAnimationOptions);
    let l = this.topo, r = this.animation;
    return r.setAttributes({ from: i, to: o, update: (h) => {
      n(h);
    }, duration: s.duration || this.defaultDuration, effect: s.effect || this.defaultEffect }), r.play().then(() => {
      if (l.hasListener(t)) {
        let h = S[t];
        h.args = e, l.dispatchEvent(h);
      }
    });
  }
  abort() {
    return this.animation && this.animation.cancel(), this;
  }
}
class Et extends gt {
  constructor(t) {
    super(), this.carriedObjects = [], this.animator = new yt(this), this._stageRef = t, t.animationSystem.add(this.animator.animation);
  }
  onPositionChanged() {
    for (let t = 0; t < this.carriedObjects.length; t++)
      this.carriedObjects[t].setXY(this.x, this.y);
    this.body && this.body.setXY(this.x, this.y);
  }
  onDirectionChanged() {
    for (let t = 0; t < this.carriedObjects.length; t++)
      this.carriedObjects[t].rotate(this.direction);
    this.body && this.body.rotate(this.direction);
  }
  setBody(t) {
    return this.body = t, this;
  }
  carry(t) {
    return Array.isArray(t) ? this.carriedObjects = this.carriedObjects.concat(t) : this.carriedObjects.push(t), this;
  }
  throw(t, e = 0, i = 0) {
    let o = this.x, n = this.y;
    if ((i > 0 || e != 0) && (o += i * Math.cos(this.direction + e), n += i * Math.sin(this.direction + e)), this.carriedObjects.includes(t)) {
      t.x = o, t.y = n;
      let s = this.carriedObjects.indexOf(t);
      this.carriedObjects.splice(s, 1);
    }
    return this;
  }
  throwTo(t, e, i) {
    if (typeof e == "number" && typeof i == "number") {
      let o = Math.atan2(i - this.y, e - this.x) - this.direction, n = Math.sqrt((e - this.x) ** 2 + (i - this.y) ** 2);
      return this.throw(t, o, n);
    }
    if (typeof e == "object") {
      let o = Math.atan2(e.y - this.y, e.x - this.x) - this.direction, n = Math.sqrt((e.x - this.x) ** 2 + (e.y - this.y) ** 2);
      return this.throw(t, o, n);
    }
    throw new Error("invalid arguments throwTo");
  }
  putDown(t) {
    if (this.carriedObjects.includes(t)) {
      t.x = this.x, t.y = this.y;
      let e = this.carriedObjects.indexOf(t);
      this.carriedObjects.splice(e, 1);
    }
    return this;
  }
  reset() {
    return super.reset(), this.animator && this.animator.animation && this.animator.animation.cancel(), this;
  }
}
class yt extends ft {
  constructor(t) {
    super(t);
  }
  carry(t, e) {
    let i = this.topo;
    i.carry(t);
    let o = Array.isArray(t) ? t : [t], n = o.map((r) => [r.x, r.y, r.rotation]), s = o.map((r) => [i.x, i.y, i.direction]);
    e == null && (e = this.defaultAnimationOptions);
    let l = new w();
    return l.setAttributes({ from: n.flat(), to: s.flat(), duration: e.duration || this.defaultAnimationOptions.duration, effect: e.effect, update: (r) => {
      if (Number.isNaN(r[0]))
        throw new Error("args[0] is NaN");
      for (let h = 0; h < o.length; h++)
        o[h].x = r[3 * h], o[h].y = r[3 * h + 1], o[h].rotation = r[3 * h + 2];
    } }), this.topo._stageRef.animationSystem.add(l), l.play();
  }
  throw(t, e = 0, i = 0, o) {
    let n = this.topo;
    if (!n.carriedObjects.includes(t))
      throw new Error("object is not in carriedObjects");
    o == null && (o = this.defaultAnimationOptions);
    let s = n.x, l = n.y;
    i > 0 && (s += i * Math.cos(n.direction + e), l += i * Math.sin(n.direction + e)), e != 0 && (s += i * Math.cos(n.direction + e), l += i * Math.sin(n.direction + e));
    let r = new w();
    r.setAttributes({ from: [n.x, n.y], to: [s, l], duration: o.duration, effect: o.effect, update: (c) => {
      t.x = c[0], t.y = c[1];
    } }), this.topo._stageRef.animationSystem.add(r);
    let h = n.carriedObjects.indexOf(t);
    return this.topo.carriedObjects.splice(h, 1), r.play();
  }
  throwTo(t, e, i, o) {
    let n, s = this.topo;
    if (typeof e == "number" && typeof i == "number")
      n = { x: e, y: i };
    else {
      if (typeof e != "object" || e.x == null || e.y == null)
        throw new Error("invalid arguments throwTo");
      n = { x: e.x, y: e.y }, o = i;
    }
    o == null && (o = this.defaultAnimationOptions);
    let l = new w();
    l.setAttributes({ from: [s.x, s.y], to: [n.x, n.y], duration: o.duration, effect: o.effect, update: (h) => {
      t.x = h[0], t.y = h[1];
    } }), this.topo._stageRef.animationSystem.add(l);
    let r = s.carriedObjects.indexOf(t);
    return this.topo.carriedObjects.splice(r, 1), l.play();
  }
  putDown(t, e) {
    let i = this.topo;
    i.putDown(t), e == null && (e = this.defaultAnimationOptions);
    let o = new w();
    return o.setAttributes({ from: [t.x, t.y], to: [i.x, i.y], duration: e.duration, effect: e.effect, update: (n) => {
      t.x = n[0], t.y = n[1];
    } }), this.topo._stageRef.animationSystem.add(o), o.play();
  }
}
(function() {
  let a = document.head || document.getElementsByTagName("head")[0], t = document.getElementById("_jtopo_style_");
  t == null && (t = document.createElement("style"), t.id = "_jtopo_style_", t.textContent = `.jtopo_popoupmenu{padding:10px;border-radius:5px;min-width:210px;background-color:#fff;border:1px solid;position:absolute;z-index:10000}.jtopo_popoupmenu .header{font-size:14px;height:24px;padding-bottom:3px}.jtopo_popoupmenu a{text-rendering:optimizeLegibility;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;padding-left:20px;display:block;height:25px;color:#00000080;font-size:13px;cursor:pointer}.jtopo_popoupmenu a:hover{color:#000}.jtopo_iconsPanel{opacity:.98;padding:3px;position:absolute;background-color:#e8e8e8;top:20px;width:52px;z-index:1000;border-radius:5px}.jtopo_iconsPanel .item{border:1px solid white;width:42px;height:42px;margin:4px 2px 0}.jtopo_toolbar{border-bottom:1px dotted;padding-bottom:2px;border-color:#e0e0e0;width:100%;min-height:33px;background-color:#e8e8e8}.jtopo_toolbar .group{float:left;margin-right:5px}.jtopo_toolbar .item{float:left;width:32px;height:32px;stroke:gray;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;fill:none;font-size:12px;color:gray}.jtopo_toolbar .active{background-color:#d3d3d3;border:1px solid black}.jtopo_toolbar input[type=text]{font-size:12px;color:gray;float:left;width:120px;height:26px;border:1px solid white;margin:2px 2px 2px 4px}.jtopo_input_textfield{position:absolute;display:none;font-size:smaller;z-index:10000;border:1px gray dotted;padding:0;margin:0;word-break:none;word-wrap:none;outline:none;box-shadow:0 0 5px #0000ff80;overflow:hidden;resize:none}.jtopo_tooltip{pointer-events:none;opacity:.9;min-width:30px;min-height:30px;padding:10px;border-radius:5px;background-color:#f8f8f8;border:1px solid;position:absolute;z-index:10000}.jtopo_debugPanel{-webkit-user-select:none;user-select:none;border:dashed 1px gray;padding:8px;position:absolute;left:0;top:0%;width:300px;z-index:98;text-align:left;font-size:14px;color:gray}
`, a.appendChild(t));
})();
export {
  Mt as AssetsLoader,
  N as BlinkingArrowNode,
  W as GifNode,
  kt as InputTextfield,
  A as InputTextfieldEvent,
  j as JointLNode,
  wt as PopupMenu,
  X as PopupMenuEvent,
  C as RatioNode,
  I as RipplingNode,
  vt as Toolbar,
  bt as Tooltip,
  Et as TopoRobot,
  z as WaterLikeNode
};
