import { Dep, effectWatch } from './core/index.js'

const a = new Dep(10)
let b

effectWatch(() => {
  b = a.value + 10
  console.log(`ref b: ${b}`)
})

a.value = 20