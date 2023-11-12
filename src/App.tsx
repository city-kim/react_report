import { useState } from 'react'
import { DateTime } from 'luxon'
import { dateSort } from '@/util/data_converter'

import CompareCalendar from '@/components/atoms/CompareCalendar'
import ButtonSingle from '@/components/atoms/ButtonSingle'
import ButtonGroup from '@/components/atoms/ButtonGroup'
import SvgIcon from '@/components/atoms/SvgIcon'

function App() {
  const [buttonSelected, setButtonSelected] = useState('1')
  const colors = ['gray','blue','red','yellow','orange','green','purple','emerald']

  const [beforeDate, setBeforeDate] = useState({
    from: DateTime.now().minus({day: 13}),
    to: DateTime.now().minus({day: 7}),
  })
  const [afterDate, setAfterDate] = useState({
    from: DateTime.now().minus({day: 6}),
    to: DateTime.now(),
  })
  
  function dateDiffUpdate ({from, to}: {from: DateTime, to: DateTime}) {
    // 전달된 날짜를 기반으로 계산하여 같은 일자만큼 beforeDate를 변경한다
    const { from: fromSort, to: toSort } = dateSort(from, to)
    setAfterDate({from: fromSort, to: toSort})
    
    const diff = toSort.diff(fromSort, 'days').days
    setBeforeDate({from: beforeDate.to.minus({day: diff}), to: fromSort.minus({day: 1})})
  }

  return (
    <>
      <ButtonGroup
        selected={buttonSelected}
        buttons={[ {key: '1', text: '1주'}, {key: '2', text: '2주'}, {key: '3', text: '3주'}, {key: '4', text: '4주'} ]}
        updateActive={(key) => setButtonSelected(key)}
      ></ButtonGroup>
      {
        Array.from({length: 8}).map((_, index) => (
          <ButtonSingle
            key={index}
            color={colors[index]}
            onClick={() => alert(`click ${colors[index]}`)}
          >{`button ${colors[index]}`}</ButtonSingle>
        ))
      }
      <SvgIcon
        name="exclamation_triangle_fill"
        width="40"
        height="40"
      ></SvgIcon>
      <CompareCalendar
        beforeDate={beforeDate}
        afterDate={afterDate}
        changeDate={(date) => { dateDiffUpdate(date) }}
      ></CompareCalendar>
    </>
  )
}

export default App
