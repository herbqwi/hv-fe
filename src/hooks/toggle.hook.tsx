import { useState } from "react"


const useToggle = (initState: boolean) => {
    const [value, setValue] = useState<boolean>(initState)

    const toggleValue = () => {
        setValue(!value)
    }

    return [value, toggleValue] as const;
}

export default useToggle