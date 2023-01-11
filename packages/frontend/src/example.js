const handle = {
  get(target,key){
    console.log('proxy get key',key);
  },
  set(target,key,value){
    console.log('proxy set key',value);
  }
}

const target = {
  a:{b:1}
}

const proxy = new Proxy(target,handle)
console.log(proxy.a);


function Foo(){
  this.name = 'foo'
}

Foo.prototype.getName = function(){
  return this.name
}

const f = new Foo();
console.log(f.getName());
console.log(f.__proto__ == Foo.prototype);