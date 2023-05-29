
const checkValidity = (str: string, { text = false, number = false, special = false, space = false, length = 0, minLength = 0, regex = null }) => {
    const textPattern = /[a-z]|[A-Z]/g,
        numberPattern = /[0-9]/g,
        specialPattern = /[!-/]|[:-@]|[[-`]|[{-~]/g,
        spacePattern = / /g;

        
    return ((text || !textPattern.test(str))
        && (number || !numberPattern.test(str))
        && (special || !specialPattern.test(str))
        && (space || !spacePattern.test(str))
        && (!length || length == str.length)
        && (!minLength || minLength <= str.length))
}

export {
    checkValidity
}