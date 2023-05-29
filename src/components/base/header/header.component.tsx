import "./header.css";
import HeaderButton from "./header-button/header-button.component";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../notification/notification-container/notification-container.component";
import { NotificationType } from "../notification/notification-body/notification-body.component";
import Logo from "./logo/logo.component";
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowTimer, { AnimationType } from "../show-timer/show-timer.component";
import { UserContext } from "../../../contexts/user.context";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, setUser } = useContext(UserContext);
  const { pushNotification } = useContext(NotificationContext)

  const logout = () => {
    pushNotification(NotificationType.Notice, `You have logged out`)
    setUser(null)
  }

  return (
    <div className={`header-container${pathname.includes(`/home`) ? ` home` : ``}`}>

      <div className="left-nav">
        <ShowTimer timeout={0} animationType={AnimationType.FADE_IN}><Logo></Logo></ShowTimer>
        {/* <ShowTimer timeout={100} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/home`) ? `selected` : ``}`} to="/home">Home</HeaderButton></ShowTimer> */}
        <ShowTimer timeout={200} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/elections`) ? `selected` : ``}`} to="/elections">Elections</HeaderButton></ShowTimer>
        <ShowTimer timeout={200} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/settings`) ? `selected` : ``}`} to="/settings">Settings</HeaderButton></ShowTimer>
        <ShowTimer timeout={200} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/privacy`) ? `selected` : ``}`} to="/privacy">Privary</HeaderButton></ShowTimer>
        <ShowTimer timeout={300} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/about-us`) ? `selected` : ``}`} to="/about-us">About us</HeaderButton></ShowTimer>
      </div>

      <div className="right-nav">
        {/* {user && <div className='user-info'>
          <img src="https://www.nicepng.com/png/full/137-1379898_anonymous-headshot-icon-user-png.png" alt="User Image" />
          <p>{user.fullName}</p>
        </div>} */}

        {user == null ?
          <ShowTimer timeout={500} animationType={AnimationType.FADE_IN}><HeaderButton className={`${pathname.includes(`/login`) ? `selected` : ``}`} to="/login">Sign In</HeaderButton></ShowTimer> :
          <HeaderButton to="/login" onClick={() => { logout() }} animationType={AnimationType.FADE_IN}>Logout</HeaderButton>}

        <ShowTimer timeout={600} animationType={AnimationType.FADE_IN}><HeaderButton className={`inverted ${pathname.includes(`/login`) ? `selected ` : ``}`} to="/login"><FontAwesomeIcon icon={faVoteYea} fontSize={18} color="white" /> Join Now!</HeaderButton></ShowTimer>
      </div>

    </div>
  );
};

export default Header;