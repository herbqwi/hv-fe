import { ReactNode } from 'react';
import './chart-container.css'

interface IProps {
  title: string,
  className?: string,
  children: ReactNode,
}

const ChartContainer = ({ title, className, children }: IProps) => {
  return <div className={`chart-container ${className}`}>
    <div className='header'>
      <h1>{title}</h1>
      <p>0</p>
      <h2>Votes over time</h2>
    </div>
    {children}
  </div>
}

export default ChartContainer;