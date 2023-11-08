import { effectWatch, reactive } from './core/index.js'

const App = {
  render(context) {
    effectWatch(() => {
      // 下面这种至少存在以下两点问题：
      // 1. 优化：更新时需要将 #app 这个元素里的所有内容删除后再重新渲染，非常消耗性能，如何优化，找到最小更新块？diff算法！
      // 2. 跨平台：以下创建节点已经固定使用 DOM api了，不容易进行跨平台迁移，如何抽象？h函数！
      document.querySelector('#app').textContent = ``
      const element = document.createElement('div')
      const text = document.createTextNode('halo ')
      const text1 = document.createTextNode(context.obj.count)
      
      element.append(text)
      element.append(text1)
      document.querySelector('#app').append(element)
    })
  },

  setup(){
    const obj = reactive({ 
      count: 1
    })

    window.obj = obj

    return {
      obj
    }
  }
}

App.render(App.setup())