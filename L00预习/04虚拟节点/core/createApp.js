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

        // 2. 获取更新元素
        // const element = rootComponent.render(setupResult)
        const subTree = rootComponent.render(setupResult)
        console.log('subTree:', subTree)

        // 3. 重新渲染内容（因为上一步返回的是vnode，所以不能直接挂载了，将在下一节封装mountElement来挂载dom节点）
        // rootContainer.append(element)
      })
    },
  }
}
