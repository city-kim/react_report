/**
 * from에서 to로 변하면 얼마나 증감한지 구하기
 * @param from number 비교할 대상
 * @param to number 비교될 값
 * @returns 전달된 값에 대한 비율
 */
const getPercent = (from: number, to: number) => {
  return Math.floor(((from - to) / to) * 100)
}

/**
 * count가 totalCount에서 몇프로를 차지하는지 구하기
 * @param count number 구할값
 * @param totalCount number 전체값
 * @returns 전달된 값에 대한 비율
 */
const getRate = (count: number, totalCount: number) => {
  return Math.floor((count / totalCount) * 100)
}

/**
 * totalValue값에 decrease퍼센트 만큼 감소한 값을 구하기
 * @param totalValue number 전체 값
 * @param decrease number 감소시킬 퍼센트
 * @returns 전달된 전체 값에 대한 감소하고 남은 값
 */
const decreaseByPercent  = (totalValue: number, decrease: number) => {
  return totalValue * (1 - decrease / 100)
}

/**
 * NaN이 전달된경우 0, 숫자가 세자리를 넘기면 콤마를 추가하고 fixed가 전달되면 소수점 자리수를 반환, 그 외는 Math.floor된 숫자를 반환한다
 * @param value number
 * @param fixed number 소수점 자릿수
 * @returns string 000,000,000 or 000.0 or 000.(fixed)
 */
const numberExpression = (value: number, fixed?: number) => {
  if (isNaN(value)) {
    return 0
  } else {
    if (value >= 1000) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (fixed) {
      return value.toFixed(fixed)
    }
    return Math.floor(value).toString()
  }
}

export { getPercent, getRate, decreaseByPercent, numberExpression }