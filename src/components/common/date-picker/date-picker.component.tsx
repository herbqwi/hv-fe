import './date-picker.css';
import { DatePicker, Space } from 'antd';
import { useState, useEffect } from 'react';

interface IProps {
  className?: string,
  controlled?: { value: any, set: any } | null,
  label: string,
}

const DatePick = ({ className, controlled, label }: IProps) => {

  const { RangePicker } = DatePicker;

  const inputProps: any = {};
  if (controlled) {
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
      <Space direction="vertical" size={10}>
        <RangePicker onChange={(date) => { controlled?.set({ start: date?.[0]?.toDate().getTime(), finish: date?.[1]?.toDate().getTime() }) }} />
      </Space>
    </div>
  );
};

export default DatePick;