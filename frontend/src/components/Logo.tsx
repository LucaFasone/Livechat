import LogoSvg from "./ui/svg/LogoSVG"

interface LogoProps {
  size?: number
  className?: string
}

const Logo = ({ size = 64, className = '' }: LogoProps)  => {
  return (
    <LogoSvg size={size} className={`inline-block ${className}`} />
  )
}

export default Logo
