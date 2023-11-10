import { reactive, h } from './core/index.js'

window.h = h

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
    // return h('div', context.obj.props, '1')

    // test children
    // case 3.1
    // newChildren string, oldChildren string
    // return h('div', {}, context.obj.children)
    // case 3.2
    // newChildren string, oldChildren array
    // return h('div', {}, context.obj.children)
    // case 3.3
    // newChildren array, oldChildren string
    // return h('div', {}, context.obj.children)
    // case 3.4
    // newChildren array, oldChildren array
    return h('div', {}, context.obj.children)
    
  },

  setup() {
    const obj = reactive({
      count: 1,
      tag: 'div',
      props: {
        a: 'a',
        b: 'b'
      },
      // children: 'aaa'
      children: [h('p', {}, '111'), h('p', {}, '222')]
    })

    // 将响应式对象 obj 挂载到 window 身上，方便调试
    window.obj = obj

    return {
      obj,
    }
  },
}
