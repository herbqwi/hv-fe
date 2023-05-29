import { faAngleDoubleDown, faAngleDown, faAnglesDown, faArrowDown, faChevronCircleDown, faChevronDown, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../../../../hooks/toggle.hook';
import Button from '../../../common/button/button.component';
import './sliding-list.css'

interface IProps {
  className?: string,
  icon: any,
  title: string,
}

const SlidingList = ({ className, icon, title }: IProps) => {
  const [isExtended, toggleIsExtended] = useToggle(false)

  const msgs: string[] = []

  return <div className={`sliding-list-container ${className}`}>
    <div className='header'><p> <FontAwesomeIcon icon={icon}></FontAwesomeIcon> {title}</p> <Button disabled={(msgs?.length <= 3)} onClick={toggleIsExtended}
      className={`extend${isExtended ? ` active` : ``}`}><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></Button></div>
    <div className='body'>
      {msgs.length == 0 ?
        <p className='good'>You're all good!</p>
        : <ul>
          {
            msgs.map((msg, i) => (i < 3 || isExtended ? <li>{msg}</li> : null))
          }
        </ul>
      }
      {(!isExtended && msgs?.length > 3) ? <FontAwesomeIcon onClick={toggleIsExtended} className='load-more-icon' icon={faAnglesDown}></FontAwesomeIcon> : null}
    </div>
  </div>
}

export default SlidingList;