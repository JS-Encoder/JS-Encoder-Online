const acorn = require('acorn')
import estraverse from 'estraverse'

function handleLoop (code) {
  let AST = acorn.parse(code, { ecmaVersion: 2022, sourceType: 'script' })
  const fragments = []
  let loopID = 1
  const insertCode = {
    setMonitor: 'window.JSE.InfiniteLoopController._loopMonitor(%d);',
    delMonitor: ';window.JSE.InfiniteLoopController._delLoop(%d);'
  }
  estraverse.traverse(AST, {
    enter (node) {
      switch (node.type) {
        case 'WhileStatement':
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
          let { start, end } = node.body
          start++
          let pre = insertCode.setMonitor.replace('%d', loopID)
          let aft = ''
          if (node.body.type !== 'BlockStatement') {
            pre = '{' + pre
            aft = '}'
            --start
          }
          fragments.push({ pos: start, str: pre })
          fragments.push({ pos: end, str: aft })
          fragments.push({ pos: node.end, str: insertCode.delMonitor.replace('%d', loopID) })
          ++loopID
          break
        default:
          break
      }
    }
  })
  fragments.sort((a, b) => {
    return b.pos - a.pos
  }).forEach(fragment => {
    code = code.slice(0, fragment.pos) + fragment.str + code.slice(fragment.pos)
  })

  return code
}

export default handleLoop