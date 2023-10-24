
class ReactiveEffect{
  private _fn: any
  constructor(fn, public scheduler?){
    this._fn = fn
  }

  run(){
    activeEffect = this
    return this._fn()
  }
}

/* 收集/触发依赖（影响面）一个重要的点是如何设计数据结构来存储 */
/*

多个对象，根据每个对象的key来存储 依赖（影响面）
{ // Map -> targetMap
  "{obj}": { // Map -> depsMap
    "key": [ effectFn / newReactiveEffect ] Set -> dep
  }
}

*/

const targetMap = new Map()

export function track(target, key) {
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if(!dep){
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target, key){
  const depsMap = targetMap.get(target)
  const dep = depsMap.get(key)
  for (const effect of dep) {
    if(effect.scheduler){
      effect.scheduler()
    }else{
      effect.run()
    }
  }
}

let activeEffect;

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)

  _effect.run()

  const runner = _effect.run.bind(_effect)

  return runner 
}