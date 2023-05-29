import { ReactNode } from 'react'
import './button.css'

interface IProps {
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const Button = ({ className, children, ...props }: IProps) => {
    return <button {...props} className={`button ${className}`}>
        {children}
    </button>
}

export default Button