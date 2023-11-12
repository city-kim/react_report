import { ICON_LIST } from '@/constants/components/ICON_LIST'

interface IconProps {
  name: keyof typeof ICON_LIST
  width: string
  height: string
}

function SvgIcon ({name, width, height}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      {ICON_LIST[name].map((icon, index) => (
        <path
          d={icon}
          key={index}
        />
      ))}
    </svg>
  )
}

export default SvgIcon