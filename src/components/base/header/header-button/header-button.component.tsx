import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './header-button.css'

interface IProps {
    children: ReactNode,
    className?: string,
    to: string,
    [key: string]: any;
}

const HeaderButton = ({ children, className, to, ...props }: IProps) => {
    return <Link to={to} {...props} className={`header-button ${className}`}>
        {children}
    </Link>
}

export default HeaderButton