import { useState } from "react";
import { checkValidity } from "../../services/auth.service";

var lastTimeout: any = null;

const useInputValid = (options: any) => {
    const [input, setInput] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(true);

    const updateInput = (newInput: string) => {
        setInput(newInput)
        clearTimeout(lastTimeout)
        const isValid = checkValidity(newInput, options);
        if (isValid) {
            setIsValid(isValid)
        } else {
            lastTimeout = setTimeout(() => {
                setIsValid(isValid)
            }, 800);
        }
    }

    return [input, updateInput, isValid] as const;
}

export default useInputValid;