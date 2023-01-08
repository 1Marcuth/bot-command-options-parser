function isValidBoolean(str: string) {
    return ["true", "false"].includes(str.toLocaleLowerCase())
}

export default isValidBoolean