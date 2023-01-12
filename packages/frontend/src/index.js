import { Map,is } from "immutable";
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set("b", 50);

console.log(map1.toJSON());
console.log(map2.toArray());
console.log(map1.equals(map2));
console.log(map1.get("b") + " vs." + map2.get("b"));


const target ={
  a:1,
  b:2
}

const targetCopy = {...target}
// const targetCopy = Object.assign({},target,{c:3})
// const targetCopy = target;
// targetCopy.a = 2
console.log(Object.is(target,targetCopy));