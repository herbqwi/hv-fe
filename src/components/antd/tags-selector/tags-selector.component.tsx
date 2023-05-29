import './tags-selector.css'
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import Form, { Rule } from 'antd/es/form';
import { IElection } from '../../../interfaces';

interface IProps {
  controller?: { value: IElection.Candidate[], set: any }
  name: string,
  className?: string,
  tagsList: { value: string, label: string }[],
  label?: string,
  placeholder?: string,
  rules?: Rule[],
}

const AntTagsSelector = ({ controller, name, className, tagsList, label, placeholder, rules }: IProps) => {
  const options: SelectProps['options'] = [];

  for (let i = 0; i < tagsList.length; i++) {
    options.push({
      value: tagsList[i].value,
      label: tagsList[i].label,
    });

  }

  return <div className={`input-group${className ? ` ${className}` : ``}`}>
    {label && <label>{label}</label>}
    <Form.Item
      rules={rules}
      name={name}
    >
      <Select
        placeholder={placeholder}
        mode="tags"
        allowClear={true}
        style={{ width: '100%' }}
        tokenSeparators={[',']}
        options={options}
        onChange={controller?.set}
      />
    </Form.Item>
  </div>
}

export default AntTagsSelector;