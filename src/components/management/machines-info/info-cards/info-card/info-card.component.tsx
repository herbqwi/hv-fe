import { faCaretDown, faCartArrowDown, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import './info-card.css'

interface IProps {
  children: string,
  icon: any,
  content: ReactNode,
}

const InfoCard = ({ children, icon, content }: IProps) => {
  return <div className="info-card">
    <div className='icon'>
      <FontAwesomeIcon icon={icon} />
      <FontAwesomeIcon icon={faRefresh} />
    </div>
    <h1>{children}</h1>
    {content}
  </div>
}

export default InfoCard;