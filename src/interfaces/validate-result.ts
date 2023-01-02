interface IValues {
    raw: string | undefined
    parsed: any
}

interface IIsValid {
    type: boolean
    value: boolean
}

interface IValidateResult {
    name: string
    type: string
    values: IValues
    isValid: IIsValid
}

export default IValidateResult