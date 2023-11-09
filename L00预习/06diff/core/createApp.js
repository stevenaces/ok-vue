import { effectWatch } from './index.js'
import { mountElement, diff } from './renderer.js'

export function createApp(rootComponent) {
  // debugger
  // app
  return {
    mount(rootContainer) {
      // 0. 根组件 setup
      const setupResult = rootComponent.setup()

      let prevTree
      let isMounted = false

      effectWatch(() => {
        if(!isMounted){
          // 初次挂载
          isMounted = true
          const subTree = rootComponent.render(setupResult)
          prevTree = subTree
          mountElement(subTree, rootContainer)
        }else{
          // 更新
          const subTree = rootComponent.render(setupResult)
          diff(prevTree, subTree)
          prevTree = subTree
        }
      })
    },
  }
}
