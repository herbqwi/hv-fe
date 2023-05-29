import { Link } from 'react-router-dom';
import './logo.css';
import votingLogo from '../../../../assets/voting-logo.png';

interface IProps {
    className?: string,
}

const Logo = ({ className }: IProps) => {
    return <Link to="/elections" className={`logo-container ${className}`}>
        {/* <img src={votingLogo} alt="" /> */}
        <p><span className='v'>V</span>oting</p>
    </Link>
}

export default Logo;