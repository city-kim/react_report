/**
 * css의 var로 선언된 색상을 가져온다.
 * @param name --가 없어도 된다.
 * @returns #000000 형태의 색상
 */
const getCssVar = ( name: string ) => {
  if(name.substring(0, 2) !== "--") name = "--" + name
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

export {
  getCssVar
}