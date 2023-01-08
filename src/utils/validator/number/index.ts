function isValidNumber(str: string) {
    if (isNaN(str as any)) return false
    return true
}

export default isValidNumber