interface ButtonGroupProps {
  selected: string
  buttons: Array<{key: string, text: string}>
  updateActive: (key: string) => void
}

function ButtonGroup (props : ButtonGroupProps) {
  return (
    <div>
      {props.buttons.map((item, index) => (
        <button
          className={`p-1 border
            ${props.selected === item.key ? 'border-gray-300' : 'bg-gray-300'}
          `}
          key={index}
          onClick={() => props.updateActive(item.key)}
        >
          { item.text }
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup