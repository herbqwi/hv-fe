import './qr-code.css'
import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';

interface IProps {
    value: string,
}

const QRCode = ({ value }: IProps) => {
    return <div className='qr-code-container'>
        <QRCodeSVG className='hey' value={value} />
    </div>
}

export default QRCode;