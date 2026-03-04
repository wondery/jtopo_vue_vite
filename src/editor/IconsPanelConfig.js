

// 左侧图元面板配置
export const IconsPanelConfig = {
    items: [
        {
            name: '矩形',
            className: 'Node',
            iconHtml: `
                <svg width="100%" height="100%">
                <rect width="30" height="22" x="6" y = "9"
                stroke="black" stroke-width="1" fill="white"/>
                </svg>
            `,
            properties: {
                text: '文字',
                width: 80,
                height: 50
            }
        },
        {
            name: '圆形',
            className: 'EllipseNode',
            iconHtml: `
            <svg width="100%" height="100%">
            <circle cx="20" cy="20" r="15" 
                stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                text: '圆形',
                width: 50,
                height: 50,
            }
        },
        {
            name: '三角形',
            shape: 'Triangle',
            iconHtml: `
            <svg width="100%" height="100%">
                <polygon points="20,0 40,40 0,40" stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                width: 50,
                height: 50,
            }
        },
        {
            name: '菱形',
            shape: 'Diamond',
            iconHtml: `
            <svg width="100%" height="100%">
                <polygon points="20,0 40,20 20,40 0,20" stroke="black" stroke-width="1" fill="white"/>
            </svg>`,
            properties: {
                width: 50,
                height: 50,
            }
        },
        {
            name: '直线',
            className: 'Link',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="21" x2="35" y2="21" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '直线',
            },
            styles: {
                'lineWidth': 1,
            }
        },
        {
            name: '折线',
            className: 'AutoFoldLink',
            iconHtml: `
            <svg width="100%" height="100%">
            <line x1="5" y1="10" x2="30" y2="10" stroke="black" stroke-width="1"/>
            <line x1="30" y1="10" x2="30" y2="35" stroke="black" stroke-width="1"/>
            </svg>`,
            properties: {
                text: '折线',
            },
            styles: {
                'lineWidth': 1,
            }
        },

        {
            name: '文字',
            className: 'TextNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                文字
            </div>`,
            properties: {
                text: '文本文字',
                width: 80,
                height: 50,
                autoSize: false,
            },
            styles: {
                font: 'bold 12px arial',
                color: 'gray',
            }
        },
        {
            name: '单元',
            className: 'ImageNode',
            iconHtml: `<img width="100%" style="padding:2px;" src="./assets/img/unit.png"/>`,
            properties: {
                text: '单元',
                width: 50,
                height: 50,
                image: './assets/img/unit.png'
            }
        },
        {
            name: '涟漪动效',
            className: 'com.jtopo.extensions.RipplingNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                涟漪
            </div>`,
            styles: {
                'lineWidth': 5,
                'strokeStyle': 'red',
            },
            properties: {
                width: 50,
                height: 50,
            }
        },
        {
            name: '液体动效',
            className: 'com.jtopo.extensions.WaterLikeNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                液体
            </div>`,
            properties: {
                width: 50,
                height: 50,
            }
        },
        {
            name: '闪烁指示动效',
            className: 'com.jtopo.extensions.BlinkingArrowNode',
            iconHtml: `
            <div width="100%" height="100%" style="font-size:12px;padding-left:7px;padding-top:10px;font-weight:bold;">
                指示
            </div>`,
            properties: {
                text: '闪烁',
                width: 100,
                height: 50,
            },
            styles: {
                'lineWidth': 5,
                'strokeStyle': 'green',
            }
        }
    ]
};