import { useState } from 'react'
import './passwd-strength.css'
import RequiredText from '../../common/required-text/required-text.component';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UtilsContext } from '../../../providers/utils.provider';
import { useDestroy } from '../../../customHooks/use-destroy.hook';

const StrengthBar = ({ eightChars, upperLowerCase, specialChars }) => {
    const calculateStrength = () => {
        const strength = eightChars + (eightChars && upperLowerCase) + (eightChars && specialChars);
        return strength;
    }

    const [strength, setStrength] = useState(0);
    useEffect(() => {
        setStrength(calculateStrength())
    })
    const colors = [`gray`, `red`, `orange`, `green`]

    return <div className='strength-bar'>
        <div className='bar-container'>
            <div style={{ backgroundColor: colors[strength] }} className={`bar ${strength >= 1 ? `filled` : ``}`}></div>
        </div>
        <div className='bar-container'>
            <div style={{ backgroundColor: colors[strength] }} className={`bar ${strength >= 2 ? `filled` : ``}`}></div>
        </div>
        <div className='bar-container'>
            <div style={{ backgroundColor: colors[strength] }} className={`bar ${strength >= 3 ? `filled` : ``}`}></div>
        </div>
    </div>
}

const PasswdStrength = ({ activeOn, password }) => {
    const isShown = useDestroy(activeOn, `passwd-strength`)
    const eightChars = /.{8}/g.test(password);
    const upperLowerCase = /[a-z]/g.test(password) && /[A-Z]/g.test(password);
    const specialChars = /[!-/]|[:-@]|[[-`]|[{-~]/g.test(password);
    
    if (isShown) {
        return <div className="passwd-strength fade-in">
            <RequiredText className={`requirement ${eightChars ? `satisfied` : ``}`} text="hey">8 Characters</RequiredText>
            <RequiredText className={`requirement ${upperLowerCase ? `satisfied` : ``}`} text="hey">Lowercase & Uppercase</RequiredText>
            <p className={`requirement ${specialChars ? `satisfied` : ``}`}>Special Characters</p>
            <StrengthBar eightChars={eightChars} upperLowerCase={upperLowerCase} specialChars={specialChars}></StrengthBar>
        </div>
    }
    return null;
}

export default PasswdStrength;