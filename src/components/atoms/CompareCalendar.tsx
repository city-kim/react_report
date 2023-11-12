import { useRef, useState, useMemo, useEffect } from 'react'
import { DateTime, Info, Interval } from 'luxon'
import SvgIcon from '@/components/atoms/SvgIcon'

interface DayObjectProps {
  beforeDate: {
    from: DateTime,
    to: DateTime
  },
  afterDate: {
    from: DateTime,
    to: DateTime
  },
  changeDate: ({ from, to }: {from: DateTime, to: DateTime}) => void
}

interface DayObject {
  [key: string]: Array<Array<DateTime|undefined>>
}

function CompareCalendar ({beforeDate, afterDate, changeDate}: DayObjectProps) {
  // luxon에서 요일의 text를 가져온다
  const DayOfWeek = Array.from(Array(7).keys()).map(x => Info.weekdays('short', {locale: 'ko'})[(x + 6) % 7])

  // 달력 생성시 기준이 되는 월은 현재월로 한다
  const baseMonth = useRef(DateTime.now().toFormat('yyyy-MM-dd'))

  useEffect(() => {
    setCalendar(baseMonth.current)
  } ,[])

  function changeMonth (move: number) {
    // 전달된 move값을 기준으로 달력을 재 생성한다
    baseMonth.current = DateTime.fromISO(baseMonth.current).plus({ months: move }).toFormat('yyyy-MM-dd')
    setCalendar(baseMonth.current)
  }

  // 날짜를 담아줄 객체
  const [dayObject, setDayObject] = useState<DayObject>({})

  function setCalendar (base: string) {
    setDayObject({})
    for (let m=-1; m<2; m++) {
      // 이전달(-1) 이번달(0) 다음달(+1) 총 세번을 진행한다
      const baseDate = DateTime.fromISO(base).plus({ months: m }) // 기준일자로 loop에서 전달받은 month를 더한다
      const thisMonth = baseDate.toFormat('yyyy-MM') // 해당 월의 key값으로 사용한다

      const firstDay = baseDate.startOf('month') // 해당 월의 firstday
      const lastDay = baseDate.endOf('month') // 해당 월의 lastDay

      const dayArray:Array<Array<DateTime>> = Array.from(Array(6), () => new Array(7).fill(undefined)) // 달력은 총 6주 7일로 구성된다
        
      const start = Number(firstDay.toFormat('c')) // 시작일의 요일번호 1 ~ 7이므로 -1해준다
      for (let i=0; i<Number(lastDay.toFormat('d')); i++) {
        // 시작일부터 마지막일까지 loop를 돌면서 해당 날짜를 dayArray에 넣어준다
        const s = start + i // 시작일 이전의 요일은 undefined로 유지하기 위해 start와 index를 더해준다
        const w = Math.floor(s/7) // 일자 / 7로 주차를 구한다
        const d = s%7 // 7로 나눈 나머지 값이 해당 주차의 요일이다
        dayArray[w][d] = firstDay.plus({ days: i }) // undefined이 아닌곳에 날자를 채워준다
      }
      setDayObject(dayObject => ({...dayObject, [thisMonth]: dayArray}))
    }
  }

  // 검사할 날짜 범위
  const beforeInterval = useMemo(() =>
  Interval.fromDateTimes(
    beforeDate.from.startOf('day'),
    beforeDate.to.endOf('day')
  ), [beforeDate])

  const afterInterval = useMemo(() =>
  Interval.fromDateTimes(
    afterDate.from.startOf('day'),
    afterDate.to.endOf('day')
  ), [afterDate])

  function activeTypeCheck (days: DateTime|undefined) {
    // 각각의 일자가 이전날짜에 포함되는지, 이후날짜에 포함되는지, 둘다 포함되는지, 아니면 비활성화인지를 체크하여 클래스를 반환한다
    let result = ''
    if (days) {
      result += 'cursor-pointer '
      if (selectDate.current.from) {
        // 시작일자가 선택된경우
        if (days.diff(selectDate.current.from, 'days').days == 0) {
          // 선택된 날짜와 같은경우만 after로 활성화
          return result += 'after'
        }
      }
      const before = beforeInterval.contains(days)
      const after = afterInterval.contains(days)
      if (before && after) result += 'bg-purple-300 text-white'
      if (before) result += 'bg-orange-300 text-white'
      if (after) result += 'bg-blue-300 text-white'
    } else {
      result += 'bg-gray-300'
    }
    return result
  }

  // 날짜가 선택되었을때 해당 값을 담아준다
  const selectDate = useRef<{from: DateTime|null, to: DateTime|null}>({from: null, to: null})
  function changeSelectDate (days: DateTime|undefined) {
    // 선택된 날짜로 변경한다
    if (days) {
      // 날짜가 있는경우만 반영
      if (selectDate.current.from) selectDate.current.to = days
      else selectDate.current.from = days
    }
    if (selectDate.current.from && selectDate.current.to) {
      // 최종적으로 날짜가 모두 있다면 emit 해준다
      changeDate({
        from: selectDate.current.from,
        to: selectDate.current.to
      })
      selectDate.current = { from: null, to: null }
    }
  }

  return (
    <div className="flex gap-2 grid-cols-2 items-baseline">
      <button
        className="p-1 bg-gray-300 cursor-pointer"
        type="button"
        onClick={() => changeMonth(-1)}
      >
        <SvgIcon
          name="left_double_arrow"
          width="1rem"
          height="1rem"
        ></SvgIcon>
      </button>
      {
        Object.entries(dayObject).map(([key, month]) => (
          <div key={key}>
            <section className="flex items-center justify-center bg-gray-300">
              <h2>{key}</h2>
            </section>
            <div className="border border-gray-100 bg-white">
              <article className="grid grid-cols-7 text-right border-t border-gray-100 last:border-t-0">
                {
                  DayOfWeek.map((text, index) => (
                    <p
                      key={index}
                      className="min-h-[2rem] p-1 text-center"
                    >{ text }</p>
                  ))
                }
              </article>
              {
                month.map((week, i) => (
                  <article
                    className="grid grid-cols-7 text-right border-t border-gray-100"
                    key={i}
                  >
                    {
                      week.map((days, index) => (
                        <p
                          className={`min-h-[2rem] p-1 text-center border-r border-gray-100 last:border-r-0 ${activeTypeCheck(days)}`}
                          key={index}
                          onClick={() => changeSelectDate(days)}
                        >{ days && days.toFormat('d') }</p>
                      ))
                    }
                  </article>
                ))
              }
            </div>
          </div>
        ))
      }
      <button
        type="button"
        className="col-span-1 text-center"
        onClick={() => changeMonth(1)}
      >
        <SvgIcon
          name="right_double_arrow"
          width="1rem"
          height="1rem"
        ></SvgIcon>
      </button>
    </div>
  )
}

export default CompareCalendar