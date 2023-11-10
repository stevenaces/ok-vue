function createElement(tag) {
  return document.createElement(tag)
}

function patchProps(el, key, prevValue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, nextValue)
  }
}

function insert(el, parent) {
  parent.append(el)
}

function remove(el, parent) {
  parent.removeChild(el)
}

function createTextNode(text) {
  return document.createTextNode(text)
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode

  // 1. 创建tag元素并挂载到虚拟节点上
  const el = (vnode.el = createElement(tag))

  // 2. 处理props
  for (const key in props) {
    const val = props[key]
    patchProps(el, key, null, val)
  }

  // 3. 处理children
  if (typeof children === 'string') {
    insert(createTextNode(children), el)
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v, el)
    })
  }

  insert(el, container)
}

// n1 -> old
// n2 -> new
export function diff(n1, n2) {
  // 1. tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(createElement(n2.tag))
    // 递归更新
    // const container = createElement('div')
    // mountElement(n2, container)
    // n1.el.replaceWith(container)
  } else {
    const el = (n2.el = n1.el)

    // 2. props

    // 2.1
    // new {a, b}
    // old {a}
    // r -> add b
    const { props: newProps } = n2
    const { props: oldProps } = n1

    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] != oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key])
        }
      }
    }

    // 2.2
    // new {a}
    // odl {a, b}
    // r -> remove b
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null)
        }
      }
    }

    // 3. children
    const { children: newChildren } = n2
    const { children: oldChildren } = n1

    // 3.1 newChildren -> string, oldChildren -> string
    // 3.2 newChildren -> string, oldChildren -> array
    // 3.3 newChildren -> array, oldChildren ->  string
    // 3.4 newChildren -> array, oldChildren ->  array

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        // 3.1
        if (newChildren !== oldChildren) {
          el.innerText = newChildren
        }
      } else if (Array.isArray(oldChildren)) {
        // 3.2
        el.innerText = newChildren
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        // 3.3
        el.innerText = ''
        newChildren.forEach((v) => {
          mountElement(v, el)
        })
      } else if (Array.isArray(oldChildren)) {
        // 3.4

        const length = Math.min(newChildren.length, oldChildren.length)

        // 3.4.1
        // newChildren -> [a, b, c]
        // oldChildren -> [a, b, c]
        // 长度相同，依次对比

        for (let i = 0; i < length; i++) {
          const newVNode = newChildren[i]
          const oldVNode = oldChildren[i]
          diff(oldVNode, newVNode)
        }

        //  3.4.2
        // newChildren -> [a, b, c]
        // oldChildren -> [a, b]
        // add c node
        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            mountElement(newChildren[i], el)
          }
        }

        // 3.4.3
        // newChildren -> [a, b]
        // oldChildren -> [a, b, c]
        // remove c node
        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vnode = oldChildren[i]
            remove(vnode.el, el)
          }
        }
      }
    }
  }
}
