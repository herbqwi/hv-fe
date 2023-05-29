import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import useScroll from '../../../hooks/scroll.hook';
import useTimer from '../../../hooks/timer.hook';
import { generateRandomNumber } from '../../../services/general.service';
import './show-timer.css'

export enum AnimationType {
    FADE_UP = `fade-up`,
    FADE_IN = `fade-in`,
    FADE_IN_ROTATE_LEFT = `fade-in-rotate-left`,
    FADE_IN_ROTATE_RIGHT = `fade-in-rotate-right`,
    SCALE = `scale`,
}

interface IProps {
    children: ReactElement,
    timeout: number,
    animationType?: string,
    elementRef?: any,
}

const ShowTimer = ({ children, timeout, animationType = AnimationType.FADE_UP, elementRef }: IProps) => {
    const isInView = useScroll(elementRef);
    const shown = useTimer(timeout)
    return React.cloneElement(children, { className: `${children.props.className} hidable${(!shown || (elementRef != null && !isInView)) ? ` ${animationType}` : ``}` })
}

export default ShowTimer;