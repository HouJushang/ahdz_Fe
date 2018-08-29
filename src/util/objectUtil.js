export function filter(obj){
  const newObj = {}
  for(var key in obj){
    if(obj[key] !== ""){
        newObj[key] = obj[key]
    }
  }
  return newObj
}
