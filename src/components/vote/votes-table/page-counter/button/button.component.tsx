import './button.css'

interface IProps {
    className?: string,
    children: any,
    [key: string]: any;

}
const Button = ({ className, children, ...props }: IProps) => {
    return <button {...props} className={`button ${className}`}>
        {children}
    </button>
}

export default Button