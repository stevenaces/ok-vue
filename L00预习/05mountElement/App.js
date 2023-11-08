import { reactive, h } from './core/index.js'

export default {
  // 实际框架中，就是将 template -> render 函数
  render(context) {
    // 使用虚拟节点表示
    // return h('div', {}, 'steven')
    return h('div', {}, [h('p', {}, 'halo'), h('h', {}, String(context.obj.count))])
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
