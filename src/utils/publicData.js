/**
 * 存储常用的静态公共数据
 */
const fontFamList = [
  'Consolas',
  'Monaco',
  'Courier Prime',
  'JetBrains Mono',
  'Fira Code',
  'Hack',
  'Source Code Pro',
  'Space Mono',
  'IBM Plex Mono',
  'Inconsolata'
]

const fontSizeList = [10, 12, 14, 16, 18, 20, 22, 24, 26]

const defPrepOpts = {
  HTML: ['HTML', 'Markdown', 'Pug'],
  CSS: ['CSS', 'Sass', 'Scss', 'Less', 'Stylus'],
  JavaScript: ['JavaScript', 'TypeScript', 'CoffeeScript'],
}

// 上传文件等后缀名列表
const limitMimeType = ['html', 'css', 'js', 'md', 'pug', 'sass', 'scss', 'less', 'styl', 'ts', 'coffee']

const qiNiuImgLink = 'http://images.lliiooiill.cn/'

export {
  fontFamList,
  fontSizeList,
  defPrepOpts,
  limitMimeType,
  qiNiuImgLink
}