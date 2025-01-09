interface LogoSvgProps {
    size: number
    className: string
}

const LogoSvg = ({ size, className }: LogoSvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="64" height="64" rx="16" fill="#4F46E5" />
            <path
                d="M48 16H16C14.9 16 14 16.9 14 18V46L20 40H48C49.1 40 50 39.1 50 38V18C50 16.9 49.1 16 48 16Z"
                fill="white"
            />
            <path
                d="M35 28L29 34H35L29 40"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default LogoSvg
