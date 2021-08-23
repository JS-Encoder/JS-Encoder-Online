/**
 * 对数字做格式化缩写
 */

function formatNum (num) {
  let res = ''
  if (num < 1000) {
    res = num
  } else {
    let fixNum = (num / 1000).toFixed(3)
    res = fixNum.substring(0, fixNum.length - 1) + 'k'
  }
  return res
}

export {
  formatNum
}