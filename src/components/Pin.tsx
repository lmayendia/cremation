
interface PinProps {
    x: number;
    y: number;
    isHovered: boolean;
}

// Pin component with dynamic color change based on hover state
const Pin = ({ x, y, isHovered }: PinProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-colors duration-200"
        viewBox="0 -0.5 17 17"
        x={x}
        y={y}
        width={14}
    >
        <g
            className="transition-colors duration-200"
            fill={isHovered ? "white" : "#e32400"} // Change color when hovered
        >
            <path
                d="M5.469.021c-3.016 0-5.46 2.296-5.46 5.13 0 .732.166 1.428.458 2.057l5.002 8.668 5-8.668a4.84 4.84 0 00.459-2.057c0-2.835-2.444-5.13-5.459-5.13zm.023 9.021c-1.957 0-3.542-1.596-3.542-3.567 0-1.969 1.585-3.565 3.542-3.565 1.954 0 3.539 1.597 3.539 3.565 0 1.971-1.585 3.567-3.539 3.567z"
                transform="translate(3)"
            ></path>
            <path
                d="M7.979 5.504A2.485 2.485 0 015.5 7.996a2.485 2.485 0 01-2.477-2.492A2.485 2.485 0 015.5 3.014a2.485 2.485 0 012.479 2.49z"
                transform="translate(3)"
            ></path>
        </g>
    </svg>
);

export default Pin;