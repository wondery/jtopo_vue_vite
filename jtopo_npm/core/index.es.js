const Qt = document.createElement("canvas").getContext("2d");
class ki {
  constructor() {
  }
  static measureTextSize(t, e) {
    Qt.font = e;
    const i = Qt.measureText(t), s = i.actualBoundingBoxAscent + i.actualBoundingBoxDescent;
    return { width: i.actualBoundingBoxRight + i.actualBoundingBoxLeft, height: s };
  }
  static measureTextArraySize(t, e) {
    Qt.font = e;
    let i = Qt.measureText(t[0]);
    for (let r = 0; r < t.length; r++) {
      let n = Qt.measureText(t[r]);
      n.width > i.width && (i = n);
    }
    const s = i.actualBoundingBoxAscent + i.actualBoundingBoxDescent;
    return { width: i.actualBoundingBoxRight + i.actualBoundingBoxLeft, height: s };
  }
}
class As {
  static blobToUrl(t) {
    return URL.createObjectURL(t);
  }
  static dataUrlToBlob(t) {
    var e;
    const [i, s] = t.split(","), r = ((e = i.match(/:(.*?);/)) == null ? void 0 : e[1]) || "image/png", n = Uint8Array.from(atob(s), (o) => o.charCodeAt(0));
    return new Blob([n], { type: r });
  }
  static blobToDataUrl(t) {
    return new Promise((e, i) => {
      const s = new FileReader();
      s.onload = () => {
        e(s.result);
      }, s.onerror = (r) => i(r), s.readAsDataURL(t);
    });
  }
}
const Ci = document.createElement("canvas"), ii = class tt {
  static bgGrid(t, e, i, s, r = "#242424", n = "#151515") {
    let o = "<svg width='" + t + "' height='" + e + `' xmlns='http://www.w3.org/2000/svg'>
<rect x='0' y='0' width='` + t + "' height='" + e + "' style='fill:" + r + ";stroke:" + n + `;stroke-width:1;'/>
<g style='stroke:` + n + "; stroke-width:0.5;'>", l = e / i, h = t / s, c = "";
    for (let g = 1; g <= i; g++)
      c += "M 0 " + l * g + " H " + t + " ";
    o += "<path d='" + c + "'/>";
    let d = "";
    for (let g = 1; g <= s; g++)
      d += "M " + h * g + " 0 V " + e + " ";
    return o += "<path d='" + d + "'/>", o += "</g></svg>", o = o.replace(/\n/g, ""), o;
  }
  static createGridImage(t, e, i, s, r, n) {
    let o = tt.bgGrid(t, e, i, s, r, n);
    return 'url("' + tt.svgToImageUrl(o) + '")';
  }
  static createLightGridImg(t, e) {
    return tt.createGridImage(100, 100, 4, 4, t, e);
  }
  static createDarkGridImg(t, e) {
    return tt.createGridImage(100, 100, 4, 4, t, e);
  }
  static svgToImageUrl(t) {
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t)));
  }
  static svgToImage(t) {
    let e = new Image();
    return e.src = tt.svgToImageUrl(t), e;
  }
  static canvasColorFilter(t, e) {
    const i = t.getContext("2d"), s = i.getImageData(0, 0, t.width, t.height);
    let r = (n, o, l, h) => [e[0] * n / 255, e[1] * o / 255, e[2] * l / 255];
    typeof e == "function" && (r = e);
    for (let n = 0; n < s.data.length; n += 4) {
      let o = r(s.data[n], s.data[n + 1], s.data[n + 2], s.data[n + 3]);
      s.data[n] = o[0], s.data[n + 1] = o[1], s.data[n + 2] = o[2], o.length > 3 && o[3] != null && (s.data[n + 3] = o[3]);
    }
    i.putImageData(s, 0, 0);
  }
  static colorFilter(t, e) {
    const i = tt.canvas, s = tt.ctx;
    i.width = t.width, i.height = t.height, s.drawImage(t, 0, 0), tt.canvasColorFilter(i, e);
    const r = new Image();
    return r.src = i.toDataURL("image/png"), r;
  }
  static parseImgUrl(t) {
    if (t.startsWith("data:image/"))
      return t;
    if (t.startsWith("url(")) {
      let e = t.match(/url\((['"]?)(.*?)\1\)/);
      if (e)
        return e[2];
      throw new Error("Image url error: " + t);
    }
    return "";
  }
  static loadImageAsDataUrl(t) {
    return new Promise((e, i) => {
      try {
        if (t.startsWith("data:image/"))
          return void e(t);
        fetch(t).then((s) => {
          if (!s.ok)
            throw new Error("HTTP error! status: " + s.status + " : " + t);
          return s.blob();
        }).then((s) => As.blobToDataUrl(s)).then((s) => {
          e(s);
        });
      } catch (s) {
        i(s);
      }
    });
  }
  static svgToImageDataUrl(t, e, i) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg width="' + e + '" height="' + i + '" viewBox="0 0 ' + e + " " + i + '" xmlns="http://www.w3.org/2000/svg"><foreignObject width="100%" height="100%"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style>body{margin:0;padding:0;}</style>' + t + "</body></html></foreignObject></svg >").replace(/'/g, "%27").replace(/"/g, "%22");
  }
  static isImageValid(t) {
    return t.complete && t.naturalWidth > 0;
  }
  static loadAndConvertImage(t) {
    return tt.loadImageAsDataUrl(t);
  }
  static loadImageAsBase64(t) {
    return tt.loadImageAsDataUrl(t);
  }
  static svgToImageBase64(t, e, i) {
    return tt.svgToImageDataUrl(t, e, i);
  }
  static batchLoadImagesToBase64(t) {
    const e = t.map((i) => tt.loadImageAsDataUrl(i));
    return Promise.all(e);
  }
};
ii.canvas = Ci, ii.ctx = Ci.getContext("2d", { willReadFrequently: !0 });
let he = ii;
class P {
  static createPattern(t, e) {
    return `
            <pattern id="` + t + `" x="0" y="0" width="100%" height="100%">
                <image href="` + e.image + '" x="0" y="0" width="100%" height="100%" ' + e.repetition + ` />
            </pattern>
        `;
  }
  static createGradient(t, e) {
    return `
    <radialGradient 
      id="` + t + `" 
      cx="` + e.cx + '" cy="' + e.cy + `"  
      r="` + e.r + `"          
      fx="` + e.fx + '" fy="' + e.fy + `" 
      fr="` + e.fr + `"     
    >
      ` + e.colors.map((i) => `
        <stop offset="` + 100 * i[0] + '%" stop-color="' + i[1] + `" />
      `).join("") + `
    </radialGradient>
        `;
  }
  static createLinearGradient(t, e) {
    return `
            <linearGradient id="` + t + '" x1="' + e.startX + '" y1="' + e.startY + '" x2="' + e.stopX + '" y2="' + e.stopY + `">
                ` + e.colors.map((i) => `
                    <stop offset="` + 100 * i[0] + '%" stop-color="' + i[1] + `" />
                `).join("") + `
            </linearGradient>
        `;
  }
  static createFilter(t) {
    return `
     <filter id="` + t + `" filterUnits="userSpaceOnUse" x="-10000" y="-10000" width="20000" height="20000" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset in="blur" dx="3" dy="3" result="offsetBlur" />
      <feFlood flood-color="rgba(0,0,0,0.5)" result="shadowColor" />
      <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
        `;
  }
  static createSvg(t, e) {
    let i = document.createElementNS("http://www.w3.org/2000/svg", t);
    return e != null && i.setAttribute("name", e), i;
  }
  static foreignObjectsImagesToBase64(t) {
    let e = t.querySelector("canvas");
    if (e != null) {
      let n = e.toDataURL("image/png"), o = P.createSvg("image");
      return o.setAttribute("href", n), o.setAttribute("x", t.getAttribute("x") || ""), o.setAttribute("y", t.getAttribute("y") || ""), o.setAttribute("width", e.getAttribute("width") || ""), o.setAttribute("height", e.getAttribute("height") || ""), void t.replaceWith(o);
    }
    let i = t.innerHTML, s = he.svgToImageBase64(i, t.clientWidth, t.clientHeight), r = this.createSvg("image");
    r.setAttribute("href", s), r.setAttribute("x", t.getAttribute("x") || ""), r.setAttribute("y", t.getAttribute("y") || ""), r.setAttribute("width", t.getAttribute("width") || ""), r.setAttribute("height", t.getAttribute("height") || ""), t.replaceWith(r);
  }
  static toSvgXmlString(t, e, i) {
    let s = [], r = t.querySelectorAll("image");
    for (let n = 0; n < r.length; n++) {
      let o = r[n], l = o.getAttribute("href");
      if (l == null || l == "" || l.startsWith("data:image"))
        continue;
      let h = he.loadImageAsDataUrl(l).then((c) => {
        o.setAttribute("href", c);
      }).catch((c) => {
        console.error("Failed to convert image to base64:", c);
      });
      s.push(h);
    }
    return Promise.all(s).then(() => {
      let n = t.querySelectorAll("foreignObject");
      for (let o = 0; o < n.length; o++) {
        let l = n[o];
        P.foreignObjectsImagesToBase64(l);
      }
      return new XMLSerializer().serializeToString(t);
    });
  }
}
let Ls = function() {
  return navigator.userAgent.indexOf("Firefox") > 0;
};
const Ps = Object.freeze({ HandlerLayerCanvas: 99, FullWindowDom: 1e3, Link: 1, Node: 1 }), Zi = class {
  static addEventListener(a, t, e) {
    let i = a.attachEvent || a.addEventListener;
    Ls == 1 && t == "mousewheel" ? t = "DOMMouseScroll" : "attachEvent" in window && t.substring(0, 2) !== "on" && (t = "on" + t), i.call(a, t, e);
  }
  static createVideo(a, t) {
    if (typeof a == "string") {
      let e = document.createElement("video");
      e.muted = "muted", e.style.display = "none";
      let i = document.createElement("source");
      return i.setAttribute("_source", "jtopo"), i.type = "video/mp4", i.src = a, e.appendChild(i), document.body.appendChild(e), e.oncanplay = function() {
        t(e);
      }, e;
    }
    return a;
  }
  static fullWindow(a) {
    let t = "position,width,height,left,top,bottom,right,zIndex".split(",");
    if (a.fullScreen == 1) {
      let e = a._backup;
      t.forEach((i) => {
        a.style[i] = e[i];
      }), a.fullScreen = !1;
    } else {
      let e = {};
      t.forEach((i) => {
        e[i] = a.style[i];
      }), a._backup = e, a.style.position = "fixed", a.style.left = 0, a.style.top = 0, a.style.bottom = 0, a.style.right = 0, a.style.zIndex = Ps.FullWindowDom, a.fullScreen = !0;
    }
  }
  static fullScreen(a) {
    a.requestFullscreen ? a.requestFullscreen() : "mozRequestFullScreen" in a ? a.mozRequestFullScreen() : "webkitRequestFullscreen" in a ? a.webkitRequestFullscreen() : "msRequestFullscreen" in a && a.msRequestFullscreen();
  }
  static injectCss(a, t) {
    let e = document.head || document.getElementsByTagName("head")[0], i = document.getElementById(t);
    i == null && (i = document.createElement("style"), i.id = t, i.textContent = a, e.appendChild(i));
  }
};
Zi.isMobileDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
let Dt = Zi;
class v {
  constructor(t = 0, e = 0, i = 0, s = 0) {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.x = t, this.y = e, this.width = i, this.height = s;
  }
  setTo(t = 0, e = 0, i = 0, s = 0) {
    return this.x = t, this.y = e, this.width = i, this.height = s, this;
  }
  getRect() {
    return this;
  }
  clone() {
    return new v(this.x, this.y, this.width, this.height);
  }
  toString() {
    return "[x: " + this.x + " y:" + this.y + " width:" + this.width + " height:" + this.height + "]";
  }
  equals(t) {
    return t.x == this.x && t.y == this.y && t.width == this.width && t.height == this.height;
  }
  containsRect(t) {
    return t.x > this.x && t.right < this.right && t.y > this.y && t.bottom < this.bottom;
  }
  isEmpty() {
    return this.width == 0 || this.height == 0;
  }
  contains(t, e, i) {
    return i == null || i == 0 ? t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height : t >= this.x - i && t <= this.x + this.width + 2 * i && e >= this.y - i && e <= this.y + this.height + 2 * i;
  }
  isIntersectRect(t) {
    return !(t.x > this.right || t.y > this.bottom || t.right < this.x || t.bottom < this.y);
  }
  getCenter() {
    return { x: this.x + 0.5 * this.width, y: this.y + 0.5 * this.height };
  }
  toPoints() {
    return [{ x: this.x, y: this.y }, { x: this.right, y: this.y }, { x: this.right, y: this.bottom }, { x: this.x, y: this.bottom }];
  }
  static union(t, e) {
    let i = Math.min(t.x, e.x), s = Math.min(t.y, e.y), r = Math.max(t.right, e.right), n = Math.max(t.bottom, e.bottom);
    return t.setTo(i, s, r - i, n - s), t;
  }
  static unionRects(t) {
    let e = t[0].clone();
    for (let i = 1; i < t.length; i++)
      e = v.union(e, t[i]);
    return e;
  }
  get left() {
    return this.x;
  }
  set left(t) {
    this.x = t;
  }
  get right() {
    return this.x + this.width;
  }
  set right(t) {
    this.x = t - this.width;
  }
  get top() {
    return this.y;
  }
  set top(t) {
    this.y = t + this.height;
  }
  get bottom() {
    return this.y + this.height;
  }
  set bottom(t) {
    this.y = t - this.height;
  }
  get center() {
    return this.x + 0.5 * this.width;
  }
  set center(t) {
    this.x = t - 0.5 * this.width;
  }
  get middle() {
    return this.y + 0.5 * this.height;
  }
  set middle(t) {
    this.y = t - 0.5 * this.height;
  }
}
class _t {
  constructor() {
    this.points = [], this.aabb = new v();
  }
  contains(t, e) {
    return this.aabb.contains(t, e) != 0;
  }
  static toAABB(t, e, i) {
    let s = e[0], r = { x: s.x, y: s.y }, n = { x: s.x, y: s.y }, o = { x: s.x, y: s.y }, l = { x: s.x, y: s.y };
    for (let h = 1; h < e.length; h++) {
      let c = e[h];
      c.x < r.x && (r.x = c.x), c.x > n.x && (n.x = c.x), c.y < o.y && (o.y = c.y), c.y > l.y && (l.y = c.y);
    }
    return i == null ? t.setTo(r.x, o.y, n.x - r.x, l.y - o.y) : (t.setTo(r.x - i, o.y - i, n.x - r.x + i + i, l.y - o.y + i + i), t);
  }
}
function Ai(a, t, e) {
  return a[0] = t[0] * e, a[1] = t[1] * e, a;
}
function Li(a, t) {
  return a[0] * t[0] + a[1] * t[1];
}
const yt = class {
};
yt.multiplyC = Ai, yt.scale = function(a, t, e) {
  return a[0] = t[0] * e, a[1] = t[1] * e, a;
}, yt.len = function(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}, yt.negate = function(a, t) {
  return a[0] = -t[0], a[1] = -t[1], a;
}, yt.add = function(a, t, e) {
  return a[0] = t[0] + e[0], a[1] = t[1] + e[1], a;
}, yt.normalize = function(a, t) {
  if (t[0] == 0 && t[1] == 0)
    return a[0] = 0, a[1] = 0, a;
  let e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
  return e == 0 ? (a[0] = 0, a[0] = 0, a) : (a[0] = t[0] / e, a[1] = t[1] / e, a);
}, yt.dot = Li, yt.projection = function(a, t, e) {
  return Ai(a, e, Li(t, e)), a;
}, yt.cross = function(a, t) {
  return a[0] * t[1] - a[1] * t[0];
};
let T = yt;
const Qi = class R {
  static isLikePoint(t) {
    return Object.keys(t).length == 2 && t.x != null && t.y != null;
  }
  static looksSame(t, e, i) {
    if (t === e)
      return !0;
    let s = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
    return i == null && (i = 0.01), s < i && r < i;
  }
  static middle(t, e) {
    return { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2 };
  }
  static getAngle(t, e, i, s) {
    return Math.atan2(s - e, i - t);
  }
  static rotate(t, e, i, s, r) {
    return { x: (t - i) * Math.cos(r) - (e - s) * Math.sin(r) + i, y: (t - i) * Math.sin(r) + (e - s) * Math.cos(r) + s };
  }
  static distance(t, e, i, s) {
    return Math.sqrt((i - t) * (i - t) + (s - e) * (s - e));
  }
  static distancePoint(t, e) {
    let i = e.x - t.x, s = e.y - t.y;
    return Math.sqrt(i * i + s * s);
  }
  static mergeClosestPoints(t, e = R.PointClosestEpsilon) {
    let i = [t[0]];
    for (let s = 1; s < t.length - 1; s++) {
      let r = i[i.length - 1], n = t[s], o = t[s + 1];
      if (n.x === o.x && n.y === o.y)
        continue;
      let l = T.normalize([], [n.x - r.x, n.y - r.y]), h = T.normalize([], [o.x - n.x, o.y - n.y]);
      Math.abs(l[0] - h[0]) < e && Math.abs(l[1] - h[1]) < e || i.push(n);
    }
    return i.push(t[t.length - 1]), i;
  }
  static forward(t, e, i) {
    let s = Math.atan2(e.y - t.y, e.x - t.x);
    return { x: t.x + i * Math.cos(s), y: t.y + i * Math.sin(s) };
  }
  static offsetWithAngle(t, e, i) {
    return typeof i == "number" && (i = { x: Math.cos(e) * i, y: Math.sin(e) * i }), { x: t.x + i.x, y: t.y + i.y };
  }
  static createPoints(t, e, i = 1, s = !1) {
    const r = s ? [t] : [], n = s ? i - 1 : i;
    let o = t;
    for (let l = 0; l < n; l++) {
      const h = { x: o.x + e[0], y: o.y + e[1] };
      r.push(h), o = h;
    }
    return r;
  }
  static createPointsBidirectional(t, e, i) {
    if (i == 0)
      return [];
    const s = [-e[0], -e[1]];
    if (i % 2 == 0) {
      const o = [e[0] / 2, e[1] / 2], l = { x: t.x - o[0], y: t.y - o[1] }, h = { x: t.x + o[0], y: t.y + o[1] }, c = R.createPoints(l, s, i / 2, !0), d = R.createPoints(h, e, i / 2, !0);
      return c.concat(d);
    }
    const r = R.createPoints(t, s, (i - 1) / 2 + 1, !0), n = R.createPoints(t, e, (i - 1) / 2, !1);
    return r.concat(n);
  }
  static lerp(t, e, i) {
    return { x: (e.x - t.x) * i + t.x, y: (e.y - t.y) * i + t.y };
  }
  static sumDistance(t, e) {
    let i = t.length;
    if (i < 2)
      throw new Error("points.length < 2");
    let s = t[0], r = t[i - 1];
    if (t.length == 2)
      return R.distance(s.x, s.y, r.x, r.y);
    let n = 0;
    for (let o = 1; o < i; o++)
      n += R.distancePoint(t[o - 1], t[o]);
    return e && (n += R.distance(r.x, r.y, s.x, s.y)), n;
  }
  static lerpOnLines(t, e, i) {
    let s = t.length;
    if (t.length < 2)
      throw new Error("points.length < 2");
    let r = t[0], n = t[t.length - 1];
    if (t.length == 2)
      return R.lerp(r, n, e);
    if (e < 0)
      return R.lerp(t[0], t[1], e);
    if (e > 1)
      return i ? R.lerp(t[s - 1], t[0], e) : R.lerp(t[t.length - 2], t[t.length - 1], e);
    let o = R.sumDistance(t, i) * e, l = 0;
    for (let h = 1; h < s; h++) {
      let c = R.distancePoint(t[h - 1], t[h]);
      if (o >= l && o <= l + c) {
        let d = (o - l) / c;
        return R.lerp(t[h - 1], t[h], d);
      }
      l += c;
    }
    if (i) {
      let h = R.distancePoint(t[s - 1], t[0]);
      if (o >= l && o <= l + h) {
        let c = (o - l) / h;
        return R.lerp(t[s - 1], t[0], c);
      }
    }
    throw console.log(t, e), new Error("assert error betweenPoints");
  }
};
Qi.PointClosestEpsilon = 0.01;
let N = Qi;
class Y {
  static allocate() {
    return new Y();
  }
  constructor() {
    this.m = new Float32Array([1, 0, 0, 1, 0, 0]);
  }
  release() {
  }
  copy() {
    let t = new Y();
    return t.m = this.m.slice(), t;
  }
  identity() {
    this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0;
  }
  skew(t, e) {
    this.m[1] = t, this.m[2] = e;
  }
  transform(t, e, i, s, r, n) {
    let o = [t, e, i, s, r, n], l = this.m[0] * o[0] + this.m[2] * o[1], h = this.m[1] * o[0] + this.m[3] * o[1], c = this.m[0] * o[2] + this.m[2] * o[3], d = this.m[1] * o[2] + this.m[3] * o[3];
    this.m[0] = l, this.m[1] = h, this.m[2] = c, this.m[3] = d, this.m[4] += r, this.m[5] += n;
  }
  point(t) {
    let e = this.m;
    return { x: e[0] * t.x + e[2] * t.y + e[4], y: e[3] * t.y + e[1] * t.x + e[5] };
  }
  pointXY(t, e) {
    let i = this.m;
    return { x: i[0] * t + i[2] * e + i[4], y: i[3] * e + i[1] * t + i[5] };
  }
  vec(t, e) {
    let i = this.m;
    return t[0] = i[0] * e[0] + i[2] * e[1], t[1] = i[3] * e[1] + i[1] * e[0], t;
  }
  points(t, e) {
    t.length = e.length;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      t[i] = this.pointXY(s.x, s.y);
    }
    return t;
  }
  translate(t, e) {
    return this.m[4] = this.m[0] * t + this.m[2] * e, this.m[5] = this.m[1] * t + this.m[3] * e, this;
  }
  translateTo(t, e) {
    return this.m[4] = t, this.m[5] = e, this;
  }
  scale(t, e) {
    return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this;
  }
  hasRotation() {
    return this.m[1] !== 0 || this.m[2] !== 0;
  }
  getRotation() {
    return this.m[1] === 0 && this.m[2], Math.atan2(this.m[1], this.m[0]);
  }
  rotate(t) {
    let e = Math.cos(t), i = Math.sin(t), s = this.m[0] * e + this.m[2] * i, r = this.m[1] * e + this.m[3] * i, n = this.m[0] * -i + this.m[2] * e, o = this.m[1] * -i + this.m[3] * e;
    return this.m[0] = s, this.m[1] = r, this.m[2] = n, this.m[3] = o, this;
  }
  static multiply(t, e, i) {
    let s = e.m, r = i.m;
    const n = s[0] * r[0] + s[2] * r[1], o = s[1] * r[0] + s[3] * r[1], l = s[0] * r[2] + s[2] * r[3], h = s[1] * r[2] + s[3] * r[3], c = s[0] * r[4] + s[2] * r[5] + s[4], d = s[1] * r[4] + s[3] * r[5] + s[5];
    t.m[0] = n, t.m[1] = o, t.m[2] = l, t.m[3] = h, t.m[4] = c, t.m[5] = d;
  }
  invert() {
    return Y.invert(new Y(), this);
  }
  static invert(t, e) {
    let i = 1 / (e.m[0] * e.m[3] - e.m[1] * e.m[2]), s = e.m[3] * i, r = -e.m[1] * i, n = -e.m[2] * i, o = e.m[0] * i, l = i * (e.m[2] * e.m[5] - e.m[3] * e.m[4]), h = i * (e.m[1] * e.m[4] - e.m[0] * e.m[5]);
    return t.m[0] = s, t.m[1] = r, t.m[2] = n, t.m[3] = o, t.m[4] = l, t.m[5] = h, t;
  }
  static fillFrom(t, e) {
    t.m[0] = e[0], t.m[1] = e[1], t.m[2] = e[2], t.m[3] = e[3], t.m[4] = e[4], t.m[5] = e[5];
  }
  rotateByXY(t, e, i) {
    this.translate(t, e), this.rotate(i), this.translate(-t, -e);
  }
}
class H {
  static normalizePoints(t) {
    let e = H.getBoundingBox(t);
    e.width == 0 && (e.width = 1), e.height == 0 && (e.height = 1);
    let i = e.x + 0.5 * e.width, s = e.y + 0.5 * e.height, r = 0.5 * e.width, n = 0.5 * e.height;
    return t.map((o) => ({ x: (o.x - i) / r, y: (o.y - s) / n }));
  }
  static pointsToNormalVecs(t, e, i = !1) {
    for (let s = 0; s < e.length - 1; s++) {
      let r = e[s], n = e[s + 1], o = [n.x - r.x, n.y - r.y], l = [-o[1], o[0]];
      t[s] = l;
    }
    if (i) {
      let s = e[e.length - 1], r = e[0], n = [r.x - s.x, r.y - s.y], o = [-n[1], n[0]];
      t[e.length - 1] = o;
    }
  }
  static rotatePoints(t, e, i = 0, s = 0) {
    if (e == 0 || e % (2 * Math.PI) == 0)
      return t.slice();
    let r = t.map((n) => N.rotate(n.x, n.y, i, s, e));
    return H.normalizePoints(r);
  }
  static normalizeRects(t, e) {
    let i = new v();
    i.setTo(t[0].x, t[0].y, t[0].width, t[0].height);
    for (let l = 1; l < t.length; l++)
      v.union(i, t[l]);
    let s = i.width, r = i.height, n = i.x, o = i.y;
    return t.map((l) => {
      let h = l.width / s, c = l.height / r, d = (l.x - n) / s, g = (l.y - o) / r, y = h * e.width, f = c * e.height, m = e.x + d * e.width, p = e.y + g * e.height;
      return new v(m, p, y, f);
    });
  }
  static getBoundingBox(t) {
    let e = Number.MAX_SAFE_INTEGER, i = Number.MAX_SAFE_INTEGER, s = Number.MIN_SAFE_INTEGER, r = Number.MIN_SAFE_INTEGER;
    return t.forEach(function(n) {
      n.x < e && (e = n.x), n.y < i && (i = n.y), n.x > s && (s = n.x), n.y > r && (r = n.y);
    }), new v(e, i, s - e, r - i);
  }
  static isPointInPolygon(t, e) {
    let i = t.x, s = t.y, r = !1;
    for (let n = 0, o = e.length - 1; n < e.length; o = n++) {
      let l = e[n].x, h = e[n].y, c = e[o].x, d = e[o].y;
      h > s != d > s && i < (c - l) * (s - h) / (d - h) + l && (s !== h || s > d) && (r = !r);
    }
    return r;
  }
  static getLineIntersectPoint(t, e, i, s) {
    let r = t.x, n = t.y, o = e.x, l = e.y, h = i.x, c = i.y, d = s.x, g = s.y, y = (r - o) * (c - g) - (n - l) * (h - d);
    const f = 1e-6;
    if (Math.abs(y) < f)
      return null;
    let m = ((d - h) * (n - c) - (g - c) * (r - h)) / y, p = ((o - r) * (n - c) - (l - n) * (r - h)) / y;
    return m >= -f && m <= 1 + f && p >= -f && p <= 1 + f ? { x: r + m * (o - r), y: n + m * (l - n) } : null;
  }
  static getLineIntersectPoints(t, e, i, s) {
    let r = [];
    for (let n = 0; n < i.length - 1; n++) {
      let o = H.getLineIntersectPoint(t, e, i[n], i[n + 1]);
      o && r.push(o);
    }
    if (s) {
      let n = H.getLineIntersectPoint(t, e, i[i.length - 1], i[0]);
      n && r.push(n);
    }
    return r;
  }
  static getFirstIntersectPoint(t, e, i, s) {
    for (let r = 0; r < i.length - 1; r++) {
      let n = H.getLineIntersectPoint(t, e, i[r], i[r + 1]);
      if (n)
        return n;
    }
    if (s) {
      let r = H.getLineIntersectPoint(t, e, i[i.length - 1], i[0]);
      if (r)
        return r;
    }
    return null;
  }
}
const $i = /* @__PURE__ */ new Map([["lt", { x: -1, y: -1 }], ["ct", { x: 0, y: -1 }], ["rt", { x: 1, y: -1 }], ["lm", { x: -1, y: 0 }], ["center", { x: 0, y: 0 }], ["rm", { x: 1, y: 0 }], ["lb", { x: -1, y: 1 }], ["cb", { x: 0, y: 1 }], ["rb", { x: 1, y: 1 }]]), Os = /* @__PURE__ */ new Map(), Ts = $i.keys();
for (let a of Ts) {
  let t = $i.get(a), e = T.normalize([], [t.x, t.y]);
  Os.set(a, e);
}
class Vt {
  constructor(t = 0, e = 0) {
    this.length = 0, this.x = t, this.y = e;
  }
}
function $t(a, t, e, i) {
  return Math.sqrt((e - a) * (e - a) + (i - t) * (i - t));
}
function ts(a, t, e, i = 100, s = 1e-6) {
  let r = e;
  for (let n = 0; n < i; n++) {
    const o = t(r);
    if (Math.abs(o) < s)
      break;
    const l = r - a(r) / o;
    if (Math.abs(l - r) < s) {
      r = l;
      break;
    }
    r = l;
  }
  return r;
}
function Pi(a, t, e, i) {
  const s = [a - e.x, t - e.y], r = [i.x - e.x, i.y - e.y], n = T.normalize([], r), o = T.len(r);
  let l;
  const h = T.dot(s, n);
  if (h > o)
    l = i;
  else if (h < 0)
    l = e;
  else {
    let d = T.multiplyC([1, 1], n, h);
    l = { x: e.x + d[0], y: e.y + d[1] };
  }
  let c = new Vt(l.x, l.y);
  return c.segLen = o, c.projectionLen = h, c.t = h / o, c;
}
function Ee(a, t, e, i) {
  let s = [a.x - t.x, a.y - t.y], r = [e.x - t.x, e.y - t.y], n = s[0] * r[1] - s[1] * r[0];
  if (Math.abs(n) > i)
    return !1;
  let o = s[0] * r[0] + s[1] * r[1];
  return !(o < 0 || o > r[0] * r[0] + r[1] * r[1]);
}
const Ft = function(a) {
  return Math.abs(Math.abs(a) % Math.PI) < 0.5;
}, xi = function(a, t, e, i = !1) {
  if (e.length < 2)
    throw new Error("number of points is less than 2");
  let s = new Vt(e[0].x, e[0].y), r = Number.MAX_SAFE_INTEGER;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], l = e[n + 1], h = Pi(a, t, o, l), c = N.distance(h.x, h.y, a, t);
    c < r && (s = h, s.seg = [o, l], s.dist = c, s.segIndex = n, r = c);
  }
  if (i) {
    const n = e[e.length - 1], o = e[0], l = Pi(a, t, n, o), h = N.distance(l.x, l.y, a, t);
    h < r && (s = l, s.seg = [n, o], s.dist = h, s.segIndex = e.length - 1, r = h);
  }
  return s;
}, Es = function(a, t, e, i, s = !1) {
  const r = [t.x - a.x, t.y - a.y], n = [i.x - e.x, i.y - e.y], o = T.normalize([], [-r[1], r[0]]), l = T.normalize([], [-n[1], n[0]]), h = o[0], c = o[1], d = l[0], g = l[1], y = h * g - d * c;
  if (y == 0)
    return null;
  const f = T.dot(o, [a.x, a.y]), m = T.dot(l, [e.x, e.y]), p = { x: (g * f - c * m) / y, y: (h * m - d * f) / y };
  if (s == 0) {
    let x = 0;
    if (!Ee(p, a, t, x) || !Ee(p, e, i, x))
      return null;
  }
  return p;
}, Ds = function(a, t, e, i) {
  for (let s = 0; s < t.length - 1; s++)
    if (Ee(a, t[s], t[s + 1], i))
      return !0;
  return !(!e || !Ee(a, t[t.length - 1], t[0], i));
};
class Xe {
  constructor(t, e) {
    this.x = 0, this.y = 0, this.scaleX = 1, this.scaleY = 1, this.width = 1, this.height = 1, this.rotation = 0, this.objects = t, this.positions = e, this.positionNormals = H.normalizePoints(e);
    let i = H.getBoundingBox(e);
    this.width = i.width, this.height = i.height;
  }
  resize(t, e) {
    return this.width = t, this.height = e, this;
  }
  resizeWith(t, e) {
    return this.width += t, this.height += e, this;
  }
  translate(t, e) {
    return this.x = t, this.y = e, this;
  }
  translateWith(t, e) {
    return this.x += t, this.y += e, this;
  }
  scale(t, e) {
    return this.scaleX = t, this.scaleY = e, this;
  }
  scaleBy(t, e) {
    this.scaleX *= t, this.scaleY *= e, this.resize;
  }
  rotate(t) {
    return this.rotation = t, this;
  }
  rotateWith(t) {
    return this.rotation += t, this;
  }
  updateXY(t) {
    const e = this.objects;
    let i = Math.min(t.length, e.length);
    for (let s = 0; s < i; s++) {
      let r = t[s];
      e[s].translate(r.x, r.y);
    }
  }
  doLayout(t) {
    let e = this, i = this.objects, s = this.positionNormals;
    if (s = s.map((r) => {
      let n = { x: 0.5 * e.width * r.x * e.scaleX + e.x, y: 0.5 * e.height * r.y * e.scaleY + e.y };
      return (this.rotation !== 0 || this.rotation % 6.283185307179586 != 0) && (n = N.rotate(n.x, n.y, e.x, e.y, this.rotation)), n;
    }), t != null) {
      let r = function(l) {
        return e.updateXY(l);
      }, n = i.map((l) => ({ x: l.x, y: l.y })), o = Object.assign({ from: n, to: s, update: r }, t);
      this.animationSystem.anim(o).play();
    } else
      this.updateXY(s);
    return this;
  }
}
class Ht {
  constructor(t = 0, e = 0, i = 1, s = 1) {
    this.x = 0, this.y = 0, this.width = 1, this.height = 1, this.rect = new v(0, 0, 1, 1), this.children = [], this.level = 0, this.x = t, this.y = e, this.width = i, this.height = s;
  }
  fromObject(t) {
    this.object = t, this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;
  }
  setObject(t) {
    this.object = t;
  }
  getRect(t = !1) {
    return this.rect.setTo(this.x, this.y, this.width, this.height), t ? v.union(this.rect, this.getChildrenRect(!0)) : this.rect;
  }
  getChildrenRect(t) {
    let e = this.children, i = e[0].getRect(t);
    for (let s = 1; s < e.length; s++)
      i = v.union(i, e[s].getRect(t));
    return i;
  }
  translateWith(t, e) {
    this.x += t, this.y += e;
  }
  translate(t, e) {
    this.x = t, this.y = e;
  }
  addChild(t) {
    t.parent = this, this.children.push(t);
  }
  translateWithRecursive(t, e) {
    this.translateWith(t, e);
    let i = this.children;
    for (let s = 0; s < i.length; s++)
      i[s].translateWithRecursive(t, e);
  }
  flatten(t) {
    let e = [];
    for (let i = 0; i < this.children.length; i++) {
      let s = this.children[i];
      if ((t == null || t(s) == 1) && (e.push(s), s.children && s.children.length > 0)) {
        let r = Ht.flatten(s.children, t);
        e = e.concat(r);
      }
    }
    return e;
  }
  toString() {
    return this.object.text + ": 	" + Ht.flatten(this.children).map((t) => t.object.text).join(",");
  }
  static getVNodeUnionRect(t) {
    let e = t[0].getRect();
    for (let i = 1; i < t.length; i++)
      e = v.union(e, t[i].getRect());
    return e;
  }
  static flatten(t, e) {
    let i = [];
    for (let s = 0; s < t.length; s++) {
      let r = t[s];
      if ((e == null || e(r) == 1) && (i.push(r), r.children && r.children.length > 0)) {
        let n = Ht.flatten(r.children, e);
        i = i.concat(n);
      }
    }
    return i;
  }
}
class Ms {
  constructor(t) {
    this.deep = 0, this.root = t, this.descendants = t.flatten(), this.allVirtualNodes = [t].concat(this.descendants), this.allObjects = this.allVirtualNodes.map((e) => e.object), this.indexData = [], this.index();
  }
  index() {
    let t = [];
    const e = this;
    (function i(s, r) {
      e.deep < r && (e.deep = r);
      let n = s.children, o = t[r];
      o == null && (o = [], t[r] = o), o.push(s);
      for (let l = 0; l < n.length; l++)
        i(n[l], r + 1);
    })(this.root, 0), this.indexData = t;
  }
  getRect() {
    const t = this.root.flatten();
    if (t.length == 0)
      throw new Error("getRect() in empty tree");
    let e = t[0].getRect();
    for (let i = 1; i < t.length; i++) {
      const s = t[i];
      e = v.union(e, s.getRect());
    }
    return e;
  }
  centerTo(t, e) {
    const i = this.allVirtualNodes;
    let s = this.root.getRect();
    i.forEach((l) => {
      s = v.union(s, l.getRect());
    });
    let r = s.getCenter(), n = t - r.x, o = e - r.y;
    return i.forEach((l) => {
      l.translateWith(n, o);
    }), this;
  }
  translateTo(t, e) {
    const i = this.allVirtualNodes;
    let s = this.root.getRect();
    i.forEach((o) => {
      s = v.union(s, o.getRect());
    });
    let r = t - s.x, n = e - s.y;
    return i.forEach((o) => {
      o.translateWith(r, n);
    }), this;
  }
  translateWith(t, e) {
    return this.allVirtualNodes.forEach((i) => {
      i.translateWith(t, e);
    }), this;
  }
  getLeafs() {
    return this.indexData[this.deep];
  }
}
class O {
  constructor(t) {
    this._subscribe = t, this._subscribers = [], this._isCompleted = !1, this._error = null;
  }
  subscribe(t) {
    if (this._isCompleted)
      return { unsubscribe: () => {
      }, closed: !0 };
    if (this._error)
      return typeof t == "function" || t.error && t.error(this._error), { unsubscribe: () => {
      }, closed: !0 };
    const e = typeof t == "function" ? { next: t } : t;
    this._subscribers.push(e);
    const i = this._subscribe(e);
    return this._isCompleted || this._error ? { unsubscribe: () => {
    }, closed: !0 } : { unsubscribe: () => {
      i(), this._removeSubscriber(e);
    }, closed: !1 };
  }
  _removeSubscriber(t) {
    const e = this._subscribers.indexOf(t);
    e > -1 && this._subscribers.splice(e, 1);
  }
  next(t) {
    this._isCompleted || this._error || this._subscribers.forEach((e) => {
      try {
        e.next(t);
      } catch (i) {
        console.error("Error in observer:", i), e.error && e.error(i);
      }
    });
  }
  error(t) {
    this._isCompleted || (this._error = t, this._subscribers.forEach((e) => {
      if (e.error)
        try {
          e.error(t);
        } catch (i) {
          console.error("Error in error handler:", i);
        }
    }), this._subscribers = []);
  }
  complete() {
    this._isCompleted || this._error || (this._isCompleted = !0, this._subscribers.forEach((t) => {
      if (t.complete)
        try {
          t.complete();
        } catch (e) {
          console.error("Error in complete handler:", e);
        }
    }), this._subscribers = []);
  }
  map(t) {
    return new O((e) => {
      let i = 0;
      const s = this.subscribe({ next: (r) => {
        var n;
        try {
          const o = t(r, i++);
          e.next(o);
        } catch (o) {
          (n = e.error) == null || n.call(e, o);
        }
      }, error: e.error, complete: e.complete });
      return () => s.unsubscribe();
    });
  }
  filter(t) {
    return new O((e) => {
      let i = 0;
      const s = this.subscribe({ next: (r) => {
        var n;
        try {
          t(r, i++) && e.next(r);
        } catch (o) {
          (n = e.error) == null || n.call(e, o);
        }
      }, error: e.error, complete: e.complete });
      return () => s.unsubscribe();
    });
  }
  distinctUntilChanged(t) {
    return new O((e) => {
      let i, s = !0;
      const r = this.subscribe({ next: (n) => {
        (s || (t ? !t(i, n) : n !== i)) && (s = !1, i = n, e.next(n));
      }, error: e.error, complete: e.complete });
      return () => r.unsubscribe();
    });
  }
  throttle(t) {
    return new O((e) => {
      let i = 0, s = null;
      const r = this.subscribe({ next: (n) => {
        const o = Date.now();
        if (o - i >= t)
          i = o, e.next(n);
        else {
          s && clearTimeout(s);
          const l = Math.max(0, t - (o - i));
          s = setTimeout(() => {
            i = Date.now(), e.next(n);
          }, l);
        }
      }, error: e.error, complete: () => {
        var n;
        s && clearTimeout(s), (n = e.complete) == null || n.call(e);
      } });
      return () => {
        s && clearTimeout(s), r.unsubscribe();
      };
    });
  }
  debounce(t) {
    return new O((e) => {
      let i = null;
      const s = this.subscribe({ next: (r) => {
        i && clearTimeout(i), i = setTimeout(() => {
          e.next(r);
        }, t);
      }, error: e.error, complete: () => {
        var r;
        i && clearTimeout(i), (r = e.complete) == null || r.call(e);
      } });
      return () => {
        i && clearTimeout(i), s.unsubscribe();
      };
    });
  }
  merge(t) {
    return new O((e) => {
      let i = !1, s = !1, r = !1, n = null, o = null;
      return n = this.subscribe({ next: (l) => {
        !r && e.next(l);
      }, error: e.error, complete: () => {
        var l;
        i = !0, !s && !r && (r = !0, (l = e.complete) == null || l.call(e), o && o.unsubscribe());
      } }), o = t.subscribe({ next: (l) => {
        !r && e.next(l);
      }, error: e.error, complete: () => {
        var l;
        s = !0, !i && !r && (r = !0, (l = e.complete) == null || l.call(e), n && n.unsubscribe());
      } }), () => {
        r = !0, n && n.unsubscribe(), o && o.unsubscribe();
      };
    });
  }
  mergeMap(t) {
    return new O((e) => {
      let i = 0, s = !1;
      const r = [], n = () => {
        var l;
        s && i === 0 && ((l = e.complete) == null || l.call(e));
      }, o = this.subscribe({ next: (l) => {
        var h;
        if (!s)
          try {
            const c = t(l);
            i++;
            const d = c.subscribe({ next: (g) => e.next(g), error: e.error, complete: () => {
              i--;
              const g = r.indexOf(d);
              g > -1 && r.splice(g, 1), n();
            } });
            r.push(d);
          } catch (c) {
            (h = e.error) == null || h.call(e, c);
          }
      }, error: e.error, complete: () => {
        s = !0, n();
      } });
      return () => {
        r.forEach((l) => l.unsubscribe()), o.unsubscribe();
      };
    });
  }
  take(t) {
    return new O((e) => {
      let i = 0, s = null;
      return s = this.subscribe({ next: (r) => {
        var n;
        i >= t || (e.next(r), i++, i >= t && s && ((n = e.complete) == null || n.call(e), s.unsubscribe(), s = null));
      }, error: e.error, complete: e.complete }), () => {
        s && s.unsubscribe();
      };
    });
  }
  skip(t) {
    return new O((e) => {
      let i = 0;
      const s = this.subscribe({ next: (r) => {
        i < t ? i++ : e.next(r);
      }, error: e.error, complete: e.complete });
      return () => s.unsubscribe();
    });
  }
  static create(t) {
    return new O(t);
  }
  static fromArray(t) {
    return new O((e) => {
      var i;
      return t.forEach((s) => e.next(s)), (i = e.complete) == null || i.call(e), () => {
      };
    });
  }
  static interval(t) {
    return new O((e) => {
      let i = 0;
      const s = setInterval(() => {
        e.next(i++);
      }, t);
      return () => clearInterval(s);
    });
  }
  static merge(...t) {
    return new O((e) => {
      let i = 0;
      const s = t.length, r = t.map((n) => n.subscribe({ next: (o) => e.next(o), error: e.error, complete: () => {
        var o;
        i++, i === s && ((o = e.complete) == null || o.call(e));
      } }));
      return () => {
        r.forEach((n) => n.unsubscribe());
      };
    });
  }
  static empty() {
    return new O((t) => {
      var e;
      return (e = t.complete) == null || e.call(t), () => {
      };
    });
  }
  static fromEvent(t, e, i) {
    return new O((s) => {
      const r = (n) => {
        s.next(n);
      };
      return t.addEventListener(e, r, i), () => {
        t.removeEventListener(e, r, i);
      };
    });
  }
  static fromEventBus(t, e) {
    return new O((i) => t.on(e, (s) => {
      i.next(s);
    }));
  }
  scan(t, e) {
    return new O((i) => {
      let s = e, r = 0;
      const n = this.subscribe({ next: (o) => {
        s = t(s, o, r++), i.next(s);
      }, error: i.error, complete: i.complete });
      return () => n.unsubscribe();
    });
  }
  startWith(...t) {
    return new O((e) => {
      t.forEach((s) => e.next(s));
      const i = this.subscribe({ next: (s) => e.next(s), error: e.error, complete: e.complete });
      return () => i.unsubscribe();
    });
  }
  static of(...t) {
    return O.fromArray(t);
  }
  bufferCount(t, e) {
    return new O((i) => {
      const s = [];
      let r = 0;
      const n = this.subscribe({ next: (o) => {
        r % e === 0 && s.push([]);
        for (let l = s.length - 1; l >= 0; l--)
          s[l].push(o), s[l].length === t && (i.next([...s[l]]), s.splice(l, 1));
        r++;
      }, error: (o) => {
        var l;
        return (l = i.error) == null ? void 0 : l.call(i, o);
      }, complete: () => {
        var o;
        s.forEach((l) => {
          l.length > 0 && i.next([...l]);
        }), (o = i.complete) == null || o.call(i);
      } });
      return () => n.unsubscribe();
    });
  }
  bufferSize(t) {
    if (t <= 0)
      return this;
    const e = [], i = [];
    let s = null, r = !1, n = null;
    return new O((o) => {
      var l, h;
      return r ? (e.forEach((c) => o.next(c)), (l = o.complete) == null || l.call(o), () => {
      }) : n ? ((h = o.error) == null || h.call(o, n), () => {
      }) : (e.forEach((c) => {
        try {
          o.next(c);
        } catch (d) {
          console.error("Error replaying buffered value:", d), o.error && o.error(d);
        }
      }), i.push(o), i.length === 1 && !s && (s = this.subscribe({ next: (c) => {
        e.push(c), e.length > t && e.shift(), i.forEach((d) => {
          try {
            d.next(c);
          } catch (g) {
            console.error("Error in observer:", g), d.error && d.error(g);
          }
        });
      }, error: (c) => {
        n = c, i.forEach((d) => {
          if (d.error)
            try {
              d.error(c);
            } catch (g) {
              console.error("Error in error handler:", g);
            }
        }), i.length = 0;
      }, complete: () => {
        r = !0, i.forEach((c) => {
          if (c.complete)
            try {
              c.complete();
            } catch (d) {
              console.error("Error in complete handler:", d);
            }
        }), i.length = 0;
      } })), () => {
        const c = i.indexOf(o);
        c > -1 && i.splice(c, 1), i.length === 0 && s && (s.unsubscribe(), s = null);
      });
    });
  }
  destroy() {
    this._subscribers = [], this._isCompleted = !0, this._error = null;
  }
}
function Oi(a, t, e, i) {
  return e - si(i - a, 0, e, i) + t;
}
function si(a, t, e, i) {
  return (a /= i) < 1 / 2.75 ? e * (7.5625 * a * a) + t : a < 2 / 2.75 ? e * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + t : a < 2.5 / 2.75 ? e * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + t : e * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + t;
}
const zs = { easeLinear: function(a, t, e, i) {
  return e * a / i + t;
}, easeInQuad: function(a, t, e, i) {
  return e * (a /= i) * a + t;
}, easeOutQuad: function(a, t, e, i) {
  return -e * (a /= i) * (a - 2) + t;
}, easeInOutQuad: function(a, t, e, i) {
  return (a /= i / 2) < 1 ? e / 2 * a * a + t : -e / 2 * (--a * (a - 2) - 1) + t;
}, easeInSine: function(a, t, e, i) {
  return -e * Math.cos(a / i * (Math.PI / 2)) + e + t;
}, easeOutSine: function(a, t, e, i) {
  return e * Math.sin(a / i * (Math.PI / 2)) + t;
}, easeInOutSine: function(a, t, e, i) {
  return -e / 2 * (Math.cos(Math.PI * a / i) - 1) + t;
}, easeInExpo: function(a, t, e, i) {
  return a == 0 ? t : e * Math.pow(2, 10 * (a / i - 1)) + t;
}, easeInOutExpo: function(a, t, e, i) {
  return a == 0 ? t : a == i ? t + e : (a /= i / 2) < 1 ? e / 2 * Math.pow(2, 10 * (a - 1)) + t : e / 2 * (2 - Math.pow(2, -10 * --a)) + t;
}, easeInCirc: function(a, t, e, i) {
  return -e * (Math.sqrt(1 - (a /= i) * a) - 1) + t;
}, easeOutCirc: function(a, t, e, i) {
  return e * Math.sqrt(1 - (a = a / i - 1) * a) + t;
}, easeInOutCirc: function(a, t, e, i) {
  return (a /= i / 2) < 1 ? -e / 2 * (Math.sqrt(1 - a * a) - 1) + t : e / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + t;
}, easeInCubic: function(a, t, e, i) {
  return e * (a /= i) * a * a + t;
}, easeOutCubic: function(a, t, e, i) {
  return e * ((a = a / i - 1) * a * a + 1) + t;
}, easeInOutCubic: function(a, t, e, i) {
  return (a /= i / 2) < 1 ? e / 2 * a * a * a + t : e / 2 * ((a -= 2) * a * a + 2) + t;
}, easeInQuart: function(a, t, e, i) {
  return e * (a /= i) * a * a * a + t;
}, easeOutQuart: function(a, t, e, i) {
  return -e * ((a = a / i - 1) * a * a * a - 1) + t;
}, easeInOutQuart: function(a, t, e, i) {
  return (a /= i / 2) < 1 ? e / 2 * a * a * a * a + t : -e / 2 * ((a -= 2) * a * a * a - 2) + t;
}, easeInQuint: function(a, t, e, i) {
  return e * (a /= i) * a * a * a * a + t;
}, easeOutQuint: function(a, t, e, i) {
  return e * ((a = a / i - 1) * a * a * a * a + 1) + t;
}, easeInOutQuint: function(a, t, e, i) {
  return (a /= i / 2) < 1 ? e / 2 * a * a * a * a * a + t : e / 2 * ((a -= 2) * a * a * a * a + 2) + t;
}, easeInElastic: function(a, t, e, i) {
  var s = 1.70158, r = 0, n = e;
  return a == 0 ? t : (a /= i) == 1 ? t + e : (r || (r = 0.3 * i), n < Math.abs(e) ? (n = e, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(e / n), -n * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * i - s) * (2 * Math.PI) / r) + t);
}, easeOutElastic: function(a, t, e, i) {
  var s = 1.70158, r = 0, n = e;
  return a == 0 ? t : (a /= i) == 1 ? t + e : (r || (r = 0.3 * i), n < Math.abs(e) ? (n = e, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(e / n), n * Math.pow(2, -10 * a) * Math.sin((a * i - s) * (2 * Math.PI) / r) + e + t);
}, easeInOutElastic: function(a, t, e, i) {
  var s = 1.70158, r = 0, n = e;
  return a == 0 ? t : (a /= i / 2) == 2 ? t + e : (r || (r = i * (0.3 * 1.5)), n < Math.abs(e) ? (n = e, s = r / 4) : s = r / (2 * Math.PI) * Math.asin(e / n), a < 1 ? n * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * i - s) * (2 * Math.PI) / r) * -0.5 + t : n * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * i - s) * (2 * Math.PI) / r) * 0.5 + e + t);
}, easeInBack: function(a, t, e, i, s) {
  return s == null && (s = 1.70158), e * (a /= i) * a * ((s + 1) * a - s) + t;
}, easeOutBack: function(a, t, e, i, s) {
  return s == null && (s = 1.70158), e * ((a = a / i - 1) * a * ((s + 1) * a + s) + 1) + t;
}, easeInOutBack: function(a, t, e, i, s) {
  return s == null && (s = 1.70158), (a /= i / 2) < 1 ? e / 2 * (a * a * ((1 + (s *= 1.525)) * a - s)) + t : e / 2 * ((a -= 2) * a * ((1 + (s *= 1.525)) * a + s) + 2) + t;
}, easeInBounce: Oi, easeOutBounce: si, easeInOutBounce: function(a, t, e, i) {
  return a < i / 2 ? 0.5 * Oi(2 * a, 0, e, i) + t : 0.5 * si(2 * a - i, 0, e, i) + 0.5 * e + t;
} };
class Is {
  constructor(t) {
    this.startTime = -1, this.duration = 1e3, this.delay = 0, this.direction = "normal", this.fillMode = "none", this.playState = "idle", this.isPause = !1, this.finished = !1, this.delayed = !1, this.times = 1, this.playedTimes = 0, this.effect = "easeLinear", this.setAttributes(t);
  }
  setAttributes(t) {
    return Object.assign(this, t), this;
  }
  onUpdate(t) {
    return this.update = t, this;
  }
  cancel() {
    return this.system && this.system.remove(this), this.reject && (this.reject(), this.reject = null), this.playState = "finished", this;
  }
  pause() {
    return this.playState = "paused", this.isPause = !0, this;
  }
  continue() {
    return this.startTime = -1, this.playState = "running", this.isPause = !1, this;
  }
  tick(t) {
    if (this.playState != "running")
      return !1;
    this.startTime == -1 && (this.startTime = t);
    let e = t - this.startTime;
    return this.currentTime = e, Math.min((t - this.startTime) / this.duration, 1) >= 1 ? (this.playState = "finished", this.stepAction(this.duration), this.object && this.object.markMatrixDirty(), this.playedTimes < this.times ? this.play() : (this.resolve(), this.resolve = null, this.onEnd && this.onEnd())) : (this.stepAction(e), this.object && this.object.markMatrixDirty()), !0;
  }
  play() {
    let t = this;
    this.system.add(this), this.playedTimes++, this.isPause = !1, this.delay != 0 && this.delayed == 0 ? (setTimeout(function() {
      t.startTime = -1, t.playState = "running";
    }, this.delay), t.delayed = !0) : (t.startTime = -1, t.playState = "running");
    const e = this;
    let i = this._getTickAction();
    this.stepAction = i;
    let s = this.promise;
    return s == null && (s = new Promise(function(r, n) {
      e.resolve == null && (e.resolve = r, e.reject = n);
    }), this.promise = this.promise), s.catch((r) => {
    });
  }
  _getTickAction() {
    let t = this.effect || "easeLinear", e = this.from, i = this.to, s = this.duration, r = this.update, n = e, o = i;
    if (typeof e == "number" && (n = [e], o = [i]), this.direction == "reverse" || this.direction == "alternate-reverse") {
      let w = n;
      n = o, o = w;
    }
    let l = n[0];
    const h = Array.isArray(e), c = typeof l == "number", d = l.x != null || l.y != null;
    let g, y = n.slice(), f = zs[t], m = this.direction == "alternate" || this.direction == "alternate-reverse", p = this, x = 0.5 * this.duration;
    if (c)
      g = function(w) {
        m && (w > x ? w = 2 * p.duration - 2 * w : w *= 2);
        for (let k = 0; k < n.length; k++) {
          const b = n[k], L = o[k] - b;
          if (L == 0)
            y[k] = b;
          else {
            let I = f(w, b, L, s);
            y[k] = I;
          }
        }
        r(h ? y : y[0]);
      };
    else {
      if (!d)
        throw new Error("value format error.");
      g = function(w) {
        for (let k = 0; k < n.length; k++) {
          const b = n[k], L = o[k], I = L.x - b.x, J = L.y - b.y;
          let At = { x: b.x, y: b.y };
          I != 0 && (At.x = f(w, b.x, I, s)), J != 0 && (At.y = f(w, b.y, J, s)), y[k] = At;
        }
        r(h ? y : y[0]);
      };
    }
    return g;
  }
}
class Ns {
  constructor() {
    this.animations = /* @__PURE__ */ new Set(), this.aeNodes = /* @__PURE__ */ new WeakSet(), this.timeline = { begin: 1790784e6, end: Date.now() };
  }
  add(t) {
    t.system = this, this.animations.add(t);
  }
  remove(t) {
    this.animations.delete(t);
  }
  cancelAll() {
    for (let t of this.animations.values())
      t.cancel();
    this.animations.clear();
  }
  tick(t) {
    let e = !1;
    return this.animations.forEach((i) => {
      i.tick(t) && e == 0 && (e = !0), i.playState == "finished" && this.animations.delete(i);
    }), e;
  }
  anime(t) {
    return this.anim(t);
  }
  anim(t) {
    t.duration == null && (t.duration = 1e3);
    let e = new Is();
    return e.system = this, e.setAttributes(t), e;
  }
}
class Ct {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  hasListener(t) {
    return this.listeners.has(t);
  }
  addEventListener(t, e) {
    return !this.listeners.has(t) && this.listeners.set(t, []), this.listeners.get(t).push(e), () => this.removeEventListener(t, e);
  }
  removeEventListener(t, e) {
    if (!this.listeners.has(t))
      return;
    let i = this.listeners.get(t);
    for (let s = 0, r = i.length; s < r; s++)
      if (i[s] === e)
        return i.splice(s, 1), this.removeEventListener(t, e);
  }
  dispatchEvent(t) {
    if (!this.listeners.has(t.type))
      return;
    const e = this.listeners.get(t.type);
    if (e.length == 1)
      return void e[0].call(this, t);
    let i = e.slice();
    for (let s = 0, r = i.length; s < r; s++)
      i[s].call(this, t);
  }
  on(t, e) {
    return this.addEventListener(t, e);
  }
}
class ce {
  constructor() {
    this.inputs = [], this.outputs = [];
  }
  getDegree() {
    return this.getInDegree() + this.getOutDegree();
  }
  getInDegree() {
    return this.inputs.length;
  }
  getOutDegree() {
    return this.outputs.length;
  }
  getAdjacentList() {
    let t = this.outputs.map((i) => i.to), e = this.inputs.map((i) => i.from);
    return t.concat(e);
  }
}
class es {
  constructor(t, e) {
    this.weight = 0, this.from = t, this.to = e, t.outputs.push(this), e.inputs.push(this);
  }
  isLoop() {
    return this.from === this.to;
  }
  isAdjacent(t) {
    return this.from === t.from || this.from === t.to || this.to === t.from || this.to === t.to;
  }
}
class Re {
  constructor(t, e) {
    this.hasDirection = !0, this.vertexes = t, this.edges = e;
  }
  isZero() {
    return this.vertexes.length > 0 && this.edges.length == 0;
  }
  isAlone() {
    return this.vertexes.length == 1 && this.edges.length == 0;
  }
  traverse(t, e = "depth", i = [], s = /* @__PURE__ */ new Set()) {
    t == null && (t = this.vertexes[0]);
    let r = this;
    if (!s.has(t) && (i.push(t), s.add(t)), e == "depth")
      t.getAdjacentList().filter((n) => !s.has(n)).map((n) => {
        !s.has(n) && (i.push(n), s.add(n)), r.traverse(n, e, i, s);
      });
    else {
      let n = t.getAdjacentList().filter((o) => !s.has(o));
      n.map((o) => {
        i.push(o), s.add(o);
      }), n.map((o) => {
        r.traverse(o, e, i, s);
      });
    }
    return i;
  }
  getMaxDegreeVertext() {
    let t = this.vertexes[0];
    for (let e = 1; e < this.vertexes.length; e++) {
      const i = this.vertexes[e];
      i.getDegree() > t.getDegree() && (t = i);
    }
    return t;
  }
  getMinDegree() {
    let t = this.vertexes[0].getDegree();
    for (let e = 1; e < this.vertexes.length; e++) {
      const i = this.vertexes[e];
      i.getDegree() < t && (t = i.getDegree());
    }
    return t;
  }
  getPathList(t, e, i = /* @__PURE__ */ new Set()) {
    return [];
  }
  getOrder() {
    return this.vertexes.length;
  }
  isBridge() {
  }
  isSubGraph(t) {
  }
  isTree() {
    return this.vertexes.length == this.edges.length + 1 && (this.vertexes.length == 1 || this.vertexes.filter((t) => t.getDegree() == 1).length > 0);
  }
  travelNext(t) {
    let e = [];
    return function i(s) {
      e.push(s);
      let r = s.outputs.map((n) => n.to);
      for (let n = 0; n < r.length; n++) {
        let o = r[n];
        if (o === t)
          return;
        i(o);
      }
    }(t), e;
  }
  clone() {
    let t = this.vertexes.slice();
    t.forEach((s) => {
      s.inputs = s.inputs.slice(), s.outputs = s.outputs.slice();
    });
    let e = this.edges.slice(), i = new Re(t, e);
    return i.hasDirection = this.hasDirection, i;
  }
  check() {
    let t = 0;
    this.vertexes.forEach((i) => t += i.getDegree()), console.assert(t == 2 * this.edges.length);
    let e = this.vertexes.filter((i) => i.getDegree() % 2 != 0).length;
    console.assert(e % 2 == 0);
  }
}
class at {
  static removeAt(t, e) {
    return t.splice(e, 1);
  }
  static remove(t, e) {
    let i = t.indexOf(e);
    return i == -1 ? -1 : (t.splice(i, 1), i);
  }
  static swapWithRight(t, e) {
    const i = e.indexOf(t);
    if (i === e.length - 1)
      return !1;
    const s = e[i + 1];
    return e[i] = s, e[i + 1] = t, !0;
  }
  static swapWithLeft(t, e) {
    const i = e.indexOf(t);
    if (i === 0)
      return !1;
    const s = e[i - 1];
    return e[i] = s, e[i - 1] = t, !0;
  }
  static moveToTail(t, e) {
    const i = e.indexOf(t);
    if (i === e.length - 1)
      return !1;
    for (let s = i; s < e.length - 1; s++)
      e[s] = e[s + 1];
    return e[e.length - 1] = t, !0;
  }
  static moveToHead(t, e) {
    const i = e.indexOf(t);
    if (i === 0)
      return !1;
    for (let s = i; s > 0; s--)
      e[s] = e[s - 1];
    return e[0] = t, !0;
  }
}
let te;
function Ti(a) {
  let t = new KeyboardEvent(a.type, a), e = t.preventDefault;
  if (t.preventDefault = function() {
    a.preventDefault(), e.call(this);
  }, t.previous = te, te) {
    const i = a.key == te.key;
    let s = t.time - te.time;
    i && s < 400 && (t.isDouble = !0);
  }
  return te = t, t;
}
class js extends Ct {
  constructor() {
    super(), this.debug = !1, this.disabled = !1, this.regMap = /* @__PURE__ */ new Map(), this.keyMap = /* @__PURE__ */ new Map(), this.init(), this.debug = !1;
  }
  disable() {
    this.disabled = !0;
  }
  enable() {
    this.disabled = !1;
  }
  isControlDown() {
    return this.isKeydown("Control");
  }
  isShiftDown() {
    return this.isKeydown("Shift");
  }
  isAltDown() {
    return this.isKeydown("Alt");
  }
  isMetaDown() {
    return this.isKeydown("Meta");
  }
  bindKey(t, e, i = !1) {
    let s = Ye(t);
    const r = { keyInfo: t, fn: e, preventDefault: i };
    this.regMap.set(s, r);
  }
  isKeyRegistered(t) {
    return this.getKeyBinding(t) != null;
  }
  getKeyBinding(t) {
    let e = Ye(t);
    return this.regMap.get(e);
  }
  unbind(t) {
    let e = Ye(t);
    this.regMap.delete(e);
  }
  isKeydown(t) {
    return this.keyMap.get(t.toLowerCase());
  }
  sendKey(t, e) {
    e == null && ((e = new KeyboardEvent("keydown")).mock = !0), this.fireKey(t.toLowerCase().split("+"), e);
  }
  checkValid() {
    let t = document.activeElement.tagName;
    return !this.disabled && t != "INPUT" && t != "TEXTAREA";
  }
  fireKey(t, e) {
    const i = this;
    let s = t.sort().join("+").toLowerCase();
    this.debug && console.log("按下", s);
    let r = this.regMap.keys();
    for (let n of r) {
      if (n != s)
        continue;
      let o = i.regMap.get(n);
      o && (o.fn(e), o.preventDefault && e.preventDefault());
    }
  }
  keydownHandler(t) {
    let e = t.key.toLowerCase(), i = [];
    t.ctrlKey && (this.keyMap.set("control", !0), i.push("control")), t.altKey && (this.keyMap.set("alt", !0), i.push("alt")), t.shiftKey && (this.keyMap.set("shift", !0), i.push("shift")), t.metaKey && (this.keyMap.set("meta", !0), i.push("meta")), i.indexOf(e) == -1 && i.push(e), this.keyMap.set(e, !0);
    let s = Ti(t);
    this.fireKey(i, s), this.dispatchEvent(s);
  }
  keyupHandler(t) {
    const e = t.key.toLowerCase();
    this.keyMap.delete(e);
    let i = Ti(t);
    this.dispatchEvent(i);
  }
  init() {
    let t = this, e = O.fromEvent(document, "keydown"), i = O.fromEvent(document, "keyup"), s = e.filter(() => this.checkValid()), r = i.filter(() => this.checkValid());
    s.subscribe((n) => {
      t.keydownHandler(n);
    }), r.subscribe((n) => {
      t.keyupHandler(n);
    }), this.keydownOb = s, this.keyupOb = r;
  }
}
function Ye(a) {
  return a.toLowerCase().split("+").sort().join("+");
}
class Bs {
  constructor() {
    this.zomThreshold = 10, this.touchsCount = 0, this.lastTouchDistance = null, this.lastTouchCenter = null;
  }
  onTouch(t, e) {
    this.touchsCount = t.touches.length, t.type == "touchmove" ? this.touchmoveHandler(t, e) : t.type == "touchstart" ? this.touchStartHandler(t) : t.type == "touchend" && this.touchendHandler(t);
  }
  touchStartHandler(t) {
    t.touches.length === 2 && (this.lastTouchDistance = this.getDistance(t.touches), this.lastTouchCenter = this.getCenter(t.touches));
  }
  touchmoveHandler(t, e) {
    if (t.preventDefault(), t.touches.length !== 2 || this.lastTouchDistance == null || this.lastTouchCenter == null)
      return;
    const i = this.getDistance(t.touches), s = this.getCenter(t.touches);
    if (Math.abs(i - this.lastTouchDistance) >= this.zomThreshold) {
      const r = i / this.lastTouchDistance;
      this._TouchZoomHandler && this._TouchZoomHandler(t, r, e);
    } else {
      let r = s.x - this.lastTouchCenter.x, n = s.y - this.lastTouchCenter.y;
      this._TouchDragHandler && this._TouchDragHandler(r, n);
    }
    this.lastTouchDistance = i, this.lastTouchCenter = s;
  }
  touchendHandler(t) {
    t.touches.length <= 2 && (this.lastTouchDistance = null, this.lastTouchCenter = null);
  }
  getDistance(t) {
    return Math.hypot(t[1].clientX - t[0].clientX, t[1].clientY - t[0].clientY);
  }
  getCenter(t) {
    return { x: 0.5 * (t[0].clientX + t[1].clientX), y: 0.5 * (t[0].clientY + t[1].clientY) };
  }
}
const Rs = typeof TouchEvent < "u", Ws = ["pointerdown", "pointerup", "pointermove", "pointerenter", "pointerout", "wheel", "click", "dblclick", "dragstart", "dragend", "dragover", "drop", "touchstart", "touchmove", "touchend"];
class Fs extends Ct {
  constructor(t) {
    super(), this.skipPointerMovePicking = !1, this._touchWheel = new Bs(), this.eventObservable = new O((e) => () => {
    }), this.domElement = t, this.reset(), this.initEvents();
  }
  initEvents() {
    let t = this.domElement;
    const e = this;
    Ws.map(function(i) {
      Dt.addEventListener(t, i, function(s) {
        e._onEvent(s);
      });
    });
  }
  _onEvent(t) {
    const e = this, i = t.type, s = t.target;
    let r = t.offsetX, n = t.offsetY;
    if (s !== this.domElement) {
      const o = this.domElement.getBoundingClientRect(), l = t.clientX, h = t.clientY;
      r = l - o.left, n = h - o.top;
    }
    if ((i != "pointerout" || s === this.domElement && (t.offsetX, t.offsetY, r < 0 || r > this.domElement.clientWidth || n < 0 || n > this.domElement.clientHeight)) && (!(t instanceof PointerEvent && i !== "click") || t.isPrimary))
      if (Rs && t instanceof TouchEvent)
        this._touchWheel.onTouch(t, this.domElement);
      else {
        if (this.domElement.title = "", e._updatePointerInfo(t, i, r, n), t.type == "wheel")
          return e.dispatchEvent(t), e.eventObservable.next(t), void t.preventDefault();
        t.defaultPrevented || (e.eventObservable.next(t), e.dispatchEvent(t));
      }
  }
  updateBaseInfo(t, e) {
    const i = this.previous;
    i.type = this.type, i.x = this.x, i.y = this.y, i.isDraging = this.isDraging, i.isPointDown = this.isPointerDown, i.isPointerOn = this.isPointerOn, i.isDragStart = this.isDragStart, i.isDragEnd = this.isDragEnd, i.timeStamp = this.timeStamp, i.dx = this.dx, i.dy = this.dy, i.xInWorld = this.xInWorld, i.yInWorld = this.yInWorld, i.dxInWorld = this.dxInWorld, i.dyInWorld = this.dyInWorld, this.event = t, this.timeStamp = t.timeStamp, this.type = e, this.isDragEnd = !1, this.isIdle = !1;
    let s = this;
    this._idleTimer != null && window.clearTimeout(this._idleTimer), this._idleTimer = setTimeout(function() {
      s.isIdle = !0;
    }, this.idleTimeout);
  }
  _updatePointerInfo(t, e, i, s) {
    this.updateBaseInfo(t, e), this.isPointerOn = e !== "pointerout" && i > 0 && s > 0;
    const r = this.previous;
    this.x = i, this.y = s, e == "pointerdown" ? (this.isPointerDown = !0, this.pointerDownX = this.x, this.pointerDownY = this.y, this.buttons = t.buttons, this.button = t.button, this.isRightButton = t.button == 2) : (e == "pointerup" || e == "pointerout" || e == "drop") && (this.isPointerDown = !1, r.type == "pointermove" && (this.isDragEnd = !0)), this.isDraging = this.isPointerDown == 1 && (e == "pointermove" || e == "wheel" || e == "pointerenter" || e == "pointerout"), this.isDragStart = this.isDraging && r.isDraging != 1, this.dx = this.x - r.x, this.dy = this.y - r.y, this._worldPosConverter && this._worldPosConverter();
  }
  _setTarget(t) {
    this.preTarget = this.target, this.target = t;
  }
  _clearTarget() {
    this.target = null;
  }
  _mouseEventForwardToCanvas(t) {
    let e = this.event;
    e instanceof PointerEvent && t.dispatchEvent(function(i, s, r) {
      const n = new MouseEvent(i.type, { view: i.view, bubbles: !0, cancelable: i.cancelable, clientX: i.clientX, clientY: i.clientY });
      return s == null && (s = i.offsetX), r == null && (r = i.offsetY), Object.defineProperty(n, "offsetX", { get: function() {
        return s;
      } }), Object.defineProperty(n, "offsetY", { get: function() {
        return r;
      } }), n;
    }(e));
  }
  preventDefault() {
    this.event && this.event.preventDefault();
  }
  reset() {
    this.idleTimeout = 50, this.target = null, this.preTarget = null, this.mouseoverTarget = null, this.preMouseoverTarget = null, this.dropTarget = null, this.buttons = 0, this.button = 0, this.pointerDownX = 0, this.pointerDownY = 0, this.x = -1, this.y = -1, this.dx = 0, this.dy = 0, this.xInWorld = 0, this.yInWorld = 0, this.dxInWorld = 0, this.dyInWorld = 0, this.button = 0, this.event = null, this.previous = { type: "pointerenter", x: 0, y: 0, dx: 0, dy: 0, xInWorld: 0, yInWorld: 0, dxInWorld: 0, dyInWorld: 0, isDraging: !1, isPointDown: !1, isPointerOn: !1, isDragStart: !1, isDragEnd: !1, timeStamp: 0 }, this.isPointerDown = !1, this.isRightButton = !1, this.isDragEnd = !1, this.isDraging = !1, this.isPointerOn = !1, this.isDragStart = !1, this.isIdle = !0, this.timeStamp = 0, clearTimeout(this._idleTimer), this._idleTimer = null;
  }
}
const bi = "2.6.30", ot = Object.freeze({ drag: "drag", edit: "edit", normal: "normal", select: "select", view: "view", paint: "paint" }), F = Object.freeze({ grabbing: "grabbing", default: "default", grab: "grab", auto: "auto", move: "move", hand: "hand", crosshair: "crosshair", s_resize: "s-resize", n_resize: "n-resize", w_resize: "w-resize", e_resize: "e-resize", ne_resize: "ne-resize", se_resize: "se-resize", sw_resize: "sw-resize", nw_resize: "nw-resize" }), rt = Object.freeze({ horizontal: "horizontal", vertical: "vertical", h: "h", v: "v", anticlockwise: "anticlockwise", clockwise: "clockwise" }), Yt = Object.freeze({ lt: "lt", ct: "ct", rt: "rt", lm: "lm", rm: "rm", lb: "lb", cb: "cb", rb: "rb", center: "center" }), ht = Yt, gt = Object.freeze({ lt: "lt", ct: "ct", rt: "rt", lm: "lm", rm: "rm", lb: "lb", cb: "cb", rb: "rb", center: "center", auto: "auto" }), ri = { lt: [-1, -1], ct: [0, -1], rt: [1, -1], rm: [1, 0], rb: [1, 1], cb: [0, 1], lb: [-1, 1], lm: [-1, 0], center: [0, 0] }, is = {};
for (let a in ri) {
  let t = ri[a];
  is[a] = T.normalize([], t);
}
const et = Object.freeze({ left: "left", center: "center", right: "right" }), it = Object.freeze({ top: "top", middle: "middle", bottom: "bottom" }), j = Object.freeze({ begin: "begin", end: "end", middle: "middle", ctrlPoint: "ctrlPoint", ctrlPoint1: "ctrlPoint1", ctrlPoint2: "ctrlPoint2", fold1: "fold1", fold2: "fold2", mid: "mid", mid1: "mid1", mid2: "mid2" }), q = Object.freeze({ QuadBezierLink: "QuadBezierLink", BezierLink: "BezierLink", AutoFoldLink: "AutoFoldLink", ArcLink: "ArcLink", fold1Offset: "fold1Offset", fold2Offset: "fold2Offset", centerOffset: "centerOffset", PathLinkName: "PathLink" }), B = Object.freeze({ AutoFoldLinkCenter: "com.jtopo.AutoFoldLink.center", AutoFoldLinkFold1: "fold1", AutoFoldLinkFold2: "fold2", LinkCenter: "center", LinkBegin: "begin", LinkEnd: "end", QuadBezierLinkCtrlPoint: "ctrlPoint", BezierLinkCtrlPoint1: "ctrlPoint1", BezierLinkCtrlPoint2: "ctrlPoint2", QuadBezierLinkCenter: "com.jtopo.QuadBezierLink.center", BezierLinkCenter: "com.jtopo.BezierLink.center", ArcLinkCenter: "com.jtopo.ArcLink.center" }), Pn = Object.freeze({ AutoFoldLinkAnchors: "com.jtopo.AutoFoldLinkAnchors" }), On = [0, 0], Tn = {};
function u(a) {
  return (t, e) => {
    t[e] = a;
  };
}
!Array.prototype.includes && Object.defineProperty(Array.prototype, "includes", { value: function(a) {
  return this.indexOf(a) != -1;
} });
const Tt = Object.freeze({ Dev_mode: bi.startsWith("#"), MinDeep: 1, MaxLayerCount: 20, DefaultPackage: "com.jtopo", AutoFoldLinkAbsorb: 3 }), wi = Object.freeze({ HandlerLayerCanvas: 99, FullWindowDom: 1e3, Link: 1, Node: 1 }), Mt = Object.freeze({ DefaultFont: "12px sans-serif", DefaultFontSize: "12px", PointClosestEpsilon: 0.01, DefaultLightName: "DefaultLight", DefaultDarkName: "DefaultDark", supportGIF: !1 });
class St {
  constructor(t, e) {
    this.defaultPrevented = !1, this.cancelable = !1, this.type = t, e && typeof e == "object" && Object.assign(this, e);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class Hs extends St {
}
class Xs extends Ct {
  constructor() {
    super(), this.showImgLoadErrorLog = !0, this.imageCache = /* @__PURE__ */ new Map(), this.callbackCache = /* @__PURE__ */ new Map(), this.objCache = /* @__PURE__ */ new WeakMap();
  }
  errorLog(t) {
    this.showImgLoadErrorLog && console.error(t);
  }
  whenAllImagesLoaded(t, e = !1) {
    const i = this;
    let s = t.map(function(r) {
      return new Promise((n, o) => {
        let l = new Image();
        l.src = r, e && console.log("开始加载: ", r), l.onload = function() {
          e && console.log("加载完成: ", r), l.complete && l.naturalWidth > 0 ? (i.addToCache(r, l), n(l)) : i.errorLog("图片加载失败: " + r);
        }, l.onerror = function() {
          i.errorLog("image load error url=" + r), n(null);
        };
      });
    });
    return Promise.all(s);
  }
  whenAllLoaded() {
    let t = this;
    return new Promise((e, i) => {
      t.callbackCache.size != 0 ? t.allLoadedResolve = e : e(null);
    });
  }
  addToCache(t, e) {
    this.imageCache.set(t, e);
  }
  clearCache() {
    this.imageCache.clear(), this.callbackCache.clear();
  }
  removeObject(t) {
    this.objCache.delete(t);
  }
  cancelLoadByObject(t) {
    let e = this.objCache.get(t);
    e != null && (e.canceled = !0, this.objCache.delete(t));
  }
  onload(t, e) {
    const i = this.callbackCache.get(t);
    if (i != null) {
      for (let s = 0; s < i.length; s++) {
        let r = i[s];
        r.canceled != 1 && (r(e), r.cacheObj && this.objCache.delete(r.cacheObj), r.next && r.next(e));
      }
      this.callbackCache.delete(t), e != null && this.addToCache(t, e), this.hasLoaded = !0, this.dispatchEvent(new Hs("loaded", { resource: e })), this.callbackCache.size == 0 && this.allLoadedResolve && (this.allLoadedResolve(e), this.allLoadedResolve = null);
    }
  }
  addToCallbackList(t, e) {
    if (e == null)
      return null;
    let i = this.callbackCache.get(t);
    i == null && (i = [], this.callbackCache.set(t, i)), i.push(e);
  }
  loadImageWithObj(t, e, i) {
    let s = this.objCache.get(t);
    return s != null && (s.canceled = !0), i.cacheObj = t, i.canceled = null, this.objCache.set(t, i), this.loadImage(e, i);
  }
  loadImage(t, e) {
    const i = this;
    let s = this.callbackCache.get(t) != null;
    if (i.lastResource = t, this.addToCallbackList(t, e), s)
      return;
    let r = this.imageCache.get(t);
    r == null ? setTimeout(function() {
      let n = new Image();
      n.src = t, n.addEventListener("load", (o) => {
        i.onload(t, n);
      }), n.onerror = function() {
        i.errorLog("Image load error: " + t), i.onload(t, null);
      };
    }, 1) : this.onload(t, r);
  }
}
const st = new Xs(), Ue = /* @__PURE__ */ new WeakMap();
function Ys(a, t, e) {
  let i = Ue.get(a);
  i != null && clearTimeout(i), i = setTimeout(() => {
    Ue.delete(a), t();
  }, e), Ue.set(a, i);
}
let Gt = { diff: function(a, t, e) {
  e == null && (e = Object.keys(a));
  let i = {}, s = !1;
  for (let r = 0; r < e.length; r++) {
    let n = e[r], o = t[n], l = a[n];
    o != l && (s = !0, i[n] = l);
  }
  return s ? i : null;
} };
Gt.gc = function(a) {
  if (a == null)
    return null;
  let t = "";
  for (let e = 0; e < a.length; e += 3)
    t += String.fromCharCode(a.substring(e, e + 3));
  return t;
};
class It {
  constructor(t) {
    this.boldWeight = "normal", this.italicWeight = "normal", this.size = Mt.DefaultFontSize, this.family = "sans-serif", t != null && this.parseFontDesc(t);
  }
  parseFontDesc(t) {
    const e = t.split(" ");
    for (let i = 0; i < e.length; i++) {
      let s = e[i].toLowerCase();
      s.endsWith("px") ? this.size = e[i] : s == "italic" ? this.italicWeight = e[i] : s == "bold" ? this.boldWeight = e[i] : this.family = e[i];
    }
  }
  getFontWeight() {
    return this.boldWeight + " " + this.italicWeight;
  }
  setWeight(t) {
    const e = t.split(" ");
    e.length > 1 ? (this.boldWeight = e[0], this.italicWeight = e[1], (this.boldWeight === "italic" || this.italicWeight === "bold") && (this.boldWeight = e[1], this.italicWeight = e[0])) : t === "bold" ? this.boldWeight = "bold" : t === "italic" ? this.italicWeight = "italic" : this.boldWeight = "normal";
  }
  setFamily(t) {
    t != null && t !== "" && (this.family = t);
  }
  setSize(t) {
    t != null && t !== "" && (this.size = t);
  }
  setBold(t) {
    t != null && t !== "" && (this.boldWeight = t);
  }
  setItalic(t) {
    t != null && t !== "" && (this.italicWeight = t);
  }
  toogleBold() {
    this.boldWeight === "bold" ? this.boldWeight = "normal" : this.boldWeight = "bold";
  }
  toogleItalic() {
    this.italicWeight === "italic" ? this.italicWeight = "normal" : this.italicWeight = "italic";
  }
  toStyleFont() {
    return this.boldWeight + " " + this.italicWeight + " " + this.size + " " + this.family;
  }
}
var Us = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, ut = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Js(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Us(t, e, r), r;
};
const ni = class oi {
  constructor(t) {
    this.dirty = !0, this._textDirty = !0, t != null && Object.assign(this, t);
  }
  set lineWidth(t) {
    this._lineWidth = t || 0;
  }
  get lineWidth() {
    return this._lineWidth;
  }
  getChangedProps() {
    return Gt.diff(this, Ei, this._serializers) || {};
  }
  clear() {
    for (let t = 0; t < this._serializers.length; t++) {
      let e = this._serializers[t];
      this[e] = Ei[e];
    }
  }
  toJSON(t) {
    let e = We(this, this._serializers);
    if (t != null) {
      let i = this.fillStyle;
      if (i instanceof ft && i.image != null) {
        let s = t(i.imageObject);
        e.fillStyle.image = s;
      }
      if (i = this.strokeStyle, i instanceof ft) {
        let s = t(i.imageObject);
        e.strokeStyle.image = s;
      }
    }
    return e;
  }
  static fromJSON(t, e) {
    if (e) {
      let s = t.fillStyle;
      if (s && typeof s.image == "number") {
        let r = e[s.image];
        if (r && r.type == "img") {
          let n = r.src;
          s.image = n;
        }
      }
      if (s = t.strokeStyle, s && typeof s.image == "number") {
        let r = e[s.image];
        if (r && r.type == "img") {
          let n = r.src;
          s.image = n;
        }
      }
    }
    let i = new oi(t);
    return oi._radientPatterHandle(i), i;
  }
  update(t) {
    let e = Object.keys(t);
    this._textDirty = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = this[s];
      t[s] != r && (s === "font" || s === "textBaseline" || s === "textAlign" || s === "textOffsetX" || s === "textOffsetY" || s === "textPosition") && (this._textDirty = !0);
    }
    this.clear(), Object.assign(this, t);
  }
  applyTo(t) {
    const e = this;
    if (e.filter != null && (t.filter = e.filter), e.font != null && (t.font = e.font), e.textAlign != null && (t.textAlign = e.textAlign), e.textBaseline != null && (t.textBaseline = e.textBaseline), e.fillStyle != null)
      if (e.fillStyle instanceof Ut || e.fillStyle instanceof ft) {
        let i = e.fillStyle.getStyle();
        i != null && (t.fillStyle = i);
      } else
        t.fillStyle = e.fillStyle;
    if (e.strokeStyle != null)
      if (e.strokeStyle instanceof Ut || e.strokeStyle instanceof ft) {
        let i = e.strokeStyle.getStyle();
        i != null && (t.strokeStyle = i);
      } else
        t.strokeStyle = e.strokeStyle;
    e.lineCap != null && (t.lineCap = e.lineCap), e.lineJoin != null && (t.lineJoin = e.lineJoin), e.lineWidth != null && (t.lineWidth = e.lineWidth), e.miterLimit != null && (t.miterLimit = e.miterLimit), e.lineDash != null ? t.setLineDash(e.lineDash) : t.setLineDash([]), e.lineDashOffset != null && (t.lineDashOffset = e.lineDashOffset), e.globalAlpha != null && (t.globalAlpha = e.globalAlpha), e.shadowBlur != null && (t.shadowBlur = e.shadowBlur), e.shadowColor != null && (t.shadowColor = e.shadowColor), e.shadowOffsetX != null && (t.shadowOffsetX = e.shadowOffsetX), e.shadowOffsetY != null && (t.shadowOffsetY = e.shadowOffsetY), e.globalCompositeOperation != null && (t.globalCompositeOperation = e.globalCompositeOperation), e.imageSmoothingEnabled != null && (t.imageSmoothingEnabled = e.imageSmoothingEnabled);
  }
  computePadding() {
    return 2 * (this.borderWidth || 0) + 2 * (this.padding || 0) + (this.lineWidth || 0);
  }
  static _radientPatterHandle(t) {
    let e = t.fillStyle, i = t.strokeStyle;
    if (e != null && e.className != null) {
      let s = e.className;
      if (s == Bt.prototype.className) {
        let r = Bt._fromJSON(e);
        t.fillStyle = r;
      } else if (s == jt.prototype.className) {
        let r = jt._fromJSON(e);
        t.fillStyle = r;
      } else {
        if (s != ft.prototype.className)
          throw new Error("unknow style's className: " + s);
        {
          let r = ft._fromJSON(e);
          t.fillStyle = r;
        }
      }
    }
    if (i != null && i.className != null) {
      let s = i.className;
      if (s == Bt.prototype.className) {
        let r = Bt._fromJSON(i);
        t.strokeStyle = r;
      } else if (s == jt.prototype.className) {
        let r = jt._fromJSON(i);
        t.strokeStyle = r;
      } else {
        if (s != ft.prototype.className)
          throw new Error("unknow style's className: " + s);
        {
          let r = ft._fromJSON(i);
          t.strokeStyle = r;
        }
      }
    }
  }
  static measureText(t, e, i, s) {
    let r, n = e.font || s;
    r = i == 1 ? ki.measureTextSize(t, n) : ki.measureTextArraySize(t, n);
    let o = r.width, l = r.height;
    if (e.lineHeight != null)
      l = e.lineHeight;
    else {
      let h = n.match(/.*?(\d+)px.*/);
      h != null && (l = parseInt(h[1]));
    }
    return { width: o, height: l * i, lineHeight: l };
  }
  get border() {
    return this._border;
  }
  set border(t) {
    if (this.dirty = !0, t != null) {
      this.borderStyle = void 0, this.borderWidth = void 0, this.borderColor = void 0;
      let e = t.toLowerCase().replace(/\s+/gi, " ").split(" ");
      for (let i = 0; i < e.length; i++) {
        let s = e[i];
        Vs(s) ? this.borderStyle = s : s.endsWith("px") ? this.borderWidth = parseFloat(s.substring(0, s.length - 2)) : this.borderColor = s;
      }
    }
    this._border = t;
  }
  set fontSize(t) {
    if (t == null)
      return;
    typeof t == "number" && (t += "px");
    let e = new It(this.font);
    e.setSize(t), this.font = e.toStyleFont();
  }
  get fontSize() {
    return new It(this.font).size;
  }
  set fontFamily(t) {
    if (t == null)
      return;
    let e = new It(this.font);
    e.setFamily(t), this.font = e.toStyleFont();
  }
  get fontFamily() {
    return new It(this.font).family;
  }
  set fontWeight(t) {
    if (t == null)
      return;
    let e = new It(this.font);
    e.setWeight(t), this.font = e.toStyleFont();
  }
  get fontWeight() {
    return new It(this.font).getFontWeight();
  }
};
ut([u("Style")], ni.prototype, "className", 2), ut([u(["fillStyle", "strokeStyle", "lineWidth", "lineDash", "lineCap", "lineJoin", "lineDashOffset", "miterLimit", "font", "textBaseline", "textAlign", "shadowBlur", "shadowColor", "shadowOffsetX", "shadowOffsetY", "globalAlpha", "filter", "globalCompositeOperation", "imageSmoothingEnabled", "textOffsetX", "textOffsetY", "textPosition", "color", "borderStyle", "borderColor", "borderRadius", "borderWidth", "padding", "lineHeight", "backgroundColor"])], ni.prototype, "_serializers", 2);
let xt = ni;
const Ei = new xt();
function Vs(a) {
  return "none,hidden,dotted,dashed,solid,doubble,groove,ridge,inseet,outset,inherit".indexOf(a) != -1;
}
st.w != "cacheImg" && (st.w = "119119119046106116111112111046099111109");
const _i = document.createElement("canvas").getContext("2d");
class Ut {
  constructor() {
    this.dirty = !0;
  }
  update() {
    this.dirty = !0;
  }
  toJSON() {
    let t = {}, e = this;
    return this._allwaysSerializers.forEach((i) => {
      t[i] = e[i];
    }), this.serializers.forEach((i) => {
      t[i] = e[i];
    }), t;
  }
}
ut([u(["className"])], Ut.prototype, "_allwaysSerializers", 2), ut([u(["colors"])], Ut.prototype, "serializers", 2);
const ai = class ss extends Ut {
  constructor(t, e, i, s) {
    super(), this.startX = 0, this.startY = 0, this.stopX = 0, this.stopY = 0, t != null && s != null && (this.startX = t, this.startY = e, this.stopX = i, this.stopY = s);
  }
  static _fromJSON(t) {
    let e = new ss(null, null, null, null);
    return Object.assign(e, t), e;
  }
  addColorStop(t, e) {
    this.colors == null && (this.colors = []), this.colors.push([t, e]);
  }
  setColors(t) {
    this.colors = t, this.update();
  }
  getStyle() {
    if (this.gradient != null && !this.dirty)
      return this.gradient;
    let t = _i.createLinearGradient(this.startX, this.startY, this.stopX, this.stopY);
    if (this.colors != null)
      for (let e = 0; e < this.colors.length; e++) {
        let i = this.colors[e];
        t.addColorStop(i[0], i[1]);
      }
    return t;
  }
};
ut([u("LinearGradient")], ai.prototype, "className", 2), ut([u(["startX", "startY", "stopX", "stopY", "colors"])], ai.prototype, "serializers", 2);
let jt = ai;
const li = class rs extends Ut {
  constructor(t, e, i, s, r, n) {
    super(), this.xStart = 0, this.yStart = 0, this.xStop = 0, this.yStop = 0, this.radiusStart = 0, this.radiusEnd = 0, t != null && n != null && (this.xStart = t, this.yStart = e, this.radiusStart = i, this.xStop = s, this.yStop = r, this.radiusEnd = n);
  }
  static _fromJSON(t) {
    let e = new rs(null, null, null, null, null, null);
    return Object.assign(e, t), e;
  }
  addColorStop(t, e) {
    this.colors == null && (this.colors = []), this.colors.push([t, e]);
  }
  setColors(t) {
    this.colors = t, this.update();
  }
  getStyle() {
    if (this.gradient != null && !this.dirty)
      return this.gradient;
    if (this.gradient = _i.createRadialGradient(this.xStart, this.yStart, this.radiusStart, this.xStop, this.yStop, this.radiusEnd), this.colors != null)
      for (let t = 0; t < this.colors.length; t++) {
        let e = this.colors[t];
        this.gradient.addColorStop(e[0], e[1]);
      }
    return this.gradient;
  }
};
ut([u("RadialGradient")], li.prototype, "className", 2), ut([u(["xStart", "yStart", "radiusStart", "xStop", "yStop", "radiusEnd", "colors"])], li.prototype, "serializers", 2);
let Bt = li;
const we = class ns {
  constructor(t, e) {
    this.dirty = !0, t != null && (this.image = t, this.repetition = e || "no-repeat");
  }
  update() {
    this.dirty = !0;
  }
  toJSON() {
    let t = {}, e = this;
    return this._allwaysSerializers.forEach((i) => {
      t[i] = e[i];
    }), this.serializers.forEach((i) => {
      t[i] = e[i];
    }), t;
  }
  static _fromJSON(t) {
    let e = new ns(null);
    return Object.assign(e, t), e;
  }
  getStyle() {
    return this.imageObject == null ? null : this.pattern == null || this.dirty ? (this.pattern == null && (this.pattern = _i.createPattern(this.imageObject, this.repetition || "no-repeat")), this.pattern) : this.pattern;
  }
  get image() {
    return this.imagePath;
  }
  set image(t) {
    if (st.cancelLoadByObject(this), this.imagePath = t, t != null) {
      let e = this;
      st.loadImageWithObj(this, t, function(i) {
        i != null && (e.imageObject = i);
      });
    }
  }
  setTransform(t) {
    this.pattern != null && this.pattern.setTransform(t);
  }
};
ut([u("StylePattern")], we.prototype, "className", 2), ut([u(["className"])], we.prototype, "_allwaysSerializers", 2), ut([u(["image", "repetition"])], we.prototype, "serializers", 2);
let ft = we;
var V, M = ((V = M || {})[V.NONE = 1] = "NONE", V[V.EDIT = 2] = "EDIT", V[V.CONNECT = 4] = "CONNECT", V[V.ADJUST = 8] = "ADJUST", V[V.ADJUST_RESIZE = 16] = "ADJUST_RESIZE", V[V.ADJUST_ROTATE = 32] = "ADJUST_ROTATE", V[V.CONNECT_EDIT = 6] = "CONNECT_EDIT", V), Gs = ((a) => (a[a.NONE = 1] = "NONE", a[a.INPUT = 2] = "INPUT", a[a.OUTPUT = 4] = "OUTPUT", a))(Gs || {}), qs = ((a) => (a[a.ABSOLUTE = 1] = "ABSOLUTE", a[a.RELATIVE = 2] = "RELATIVE", a))(qs || {}), Ks = ((a) => (a[a.NDCAnchor = 0] = "NDCAnchor", a[a.SegmentAnchor = 1] = "SegmentAnchor", a[a.AutoAnchor = 2] = "AutoAnchor", a[a.FixedPointAnchor = 3] = "FixedPointAnchor", a[a.NodePositionAnchor = 4] = "NodePositionAnchor", a[a.FunctionAnchor = 5] = "FunctionAnchor", a))(Ks || {});
const En = { 0: "NDCAnchor", 1: "SegmentAnchor", 2: "AutoAnchor", 3: "FixedPointAnchor", 4: "NodePositionAnchor", 5: "FunctionAnchor" };
var Zs = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, Q = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Qs(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Zs(t, e, r), r;
};
class $ {
  constructor(t, e) {
    this.name = t, e != null && (this.usage = e);
  }
  toJSON() {
    return We(this, this._serializers, this._allwaysSerializers);
  }
  takePoint() {
    let t = this.point;
    return this.point = null, t;
  }
  remember(t) {
    this.point = t;
  }
  pointermoveHandler(t, e, i) {
  }
  pointerupHandler(t, e, i) {
  }
  pointerdownHandler(t, e, i) {
  }
}
Q([u(null)], $.prototype, "className", 2), Q([u(["className"])], $.prototype, "_allwaysSerializers", 2), Q([u(M.NONE)], $.prototype, "usage", 2), Q([u(["name", "usage", "point"])], $.prototype, "_serializers", 2);
class kt extends $ {
  constructor(t, e, i, s) {
    super(t, s), this.x = 0, this.y = 0, this.x = e, this.y = i;
  }
  getNormal() {
    return this._normal == null && (this._normal = T.normalize([0, 0], [this.x, this.y])), this._normal;
  }
}
Q([u("NDCAnchor")], kt.prototype, "className", 2), Q([u($.prototype._serializers.concat(["x", "y"]))], kt.prototype, "_serializers", 2);
class G extends $ {
  constructor(t, e) {
    super(t, e);
  }
  getNormal() {
    return is[this.name];
  }
}
Q([u("NodePositionAnchor")], G.prototype, "className", 2);
class lt extends $ {
  constructor(t, e, i = 0, s) {
    super(t, s), this.t = e, this.segIndex = i;
  }
}
Q([u("SegmentAnchor")], lt.prototype, "className", 2), Q([u("segment")], lt.prototype, "name", 2), Q([u($.prototype._serializers.concat(["t", "segIndex"]))], lt.prototype, "_serializers", 2);
class K extends $ {
  constructor(t, e) {
    super(t, e);
  }
}
Q([u("FunctionAnchor")], K.prototype, "className", 2);
class de extends $ {
  constructor(t, e) {
    super(t, e);
  }
}
Q([u("AutoAnchor")], de.prototype, "className", 2);
class X extends $ {
  constructor(t, e) {
    super(null), this.x = t, this.y = e;
  }
}
Q([u("FixedPointAnchor")], X.prototype, "className", 2), Q([u($.prototype._serializers.concat(["x", "y"]))], X.prototype, "_serializers", 2);
const Nt = class E {
  static regShape(t, e, i) {
    let s = t + "." + e;
    if (E._shapeMap.has(s))
      throw new Error("shape already reg, name:" + s);
    E._shapeMap.set(s, i);
  }
  static getShape(t) {
    let e = E._shapeMap.get(t);
    if (e == null)
      throw new Error("shape is not exist: " + t);
    return e;
  }
  static hasShapeInstance(t) {
    return E._shapeMap.has(t);
  }
  static getShapes(t) {
    let e = [];
    for (let [i, s] of E._shapeMap.entries())
      i.startsWith(t) && e.push(s);
    return e;
  }
  static regFunction(t, e, i) {
    let s = t + "." + e;
    if (E._functionMap.has(s))
      throw new Error("function already reg, name:" + s);
    E._functionMap.set(s, i);
  }
  static getFunction(t) {
    return E._functionMap.get(t);
  }
  static regClass(t, e, i) {
    let s = t + "." + e;
    if (E._classes.has(s))
      throw new Error("class already reg, name:" + s);
    E._classes.set(s, i), E._classNameMap.set(i, s);
  }
  static getClass(t) {
    return E._classes.get(t);
  }
  static getObjectClassName(t) {
    let e = E._classNameMap.get(t.constructor);
    if (e == null)
      throw new Error("class not exist name:" + t.constructor);
    return e;
  }
  static newInstance(t) {
    let e = E._classes.get(t);
    if (e == null)
      throw new Error("class not exist:" + t);
    return new e();
  }
  static getEmptyInstance(t) {
    let e = E._defaultInstanceCache.get(t);
    return e == null && (e = E.newInstance(t), E._defaultInstanceCache.set(t, e)), e;
  }
  static _sysRegClass(t) {
    let e = t.prototype.className;
    if (E._classes.has(e))
      throw new Error("class already reg, name:" + e);
    E._classes.set(e, t), E._classNameMap.set(t, e);
  }
  static _sysRegClasses(t = []) {
    t.forEach((e) => {
      E._sysRegClass(e);
    });
  }
  static _sysRegFunction(t, e) {
    if (E._functionMap.has(t))
      throw new Error("function already reg, name:" + t);
    E._functionMap.set(t, e);
  }
};
Nt._classes = /* @__PURE__ */ new Map(), Nt._classNameMap = /* @__PURE__ */ new Map(), Nt._functionMap = /* @__PURE__ */ new Map(), Nt._shapeMap = /* @__PURE__ */ new Map(), Nt._defaultInstanceCache = /* @__PURE__ */ new Map();
let C = Nt;
class Rt {
  static grid(t, e) {
    t = Math.max(t, 1);
    let i = [], s = 1 / ((e = Math.max(e, 1)) - 1), r = 1 / (t - 1);
    s == 1 / 0 && (s = 0), r == 1 / 0 && (r = 0);
    for (let n = 0; n < t; n++)
      for (let o = 0; o < e; o++) {
        let l = { y: n * r, x: o * s };
        i.push(l);
      }
    return i;
  }
  static innerGrid(t, e) {
    let i = [], s = 1 / (e + 1), r = 1 / (t + 1), n = s, o = r;
    for (let l = 0; l < t; l++)
      for (let h = 0; h < e; h++) {
        let c = { x: n + h * s, y: o + l * r };
        i.push(c);
      }
    return i;
  }
  static circle(t) {
    t.beginAngle = t.beginAngle || 0, t.endAngle = t.endAngle || 2 * Math.PI, (t.vertexCount == null || t.vertexCount < 3) && (t.vertexCount = 3);
    let e = [], i = (t.endAngle - t.beginAngle) / t.vertexCount;
    for (let s = 0; s < t.vertexCount; s++) {
      let r = t.beginAngle + s * i;
      e.push({ x: Math.cos(r), y: Math.sin(r) });
    }
    return e;
  }
  static polygon(t) {
    return Rt.circle({ vertexCount: Math.max(3, t) });
  }
}
var $s = Object.defineProperty, tr = Object.getOwnPropertyDescriptor, ct = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? tr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && $s(t, e, r), r;
};
const wt = class os {
  constructor() {
    this.isClosed = !0, this.vertices = [], this.anchors = os.DefaultAnchors;
  }
  getAnchors() {
    return this.anchors;
  }
  hasAnchor(t) {
    return this.anchors.has(t);
  }
  setConnections(t) {
    this.anchors = /* @__PURE__ */ new Map();
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      let s = new kt(i.name, i.x, i.y);
      s.usage = i.usage || M.CONNECT_EDIT, this.anchors.set(i.name, s);
    }
  }
  getConnectionAnchor(t) {
    return this.anchors.get(t);
  }
  getConnectionAnchors() {
    return this.anchors.values();
  }
  getIntersect(t, e, i) {
    const s = i._obb.points;
    return xi(t, e, s, this.isClosed);
  }
  getConnectAutoPoint(t, e, i) {
    let s = { x: t, y: e }, r = { x: i._obb.aabb.center, y: i._obb.aabb.middle };
    return H.getFirstIntersectPoint(r, s, i._obb.points, this.isClosed) || r;
  }
  toJSON() {
    let t = We(this, this._serializers, this._allwaysSerializers);
    return t.className = C.getObjectClassName(this), t;
  }
  static fromJSON(t) {
    let e = t.namespace || t.className;
    if (C.hasShapeInstance(e)) {
      let s = C.getShape(e);
      return Object.assign(s, t), s;
    }
    let i = C.newInstance(t.className);
    return Object.assign(i, t), i;
  }
  static grid(t, e) {
    return Rt.grid(t, e);
  }
  static innerGrid(t, e) {
    return Rt.innerGrid(t, e);
  }
  static circle(t) {
    return Rt.circle(t);
  }
  static polygon(t) {
    return Rt.polygon(t);
  }
};
wt.DefaultAnchors = /* @__PURE__ */ new Map(), ct([u("Shape")], wt.prototype, "className", 2), ct([u(!0)], wt.prototype, "isClosed", 2), ct([u(32)], wt.prototype, "width", 2), ct([u(32)], wt.prototype, "height", 2), ct([u(!0)], wt.prototype, "isUnit", 2), ct([u(["className"])], wt.prototype, "_allwaysSerializers", 2), ct([u(["vertices", "isClosed", "width", "height", "vertices", "namespace"])], wt.prototype, "_serializers", 2);
let qt = wt;
class er extends qt {
  draw(t, e) {
    console.warn("not implement draw");
  }
  drawSVG(t, e) {
    console.warn("not implement drawSVG");
  }
}
ct([u("RegShape")], er.prototype, "className", 2);
class bt extends qt {
  constructor(t) {
    super(), this.isClosed = !0, this.updatePoints(t);
  }
  updatePoints(t) {
    this.vertices = t, this.dirty = !0;
  }
  draw(t, e) {
    const i = e._obb.localPoints;
    if (i == null || i.length == 0)
      return;
    let s = i[0];
    t.beginPath(), t.moveTo(s.x, s.y);
    for (let r = 1; r < i.length; r++)
      (i[r].x !== s.x || i[r].y !== s.y) && t.lineTo(i[r].x, i[r].y), s = i[r];
    this.isClosed && (t.fill(), t.closePath()), e._computedStyle.lineWidth > 0 && t.stroke();
  }
  drawSVG(t, e) {
    const i = e._obb.localPoints;
    let s = "";
    for (let r = 0; r < i.length; r++) {
      const n = i[r];
      s += r === 0 ? "M " + n.x + "," + n.y : "L " + n.x + "," + n.y;
    }
    this.isClosed && (s += "Z"), t.setAttribute("d", s);
  }
  rotate(t) {
    return this.vertices = H.rotatePoints(this.vertices, t), this.dirty = !0, this;
  }
  scale(t, e) {
    return this.vertices.forEach((i) => {
      i.x *= t, i.y *= e;
    }), this.vertices = H.normalizePoints(this.vertices), this.dirty = !0, this;
  }
  skew(t, e) {
    return this.vertices.forEach((i) => {
      let s = i.x, r = i.y;
      i.x = s + r * e, i.y = r + s * t;
    }), this.vertices = H.normalizePoints(this.vertices), this.dirty = !0, this;
  }
}
function _e(a, t, e) {
  let i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = t.Roots, o = t.DisplayObjects || [], l = t.Styles || [], h = t.Shapes || [], c = t.Resources || [], d = t.CustomStyle || {};
  if (t.SerializeType, o.forEach((p) => {
    if (p.hasOwnProperty("userData") && !p.hasOwnProperty("data")) {
      let x = p.userData;
      delete p.userData, p.data = x;
    }
    p.isLink && p.path == null && (p.path = [p.begin, p.end], delete p.begin, delete p.end);
  }), d.styles == null) {
    let p = {}, x = Object.keys(d);
    for (let w = 0; w < x.length; w++) {
      let k = x[w];
      k.startsWith(".") && (p[k] = d[k], delete d[k]);
    }
    d.styles = p;
  }
  l.forEach(function(p, x) {
    s.set(x, xt.fromJSON(p, c));
  }), h.forEach(function(p, x) {
    let w = qt.fromJSON(p);
    w != null ? (Object.assign(w, p), r.set(x, w)) : console.error("shape not exist:", p);
  });
  let g = [];
  const y = o.map(function(p, x) {
    let w;
    e != null && (w = e.get(p)), w == null && (w = C.newInstance(p.className)), x < n.length && g.push(w);
    let k = { resourcesArr: c, objJson: p, styleIndexMap: s, shapeIndexMap: r };
    return w._fromJSON(k), i.set(x, w), w;
  });
  y.forEach((p) => {
    p.removeAllChildren();
  }), o.forEach((p, x) => {
    let w = p.parent;
    if (w == null)
      return;
    let k = i.get(w), b = y[x];
    b.parent != null && b.removeFromParent(), k.addChild(b);
  });
  let f = o.filter((p) => p.isLink), m = y.filter((p) => p.isLink);
  return f.forEach(function(p, x) {
    m[x]._afterJson(p, i);
  }), t.EditInfo != null && a.editor != null && a.editor.fromEditInfo(t.EditInfo, y), t.CustomStyle != null && a.styleSystem.fromJson(t), g;
}
ct([u("PolygonShape")], bt.prototype, "className", 2), ct([u(!0)], bt.prototype, "isClosed", 2), ct([u(!1)], bt.prototype, "dirty", 2);
const as = class ls {
  constructor(t) {
    this.stage = t;
  }
  setNumberFixed(t) {
    ls.numberFixed = t;
  }
  objectsToJSON(t, e = "Objects") {
    return De(this.stage, t, null, e);
  }
  jsonToObjects(t, e) {
    return _e(this.stage, t, e);
  }
  static getProtoDefaultProperties(t) {
    let e = t._serializers, i = Object.getPrototypeOf(t), s = {};
    for (let r = 0; r < e.length; r++) {
      let n = e[r], o = i[n], l = t[n];
      l === o && (s[n] = l);
    }
    return s;
  }
  componentToObjects(t) {
    let e = JSON.parse(t);
    return _e(this.stage, e);
  }
  objectsToComponent(t) {
    let e = this.objectsToJSON(t);
    return JSON.stringify(e);
  }
  fillByJson(t, e) {
    let i = this, s = (t.Resources || []).filter((r) => r.type == "img").map((r) => r.src);
    return new Promise((r, n) => {
      if (s.length == 0)
        return i._restoreFromState(t, e), void r(!0);
      st.whenAllImagesLoaded(s).then(() => {
        i._restoreFromState(t, e), r(!0);
      }).catch((o) => {
        n(o);
      });
    });
  }
  _getState(t, e) {
    return De(this.stage, [t], e, "Layer");
  }
  _restoreFromState(t, e) {
    return _e(this.stage, t, e);
  }
};
as.numberFixed = 6;
let hi = as;
function De(a, t, e, i) {
  t = t.filter((o) => o.serializeable);
  const s = {};
  s.version = bi;
  const r = function(o) {
    let l = [];
    o.length > 0 && (l = U.flatten(o[0].children));
    for (let p = 1; p < o.length; p++) {
      let x = U.flatten(o[p].children, (w) => w.serializeable);
      l = l.concat(x);
    }
    let h = o.concat(l), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), f = [], m = { objects: h, objIndexMap: c, styleIndexMap: d, styles: [], resourcesIndexMap: y, resources: f, shapeIndexMap: g, shapes: [], indexImage: function(p) {
      let x = y.get(p);
      if (x != null)
        return x;
      if (p instanceof HTMLImageElement) {
        let w = { type: "img", src: p.getAttribute("src") };
        return f.push(w), x = f.length - 1, y.set(p, x), x;
      }
      throw new Error("createImageIndex error");
    } };
    return h.forEach((p, x) => {
      p._beforeToJSON(m), c.set(p, x);
    }), m;
  }(t);
  let n = r.objects;
  if (s.Roots = t.map((o, l) => l), s.Styles = r.styles, s.Shapes = r.shapes, s.Resources = r.resources, s.DisplayObjects = n.map(function(o) {
    let l = o._toJSON(r);
    return e != null && e.set(l, o), l;
  }), t.length > 0 && a.editor != null) {
    let o = a.editor.getEditInfo(n, r.objIndexMap);
    o != null && (s.EditInfo = o);
  }
  return i == "Stage" && (s.CustomStyle = a.styleSystem.customStyleToJSON(r.indexImage)), s.SerializeType = i, s;
}
function We(a, t, e) {
  let i = C.getObjectClassName(a), s = C.getEmptyInstance(i), r = {};
  if (e)
    for (let n = 0; n < e.length; n++) {
      let o = e[n];
      if (o == "className") {
        r[o] = i;
        continue;
      }
      let l = a[o];
      r[o] = l;
    }
  for (let n = 0; n < t.length; n++) {
    let o = t[n], l = a[o];
    if (l != s[o]) {
      if (Array.isArray(l) && Array.isArray(s[o])) {
        if (sr(s[o], l))
          continue;
        r[o] = l;
      }
      l != null && (typeof l == "number" && hi.numberFixed != null && (l = ir(l, hi.numberFixed)), l.toJSON instanceof Function && (l = l.toJSON())), r[o] = l;
    }
  }
  return r;
}
function ir(a, t) {
  if (Number.isInteger(a))
    return a;
  let e = a.toString();
  return e.length - e.indexOf(".") - 1 > t && (a = a.toFixed(t), a = parseFloat(a)), a;
}
function sr(a, t) {
  if (a === t)
    return !0;
  if (a.length != t.length)
    return !1;
  for (let e = 0; e < a.length; e++)
    if (a[e] != t[e])
      return !1;
  return !0;
}
var rr = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, Kt = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? nr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && rr(t, e, r), r;
};
class vi extends bt {
  constructor() {
    super([{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }]), this.isClosed = !0, this.isUnit = !1;
  }
  draw(t, e) {
    let i = e._state.shapeSize, s = e._computedStyle.lineWidth;
    t.beginPath(), t.rect(-i.width / 2, -i.height / 2, i.width, i.height), t.fill(), s > 0 && t.stroke();
  }
  drawSVG(t, e) {
    let i = e._state.shapeSize, s = "" + 0.5 * -i.width, r = "" + 0.5 * -i.height;
    t.setAttribute("x", s), t.setAttribute("y", r);
  }
}
Kt([u("Rect")], vi.prototype, "className", 2);
class hs extends qt {
  constructor() {
    super();
  }
  draw(t, e) {
    let i = e._state.shapeSize;
    t.beginPath(), t.ellipse(0, 0, i.width / 2, i.height / 2, 0, 0, 2 * Math.PI), t.fill(), e._computedStyle.lineWidth > 0 && t.stroke();
  }
  drawSVG(t, e) {
    let i = e._state.shapeSize;
    t.setAttribute("cx", "0"), t.setAttribute("cy", "0"), t.setAttribute("rx", "" + i.width / 2), t.setAttribute("ry", "" + i.height / 2);
  }
  getIntersect(t, e, i) {
    const s = 0.5 * i._obb.aabb.width, r = 0.5 * i._obb.aabb.height, n = i._obb.aabb.center, o = i._obb.aabb.middle;
    let l = t - n, h = e - o, c = Math.atan2(h * s, l * r), d = { x: n + s * Math.cos(c), y: o + r * Math.sin(c) }, g = t - d.x, y = e - d.y, f = Math.sqrt(g * g + y * y), m = new Vt(d.x, d.y);
    return m.t = c / (2 * Math.PI), m.dist = f, m;
  }
  getConnectAutoPoint(t, e, i) {
    const s = 0.5 * i._obb.aabb.width, r = 0.5 * i._obb.aabb.height, n = i._obb.aabb.center, o = i._obb.aabb.middle;
    let l = t - n, h = e - o, c = Math.atan2(h * s, l * r);
    return { x: n + s * Math.cos(c), y: o + r * Math.sin(c) };
  }
}
Kt([u("Ellipse")], hs.prototype, "className", 2);
class cs extends bt {
  constructor() {
    super([{ x: -1, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 1 }]);
  }
}
Kt([u("Triangle")], cs.prototype, "className", 2);
class ds extends bt {
  constructor() {
    super([{ x: -1, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]), this.isClosed = !1;
  }
  draw(t, e) {
    let i = e._state.shapeSize, s = e._computedStyle.lineWidth, r = i.width / 2, n = i.height / 2;
    t.beginPath(), t.moveTo(-r, -n), t.lineTo(r, 0), t.lineTo(-r, n), t.moveTo(-r - 0.5 * s, 0), t.lineTo(r, 0), s > 0 && t.stroke();
  }
  drawSVG(t, e) {
    let i = e._state.shapeSize, s = e._computedStyle.lineWidth, r = i.width / 2, n = i.height / 2, o = "M " + -r + "," + -n + " L " + r + ",0 L " + -r + "," + n + " M " + (-r - 0.5 * s) + ",0 L " + r + ",0";
    t.setAttribute("d", o);
  }
}
Kt([u("Arrow")], ds.prototype, "className", 2);
class us extends bt {
  constructor() {
    super([{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]);
  }
}
Kt([u("Diamond")], us.prototype, "className", 2);
class Me extends vi {
  constructor() {
    super();
  }
  draw(t, e) {
    let i = e.arrowsSize, s = 0.5 * -e.width, r = 0.5 * -e.height, n = e.width, o = e.height - i;
    t.beginPath(), t.moveTo(s, r), t.lineTo(s + n, r), t.lineTo(s + n, r + o), t.lineTo(i - 2 + 0, r + o), t.lineTo(0, r + o + i), t.lineTo(0 - (i - 2), r + o), t.lineTo(s, r + o), t.lineTo(s, r), t.fill(), e._computedStyle.lineWidth > 0 && t.stroke();
  }
}
Kt([u("Tip")], Me.prototype, "className", 2);
class or {
  constructor() {
    C._sysRegClass(vi), C._sysRegClass(hs), C._sysRegClass(cs), C._sysRegClass(ds), C._sysRegClass(us), C._sysRegClass(Me), C._sysRegClass(bt);
  }
  getShapes(t) {
    return C.getShapes(t);
  }
  getShape(t) {
    return C.hasShapeInstance(t) ? C.getShape(t) : C.getEmptyInstance(t);
  }
  drawToCanvas(t, e, i = { size: 42, strokeStyle: "gray", fillStyle: "white", padding: 0 }) {
    let s = i.size || 42, r = s, n = s, o = e.getContext("2d");
    o.save(), o.strokeStyle = i.strokeStyle || "gray", o.fillStyle = i.fillStyle || "white", o.translate(e.width / 2, e.height / 2);
    let l = C.newInstance("ShapeNode");
    return Object.assign(l, { x: 0, y: 0, width: r, height: n }), l.setShape(t), Object.assign(l._computedStyle, { lineWidth: 1, padding: i.padding || 0 }), l.updateMatrix(), l._updateShapeSize(), t.draw(o, l), o.restore(), e;
  }
}
const Fe = new or();
var ar = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, Je = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? lr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && ar(t, e, r), r;
};
class ve extends Ct {
  constructor() {
    super(), this._matrixDirty = !0, this._state = { needPaint: !0, isOutOfViewport: !1, attrDirty: !1, renderIndex: 0 }, this._localTransform = Y.allocate(), this._worldTransform = Y.allocate(), this._obb = new _t();
  }
  _getLocalTransform() {
    let t = this._localTransform;
    return t.identity(), this._doTransform(t), t;
  }
  getWorldTransform() {
    return this._worldTransform;
  }
  markMatrixDirty() {
    this._matrixDirty = !0;
    const t = this.ownerLayer;
    t && t._markDirtyObject(this);
  }
  get visible() {
    return this._visible;
  }
  set visible(t) {
    this._propertyChanged("visible", this.visible, t), this._visible = t;
  }
  show() {
    return !this.visible && (this.visible = !0), this;
  }
  hide() {
    return this.visible && (this.visible = !1), this;
  }
  isVisible() {
    return this.visible;
  }
  _propertyChanged(t, e, i) {
    this.markMatrixDirty();
  }
  destroy() {
    this.visible = !1, this.listeners = null, this.destroyed = !0;
  }
}
Je([u(!0)], ve.prototype, "_visible", 2), Je([u(!1)], ve.prototype, "painted", 2), Je([u(!1)], ve.prototype, "destroyed", 2);
var hr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, z = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? cr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && hr(t, e, r), r;
};
const D = class ne extends ve {
  constructor() {
    super(), this._x = 0, this._y = 0, this.deep = Tt.MinDeep, this._data = {}, this.attributes = {}, this.children = [], this.style = new xt(), this._computedStyle = new xt(), this.classList = [], this.inLinks = [], this.outLinks = [];
  }
  get data() {
    return this._data;
  }
  set data(t) {
    this._data = t;
  }
  translate(t, e) {
    return this.x = t, this.y = e, this;
  }
  scale(t, e) {
    return this.scaleX = t, this.scaleY = e, this;
  }
  rotate(t) {
    return this.rotation = t, this;
  }
  setAttributes(t) {
    return Object.assign(this.attributes, t), this._markAttrDirty(), this;
  }
  removeAttribute(t) {
    delete this.attributes[t], this._markAttrDirty();
  }
  setAttribute(t, e) {
    this.attributes[t] = e, this._markAttrDirty();
  }
  _markAttrDirty() {
    const t = this.ownerLayer;
    t && t._markDirtyObject(this), this._state.attrDirty = !0;
  }
  getAttribute(t, e) {
    let i = this.attributes[t];
    return i ?? e;
  }
  getAABB(t) {
    if (this._matrixDirty && this.updateMatrix(), t != 1)
      return this._obb.aabb;
    let e = ne.flatten([this]).map((i) => i._obb.aabb);
    return v.unionRects(e);
  }
  dragHandler(t) {
    if (this.dispatchEvent(Z.dragEvent), this.pointerEnabled == 0 || this.draggable == 0)
      return;
    let e = this.parent.getWorldTransform().invert().vec([1, 1], [t.dxInWorld, t.dyInWorld]);
    this.translateWith(e[0], e[1]);
  }
  getShape() {
    return this._shape;
  }
  getStyle(t) {
    return this.style[t];
  }
  css(t) {
    return this.setStyles(t);
  }
  setStyles(t) {
    return Object.assign(this.style, t), this._markStyleDirty(), this;
  }
  setStyle(t, e) {
    return this.style[t] = e, this._markStyleDirty(), this;
  }
  _markStyleDirty() {
    this.style.dirty = !0, this._matrixDirty = !0;
    const t = this.ownerLayer;
    t && t._markDirtyObject(this);
  }
  getComputedStyle() {
    return this._computedStyle;
  }
  clearStyles() {
    let t = Object.keys(this.style);
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      i != "dirty" && delete this.style[i];
    }
    return this._markStyleDirty(), this;
  }
  addClass(t) {
    if (t.charAt(0) !== ".")
      throw new Error('error: style class must be startWith "."');
    return at.remove(this.classList, t), this.classList.push(t), this._markStyleDirty(), this;
  }
  removeClass(t) {
    at.remove(this.classList, t), this._markStyleDirty();
  }
  hasClass(t) {
    return this.classList.indexOf(t) != -1;
  }
  removeAllClass() {
    return this.classList.length = 0, this._markStyleDirty(), this;
  }
  isConnected() {
    return this.inLinks.length > 0 || this.outLinks.length > 0;
  }
  getPoint(t, e) {
    let i = this.getLocalPoint(t, e);
    return i.x += this.x, i.y += this.y, i;
  }
  getLocalPoint(t, e) {
    let i = this._obb.localPoints;
    if (i == null && (i = this._getOBBPoints()), e != null) {
      let s = this._shape.isClosed ? i.length : i.length - 1;
      if (e > s)
        throw console.log(e, s), new Error("segIndex out of bounds.");
      let r = e + 1;
      r == i.length && (r = 0);
      let n = i[e], o = i[r];
      if (n == null || o == null)
        throw console.log(n, o, i), console.log(t, e, r), new Error("beginPoint or endPoint is null");
      i = [n, o];
    }
    return N.lerpOnLines(i, t, this._shape.isClosed);
  }
  _findChildren(t, e = !1) {
    let i = this.children, s = [];
    for (let r = 0; r < i.length; r++) {
      let n = i[r];
      if (t(n) && s.push(n), e) {
        let o = n._findChildren(t, e);
        s = s.concat(o);
      }
    }
    return s;
  }
  _findChild(t, e = !1) {
    let i = this.children;
    for (let s = 0; s < i.length; s++) {
      let r = i[s];
      if (t(r))
        return r;
      if (e) {
        let n = r._findChild(t, e);
        if (n != null)
          return n;
      }
    }
    return null;
  }
  querySelectorAll(t) {
    let e = Di(t);
    return this._findChildren(e, !0);
  }
  querySelector(t) {
    let e = Di(t);
    return this._findChild(e, !0);
  }
  getInLinks() {
    return this.inLinks;
  }
  getOutLinks() {
    return this.outLinks;
  }
  pointerdownHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.pointerdownEvent);
  }
  pointerupHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.pointerupEvent);
  }
  pointermoveHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.pointermoveEvent);
  }
  pointerenterHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.pointerenterEvent);
  }
  pointeroutHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.pointeroutEvent);
  }
  dragEndHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.dragEndEvent);
  }
  clickHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.clickEvent);
  }
  dblclickHandler(t) {
    this.pointerEnabled == 1 && this.dispatchEvent(Z.dblclickEvent);
  }
  dropHandler(t) {
    this.dispatchEvent(Z.dropEvent);
  }
  dragoverHandler(t) {
    this.dispatchEvent(Z.dropoverEvent);
  }
  dragoutHandler(t) {
    this.dispatchEvent(Z.dropoutEvent);
  }
  selectedHandler() {
    this.pointerEnabled == 1 && (this.isSelected = !0, this.markMatrixDirty(), this.dispatchEvent(Z.selectedEvent));
  }
  unselectedHandler() {
    this.markMatrixDirty(), this.isSelected = !1, this.pointerEnabled == 1 && this.dispatchEvent(Z.unselectedEvent);
  }
  appendChild(t) {
    this.markMatrixDirty();
    let e = this;
    if (t.parent != null)
      throw console.log(t), new Error("child already has parent");
    if (e === t)
      throw console.log(e), new Error("can not add self as child");
    return t.parent = e, t.deep = e.deep + 1, e.children.push(t), e.ownerLayer && (t.ownerLayer == null ? (t.ownerLayer = e.ownerLayer, t.ownerLayer.render.onNEMounted(t)) : t.ownerLayer = e.ownerLayer), t.hasChildren() && t._updateTree(!0), this;
  }
  sortChildren(t) {
    return this.children.sort(t), this.markMatrixDirty(), this.ownerLayer && (this.ownerLayer._renderState.treeDirty = !0), this;
  }
  _updateTree(t = !1) {
    if (this.children.length <= 0)
      return;
    const e = this.children;
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      s.markMatrixDirty(), s.deep = this.deep + 1, s.ownerLayer = this.ownerLayer, t && s._updateTree(t);
    }
  }
  getChildren() {
    return this.children;
  }
  hasChild(t) {
    return this.children.indexOf(t) != -1;
  }
  hasChildren() {
    return this.children.length > 0;
  }
  removeFromParent() {
    return this.parent && this.parent.removeChild(this), this;
  }
  append(...t) {
    return this.addChildren(t);
  }
  prepend(...t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      i.parent = this, this.deep < Tt.MinDeep && (i.ownerLayer = this, i.ownerLayer._renderState.treeDirty = !0), this.children.unshift(i);
    }
    return this.markMatrixDirty(), this._updateTree(!0), this;
  }
  removeChild(t) {
    t.markMatrixDirty(), this.markMatrixDirty(), t.ownerLayer != null && t.ownerLayer._onNERemoved(t), t.ownerLayer = null, t.parent = null;
    let e = this.children.indexOf(t);
    return e != -1 && (at.removeAt(this.children, e), t.hasChildren() && t._updateTree(!0)), this;
  }
  removeChildren(t) {
    this.markMatrixDirty();
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      i.markMatrixDirty(), i.ownerLayer && i.ownerLayer.render.onNEUnmouted(i), i.ownerLayer = null, i.parent = null;
      let s = this.children.indexOf(i);
      s != -1 && at.removeAt(this.children, s);
    }
    return this._updateTree(!0), this;
  }
  removeAllChildren() {
    let t = this.children.slice();
    for (let e = 0; e < t.length; e++)
      this.removeChild(t[e]);
    return this;
  }
  hideAllChildren() {
    return this.children.forEach(function(t) {
      t.hide();
    }), this;
  }
  showAllChildren() {
    return this.children.forEach(function(t) {
      t.show();
    }), this;
  }
  getChildrenAABB(t) {
    let e = (t ? ne.flatten(this.children) : this.children).map((i) => i._obb.aabb);
    return v.unionRects(e);
  }
  getRoot() {
    let t = this;
    for (; t.parent != null; )
      t = t.parent;
    return t;
  }
  onUnmounted() {
  }
  worldToLocalXY(t, e) {
    return this.getWorldTransform().invert().pointXY(t, e);
  }
  localToWorldXY(t, e) {
    return this.getWorldTransform().pointXY(t, e);
  }
  addInLink(t) {
    return this.inLinks == null && (this.inLinks.length = 0), this.inLinks.push(t), this;
  }
  addOutLink(t) {
    return this.outLinks.push(t), this.markMatrixDirty(), t.markMatrixDirty(), this;
  }
  removeInLink(t) {
    return at.remove(this.inLinks, t), this.markMatrixDirty(), t.markMatrixDirty(), this;
  }
  removeOutLink(t) {
    return at.remove(this.outLinks, t), this.markMatrixDirty(), t.markMatrixDirty(), this;
  }
  getLinks() {
    let t = [];
    return this.inLinks && (t = t.concat(this.inLinks)), this.outLinks && (t = t.concat(this.outLinks)), t;
  }
  getOBB() {
    return this._obb;
  }
  updateMatrix() {
    this._localTransform.identity(), this._doTransform(this._localTransform), this.parent != null ? Y.multiply(this._worldTransform, this.parent._worldTransform, this._localTransform) : Y.fillFrom(this._worldTransform, this._localTransform.m);
    let t = this._obb;
    t.localPoints = this._getOBBPoints();
    let e = this._worldTransform.points(t.points, t.localPoints);
    return _t.toAABB(t.aabb, e), this._afterUpdateMatrix(), this;
  }
  _afterUpdateMatrix() {
  }
  _afterStyleComputed() {
  }
  _clearMatrixDirtyMark() {
    this._matrixDirty = !1;
  }
  getK(t, e = null) {
    let i = this.getPoint(t - 1e-6, e), s = this.getPoint(t + 1e-6, e), r = s.x - i.x, n = s.y - i.y;
    return Math.atan2(n, r);
  }
  isOutOfParent() {
    let t = this, e = t.parent;
    if (e != null && e.parent != null) {
      const i = t._obb.aabb;
      return !e._obb.aabb.isIntersectRect(i);
    }
    return !1;
  }
  contains(t) {
    if (t === this || this.children.includes(t))
      return !0;
    for (let e = 0; e < this.children.length; e++)
      if (this.children[e].contains(t))
        return !0;
    return !1;
  }
  pickable() {
    return this.pointerEnabled;
  }
  destroy() {
    super.destroy(), this.pointerEnabled = !1, this.inLinks.forEach((t) => {
      t.unlinkEnd();
    }), this.outLinks.forEach((t) => {
      t.unlinkBegin();
    }), this.inLinks.length = 0, this.outLinks.length = 0, this.parent && this.parent.removeChild(this), this.name = null, this.style = null, this.children.length = 0, this._localTransform.release(), this._worldTransform.release(), this._obb.points.length = 0, this.type = null, this.data = null, this.attributes.length = 0, this._state = null;
  }
  static flatten(t, e, i) {
    let s = [];
    if (i) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let o = t[n];
        o.parent != null && (e == null || e(o) == 1) && (r.push(o), s.push(o));
      }
      for (let n = 0; n < r.length; n++) {
        let o = r[n];
        if (o.parent != null && o.children && o.children.length > 0) {
          let l = ne.flatten(o.children, e, i);
          s = s.concat(l);
        }
      }
      return s;
    }
    for (let r = 0; r < t.length; r++) {
      let n = t[r];
      if (n.parent != null && (e == null || e(n) == 1) && (s.push(n), n.children && n.children.length > 0)) {
        let o = ne.flatten(n.children, e);
        s = s.concat(o);
      }
    }
    return s;
  }
  toJSON() {
    return this._toJSON();
  }
  _toJSON(t) {
    let e = We(this, this._serializers, this._allwaysSerializers);
    if (t != null) {
      let i = t.objIndexMap, s = t.styleIndexMap;
      if (i) {
        let r = s.get(this.style);
        r != null && (e.style = r);
      }
      if (i && this.parent != null) {
        let r = i.get(this.parent);
        r != null && (e.parent = r);
      }
    }
    return e.data != null && (Object.keys(e.data).length == 0 ? delete e.data : e.data = JSON.parse(JSON.stringify(e.data))), e.attributes != null && (Object.keys(e.attributes).length == 0 ? delete e.attributes : e.attributes = JSON.parse(JSON.stringify(e.attributes))), e;
  }
  _beforeToJSON(t) {
    let e = this.style;
    if (t.styleIndexMap.get(e) == null) {
      let i = e.toJSON(t.indexImage);
      if (Object.keys(i).length > 0) {
        let s = t.styles.length;
        t.styleIndexMap.set(e, s), t.styles.push(i);
      }
    }
  }
  _fromJSON(t) {
    const e = this, i = t.objJson;
    let s = e._serializers, r = Object.getPrototypeOf(e);
    if (s.forEach((n) => {
      if (i.hasOwnProperty(n)) {
        let o = Object.getOwnPropertyDescriptor(e, n);
        if (o == null && (o = Object.getOwnPropertyDescriptor(r, n)), o != null && o.writable == 0)
          return;
        let l = i[n];
        l != null && l.className != null && (l = C.newInstance(l.className), Object.assign(e, l)), e[n] = l;
      }
    }), t.objJson.style != null) {
      let n = t.styleIndexMap.get(t.objJson.style);
      e.style = n;
    }
  }
  update() {
    this.ownerLayer != null && (this.ownerLayer._renderState.requestRepaint = !0);
  }
  getConnectAutoPoint(t) {
    return this._shape.getConnectAutoPoint(t.x, t.y, this);
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x !== t && this._propertyChanged("x", this._x, t), this._x = t;
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y !== t && this._propertyChanged("y", this._y, t), this._y = t;
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z !== t && this._propertyChanged("z", this._z, t), this._z = t;
  }
  get width() {
    return this._width;
  }
  set width(t) {
    this.width !== t && this._propertyChanged("width", this._width, t), this._width = t < 0 ? 0 : t;
  }
  get height() {
    return this._height;
  }
  set height(t) {
    this._height !== t && this._propertyChanged("height", this._height, t), this._height = t;
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation !== t && this._propertyChanged("rotation", this._rotation, t), this._rotation = t;
  }
  get scaleX() {
    return this._scaleX;
  }
  set scaleX(t) {
    t == 0 && (t = 1e-6), this._scaleX !== t && this._propertyChanged("scaleX", this._scaleX, t), this._scaleX = t;
  }
  get scaleY() {
    return this._scaleY;
  }
  set scaleY(t) {
    t == 0 && (t = 1e-6), this._scaleY !== t && this._propertyChanged("scaleY", this._scaleY, t), this._scaleY = t;
  }
  get skewX() {
    return this._skewX;
  }
  set skewX(t) {
    this._skewX !== t && this._propertyChanged("skewX", this._skewX, t), this._skewX = t;
  }
  get skewY() {
    return this._skewY;
  }
  set skewY(t) {
    this._skewY !== t && this._propertyChanged("skewY", this._skewY, t), this._skewY = t;
  }
  get left() {
    return this.x - 0.5 * this.width;
  }
  set left(t) {
    this.x = t + 0.5 * this.width;
  }
  get right() {
    return this.x + 0.5 * this.width;
  }
  set right(t) {
    this.x = t - 0.5 * this.width;
  }
  get top() {
    return this.y - 0.5 * this.height;
  }
  set top(t) {
    this.y = t + 0.5 * this.height;
  }
  get bottom() {
    return this.y + 0.5 * this.height;
  }
  set bottom(t) {
    this.y = t - 0.5 * this.height;
  }
  set zIndex(t) {
    this._zIndex = t, this.setZIndex(t);
  }
  get zIndex() {
    return this._zIndex;
  }
  setZIndex(t) {
    this._zIndex = t, this.parent && this.parent.updateZIndex(), this._propertyChanged("zIndex", this._zIndex, t);
  }
  updateZIndex() {
    return this.sortChildren((t, e) => t.zIndex - e.zIndex);
  }
  addChildren(t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      i.parent = this, i.ownerLayer = this.ownerLayer, this.deep < Tt.MinDeep && (i.ownerLayer = this, i.ownerLayer._renderState.treeDirty = !0), i.ownerLayer && i.ownerLayer.render.onNEMounted(i), this.children.push(i);
    }
    return this.markMatrixDirty(), this._updateTree(!0), this;
  }
  addChild(t) {
    return this.appendChild(t);
  }
  get previousSibling() {
    if (this.parent == null)
      return null;
    const t = this.parent.children.indexOf(this);
    return t == 0 ? null : this.parent.children[t - 1];
  }
  get nextSibling() {
    if (this.parent == null)
      return null;
    const t = this.parent.children.indexOf(this);
    return t == this.parent.children.length - 1 ? null : this.parent.children[t + 1];
  }
  getIndex() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
};
z([u("NE")], D.prototype, "className", 2), z([u(!0)], D.prototype, "pointerEnabled", 2), z([u(!1)], D.prototype, "isLayer", 2), z([u(!0)], D.prototype, "serializeable", 2), z([u(0)], D.prototype, "_x", 2), z([u(0)], D.prototype, "_y", 2), z([u(1)], D.prototype, "_width", 2), z([u(1)], D.prototype, "_height", 2), z([u(0)], D.prototype, "_rotation", 2), z([u(1)], D.prototype, "_scaleX", 2), z([u(1)], D.prototype, "_scaleY", 2), z([u(0)], D.prototype, "_skewX", 2), z([u(0)], D.prototype, "_skewY", 2), z([u(Fe.getShape("Rect"))], D.prototype, "_shape", 2), z([u(1)], D.prototype, "_pickPrecision", 2), z([u(["className"])], D.prototype, "_allwaysSerializers", 2), z([u(["id", "name", "type", "zIndex", "frozen", "selectedStyle", "showSelected", "draggable", "visible", "origin", "classList", "dropAllowed", "data", "attributes", "pointerEnabled", "title"])], D.prototype, "_serializers", 2), z([u(0)], D.prototype, "_zIndex", 2), z([u(!1)], D.prototype, "frozen", 2), z([u(!0)], D.prototype, "showSelected", 2), z([u(!0)], D.prototype, "draggable", 2), z([u(!1)], D.prototype, "isSelected", 2), z([u(!1)], D.prototype, "dropAllowed", 2);
let U = D;
function Di(a) {
  if (a == null)
    return () => !0;
  if (typeof a == "function")
    return a;
  if ((a = a.trim()) == "")
    return () => !0;
  let t, e, i, s = a, r = a.match(/(.*)\s*(\[.*\])/);
  if (r && (s = r[1], i = r[2]), s.startsWith(".") ? e = (n) => n.classList.indexOf(s) != -1 : s.startsWith("#") ? e = (n) => n.id == s.substring(1) : s != "" && (e = (n) => {
    let o = C.getClass(s);
    return o != null && o == n.constructor;
  }), i != null && (t = i.match(/\[\s*(.*?)\s*([>|<|=|!]{1,2})\s*['"]{0,1}(.*?)['"]{0,1}]$/)) != null) {
    let n = t[1], o = t[2], l = t[3], h = (c) => "" + c[n] == l;
    return o == ">" ? h = (c) => c[n] > parseInt(l) : o == ">=" ? h = (c) => c[n] >= parseInt(l) : o == "<" ? h = (c) => c[n] < parseInt(l) : o == "<=" ? h = (c) => c[n] <= parseInt(l) : o == "!=" && (h = (c) => c[n] != l), e == null ? h : (c) => e(c) && h(c);
  }
  return e || (() => !0);
}
const Z = { touchmoveEvent: new InputEvent("touchmove"), pointerdownEvent: new InputEvent("pointerdown"), pointerupEvent: new InputEvent("pointerup"), pointermoveEvent: new InputEvent("pointermove"), pointerenterEvent: new InputEvent("pointerenter"), pointeroutEvent: new InputEvent("pointerout"), clickEvent: new InputEvent("click"), dblclickEvent: new InputEvent("dblclick"), dragEvent: new InputEvent("drag"), dragEndEvent: new InputEvent("dragend"), dropoverEvent: new InputEvent("dropover"), dropEvent: new InputEvent("drop"), dropoutEvent: new InputEvent("dropout"), selectedEvent: new InputEvent("selected"), unselectedEvent: new InputEvent("unselected") };
class dr extends Ns {
  constructor() {
    super(), this.aeNodes = /* @__PURE__ */ new WeakSet();
  }
  hasAENode(t) {
    return this.aeNodes.has(t);
  }
  addAENode(t) {
    !this.hasAENode(t) && t.setupAE(), t.animationSystem = this, t.animations.forEach((e, i) => {
      e.object = t, e.system = this, e.play();
    }), this.aeNodes.add(t);
  }
  removeAENode(t) {
    t.animationSystem = null, t.animations.forEach((e, i) => {
      e.cancel();
    }), this.aeNodes.delete(t);
  }
}
const Si = /* @__PURE__ */ new Map([["lt", { x: -1, y: -1 }], ["ct", { x: 0, y: -1 }], ["rt", { x: 1, y: -1 }], ["lm", { x: -1, y: 0 }], ["center", { x: 0, y: 0 }], ["rm", { x: 1, y: 0 }], ["lb", { x: -1, y: 1 }], ["cb", { x: 0, y: 1 }], ["rb", { x: 1, y: 1 }]]), ur = /* @__PURE__ */ new Map(), pr = Si.keys();
for (let a of pr) {
  let t = Si.get(a), e = T.normalize([], [t.x, t.y]);
  ur.set(a, e);
}
var gr = Object.defineProperty, yr = Object.getOwnPropertyDescriptor, Jt = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? yr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && gr(t, e, r), r;
};
const ci = class ps extends qt {
  constructor() {
    super(), this.isClosed = !1, this.anchors = ps.DefaultAnchors;
  }
  draw(t, e) {
    let i = e.getPoints();
    if (i.length == 0)
      return;
    let s = i[0];
    t.beginPath(), t.moveTo(s.x, s.y);
    for (let n = 1; n < i.length - 1; n++)
      (i[n].x !== s.x || i[n].y !== s.y) && t.lineTo(i[n].x, i[n].y), s = i[n];
    let r = i[i.length - 1];
    t.lineTo(r.x, r.y), t.stroke();
  }
  drawSVG(t, e) {
    let i = "M" + e.getPoints().map((s) => s.x + "," + s.y).join("L");
    t.setAttribute("d", i);
  }
};
ci.DefaultAnchors = /* @__PURE__ */ new Map(), Jt([u("LineShape")], ci.prototype, "className", 2);
let Zt = ci;
const di = class gs extends Zt {
  constructor() {
    super(), this.anchors = gs.DefaultAnchors;
  }
};
di.DefaultAnchors = /* @__PURE__ */ new Map(), Jt([u("AutoFoldShape")], di.prototype, "className", 2);
let ys = di;
const ui = class oe extends Zt {
  constructor() {
    super(), this.anchors = oe.DefaultAnchors, this.isClosed = !1;
  }
  draw(t, e) {
    let i = e.getPoints();
    if (i.length == 0)
      return;
    let s = i[0], r = i[1], n = i[2];
    t.beginPath(), t.moveTo(s.x, s.y), t.quadraticCurveTo(r.x, r.y, n.x, n.y), this.isClosed && t.closePath(), t.stroke();
  }
  drawSVG(t, e) {
    let i = e.getPoints(), s = i[0], r = i[1], n = i[2], o = "M " + s.x + "," + s.y + " Q " + r.x + "," + r.y + " " + n.x + "," + n.y;
    t.setAttribute("d", o), t.setAttribute("fill", "none");
  }
  getIntersect(t, e, i) {
    let s = i.worldToLocalXY(t, e), r = i.getPoints(), n = r[0], o = r[1], l = r[2], h = oe._measureDistance(s.x, s.y, n.x, n.y, o.x, o.y, l.x, l.y), c = i.getPoint(h.t), d = new Vt(c.x, c.y);
    return d.object = i, d.dist = h.dist, d.t = h.t, d.segIndex = 0, d;
  }
  static _measureDistance(t, e, i, s, r, n, o, l) {
    function h(f) {
      const m = me(f, i, r, o), p = me(f, s, n, l), x = Mi(f, i, r, o), w = Mi(f, s, n, l);
      return (m - t) * x + (p - e) * w;
    }
    function c(f) {
      return (h(f + 1e-5) - h(f)) / 1e-5;
    }
    const d = [0, 0.5, 1].map((f) => ts(h, c, f)).filter((f) => f >= 0 && f <= 1);
    let g = 1 / 0, y = 0;
    return d.forEach((f) => {
      const m = $t(me(f, i, r, o), me(f, s, n, l), t, e);
      m < g && (g = m, y = f);
    }), $t(i, s, t, e) < g && (g = $t(i, s, t, e), y = 0), $t(o, l, t, e) < g && (g = $t(o, l, t, e), y = 1), { dist: g, t: y };
  }
  static _calcQuadBezierExtrema(t, e, i) {
    let s = t - 2 * e + i;
    return s === 0 ? null : (t - e) / s;
  }
  static _getQuadBezierExtremas(t, e, i) {
    const s = t.x, r = t.y, n = e.x, o = e.y, l = i.x, h = i.y, c = [];
    let d = oe._calcQuadBezierExtrema(s, n, l);
    return d != null && d > 0 && d < 1 && c.push(d), d = oe._calcQuadBezierExtrema(r, o, h), d != null && d > 0 && d < 1 && c.push(d), c;
  }
};
ui.DefaultAnchors = /* @__PURE__ */ new Map(), Jt([u("QuadraticCurveShape")], ui.prototype, "className", 2);
let ze = ui;
const Se = class pi extends Zt {
  constructor() {
    super(), this.anchors = pi.DefaultAnchors;
  }
  draw(t, e) {
    let i = e.getPoints();
    if (i.length == 0)
      return;
    let s = i[0], r = i[1], n = i[3], o = i[4];
    t.beginPath(), t.moveTo(s.x, s.y), t.bezierCurveTo(r.x, r.y, n.x, n.y, o.x, o.y), this.isClosed && t.closePath(), t.stroke();
  }
  drawSVG(t, e) {
    let i = e.getPoints(), s = i[0], r = i[1], n = i[3], o = i[4], l = "M " + s.x + "," + s.y + " C " + r.x + "," + r.y + " " + n.x + "," + n.y + " " + o.x + "," + o.y;
    t.setAttribute("d", l), t.setAttribute("fill", "none");
  }
  getIntersect(t, e, i) {
    i.worldToLocalXY(t, e);
    let s = i.getPoints(), r = s[0], n = s[1], o = s[3], l = s[4], h = pi._measureDistance(t, e, r.x, r.y, n.x, n.y, o.x, o.y, l.x, l.y), c = i.getPoint(h.t), d = new Vt(c.x, c.y);
    return d.object = i, d.dist = h.dist, d.t = h.t, d.segIndex = 0, d;
  }
  static _measureDistance(t, e, i, s, r, n, o, l, h, c) {
    function d(b, L, I, J, At) {
      const pt = 1 - b;
      return pt * pt * pt * L + 3 * pt * pt * b * I + 3 * pt * b * b * J + b * b * b * At;
    }
    function g(b, L, I, J, At) {
      const pt = 1 - b;
      return 3 * pt * pt * (I - L) + 6 * pt * b * (J - I) + 3 * b * b * (At - J);
    }
    function y(b, L, I, J) {
      return (b - I) * (b - I) + (L - J) * (J - J);
    }
    function f(b) {
      const L = d(b, i, r, o, h), I = d(b, s, n, l, c);
      return (L - t) * g(b, i, r, o, h) + (I - e) * g(b, s, n, l, c);
    }
    function m(b) {
      const L = g(b, i, r, o, h), I = g(b, s, n, l, c);
      return L * L + I * I + f(b);
    }
    const p = [0, 0.25, 0.5, 0.75, 1].map((b) => ts(f, m, b)).filter((b) => b >= 0 && b <= 1);
    let x = 1 / 0, w = 0;
    const k = p.map((b) => {
      const L = d(b, i, r, o, h), I = d(b, s, n, l, c), J = Math.sqrt(y(L, I, t, e));
      return J < x && (x = J, w = b), J;
    });
    return k.push(Math.sqrt(y(i, s, t, e)), Math.sqrt(y(h, c, t, e))), { dist: Math.min(...k), t: w };
  }
  static _getCubicBezierExtremas(t, e, i, s) {
    const r = t.x, n = t.y, o = e.x, l = e.y, h = i.x, c = i.y, d = s.x, g = s.y, y = [], f = (m, p, x) => {
      if (m === 0)
        return;
      const w = p * p - 4 * m * x;
      if (w >= 0) {
        const k = Math.sqrt(w), b = (-p + k) / (2 * m), L = (-p - k) / (2 * m);
        b > 0 && b < 1 && y.push(b), L > 0 && L < 1 && y.push(L);
      }
    };
    return f(3 * (d - 3 * h + 3 * o - r), 6 * (h - 2 * o + r), 3 * (o - r)), f(3 * (g - 3 * c + 3 * l - n), 6 * (c - 2 * l + n), 3 * (l - n)), y;
  }
};
Se.DefaultAnchors = /* @__PURE__ */ new Map(), Jt([u("BezierCurveShape")], Se.prototype, "className", 2), Jt([u(!1)], Se.prototype, "isClosed", 2);
let Ie = Se;
class fs extends Zt {
  constructor() {
    super(), this.isClosed = !1;
  }
  draw(t, e) {
    let i = e.getPoints();
    if (i.length == 0)
      return;
    let s = i[0], r = i[i.length - 1], n = 0.5 * N.distance(s.x, s.y, r.x, r.y), o = 0.5 * (s.x + r.x), l = 0.5 * (s.y + r.y);
    if (t.beginPath(), e && e.direction == rt.anticlockwise) {
      let h = Math.atan2(s.y - r.y, s.x - r.x);
      t.arc(o, l, n, h, h + Math.PI, !0);
    } else {
      let h = Math.atan2(s.y - r.y, s.x - r.x);
      t.arc(o, l, n, h, h + Math.PI, !1);
    }
    this.isClosed && t.closePath(), t.stroke();
  }
  drawSVG(t, e) {
    let i = e.getPoints(), s = i[0], r = i[i.length - 1], n = 0.5 * N.distance(s.x, s.y, r.x, r.y);
    s.x, r.x, s.y, r.y;
    let o = e.direction === rt.anticlockwise ? "0" : "1", l = "M " + s.x + "," + s.y + " A " + n + "," + n + " 0 0 " + o + " " + r.x + "," + r.y;
    t.setAttribute("d", l), t.setAttribute("fill", "none");
  }
  getIntersect(t, e, i) {
    let s = i.worldToLocalXY(t, e), r = i.getPoints(), n = r[0], o = r[r.length - 1], l = i._measureDistance(n, o, s), h = i.getPoint(l.t), c = new Vt(h.x, h.y);
    return c.object = i, c.dist = l.dist, c.t = l.t, c.segIndex = 0, c;
  }
}
function me(a, t, e, i) {
  const s = 1 - a;
  return s * s * t + 2 * s * a * e + a * a * i;
}
function Mi(a, t, e, i) {
  return 2 * (1 - a) * (e - t) + 2 * a * (i - e);
}
Jt([u("ArcShape")], fs.prototype, "className", 2);
class fr {
  constructor() {
    this.anchorProxyList = [];
  }
  toJSON(t, e) {
    let i = e.getPoints();
    return this.anchorProxyList.map((s, r) => {
      if (s.host instanceof S) {
        let o = s.anchor, l = A.getOnLinkPoint(e, s);
        o.remember(l);
      }
      let n = s.toJSON(t);
      if (n.hasOwnProperty("host") && n.host == null) {
        let o = i[0];
        return e.className == q.PathLinkName ? o = i[r] : r > 0 && (o = i[i.length - 1]), { className: X.prototype.className, x: o.x, y: o.y };
      }
      return n;
    });
  }
  set(t) {
    this.anchorProxyList.length = 0;
    for (let e = 0; e < t.length; e++)
      this.anchorProxyList.push(t[e]);
  }
  setBegin(t) {
    this.anchorProxyList[0] = t;
  }
  setEnd(t) {
    if (this.anchorProxyList.length < 2)
      return void (this.anchorProxyList[1] = t);
    let e = this.anchorProxyList.length - 1;
    this.anchorProxyList[e] = t;
  }
  getLength() {
    return this.anchorProxyList.length;
  }
  getBegin() {
    return this.anchorProxyList[0];
  }
  getEnd() {
    let t = this.anchorProxyList.length - 1;
    return this.anchorProxyList[t];
  }
}
var mr = Object.defineProperty, xr = Object.getOwnPropertyDescriptor, Lt = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? xr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && mr(t, e, r), r;
};
class S extends U {
  constructor(t, e, i, s, r) {
    if (super(), this._state = { needPaint: !0, isOutOfViewport: !1, attrDirty: !0, renderIndex: 0, points: [], az: [], invertWorldTransform: Y.allocate() }, this.text = t, this.path = new fr(), e == null) {
      const n = new X(0, 0);
      this.path.anchorProxyList.push(new A(n));
    } else
      this.setBegin(e, s);
    if (i == null) {
      const n = new X(0, 0);
      this.path.anchorProxyList.push(new A(n));
    } else
      this.setEnd(i, r);
    this._obb.aabb = new v(0, 0, 1, 1);
  }
  get begin() {
    return this.path.getBegin();
  }
  get end() {
    return this.path.getEnd();
  }
  get beginOffset() {
    return this._beginOffset;
  }
  set beginOffset(t) {
    this._beginOffset = t, this.markMatrixDirty();
  }
  get endOffset() {
    return this._endOffset;
  }
  set endOffset(t) {
    this._endOffset = t, this.markMatrixDirty();
  }
  getSegmentAnchor(t, e) {
    return new A(new lt(null, t, e), this);
  }
  getAnchor(t) {
    let e = this._shape.getConnectionAnchor(t);
    if (e == null)
      throw new Error("anchor not found:" + t);
    return new A(e, this);
  }
  getSegmentCount() {
    return 1;
  }
  getRect() {
    let t = this._getTotalLineWidth();
    return _t.toAABB(new v(), this._obb.localPoints, t);
  }
  get text() {
    return this.label != null ? this.label.text : this._text;
  }
  set text(t) {
    this.setLabel(t), this._text = t;
  }
  setLabel(t) {
    return t == null && this.label == null ? this : t instanceof _ ? (zi(this, t), t.pointerEnabled = !1, t) : this.label != null && typeof t == "string" ? (this.label.text = t, this) : (function(e, i) {
      if (e.label == null) {
        const s = new dt(i);
        return s.draggable = !1, s.pointerEnabled = !1, s.autoSize = !0, s.setOriginOnLink(0.5), s.setOriginPosition("cb"), zi(e, s), s;
      }
      e.label.text = i, e.label;
    }(this, t), this);
  }
  getLabel() {
    return this.label;
  }
  getBeginArrow() {
    return this.beginArrow;
  }
  setBeginArrow(t) {
    if (!(t instanceof _))
      throw new Error("arrow must be Node");
    let e = this;
    return e.beginArrow != null && e.removeChild(e.beginArrow), e.children.indexOf(t) == -1 && e.addChild(t), t.draggable = !1, e.beginArrow = t, this.markMatrixDirty(), this;
  }
  getEndArrow() {
    return this.endArrow;
  }
  setEndArrow(t) {
    if (!(t instanceof _))
      throw new Error("arrow must be Node");
    let e = this;
    return e.endArrow != null && e.removeChild(e.endArrow), e.children.indexOf(t) == -1 && e.addChild(t), t.draggable = !1, e.endArrow = t, this.markMatrixDirty(), this;
  }
  _getOBBPoints() {
    return this.points = this._updatePoints(), this.points;
  }
  setBegin(t, e) {
    this.markMatrixDirty(), this.begin && this.begin.isDisplayObjectHost() && this.begin.host.removeOutLink(this);
    let i = t instanceof A ? t : Ni(t, e);
    this.path.setBegin(i), i.host instanceof U && i.host.addOutLink(this);
  }
  setEnd(t, e) {
    this.markMatrixDirty(), this.end && this.end.isDisplayObjectHost() && this.end.host.removeInLink(this);
    let i = t instanceof A ? t : Ni(t, e);
    this.path.setEnd(i), i.host instanceof U && i.host.addInLink(this);
  }
  getBeginPoint() {
    return this.points == null && (this.points = this._updatePoints()), this.points[0];
  }
  getEndPoint() {
    return this.points == null && (this.points = this._updatePoints()), this.points[this.points.length - 1];
  }
  _getTotalLineWidth() {
    this._state;
    const t = this._computedStyle;
    let e = 0.5 * (t.lineWidth || 0);
    return e += t.padding || 0, e;
  }
  draw(t) {
    return this.begin == null || this.end == null || (this._computedStyle.applyTo(t), this._shape.draw(t, this)), this;
  }
  _afterStyleComputed() {
  }
  translateWith(t, e) {
    let i = this.path.anchorProxyList;
    for (let s = 0; s < i.length; s++) {
      let r = i[s], n = r.anchor;
      r.host == null && n instanceof X && (n.x += t, n.y += e, this.markMatrixDirty());
    }
    return this;
  }
  _calcAZ() {
    let t = A.getOnLinkPoint(this, this.begin), e = A.getOnLinkPoint(this, this.end), i = this._state.az;
    return i[0] = t, i[1] = e, i;
  }
  _notUpdateYet() {
    console.warn("not yet"), this.points = this._updatePoints();
  }
  _afterUpdateMatrix() {
    this._offsetAndArrowHandle();
  }
  _offsetAndArrowHandle() {
    if (this.beginArrow && this.beginArrow.parent !== this && (this.beginArrow = null), this.endArrow && this.endArrow.parent !== this && (this.endArrow = null), !this._needCalcOffset())
      return;
    let t = { x: this.points[0].x, y: this.points[0].y }, e = { x: this.points[this.points.length - 1].x, y: this.points[this.points.length - 1].y };
    Ii(t, this.beginArrow, this._getBeginVec(), this.beginOffset || 0), Ii(e, this.endArrow, this._getEndVec(), this.endOffset || 0);
    let i = this.points;
    i[0] = t, i[i.length - 1] = e;
  }
  _updatePoints() {
    let t = this._state.points;
    t.length = 0;
    const e = this.path.anchorProxyList;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = A.getOnLinkPoint(this, s);
      t[i] = r;
    }
    return t;
  }
  getPoints() {
    return this.points == null && (this.points = this._updatePoints()), this.points;
  }
  addChild(t) {
    return t.origin == null && (t.origin = [0, 0]), super.addChild(t);
  }
  _getLocalTransform() {
    return this._localTransform;
  }
  _doTransform(t) {
  }
  updateMatrix() {
    this._localTransform.identity(), this._doTransform(this._localTransform), this.parent != null ? Y.multiply(this._worldTransform, this.parent._worldTransform, this._localTransform) : Y.fillFrom(this._worldTransform, this._localTransform.m), Y.invert(this._state.invertWorldTransform, this._worldTransform);
    let t = this._obb;
    t.localPoints = this._getOBBPoints();
    let e = this._worldTransform.points(t.points, t.localPoints), i = this._getTotalLineWidth();
    return _t.toAABB(t.aabb, e, i), this._afterUpdateMatrix(), this;
  }
  getConnectAutoPoint(t) {
    let e = this._shape.getIntersect(t.x, t.y, this);
    return { x: e.x, y: e.y };
  }
  _getAABBWithText() {
    let t = this.getAABB(), e = this.getLabel();
    if (e != null && !e._isTextBlank()) {
      let i = e._getAABBWithText();
      !i.isEmpty() && (t = v.union(t.clone(), i));
    }
    return t;
  }
  _upgradeParent() {
    let t = this.begin.host, e = this.end.host;
    if (t == null || e == null)
      return null;
    let i = ke(t, e);
    return this.parent === i ? null : (this.changeParent(i), i);
  }
  _needCalcOffset() {
    return this.beginOffset != 0 || this.endOffset != 0 || this.beginArrow != null || this.endArrow != null;
  }
  _getBeginVec() {
    let t = this.getPoint(1e-5), e = this.points[0], i = [e.x - t.x, e.y - t.y];
    return T.normalize(i, i);
  }
  _getEndVec() {
    let t = this.getPoint(0.9999999), e = this.points[this.points.length - 1], i = [e.x - t.x, e.y - t.y];
    return T.normalize(i, i);
  }
  _isAlone() {
    return !this.begin.isDisplayObjectHost() && !this.end.isDisplayObjectHost();
  }
  unlinkBegin() {
    this.begin.isDisplayObjectHost() && this.begin.host.removeOutLink(this), this.setBegin(this.getBeginPoint());
  }
  unlinkEnd() {
    this.end.isDisplayObjectHost() && this.end.host.removeInLink(this), this.setEnd(this.getEndPoint());
  }
  unlink() {
    this.unlinkBegin(), this.unlinkEnd(), this.markMatrixDirty();
  }
  removeFromParent() {
    return this.unlink(), super.removeFromParent(), this;
  }
  changeParent(t) {
    if (this.parent === t)
      throw new Error("same parent, dont need change");
    let e = this, i = this;
    function s(r, n, o) {
      let l = r[n];
      l != null && (l = r.localToWorldXY(l.x, l.y), r[n] = o.worldToLocalXY(l.x, l.y));
    }
    if (i.begin.anchor instanceof X && !i.begin.hasHost()) {
      let r = i.localToWorldXY(i.begin.anchor.x, i.begin.anchor.y), n = t.worldToLocalXY(r.x, r.y);
      n = t.worldToLocalXY(r.x, r.y), i.setBegin(n);
    }
    if (i.end.anchor instanceof X && !i.end.hasHost()) {
      let r = i.localToWorldXY(i.end.anchor.x, i.end.anchor.y), n = t.worldToLocalXY(r.x, r.y);
      i.setEnd(n);
    }
    return i.className == q.QuadBezierLink ? s(i, j.ctrlPoint, t) : i.className == q.BezierLink ? (s(i, j.ctrlPoint1, t), s(i, j.ctrlPoint2, t)) : i.className == q.AutoFoldLink && (s(i, q.fold1Offset, t), s(i, q.fold2Offset, t), s(i, q.centerOffset, t)), e.parent && e.parent.removeChild(e), t.addChild(e), this;
  }
  _positionToLocalPoint(t, e, i) {
    let s = this._shape.getConnectionAnchor(t);
    if (s == null)
      throw Error("position not exist:" + t);
    return A.calcPointByAnchor(this, s);
  }
  _toJSON(t) {
    let e = super._toJSON(t);
    if (t != null) {
      let i = t.objIndexMap;
      e.path = this.path.toJSON(i, this), this.label != null && (e.label = i.get(this.label)), this.beginArrow != null && (e.beginArrow = i.get(this.beginArrow)), this.endArrow != null && (e.endArrow = i.get(this.endArrow));
    }
    return e;
  }
  _afterJson(t, e) {
    if (t.label != null) {
      let s = e.get(t.label);
      this.label = s;
    }
    if (t.beginArrow != null) {
      let s = e.get(t.beginArrow);
      this.setBeginArrow(s);
    }
    if (t.endArrow != null) {
      let s = e.get(t.endArrow);
      this.setEndArrow(s);
    }
    let i = t.path.map((s) => A.fromJSON(s, e));
    this._setProxies(i);
  }
  _setProxies(t) {
    this.path.set(t);
    let e = this.path.getBegin();
    e.isDisplayObjectHost() && e.host.addOutLink(this), e = this.path.getEnd(), e.isDisplayObjectHost() && e.host.addInLink(this);
    for (let i = 1; i < t.length - 1; i++)
      e = t[i], e.isDisplayObjectHost() && e.host.addInLink(this);
  }
  hitTest(t, e) {
    if (this._preHitTest(t, e))
      return !0;
    let i = this._getAABBWithText(), s = this.getComputedStyle().lineWidth || 0, r = Math.max(0.5 * s, this._pickPrecision);
    if (!i.contains(t, e, r))
      return !1;
    let n = this._obb.points, o = xi(t, e, n);
    return o.dist != null && o.dist < r;
  }
  _preHitTest(t, e) {
    return this.endArrow != null && this.endArrow.hitTest(t, e) == 1 || this.beginArrow != null && this.beginArrow.hitTest(t, e) == 1 || this.label != null && this.label.hitTest(t, e) == 1;
  }
  getInLinks() {
    return this.inLinks;
  }
  getOutLinks() {
    return this.outLinks;
  }
  destroy() {
    super.destroy(), this.unlinkBegin(), this.unlinkEnd(), this.beginArrow = null, this.endArrow = null, this.label = null, this._shape = null, this.points = null;
  }
}
function zi(a, t) {
  return a.label != null && a.removeChild(a.label), a.label = t, a.children.indexOf(a.label) == -1 && a.addChild(a.label), t.setOriginOnLink(0.5), t;
}
function ke(a, t) {
  return a.parent === t.parent ? a.parent : a.deep == t.deep ? ke(a.parent, t.parent) : a.deep > t.deep ? ke(a.parent, t) : ke(a, t.parent);
}
function Ii(a, t, e, i) {
  let s = t ? t.width : 0;
  if (i != 0 || s != 0) {
    let r = T.scale([], e, -i - s);
    a.x += r[0], a.y += r[1];
  }
  if (s > 0) {
    let r = T.scale([], e, 0.5 * s);
    t.setXY(a.x + r[0], a.y + r[1]), t.rotate(Math.atan2(e[1], e[0]));
  }
}
function Ni(a, t) {
  if (a instanceof $)
    return new A(a);
  if (a instanceof _ || a instanceof S)
    return a.getAnchor(t || "center");
  if (N.isLikePoint(a)) {
    let e = a;
    return new A(new X(e.x, e.y));
  }
  throw console.warn("unknow linkTarget type:", a), new Error("unknow linkTarget type");
}
Lt([u("Link")], S.prototype, "className", 2), Lt([u(3)], S.prototype, "_pickPrecision", 2), Lt([u(new Zt())], S.prototype, "_shape", 2), Lt([u(wi.Link)], S.prototype, "declare_zIndex", 2), Lt([u(!0)], S.prototype, "isLink", 2), Lt([u(["className", "isLink"])], S.prototype, "_allwaysSerializers", 2), Lt([u(U.prototype._serializers.concat(["beginOffset", "endOffset"]))], S.prototype, "_serializers", 2);
class A {
  getName() {
    return this.anchor.name;
  }
  setName(t) {
    this.anchor.name = t;
  }
  constructor(t, e) {
    this.anchor = t, this.host = e;
  }
  isDisplayObjectHost() {
    return this.host instanceof U;
  }
  toPoint() {
    return A.calcPointByAnchor(this.host, this.anchor);
  }
  hasHost() {
    return this.host != null;
  }
  isNodeHost() {
    return this.host instanceof _;
  }
  equals(t) {
    return this.anchor === t.anchor && this.host === t.host;
  }
  static calcPointByAnchor(t, e) {
    if (t instanceof _)
      return A.getPointOnNodeHost(t, e);
    if (t instanceof S)
      return A.getPointOnLinkHost(t, e);
    if (t == null && e instanceof X)
      return { x: e.x, y: e.y };
    throw console.error("unknow host or anchor:", t, e), new Error("unknow host or anchor");
  }
  static getPointOnNodeHost(t, e) {
    if (e instanceof kt) {
      let i = t._state.shapeSize;
      return { x: e.x * i.width * 0.5, y: e.y * i.height * 0.5 };
    }
    if (e instanceof G)
      return t._positionToLocalPoint(e.name);
    if (e instanceof X)
      return t.getWorldTransform().pointXY(e.x, e.y);
    if (e instanceof lt)
      return t.getLocalPoint(e.t, e.segIndex);
    if (e instanceof K)
      return C.getFunction(e.name)(t);
    throw new Error("unknow anchor type:" + e);
  }
  static getPointOnLinkHost(t, e) {
    let i = e.takePoint();
    if (i != null)
      return i;
    if (e instanceof kt)
      throw new Error("NDC坐标不能用于Link");
    if (e instanceof G)
      throw new Error("方位坐标不能用于Link");
    if (e instanceof lt)
      return t.getLocalPoint(e.t, e.segIndex);
    if (e instanceof X)
      return { x: e.x, y: e.y };
    if (e instanceof K)
      return C.getFunction(e.name)(t);
    throw new Error("unknow anchor type:" + e);
  }
  static getOnLinkPoint(t, e) {
    let i = t.begin == e ? t.end : t.begin, s = e.anchor, r = e.host, n = s.takePoint();
    if (n != null)
      return n;
    if (s instanceof K)
      n = C.getFunction(s.name)(r);
    else if (s instanceof lt || s instanceof kt || s instanceof G) {
      let o = e.toPoint();
      n = A.toLinkLocalPoint(t, e.host, o);
    } else
      s instanceof X ? (n = { x: s.x, y: s.y }, r != null && (n = A.toLinkLocalPoint(t, e.host, n))) : s instanceof de && (n = A.getAutoPointOnLink(t, e, i), n = t._state.invertWorldTransform.point(n));
    return n;
  }
  static getAutoPointOnLink(t, e, i) {
    const s = e.host;
    let r;
    if (i.anchor instanceof de) {
      const n = i.host;
      r = { x: n._obb.aabb.center, y: n._obb.aabb.middle };
    } else
      r = A.getOnLinkPoint(t, i);
    return s.getConnectAutoPoint(r);
  }
  static toLinkLocalPoint(t, e, i) {
    if (e.parent === t.parent)
      i = e._getLocalTransform().point(i);
    else {
      let s = e.getWorldTransform().point(i);
      i = t._state.invertWorldTransform.point(s);
    }
    return i;
  }
  toJSON(t) {
    let e = this.anchor.toJSON();
    if (this.host == null)
      delete e.host;
    else if (t != null && this.isDisplayObjectHost()) {
      let i = t.get(this.host);
      e.host = i;
    }
    return e;
  }
  static fromJSON(t, e) {
    let i = C.newInstance(t.className);
    Object.assign(i, t);
    let s = new A(i);
    if (e != null && typeof t.host == "number") {
      let r = e.get(t.host);
      s.host = r;
    }
    return s;
  }
}
var br = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, Pt = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? wr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && br(t, e, r), r;
};
class _ extends U {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(), this._state = { needPaint: !0, isOutOfViewport: !1, attrDirty: !0, textDirty: !1, textWidth: 0, textHeight: 0, textArr: null, textLineHeight: 0, textPositionCache: { x: 0, y: 0 }, hasBorder: !1, hasBackgroundColor: !1, shapeSize: { width: 1, height: 1 }, renderIndex: 0 }, this.originPosition = "center", t != null && (this.text = t), this._x = e || 0, this._y = i || 0, this._width = s || 0, this._height = r || 0, this._obb.aabb = new v(this._x - 0.5 * this._width, this._y - 0.5 * this._height, this._width, this._height);
  }
  get text() {
    return this._text;
  }
  set text(t) {
    this.setText(t);
  }
  _getShapeSize() {
    return this._state.shapeSize;
  }
  getPointAnchor(t, e) {
    return new A(new X(t, e), this);
  }
  getSegmentAnchor(t, e) {
    return new A(new lt(null, t, e), this);
  }
  getAnchor(t) {
    let e = this._shape.getConnectionAnchor(t);
    if (e == null)
      throw new Error("anchor not found:" + t);
    return new A(e, this);
  }
  setOriginOnLink(t, e = null) {
    return this.origin == null ? this.origin = [e, t] : (this.origin[0] = e, this.origin[1] = t), this.markMatrixDirty(), this;
  }
  _getOBBPoints() {
    this._updateShapeSize();
    let t = 0.5 * this.width, e = 0.5 * this.height, i = -t, s = -e;
    return [{ x: i, y: s }, { x: t, y: s }, { x: t, y: e }, { x: i, y: e }];
  }
  _afterStyleComputed() {
    const t = this._computedStyle, e = this._state;
    e.hasBackgroundColor = t.backgroundColor != null, e.hasBorder = t.borderWidth > 0;
  }
  _afterUpdateMatrix() {
    (this._matrixDirty || this._state.textDirty || this._computedStyle._textDirty) && (this._updateText(), this._state.textDirty && (this._state.textDirty = !1, this.updateMatrix()), this._state.textDirty = !1, this._computedStyle._textDirty = !1);
  }
  _calcOriginInParentLink() {
    const t = this.parent;
    if (this === t.beginArrow || this === t.endArrow)
      return [0, 0];
    let e = this.origin[0], i = this.origin[1], s = t.getPoint(i, e);
    return [s.x, s.y];
  }
  _getRotationOnParentLink() {
    const t = this.parent;
    if (t == null || t.deep < Tt.MinDeep || t.isNode || !this.rotateWithParent)
      return 0;
    let e = t;
    if (this === e.beginArrow || this === e.endArrow)
      return 0;
    let i = this.origin[0], s = this.origin[1];
    return t.getK(s, i);
  }
  _doTransform(t) {
    const e = this;
    if (e.isLink)
      throw new Error("link no transform");
    let i = e.rotation, s = e.x, r = e.y;
    if (e.parent) {
      if (e.parent.isLink) {
        i += e._getRotationOnParentLink();
        let o = e._calcOriginInParentLink();
        s = o[0] + e.x, r = o[1] + e.y;
      } else if (e.parent.isNode && this.originPosition != Yt.center) {
        let o = this._positionToLocalPoint(this.originPosition);
        s += o.x, r += o.y;
      }
    }
    if (e.originPosition == Yt.center)
      return t.rotate(i), void t.transform(e.scaleX, e.skewX, e.skewY, e.scaleY, s, r);
    let n = e._positionToLocalPoint(e.originPosition);
    t.rotateByXY(n.x, n.y, i), t.transform(e.scaleX, e.skewX, e.skewY, e.scaleY, s, r);
  }
  _updateShapeSize() {
    const t = this._computedStyle;
    let e = 2 * (t.borderWidth || 0) + (2 * (t.padding || 0) + (t.lineWidth || 0));
    const i = Math.max(0, this.width - e), s = Math.max(0, this.height - e);
    this._state.shapeSize.width = i, this._state.shapeSize.height = s;
  }
  _localToNormal(t, e) {
    let i = this._state.shapeSize;
    return { x: t / Math.max(0.5 * i.width, 1), y: e / Math.max(0.5 * i.height, 1) };
  }
  setText(t) {
    if (t != this._text && (this._state.textDirty = !0, this.markMatrixDirty()), t == null)
      return this._text = t, void (this._state.textArr = null);
    if (typeof t == "number" && (t = "" + t), t.indexOf(`
`) != -1) {
      let e = t.split(`
`);
      this._state.textArr = e;
    } else
      this._state.textArr = null;
    this._text = t;
  }
  _calcTextSize() {
    let t, e = this._state.textArr == null ? 1 : this._state.textArr.length, i = this._computedStyle.font;
    i == null && (i = this.ownerLayer ? this.ownerLayer.stage.styleSystem.currentTheme.getStyle("DefaultConfig").font : Mt.DefaultFont), t = e == 1 ? xt.measureText(this._text, this._computedStyle, e, i) : xt.measureText(this._state.textArr, this._computedStyle, e, i), this._state.textWidth = t.width, this._state.textHeight = t.height, this._state.textLineHeight = t.lineHeight;
  }
  _drawBackgroundOrBorder(t) {
    const e = this._computedStyle, i = this._state;
    let s = e.borderWidth || 0, r = 0.5 * -this.width + 0.5 * s, n = 0.5 * -this.height + 0.5 * s, o = this.width - s, l = this.height - s, h = e.borderRadius || 0;
    t.save(), t.beginPath(), h == 0 ? t.rect(r, n, o, l) : t.roundRect(r, n, o, l, h), i.hasBackgroundColor && (t.fillStyle = e.backgroundColor, t.fill()), i.hasBorder && (e.padding == null || e.padding == 0 ? t.lineWidth = s + 0.5 : t.lineWidth = s, t.strokeStyle = e.borderColor || "black", (e.borderStyle == "dashed" || e.borderStyle == "dotted") && t.setLineDash([1, 1]), t.stroke()), t.closePath(), t.restore();
  }
  _strokeAndFill(t) {
    let e = this._state;
    t.save(), (e.hasBorder || e.hasBackgroundColor) && this._drawBackgroundOrBorder(t), this._shape.draw(t, this), t.restore();
  }
  draw(t) {
    this._computedStyle.applyTo(t), this._strokeAndFill(t), this._paintText(t);
  }
  _updateText() {
    this._calcTextSize(), this._calcTextPosition();
  }
  _calcTextPosition(t = 0, e = 0) {
    let i = this._computedStyle, s = null;
    if (i.textPosition != null) {
      let l = Si.get(i.textPosition);
      s = { x: l.x * this.width * 0.5, y: l.y * this.height * 0.5 };
    } else
      s = { x: 0, y: 0.5 * this.height };
    let r = 0, n = 0.5 * -(this._state.textHeight - this._state.textLineHeight), o = t + e + 0.5 * i.lineWidth;
    return i.textAlign == "left" ? r = o : i.textAlign == "right" && (r = -o), i.textBaseline == "top" ? n = o : i.textBaseline == "bottom" && (n = -o - this._state.textHeight + this._state.textLineHeight), s.x += r, s.y += n, i.textOffsetX != null && (s.x += i.textOffsetX), i.textOffsetY != null && (s.y += i.textOffsetY), this._state.textPositionCache = s, s;
  }
  _paintText(t) {
    if (this._isTextBlank() || t.isSVGRenderer === !0)
      return;
    let e = this._text, i = this._computedStyle, s = this._state.textPositionCache, r = this._state.textArr;
    if (t.fillStyle = i.color || "black", this.textRotation == 0)
      if (r == null)
        t.fillText(e, s.x, s.y);
      else {
        let n = this._state.textLineHeight;
        for (let o = 0; o < r.length; o++)
          t.fillText(r[o], s.x, s.y + o * n);
      }
    else {
      if (t.translate(s.x, s.y), t.rotate(this.textRotation), r == null)
        t.fillText(e, 0, 0);
      else {
        let n = this._state.textLineHeight;
        for (let o = 0; o < r.length; o++)
          t.fillText(r[o], 0, 0 + o * n);
      }
      t.rotate(-this.text), t.translate(-s.x, -s.y);
    }
  }
  getConnectAutoPoint(t) {
    return this._shape.getConnectAutoPoint(t.x, t.y, this);
  }
  setOriginPosition(t) {
    return this.originPosition = t, this;
  }
  translateWith(t, e) {
    return this.x += t, this.y += e, this;
  }
  translateTo(t, e) {
    return this.x = t, this.y = e, this;
  }
  translate(t, e) {
    return this.x = t, this.y = e, this;
  }
  setXY(t, e) {
    return this.x = t, this.y = e, this;
  }
  resize(t, e) {
    return this.width = t, this.height = e, this;
  }
  setSize(t, e) {
    return this.width = t, this.height = e, this;
  }
  skew(t, e) {
    return this.skewX = t, this.skewY = e, this;
  }
  resizeWith(t, e) {
    return this.width += t, this.height += e, this.width < 0 && (this.width = 0), this.height < 0 && (this.height = 0), this;
  }
  scaleBy(t, e) {
    return this.scaleX *= t, this.scaleY *= e, this;
  }
  scale(t, e) {
    return this.scaleX = t, this.scaleY = e, this;
  }
  rotate(t) {
    return this.rotation = t, this;
  }
  rotateWith(t) {
    return this.rotation += t, this;
  }
  getRect() {
    return new v(this.x - 0.5 * this.width, this.y - 0.5 * this.height, this.width, this.height);
  }
  changeParent(t) {
    if (this.parent === t)
      return this;
    this._matrixDirty && this.updateMatrix(), t._matrixDirty && t.updateMatrix();
    let e = this.localToWorldXY(0, 0), i = t.worldToLocalXY(e.x, e.y);
    return this.parent && this.parent.removeChild(this), this.setXY(i.x, i.y), t.addChild(this), this;
  }
  _positionToLocalPoint(t) {
    let e = ri[t];
    if (e == null)
      throw Error("position not exist:" + t);
    return { x: e[0] * this.width * 0.5, y: e[1] * this.height * 0.5 };
  }
  _toJSON(t) {
    let e = super._toJSON(t);
    if (t != null) {
      let i = t.shapeIndexMap;
      if (this._shape != null) {
        let s = i.get(this._shape);
        s != null && (e.shape = s);
      }
    }
    return e;
  }
  hitTest(t, e) {
    return !this._isTextBlank() && this._getTextAABB().contains(t, e) ? !0 : !!this.getAABB().contains(t, e) && H.isPointInPolygon({ x: t, y: e }, this._obb.points);
  }
  _isTextBlank() {
    return this.text == null || this.text == "";
  }
  _getTextRect() {
    if (this._isTextBlank())
      return new v(0, 0, 0, 0);
    let t = this, e = t.getComputedStyle(), i = t._state.textPositionCache, s = t._state.textArr == null ? 1 : t._state.textArr.length, r = new v(i.x, i.y, t._state.textWidth, t._state.textHeight), n = e.textAlign, o = e.textBaseline;
    return n === "left" ? r.x = i.x + 0.5 * r.width : n === "right" && (r.x = i.x - 0.5 * r.width), o === "top" ? r.y = i.y + 0.5 * r.height : o === "bottom" ? s > 1 ? r.y += 0.5 * r.height - this._state.textLineHeight : r.y = i.y - 0.5 * r.height : s > 1 && (r.y += 0.5 * r.height - 0.5 * this._state.textLineHeight), r.x -= 0.5 * r.width, r.y -= 0.5 * r.height, r;
  }
  _getTextAABB() {
    let t = this._getTextRect();
    if (t.isEmpty())
      return t;
    let e = this.getWorldTransform(), i = t.toPoints(), s = e.points(i, i);
    return _t.toAABB(t, s);
  }
  _getAABBWithText() {
    let t = this.getAABB(), e = null;
    return !this._isTextBlank() && (e = this._getTextAABB(), !e.isEmpty() && (t = v.union(e, t))), t;
  }
  destroy() {
    super.destroy(), this._shape = null, this._text = null, this._state = null;
  }
}
Pt([u("Node")], _.prototype, "className", 2), Pt([u(!0)], _.prototype, "rotateWithParent", 2), Pt([u(null)], _.prototype, "_text", 2), Pt([u(!0)], _.prototype, "isNode", 2), Pt([u(wi.Node)], _.prototype, "_zIndex", 2), Pt([u(0)], _.prototype, "textRotation", 2), Pt([u(U.prototype._serializers.concat(["text", "x", "y", "width", "height", "skewX", "skewY", "scaleX", "scaleY", "rotation", "textOffsetX", "textOffsetY", "textRotation", "originPosition", "rotateWithParent"]))], _.prototype, "_serializers", 2);
var _r = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, ji = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? vr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && _r(t, e, r), r;
};
class dt extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1, n = !0) {
    super(t, e, i, s, r), this._autoDirection = !0, this._autoSize = !0, this.autoSize = n;
  }
  get autoSize() {
    return this._autoSize;
  }
  set autoSize(t) {
    this._autoSize = t;
  }
  get autoDirection() {
    return this._autoDirection;
  }
  set autoDirection(t) {
    this._autoDirection !== t && (this._autoDirection = t, this._updateText());
  }
  updateMatrix() {
    const t = this;
    if (t.autoDirection == 1) {
      let e = t._getRotationOnParentLink();
      e < -Math.PI / 2 || e > Math.PI / 2 ? t.rotation !== Math.PI && (t.rotation = Math.PI) : t.rotation !== 0 && (t.rotation = 0);
    }
    return super.updateMatrix(), this;
  }
  _updateText() {
    this._calcTextSize(), this._autoSize && this.resizeToFitText(), this._calcTextPosition();
  }
  resizeToFitText() {
    let t = this._computedStyle.computePadding();
    this.width = this._state.textWidth + t, this.height = this._state.textHeight + t;
    let e = this._getOBBPoints(), i = this._worldTransform.points([], e), s = this._obb;
    return s.points = i, s.aabb = _t.toAABB(s.aabb, i), this;
  }
  _calcTextPosition() {
    const t = this._computedStyle;
    let e = t.borderWidth || 0, i = (t.padding || 0) + (0 | t.lineWidth);
    return (t.textBaseline != "bottom" || t.textPosition != "lt" && t.textPosition != "ct" && t.textPosition != "rt") && (t.textBaseline != "top" || t.textPosition != "lb" && t.textPosition != "cb" && t.textPosition != "rb") && (t.textAlign != "right" || t.textPosition != "lt" && t.textPosition != "lm" && t.textPosition != "lb") ? t.textAlign == "left" && (t.textPosition == "rt" || t.textPosition == "rm" || t.textPosition == "rb") && (e = 0, i = 0) : (e = 0, i = 0), super._calcTextPosition(e, i);
  }
}
ji([u("TextNode")], dt.prototype, "className", 2), ji([u(_.prototype._serializers.concat(["autoSize", "autoDirection"]))], dt.prototype, "_serializers", 2);
class Sr {
  constructor(t, e) {
    this.stage = t, this.animationSystem = e;
  }
  flash(t, e = {}) {
    let i = e.times || 3, s = e.duration || 100, r = this.animationSystem, n = t.style.globalAlpha, o = r.anime({ from: [0], to: [1], update: (l) => {
      t.setStyle("globalAlpha", l[0]);
    }, times: i, effect: "easeOutBounce", duration: s });
    return o.onEnd = () => {
      t.setStyle("globalAlpha", n);
    }, o;
  }
  flow(t, e = {}) {
    let i = e.lineDash || t.style.lineDash || [3, 2], s = e.direction || rt.clockwise, r = e.duration || 1e4, n = e.distance || 300, o = s == rt.clockwise ? 1 : -1, l = this.animationSystem;
    t.setStyle("lineDash", i);
    let h = l.anime({ from: 0, to: n, update: (c) => {
      t.setStyle("lineDashOffset", -c * o);
    }, times: 1 / 0, duration: r });
    return h.onEnd = () => {
      t.setStyle("lineDashOffset", 0);
    }, h;
  }
  linkMark(t, e = { color: "red" }) {
    let i = e.text || "❌️", s = new dt(i, 0, 0);
    return s.type = "EffectNode", s.draggable = !1, s.setStyles({ textPosition: Yt.center, textBaseline: it.middle, textAlign: et.center, color: e.color || "red" }), e.font != null && s.setStyles({ font: e.font }), s.setOriginOnLink(0.5), t.addChild(s), s;
  }
}
const Ce = { paintAABB: !1, debugInfo: null, build: "11:27:44 AM" };
class kr {
  constructor(t) {
    this._debug = Ce, this.numberFixed = 0, this.stage = t;
  }
  init() {
    const t = document.createElement("div");
    t.style.position = "absolute", t.style.top = "40px", t.classList.add("jtopo_debugPanel"), this.stage.uiContainer.appendChild(t), this.domElement = t, this.hide();
  }
  start(t = 24) {
    const e = this, i = this.stage;
    this._timer = setInterval(function() {
      let s = i.inputSystem;
      if (s.isIdle)
        return;
      let r = i.viewLayers, n = 0, o = 0, l = 0;
      for (let y = 0; y < r.length; y++) {
        let f = r[y];
        n += f._renderState.renderSet.size, o += f.getAllNodes().length, l += f.getAllLinks().length;
      }
      let h = Math.ceil(s.x), c = Math.ceil(s.y);
      const d = i.inputSystem.target;
      let g = "<li>Mouse-Stage( x: " + h + " y: " + c + ")</li>";
      if (s.xInWorld != null && (g += "<li>Mouse-World( x: " + s.xInWorld.toFixed(2) + " y: " + s.yInWorld.toFixed(2) + ")</li>"), g += "<li>Nodes: " + o + "</li>", g += "<li>Links: " + l + "</li>", g += "<li>Total: " + (o + l) + "</li>", g += "<li>Painted: " + n + "</li>", d) {
        const y = d._obb.aabb, f = d.localToWorldXY(0, 0), m = this.stage.camera.toScreenXY(f.x, f.y), p = this.numberFixed;
        g += "<li>_aabb:[x:" + y.x.toFixed(p) + ",y: " + y.y.toFixed(p) + ",w: " + y.width.toFixed(p) + ", h:" + y.height.toFixed(p) + "] </li>", d.origin != null && (g += "<li>Origin: [" + d.origin[0].toFixed(p) + ", " + d.origin[1].toFixed(p) + "]</li>"), g += "<li>&nbsp;&nbsp;-Stage: (x: " + m.x.toFixed(p) + ", y: " + m.y.toFixed(p) + ") </li>", d instanceof _ && (g += "<li>&nbsp;&nbsp;-Parent: (x: " + d.x.toFixed(p) + ", y: " + d.y.toFixed(p) + ") </li>"), g += "<li>&nbsp;&nbsp;-Layer:  (x: " + f.x.toFixed(p) + ", y: " + f.y.toFixed(p) + ") </li>";
      }
      Ce.debugInfo && (g += "<li>" + Ce.debugInfo + "</li>"), e.setContent(g);
    }, t);
  }
  setContent(t) {
    this.domElement.innerHTML = t;
  }
  checkDom() {
    this.domElement == null && this.init();
  }
  hide() {
    return this.checkDom(), clearInterval(this._timer), this.domElement.style.display = "none", this;
  }
  show(t) {
    return this.checkDom(), this.domElement.style.display = "block", this.start(t), this;
  }
}
const ms = class xs {
  getNodes(t) {
    return t.vertexes.map((e) => e.object);
  }
  getLinks(t) {
    return t.edges.map((e) => e.object);
  }
  objectsToGraphs(t) {
    const e = t.filter((o) => o instanceof _);
    let i = t.filter((o) => o instanceof S);
    i.filter((o) => o.begin.isNodeHost() && o.end.isNodeHost());
    const s = /* @__PURE__ */ new WeakMap(), r = e.map((o) => {
      const l = new ce();
      return l.object = o, s.set(o, l), l;
    });
    i.filter((o) => s.get(o.begin.host) && s.get(o.end.host));
    const n = i.map((o) => {
      let l = s.get(o.begin.host), h = s.get(o.end.host), c = new es(l, h);
      return c.object = o, c;
    });
    return this.toGraphs(r, n);
  }
  toGraphs(t, e) {
    let i = [];
    t.forEach((n) => {
      let o = n.inputs, l = n.outputs;
      i = i.concat(o), i = i.concat(l);
    });
    let s = [], r = /* @__PURE__ */ new Set();
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      if (r.has(o))
        continue;
      let l = [], h = [];
      this.travelVertext(o, l, h, r);
      let c = new Re(l, h);
      s.push(c);
    }
    return s;
  }
  travelVertext(t, e = [], i = [], s = /* @__PURE__ */ new Set()) {
    if (s.has(t))
      return;
    e.push(t), s.add(t);
    let r = t.inputs.filter((l) => !s.has(l)), n = t.outputs.filter((l) => !s.has(l));
    r.forEach((l) => {
      i.push(l), s.add(l);
    }), n.forEach((l) => {
      i.push(l), s.add(l);
    });
    let o = this;
    r.forEach((l) => {
      o.travelVertext(l.from, e, i, s);
    }), n.forEach((l) => {
      o.travelVertext(l.to, e, i, s);
    });
  }
  toTree(t) {
    !t.isTree() && (t = xs.createMinimalSpanningTree(t));
    let e = t.vertexes.filter((o) => o.getInDegree() == 0)[0].object, i = t.vertexes.map((o) => o.object), s = t.edges.map((o) => o.object);
    const r = /* @__PURE__ */ new WeakMap();
    let n = new Ht();
    return n.fromObject(e), r.set(e, n), i.forEach((o) => {
      if (o === e)
        return;
      const l = new Ht();
      l.fromObject(o), r.set(o, l);
    }), s.forEach((o) => {
      let l = r.get(o.begin.host), h = r.get(o.end.host);
      l.addChild(h);
    }), new Ms(n);
  }
};
ms.createMinimalSpanningTree = function(a) {
  let t = [], e = [], i = a.edges.sort((r, n) => {
    let o = r.weight - n.weight;
    return o == 0 && (o = r.from.getInDegree() - n.from.getInDegree(), o == 0 && (o = n.to.getOutDegree() - r.to.getOutDegree())), o;
  }), s = /* @__PURE__ */ new WeakMap();
  for (let r = 0; r < i.length; r++) {
    const n = i[r];
    let o = n.from, l = n.to, h = s.get(o), c = s.get(l);
    if (h != null && c != null)
      continue;
    h == null && (h = new ce(), h.object = o.object, t.push(h), s.set(o, h)), c == null && (c = new ce(), c.object = l.object, t.push(c), s.set(l, c));
    let d = new es(h, c);
    d.object = n.object, e.push(d);
  }
  return new Re(t, e);
};
let gi = ms;
var Cr = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor;
class Ne extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r);
  }
  _strokeAndFill(t) {
    let e = this._state;
    if (t.save(), (e.hasBorder || e.hasBackgroundColor) && this._drawBackgroundOrBorder(t), this.canvas != null) {
      let i = this._state.shapeSize;
      (this.canvas.width != i.width || this.canvas.height != i.height) && this.onSizeChanged(i.width, i.height), t.drawImage(this.canvas, 0.5 * -i.width, 0.5 * -i.height, i.width, i.height);
    }
    t.restore();
  }
  setCanvas(t) {
    this.canvas = t;
  }
  onSizeChanged(t, e) {
    this.canvas != null && (this.canvas.width = t, this.canvas.height = e);
  }
}
((a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Ar(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  i && r && Cr(t, e, r);
})([u("CanvasNode")], Ne.prototype, "className", 2);
var Lr = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, Bi = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Pr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Lr(t, e, r), r;
};
class je extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r), this._width = s, this._height = r;
  }
  setRadius(t = 1) {
    this.width = 2 * t, this.height = 2 * t;
  }
  getLocalPoint(t, e = 0) {
    if (this._state.hasBorder)
      return super.getLocalPoint(t, 0);
    let i = t * (2 * Math.PI), s = this._state.shapeSize;
    return { x: 0.5 * s.width * Math.cos(i), y: 0.5 * s.height * Math.sin(i) };
  }
  set radius(t) {
    this.width = 2 * t, this.height = 2 * t;
  }
  get radius() {
    return 0.5 * Math.max(this.width, this.height);
  }
}
Bi([u("EllipseNode")], je.prototype, "className", 2), Bi([u(Fe.getShape("Ellipse"))], je.prototype, "_shape", 2);
var Or = Object.defineProperty, Tr = Object.getOwnPropertyDescriptor, Ve = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Tr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Or(t, e, r), r;
};
class Xt extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r), this._htmlChanged = !1;
  }
  _strokeAndFill(t) {
    let e = this.ownerLayer;
    if (e && e.rendererType === "svg")
      return t.save(), t.fillStyle = "rgba(128,128,128,0.3)", t.strokeStyle = "rgba(128,128,128,0.3)", t.rect(0.5 * -this.width, 0.5 * -this.height, this.width, this.height), t.stroke(), t.textBaseline = "middle", t.textAlign = "center", t.font = "12px sans-serif", t.fillText(this.exportPlaceholderText, 0, 0), void t.restore();
    this._htmlChanged && this._updateImage();
    let i = this._state;
    t.save(), (i.hasBorder || i.hasBackgroundColor) && this._drawBackgroundOrBorder(t), this.imageObject != null && this._drawImage(t, this.imageObject), t.restore();
  }
  _drawImage(t, e) {
    if (!he.isImageValid(e))
      return t.save(), t.fillStyle = "rgba(128,128,128,0.3)", t.strokeStyle = "rgba(128,128,128,0.3)", t.rect(0.5 * -this.width, 0.5 * -this.height, this.width, this.height), t.stroke(), t.textBaseline = "middle", t.textAlign = "center", t.font = "10px sans-serif", t.fillText(this.exportPlaceholderText, 0, 0), void t.restore();
    let i = this._state.shapeSize;
    t.drawImage(e, 0.5 * -i.width, 0.5 * -i.height, i.width, i.height);
  }
  setHtml(t) {
    if (t === this._html)
      return;
    this._html = t, this._htmlChanged = !0;
    let e = this.ownerLayer;
    this.imageObject == null && e && e.rendererType === "canvas" && this._updateImage();
  }
  setDom(t) {
    this._domElement !== t && (this._domElement = t, this._htmlChanged = !0, this._html = t.outerHTML);
  }
  getDom() {
    return this._domElement;
  }
  _updateImage() {
    if (this._htmlChanged = !1, this.imageObject == null) {
      let i = new Image();
      this.imageObject = i;
    }
    let t = this._state.shapeSize, e = he.svgToImageBase64(this._html, t.width, t.height);
    this.imageObject.onload = () => {
      this.markMatrixDirty();
    }, this.imageObject.src = e;
  }
  _afterUpdateMatrix() {
    super._afterUpdateMatrix(), this.imageObject;
  }
  get html() {
    return this._html;
  }
  set html(t) {
    t !== this._html && this.setHtml(t);
  }
}
Ve([u("HtmlNode")], Xt.prototype, "className", 2), Ve([u(_.prototype._serializers.concat(["html"]))], Xt.prototype, "_serializers", 2), Ve([u("HTML")], Xt.prototype, "exportPlaceholderText", 2);
var Er = Object.defineProperty, Dr = Object.getOwnPropertyDescriptor;
class zt extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r);
  }
  get image() {
    return this._imgRaw;
  }
  set image(t) {
    this._imgRaw = t, this.setImage(t);
  }
  get imageSrc() {
    return this._imageSrc;
  }
  set imageSrc(t) {
    this.setImage(t), this._imageSrc = t;
  }
  _strokeAndFill(t) {
    let e = this._state;
    t.save(), (e.hasBorder || e.hasBackgroundColor) && this._drawBackgroundOrBorder(t), this.imageObject != null && this._drawImage(t, this.imageObject), t.restore();
  }
  _drawImage(t, e) {
    let i = this._state.shapeSize;
    t.drawImage(e, 0.5 * -i.width, 0.5 * -i.height, i.width, i.height);
  }
  setImage(t, e = !1) {
    st.cancelLoadByObject(this), this._imgRaw = t;
    let i = this;
    return typeof t == "string" && (t = t.trim()), new Promise((s, r) => {
      (t == null || t == "") && (this._imageSrc = null, this.imageObject = null, i.style.dirty = !0, s(null)), typeof t == "string" ? st.loadImageWithObj(this, t, function(n) {
        n != null ? (i._onImageLoaded(n, e), s(i.imageObject)) : s(null);
      }) : t instanceof HTMLImageElement && (i._onImageLoaded(t, e), s(t));
    });
  }
  _onImageLoaded(t, e = !1) {
    this._imageSrc = t.getAttribute("src"), this.imageObject = t, e == 1 && this.resize(t.width, t.height), this.style.dirty = !0;
  }
  resizeToFitImage() {
    return this.imageObject != null && this.resize(this.imageObject.width, this.imageObject.height), this;
  }
  getImageObject() {
    const t = this;
    return new Promise((e, i) => {
      if (t.imageObject != null)
        return void e(t.imageObject);
      let s = st.objCache.get(t);
      s != null ? s.next = function(r) {
        e(r);
      } : i(null);
    });
  }
  _beforeToJSON(t) {
    super._beforeToJSON(t), this.imageObject != null && t.indexImage(this.imageObject);
  }
  _toJSON(t) {
    let e = super._toJSON(t);
    if (t != null) {
      let i = t.resourcesIndexMap;
      if (this.imageObject != null) {
        let s = i.get(this.imageObject);
        s != null && (e.image = s);
      }
    }
    return e;
  }
  _fromJSON(t) {
    if (super._fromJSON(t), t.objJson.image != null) {
      let e = t.resourcesArr[t.objJson.image];
      e && e.type == "img" && (this.imageSrc = e.src);
    }
  }
  destroy() {
    super.destroy(), this.imageObject = null, this._imgRaw = null;
  }
}
((a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Dr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  i && r && Er(t, e, r);
})([u("ImageNode")], zt.prototype, "className", 2);
var Mr = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, Ge = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? zr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Mr(t, e, r), r;
};
class Et extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r);
  }
  get shape() {
    return this._shape;
  }
  set shape(t) {
    t !== this._shape && this.markMatrixDirty(), this._shape = t;
  }
  setShape(t) {
    this._shape = t, this.markMatrixDirty();
  }
  hitTest(t, e) {
    if (!this._isTextBlank() && this._getTextAABB().contains(t, e))
      return !0;
    if (!this._obb.aabb.contains(t, e))
      return !1;
    if (!this._state.hasBorder && this._shape instanceof bt) {
      let i = this.worldToLocalXY(t, e), s = this._localToNormal(i.x, i.y);
      if (this._shape.isClosed)
        return H.isPointInPolygon(s, this._shape.vertices);
      let r = Math.max(this._pickPrecision, this._computedStyle.lineWidth || 1), n = this._localToNormal(r, 0).x;
      return Ds(s, this._shape.vertices, !1, n);
    }
    return H.isPointInPolygon({ x: t, y: e }, this._obb.points);
  }
  _getOBBPoints() {
    if (this._shape instanceof bt) {
      this._updateShapeSize();
      let t = this._state.shapeSize, e = 0.5 * t.width, i = 0.5 * t.height;
      return this._shape.vertices.map((s, r) => ({ x: s.x * e, y: s.y * i }));
    }
    return super._getOBBPoints();
  }
  _strokeAndFill(t) {
    let e = this._state;
    t.save(), (e.hasBorder || e.hasBackgroundColor) && this._drawBackgroundOrBorder(t), this.drawShape(t), t.restore();
  }
  drawShape(t) {
    this._shape.draw(t, this);
  }
  _beforeToJSON(t) {
    super._beforeToJSON(t);
    let e = this.shape;
    if (t.shapeIndexMap.get(e) == null) {
      let i = t.shapes.length;
      t.shapeIndexMap.set(e, i), t.shapes.push(e.toJSON());
    }
  }
  _toJSON(t) {
    let e = super._toJSON(t);
    if (t != null) {
      let i = t.shapeIndexMap;
      if (this._shape != null) {
        let s = i.get(this._shape);
        e.shape = s;
      }
    }
    return e;
  }
  _fromJSON(t) {
    if (super._fromJSON(t), t.objJson.shape != null) {
      let e = t.shapeIndexMap.get(t.objJson.shape);
      this.setShape(e);
    }
  }
}
Ge([u("ShapeNode")], Et.prototype, "className", 2), Ge([u(Fe.getShape("Rect"))], Et.prototype, "_shape", 2), Ge([u(3)], Et.prototype, "_pickPrecision", 2);
class Ir {
  constructor(t = 0, e = 0, i, s) {
    this.imgWidth = 0, this.imgHeight = 0, this.duration = 1e3, this.frameCount = 1, this.totalColumns = 1, this.totalRows = 1, this.frameIndex = 0, this.frameWidth = 0, this.frameHeight = 0, this.positionX = 0, this.positionY = 0, this.currentFrameIndex = 0, this.row = 0, this.col = 0, this._width = 0, this._height = 0, this._scaleX = 1, this._scaleY = 1, this.imgWidth = t, this.imgHeight = e, i != null && this.changeOptions(i);
  }
  nextFrame() {
    var t;
    (t = this.onFrameChanged) == null || t.call(this, this.currentFrameIndex), this.update(), this.currentFrameIndex++, this.currentFrameIndex >= this.frameCount && (this.currentFrameIndex = 0);
  }
  update() {
    this.frameWidth = this.imgWidth / this.totalColumns, this.frameHeight = this.imgHeight / this.totalRows;
    let t = this.totalColumns;
    this.row = Math.floor(this.currentFrameIndex / t), this.col = this.currentFrameIndex % t, this.positionX = this.col * this.frameWidth, this.positionY = this.row * this.frameHeight;
  }
  changeOptions(t) {
    t != null && (this.frameIndex = t.frameIndex, this.frameCount = t.frameCount, t.duration != null && (this.duration = t.duration), t.totalRows != null && (this.totalRows = t.totalRows), t.totalColumns != null && (this.totalColumns = t.totalColumns), this.update(), this.currentFrameIndex = 0);
  }
  setImageSize(t, e) {
    t === this.imgWidth && e === this.imgHeight || (this.imgWidth = t, this.imgHeight = e, this.update());
  }
  doCssAnimation(t, e, i, s) {
    if (this._width !== i || this._height !== s) {
      this._width = i, this._height = s, this._scaleX = i / this.frameWidth, this._scaleY = s / this.frameHeight;
      const o = e.width * this._scaleX, l = e.height * this._scaleY;
      t.style.backgroundSize = o + "px " + l + "px";
    }
    let r = this.positionX * this._scaleX, n = this.positionY * this._scaleY;
    t.style.backgroundPosition = -r + "px " + -n + "px";
  }
  getIntervalTime() {
    return this.duration / this.frameCount;
  }
}
var Nr = Object.defineProperty, jr = Object.getOwnPropertyDescriptor, Ri = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? jr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Nr(t, e, r), r;
};
class ue extends zt {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r), this._animation = null, this._autoSize = !0, this._animation = new Ir();
  }
  changeSprite(t) {
    this._animation.changeOptions(t), this.update();
  }
  setSprite(t, e) {
    return this._animation.changeOptions(e), this.setImage(t);
  }
  setImage(t) {
    let e = this;
    return super.setImage(t).then((i) => (i instanceof HTMLImageElement && (e._animation.setImageSize(i.width, i.height), this._autoSize && e.resizeToFrame(), e.play()), i));
  }
  _drawImage(t, e) {
    const i = this._animation;
    let s = i.positionX, r = i.positionY, n = this._state.shapeSize, o = 0.5 * -n.width, l = 0.5 * -n.height;
    t.drawImage(e, s, r, i.frameWidth, i.frameHeight, o, l, n.width, n.height);
  }
  resizeToFrame() {
    return this.imageObject != null && this.width != this._animation.frameWidth && this.height != this._animation.frameHeight && this.resize(this._animation.frameWidth, this._animation.frameHeight), this;
  }
  play() {
    let t = this;
    if (this._animation.frameCount <= 1)
      return this;
    this.pause();
    const e = this._animation;
    return this._timer = setInterval(() => {
      t._animation.frameCount <= 1 || t._animation.duration <= 0 || (t.update(), e.nextFrame());
    }, e.getIntervalTime()), t.update(), this;
  }
  pause() {
    return clearInterval(this._timer), this._timer = null, this;
  }
  update() {
    super.update(), this._autoSize && this.resizeToFrame();
  }
  onUnmounted() {
    this.pause();
  }
  set frameIndex(t) {
    this._animation.frameIndex = t, this.update();
  }
  get frameIndex() {
    return this._animation.frameIndex;
  }
  set frameCount(t) {
    t !== this._animation.frameCount && (this._animation.frameCount = Math.max(1, t), this.update());
  }
  get frameCount() {
    return this._animation.frameCount;
  }
  set duration(t) {
    t !== this._animation.duration && (this._animation.duration = t, this.update());
  }
  get duration() {
    return this._animation.duration;
  }
  set autoSize(t) {
    this._autoSize = t, t && this.resizeToFrame();
  }
  get autoSize() {
    return this._autoSize;
  }
  get totalRows() {
    return this._animation.totalRows;
  }
  set totalRows(t) {
    this._animation.totalRows = t;
  }
  get totalColumns() {
    return this._animation.totalColumns;
  }
  set totalColumns(t) {
    this._animation.totalColumns = t;
  }
  destroy() {
    super.destroy(), this.pause();
  }
}
Ri([u("SpriteNode")], ue.prototype, "className", 2), Ri([u(zt.prototype._serializers.concat(["frameIndex", "frameCount", "totalRows", "totalColumns", "duration", "autoSize"]))], ue.prototype, "_serializers", 2);
var Br = Object.defineProperty, Rr = Object.getOwnPropertyDescriptor, qe = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Rr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Br(t, e, r), r;
};
class Wt extends zt {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(), this.isPlaying = !1, this.text = t, this.x = e || 0, this.y = i || 0, this.width = s || 0, this.height = r || 0;
  }
  showCover() {
    this.isPlaying = !1, this.markMatrixDirty();
  }
  play() {
    this.isPlaying = !0, this._video.play().catch((t) => {
    }), this.markMatrixDirty();
  }
  pause() {
    this.isPlaying = !1, this._video.pause(), this.markMatrixDirty();
  }
  setVideo(t) {
    const e = this;
    if (this._dom != null && (this._dom.remove(), this._dom = null), typeof t == "string") {
      this._videoSrc = t;
      let i = Dt.createVideo(t, function() {
        e.autoplay && e.play();
      });
      i.addEventListener("play", function() {
        e.dispatchEvent(new St("play"));
      }, !1), i.addEventListener("pause", function() {
        e.dispatchEvent(new St("pause"));
      }, !1), i.addEventListener("ended", function() {
        e.dispatchEvent(new St("ended"));
      }, !1), this._video = i, this._dom = this._video;
    } else
      this._video = t, this._videoSrc = t.firstElementChild.getAttribute("src");
    this._video.width = this.width, this._video.height = this.height, this.markMatrixDirty();
  }
  _strokeAndFill(t) {
    let e = this._state;
    t.save(), (e.hasBorder || e.hasBackgroundColor) && this._drawBackgroundOrBorder(t);
    let i = this.isPlaying ? this._video : this.imageObject;
    if (i != null) {
      let s = this._state.shapeSize;
      t.drawImage(i, 0.5 * -s.width, 0.5 * -s.height, s.width, s.height);
    }
    t.restore();
  }
  _afterUpdateMatrix() {
    super._afterUpdateMatrix(), this._video != null && this._video.width != this.width && (this._video.width = this.width, this._video.height = this.height);
  }
  destroy() {
    super.destroy(), this._dom && this._dom.remove();
  }
}
qe([u("VideoNode")], Wt.prototype, "className", 2), qe([u(!1)], Wt.prototype, "autoplay", 2), qe([u(_.prototype._serializers.concat(["autoplay", "videoSrc"]))], Wt.prototype, "_serializers", 2), Object.defineProperties(Wt.prototype, { videoSrc: { get() {
  return this._videoSrc;
}, set(a) {
  this.setVideo(a);
} } });
var Wr = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, Wi = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Fr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && Wr(t, e, r), r;
};
class pe extends _ {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r), this.aeOptions = {}, this.animations = [];
  }
  pause() {
    this.animationSystem && this.animations.forEach((t, e) => {
      t.cancel();
    });
  }
  play() {
    this.animationSystem && this.animations.forEach((t, e) => {
      t.play();
    });
  }
  onUnmounted() {
    this.animationSystem && (this.animationSystem.removeAENode(this), this.animationSystem = null);
  }
  destroy() {
    super.destroy(), this.aeOptions = null, this.animations = null, this.animationSystem = null;
  }
}
Wi([u("AENode")], pe.prototype, "className", 2), Wi([u(_.prototype._serializers.concat(["aeOptions"]))], pe.prototype, "_serializers", 2);
class bs {
  constructor() {
    this.destroyed = !1, this.domElement = this.createDomElement();
  }
  onNEUnmouted(t) {
  }
  onNEMounted(t) {
    const e = t.ownerLayer;
    e._renderState.treeDirty = !0, t instanceof ue ? t.play() : t instanceof pe && t.animationSystem == null && e.stage && e.stage.animationSystem.addAENode(t);
  }
  checkAndPrepareRenderData(t) {
    const e = t._renderState, i = e.flattenList, s = e.dirtySet, r = e.treeDirty || t.stage.camera.isDirty();
    r && (t._renderState.requestRepaint = !0, s.clear(), t._renderState.renderSet.clear(), e.treeDirty && (e.treeDirty = !1, i.length = 0, this._flatten(t.children, i)), i.forEach((n, o) => {
      n._state.renderIndex = o, s.add(n);
    }));
    for (const n of s)
      n._matrixDirty && (n.children.length > 0 && this._dirtyToChildrenRecursive(n), (n.inLinks.length > 0 || n.outLinks.length > 0) && this._markAllRelativeLinksDirty(t, n, !0));
    if (!r) {
      let n = Array.from(s);
      n.sort((o, l) => o._state.renderIndex - l._state.renderIndex), s.clear(), n.forEach((o) => s.add(o));
    }
  }
  updateMatrixAndStyle(t) {
    const e = t._renderState, i = t._renderState.renderSet, s = e.dirtySet, r = t.stage.camera;
    let n = !1;
    for (const o of s)
      o.style.dirty && (t.stage.styleSystem.computeStyle(o), o.style.dirty = !1), !o._matrixDirty || !o.isNode || o.parent instanceof S ? !n && o.isLink && (o.inLinks.length > 0 || o.outLinks.length > 0) && (n = !0) : (o.updateMatrix(), o._clearMatrixDirtyMark());
    if (n)
      for (const o of s)
        o.isLink && (o.inLinks.length > 0 || o.outLinks.length > 0) && o.updateMatrix();
    for (const o of s) {
      o._matrixDirty && (o.updateMatrix(), o._clearMatrixDirtyMark()), o.painted = !1;
      let l = o._state;
      l.isOutOfViewport = this._viewPortCut(o, t), l.needPaint = o.visible && o.parent._state.needPaint, l.needPaint && !l.isOutOfViewport && r.canSee(o) ? i.add(o) : i.has(o) && i.delete(o);
    }
    {
      let o = Array.from(i);
      o.sort((l, h) => l._state.renderIndex - h._state.renderIndex), t._renderState.renderList = o;
    }
  }
  _flatten(t, e) {
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      e.push(s), s.children.length > 0 && this._flatten(s.children, e);
    }
  }
  _dirtyToChildrenRecursive(t) {
    if (t.children.length != 0)
      for (let e = 0; e < t.children.length; e++) {
        let i = t.children[e];
        i.markMatrixDirty(), this._dirtyToChildrenRecursive(i);
      }
  }
  _markAllRelativeLinksDirty(t, e, i = !0) {
    let s = e.inLinks;
    for (let n = 0; n < s.length; n++) {
      let o = s[n];
      o._matrixDirty || (o.markMatrixDirty(), t._renderState.requestRepaint = !0, i && this._markAllRelativeLinksDirty(t, o));
    }
    let r = e.outLinks;
    for (let n = 0; n < r.length; n++) {
      let o = r[n];
      o._matrixDirty || (o.markMatrixDirty(), t._renderState.requestRepaint = !0, i && this._markAllRelativeLinksDirty(t, o));
    }
  }
  _viewPortCut(t, e) {
    if (e.cuttingHide == 0)
      return !1;
    let i = e.stage.camera.viewportRect, s = t._obb;
    return s.aabb != null && !i.isIntersectRect(s.aabb);
  }
  show() {
    this.domElement.style.display = "block";
  }
  hide() {
    this.domElement.style.display = "none";
  }
  setTitle(t) {
    this.domElement.title = t;
  }
  remove() {
    this.domElement.remove();
  }
  dispose() {
    this.destroyed = !0, this.remove();
  }
}
class ws extends bs {
  constructor() {
    super(), this.rendererType = "canvas";
    const t = this.domElement;
    this.canvas = t, Object.assign(t.style, { position: "absolute", touchAction: "none" }), this.context = t.getContext("2d"), this.clear(), this.contextExtends();
  }
  createDomElement() {
    return document.createElement("canvas");
  }
  _paintFlattenObjects(t, e) {
    let i = this.context;
    for (const s of t) {
      if (i.save(), s instanceof _) {
        let r = s._worldTransform.m;
        i.transform(r[0], r[1], r[2], r[3], r[4], r[5]);
      } else if (!(s.parent instanceof W)) {
        let r = s.parent._worldTransform.m;
        i.transform(r[0], r[1], r[2], r[3], r[4], r[5]);
      }
      this.paint(s, e), i.restore();
    }
  }
  paint(t, e) {
    let i = this.context, s = t.isSelected && t.showSelected == 1 && e !== null;
    s && (i.save(), this.paintSelected(t, e)), t.draw(i), s && i.restore();
  }
  paintSelected(t, e) {
    let i = this.context;
    if (t instanceof _) {
      let s = t.selectedStyle || e.currentTheme.getStyle("NodeSelectedStyle");
      if (s.borderWidth > 0) {
        i.save(), i.beginPath();
        let r = s.borderWidth;
        s.lineDash != null && i.setLineDash(s.lineDash), s.borderColor != null && (i.strokeStyle = s.borderColor), i.lineWidth = r;
        let n = t.width + 2 * r, o = t.height + 2 * r;
        i.rect(0.5 * -n, 0.5 * -o, n, o), i.stroke(), i.closePath(), i.restore();
      } else
        Object.assign(i, s);
    } else {
      let s = e.currentTheme.getStyle("LinkSelectedStyle");
      s.shadowColor != null && Object.assign(i, s);
    }
  }
  contextExtends() {
    this.context.roundRect == null && (this.context.roundRect = function(t, e, i, s, r) {
      this.beginPath(), this.moveTo(t + r, e), this.lineTo(t + i - r, e), this.quadraticCurveTo(t + i, e, t + i, e + r), this.lineTo(t + i, e + s - r), this.quadraticCurveTo(t + i, e + s, t + i - r, e + s), this.lineTo(t + r, e + s), this.quadraticCurveTo(t, e + s, t, e + s - r), this.lineTo(t, e + r), this.quadraticCurveTo(t, e, t + r, e), this.closePath();
    });
  }
  setSize(t, e) {
    const i = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(t * i), this.canvas.height = Math.round(e * i), this.canvas.style.width = t + "px", this.canvas.style.height = e + "px";
  }
  getSize() {
    return { width: this.canvas.width, height: this.canvas.height };
  }
  toDataURL(t, e) {
    t = t || "image/png";
    let i = this.canvas.toDataURL(t, e);
    return Promise.resolve(i);
  }
  toBlob(t, e) {
    return new Promise((i, s) => {
      this.canvas.toBlob((r) => {
        i(r);
      }, t, e);
    });
  }
  clear() {
    if (this.canvas.width = this.canvas.width, window.devicePixelRatio && window.devicePixelRatio != 1) {
      const t = window.devicePixelRatio;
      this.context.scale(t, t);
    }
  }
}
class yi extends ws {
  constructor() {
    super();
  }
  renderLayer(t) {
    const e = t.stage.styleSystem;
    this.clear();
    const i = e.currentTheme.getStyle("DefaultConfig");
    Object.assign(this.context, i), this.paintLayer(t, t.stage.camera), Ce.paintAABB == 1 && t._renderState.renderSet != null && this.paintAABB(t);
  }
  paintLayer(t, e) {
    let i = this.context;
    i.save();
    let s = e.getTransform().m;
    return i.transform(s[0], s[1], s[2], s[3], s[4], s[5]), t._computedStyle.applyTo(i), this._paintFlattenObjects(t._renderState.renderList, t.stage.styleSystem), i.restore(), t;
  }
  paintAABB(t) {
    let e = t.stage.camera, i = this.context, s = t._renderState.renderSet;
    for (const r of s) {
      let n = r._getAABBWithText();
      n = e.toScreenRect(n), i.save(), i.strokeStyle = r instanceof W ? "rgba(0,0,255,0.3)" : r instanceof S ? "pink" : "green", i.beginPath(), i.rect(n.x, n.y, n.width, n.height), i.stroke(), i.closePath(), i.restore();
    }
  }
}
class Hr extends St {
}
class Xr extends Ct {
  constructor(t) {
    super(), this.isDebug = !1, this.timeline = { currentTime: performance.now() }, this.stage = t;
  }
  start() {
    const t = this.stage, e = this, i = t.handlerLayer, s = this.timeline, r = t.animationSystem;
    {
      let l = t.animationSystem.timeline.begin;
      Date.now() >= l && (t.camera.localView.mode = "painted");
    }
    const n = t.camera.localView.mode == "painted";
    function o(l) {
      if (s.currentTime = l, t.destroyed)
        return;
      e.isDebug && console.time("一帧"), !n && r.tick(l);
      let h = t.camera;
      h._cameraDirty && (h._updateMatrix(), t.update()), e._tickLayer(i, l);
      const c = t.getAllVisibleLayers();
      h._cameraDirty && t._renderHelpers();
      for (let d = 0; d < c.length; d++) {
        let g = c[d];
        e._tickLayer(g, l);
      }
      h.clearDirty(), e.isDebug && console.timeEnd("一帧"), e.hasListener("renderAfter") && e.dispatchEvent(new Hr("renderAfter", { timeUsed: performance.now() - l })), e.requestTimer = requestAnimationFrame(o);
    }
    requestAnimationFrame(o), this.loopFn = o;
  }
  _tickLayer(t, e) {
    let i = t.render;
    t.beforeRender && t.beforeRender(), i.checkAndPrepareRenderData(t), t._frames > 0 ? this.renderLayer(t) : (t._renderState.requestRepaint == 1 || t._renderState.dirtySet.size > 0) && (t._renderState.requestRepaint = !1, this.renderLayer(t)), t.afterRender && t.afterRender();
  }
  renderLayer(t) {
    let e = t.render;
    if (t._renderState.dirtySet.size >= 0) {
      for (const i of t._renderState.flattenList)
        i.beforeRender && i.beforeRender();
      e.updateMatrixAndStyle(t), t._renderState.dirtySet.clear();
    }
    e.renderLayer(t);
    for (const i of t._renderState.renderSet)
      i.afterRender && i.afterRender();
    t._renderState.renderTimes++;
  }
  pause() {
    cancelAnimationFrame(this.requestTimer), this.requestTimer = null;
  }
  resume() {
    this.requestTimer == null && requestAnimationFrame(this.loopFn);
  }
}
class _s extends yi {
  constructor(t) {
    super();
  }
  paintSelected(t) {
  }
  overviewPaint(t) {
    const e = t.stage;
    let i = this.context;
    i.save();
    const s = e.styleSystem.currentTheme.getStyle("DefaultConfig");
    this.context.fillStyle = s.fillStyle, this.context.strokeStyle = s.strokeStyle;
    let r = e.camera.getTransform().m;
    i.transform(r[0], r[1], r[2], r[3], r[4], r[5]), t._computedStyle.applyTo(i);
    let n = e.camera;
    const o = t._renderState.flattenList.filter((l) => l._state.needPaint && n.canSee(l));
    this._paintFlattenObjects(o, e.styleSystem), i.restore();
  }
  exportPaintObjects(t, e) {
    if (t[0] instanceof W)
      t.forEach((i) => {
        i instanceof W && this.overviewPaint(i);
      });
    else {
      let i = [];
      t.forEach((s) => {
        i.push(s), i = i.concat(U.flatten(s.children, null));
      }), this._paintFlattenObjects(i, e);
    }
  }
}
class Yr {
  constructor(t) {
    this.visible = !1, this.objectLimit = 2e4, this.paintTimes = 0, this.dirty = !0, this.paintDealy = 50, this.isPointerDown = !1, this.isDraging = !1, this.previousX = 0, this.previousY = 0, this.pointerX = 0, this.pointerY = 0, this.dx = 0, this.dy = 0, this.stage = t, this.render = new _s(t);
    let e = this.render.domElement;
    e.style.backgroundColor = "rgba(255,255,255,0.5)", e.style.border = "solid 1px gray", e.style.position = "absolute", e.style.zIndex = "" + (t.handlerLayer.zIndex + 1), e.style.opacity = "0.7", e.style.right = "0", e.style.left = null, e.style.bottom = "0", t.layersContainer.appendChild(e), this.canvas = this.render.domElement, this.domElement = this.canvas, this.render.setSize(200, 123.6), this.cacheCanvas = document.createElement("canvas"), this.rectObj = new _(null, 0, 0), this.rectObj.hide(), this.initEvent(), this.hide();
  }
  setStyles(t) {
    if (t == null)
      return this;
    for (let e in t)
      this.canvas.style[e] = t[e];
    return this;
  }
  initEvent() {
    let t = this, e = t.render.domElement;
    ["pointerdown", "pointerup", "pointermove", "mousewheel", "pointerout"].map(function(i) {
      Dt.addEventListener(e, i, function(s) {
        if (t.isDraging = !1, t.stage.getCurrentLayer() == null)
          return;
        if (s.offsetX < 0 || s.offsetY < 0 || i == "pointerout")
          return void (t.isPointerDown = !1);
        t.isPointerDown && i == "pointermove" && (t.isDraging = !0), t.previousX = t.pointerX, t.previousY = t.pointerY, t.pointerX = s.offsetX, t.pointerY = s.offsetY, t.dx = t.pointerX - t.previousX, t.dy = t.pointerY - t.previousY;
        let r = i + "Handler";
        if (t[r] == null)
          throw new Error("Overview has no handler:" + i);
        t[r](s), s.stopPropagation();
      });
    });
  }
  show() {
    return this.visible = !0, this.render.show(), this.markDirty(), this;
  }
  hide() {
    return this._renderAfterListener && (this._renderAfterListener(), this._renderAfterListener = null), this.visible = !1, this.render.hide(), clearInterval(this._overviewTimer), this;
  }
  setSize(t, e) {
    return this.render.setSize(t, e);
  }
  paint() {
    this.dirty = !1;
    let t = this.stage, e = this.render, i = this.render.context;
    this.render.clear();
    let s = t.getCurrentLayer();
    if (s == null)
      return;
    let r = this.stage.exportSystem._getStageExportAABB();
    if (s._renderState.flattenList.length, this.isDraging)
      return i.drawImage(this.cacheCanvas, 0, 0), void this.paintDragRect(i, r);
    this.paintTimes++;
    const n = this.render.getSize();
    let o = n.width, l = n.height, h = o / Math.max(o, r.width), c = l / Math.max(l, r.height);
    i.save(), i.scale(h, c), i.translate(-r.x, -r.y), t.getAllVisibleLayers().forEach(function(g) {
      e.overviewPaint(g);
    }), i.restore();
    let d = this.cacheCanvas.getContext("2d");
    this.cacheCanvas.width = this.canvas.width, this.cacheCanvas.height = this.canvas.height, d.drawImage(this.canvas, 0, 0), this.paintDragRect(i, r);
  }
  paintDragRect(t, e) {
    let i = this.rectObj, s = this.stage, r = this.render, n = Math.max(e.width, s.width), o = Math.max(e.height, s.height), l = s.width / n, h = s.height / o;
    if (l == 1 && h == 1)
      return void i.hide();
    i.show();
    const c = r.getSize();
    let d = c.width * l, g = c.height * h;
    i.resize(d, g);
    let y = c.width / n, f = c.height / o, m = -e.x * y, p = -e.y * f;
    m < 0 && (m = 0), p < 0 && (p = 0), m + i.width > c.width && (m = c.width - i.width), p + i.height > c.height && (p = c.height - i.height), i.translate(m, p), t.save(), t.lineWidth = 2, t.fillStyle = "rgba(0,250,50,0.2)", t.strokeStyle = "red", t.beginPath(), t.rect(i.x, i.y, i.width, i.height), t.stroke(), t.fill(), t.restore();
  }
  update() {
    this.visible && this.paint();
  }
  markDirty(t = 200) {
    this.dirty = !0, this.visible && (clearTimeout(this._overviewTimer), this._overviewTimer = setTimeout(() => {
      this.dirty && this.update();
    }, t));
  }
  pointerdownHandler(t) {
    this.isPointerDown = !0;
    let e = this.rectObj.getRect(), i = t.offsetX, s = t.offsetY;
    e.contains(i, s);
    let r = i - (this.rectObj.x + this.rectObj.width / 2), n = s - (this.rectObj.y + this.rectObj.height / 2);
    this.moveWith(r, n);
  }
  mousedragHandler() {
    let t = this.dx, e = this.dy;
    this.moveWith(t, e);
  }
  moveWith(t, e) {
    if (!this.rectObj.visible)
      return;
    const i = this.render.getSize();
    t < 0 && this.rectObj.x + t <= 0 && (t = -this.rectObj.x), t > 0 && this.rectObj.x + this.rectObj.width >= i.width && (t = i.width - this.rectObj.width - this.rectObj.x), e < 0 && this.rectObj.y <= 0 && (e = -this.rectObj.y), e > 0 && this.rectObj.y + this.rectObj.height >= i.height && (e = i.height - this.rectObj.height - this.rectObj.y), this.rectObj.translateWith(t, e);
    let s = this.stage.exportSystem._getStageExportAABB(), r = s.width, n = s.height, o = r * (t / i.width), l = n * (e / i.height);
    this.stage.camera._dragWith(-o / this.stage.camera.scale, -l / this.stage.camera.scale), this.update();
  }
  mousewheelHandler(t) {
    t.preventDefault();
  }
  pointermoveHandler() {
    this.isPointerDown && this.mousedragHandler();
  }
  pointerupHandler() {
    this.isPointerDown = !1;
  }
}
class Ur {
  constructor(t) {
    this.mode = "painted", this.stage = t;
  }
  enter(t) {
    if (this.object != null && this.quit(), !(t != null && t !== this.object && t.isNode && t.getRoot() instanceof W))
      return void (this.object = null);
    let e = this.stage.getCurrentLayer();
    if (e == null)
      return;
    this.object = t, this.hideList = U.flatten(e.children, (s) => s !== t), t.isSelected = !1;
    let i = this.stage.camera;
    this.hideList.forEach(function(s, r) {
      i.exclude(s);
    });
  }
  quit() {
    if (this.object = null, this.hideList != null) {
      let t = this.stage.camera;
      this.hideList.forEach(function(e, i) {
        t.include(e);
      }), this.hideList = null;
    }
    this.stage.camera.markDirty();
  }
  getObject() {
    return this.object || this.stage.getCurrentLayer();
  }
  getMouseXY() {
    return this.object == null ? { x: this.stage.inputSystem.xInWorld, y: this.stage.inputSystem.yInWorld } : this.object.worldToLocalXY(this.stage.inputSystem.xInWorld, this.stage.inputSystem.yInWorld);
  }
}
class Fi extends St {
}
class Jr extends Ct {
  constructor(t) {
    super(), this._excludeMap = /* @__PURE__ */ new WeakMap(), this._excludeCounter = 0, this._offsetX = 0, this._offsetY = 0, this._scale = 1, this._cameraDirty = !0, this.screenTransform = Y.allocate(), this.screenInvertTransform = Y.allocate(), this.wheelZoomEnabled = !0, this._locked = !1, this.zoomInFactor = 1.25, this.zoomOutFactor = 0.8, this.zoomInLimit = 10, this.zoomOutLimit = 0.1, this.viewportRect = new v(0, 0, 1, 1), this.lookAtX = 0, this.lookAtY = 0, this.stage = t, this._init(), this.localView = new Ur(t), this.localView.mode = null;
  }
  _init() {
    this.offsetX = 0, this.offsetY = 0, this.scale = 1, this.lookAtX = 0, this.lookAtY = 0, this._locked = !1, this.viewportRect.setTo(0, 0, 1, 1);
  }
  lock() {
    this._locked = !0;
  }
  unlock() {
    this._locked = !1;
  }
  set locked(t) {
    this._locked = t;
  }
  get locked() {
    return this._locked;
  }
  exclude(t) {
    this._excludeCounter++, this._excludeMap.set(t, !0), this.markDirty();
  }
  include(t) {
    this._excludeCounter--, this._excludeMap.delete(t), this.markDirty();
  }
  canSee(t) {
    return this._excludeCounter == 0 || !this._excludeMap.has(t);
  }
  lookAt(t, e) {
    if (this.hasListener("lookAt")) {
      let o = new Fi("lookAt", { cancelable: !0, x: t, y: e });
      if (this.dispatchEvent(o), o.defaultPrevented == 1)
        return;
    }
    this.lookAtX = t, this.lookAtY = e;
    let i = this.toScreenXY(t, e), s = this.stage.getCenter(), r = s.x - i.x, n = s.y - i.y;
    this.offsetWith(r / this.scale, n / this.scale);
  }
  getOffsetInScreen() {
    let t = this.toScreenXY(0, 0);
    return { x: t.x - this.stage.halfWidth, y: t.y - this.stage.halfHeight };
  }
  zoomOut() {
    this.zoomBy(this.zoomOutFactor);
  }
  zoomIn() {
    this.zoomBy(this.zoomInFactor);
  }
  zoom(t) {
    let e = t / this.scale;
    this.zoomBy(e, this.lookAtX, this.lookAtY);
  }
  zoomBy(t, e, i) {
    if (this._locked)
      return;
    if (this.scale * t > this.zoomInLimit ? t = this.zoomInLimit / this.scale : this.scale * t < this.zoomOutLimit && (t = this.zoomOutLimit / this.scale), this.hasListener("zoom")) {
      let l = new Fi("zoom", { cancelable: !0, scale: this.scale, afterScale: this.scale * t, factor: t, x: e, y: i });
      if (this.dispatchEvent(l), l.defaultPrevented == 1)
        return;
    }
    if (this._updateMatrix(), e == null || i == null) {
      let l = this.stage.getRect().getCenter(), h = this.toWorldXY(l.x, l.y);
      e = h.x, i = h.y;
    }
    let s = this.toScreenXY(e, i);
    this.scale *= t, this._updateMatrix();
    let r = this.toScreenXY(e, i), n = (s.x - r.x) / this.scale, o = (s.y - r.y) / this.scale;
    this.offsetWith(n, o), this._updateMatrix();
  }
  toScreenXY(t, e) {
    return this.screenTransform.pointXY(t, e);
  }
  toWorldXY(t, e) {
    return this.screenInvertTransform.pointXY(t, e);
  }
  toWorldRect(t) {
    return _t.toAABB(new v(), this.screenInvertTransform.points([], t.toPoints()));
  }
  toScreenRect(t) {
    return _t.toAABB(new v(), this.screenTransform.points([], t.toPoints()));
  }
  _dragWith(t, e) {
    this._locked || this.offsetWith(t, e);
  }
  lookOnly(t) {
    t == null ? this.stage.camera.localView.quit() : this.stage.camera.localView.enter(t), this.markDirty();
  }
  getShowOnlyObject() {
    return this.localView.object;
  }
  zoomToFit(t = {}) {
    const e = this.stage;
    let i = e.viewLayers.map((h) => h.getAABB()), s = v.unionRects(i), r = t.padding || 0, n = (e.width - 2 * r) / s.width, o = (e.height - 2 * r) / s.height, l = Math.min(n, o);
    this.lookAt(s.center, s.middle), this.zoom(l);
  }
  lookAtContentCenter(t) {
    const e = this.stage;
    t == null && (t = e.getCurrentLayer()), t && e.camera.lookAtObject(t.children);
  }
  lookAtObject(t) {
    let e;
    if (t instanceof U)
      e = t.getAABB();
    else {
      if (t.length == 0)
        return void this.lookAt(0, 0);
      let i = t.map((s) => s.getAABB());
      e = v.unionRects(i);
    }
    this.lookAt(e.x + 0.5 * e.width, e.y + 0.5 * e.height);
  }
  _updateMatrix() {
    let t = this.screenTransform;
    t.identity();
    let e = this.offsetX + 0.5 * this.stage.width, i = this.offsetY + 0.5 * this.stage.height;
    t.scale(this.scale, this.scale), t.translate(e, i), this.screenInvertTransform = t.invert();
    let s = this.stage.getRect().getCenter(), r = this.toWorldXY(s.x, s.y);
    this.lookAtX = r.x, this.lookAtY = r.y;
    let n = this.stage.getRect().toPoints(), o = _t.toAABB(new v(), this.screenInvertTransform.points([], n));
    this.viewportRect = o;
  }
  reset() {
    this._init(), this.localView.quit();
  }
  offsetWith(t, e) {
    this._offsetX += t, this._offsetY += e, this._cameraDirty = !0;
  }
  setOffset(t, e) {
    this._offsetX = t, this._offsetY = e, this._cameraDirty = !0;
  }
  isDirty() {
    return this._cameraDirty;
  }
  markDirty() {
    this._cameraDirty = !0;
  }
  clearDirty() {
    this._cameraDirty = !1;
  }
  getTransform() {
    return this.screenTransform;
  }
  getScreenTransform() {
    return this.screenTransform;
  }
  getObjectScreenTransform(t) {
    let e = t.getWorldTransform(), i = e.copy();
    return Y.multiply(i, this.screenTransform, e), i;
  }
  get offsetX() {
    return this._offsetX;
  }
  set offsetX(t) {
    this._offsetX !== t && (this._cameraDirty = !0), this._offsetX = t;
  }
  get offsetY() {
    return this._offsetY;
  }
  set offsetY(t) {
    this._offsetY !== t && (this._cameraDirty = !0), this._offsetY = t;
  }
  get scale() {
    return this._scale;
  }
  set scale(t) {
    this._scale !== t && (this._cameraDirty = !0), this._scale = t;
  }
}
class Vr {
  constructor(t) {
    this._idCounter = 0, this.LinkSelectedShadowId = "lineShadowLegacy", this._patterns = /* @__PURE__ */ new WeakMap();
    const e = P.createSvg("svg");
    e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e.style.pointerEvents = "none", this.svg = e;
    const i = P.createSvg("defs");
    this.defsSvg = i, this.svg.appendChild(this.defsSvg), t.appendChild(this.svg), this.init();
  }
  setSize(t, e) {
    this.svg.setAttribute("width", t + "px"), this.svg.setAttribute("height", e + "px");
  }
  getSvg() {
    return this.svg;
  }
  init() {
    this.defsSvg.innerHTML = `
        ` + P.createFilter(this.LinkSelectedShadowId) + `
       `;
  }
  _nextId() {
    return "id_" + this._idCounter++;
  }
  _updatePattern(t, e, i) {
    if (!(e instanceof ft || e instanceof jt || e instanceof Bt))
      return;
    let s = this._patterns.get(e);
    if (s != null)
      return void t.setAttribute(i, "url(#" + s + ")");
    s = this._nextId(), this._patterns.set(e, s);
    let r = "";
    if (e instanceof ft)
      r = P.createPattern(s, { image: e.image, repetition: e.repetition });
    else if (e instanceof jt)
      r = P.createLinearGradient(s, { startX: e.startX, startY: e.startY, stopX: e.stopX, stopY: e.stopY, colors: e.colors });
    else {
      if (!(e instanceof Bt))
        throw console.error("unknown style type: " + e), new Error("unknown style type");
      r = P.createGradient(s, { cx: e.xStart, cy: e.yStart, r: e.radiusStart, fx: e.xStop, fy: e.yStop, fr: e.radiusEnd, colors: e.colors });
    }
    this.defsSvg.innerHTML += r, t.setAttribute(i, "url(#" + s + ")");
  }
  updatePattern(t, e) {
    e.strokeStyle == null && e.fillStyle == null || typeof e.strokeStyle != "object" && typeof e.fillStyle != "object" || (this._updatePattern(t, e.strokeStyle, "stroke"), this._updatePattern(t, e.fillStyle, "fill"));
  }
  createSpriteAnimate(t, e, i, s) {
    t.hasAttribute("_hasSpriteAnimate") || (t.style.backgroundRepeat = "no-repeat", t.style.backgroundImage = "url(" + i.src + ")", s.onFrameChanged = (r) => {
      t.clientWidth !== 0 && t.clientHeight !== 0 && s.doCssAnimation(t, i, t.clientWidth, t.clientHeight);
    }, t.setAttribute("_hasSpriteAnimate", "true"));
  }
}
const Gr = Gt.gc, Hi = st.w;
class Xi extends bs {
  constructor() {
    super(), this.objMap = /* @__PURE__ */ new WeakMap(), this.size = { width: 0, height: 0 }, this.isExporting = !1, this.rendererType = "svg", this.svgRoot = P.createSvg("svg"), this.domElement.appendChild(this.svgRoot), Object.assign(this.svgRoot.style, { position: "absolute", overflow: "visible", width: "1px", height: "1px", pointerEvents: "none" }), this.defsManager = new Vr(this.domElement);
    {
      let t = P.createSvg("title");
      this.svgRoot.appendChild(t), this.titleSvg = t;
    }
    if (Hi != null && document.querySelector('text[name="_logoText"]') == null) {
      const t = P.createSvg("text");
      t.setAttribute("text-anchor", "start"), t.setAttribute("fill", "#666"), t.setAttribute("stroke", "#777"), t.setAttribute("font-size", "16px"), t.setAttribute("name", "_logoText"), t.setAttribute("font-family", "arial"), this._logoTextSvg = t;
      let e = Gr(Hi);
      t.textContent = e, this.svgRoot.appendChild(t);
    }
  }
  createDomElement() {
    const t = document.createElement("jtlayer");
    return t.classList.add("jtlayer"), t;
  }
  getDomElement(t) {
    return this.objMap.get(t);
  }
  renderLayer(t) {
    this.isExporting || this.paintLayer(t, t.stage.camera);
  }
  paintLayer(t, e) {
    const i = e.getTransform().m, s = t.stage;
    this._getOrCreateNESvg(t, s.styleSystem), t.className !== "HandlerLayer" && (this.domElement.style.transform = "matrix(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + ")");
    for (let n = 0; n < t._renderState.flattenList.length; n++) {
      let o = t._renderState.flattenList[n], l = this._getOrCreateNESvg(o, t.stage.styleSystem);
      l.style.display = o.visible == 0 ? "none" : null, e.canSee(o) ? (o.painted = !0, l.hasAttribute("visibility") && l.removeAttribute("visibility")) : l.setAttribute("visibility", "hidden");
    }
    const r = t._renderState.renderSet;
    this._paintFlattenObjects(r, t.stage.styleSystem, !0);
  }
  adjustDomRelation(t, e) {
    const i = this.objMap.get(t.parent);
    if (i != null && e.parentNode !== i && (console.log("dom的父子关系调整", t.className), i.appendChild(e)), t.getIndex() == 0)
      return void (e !== i.firstChild && (t.parent instanceof S ? i.appendChild(e) : i.prepend(e)));
    const s = t.previousSibling, r = this.objMap.get(s);
    if (r == null && console.error("预期前一个节点不存在", t), r.parentNode == null) {
      let n = this.objMap.get(t.parent);
      console.error("预期前一个节点父节点不存在1", t, t.parent), console.error("parentDom", t.parent, n);
    }
    e.previousSibling !== r && r.parentNode.insertBefore(e, r.nextSibling);
  }
  _paintFlattenObjects(t, e, i) {
    for (const s of t) {
      if (s.parent == null)
        continue;
      let r = this._getOrCreateNESvg(s, e);
      i && s.ownerLayer && this.adjustDomRelation(s, r);
      let n = s._localTransform.m;
      const o = r.querySelector(':scope>[name="fg"]');
      if (o == null) {
        console.error("fgSVG不存在", s, r);
        continue;
      }
      let l;
      if (s instanceof _) {
        r.setAttribute("transform", "matrix(" + n[0] + "," + n[1] + "," + n[2] + "," + n[3] + "," + n[4] + "," + n[5] + ")");
        let d = s._state.shapeSize;
        if (s instanceof pe && (d = { width: s.width, height: s.height }), o.setAttribute("width", d.width.toString()), o.setAttribute("height", d.height.toString()), l = r.querySelector(':scope>rect[name="bg"]'), l != null && this._updateBackground(s, l), !(s instanceof dt)) {
          let g = r.querySelector(':scope>text[name="text"]');
          g == null && s.text != null && s.text != "" && (console.log("创建文本节点", s.className), g = P.createSvg("text", "text"), r.appendChild(g)), g != null && this._updateText(g, s, e);
        }
      }
      const h = s._computedStyle;
      h.globalAlpha != null && h.globalAlpha != 1 && r.setAttribute("opacity", h.globalAlpha.toString());
      const c = e.currentTheme.getStyle("DefaultConfig");
      this._updateSelected(s, e, r, o), this._applyStyle(o, h, c), this._updateContent(s, o, e), this.defsManager.updatePattern(o, h);
    }
  }
  _updateBackground(t, e) {
    let i = t._computedStyle;
    if (i.backgroundColor != null && e.setAttribute("fill", i.backgroundColor), i.borderWidth != null && e.setAttribute("stroke-width", i.borderWidth.toString()), i.borderColor != null && e.setAttribute("stroke", i.borderColor), i.borderRadius != null) {
      const n = Array.isArray(i.borderRadius) ? i.borderRadius[0] : i.borderRadius;
      e.setAttribute("rx", n.toString()), e.setAttribute("ry", n.toString());
    }
    let s = Math.max(0, t.width - (i.borderWidth || 0)), r = Math.max(0, t.height - (i.borderWidth || 0));
    e.setAttribute("x", (0.5 * -s).toString()), e.setAttribute("y", (0.5 * -r).toString()), e.setAttribute("width", s.toString()), e.setAttribute("height", r.toString());
  }
  isDrawToCanvas(t) {
    return t instanceof pe || t instanceof ue || t instanceof Et || t._shape instanceof Me;
  }
  _updateContent(t, e, i) {
    var s;
    if (t instanceof S)
      return void t._shape.drawSVG(e, t);
    if (this.isDrawToCanvas(t))
      this._drawToCanvas(e, t);
    else if (t instanceof dt)
      this._updateText(e, t, i);
    else if (t instanceof Et)
      t.shape.drawSVG(e, t);
    else if (t instanceof Ne) {
      let r = e.firstChild;
      console.assert(r != null, "foreignRootDiv is null"), r.querySelector(":scope>canvas") == null && t.canvas != null && (t.canvas.setAttribute("id", "canvas_" + t.id), r.appendChild(t.canvas)), t.canvas != null && t.onSizeChanged(t.width, t.height), e.setAttribute("x", "" + 0.5 * -t.width), e.setAttribute("y", "" + 0.5 * -t.height);
    } else if (t instanceof zt) {
      t.imageSrc == null ? e.removeAttribute("href") : t.imageSrc !== e.getAttribute("href") && e.setAttribute("href", t.imageSrc);
      let r = "" + 0.5 * -t.width, n = "" + 0.5 * -t.height;
      e.setAttribute("x", r), e.setAttribute("y", n);
    } else if (t instanceof Xt) {
      t._shape.drawSVG(e, t);
      let r = e.firstChild;
      if (t._htmlChanged) {
        if (t.getDom() != null ? r.appendChild(t.getDom()) : r.innerHTML = t.html, t._htmlChanged = !1, r._pointermove_event == null) {
          r._pointermove_event = !0, r.addEventListener("pointermove", (n) => {
            let o = n.target;
            (o.tagName == "TEXTAREA" || o.tagName == "INPUT") && n.stopPropagation();
          });
          {
            let n = t.height, o = t.top;
            (s = r.querySelector(".node-collapse")) == null || s.addEventListener("click", (l) => {
              let h = r.querySelector(".node-body");
              h != null && (h.style.display = h.style.display === "none" ? "block" : "none", h.style.display === "none" ? (t.height = r.clientHeight, t.top = o) : (t.height = n, t.top = o));
            });
          }
        }
        t.height != r.clientHeight && (t.height = r.clientHeight);
      }
    } else
      t._shape.drawSVG(e, t);
  }
  _updateSelected(t, e, i, s) {
    let r = t.isSelected && t.showSelected == 1 && e !== null, n = t instanceof _ ? i.querySelector(':scope > rect[name="selected"]') : null;
    if (r)
      if (t instanceof _) {
        n == null && (n = P.createSvg("rect", "selected"), i.appendChild(n));
        let o = 0;
        t.selectedStyle != null && (t.selectedStyle.shadowColor != null && (n.style.fill = t.selectedStyle.shadowColor), t.selectedStyle.borderColor != null && (n.style.stroke = t.selectedStyle.borderColor), t.selectedStyle.borderWidth != null && (n.style.strokeWidth = t.selectedStyle.borderWidth.toString()), t.selectedStyle.borderRadius != null && (n.setAttribute("rx", t.selectedStyle.borderRadius.toString()), n.setAttribute("ry", t.selectedStyle.borderRadius.toString())), t.selectedStyle.padding != null && (o = t.selectedStyle.padding)), n.setAttribute("x", "" + (0.5 * -t.width - 0.5 * o)), n.setAttribute("y", "" + (0.5 * -t.height - 0.5 * o)), n.setAttribute("width", (t.width + o).toString()), n.setAttribute("height", (t.height + o).toString()), n.setAttribute("visibility", "visible");
      } else
        s.setAttribute("filter", "drop-shadow(0 0 2px rgba(0,0,0,0.8))");
    else
      t instanceof _ ? n != null && n.setAttribute("visibility", "hidden") : t instanceof S && s.removeAttribute("filter"), s.removeAttribute("filter");
  }
  _updateText(t, e, i) {
    let s = e._state.textPositionCache, r = e._state.textLineHeight;
    t.setAttribute("x", s.x.toString()), t.setAttribute("y", s.y.toString());
    const n = i.currentTheme.getStyle("DefaultConfig");
    if (this._applyTextStyle(t, e._computedStyle, n), t.getAttribute("_text") === e._text + r.toString())
      return;
    let o = e._state.textArr;
    if (o != null) {
      let l = "";
      for (let h = 0; h < o.length; h++)
        l += '<tspan x="0" dy="' + (h == 0 ? 0 : r) + 'px">' + o[h] + "</tspan>";
      t.innerHTML = l;
    } else
      e.text !== t.textContent && (t.textContent = e.text);
    t.setAttribute("_text", e.text + r.toString());
  }
  _getOrCreateNESvg(t, e) {
    let i = this.objMap.get(t);
    if (i != null) {
      if (i.parentNode == null) {
        let o = this.objMap.get(t.parent);
        if (o == null)
          return console.error("neGroup父节点不存在2", t.parent, t), i;
        o.appendChild(i);
      }
      return i;
    }
    if (t instanceof W)
      return i = this.svgRoot, this.objMap.set(t, i), i;
    let s = t._localTransform.m;
    i = P.createSvg("g"), i.setAttribute("type", t.className), i.classList.add("j_ne_g"), t instanceof _ && i.setAttribute("transform", "matrix(" + s[0] + "," + s[1] + "," + s[2] + "," + s[3] + "," + s[4] + "," + s[5] + ")"), this.objMap.set(t, i);
    let r = t.parent;
    if (r == null)
      throw new Error("parent is null");
    let n = this.objMap.get(r);
    if (n == null) {
      if (r instanceof S)
        return console.error("parent link svgDom is null", t.text, r.text, t, r), i;
      console.error("parent not found"), n = this.svgRoot;
    }
    if (n.appendChild(i), t instanceof _) {
      let o = t._computedStyle, l = P.createSvg("rect", "bg");
      o.backgroundColor != null ? l.setAttribute("fill", o.backgroundColor) : l.setAttribute("fill", "transparent"), o.borderStyle != null && (o.borderStyle === "dashed" || o.borderStyle === "dotted" ? l.setAttribute("stroke-dasharray", "1,1") : l.removeAttribute("stroke-dasharray"));
      let h = o.borderWidth || 0;
      l.setAttribute("x", "" + 0.5 * -t.width), l.setAttribute("y", "" + 0.5 * -t.height);
      let c = Math.max(0, t.width - h), d = Math.max(0, t.height - h);
      l.setAttribute("width", c.toString()), l.setAttribute("height", d.toString()), i.appendChild(l);
    }
    {
      let o;
      if (this.isDrawToCanvas(t)) {
        o = P.createSvg("foreignObject");
        const l = this._appendForeignDIV(o);
        let h = document.createElement("canvas");
        l.appendChild(h);
      } else if (t instanceof Ne) {
        o = P.createSvg("foreignObject");
        const l = this._appendForeignDIV(o);
        t.canvas != null && (t.canvas.setAttribute("id", "canvas_" + t.id), l.appendChild(t.canvas));
      } else if (t instanceof Et)
        o = P.createSvg("path");
      else if (t instanceof je)
        o = P.createSvg("ellipse");
      else if (t instanceof dt)
        o = P.createSvg("text"), o.innerHTML = t.text;
      else if (t instanceof Wt)
        o = P.createSvg("image"), o.setAttribute("href", t.imageSrc), o.setAttribute("width", t.width.toString()), o.setAttribute("height", t.height.toString());
      else if (t instanceof zt)
        o = P.createSvg("image"), o.setAttribute("href", t.imageSrc);
      else if (t instanceof Xt) {
        o = P.createSvg("foreignObject"), o.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        let l = this._appendForeignDIV(o);
        t.getDom() != null ? l.appendChild(t.getDom()) : l.innerHTML = t.html;
      } else
        o = t instanceof S ? P.createSvg("path") : P.createSvg("rect");
      o.setAttribute("name", "fg"), i.appendChild(o);
    }
    if (t instanceof _ && !(t instanceof dt) && t.text != null && t.text != "" || t._shape instanceof Me) {
      let o = P.createSvg("text", "text");
      this._updateText(o, t, e), i.appendChild(o);
    }
    return i;
  }
  _appendForeignDIV(t) {
    let e = document.createElement("div");
    return e.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), e.style.padding = "0", e.style.margin = "0", e.style.width = "100%", e.style.height = "100%", t.appendChild(e), e;
  }
  _applyTextStyle(t, e, i) {
    e.textAlign != null && t.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[e.textAlign] || e.textAlign), e.textBaseline != null && t.setAttribute("dominant-baseline", { top: "hanging", middle: "middle", bottom: "auto" }[e.textBaseline] || e.textBaseline), t.setAttribute("fill", e.color || i.color), t.setAttribute("font-family", e.fontFamily || i.fontFamily), t.setAttribute("font-size", (e.fontSize || i.fontSize).toString());
    const s = e.fontWeight || i.fontWeight;
    if (s.includes(" ")) {
      const r = s.split(" ");
      for (const n of r)
        n === "bold" || n === "normal" || n === "bolder" || n === "lighter" || /^\d{3}$/.test(n) ? t.setAttribute("font-weight", n) : (n === "italic" || n === "oblique" || n === "normal") && t.setAttribute("font-style", n);
    } else
      t.setAttribute("font-weight", s.toString());
  }
  _applyStyle(t, e, i) {
    if (e.fillStyle != null ? t.setAttribute("fill", e.fillStyle) : e.backgroundColor != null ? t.setAttribute("fill", e.backgroundColor) : i.fillStyle != null && t.setAttribute("fill", i.fillStyle), e.strokeStyle != null ? t.setAttribute("stroke", e.strokeStyle) : t.setAttribute("stroke", i.strokeStyle), e.lineWidth != null && t.setAttribute("stroke-width", e.lineWidth.toString()), e.lineCap != null && t.setAttribute("stroke-linecap", e.lineCap), e.lineJoin != null && t.setAttribute("stroke-linejoin", e.lineJoin), e.miterLimit != null && t.setAttribute("stroke-miterlimit", e.miterLimit.toString()), e.lineDash != null && t.setAttribute("stroke-dasharray", e.lineDash.join(",")), e.lineDashOffset != null && t.setAttribute("stroke-dashoffset", e.lineDashOffset.toString()), e.filter != null) {
      let s = e.filter.trim(), r = s.indexOf("(");
      r > 0 && (s.substring(r + 1, s.length - 1), s = s.substring(0, r)), t.setAttribute("filter", "url(#" + s + "_Filter)");
    }
  }
  updateShape(t, e, i) {
    const s = i._obb.localPoints;
    let r = "", n = 0.5 * i.width, o = 0.5 * i.height;
    for (let l = 0; l < s.length; l++) {
      const h = s[l];
      r += l === 0 ? "M " + (h.x + n) + "," + (h.y + o) : "L " + (h.x + n) + "," + (h.y + o);
    }
    e.isClosed && (r += "Z"), t.setAttribute("d", r);
  }
  _drawToCanvas(t, e) {
    console.assert(t.tagName === "foreignObject", "fgSvg is not foreignObject");
    let i = t.querySelector("canvas");
    console.assert(i != null, "canvas is null");
    let s = e._state.shapeSize, r = s.width, n = s.height;
    t.setAttribute("x", "" + 0.5 * -r), t.setAttribute("y", "" + 0.5 * -n), i.width = r, i.height = n;
    let o = i.getContext("2d");
    o.isSVGRenderer = !0, o.translate(0.5 * r, 0.5 * n), e.draw(o), o.translate(0.5 * -r, 0.5 * -n);
  }
  dispose() {
    this.domElement.remove();
  }
  setSize(t, e) {
    this.size.width = t, this.size.height = e;
    const i = this._logoTextSvg;
    if (i != null) {
      let s = this.getSize().height;
      i.setAttribute("x", "14"), i.setAttribute("y", (s - 14).toString());
    }
    this.defsManager.setSize(t, e);
  }
  getSize() {
    return { width: this.size.width, height: this.size.height };
  }
  clear() {
  }
  onNEUnmouted(t) {
    super.onNEUnmouted(t);
    const e = this.objMap.get(t);
    e != null && e.parentNode != null && e.remove();
  }
  setTitle(t) {
    this.titleSvg != null && (this.titleSvg.textContent = t);
  }
  toDataURL(t, e) {
    this.isExporting = !0;
    try {
      return P.toSvgXmlString(this.svgRoot, t, e);
    } finally {
      this.isExporting = !1;
    }
  }
}
var qr = Object.defineProperty, Kr = Object.getOwnPropertyDescriptor, ee = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Kr(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && qr(t, e, r), r;
};
const Ot = class fi extends U {
  constructor(t) {
    let e;
    super(), this.deep = Tt.MinDeep - 1, this.cuttingHide = !0, this._frames = 0, this._renderState = { treeDirty: !0, requestRepaint: !1, renderTimes: 0, flattenList: [], dirtySet: /* @__PURE__ */ new Set(), renderSet: /* @__PURE__ */ new Set(), renderList: [] }, t instanceof Be ? this.stage = t : typeof t == "string" && (this.name = t), this.ownerLayer = this, e = fi.options.rendererType == "svg" ? new Xi() : new yi(), this._setRender(e), t instanceof Be && t.addLayer(this);
  }
  get frames() {
    return this._frames;
  }
  set frames(t) {
    this._frames = t;
  }
  get rendererType() {
    return this.render != null ? this.render.rendererType : "canvas";
  }
  set rendererType(t) {
    this._setRender(t == "svg" ? new Xi() : new yi());
  }
  getRect() {
    return new v(0, 0, this.width, this.height);
  }
  resize(t, e) {
    this.render.setSize(t, e);
  }
  getRenderSet() {
    return this._renderState.renderSet;
  }
  _markDirtyObject(t) {
    t instanceof fi || this._renderState.dirtySet.add(t);
  }
  _onMound(t) {
    this.stage = t, this._markAllDirty(), this.children.forEach((e) => {
      mt.travel(e, (i, s) => {
        this.render.onNEMounted(e);
      });
    });
  }
  update() {
    this._renderState.requestRepaint = !0;
  }
  _setRender(t) {
    this.render != null && this.render.dispose(), this.render = t, this.update();
  }
  _updateRenderSize(t, e) {
    const i = this.render.getSize();
    (t != i.width || e != i.height) && (this.render.setSize(t, e), this.resize(t, e), this.update());
  }
  _pickUpByRect(t) {
    let e = [];
    if (!this.pointerEnabled)
      return e;
    let i = this._renderState.renderSet;
    if (i != null)
      for (const s of i) {
        let r = s._obb.aabb;
        s.pickable() && t.containsRect(r) && e.push(s);
      }
    return e;
  }
  _pickUp(t, e) {
    if (!this.pointerEnabled)
      return null;
    t == null && (t = this.stage.inputSystem.xInWorld), e == null && (e = this.stage.inputSystem.yInWorld);
    const i = Array.from(this._renderState.renderSet);
    for (let s = i.length - 1; s >= 0; s--) {
      let r = i[s];
      if (r.pickable() && r.hitTest(t, e)) {
        let n = He._getTopFrozenParent(r);
        return n ?? r;
      }
    }
    return null;
  }
  getAABB() {
    let t = this.stage.camera, e = this._renderState.flattenList.filter((s) => s.visible && t.canSee(s));
    if (e.length == 0)
      return new v(0, 0, 1, 1);
    let i = e.map((s) => s._obb.aabb);
    return v.unionRects(i);
  }
  _getExportAABB() {
    let t = this.stage.camera, e = this._renderState.flattenList.filter((s) => s.visible && t.canSee(s));
    if (e.length == 0)
      return new v(0, 0, 1, 1);
    let i = e.map((s) => s._getAABBWithText());
    return v.unionRects(i);
  }
  setZIndex(t) {
    this._zIndex = t, this.stage && this.stage.updateZIndex();
  }
  get visible() {
    return this._visible;
  }
  set visible(t) {
    this._visible = t, this.markMatrixDirty(), this.render && (t == 1 ? this.render.show() : this.render.hide());
  }
  draw(t) {
  }
  _forceUpdate() {
    this.visible == 0 || this.destroyed || this.render.destroyed == 1 || (this._renderState.requestRepaint = !0, this.stage.renderSystem._tickLayer(this, Date.now()));
  }
  _markAllDirty() {
    this._renderState.treeDirty = !0, this.querySelectorAll().forEach((t) => {
      t.style.dirty = !0, t.markMatrixDirty();
    });
  }
  setStyles(t) {
    return this.setBackground(t);
  }
  setBackground(t) {
    if (this.stage == null)
      throw new Error("Stage is not set when layer.setBackground");
    return this.stage.setBackground(t), this;
  }
  addChild(t) {
    return super.addChild(t), this._markDirtyObject(t), this.update(), this;
  }
  addChildren(t) {
    return super.addChildren(t), t.forEach((e) => this._markDirtyObject(e)), this.update(), this;
  }
  getAllNodes() {
    return this._findChildren((t) => t.isNode, !0);
  }
  getAllLinks() {
    return this._findChildren((t) => t.isLink, !0);
  }
  querySelectorAll(t) {
    return super.querySelectorAll(t);
  }
  querySelector(t) {
    return super.querySelector(t);
  }
  loopRender() {
    this._frames = 60;
  }
  endLoopRender() {
    this._frames = 0;
  }
  translateWith(t, e) {
    return this;
  }
  _getSegmentPoints() {
    return [];
  }
  changeParent(t) {
    return this;
  }
  _doTransform(t) {
  }
  _getOBBPoints() {
    return [];
  }
  _beforeToJSON(t) {
    let e = this.style;
    if (t.styleIndexMap.get(e) == null) {
      let i = e.toJSON(t.indexImage);
      if (Object.keys(i).length > 0) {
        let s = t.styles.length;
        t.styleIndexMap.set(e, s), t.styles.push(i);
      }
    }
  }
  _onNERemoved(t) {
    if (this.destroyed)
      return;
    const e = t.children;
    e.length > 0 && e.forEach((i) => {
      this._onNERemoved(i);
    }), t.onUnmounted(), this.render.onNEUnmouted(t), this._renderState.treeDirty = !0;
  }
  updateMatrix() {
    return this;
  }
  destroy() {
    if (this.destroyed)
      throw new Error("Layer has been destroyed already.");
    this.destroyed = !0, this.stage && this.stage.removeLayer(this), this.render.dispose(), this._renderState = {}, this.listeners = void 0, this.style = void 0, this.classList.length = 0, this.render = void 0, this.stage = void 0, this.children.length = 0;
  }
  get displayList() {
    return Array.from(this._renderState.renderSet);
  }
  set background(t) {
    this.setBackground(t);
  }
  useLightGridBackground() {
    this.stage.setBackground({ background: "#ffffff" }), this.stage.showGrid({ minorColor: "#f0f0f0", majorColor: "#e0e0e0", backgroundColor: "#ffffff" });
  }
  useDarkGridBackground() {
    this.stage != null && this.stage.showGrid({ minorColor: "rgb(15,15,15)", majorColor: "#000000", backgroundColor: "#202020" });
  }
};
Ot.options = { rendererType: "canvas" }, ee([u("Layer")], Ot.prototype, "className", 2), ee([u(!0)], Ot.prototype, "isLayer", 2), ee([u(["className", "isLayer"])], Ot.prototype, "_allwaysSerializers", 2), ee([u(["id", "name", "zIndex", "visible", "pointerEnabled", "rendererType"])], Ot.prototype, "_serializers", 2), ee([u("1")], Ot.prototype, "_layerIndex", 2);
let W = Ot;
class He {
  static _getTopFrozenParent(t) {
    let e = He._getAncestors(t);
    for (let i = 0; i < e.length; i++)
      if (e[i].frozen)
        return e[i];
    return null;
  }
  static _getAncestors(t) {
    if (t.parent == null)
      return [];
    let e = [];
    for (; t.parent != null; )
      e.push(t.parent), t = t.parent;
    return e.reverse();
  }
  static anchorToLocalPoint(t, e) {
    let i = t._shape.getConnectionAnchor(e);
    if (i == null)
      throw Error("anchor not exist:" + e);
    return A.calcPointByAnchor(t, i);
  }
  static getNearestPoint(t, e) {
    if (t instanceof _) {
      if (t._state.hasBorder)
        return xi(e.x, e.y, t._obb.points, t._shape.isClosed);
      if (t._obb.points == null && t._matrixDirty)
        throw new Error("未来得及更新矩阵");
    }
    return t._shape.getIntersect(e.x, e.y, t);
  }
  static unlinks(t, e) {
    if (t instanceof S)
      return void t.unlink();
    let i = t.inLinks;
    i != null && (i.forEach((r) => {
      r.parent != null && (e != null && e.indexOf(r) != -1 || r.setEnd(r.getEndPoint()));
    }), t.inLinks.length = 0);
    let s = t.outLinks;
    s != null && (s.forEach((r) => {
      r.parent != null && (e != null && e.indexOf(r) != -1 || r.setBegin(r.getBeginPoint()));
    }), t.outLinks.length = 0);
  }
  static raise(t) {
    let e;
    t instanceof W ? t.stage && (e = t.stage.viewLayers) : e = t.parent.children;
    let i = at.swapWithRight(t, e);
    return i && (t.ownerLayer && (t.ownerLayer._renderState.treeDirty = !0), t instanceof W && t.stage && t.stage.updateZIndex()), i;
  }
  static lower(t) {
    let e;
    t instanceof W ? e = t.stage.viewLayers : t.parent && (e = t.parent.children);
    let i = at.swapWithLeft(t, e);
    return i && (t.ownerLayer && (t.ownerLayer._renderState.treeDirty = !0), t instanceof W && t.stage && t.stage.updateZIndex()), i;
  }
  static raiseToTop(t) {
    let e;
    t instanceof W ? e = t.stage.viewLayers : t.parent && (e = t.parent.children);
    let i = at.moveToTail(t, e);
    return i && (t.ownerLayer && (t.ownerLayer._renderState.treeDirty = !0), t instanceof W && t.stage && t.stage.updateZIndex()), i;
  }
  static lowerToBottom(t) {
    let e;
    t instanceof W ? e = t.stage.viewLayers : t.parent && (e = t.parent.children);
    let i = at.moveToHead(t, e);
    return i && (t.ownerLayer && (t.ownerLayer._renderState.treeDirty = !0), t instanceof W && t.stage && t.stage.updateZIndex()), i;
  }
}
class mt {
  static resizeByFixedPoint(t, e, i, s) {
    let r = t._positionToLocalPoint(e);
    t.width = i, t.height = s;
    let n = t._positionToLocalPoint(e);
    return t.x -= n.x - r.x, t.y -= n.y - r.y, t;
  }
  static rotateAround(t, e, i, s, r) {
    return t.x = e + Math.cos(r) * s, t.y = i + Math.sin(r) * s, t.rotation = r, t;
  }
  static rotateAt(t, e, i, s) {
    let r = t.parent || t, n = t.localToWorldXY(e, i), o = r.worldToLocalXY(n.x, n.y);
    t.rotate(s), t.updateMatrix(), n = t.localToWorldXY(e, i);
    let l = r.worldToLocalXY(n.x, n.y), h = o.x - l.x, c = o.y - l.y;
    return t.x += h, t.y += c, t.updateMatrix(), t;
  }
  static _upgradeLinks(t) {
    return t.getLinks().filter((e) => e._upgradeParent() != null);
  }
  static getUnionRect(t) {
    let e = t[0].getRect();
    for (let i = 1; i < t.length; i++)
      e = v.union(e, t[i].getRect());
    return e;
  }
  static setXYButChildFixed(t, e, i) {
    let s = t.children;
    t.x += e, t.y += i;
    for (let r = 0; r < s.length; r++) {
      const n = s[r];
      n instanceof _ && (n.x -= e, n.y -= i);
    }
  }
  static sizeFitToChildren(t, e) {
    let i = t.children;
    if (i.length == 0)
      return;
    let s = mt.getUnionRect(i);
    e == null && (e = 0);
    let r = 2 * e;
    t.resize(s.width + r, s.height + r);
    let n = s.x + t.width / 2, o = s.y + t.height / 2;
    mt.setXYButChildFixed(t, n - e, o - e);
  }
  static translateNodesCenterTo(t, e, i) {
    let s = e, r = i, n = [];
    n = n.concat(t);
    let o = mt.getUnionRect(n).getCenter(), l = s - o.x, h = r - o.y;
    n.forEach((c) => {
      c.translateWith(l, h);
    });
  }
  static travel(t, e, i = null, s = null) {
    if (s == null)
      s = [];
    else if (s.includes(t))
      return null;
    if (e && e(t, i), s.push(t), t instanceof _) {
      let r = t.outLinks;
      if (r != null)
        for (let n = 0; n < r.length; n++) {
          let o = r[n];
          mt.travel(o, e, t, s);
        }
    } else
      t instanceof S && t.end.isDisplayObjectHost() && mt.travel(t.end.host, e, i, s);
    return s;
  }
}
class Zr {
  constructor(t, e) {
    this.animationSystem = t, this.graphSystem = e;
  }
  pointsLayout(t, e) {
    let i = new Xe(t, e);
    return i.animationSystem = this.animationSystem, i;
  }
  starLayout(t) {
    !t.isTree() && (t = gi.createMinimalSpanningTree(t));
    let e = t.traverse(null).filter((n) => n instanceof ce), i = function(n) {
      const o = n.root, l = 2 * Math.max(o.object.width, o.object.height), h = Math.PI / 2;
      return function c(d, g = 0) {
        d.level = g, d.children.forEach((y) => {
          c(y, g + 1);
        });
      }(o), function c(d, g) {
        const y = g.get(d.level) || 0;
        g.set(d.level, y + 1), d.children.forEach((f) => {
          c(f, g);
        });
      }(o, /* @__PURE__ */ new Map()), function c(d, g, y, f) {
        const m = Math.pow(d.level, 1.5) * l;
        if (d.level === 0) {
          d.translate(0, 0);
          const p = 2 * Math.PI / d.children.length;
          d.children.forEach((x, w) => {
            c(x, w * p, p);
          });
        } else {
          const p = g + y / 2, x = Math.cos(p) * m, w = Math.sin(p) * m;
          if (d.translate(x, w), d.children.length > 0) {
            const k = Math.min(y / d.children.length, h), b = p - k * (d.children.length - 1) / 2;
            d.children.forEach((L, I) => {
              c(L, b + I * k, k);
            });
          }
        }
      }(o, 0, 2 * Math.PI), n.allVirtualNodes;
    }(this.graphSystem.toTree(t)), s = e.map((n) => n.object), r = new Xe(s, i);
    return r.animationSystem = this.animationSystem, r;
  }
  treeLayout(t) {
    !t.isTree() && (t = gi.createMinimalSpanningTree(t));
    let e = t.traverse(null).filter((n) => n instanceof ce), i = function(n) {
      const o = Math.max(n.root.object.width, n.root.object.height), l = o / 2, h = o, c = o, d = l, g = n.root;
      return function y(f) {
        if (!f.subtreeWidth)
          if (f.children.length === 0)
            f.subtreeWidth = o;
          else {
            let m = 0;
            f.children.forEach((p) => {
              m += y(p);
            }), m += d * (f.children.length - 1), f.subtreeWidth = Math.max(m, o);
          }
        return f.subtreeWidth;
      }(g), function y(f, m) {
        if (f.children.length === 0)
          return f.translate(m + l, f.y), m + o;
        let p = m, x = 0;
        return f.children.forEach((w, k) => {
          p = y(w, p), x += w.x, k < f.children.length - 1 && (p += d);
        }), x /= f.children.length, f.translate(x, f.y), p;
      }(g, 0), function y(f, m = 0) {
        f.level = m, f.y = m * (c + h), f.children.forEach((p) => {
          y(p, m + 1);
        });
      }(g), n.allVirtualNodes;
    }(this.graphSystem.toTree(t)), s = e.map((n) => n.object), r = new Xe(s, i);
    return r.animationSystem = this.animationSystem, r;
  }
  travelTree(t, e) {
    if (!t.isTree())
      throw new Error("graph is not a tree");
    return e == null && (e = t.vertexes[0]), t.travelNext(e);
  }
  sizeFitToChildren(t, e) {
    return mt.sizeFitToChildren(t, e);
  }
}
class Qr {
  constructor() {
    let t = document.querySelector('style[id="_jt_style"]');
    t == null && (t = document.createElement("style"), t.id = "_jt_style", document.head.appendChild(t)), this.domElement = t, this.init();
  }
  addOrReplaceClass(t, e) {
    const i = this.domElement.textContent || "", s = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = new RegExp(s + "\\s*\\{[^}]*\\}", "g"), n = t + " {" + e + "}";
    r.test(i) ? this.domElement.textContent = i.replace(r, n) : this.domElement.textContent = i + `
` + n;
  }
  init() {
    this.addOrReplaceClass("jtlayer", `
            display: block;
            position: absolute;
            width: '1px',
            height: '1px',
            touch-action: none;
            transform-origin: 0 0;
            pointer-events: none;
        `), this.addOrReplaceClass("jtnode", `
            position: absolute;
            display: block; 
            pointer-events: auto;
            background-color:gray;
        `), this.addOrReplaceClass("pin", `
            display: block; 
        `), this.addOrReplaceClass("slot", `
            display: block; 
        `), this.addOrReplaceClass("jtnode:hover", `
            outline:#00FF00 dotted thick;
            outline-width: 4px;
            outline-style: dotted;
            outline-color: cyan;
            outline-offset: 5px;
        `), this.addOrReplaceClass('.j_ne_g rect[name="selected"]', `
            fill: transparent; 
            stroke: gray; 
            stroke-width: 1px; 
            pointer-events: none;
        `), this.addOrReplaceClass(".j_ne_g", "overflow: visible; pointer-events: auto;");
  }
}
class vs {
  constructor(t) {
    if (this.DefaultConfig = { fillStyle: "black", strokeStyle: "black", font: Mt.DefaultFont, textAlign: et.center, textBaseline: it.middle }, this.SelectArea = { border: "1px rgba(0,0,0,0.5)", fillStyle: "rgba(0,0,236,0.1)" }, this.NodeSelectedStyle = { borderWidth: 0, shadowColor: "rgba(128,128,128,0.8)", shadowBlur: 5, shadowOffsetX: 3, shadowOffsetY: 3 }, this.LinkSelectedStyle = { shadowColor: "rgba(128,128,128,0.9)", shadowBlur: 5, shadowOffsetX: 3, shadowOffsetY: 3 }, this["Link.Arrow"] = { lineWidth: 1 }, this["Link.Label"] = { textPosition: ht.center, textBaseline: it.middle, textAlign: et.center, lineWidth: 0 }, this.Node = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.ImageNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.CanvasNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.TextNode = { textPosition: ht.center, textAlign: et.center, textBaseline: it.middle, lineWidth: 0 }, this.EllipseNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.TipNode = { textPosition: ht.ct, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.ShapeNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top, lineWidth: 1 }, this.VideoNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top }, this.HtmlNode = { textPosition: ht.cb, textAlign: et.center, textBaseline: it.top }, this.RatioNode = { textPosition: ht.center, textAlign: et.center, textBaseline: it.middle }, this.Link = { lineWidth: 1 }, this.FoldLink = { lineWidth: 1 }, this.QuadBezierLink = { lineWidth: 1 }, this.AutoFoldLink = { lineWidth: 1 }, this.BezierLink = { lineWidth: 1 }, this.ArcLink = { lineWidth: 1 }, this.ZShapeLink = { lineWidth: 1 }, t == null)
      return;
    let e = Object.keys(t);
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      Object.assign(this[s], t[s]);
    }
  }
  toJSON() {
    let t = {}, e = Object.keys(this);
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = $r[s], n = this[s], o = Gt.diff(n, r);
      o != null && (t[s] = o);
    }
    return t;
  }
}
const $r = new vs();
class ye {
  constructor(t, e) {
    this.name = t, this.content = new vs(e);
  }
  copy(t) {
    let e = JSON.parse(JSON.stringify(this.content));
    return new ye(t, e);
  }
  setStyle(t, e) {
    let i = this.content[t];
    if (i == null)
      throw new Error("setStyle: className not exist: " + t);
    Object.assign(i, e);
  }
  getStyle(t) {
    return this.content[t];
  }
}
let Ae = new ye(Mt.DefaultLightName, { DefaultConfig: { fillStyle: "rgba(0,0,0,0)", strokeStyle: "black", font: Mt.DefaultFont }, SelectArea: { border: "1px solid rgba(0,0,0,0.5)", backgroundColor: "rgba(0,0,236,0.1)" } });
const nt = "#e0e0e0";
let Yi = new ye(Mt.DefaultDarkName, { DefaultConfig: { fillStyle: "rgba(0,0,0,0)", strokeStyle: nt, font: Mt.DefaultFont }, SelectArea: { border: "1px solid rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.2)", lineWidth: 0 }, "Link.Label": { color: nt }, Node: { color: nt, lineWidth: 1 }, CanvasNode: { color: nt, lineWidth: 1 }, ImageNode: { color: nt, lineWidth: 1 }, TextNode: { color: nt }, TipNode: { color: nt }, ShapeNode: { color: nt }, EllipseNode: { color: nt, lineWidth: 1 }, VideoNode: { color: nt }, RatioNode: { color: nt }, HtmlNode: { color: nt } });
class tn {
  constructor(t) {
    this.themes = {}, this.defStyles = {}, this.stage = t, this.styleManager = new Qr(), this.addTheme(Ae), this.addTheme(Yi), this.setTheme(Ae.name);
  }
  addTheme(t) {
    this.themes[t.name] = t;
  }
  getTheme(t) {
    return this.themes[t];
  }
  customStyleToJSON(t) {
    let e = JSON.parse(JSON.stringify(this.themes));
    delete e.DefaultLight, delete e.DefaultDark;
    let i = {}, s = { themeName: this.currentTheme.name, themes: e, styles: i }, r = Object.keys(this.defStyles);
    for (let n = 0; n < r.length; n++) {
      let o = r[n], l = this.defStyles[o].toJSON(t);
      i[o] = l;
    }
    return s;
  }
  clear() {
    this.defStyles = {};
    for (let t in this.themes)
      t != "DefaultLight" && t != "DefaultDark" && delete this.themes[t];
    this.markDirty();
  }
  fromJson(t) {
    let e = t.CustomStyle;
    if (e == null)
      return;
    let i = e.themes, s = e.styles || {};
    if (i != null) {
      let o = Object.keys(i);
      for (let l = 0; l < o.length; l++) {
        let h = o[l], c = i[h], d = new ye(h, c.content);
        this.addTheme(d);
      }
    }
    let r = t.Resources || [];
    this.defStyles = {};
    let n = Object.keys(s).filter((o) => o.startsWith("."));
    for (let o = 0; o < n.length; o++) {
      let l = n[o], h = s[l];
      this.defStyles[l] = xt.fromJSON(h, r);
    }
    e.themeName != null && this.setTheme(e.themeName);
  }
  defClass(t, e) {
    if (e instanceof xt)
      return void (this.defStyles[t] = e);
    let i = new xt();
    Object.assign(i, e), this.defStyles[t] = i, !t.startsWith(".") && this.markDirty();
  }
  removeClass(t) {
    delete this.defStyles[t], !t.startsWith(".") && this.markDirty();
  }
  getClass(t) {
    return this.defStyles[t];
  }
  markDirty() {
    this.stage.viewLayers.forEach((t) => {
      t._markAllDirty();
    });
  }
  start() {
    this.setTheme(this.currentTheme.name);
  }
  setTheme(t) {
    let e = this.getTheme(t);
    if (e == null)
      throw new Error("theme not exist.");
    this.currentTheme = e, this.markDirty(), Dt.isMobileDevice && this.stage.viewLayers.length === 1 && (e === Yi ? this.stage.layersContainer.style.backgroundColor = "rgb(255,255,255)" : e === Ae && (this.stage.layersContainer.style.backgroundColor = "rgb(36,36,36)")), this.stage.update();
  }
  computeStyle(t) {
    let e = this, i = {}, s = this.currentTheme, r = t.className;
    t.parent instanceof S && (t === t.parent.label ? r = "Link.Label" : (t === t.parent.beginArrow || t === t.parent.endArrow) && (r = "Link.Arrow"));
    let n = s.getStyle(r);
    n == null && (t instanceof _ ? n = s.getStyle("Node") : t instanceof S && (n = s.getStyle("Link"))), n != null && Object.assign(i, n);
    let o = e.getClass(r);
    o != null && Object.assign(i, o);
    let l = t.classList;
    if (l.length > 0)
      for (let c = 0; c < l.length; c++) {
        const d = l[c];
        let g = e.getClass(d);
        g != null && Object.assign(i, g);
      }
    let h = t.style.getChangedProps();
    return Object.assign(i, h), t._computedStyle.update(i), t._afterStyleComputed(), t._computedStyle;
  }
  defTheme(t, e) {
    let i = this.getTheme(e);
    if (i == null)
      throw new Error("theme not exist:" + e);
    let s = i.copy(t);
    return this.addTheme(s), s;
  }
}
class en {
  constructor(t, e) {
    this.container = t, this.xLine = document.createElement("div"), this.yLine = document.createElement("div");
    const i = { position: "absolute", top: "0", left: "0", pointerEvents: "none", opacity: "0.5", inset: "0" };
    Object.assign(this.xLine.style, i), Object.assign(this.yLine.style, i), Object.assign(this.xLine.style, { height: "1px", width: "100%", backgroundColor: "red" }), Object.assign(this.yLine.style, { width: "1px", height: "100%", backgroundColor: "green" }), this.initializeGrid();
  }
  initializeGrid() {
    this.container.appendChild(this.yLine), this.container.appendChild(this.xLine), this.hide();
  }
  show() {
    this.xLine.style.display = "block", this.yLine.style.display = "block";
  }
  hide() {
    this.xLine.style.display = "none", this.yLine.style.display = "none";
  }
  update(t) {
    const e = t.x, i = t.y;
    t.zoom, this.xLine.style.left = "0px", this.xLine.style.top = i + "px", this.yLine.style.left = e + "px", this.yLine.style.top = "0px";
  }
  destroy() {
    this.xLine.parentNode && this.xLine.parentNode.removeChild(this.xLine), this.yLine.parentNode && this.yLine.parentNode.removeChild(this.yLine);
  }
}
class sn {
  constructor(t, e) {
    this.minorSize = 25, this.majorSize = 100, this.gridMajorColor = "#e0e0e0", this.gridMinorColor = "#f0f0f0", this.majorLineWidth = 1, this.minorLineWidth = 1, this.backgroundColor = null, this.currentViewport = { x: 0, y: 0, zoom: -1 }, this.isVisible = !1, this.container = t, this.minorSize = (e == null ? void 0 : e.minorSize) ?? this.minorSize, this.majorSize = (e == null ? void 0 : e.majorSize) ?? this.majorSize, this.gridMinor = document.createElement("div"), this.gridMajor = document.createElement("div");
  }
}
class rn extends sn {
  constructor(t, e) {
    super(t, e), this.pattern = null, this.containerWidth = 0, this.containerHeight = 0, this.dpr = 1, this.initializeCanvas();
  }
  initializeCanvas() {
    this.canvas = document.createElement("canvas"), Object.assign(this.canvas.style, { position: "absolute", top: "0", left: "0", width: "100%", height: "100%", pointerEvents: "none" }), this.ctx = this.canvas.getContext("2d", { alpha: !0 }), this.patternCanvas = document.createElement("canvas"), this.patternCtx = this.patternCanvas.getContext("2d", { alpha: !0 }), this.container.prepend(this.canvas), this.onContainerResize(), this.hide();
  }
  resetZoom() {
    this.currentViewport.zoom = -1;
  }
  onContainerResize() {
    const t = this.container.getBoundingClientRect(), e = window.devicePixelRatio || 1;
    this.canvas.width = t.width * e, this.canvas.height = t.height * e, this.canvas.style.width = t.width + "px", this.canvas.style.height = t.height + "px", this.ctx.setTransform(e, 0, 0, e, 0, 0), this.dpr = e, this.containerWidth = t.width, this.containerHeight = t.height, this.resetZoom();
  }
  createGridPattern(t) {
    const e = this.minorSize * t, i = this.majorSize * t, s = Math.ceil(i);
    this.patternCanvas.width = s, this.patternCanvas.height = s;
    const r = this.patternCtx;
    r.clearRect(0, 0, s, s), r.strokeStyle = this.gridMinorColor, r.lineWidth = this.minorLineWidth;
    for (let n = 0; n <= s; n += e) {
      const o = Math.floor(n) + 0.5;
      r.beginPath(), r.moveTo(o, 0), r.lineTo(o, s), r.stroke();
    }
    for (let n = 0; n <= s; n += e) {
      const o = Math.floor(n) + 0.5;
      r.beginPath(), r.moveTo(0, o), r.lineTo(s, o), r.stroke();
    }
    r.strokeStyle = this.gridMajorColor, r.lineWidth = this.majorLineWidth;
    for (let n = 0; n <= s; n += i) {
      const o = Math.floor(n) + 0.5;
      r.beginPath(), r.moveTo(o, 0), r.lineTo(o, s), r.stroke();
    }
    for (let n = 0; n <= s; n += i) {
      const o = Math.floor(n) + 0.5;
      r.beginPath(), r.moveTo(0, o), r.lineTo(s, o), r.stroke();
    }
    return this.ctx.createPattern(this.patternCanvas, "repeat");
  }
  show(t) {
    let e = !1;
    t && (t.minorColor && t.minorColor !== this.gridMinorColor && (this.gridMinorColor = t.minorColor, e = !0), t.majorColor && t.majorColor !== this.gridMajorColor && (this.gridMajorColor = t.majorColor, e = !0), t.minorSize && t.minorSize !== this.minorSize && (this.minorSize = t.minorSize, e = !0), t.majorSize && t.majorSize !== this.majorSize && (this.majorSize = t.majorSize, e = !0), t.backgroundColor && t.backgroundColor !== this.backgroundColor && (this.backgroundColor = t.backgroundColor, e = !0)), e && this.resetZoom(), this.isVisible = !0, this.canvas.style.display = "block", this.currentViewport && this.update(this.currentViewport);
  }
  hide() {
    this.isVisible = !1, this.canvas.style.display = "none";
  }
  update(t) {
    if (!this.isVisible || t.x == this.currentViewport.x && t.y == this.currentViewport.y && t.zoom == this.currentViewport.zoom)
      return;
    this.currentViewport.x = t.x, this.currentViewport.y = t.y, this.currentViewport.zoom != t.zoom && (this.pattern = this.createGridPattern(t.zoom)), this.currentViewport.zoom = t.zoom;
    const e = this.containerWidth, i = this.containerHeight;
    this.canvas.width = this.canvas.width, this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), this.backgroundColor && (this.ctx.fillStyle = this.backgroundColor, this.ctx.fillRect(0, 0, e, i));
    const s = this.majorSize * t.zoom;
    this.ctx.save(), this.ctx.fillStyle = this.pattern, this.ctx.translate(t.x, t.y);
    const r = e + Math.abs(t.x) + s, n = i + Math.abs(t.y) + s;
    this.ctx.fillRect(-t.x, -t.y, r, n), this.ctx.restore();
  }
  destroy() {
    this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.pattern = null;
  }
}
class nn {
  constructor(t) {
    this.stage = t, this.render = new _s(t);
  }
  toDataURL(t) {
    let e = Array.isArray(t) ? t : [t];
    return e.length > 0 && this._exportPaint(e), this.render.toDataURL();
  }
  toBlob(t) {
    let e = Array.isArray(t) ? t : [t];
    return e.length > 0 && this._exportPaint(e), this.render.toBlob();
  }
  toImage(t) {
    return this.toDataURL(t).then((e) => {
      let i = new Image();
      return i.src = e, i;
    });
  }
  saveAsLocalImage(t, e) {
    this.toDataURL(t).then((i) => {
      e == null && (e = "jtopo_" + (/* @__PURE__ */ new Date()).getTime() + ".png"), this.saveDataAsFile(i, e);
    });
  }
  saveImageInfo(t) {
    return this.toDataURL(t).then((e) => (window.open("about:blank").document.write("<img src='" + e + "' alt='from canvas'/>"), Promise.resolve(null)));
  }
  download(t, e, i = "text/json") {
    (function(s) {
      const r = document.createElement("a"), n = URL.createObjectURL(s);
      r.href = n, r.download = s.name, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(n);
    })(new File([e], t, { type: i }));
  }
  _exportPaint(t) {
    let e = this.render, i = t.map((h) => {
      if (h instanceof W) {
        let c = h._getExportAABB();
        return h.stage.camera.toScreenRect(c);
      }
      return h._obb.aabb;
    }), s = v.unionRects(i), r = Math.max(1, s.width), n = Math.max(1, s.height);
    e.setSize(r, n);
    const o = e.context;
    o.save(), o.translate(-s.x, -s.y);
    const l = this.stage.styleSystem.currentTheme.getStyle("DefaultConfig");
    o.fillStyle = l.fillStyle, o.strokeStyle = l.strokeStyle, e.exportPaintObjects(t, this.stage.styleSystem), o.restore();
  }
  saveDataAsFile(t, e) {
    let i = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    i.href = t, i.download = e;
    let s = document.createEvent("MouseEvents");
    s.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), i.dispatchEvent(s);
  }
  _getStageExportAABB() {
    let t = this.stage, e = t.getAllVisibleLayers().map((i) => t.camera.toScreenRect(i._getExportAABB()));
    return v.unionRects(e);
  }
}
var on = Object.defineProperty, an = Object.getOwnPropertyDescriptor;
const Ui = st.w;
class ln extends ws {
  constructor() {
    super();
  }
  renderLayer(t) {
    const e = t.stage;
    this.clear();
    let i = this.context;
    i.save(), t.draw(i), t._renderState.renderSet.forEach((r) => r.painted = !0);
    const s = t._renderState.renderSet;
    return this._paintFlattenObjects(Array.from(s), e.styleSystem), i.restore(), t;
  }
}
class Ss extends W {
  constructor() {
    super(), this._zIndex = wi.HandlerLayerCanvas, this.cuttingHide = !1, this.rendererType == "canvas" && this._setRender(new ln()), this.areaBox = new _(), this.areaBox.name = "areaBox", this.areaBox.pointerEnabled = !1, this.areaBox.setStyles(Ae.getStyle("SelectArea"));
  }
  _pickUp(t, e) {
    return t == null && (t = this.stage.inputSystem.x), e == null && (e = this.stage.inputSystem.y), super._pickUp(t, e);
  }
  showAreaBox() {
    const t = this.stage.inputSystem, e = this.areaBox;
    e.parent == null && this.addChild(e);
    let i = this.stage.styleSystem.currentTheme;
    e.setStyles(i.getStyle("SelectArea"));
    let s = t.pointerDownX, r = t.pointerDownY, n = t.x, o = t.y, l = Math.abs(s - n), h = Math.abs(r - o), c = Math.min(s, n), d = Math.min(r, o);
    return e.resize(l, h), e.translate(c, d), e.translateWith(0.5 * l, 0.5 * h), new v(c, d, e.width, e.height);
  }
  pointeroutHandler(t) {
    this.pointerupHandler();
  }
  pointerupHandler() {
    this.areaBox.removeFromParent();
  }
  update() {
    return this.children.length != 0 && (this._renderState.requestRepaint = !0, !0);
  }
  draw(t) {
    if (Ui == null)
      return;
    t.save(), t.globalAlpha = 0.5, t.font = "bold 16px arial";
    let e = Gt.gc(Ui);
    t.fillStyle = "rgba(128,128,128,0.5)", t.fillText(e, 16, this.render.getSize().height - 16), t.fillStyle = "rgba(29,29,29,0.5)", t.fillText(e, 16, this.render.getSize().height - 18), t.restore();
  }
}
((a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? an(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  i && r && on(t, e, r);
})([u("HandlerLayer")], Ss.prototype, "className", 2);
Dt.injectCss(`.ruler-layer{pointer-events:none;-webkit-user-select:none;user-select:none;opacity:.618}.ruler-layer .ruler-line-x{height:1px;width:100%;background-color:red;display:none}.ruler-layer .ruler-line-y{width:1px;height:100%;background-color:green;display:none}.ruler-layer .x-tick{position:absolute;opacity:.6;background-color:gray;width:1px;height:8px}.ruler-layer .y-tick{position:absolute;opacity:.6;background-color:gray;height:1px;width:8px}.ruler-layer .ruler-label{position:absolute;font-size:10px;white-space:nowrap}.ruler-layer .ruler-label.x-label{top:12px;left:0}.ruler-layer .ruler-label.y-label{left:12px;top:0}
`, "_jt_ruler_style");
class hn {
  constructor(t) {
    this.xTicks = [], this.yTicks = [], this.xLabels = [], this.yLabels = [], this.container = t.container, this.viewport = { ...t.initialViewport }, this.rulerLayer = document.createElement("div"), this.rulerLayer.className = "ruler-layer", Object.assign(this.rulerLayer.style, { position: "absolute", inset: "0", pointerEvents: "none", zIndex: "100" }), this.xRulerLine = document.createElement("div"), this.xRulerLine.className = "ruler-line-x", this.mainColor && (this.xRulerLine.style.backgroundColor = this.mainColor), Object.assign(this.xRulerLine.style, { left: "0", top: "0" }), this.rulerLayer.appendChild(this.xRulerLine), this.yRulerLine = document.createElement("div"), this.yRulerLine.className = "ruler-line-y", this.mainColor && (this.yRulerLine.style.backgroundColor = this.mainColor), Object.assign(this.yRulerLine.style, { left: "0", top: "0" }), this.rulerLayer.appendChild(this.yRulerLine), this.container.appendChild(this.rulerLayer), this.update(), this.hide();
  }
  show(t) {
    (t == null ? void 0 : t.showBorderLines) == 1 ? (this.xRulerLine.style.display = "block", this.yRulerLine.style.display = "block") : (this.xRulerLine.style.display = "none", this.yRulerLine.style.display = "none"), t != null && t.majorColor && (this.mainColor = t.majorColor, this.xRulerLine.style.backgroundColor = this.mainColor, this.yRulerLine.style.backgroundColor = this.mainColor, this.xTicks.forEach((e) => e.style.backgroundColor = this.mainColor), this.yTicks.forEach((e) => e.style.backgroundColor = this.mainColor), this.xLabels.forEach((e) => e.style.color = this.mainColor), this.yLabels.forEach((e) => e.style.color = this.mainColor)), this.rulerLayer.style.display = "block";
  }
  hide() {
    this.rulerLayer.style.display = "none";
  }
  update(t) {
    t && (this.viewport = { ...t }), this.clearTicksAndLabels(), this.renderTicksAndLabels();
  }
  destroy() {
    this.rulerLayer && this.rulerLayer.parentNode && this.rulerLayer.parentNode.removeChild(this.rulerLayer);
  }
  clearTicksAndLabels() {
    this.xTicks.forEach((t) => t.remove()), this.yTicks.forEach((t) => t.remove()), this.xLabels.forEach((t) => t.remove()), this.yLabels.forEach((t) => t.remove()), this.xTicks = [], this.yTicks = [], this.xLabels = [], this.yLabels = [];
  }
  renderTicksAndLabels() {
    const t = this.container.getBoundingClientRect(), e = -this.viewport.x / this.viewport.zoom, i = -this.viewport.y / this.viewport.zoom, s = (t.width - this.viewport.x) / this.viewport.zoom, r = (t.height - this.viewport.y) / this.viewport.zoom, n = function(y) {
      const f = [1, 2, 5, 10], m = Math.floor(Math.log10(y)), p = y / Math.pow(10, m);
      let x = f[0];
      for (const w of f)
        if (p <= w) {
          x = w;
          break;
        }
      return x * Math.pow(10, m);
    }(50 / Math.pow(2, Math.floor(Math.log2(this.viewport.zoom)))), o = [], l = Math.ceil(e / n) * n, h = Math.floor(s / n) * n;
    for (let y = l; y <= h; y += n) {
      const f = y * this.viewport.zoom + this.viewport.x;
      if (f >= 0 && f <= t.width) {
        const m = y.toFixed(Ji(n));
        o.push({ position: f, label: m });
      }
    }
    const c = [], d = Math.ceil(i / n) * n, g = Math.floor(r / n) * n;
    for (let y = d; y <= g; y += n) {
      const f = y * this.viewport.zoom + this.viewport.y;
      if (f >= 0 && f <= t.height) {
        const m = y.toFixed(Ji(n));
        c.push({ position: f, label: m });
      }
    }
    o.forEach((y, f) => {
      const m = document.createElement("div");
      m.className = "x-tick", this.mainColor && (m.style.backgroundColor = this.mainColor), m.style.left = y.position + "px", this.rulerLayer.appendChild(m), this.xTicks.push(m);
      const p = document.createElement("div");
      if (p.className = "ruler-label x-label", this.mainColor && (p.style.color = this.mainColor), p.style.left = y.position + "px", p.style.top = "12px", y.label === "0") {
        const x = document.createElement("span");
        x.style.fontSize = "12px", x.style.color = "#00ff00", x.textContent = "0", p.appendChild(x);
      } else
        p.textContent = y.label;
      this.rulerLayer.appendChild(p), this.xLabels.push(p);
    }), c.forEach((y, f) => {
      const m = document.createElement("div");
      m.className = "y-tick", this.mainColor && (m.style.backgroundColor = this.mainColor), m.style.top = y.position + "px", this.rulerLayer.appendChild(m), this.yTicks.push(m);
      const p = document.createElement("div");
      if (p.className = "ruler-label y-label", this.mainColor && (p.style.color = this.mainColor), p.style.left = "12px", p.style.top = y.position + "px", y.label === "0") {
        const x = document.createElement("span");
        x.style.fontSize = "12px", x.style.color = "#ff0000", x.textContent = "0", p.appendChild(x);
      } else
        p.textContent = y.label;
      this.rulerLayer.appendChild(p), this.yLabels.push(p);
    });
  }
}
function Ji(a) {
  return a >= 1 ? 0 : a >= 0.1 ? 1 : a >= 0.01 ? 2 : 3;
}
class ks extends St {
}
const Vi = new ks("dragstart"), cn = new ks("dragend");
class dn extends Ct {
  constructor() {
    super(), this.objects = [], this.isDraging = !1;
  }
  isEmpty() {
    return this.objects.length == 0;
  }
  pointeroutHandler(t) {
    this.isDraging = !1, this.isEmpty() || t.isPointerDown && this.dispatchEvent(Vi);
  }
  dragHandler(t) {
    if (this.dispatchEvent(cn), t.event instanceof MouseEvent && t.event.defaultPrevented == 1)
      return;
    let e = this.getTopObjects();
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s.draggable && s.dragHandler(t);
    }
  }
  dragEndHandler(t) {
    this.dispatchEvent(Vi);
    let e = this.getTopObjects();
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s.draggable && s.dragEndHandler(t);
    }
  }
  getTopObjects() {
    let t = this.objects, e = U.flatten(t);
    return e = U.flatten(t, (i) => !e.includes(i.parent)), e;
  }
  addAll(t) {
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      this.objects.includes(i) || (i.selectedHandler && i.selectedHandler(), this.objects.push(i));
    }
    return this;
  }
  add(t) {
    return this.objects.includes(t) || (t.selectedHandler(), this.objects.push(t)), this;
  }
  remove(t) {
    return t.unselectedHandler && t.unselectedHandler(), at.remove(this.objects, t), this;
  }
  removeAll() {
    let t = this.objects;
    for (let e = 0; e < t.length; e++) {
      let i = t[e];
      i.unselectedHandler && i.unselectedHandler();
    }
    return this.objects.length = 0, this;
  }
  has(t) {
    return this.objects.includes(t);
  }
  reset() {
    this.isDraging = !1, this.objects.length = 0;
  }
}
class Ke {
  static _initInputSystem(t) {
    const e = t.inputSystem;
    e._worldPosConverter = () => {
      let i = t.camera.toWorldXY(e.x, e.y);
      e.xInWorld = i.x, e.yInWorld = i.y, e.dxInWorld = e.dx / t.camera.scale, e.dyInWorld = e.dy / t.camera.scale;
    }, e._touchWheel._TouchZoomHandler = (i, s, r) => {
      const n = i.touches[0], o = i.touches[1], l = r.getBoundingClientRect(), h = l.left, c = l.top;
      let d = t.camera.toWorldXY(0.5 * (o.clientX - h + (n.clientX - h)), 0.5 * (o.clientY - c + (n.clientY - c)));
      t.camera.zoomBy(s, d.x, d.y);
    }, e._touchWheel._TouchDragHandler = (i, s) => {
      t.camera._dragWith(i / t.camera.scale, s / t.camera.scale);
    }, function(i) {
      const s = i.inputSystem;
      s.eventObservable.filter((o) => {
        if (i.mode == ot.view || i.camera.localView.mode == "painted")
          return !1;
        if (i.mode == ot.drag)
          return !0;
        s.preMouseoverTarget = s.mouseoverTarget, s.mouseoverTarget = null;
        const l = o.button == 1;
        if (o.type == "pointerdown") {
          if (i.handlerLayer._pickUp() == null) {
            let h = l ? null : i._pickUpViewLayers();
            h == null ? (s.target != null && s.target.unselectedHandler(), s.target = null) : s._setTarget(h);
          }
          return !0;
        }
        if ((o.type == "pointermove" || o.type == "pointerup") && (i.mode == ot.paint || o.buttons <= 0)) {
          let h = i._pickUpViewLayers();
          s.mouseoverTarget = h;
        }
        return !0;
      }).filter((o) => {
        let l = o.type;
        if (i.mode == ot.edit && i.editor != null) {
          let h = l + "Handler";
          if (i.editor[h] && (i.editor[h](o), o.defaultPrevented))
            return !1;
        }
        return !0;
      }).subscribe((o) => {
        let l = o.type + "Handler";
        i[l] && i[l](o), i.overview && i.overview.markDirty();
      });
    }(t);
  }
  static areaSelectHandle(t, e) {
    let i = t.stage, s = t.showAreaBox(), r = t.stage.viewLayers;
    for (let n = 0; n < r.length; n++) {
      let o = r[n];
      if (!o.hasChildren())
        continue;
      let l = i.camera.toWorldRect(s), h = o._pickUpByRect(l);
      i.selectedGroup.addAll(h), h.length > 0 && o.update();
    }
  }
  static pickObject(t, e) {
    const i = t.inputSystem;
    let s = i.event || { type: "pointerdown", ctrlKey: !1, metaKey: !1 };
    if (e == null)
      return;
    e.markMatrixDirty(), i.type == "pointerdown" && e.pointerdownHandler.call(e, i);
    const r = s.ctrlKey || s.metaKey;
    t.selectedGroup.has(e) ? r && t.selectedGroup.remove(e) : (!r && t.selectedGroup.removeAll(), t.selectedGroup.add(e));
  }
}
class ie extends St {
}
class Be extends Ct {
  constructor(t, e) {
    super(), this.version = bi, this.viewLayers = [], this.contextmenuEnabled = !1, this.mode = "normal", this.destroyed = !1, this.rect = new v(0, 0, 1, 1), this.config = { dropAllowed: !0, autoResize: !0 };
    const i = function(r) {
      if (typeof r == "string" && (r = document.getElementById(r)) == null)
        throw new Error("element is not found id:" + r);
      if (r == null)
        throw new Error("the dom element is null.");
      return Object.assign(r.style, { display: "flex", position: "relative", flexDirection: "column" }), r;
    }(t);
    this.domElement = i, this._initDom(), e != null && Object.assign(this.config, e), this.camera = new Jr(this), this.handlerLayer = new Ss(), this.handlerLayer.stage = this, this.inputSystem = new Fs(this.layersContainer), Ke._initInputSystem(this), this.keyboard = new js(), this.selectedGroup = new dn(), this.resourceSystem = st, this._initHandlerLayer(), this.styleSystem = new tn(this), this.animationSystem = new dr(), this.effectSystem = new Sr(this, this.animationSystem), this.graphSystem = new gi(), this.layoutSystem = new Zr(this.animationSystem, this.graphSystem), this.renderSystem = new Xr(this), this.exportSystem = new nn(this), this.serializerSystem = new hi(this);
    const s = this;
    this.resourceSystem.addEventListener("loaded", (r) => {
      s.update();
    }), this.camera._updateMatrix(), this.styleSystem.start(), this.renderSystem.start();
  }
  get enableContextmenu() {
    return this.contextmenuEnabled;
  }
  getRect() {
    return this.rect.width = this.width, this.rect.height = this.height, this.rect;
  }
  _initDom() {
    let t = this;
    document.addEventListener("contextmenu", function(s) {
      t.inputSystem.isPointerOn && s.preventDefault();
    });
    const e = document.createElement("div");
    e.classList.add("layer_container"), e.setAttribute("style", "overflow:hidden;position:relative;flex:1;width:100%;height:100%;-webkit-user-select:none;"), t.layersContainer = e, t.domElement.appendChild(e), t.width = e.offsetWidth, t.height = e.clientHeight;
    {
      const s = document.createElement("div");
      t._helperContainer = s, s.classList.add("helper_container"), s.setAttribute("style", "position:absolute;width:100%;height:100%;-webkit-user-select:none;pointer-events:none;"), e.appendChild(s);
    }
    const i = document.createElement("div");
    i.classList.add("ui_container"), i.setAttribute("style", "position:absolute;width:100%;-webkit-user-select:none;"), t.uiContainer = i, t.domElement.appendChild(i);
  }
  _initHandlerLayer() {
    {
      const t = this.handlerLayer.render.domElement;
      t.style.zIndex = "" + this.handlerLayer.zIndex, this.layersContainer.appendChild(t);
    }
    this.autoAdjustChildrenSize(), this.debugPanel = new kr(this);
  }
  autoAdjustChildrenSize() {
    let t = this;
    const e = t.layersContainer;
    if (window.ResizeObserver) {
      const s = new ResizeObserver((r) => {
        t.config.autoResize && Ys(e, function() {
          t.resize(e.clientWidth, e.clientHeight);
        }, 30);
      });
      return s.observe(e), void (t._resizeObserver = s);
    }
    let i = setInterval(function() {
      if (!t.config.autoResize)
        return;
      let s = e.offsetWidth, r = e.offsetHeight;
      (t.width != s || t.height != r) && t.resize(s, r);
    }, 500);
    t._resizeTimer = i;
  }
  resize(t, e) {
    const i = this;
    i.width = t, i.height = e, i.halfWidth = 0.5 * t, i.halfHeight = 0.5 * e, i.handlerLayer._updateRenderSize(t, e), i.viewLayers.forEach(function(r) {
      r._updateRenderSize(t, e);
    }), this.gridHelper && this.gridHelper.onContainerResize(), this._renderHelpers(), i.camera.markDirty();
    let s = new ie("resize", { newWidth: t, newHeight: e });
    i.dispatchEvent(s);
  }
  showDebugPanel() {
    this.debugPanel.show();
  }
  hideDebugPanel() {
    this.debugPanel.hide();
  }
  showOverview(t) {
    let e = this;
    e.overview == null && (e.overview = new Yr(e)), e.overview.setStyles(t), e.overview.show();
  }
  hideOverview() {
    this.overview != null && this.overview.hide();
  }
  addLayer(t) {
    if (this.viewLayers.length >= Tt.MaxLayerCount)
      throw new Error("out of max layer count");
    t.resize(this.width, this.height), this.viewLayers.push(t);
    const e = t.render.domElement;
    this.layersContainer.appendChild(e), this.updateZIndex(), t._onMound(this);
  }
  updateZIndex() {
    const t = this.viewLayers;
    if (t.length === 0 || (t.sort(function(i, s) {
      return i.zIndex - s.zIndex;
    }), t.length <= 1))
      return;
    const e = this.layersContainer;
    t.forEach((i) => {
      i.render.domElement.style.zIndex = "" + i.zIndex;
    }), t.map((i) => (i.render.remove(), i.render.domElement)).forEach((i) => {
      e.appendChild(i);
    });
  }
  removeLayer(t) {
    t.render.remove();
    let e = this.viewLayers.indexOf(t);
    return e == -1 || (at.removeAt(this.viewLayers, e), t.stage = null), this;
  }
  removeChild(t) {
    return this.removeLayer(t);
  }
  show() {
    return this.camera.markDirty(), this.viewLayers.forEach(function(t) {
      t.show();
    }), this.resourceSystem.whenAllLoaded();
  }
  hide() {
    this.viewLayers.forEach(function(t) {
      t.hide();
    });
  }
  update() {
    this.editor && this.editor.update(), this.handlerLayer.update(), this.viewLayers.forEach(function(t) {
      t.update();
    });
  }
  _forceUpdate() {
    this.handlerLayer._forceUpdate(), this.viewLayers.forEach(function(t) {
      t._forceUpdate();
    });
  }
  toDataURL() {
    let t = this.exportSystem.toDataURL(this.viewLayers);
    return Promise.resolve(t);
  }
  saveImageInfo() {
    return this.exportSystem.saveImageInfo(this.viewLayers).then(() => null);
  }
  saveAsLocalImage() {
    this.exportSystem.saveAsLocalImage(this.viewLayers);
  }
  fullWindow() {
    if (this.hasListener("fullWindow")) {
      let t = new ie("fullWindow", { cancelable: !0 });
      if (this.dispatchEvent(t), t.defaultPrevented == 1)
        return;
    }
    Dt.fullWindow(this.domElement);
  }
  fullScreen() {
    if (this.hasListener("fullScreen")) {
      let t = new ie("fullScreen", { cancelable: !0 });
      this.dispatchEvent(t);
    }
    Dt.fullScreen(this.domElement);
  }
  setMode(t) {
    if (this.hasListener("modeChange")) {
      let e = new ie("modeChange", { cancelable: !0, mode: this.mode, newMode: t });
      if (this.dispatchEvent(e), e.defaultPrevented == 1)
        return;
    }
    this.mode = t, t == ot.drag ? this.setCursor(F.grab) : this.setCursor(F.default);
  }
  dropHandler(t) {
  }
  dragoverHandler() {
  }
  mouseoverHandler() {
  }
  pointerdownHandler(t) {
    if (this.inputSystem, this.mode == ot.drag)
      return void this.setCursor(F.grabbing);
    let e = this.inputSystem.target;
    if (e != null)
      return void Ke.pickObject(this, e);
    !(t.ctrlKey || t.metaKey) && this.selectedGroup.removeAll();
  }
  static findDropToObjec(t, e) {
    let i = He._getAncestors(t), s = U.flatten(t.children);
    for (let r = e.length - 1; r >= 0; r--) {
      let n = e[r];
      if (t !== n && n !== t.parent && n.dropAllowed && i.indexOf(n) == -1 && s.indexOf(n) == -1 && n._obb.aabb.containsRect(t._obb.aabb))
        return n;
    }
    return null;
  }
  _dragHandler(t) {
    const e = this.mode;
    if (e == ot.paint)
      return;
    const i = this.inputSystem, s = this.handlerLayer, r = this.inputSystem.target, n = this.selectedGroup, o = t.buttons == 1, l = o && r != null && r.pointerEnabled && r.draggable, h = this.viewLayers.filter((c) => c.pointerEnabled);
    if (o && this.config.dropAllowed && l && r.draggable) {
      let c = null;
      for (let d = 0; d < h.length; d++) {
        const g = h[d], y = [];
        g._renderState.renderSet.forEach((f) => {
          f.isNode && y.push(f);
        }), c = Be.findDropToObjec(r, y), c !== i.dropTarget && i.dropTarget && i.dropTarget.dragoutHandler(i), c != null && c.dragoverHandler(this.inputSystem);
      }
      i.dropTarget = c;
    }
    if (l && this.mode !== ot.drag)
      return void n.dragHandler(i);
    !o || e != ot.select && e != ot.edit ? (this.setCursor(F.grabbing), this.camera._dragWith(i.dxInWorld, i.dyInWorld)) : Ke.areaSelectHandle(s, i);
  }
  pointerupHandler(t) {
    const e = this.inputSystem, i = this.viewLayers, s = e.isRightButton;
    this.handlerLayer.pointerupHandler();
    for (let n = 0; n < i.length; n++) {
      const o = i[n];
      e.isDraging && o.dragEndHandler(e);
    }
    if (this.mode == ot.drag)
      return void this.setCursor(F.grab);
    this.setCursor("default");
    let r = this.inputSystem.target;
    r && r.pointerEnabled && (r.pointerupHandler(e), e.previous.isDraging && r.draggable && s == 0 && this.selectedGroup.dragEndHandler(e)), this.config.dropAllowed && e.dropTarget && (e.dropTarget.dropHandler(e), e.dropTarget = null);
  }
  pointeroutHandler(t) {
    const e = this.inputSystem;
    this.handlerLayer.pointeroutHandler(e), this.selectedGroup.pointeroutHandler(e);
  }
  clickHandler(t) {
    const e = this.inputSystem;
    let i = e.target;
    i && !e.previous.isDragEnd && i.clickHandler(e);
  }
  dblclickHandler(t) {
    const e = this.inputSystem;
    let i = e.target;
    i && !e.previous.isDragEnd && i.dblclickHandler(e);
  }
  pointermoveHandler(t) {
    const e = this.inputSystem;
    if (this.getCurrentLayer() == null)
      return;
    if (e._touchWheel.touchsCount > 1)
      return void (this.handlerLayer.areaBox.ownerLayer && this.handlerLayer.areaBox.removeFromParent());
    if (e.isDraging)
      return this._dragHandler(t);
    if (this.mode == ot.drag)
      return void this.setCursor(F.grab);
    if (e.skipPointerMovePicking)
      return;
    let i = e.preMouseoverTarget, s = e.mouseoverTarget;
    i !== s && i != null && i.pointeroutHandler && i.pointeroutHandler(e), s != null && (i !== s ? s.pointerenterHandler && s.pointerenterHandler(e) : (s.title != null && this._setTitle(s.title), s.pointermoveHandler(e)));
  }
  _setTitle(t) {
    if (this.handlerLayer.rendererType == "canvas")
      this.handlerLayer.render.setTitle(t);
    else {
      let e = this.getCurrentLayer();
      e != null && e.render.setTitle(t);
    }
  }
  wheelHandler(t) {
    if (this.getCurrentLayer() == null || this.camera.wheelZoomEnabled == 0)
      return;
    let e = this.inputSystem.xInWorld, i = this.inputSystem.yInWorld;
    t.deltaY < 0 ? this.camera.zoomBy(this.camera.zoomInFactor, e, i) : this.camera.zoomBy(this.camera.zoomOutFactor, e, i);
  }
  _renderHelpers() {
    if (this.gridHelper == null && this.ruler == null && this.axisHelper == null)
      return;
    const t = 0.5 * this.width * this.camera.scale, e = 0.5 * this.height * this.camera.scale, i = { x: this.camera.offsetX * this.camera.scale + t, y: this.camera.offsetY * this.camera.scale + e, zoom: this.camera.scale };
    this.gridHelper && this.gridHelper.update(i), this.ruler && this.ruler.update(i), this.axisHelper && this.axisHelper.update(i);
  }
  showAxis() {
    return this.axisHelper == null && (this.axisHelper = new en(this._helperContainer)), this.axisHelper.show(), this._renderHelpers(), this;
  }
  hideAxis() {
    return this.axisHelper && this.axisHelper.hide(), this;
  }
  showRuler(t) {
    this.ruler == null && (this.ruler = new hn({ container: this._helperContainer, initialViewport: { x: 0, y: 0, zoom: 1 } })), this.ruler.show(t), this._renderHelpers();
  }
  hideRuler() {
    this.ruler && this.ruler.hide();
  }
  showGrid(t) {
    this.gridHelper == null && (this.gridHelper = new rn(this._helperContainer)), this.gridHelper.show(t), this._renderHelpers();
  }
  hideGrid() {
    this.gridHelper && this.gridHelper.hide();
  }
  setBackground(t) {
    this._background = t, Object.assign(this.layersContainer.style, t);
  }
  pointerenterHandler(t) {
  }
  _pickUpViewLayers(t, e) {
    let i = this.viewLayers, s = this.camera;
    for (let r = i.length - 1; r >= 0; r--) {
      let n = i[r];
      if (!n.visible || !n.pointerEnabled)
        continue;
      let o = n._pickUp(t, e);
      if (o != null && o !== s.localView.object)
        return o;
    }
    return null;
  }
  getCursor() {
    return this.layersContainer.style.cursor;
  }
  setCursor(t) {
    return this.layersContainer.style.cursor = t;
  }
  download(t, e) {
    return this.exportSystem.download(t, e);
  }
  select(t) {
    this.selectedGroup.removeAll(), this.selectedGroup.addAll(t);
  }
  getCurrentLayer() {
    let t = this.viewLayers.filter((e) => e.visible);
    return t.length == 0 ? null : t[t.length - 1];
  }
  getAABB() {
    if (this.viewLayers.length == 0)
      return new v(0, 0, this.width, this.height);
    let t = this.viewLayers.map((e) => this.camera.toScreenRect(e.getAABB()));
    return v.unionRects(t);
  }
  getAllVisibleLayers() {
    return this.viewLayers.filter((t) => t.visible);
  }
  getCenter() {
    return { x: 0.5 * this.width, y: 0.5 * this.height };
  }
  setCamera(t) {
    this.camera = t;
  }
  toJSON() {
    return De(this, this.viewLayers.filter((t) => t.serializeable), null, "Stage");
  }
  toJSONWithBase64() {
    let t = De(this, this.viewLayers.filter((r) => r.serializeable), null, "Stage"), e = t.Resources || [], i = [], s = [];
    return e.filter((r) => r.type == "img").map((r, n) => {
      i.push(r.src), s.push(n);
    }), new Promise((r, n) => {
      const o = i.map((l) => he.loadImageAsDataUrl(l));
      Promise.all(o).then((l) => {
        for (let h = 0; h < l.length; h++)
          e[s[h]].src = l[h];
        r(t);
      }).catch(n);
    });
  }
  fromJSON(t, e) {
    if (t.Roots.length > 1 && t.SerializeType != "Stage")
      throw new Error("SerializeType is not Stage");
    this._clear();
    const i = this;
    function s() {
      let n = _e(i, t, e);
      for (let o = 0; o < n.length; o++) {
        let l = n[o];
        i.addLayer(l);
      }
      i.styleSystem.markDirty(), i._forceUpdate(), i.camera.zoom(1), i.camera.lookAt(0, 0), i.camera.lookAtContentCenter(), i.camera.localView.quit(), setTimeout(() => {
        i.styleSystem.markDirty(), i.renderSystem.resume(), i.dispatchEvent(new ie("afterLoaded", { json: t }));
      }, 2);
    }
    let r = (t.Resources || []).filter((n) => n.type == "img").map((n) => n.src);
    return new Promise((n, o) => {
      if (r.length == 0)
        return s(), void n(!0);
      st.whenAllImagesLoaded(r).then(() => {
        s(), n(!0);
      }).catch((l) => {
        o(l);
      });
    });
  }
  _reloadTest() {
    return this.toJSONWithBase64().then((t) => (console.log("json", t), this.fromJSON(t)));
  }
  _clear() {
    this.renderSystem.pause(), this.styleSystem.clear(), this.animationSystem.cancelAll();
    let t = this.viewLayers.slice();
    for (let e of t)
      this.removeLayer(e);
    this.camera.reset(), this.inputSystem.reset(), this.selectedGroup.reset();
  }
  _showMemoryUsage() {
    setInterval(() => {
      console.log(Gt.getMemoryInfo());
    }, 1e3);
  }
  destroy(t) {
    if (this.destroyed)
      throw new Error("Stage has been destroyed already.");
    this.destroyed = !0, this._clear(), this._resizeObserver && this._resizeObserver.disconnect(), this._resizeTimer && clearInterval(this._resizeTimer), this.handlerLayer.destroy(), this.viewLayers.forEach((e) => {
      e.destroy();
    }), this.domElement.innerHTML = "", t != 0 && st.clearCache();
  }
}
var un = Object.defineProperty, pn = Object.getOwnPropertyDescriptor, Ze = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? pn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && un(t, e, r), r;
};
class Le extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r);
  }
  getSegmentCount() {
    return 2;
  }
  _updatePoints() {
    const t = this._calcAZ(), e = t[0], i = t[1];
    let s;
    s = e.x == i.x || e.y == i.y ? N.middle(e, i) : this.direction == rt.horizontal ? { x: i.x, y: e.y } : { x: e.x, y: i.y };
    let r = this._state.points;
    return r.length = 0, r.push(e, s, i), r;
  }
  get direction() {
    return this._direction;
  }
  set direction(t) {
    this._direction = t;
  }
}
Ze([u("LShapeLink")], Le.prototype, "className", 2), Ze([u(S.prototype._serializers.concat(["direction"]))], Le.prototype, "_serializers", 2), Ze([u(rt.horizontal)], Le.prototype, "_direction", 2);
var gn = Object.defineProperty, yn = Object.getOwnPropertyDescriptor, Qe = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? yn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && gn(t, e, r), r;
};
class Pe extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.direction = "horizontal";
  }
  _updatePoints() {
    let t = this._calcAZ(), e = t[0], i = t[1], s = this.getCtrlPoint(e.x, e.y, i.x, i.y), r = this._state.points;
    return r.length = 0, r.push(e, s, i), r;
  }
  translateWith(t, e) {
    return super.translateWith(t, e), this.ctrlPoint != null && (this.ctrlPoint.x += t, this.ctrlPoint.y += e), this;
  }
  autoCalcCtrlPoint(t, e, i, s) {
    let r = (t + i) / 2, n = (e + s) / 2;
    return this.direction == rt.horizontal ? n += (s - e) / 2 : n -= (s - e) / 2, { x: r, y: n };
  }
  getCtrlPoint(t, e, i, s) {
    return this.ctrlPoint != null ? this.ctrlPoint : this.autoCalcCtrlPoint(t, e, i, s);
  }
  setCtrlPoint(t) {
    this.ctrlPoint = t, this.markMatrixDirty();
  }
  resetCtrlPoint() {
    this.ctrlPoint = void 0, this.markMatrixDirty();
  }
  _getOBBPoints() {
    this.points = this._updatePoints();
    let t = this.points;
    const e = ze._getQuadBezierExtremas(t[0], t[1], t[2]);
    if (e.length == 0)
      return t;
    let i = [t[0], t[2]];
    for (let s = 0; s < e.length; s++)
      i.push(this.getPoint(e[s]));
    return i;
  }
  getPoint(t) {
    let e = this.getPoints(), i = e[0], s = e[1], r = e[2], n = (1 - t) * (1 - t);
    return { x: n * i.x + 2 * (1 - t) * t * s.x + t * t * r.x, y: n * i.y + 2 * (1 - t) * t * s.y + t * t * r.y };
  }
  getLocalPoint(t, e) {
    return this.getPoint(t);
  }
  _getBeginVec() {
    let t = this.points[0], e = this.getPoint(0.01), i = [t.x - e.x, t.y - e.y];
    return T.normalize(i, i);
  }
  _getEndVec() {
    let t = this.getPoint(0.9), e = this.points[this.points.length - 1], i = [e.x - t.x, e.y - t.y];
    return T.normalize(i, i);
  }
  hitTest(t, e) {
    if (this._preHitTest(t, e))
      return !0;
    let i = this._obb.aabb, s = this.getComputedStyle().lineWidth || 0, r = Math.max(0.5 * s, this._pickPrecision);
    if (!i.contains(t, e, r))
      return !1;
    let n = this.worldToLocalXY(t, e);
    return this._measureDistance(n.x, n.y).dist < r;
  }
  _measureDistance(t, e) {
    let i = this.getPoints(), s = i[0], r = i[1], n = i[2];
    return ze._measureDistance(t, e, s.x, s.y, r.x, r.y, n.x, n.y);
  }
}
Qe([u(q.QuadBezierLink)], Pe.prototype, "className", 2), Qe([u(new ze())], Pe.prototype, "_shape", 2), Qe([u(S.prototype._serializers.concat(["direction", j.ctrlPoint]))], Pe.prototype, "_serializers", 2);
var fn = Object.defineProperty, mn = Object.getOwnPropertyDescriptor, xe = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? mn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && fn(t, e, r), r;
};
class ae extends dt {
  constructor(t, e = 0, i = 0, s = 1, r = 1) {
    super(t, e, i, s, r), this.originPosition = "cb";
  }
  resizeToFitText() {
    const t = this.arrowsSize == null ? 8 : this.arrowsSize;
    let e = this._computedStyle.computePadding();
    return this._width = this._state.textWidth + e, this._height = this._state.textHeight + e + t, this;
  }
}
xe([u("TipNode")], ae.prototype, "className", 2), xe([u(8)], ae.prototype, "arrowsSize", 2), xe([u(Fe.getShape("Tip"))], ae.prototype, "_shape", 2), xe([u(dt.prototype._serializers.concat(["arrowsSize"]))], ae.prototype, "_serializers", 2);
var xn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, $e = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? bn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && xn(t, e, r), r;
};
class Oe extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r);
  }
  getSegmentCount() {
    return 4;
  }
  getFold1(t, e) {
    let i = (e.y - t.y) / 2, s = (e.x - t.x) / 2;
    return this._direction == rt.horizontal ? { x: t.x + s, y: t.y } : { x: t.x, y: t.y + i };
  }
  getFold2(t, e) {
    let i = (e.y - t.y) / 2, s = (e.x - t.x) / 2;
    return this._direction == rt.horizontal ? { x: e.x - s, y: e.y } : { x: e.x, y: e.y - i };
  }
  _updatePoints() {
    const t = this._calcAZ(), e = t[0], i = t[1];
    let s = this.getFold1(e, i), r = this.getFold2(e, i);
    const n = [e, s, { x: (s.x + r.x) / 2, y: (s.y + r.y) / 2 }, r, i];
    if (this.points = n, this.endArrow) {
      let o = n.length - 2;
      this.endArrow.setOriginOnLink(0, o);
    }
    return n;
  }
  get direction() {
    return this._direction;
  }
  set direction(t) {
    this._direction = t;
  }
}
$e([u("ZShapeLink")], Oe.prototype, "className", 2), $e([u(S.prototype._serializers.concat(["direction"]))], Oe.prototype, "_serializers", 2), $e([u(rt.horizontal)], Oe.prototype, "_direction", 2);
const mi = function() {
};
mi.prototype = { calculate: function(a, t) {
  this.dx = a.x - t.x, this.dy = a.y - t.y, this.d2 = this.dx * this.dx + this.dy * this.dy, this.d = Math.sqrt(this.d2);
} };
class Dn {
  constructor(t, e, i) {
    this.originEdges = [], this.nodes = [], this.uuid = 0, this.frame_width = e, this.frame_height = i, this.origin = t, this.initialize();
    let s = this;
    mt.travel(t, function(r, n) {
      r._fid_ = ++s.uuid;
    }), this.initNodes(t), window.layout = this;
  }
  initNodes(t) {
    let e = this;
    mt.travel(t, function(i, s) {
      if (i.isNode && s != null) {
        let r = s, n = i;
        r == t && e.setOriginEdgeWeight(n, e.originWeight);
        let o = 1 | n.mass;
        e.addNode(n, o);
        let l = 30;
        e.addLink(r, n, l);
      }
    });
  }
  initialize() {
    this.originWeight = 48, this.speed = 12, this.gravity = 50, this.maxForceDistance = 512, this.nodes = new Array(), this.edges = new Array(), this.originEdges = new Array();
  }
  originForce(t, e) {
    if (this.originEdges[t._fid_]) {
      if (t._fid_ != this.selectedNode) {
        let i = this.originEdges[t._fid_], s = (e.d - i) / i;
        t.force.x += s * (e.dx / e.d), t.force.y += s * (e.dy / e.d);
      }
    } else if (t._fid_ != this.selectedNode) {
      let i = this.gravity * t.mass * this.origin.mass / e.d2, s = this.maxForceDistance - e.d;
      s > 0 && (i *= Math.log(s)), i < 1024 && (t.force.x -= i * e.dx / e.d, t.force.y -= i * e.dy / e.d);
    }
  }
  attractiveForce(t, e, i) {
    let s = this.edges[t._fid_][e._fid_];
    if (s += 3 * (t.neighbors + e.neighbors), s) {
      let r = (i.d - s) / s;
      t._fid_ != this.selectedNode && (t.force.x -= r * i.dx / i.d, t.force.y -= r * i.dy / i.d), e._fid_ != this.selectedNode && (e.force.x += r * i.dx / i.d, e.force.y += r * i.dy / i.d);
    }
  }
  repulsiveForce(t, e, i) {
    let s = this.gravity * t.mass * e.mass / i.d2, r = this.maxForceDistance - i.d;
    r > 0 && (s *= Math.log(r)), s < 1024 && (t.force.x += s * i.dx / i.d, t.force.y += s * i.dy / i.d);
  }
  doLayout() {
    this.applyForce();
  }
  applyForce() {
    for (let t = 0; t < this.nodes.length; t++) {
      let e = this.nodes[t];
      for (let s = 0; s < this.nodes.length; s++)
        if (t != s) {
          let r = this.nodes[s], n = new mi();
          n.calculate(e, r), this.getLink(e._fid_, r._fid_) != null && this.attractiveForce(e, r, n), t != this.selectedNode && this.repulsiveForce(e, r, n);
        }
      let i = new mi();
      i.calculate(this.origin, e), this.originForce(e, i), e.force.x *= this.speed, e.force.y *= this.speed, e.x += e.force.x, e.y += e.force.y, e.force.x = 0, e.force.y = 0;
    }
  }
  bounds(t) {
    let e = t.x, i = t.x + 28, s = t.y, r = t.y + 28;
    e < 0 && (t.x = 0), s < 0 && (t.y = 0), i > this.frame_width && (t.x = this.frame_width - 28), r > this.frame_height && (t.y = this.frame_height - 28);
  }
  setOriginEdgeWeight(t, e) {
    this.originEdges[t._fid_] = e;
  }
  addNode(t, e) {
    t.mass = 1 | e, t.neighbors = 0 | t.neighbors, t.force = { x: 0, y: 0 }, this.nodes.push(t);
  }
  getLink(t, e) {
    let i = this.edges[t];
    return i == null ? null : i[e];
  }
  addLink(t, e, i) {
    !this.edges[t._fid_] && (this.edges[t._fid_] = new Object()), this.edges[t._fid_][e._fid_] = i;
    try {
      t.neighbors++, e.neighbors++;
    } catch (s) {
      console.log("Error Adding Edge: " + s);
    }
  }
}
var wn = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, be = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? _n(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && wn(t, e, r), r;
};
class le extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r);
  }
  getPoint(t) {
    let e = this.getPoints(), i = e[0], s = e[e.length - 1], r = (i.x + s.x) / 2, n = (i.y + s.y) / 2, o = i.x - s.x, l = i.y - s.y, h = Math.sqrt(o * o + l * l) / 2, c = Math.atan2(l, o), d = c + Math.PI * t;
    return this.direction === rt.anticlockwise && (d = c - Math.PI * t), { x: r + h * Math.cos(d), y: n + h * Math.sin(d) };
  }
  getLocalPoint(t, e) {
    return this.getPoint(t);
  }
  _getOBBPoints() {
    this.points = this._updatePoints();
    let t = this.points[0], e = this.points[this.points.length - 1], i = [t];
    {
      let s = [], r = { x: 0.5 * (t.x + e.x), y: 0.5 * (t.y + e.y) }, n = 0.5 * N.distance(t.x, t.y, e.x, e.y);
      s.push({ x: r.x, y: r.y - n }), s.push({ x: r.x, y: r.y + n }), s.push({ x: r.x - n, y: r.y }), s.push({ x: r.x + n, y: r.y });
      for (let o = 0; o < s.length; o++)
        this._inArcSide(t, e, s[o]) && i.push(s[o]);
    }
    return i.push(e), i;
  }
  _updatePoints() {
    return this._calcAZ();
  }
  hitTest(t, e) {
    if (this._preHitTest(t, e))
      return !0;
    let i = this._obb.aabb, s = this.getComputedStyle().lineWidth || 0, r = Math.max(0.5 * s, this._pickPrecision);
    if (!i.contains(t, e, r))
      return !1;
    let n = this._obb.localPoints, o = n[0], l = n[n.length - 1], h = 0.5 * (o.x + l.x), c = 0.5 * (o.y + l.y), d = this.worldToLocalXY(t, e), g = N.distance(d.x, d.y, h, c), y = 0.5 * N.distance(o.x, o.y, l.x, l.y);
    return !(Math.abs(g - y) >= r) && this._inArcSide(o, l, d);
  }
  _inArcSide(t, e, i) {
    let s = [e.x - t.x, e.y - t.y], r = [i.x - t.x, i.y - t.y], n = T.cross(s, r);
    return this.direction === rt.anticlockwise ? n > 0 : n < 0;
  }
  _measureDistance(t, e, i) {
    let s = 0.5 * (t.x + e.x), r = 0.5 * (t.y + e.y), n = 0.5 * N.distance(t.x, t.y, e.x, e.y), o = N.distance(i.x, i.y, s, r), l = Math.atan2(t.y - r, t.x - s), h = (Math.atan2(i.y - r, i.x - s) - l) / Math.PI;
    return !this._inArcSide(t, e, i) && (o += n, h = 0), { dist: Math.abs(o - n), t: h };
  }
}
be([u(q.ArcLink)], le.prototype, "className", 2), be([u(new fs())], le.prototype, "_shape", 2), be([u(S.prototype._serializers.concat(["direction"]))], le.prototype, "_serializers", 2), be([u(rt.clockwise)], le.prototype, "direction", 2);
var vn = Object.defineProperty, Sn = Object.getOwnPropertyDescriptor, ti = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Sn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && vn(t, e, r), r;
};
class Te extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r);
  }
  translateWith(t, e) {
    return super.translateWith(t, e), this.ctrlPoint1 != null && (this.ctrlPoint1.x += t, this.ctrlPoint1.y += e), this.ctrlPoint2 != null && (this.ctrlPoint2.x += t, this.ctrlPoint2.y += e), this;
  }
  setCtrlPoint1(t) {
    this.ctrlPoint1 = t, this.markMatrixDirty();
  }
  setCtrlPoint2(t) {
    this.ctrlPoint2 = t, this.markMatrixDirty();
  }
  calcCtrlPoints(t, e) {
    if (this.ctrlPoint1 != null && this.ctrlPoint2 != null)
      return [this.ctrlPoint1, this.ctrlPoint2];
    const i = Math.abs(e.x - t.x), s = Math.max(0.5 * i, 50);
    return [{ x: t.x + s, y: t.y }, { x: e.x - s, y: e.y }];
  }
  resetCtrlPoint() {
    this.ctrlPoint1 = void 0, this.ctrlPoint2 = void 0, this.markMatrixDirty();
  }
  _getOBBPoints() {
    this.points = this._updatePoints();
    let t = this.points;
    const e = Ie._getCubicBezierExtremas(t[0], t[1], t[3], t[4]);
    if (e.length == 0)
      return t;
    let i = [t[0], t[4]];
    for (let s = 0; s < e.length; s++)
      i.push(this.getPoint(e[s]));
    return i;
  }
  getPoint(t) {
    let e = this.getPoints(), i = e[0], s = e[1], r = e[3], n = e[4], o = (1 - t) * (1 - t) * (1 - t), l = 3 * (1 - t) * (1 - t) * t, h = 3 * (1 - t) * t * t, c = t * t * t;
    return { x: o * i.x + l * s.x + h * r.x + c * n.x, y: o * i.y + l * s.y + h * r.y + c * n.y };
  }
  getLocalPoint(t, e) {
    return this.getPoint(t);
  }
  _updatePoints() {
    let t = this._state.points;
    t.length = 0;
    const e = this._calcAZ(), i = e[0], s = e[1];
    let r = { x: (i.x + s.x) / 2, y: (i.y + s.y) / 2 }, n = this.calcCtrlPoints(i, s), o = n[0], l = n[1];
    return t.push(i, o, r, l, s), t;
  }
  hitTest(t, e) {
    if (this._preHitTest(t, e))
      return !0;
    let i = this._obb.aabb, s = this.getComputedStyle().lineWidth || 0, r = Math.max(0.5 * s, this._pickPrecision);
    if (!i.contains(t, e, r))
      return !1;
    let n = this.worldToLocalXY(t, e);
    return this._measureDistance(n.x, n.y).dist < r;
  }
  _measureDistance(t, e) {
    let i = this.getPoints(), s = i[0], r = i[1], n = i[3], o = i[4];
    return Ie._measureDistance(t, e, s.x, s.y, r.x, r.y, n.x, n.y, o.x, o.y);
  }
}
ti([u(q.BezierLink)], Te.prototype, "className", 2), ti([u(new Ie())], Te.prototype, "_shape", 2), ti([u(S.prototype._serializers.concat([j.ctrlPoint1, j.ctrlPoint2]))], Te.prototype, "_serializers", 2);
var kn = Object.defineProperty, Cn = Object.getOwnPropertyDescriptor;
class Cs extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r);
  }
  clearPath() {
    const t = this.path.anchorProxyList;
    for (let e = 1; e < t.length - 1; e++) {
      let i = t[e];
      i.isDisplayObjectHost() && i.host.removeOutLink(this);
    }
    t.length = 0;
  }
  setPath(t) {
    if (t.length < 2)
      throw new Error("path length is less than 2");
    this.clearPath();
    let e = t.map((i) => {
      if (i instanceof A)
        return i;
      if (i instanceof _)
        return i.getAnchor(Yt.center);
      if (N.isLikePoint(i)) {
        let s = i;
        return new A(new X(s.x, s.y));
      }
      throw new Error("unknow target type:" + i);
    });
    super._setProxies(e), this.markMatrixDirty();
  }
}
((a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Cn(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  i && r && kn(t, e, r);
})([u(q.PathLinkName)], Cs.prototype, "className", 2);
const Gi = ["#475164", "#2d2e36", "#FA7E23", "#FF9900", "#FED71A", "#2bae85", "#248067", "#12A182", "#5e5314", "#1ba784", "#0f1423", "#4E7ca1", "#2474b5", "#2775B6", "#346c9c", "#61649f", "#C06f98", "#7e2065", "#681752", "#EE3f4d", "#C02c38"];
function Mn() {
  let a = Math.random() * Gi.length | 0;
  return Gi[a];
}
var An = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, se = (a, t, e, i) => {
  for (var s, r = i > 1 ? void 0 : i ? Ln(t, e) : t, n = a.length - 1; n >= 0; n--)
    (s = a[n]) && (r = (i ? s(t, e, r) : s(r)) || r);
  return i && r && An(t, e, r), r;
};
class vt extends S {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.absorb = Tt.AutoFoldLinkAbsorb;
  }
  getSegmentCount() {
    return 5;
  }
  getCtrlPoints() {
    let t = N.mergeClosestPoints(this.points).length;
    return t < 4 ? [j.begin, j.end] : t == 4 || t == 5 ? [j.begin, j.end, j.fold1, j.fold2] : [j.begin, j.end, j.fold1, j.fold2, j.middle];
  }
  setBeginOffsetGap(t) {
    this.beginOffsetGap = t, this.markMatrixDirty();
  }
  setEndOffsetGap(t) {
    this.endOffsetGap = t, this.markMatrixDirty();
  }
  _calcFold1(t, e) {
    let i = this.beginOffsetGap, s = this._calcFold1Dir(t, e), r = { x: t.x + s[0] * i, y: t.y + s[1] * i }, n = this.fold1Offset;
    return n && (r.x += n.x, r.y += n.y), r;
  }
  _calcFold2(t, e) {
    let i = this.endOffsetGap, s = this._calcFold2Dir(t, e), r = { x: e.x + s[0] * i, y: e.y + s[1] * i }, n = this.fold2Offset;
    return n && (r.x += n.x, r.y += n.y), r;
  }
  _calcFold1Dir(t, e) {
    let i = Ki(this.begin);
    return i[0] == 0 && i[1] == 0 && (i = T.normalize([], [e.x - t.x, 0])), i;
  }
  _calcFold2Dir(t, e) {
    let i = Ki(this.end);
    return i[0] == 0 && i[1] == 0 && (i = T.normalize([], [t.x - e.x, 0])), i;
  }
  _updatePoints() {
    const t = this._calcAZ();
    let e = t[0], i = t[1];
    const s = this.absorb;
    let r = this._calcFold1Dir(e, i);
    if (r[0] == 0 && Math.abs(e.x - i.x) < s) {
      let g = 0.5 * (e.x + i.x);
      e.x = g, i.x = g;
    }
    if (r[1] == 0 && Math.abs(e.y - i.y) < s) {
      let g = 0.5 * (e.y + i.y);
      e.y = g, i.y = g;
    }
    let n = this._calcFold1(e, i), o = this._calcFold2(e, i);
    const l = function(g, y, f, m, p) {
      let x = g._calcFold1Dir(y, f), w = g._calcFold2Dir(y, f);
      const k = T.dot(x, w);
      if (k > 0) {
        const L = ei(m, p, x, w);
        return [L, L];
      }
      if (k < 0) {
        const L = N.middle(m, p);
        return [ei(m, L, x, x), ei(p, L, w, w)];
      }
      const b = Es(y, m, f, p, !0);
      return b == null ? Math.abs(y.x - m.x) < 1e-7 && Math.abs(y.y - m.y) < 1e-7 ? [y, m] : Math.abs(f.x - p.x) < 1e-7 && Math.abs(f.y - p.y) < 1e-7 ? [f, p] : [y, f] : [b, b];
    }(this, e, i, n, o);
    let h = l[0], c = l[1];
    {
      if (N.looksSame(h, c, 0.5) == 0) {
        const y = Math.abs(N.getAngle(h.x, h.y, c.x, c.y)).toFixed(6);
        this._preAngle != null && this._preAngle != y && (this.centerOffset = null), this._preAngle = y;
      }
      let g = this.centerOffset;
      g && (h.x += g.x, h.y += g.y, c.x += g.x, c.y += g.y);
    }
    let d = this._state.points;
    return d.length = 0, d.push(e, n, h, c, o, i), d;
  }
  _afterUpdateMatrix() {
    super._afterUpdateMatrix(), this._needCalcOffset() && (this.points = this._updatePoints());
  }
  setFold1Offset(t, e) {
    let i = this.fold1Offset;
    i == null && (i = { x: 0, y: 0 }, this.fold1Offset = i), Ft(this.getK(0.5, 0)) ? (i.y = 0, e = 0) : (i.x = 0, t = 0), i.x += t, i.y += e, this.markMatrixDirty();
  }
  setFold2Offset(t, e) {
    let i = this.fold2Offset;
    i == null && (i = { x: 0, y: 0 }, this.fold2Offset = i), Ft(this.getK(0.5, 4)) ? (i.y = 0, e = 0) : (i.x = 0, t = 0), i.x += t, i.y += e, this.markMatrixDirty();
  }
  setCenterOffset(t, e) {
    let i = this.centerOffset;
    i == null && (i = { x: 0, y: 0 }, this.centerOffset = i), Ft(this.getK(0.5, 2)) ? (i.x = 0, t = 0) : (i.y = 0, e = 0), i.x += t, i.y += e, this.markMatrixDirty();
  }
  resetOffset() {
    this.centerOffset = void 0, this.fold1Offset = null, this.fold2Offset = null, this.markMatrixDirty();
  }
}
function qi(a, t) {
  return Math.abs(t[0]) > Math.abs(t[1]) ? a.x * Math.sign(t[0]) : a.y * Math.sign(t[1]);
}
function ei(a, t, e, i) {
  let s = qi(a, e), r = qi(t, i), n = e[0] != 0;
  return s > r ? n ? { x: a.x, y: t.y } : { x: t.x, y: a.y } : n ? { x: t.x, y: a.y } : { x: a.x, y: t.y };
}
function Ki(a, t, e) {
  let i = a.anchor, s = a.host, r = [0, 0];
  if (i instanceof kt)
    r = i.getNormal();
  else if (i instanceof G)
    r = i.getNormal();
  else if (i instanceof lt) {
    let n = i.segIndex, o = i.t, l = s.getLocalPoint(o, n);
    if (s instanceof _) {
      let h = s._positionToLocalPoint(Yt.center), c = l.x - h.x, d = l.y - h.y;
      r = Math.abs(c) > Math.abs(d) ? [Math.sign(c), 0] : [0, Math.sign(d)];
    } else if (s instanceof S) {
      let h = s.points[n], c = s.points[n + 1];
      r = T.normalize([], [c.x - h.x, c.y - h.y]), r = [-r[1], r[0]];
    }
  }
  return a.host && a.host.scaleX < 0 && (r[0] = -r[0]), a.host && a.host.scaleY < 0 && (r[1] = -r[1]), r = Math.abs(r[0]) > Math.abs(r[1]) ? [Math.sign(r[0]), 0] : [0, Math.sign(r[1])], r;
}
let re;
function zn(a) {
  let t = new KeyboardEvent(a.type, a), e = t.preventDefault;
  if (t.preventDefault = function() {
    a.preventDefault(), e.call(this);
  }, t.previous = re, re) {
    const i = a.key == re.key;
    let s = t.time - re.time;
    i && s < 400 && (t.isDouble = !0);
  }
  return re = t, t;
}
se([u(q.AutoFoldLink)], vt.prototype, "className", 2), se([u(new ys())], vt.prototype, "_shape", 2), se([u(15)], vt.prototype, "beginOffsetGap", 2), se([u(15)], vt.prototype, "endOffsetGap", 2), se([u(S.prototype._serializers.concat(["beginOffsetGap", "endOffsetGap", q.fold1Offset, q.fold2Offset, q.centerOffset]))], vt.prototype, "_serializers", 2), [new G(gt.lt, M.ADJUST), new G(gt.rt, M.ADJUST), new G(gt.lb, M.ADJUST), new G(gt.rb, M.ADJUST), new G(gt.lm, M.CONNECT_EDIT), new G(gt.ct, M.CONNECT_EDIT), new G(gt.rm, M.CONNECT_EDIT), new G(gt.cb, M.CONNECT_EDIT), new G(gt.center, M.ADJUST), new de(gt.auto)].forEach((a) => {
  qt.DefaultAnchors.set(a.name, a);
}), C._sysRegFunction(B.LinkBegin, (a) => a.points[0]), C._sysRegFunction(B.LinkEnd, (a) => a.points[a.points.length - 1]), C._sysRegFunction(B.LinkCenter, (a) => a.getPoint(0.5));
const fe = new K(B.LinkBegin, M.CONNECT_EDIT | M.ADJUST);
fe.pointermoveHandler = function(a, t, e) {
  t.inputSystem.isPointerDown && (a instanceof vt && a.resetOffset(), a.setBegin({ x: e.x, y: e.y }), a.updateMatrix());
};
const ge = new K(B.LinkEnd, M.CONNECT_EDIT | M.ADJUST);
ge.pointermoveHandler = function(a, t, e) {
  t.inputSystem.isPointerDown && (a instanceof vt && a.resetOffset(), a.setEnd({ x: e.x, y: e.y }), a.updateMatrix());
}, [fe, ge, new K(B.LinkCenter, M.CONNECT)].forEach((a) => {
  Zt.DefaultAnchors.set(a.name, a);
});
{
  C._sysRegFunction(B.AutoFoldLinkCenter, (i) => N.middle(i.points[2], i.points[3])), C._sysRegFunction(B.AutoFoldLinkFold1, (i) => i.points[1]), C._sysRegFunction(B.AutoFoldLinkFold2, (i) => i.points[4]);
  const a = new K(B.AutoFoldLinkFold1, M.ADJUST);
  a.pointermoveHandler = function(i, s, r) {
    if (s.inputSystem.isPointerDown) {
      let h = A.calcPointByAnchor(i, this);
      const c = r.x - h.x, d = r.y - h.y;
      return i.setFold1Offset(c, d), void i.updateMatrix();
    }
    let n = i.points[0], o = i.points[1], l = null;
    l = Ft(i.getK(0.5, 0)) ? o.x > n.x ? F.w_resize : F.e_resize : o.y > n.y ? F.s_resize : F.n_resize, s.setCursor(l);
  };
  const t = new K(B.AutoFoldLinkFold2, M.ADJUST);
  t.pointermoveHandler = function(i, s, r) {
    if (s.inputSystem.isPointerDown) {
      let c = A.calcPointByAnchor(i, this);
      const d = r.x - c.x, g = r.y - c.y;
      return i.setFold2Offset(d, g), void i.updateMatrix();
    }
    const n = Ft(i.getK(0.5, 4));
    let o = i.points[4], l = i.points[5], h = null;
    h = n ? o.x > l.x ? F.w_resize : F.e_resize : o.y > l.y ? F.s_resize : F.n_resize, s.setCursor(h);
  };
  const e = new K(B.AutoFoldLinkCenter, M.ADJUST);
  e.pointermoveHandler = function(i, s, r) {
    if (s.inputSystem.isPointerDown) {
      let o = A.calcPointByAnchor(i, this);
      const l = r.x - o.x, h = r.y - o.y;
      return i.setCenterOffset(l, h), void i.updateMatrix();
    }
    let n = null;
    n = Ft(i.getK(0.5, 2)) ? F.s_resize : F.e_resize, s.setCursor(n);
  }, [fe, ge, new lt(j.mid1, 1, 1), new lt(j.mid2, 1, 2), a, t, e].forEach((i) => {
    ys.DefaultAnchors.set(i.name, i);
  });
}
{
  C._sysRegFunction(B.QuadBezierLinkCtrlPoint, (t) => {
    if (t.ctrlPoint != null)
      return t.ctrlPoint;
    let e = t.getPoints();
    return t.getCtrlPoint(e[0].x, e[0].y, e[2].x, e[2].y);
  });
  let a = new K(B.QuadBezierLinkCtrlPoint, M.ADJUST);
  a.pointermoveHandler = function(t, e, i) {
    e.inputSystem.isPointerDown && (t.ctrlPoint == null ? t.setCtrlPoint(A.calcPointByAnchor(t, this)) : (t.ctrlPoint.x += i.x - t.ctrlPoint.x, t.ctrlPoint.y += i.y - t.ctrlPoint.y, t.setCtrlPoint(t.ctrlPoint)));
  }, [fe, ge, a, new K(B.LinkCenter, M.CONNECT)].forEach((t) => {
    ze.DefaultAnchors.set(t.name, t);
  });
}
{
  C._sysRegFunction(B.BezierLinkCtrlPoint1, (e) => e.ctrlPoint1 != null ? e.ctrlPoint1 : e.getPoints()[1]), C._sysRegFunction(B.BezierLinkCtrlPoint2, (e) => e.ctrlPoint2 != null ? e.ctrlPoint2 : e.getPoints()[3]);
  const a = new K(B.BezierLinkCtrlPoint1, M.ADJUST);
  a.pointermoveHandler = function(e, i, s) {
    i.inputSystem.isPointerDown && (e.ctrlPoint1 == null ? e.setCtrlPoint1(A.calcPointByAnchor(e, this)) : (e.ctrlPoint1.x += s.x - e.ctrlPoint1.x, e.ctrlPoint1.y += s.y - e.ctrlPoint1.y, e.setCtrlPoint1(e.ctrlPoint1)));
  };
  const t = new K(B.BezierLinkCtrlPoint2, M.ADJUST);
  t.pointermoveHandler = function(e, i, s) {
    i.inputSystem.isPointerDown && (e.ctrlPoint2 == null ? e.setCtrlPoint2(A.calcPointByAnchor(e, this)) : (e.ctrlPoint2.x += s.x - e.ctrlPoint2.x, e.ctrlPoint2.y += s.y - e.ctrlPoint2.y, e.setCtrlPoint2(e.ctrlPoint2)));
  }, [fe, ge, a, t].forEach((e) => {
    Ie.DefaultAnchors.set(e.name, e);
  });
}
C._sysRegClasses([xt, W, _, dt, zt, Wt, Ne, Et, Xt, je, ae, ue, S, Le, Oe, Pe, le, Te, Cs, vt, kt, G, lt, K, de, X]);
export {
  pe as AENode,
  $ as Anchor,
  En as AnchorClassNameMap,
  Ks as AnchorClazzType,
  Gs as AnchorIOType,
  qs as AnchorOffsetType,
  A as AnchorProxy,
  M as AnchorUsageType,
  Is as Animation,
  dr as AnimationSystem,
  le as ArcLink,
  ds as ArrowShape,
  Fe as Assets,
  or as AssetsClass,
  de as AutoAnchor,
  vt as AutoFoldLink,
  Te as BezierLink,
  Jr as Camera,
  Fi as CameraEvent,
  Ne as CanvasNode,
  gt as ConnectToNodePosition,
  F as Cursor,
  Ce as Debug,
  Yi as DefaultDarkTheme,
  Ae as DefaultLightTheme,
  us as DiamondShape,
  rt as Direction,
  je as EllipseNode,
  hs as EllipseShape,
  Ct as EventTarget,
  X as FixedPointAnchor,
  It as FontInfo,
  ki as FontUtil,
  Dn as ForceDirectLayout,
  K as FunctionAnchor,
  B as FunctionName,
  H as GeomUtils,
  Re as Graph,
  gi as GraphSystem,
  Ss as HandlerLayer,
  Xt as HtmlNode,
  zt as ImageNode,
  he as ImageUtil,
  Fs as InputSystem,
  Vt as Intersect,
  Tn as JTType,
  St as JTopoEvent,
  js as Keyboard,
  Le as LShapeLink,
  W as Layer,
  Zr as LayoutSystem,
  jt as LinearGradient,
  S as Link,
  q as LinkConst,
  j as LinkPosition,
  kt as NDCAnchor,
  U as NE,
  He as NEHelper,
  _ as Node,
  mt as NodeHelper,
  G as NodePositionAnchor,
  Pn as ObjectName,
  Cs as PathLink,
  N as Point,
  bt as PolygonShape,
  Pe as QuadBezierLink,
  Bt as RadialGradient,
  Yt as RectPosition,
  ri as RectPositionNormalized,
  is as RectPositionUnitNormals,
  vi as RectShape,
  v as Rectangle,
  er as RegShape,
  C as RegSystem,
  Hs as ResourceEvent,
  st as ResourceSystem,
  Xs as ResourceSystemBase,
  lt as SegmentAnchor,
  dn as SelectedGroup,
  ks as SelectedGroupEvent,
  hi as SerializerSystem,
  qt as Shape,
  Rt as ShapeBuilder,
  Et as ShapeNode,
  ue as SpriteNode,
  Be as Stage,
  ie as StageEvent,
  ot as StageMode,
  xt as Style,
  ft as StylePattern,
  tn as StyleSystem,
  et as TextAlign,
  it as TextBaseline,
  dt as TextNode,
  ht as TextPosition,
  ye as Theme,
  vs as ThemeContent,
  ae as TipNode,
  Me as TipShape,
  Y as Transform,
  cs as TriangleShape,
  bi as VERSION,
  Wt as VideoNode,
  Oe as ZShapeLink,
  On as _V,
  Ni as convertToAnchorProxy,
  zn as copyKeyboardEvent,
  Ys as delayRun,
  Mn as randomColor,
  u as setProto,
  Gt as util
};
