import IValidateResult from "./interfaces/validate-result"
import IOptionTypes from "./interfaces/option-types"
import IOption from "./interfaces/option"
import IChoice from "./interfaces/choice"

class CommandOptionsParser {
    private commandOptions: IOption[]

    constructor(commandOptions: IOption[]) {
        this.commandOptions = commandOptions
    }

    public validateOptions(commandOptionsPassedValues: string[]) {
        const resultValidates = []

        for (
            let commandOptionIndex = 0;
            commandOptionIndex < this.commandOptions.length;
            commandOptionIndex++
        ) {
            const commandOption = this.commandOptions[commandOptionIndex]
            const commandOptionPassedValue = commandOptionsPassedValues[commandOptionIndex]
    
            const resultValidate = validateOption(commandOption, commandOptionPassedValue)
            resultValidates.push(resultValidate)
        }

        return resultValidates
    
        function validateOption(option: IOption, optionPassedValue: string | undefined) {
            const validateResult: IValidateResult = {
                name: option.name,
                type: option.type,
                values: {
                    raw: optionPassedValue,
                    parsed: undefined
                },
                isValid: {
                    type: false,
                    value: false
                }
            }
    
            validateResult.isValid.type = isValidType(option.type, optionPassedValue)
            validateResult.isValid.value = isValidValue(option.type, optionPassedValue, option.choices)
    
            return validateResult
    
            function isValidType(type: IOptionTypes, value: any) {
                value = value?.toLowerCase()

                const typeValidator = {
                    number(value: any) {
                        return !isNaN(value)
                    },
                    integer(value: any) {
                        return isIntegerNumber(value)
                    },
                    float(value: any) {
                        return !isIntegerNumber(value)
                    },
                    boolean(value: any) {
                        return ["true", "false"].includes(value)
                    },
                    string(value: any) {
                        return value ? true : false
                    }
                }

                if (Object.keys(typeValidator).includes(type)) {
                    // @ts-ignore
                    return typeValidator[type](value)
                }
                
                if (!value) return false
    
                return true
            }
    
            function isValidValue(type: IOptionTypes, value: any, choices:  IChoice[] | undefined = undefined) {
                if (!value) return false

                let parsedValue: any
                let isValid = false
    
                if (type === "number") {
                    if (!isNaN(value)) {
                        isValid = true
                       parsedValue = Number(value)
                    } else {
                        parsedValue = null
                    }
                } else if (type === "boolean") {
                    if (value?.toLowerCase() === "true") {
                        isValid = true
                        parsedValue = true
                    } else if (value?.toLowerCase() === "false") {
                        isValid = true
                        parsedValue = false
                    } else {
                        parsedValue = null
                    }
                } else if (type === "integer") {
                    if (isIntegerNumber(value)) {
                        isValid = true
                        parsedValue = Number(value)
                    } else {
                        parsedValue = null
                    }
                } else if (type === "float") {
                    if (!isIntegerNumber(value)) {
                        isValid = true
                        parsedValue = Number(value)
                    } else {
                        parsedValue = null
                    }
                } else {
                    parsedValue = String(value).toLowerCase()
                    isValid = true
                }
                validateResult.values.parsed = parsedValue
    
                if (choices) {
                    return choices.find(choice => choice.value === parsedValue) ? true : false
                }
    
                return isValid
            }
        }

        function isIntegerNumber(value: any): boolean {
            if (!isNaN(value)) {
                let parsedValue = Number(value)
                
                if (Number.isInteger(parsedValue)) return true

                return false
            }

            return false
        }
    } 
}

export default CommandOptionsParser