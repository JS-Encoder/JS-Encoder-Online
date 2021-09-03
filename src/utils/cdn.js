/**
 * 存储项目中所用到的cdn路径
 */
const externalLinks = {
  stylus: 'https://cdn.bootcdn.net/ajax/libs/stylus/0.32.1/stylus.js'
}

const iframeLinks = {
  mdCSS: [
    '/css/markdown-style.css',
    'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
  ],
  mdJS: [
    'https://cdn.bootcdn.net/ajax/libs/raphael/2.3.0/raphael.min.js',
    'https://cdn.bootcdn.net/ajax/libs/flowchart/1.15.0/flowchart.min.js'
  ],
  commonJS: [
    '/js/common/JSEController.js'
  ]
}

export {
  externalLinks,
  iframeLinks
}