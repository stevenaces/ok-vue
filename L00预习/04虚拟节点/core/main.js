export class Dep {
  constructor (val) {
    this._val = val
    this.effects = new Set()
  }

  get value () {
    this.depend()
    return this._val
  }

  set value (newVal) {
    this._val = newVal
    this.notice()
  }

  depend () {
    if (activeEffect) {
      this.effects.add(activeEffect)
    }
  }

  notice () {
    this.effects.forEach((effect) => {
      effect()
    })
  }
}

let activeEffect = null
export function effectWatch (fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

// reactive

const targetMap = new Map()

function getDep (raw, key) {
  let depsMap = targetMap.get(raw)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(raw, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  return dep
}

export const reactive = (raw) => {
  return new Proxy(raw, {
    get (target, key) {
      const dep = getDep(target, key)
      dep.depend()

      return Reflect.get(target, key)
    },

    set (target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)

      dep.notice()

      return result
    }
  })
}
