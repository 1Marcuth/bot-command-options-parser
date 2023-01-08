import isValidNumber from "./index"

function isValidFloat(str: string) {
    if (!isValidNumber(str)) return false
    if (Number.isInteger(Number(str))) return false
    return true
}

export default isValidFloat