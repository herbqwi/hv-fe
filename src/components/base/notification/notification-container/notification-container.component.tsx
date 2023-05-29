import './notification-container.css'
import Notification from '../notification-body/notification-body.component';
import React, { ReactNode, useState } from 'react';
import { setElementOpacity } from '../../../../services/general.service';
import { INotification, IPushNotification, IRemoveNotification } from '../../../../interfaces/notification.interface';

interface IContext {
    pushNotification: IPushNotification,
    removeNotification: IRemoveNotification
}

export const NotificationContext = React.createContext<IContext>({ pushNotification: () => { }, removeNotification: () => { } })

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [currentNotifications, setCurrentNotifications] = useState<INotification[]>([]);

    const pushNotification = (type: number, content: string) => {
        const id = Math.floor(Math.random() * 10000).toString();
        setElementOpacity(`.notification-container`, 0)

        setTimeout(() => {
            setCurrentNotifications((prev) => {
                return [...prev, { id, content, type }];
            })
            setElementOpacity(`.notification-container`, 1)
        }, 200);
    }

    const removeNotification = (id: string) => {
        setElementOpacity(`.notification-container`, 0)
        setTimeout(() => {
            setElementOpacity(`.notification-container`, 1)
            setCurrentNotifications((prev) => {
                return prev.filter(notification => notification.id != id)
            })
        }, 200);
    }

    return <NotificationContext.Provider value={{ pushNotification, removeNotification }}>
        <div className='notification-container'>
            {
                currentNotifications.map(notification => {
                    setTimeout(() => {
                        removeNotification(notification.id)
                    }, 10 * 1000);
                    return <Notification key={notification.id} type={notification.type} content={notification.content} removeNotification={() => { removeNotification(notification.id) }} />
                })
            }
        </div>
        {children}
    </NotificationContext.Provider>;
}

export default NotificationProvider;