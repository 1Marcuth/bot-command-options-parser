import isValidNumber from "./index"

function isValidInteger(str: string) {
    if (!isValidNumber(str)) return false
    if (!Number.isInteger(Number(str))) return false
    return true
}

export default isValidInteger