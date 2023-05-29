import { useEffect, useState } from 'react';
import './counter.css'

interface IProps {
  max_value: number,
}

const Counter = ({ max_value }: IProps) => {
  const [currentValue, setCurrentValue] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      if (currentValue < max_value) {
        if (currentValue < max_value) {
          setCurrentValue((value) => currentValue + 1);
        }
      }
    }, 100)
  }, [currentValue])
  return <p className="counter">{currentValue}</p>
}

export default Counter;