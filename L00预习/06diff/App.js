import { reactive, h } from './core/index.js'

export default {
  // 实际框架中，就是将 template -> render 函数
  render(context) {
    // 使用虚拟节点表示
    // return h('div', {}, 'steven')
    // return h('div', {}, [h('p', {}, 'halo'), h('h', {}, String(context.obj.count))])

    // test 1 tag
    // return h(context.obj.tag, {}, '1')

    // test 2 props
    // case add {a} -> {a, b}
    // return h('div', context.obj.props, '1')
    // case remove {a, b} -> {a}
    return h('div', context.obj.props, '1')
  },

  setup() {
    const obj = reactive({
      count: 1,
      tag: 'div',
      props: {
        a: 'a',
        b: 'b'
      }
    })

    // 将响应式对象 obj 挂载到 window 身上，方便调试
    window.obj = obj

    return {
      obj,
    }
  },
}
