import { reactive, h } from './core/index.js'

export default {
  // 实际框架中，就是将 template -> render 函数
  render(context) {
    // const element = document.createElement('div')
    // const text = document.createTextNode('halo ')
    // const text1 = document.createTextNode(context.obj.count)

    // element.append(text)
    // element.append(text1)

    // return element

    // 使用虚拟节点表示
    return h('div', {}, [h('p', {}, 'halo'), h('h', {}, context.obj.count)])
  },

  setup() {
    const obj = reactive({
      count: 1,
    })

    // 将响应式对象 obj 挂载到 window 身上，方便调试
    window.obj = obj

    return {
      obj,
    }
  },
}
