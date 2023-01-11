function addToX(x){
  return (y)=>{
    return x +y
  }
}
console.log(addToX(3)(2));