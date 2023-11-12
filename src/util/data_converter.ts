import { DateTime } from 'luxon'
import type { JoinSns } from '@/types/store'

interface DataToDateGroup {
  date: string
  join_sns?: JoinSns
  [key: string]: number | string | undefined | JoinSns
}

/**
 * data 배열을 받아서 일자별, 주차별, 월별로 그룹화하여 반환한다.
 * @param data date가 포함된 key: number | string | join_sns?: JoinSns 형태의 배열
 * @param source data의 배열 내부 객체의 형태
 * @returns day: yyyy-LL-dd, week: kkkk-'W'WW, month: yyyy-LL { day: T[], week: T[], month: T[] }
 */
function dataToDateGroup<T extends DataToDateGroup>(data: T[], source: T): { day: T[], week: T[], month: T[] } {
  const week: Array<T> = []
  const month: Array<T> = []

  for (let i=0; i<data.length; i++) {
    const weekKey = DateTime.fromISO(data[i].date).toFormat("kkkk-'W'WW")
    const monthKey = DateTime.fromISO(data[i].date).toFormat('yyyy-LL')

    const weekTarget = week.find(x => x.date == weekKey)
    const monthTarget = month.find(x => x.date == monthKey)

    if (weekTarget) {
      // 이미 존재하는 주차의 경우
      objectSum(weekTarget, data[i])
    } else {
      // 없으면 새로추가
      const weekObject = structuredClone(source)
      objectSum(weekObject, data[i])
      weekObject.date = weekKey
      week.push(weekObject)
    }

    if (monthTarget) {
      // 이미 존재하는 월의 경우
      objectSum(monthTarget, data[i])
    } else {
      // 없으면 새로추가
      const monthTarget = structuredClone(source)
      objectSum(monthTarget, data[i])
      monthTarget.date = monthKey
      month.push(monthTarget)
    }
  }

  return {
    day: data,
    week: week,
    month: month
  }
}

/**
 * 전달된 배열의 object key에 맞게 합산하여 반환한다.
 * @param data Array<{[key:string]: string|number}>
 * @returns 합산된 데이터를 반환 string의 경우는 가장 처음 전달된 데이터를 반환한다
 */
function sumArrayByObject<T extends unknown> (data: T[]) {
  const result:Partial<T> = {}
  if (data.length > 0) {
    // 데이터가 한개 이상인경우
    for (let i=0; i<data.length; i++) {
      objectSum(result, data[i])
    }
  }
  return result as T
}

/**
 * result 객체의 요소의 key에 맞게 data의 요소를 합산하여 반환 object의 경우 재귀호출 array의 경우는 합산하지 않고 그대로 반환
 * @param result 합산될 객체
 * @param data 대상 객체
 * @returns result[key]에 data[key] 값을 합산하여 반환
 */
function objectSum<T extends unknown> (result: T, data: T) {
  for(const key in data) {
    if (!result[key]) {
      // 값이 없을경우 입력해줌
      result[key] = data[key]
      continue
    }
    if (typeof result[key] == 'object' && typeof data[key] == 'object') {
      // 객체인경우 재귀호출
      objectSum(result[key], data[key])
    } else if (typeof result[key] == 'number' && typeof data[key] == 'number') {
      // 숫자인경우 더해주기
      (result[key] as number) += (data[key] as number)
    }
  }
  return result as T
}

/**
 * 전달된 배열들의 특정 key값을 기준으로 합산하여 반환한다.
 * @param data Array<object>의 구조를 가진 배열
 * @param _key object[key]
 * @returns 제시된 object[key]의 값을 기준으로 합산된 데이터를 반환
 */
function sumArrayByKey<T extends unknown> (data: T[], _key: string) {
  const result: T[] = []
  for (const obj of data) {
    const key = _key as keyof typeof obj
    // result 배열에서 obj[key]와 같은 값을 가진 객체가 있는지 확인
    const target = result.find((x) => x[key] === obj[key])
    // 없다면 새로 추가
    if (!target) result.push(obj)
    else {
      // 있다면 합산
      for (const sub in obj) {
        // _key값은 무시
        if (sub === key) continue
        if (typeof target[sub] == 'object' && typeof obj[sub] == 'object') objectSum(target[sub], obj[sub])
        if (typeof target[sub] == 'number' && typeof obj[sub] == 'number') (target[sub] as number) += (obj[sub] as number)
      }
    }
  }
  return result
}

/**
 * 전달된 날짜를 비교하여 from이 더 작은 날짜가 되도록 정렬한다
 * @param from DateTime
 * @param to DateTime
 * @returns from < to { from: DateTime, to: DateTime }
 */
function dateSort (from: DateTime, to: DateTime) {
  // 전달된 날짜를 비교하여 from이 더 작은 날짜가 되도록 정렬한다
  if (from < to) {
    return { from, to }
  } else {
    return { from: to, to: from }
  }
}
export {
  dataToDateGroup,
  sumArrayByObject,
  sumArrayByKey,
  dateSort
}