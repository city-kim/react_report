/**
 * hexcode를 rgba로 변환합니다.
 * @param hex #이 포함된 hexcode
 * @param a 투명도
 * @returns rgba(0, 0, 0, 0) | rgba(0, 0, 0)
 */
const hexToRGBA = (hex: string, a?: number) => {
  const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

  if (a != undefined) {
      return `rgba(${r || 0}, ${g || 0}, ${b || 0}, ${a})`
  } else {
      return `rgba(${r || 0}, ${g || 0}, ${b || 0}, 1)`
  }
}

export { hexToRGBA }