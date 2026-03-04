import { EllipseNode, Link, Stage, Layer } from '@jtopo/core';

const Colors21 = [
    '#475164', '#2d2e36', '#FA7E23', '#FF9900', '#FED71A', '#2bae85', '#248067', '#12A182',
    '#5e5314', '#1ba784', '#0f1423', '#4E7ca1', '#2474b5', '#2775B6', '#346c9c', '#61649f',
    '#C06f98', '#7e2065', '#681752', '#EE3f4d', '#C02c38', '#681752', '#EE3f4d', '#C02c38'
];

/**
 * demo用到的工具类
 */
export class Utils {
    // 白色网格
    static LightGridImg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB4PScwJyB5PScwJyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgc3R5bGU9J2ZpbGw6cmdiKDI1NSwyNTUsMjU1KTtzdHJva2U6cmdiKDI0MCwyNDAsMjQwKTtzdHJva2Utd2lkdGg6MTsnLz48ZyBzdHlsZT0nc3Ryb2tlOnJnYigyNDAsMjQwLDI0MCk7IHN0cm9rZS13aWR0aDowLjU7Jz48cGF0aCBkPSdNIDAgMjUgSCAxMDAgTSAwIDUwIEggMTAwIE0gMCA3NSBIIDEwMCBNIDAgMTAwIEggMTAwICcvPjxwYXRoIGQ9J00gMjUgMCBWIDEwMCBNIDUwIDAgViAxMDAgTSA3NSAwIFYgMTAwIE0gMTAwIDAgViAxMDAgJy8+PC9nPjwvc3ZnPg==`;

    // 暗色网格
    static DarkGridImg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB4PScwJyB5PScwJyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgc3R5bGU9J2ZpbGw6cmdiKDM2LDM2LDM2KTtzdHJva2U6cmdiKDIwLDIwLDIwKTtzdHJva2Utd2lkdGg6MTsnLz48ZyBzdHlsZT0nc3Ryb2tlOnJnYigyMCwyMCwyMCk7IHN0cm9rZS13aWR0aDowLjU7Jz48cGF0aCBkPSdNIDAgMjUgSCAxMDAgTSAwIDUwIEggMTAwIE0gMCA3NSBIIDEwMCBNIDAgMTAwIEggMTAwICcvPjxwYXRoIGQ9J00gMjUgMCBWIDEwMCBNIDUwIDAgViAxMDAgTSA3NSAwIFYgMTAwIE0gMTAwIDAgViAxMDAgJy8+PC9nPjwvc3ZnPg==`;

    /**
     * 生成随机数
     * @param {number} min 最小值
     * @param {number} max 最大值
     * @returns {number} 随机数
     */
    static rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * 生成随机颜色
     * @returns {string} 随机颜色
     */
    static randomColor() {
        let n = Math.floor(Math.random() * Colors21.length);
        return Colors21[n];
        // return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    /**
     * 度数转弧度
     * @param {number} deg 度数
     * @returns {number} 弧度
     */
    static degToRad(deg) {
        return deg * Math.PI / 180;
    }
}


/**
 * 随机生成一颗‘树‘
 * @param {Stage} stage 舞台
 * @param {number} maxDeep 树最大深度
 * @returns {nodes: Node[], links: Link[]} 节点和连线
 */
export function randomTree(stage, maxDeep) {
    const rootNode = newNode('root');
    rootNode.setXY(0, 0);

    let nodes = [];
    let links = [];

    function newNode(text) {
        const x = Utils.rand(-stage.width / 2, stage.width / 2);
        const y = Utils.rand(-stage.height / 2, stage.height / 2);
        const node = new EllipseNode(text, x, y);
        node.setRadius(20);
        nodes.push(node);
        return node;
    }

    function newLink(nodeA, nodeZ) {
        const link = new Link('', nodeA, nodeZ, 'auto', 'auto');
        link.addClass('.link');
        links.push(link);
        return link;
    }

    function gen(parentNode, currDeep) {
        for (let i = 0; i < maxDeep; i++) {
            const node = newNode(currDeep + '-' + i);
            newLink(parentNode, node);

            if (currDeep < maxDeep) {
                if (Math.random() < 0.5 && i > 0) {
                    continue;
                }
                gen(node, currDeep + 1);
            }
        }
    }
    gen(rootNode, 1);
    return {
        nodes: nodes,
        links: links
    };
}
