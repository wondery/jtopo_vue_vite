import { Link } from '@jtopo/core';

// 传送带
export class Transporter {
    goodsList = [];

    begin = null;
    end = null;

    animation = null;
    timer = null;

    stage = null;

    frontLink = null;

    constructor(stage, begin, end) {
        this.stage = stage;
        this.begin = begin;
        this.end = end;

        const backLink = new Link(null, begin, end);
        backLink.setStyles({
            strokeStyle: 'rgba(255,255,255,0.2)',
            lineWidth: 22,
            lineCap: 'square'
        });

        const frontLink = new Link(null, backLink, backLink, 'begin', 'end');
        frontLink.setStyles({
            strokeStyle: 'rgba(128,128,128,0.5)',
            lineWidth: 15
        });
        this.frontLink = frontLink;
        let layer = stage.getCurrentLayer();
        layer.addChildren([backLink, frontLink]);
    }

    // 把物品一次性放到传送带上
    putGoodsOn(goodsList) {
        this.goodsList = goodsList;
        let gap = 1.5;
        let count = goodsList.length;
        for (let i = 0; i < count; i++) {
            let goods = goodsList[i];
            let y = this.begin.y - (count - i - 1) * goods.height * gap;
            goods.setXY(this.begin.x, y);
        }
    }

    // 从传送带上取走一件物品
    takeOffGoods() {
        return this.goodsList.shift();
    }

    run() {
        let speed = 2500;

        this.animation = this.stage.effectSystem.flow(this.frontLink, {
            duration: speed,
            direction: 'reverse'
        });

        this.animation.play();

        let dx = this.end.x - this.begin.x;
        let dy = this.end.y - this.begin.y;

        this.timer = setInterval(() => {
            for (let goods of this.goodsList) {
                goods.x += dx / speed;
                goods.y += dy / speed;
            }
            //TODO: 物品是否超出了传送两端
        }, 30); //TODO： 60 有点随意了
    }

    stop() {
        if (this.animation) {
            this.animation.cancel();
        }
        window.clearInterval(this.timer);
    }
}
