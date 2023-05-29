import { useState } from "react"

const useTimer = (timeout: number) => {
    const [timer, setTimer] = useState(false)
    setTimeout(() => {
        setTimer(true)
    }, timeout);
    return timer;
}

export default useTimer;