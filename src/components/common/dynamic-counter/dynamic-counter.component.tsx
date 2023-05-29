import Button from '../button/button.component';
import './dynamic-counter.css';
import { useState } from 'react';

interface IProps {
  controlled: { value: number, set: any } | null,
  label: string;
  required?: boolean;
  [key: string]: any;
}

const DynamicCounter = ({ controlled, label, required, ...props }: IProps) => {

  return (
    <div className="input-group">
      {
        label ? (
          <label>
            <span>{label}</span>
            &nbsp;
          </label>
        ) : null
      }
      <div className='dynamic-counter-container'>
        <Button onClick={() => {controlled?.set((prevCount: any) => Math.max(prevCount - 1, 0))}}>-</Button>
        <Button disabled={true} className='counter'>{controlled?.value}</Button>
        <Button onClick={() => {controlled?.set((prevCount: any) => prevCount + 1)}}>+</Button>
      </div>
    </div>
  );
};

export default DynamicCounter;
