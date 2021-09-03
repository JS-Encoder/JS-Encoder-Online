const RED = { r: 189, g: 62, b: 65 }
const BLUE = { r: 0, g: 94, b: 197 }
const YELLOW = { r: 255, g: 141, b: 0 }
const GREEN = { r: 0, g: 139, b: 36 }

/**
 * 欧氏距离算法
 * @method getEuclideanDistance
 * @param {Number} red 0-255
 * @param {Number} green 0-255
 * @param {Number} blue 0-255
 * @returns {Object}
 */
function getEuclideanDistance (red, green, blue) {
  // 欧氏距离算法
  let r1 = (red + RED.r) / 2
  let r2 = (red + BLUE.r) / 2
  let r3 = (red + YELLOW.r) / 2
  let r4 = (red + GREEN.r) / 2

  let diffR1 = red - RED.r
  let diffR2 = red - BLUE.r
  let diffR3 = red - YELLOW.r
  let diffR4 = red - GREEN.r

  let diffG1 = green - RED.g
  let diffG2 = green - BLUE.g
  let diffG3 = green - YELLOW.g
  let diffG4 = green - GREEN.g

  let diffB1 = blue - RED.b
  let diffB2 = blue - BLUE.b
  let diffB3 = blue - YELLOW.b
  let diffB4 = blue - GREEN.b

  let varianceC1 = Math.sqrt((2 + r1 / 256) * Math.pow(diffR1, 2) + 4 * Math.pow(diffG1, 2) + (2 + (255 - r1) / 256) * Math.pow(diffB1, 2))
  let varianceC2 = Math.sqrt((2 + r2 / 256) * Math.pow(diffR2, 2) + 4 * Math.pow(diffG2, 2) + (2 + (255 - r2) / 256) * Math.pow(diffB2, 2))
  let varianceC3 = Math.sqrt((2 + r3 / 256) * Math.pow(diffR3, 2) + 4 * Math.pow(diffG3, 2) + (2 + (255 - r3) / 256) * Math.pow(diffB3, 2))
  let varianceC4 = Math.sqrt((2 + r4 / 256) * Math.pow(diffR4, 2) + 4 * Math.pow(diffG4, 2) + (2 + (255 - r4) / 256) * Math.pow(diffB4, 2))

  let list = [
    { variance: varianceC1, color: "red" },
    { variance: varianceC2, color: "blue" },
    { variance: varianceC3, color: "yellow" },
    { variance: varianceC4, color: "green" }
  ]

  list.sort((v1, v2) => {
    return v1.variance - v2.variance
  })

  return list[0]
}

export {
  getEuclideanDistance
}