import { ReactNode } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./icon-button.css";

interface IProps {
    children: ReactNode,
    icon?: any,
    [key: string]: any;
}

const IconButton = ({ children, icon, ...element_props }: IProps) => {
    return (
        <div className="icon-button-container">
            <button {...element_props}>{icon? <FontAwesomeIcon icon={icon} color="black" /> : null}{children}</button>
        </div>
    );
};

export default IconButton;