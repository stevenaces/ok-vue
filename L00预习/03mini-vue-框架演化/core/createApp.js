import { effectWatch } from './index.js'

export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      // 0. 根组件 setup
      const setupResult = rootComponent.setup()

      effectWatch(() => {
        // 1. 清空根元素内容
        rootContainer.textContent = ``

        // 2. 获取跟新元素
        const element = rootComponent.render(setupResult)
        
        // 3. 重新渲染内容
        rootContainer.append(element)
      })
    },
  }
}
