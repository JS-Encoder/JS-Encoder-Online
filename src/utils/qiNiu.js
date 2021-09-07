import axios from 'axios'
import api from '@service/api'

/**
 * 向七牛云获取token
 * @returns {String}
 */
async function getToken () {
  const token = await api.getQiNiuToken()
  return token
}

/**
 * 向七牛云发送图片并储存
 * @param {String} dataURL
 * @param {String} token
 * @returns {String} 图片链接
 */
async function sendImgToQiNiu (dataURL, token) {
  // 清除逗号前面的base64前缀
  dataURL = dataURL.split(',')[1]
  let imageUrl = ''
  await axios({
    method: 'post',
    url: `/qiNiu/putb64/${getBase64Size(dataURL)}`,
    data: dataURL,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': 'UpToken ' + token,
    },
  }).then((res) => {
    imageUrl = res
  })
  return imageUrl
}

/**
 * 获取base64字符串大小
 * @param {String} str 
 * @returns {Number}
 */
function getBase64Size (str) {
  //找到等号，把等号也去掉
  if (str.indexOf('=') > 0) {
    const indexOf = str.indexOf('=')
    str = str.substring(0, indexOf)
  }
  return parseInt(str.length - (str.length / 8) * 2)
}

export { getToken, sendImgToQiNiu }