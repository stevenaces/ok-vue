import { effectWatch } from './index.js'
import { mountElement } from './renderer.js'

export function createApp(rootComponent) {
  // debugger
  // app
  return {
    mount(rootContainer) {
      // 0. 根组件 setup
      const setupResult = rootComponent.setup()

      effectWatch(() => {
        // 1. 清空根元素内容
        rootContainer.textContent = ``

        // 2. 获取更新元素
        // const element = rootComponent.render(setupResult)
        const subTree = rootComponent.render(setupResult)
        console.log('subTree:', subTree)

        // 3. 重新渲染内容
        // rootContainer.append(element)
        mountElement(subTree, rootContainer)
      })
    },
  }
}
