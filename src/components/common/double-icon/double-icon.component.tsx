import { faIceCream, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactElement } from 'react'
import './double-icon.css'

interface IProps {
  defaultIcon: IconDefinition,
  activeIcon: IconDefinition,
  active?: boolean
}

const DoubleIcon = ({ defaultIcon, activeIcon, active }: IProps) => {
  return <div className={`icon-container ${active? `active` : ``}`}>
    <FontAwesomeIcon className='tempelate' icon={defaultIcon}></FontAwesomeIcon>
    <FontAwesomeIcon className="selected" icon={defaultIcon}></FontAwesomeIcon>
    <FontAwesomeIcon icon={activeIcon}></FontAwesomeIcon>
  </div>
}

export default DoubleIcon;