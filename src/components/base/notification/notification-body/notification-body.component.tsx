import './notification-body.css'
import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRemoveNotification } from '../../../../interfaces/notification.interface';

export const NotificationType = {
    Failed: 0,
    Success: 1,
    Notice: 2
}

const Notification = ({ content, type, removeNotification }: { content: string, type: number, removeNotification: IRemoveNotification }) => {
    return <div className='notification' onClick={removeNotification}>
        <div className="icon">
            {type == 1 ?
                <FontAwesomeIcon icon={faCheck} fontSize={23} color="white" />
                : (type == 2) ?
                    < FontAwesomeIcon icon={faExclamation} fontSize={23} color="white" />
                    :
                    < FontAwesomeIcon icon={faXmark} fontSize={23} color="white" />
            }
        </div>
        <div className='content'>
            <p>{type == 1 ? `Success` : (type == 2 ? `Notice` : `Failed`)}</p>
            <p>{content}</p>
        </div>
    </div>
}

export default Notification;