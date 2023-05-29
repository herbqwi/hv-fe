import './page-counter.css'
import Button from './button/button.component';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    currentPageNum: number,
    setCurrentPageNum: any,
    totalPages: number,
}

const PageCounter = ({ currentPageNum, setCurrentPageNum, totalPages }: IProps) => {
    return <div className="page-counter">
        <Button disabled={currentPageNum == 0} onClick={() => { setCurrentPageNum(0) }}><FontAwesomeIcon icon={faAnglesLeft} fontSize={14} /></Button>
        <Button disabled={currentPageNum == 0} onClick={() => { setCurrentPageNum(currentPageNum - 1) }}><FontAwesomeIcon icon={faAngleLeft} fontSize={14} />&nbsp;</Button>
        <Button>{`${currentPageNum + 1}/${totalPages}`}</Button>
        <Button disabled={currentPageNum == totalPages - 1} onClick={() => { setCurrentPageNum(currentPageNum + 1) }}>&nbsp;<FontAwesomeIcon icon={faAngleRight} fontSize={14} /></Button>
        <Button disabled={currentPageNum == totalPages - 1} onClick={() => { setCurrentPageNum(totalPages - 1) }}><FontAwesomeIcon icon={faAnglesRight} fontSize={14} /></Button>
    </div>
}

export default PageCounter;