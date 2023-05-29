import './input.css';

interface IProps {
    className?: string,
    controlled?: { value: string, set: any } | null,
    label: string;
    required?: boolean;
    [key: string]: any;
}

const Input = ({ className, controlled, label, required, ...props }: IProps) => {

    const inputProps: any = {};
    if (controlled) {
        inputProps.value = controlled.value;
        inputProps.onChange = (e: any) => { controlled.set(e.target.value) };
    }

    return (
        <div className={`input-group${className ? ` ${className}` : ``}`}>
            {
                label ? (
                    <label>
                        <span>{label}</span>
                        &nbsp;
                    </label>
                ) : null
            }
            <input  {...inputProps} {...props} />
        </div>
    );
};

export default Input;
