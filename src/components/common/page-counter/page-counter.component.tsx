import './page-counter.css'
import Button from '../button/button.component';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import ShowTimer, { AnimationType } from '../../base/show-timer/show-timer.component';

interface IProps {
    currentPageNum: number,
    setCurrentPageNum: any,
    totalPages: number,
    available: { prev: boolean, next: boolean }
}

const PageCounter = ({ currentPageNum, setCurrentPageNum, totalPages, available }: IProps) => {
    return <div className="page-counter">
        <ShowTimer timeout={1000} animationType={AnimationType.FADE_UP}><Button disabled={!available.prev} onClick={() => { setCurrentPageNum(0) }}><FontAwesomeIcon icon={faAnglesLeft} fontSize={14} /></Button></ShowTimer>
        <ShowTimer timeout={900} animationType={AnimationType.FADE_UP}><Button disabled={!available.prev} onClick={() => { setCurrentPageNum(currentPageNum - 1) }}><FontAwesomeIcon icon={faAngleLeft} fontSize={14} />&nbsp;</Button></ShowTimer>
        <ShowTimer timeout={800} animationType={AnimationType.FADE_UP}><Button>{totalPages != 0 ? `${currentPageNum + 1}/${totalPages}` : `-/-`}</Button></ShowTimer>
        <ShowTimer timeout={900} animationType={AnimationType.FADE_UP}><Button disabled={!available.next} onClick={() => { setCurrentPageNum(currentPageNum + 1) }}>&nbsp;<FontAwesomeIcon icon={faAngleRight} fontSize={14} /></Button></ShowTimer>
        <ShowTimer timeout={1000} animationType={AnimationType.FADE_UP}><Button disabled={!available.next} onClick={() => { setCurrentPageNum(totalPages - 1) }}><FontAwesomeIcon icon={faAnglesRight} fontSize={14} /></Button></ShowTimer>
    </div>
}

export default PageCounter;