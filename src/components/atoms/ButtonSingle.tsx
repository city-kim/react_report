interface ButtonSingleProps {
  color?: string
  onClick: () => void
  children: React.ReactNode
}

function ButtonSingle ({color, onClick, children}: ButtonSingleProps) {
  let className = ''
  if (color == 'gray') {
    className = 'border-gray-300 bg-gray-300 text-gray-800'
  } else if (color == 'blue') {
    className = 'border-blue-500 bg-blue-500 text-white'
  } else if (color == 'red') {
    className = 'border-red-500 bg-red-500 text-white'
  } else if (color == 'yellow') {
    className = 'border-yellow-500 bg-yellow-500 text-white'
  } else if (color == 'orange') {
    className = 'border-orange-500 bg-orange-500 text-white'
  } else if (color == 'green') {
    className = 'border-green-500 bg-green-500 text-white'
  } else if (color == 'purple') {
    className = 'border-purple-500 bg-purple-500 text-white'
  } else if (color == 'emerald') {
    className = 'border-emerald-500 bg-emerald-500 text-white'
  }

  return (
    <button
      type="button"
      className={`p-2 border rounded-sm ${className}`}
      onClick={onClick}
    >
    { children }
    </button>
  )
}

export default ButtonSingle