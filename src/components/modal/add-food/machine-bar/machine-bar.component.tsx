import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './machine-bar.css'

interface IProps {
  onClick: any,
  presetCode: string,
  ip: string,
  isSelected: boolean,
}

const MachineBar = ({ onClick, presetCode, ip, isSelected }: IProps) => {
  return <li onClick={onClick} className={`machine-bar-container${isSelected ? ` selected-row` : ``}`}>
    <FontAwesomeIcon icon={faFingerprint}></FontAwesomeIcon>
    <div className='info'>
      <h1>{presetCode}</h1>
      <h2>{ip}</h2>
    </div>
  </li>
}

export default MachineBar;