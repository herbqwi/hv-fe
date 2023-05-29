import ShowTimer from '../../../base/show-timer/show-timer.component';
import Button from '../../../common/button/button.component';
import './section-container.css'

interface IProps {
  title?: string,
  className?: string,
  buttons?: { title: string, action: any }[],
  timeout?: number,
  children: any,
}

const SectionContainer = ({ title, className, buttons, children, timeout = 0 }: IProps) => {
  return <ShowTimer timeout={timeout}>
    <div className={`section-container${className ? ` ${className}` : ``}`}>
      {title && <h1>{title}</h1>}
      {children}
      <div className="inputs-group">
        {buttons && buttons.length && buttons.map(button => <Button onClick={button.action}>{button.title}</Button>)}
      </div>
    </div>
  </ShowTimer>
}

export default SectionContainer;