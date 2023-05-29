import { ReactNode, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { UtilsContext } from "../../../../contexts/utils.context";
import "./input.css";

interface IProps {
  title?: string,
  name?: string,
  value?: any,
  onChange?: any,
  isValid?: any,
  focusNote?: string,
  id?: string,
  children?: ReactNode[],
  [key: string]: any;
}

const Input = ({ title, name, value, onChange, isValid, focusNote, id, children, ...element_props }: IProps) => {

  const { currentActiveElement } = useContext(UtilsContext);

  return (
    <div className="input-container">
      {children}
      <input
        id={id}
        onBlur={() => {
          currentActiveElement?.set(null)
        }}
        onFocus={(e) => { currentActiveElement?.set(e.target) }} // reminder: this was id not e.target
        onChange={e => onChange(e.target.value)}
        className={`pulse ${(!isValid) ? `invalid` : ``}`} {...element_props} value={value} />
    </div>
  );
};

export default Input;
