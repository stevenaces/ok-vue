import { reactive, effectWatch } from './core/index.js'

const person = reactive({ age:  10 })
let nextAge = null

effectWatch(() => {
  nextAge = person.age + 10
  console.log(`reactive nextAge: ${nextAge}`);
})

person.age = 20