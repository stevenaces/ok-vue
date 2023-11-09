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
  } else {
    // 2. props

    // 2.1
    // new {a, b}
    // old {a}
    // r -> add b
    const { props: newProps } = n2
    const { props: oldProps } = n1
    const el = (n2.el = n1.el)
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
  }

  // 3. children
}
