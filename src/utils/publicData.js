/**
 * 存储常用的静态公共数据
 */
const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

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
  JavaScript: ['JavaScript', 'TypeScript', 'CoffeeScript', 'JSX'],
}

// 上传文件等后缀名列表
const limitMimeType = ['html', 'css', 'js', 'jsx', 'md', 'pug', 'sass', 'scss', 'less', 'styl', 'ts', 'coffee']

// const qiNiuImgLink = isProd?'//images.lliiooiill.cn/':'//images.firstbird.asia/'
const qiNiuImgLink = isProd ? '/images/' : '/images/'

const qiNiuRowLink = 'http://images.lliiooiill.cn/'

// 加载实例封面中的图片
const defPosterKey = '%E5%B0%81%E9%9D%A2%E5%8A%A0%E8%BD%BD%E4%B8%AD.jpg'

export {
  fontFamList,
  fontSizeList,
  defPrepOpts,
  limitMimeType,
  qiNiuImgLink,
  defPosterKey,
  qiNiuRowLink
}