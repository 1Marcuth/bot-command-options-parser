import IValidateResult from "./interfaces/validate-result"
import IOptionTypes from "./interfaces/option-types"
import IOption from "./interfaces/option"
import IChoice from "./interfaces/choice"

import isValidInteger from "./utils/validator/number/integer"
import isValidFloat from "./utils/validator/number/float"
import isValidBoolean from "./utils/validator/boolean"
import isValidNumber from "./utils/validator/number"
import isValidString from "./utils/validator/string"

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
    
        function validateOption(option: IOption, optionPassedValue: string) {
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
    
            function isValidType(type: IOptionTypes, value: string) {
                value = value?.trim()

                const typeValidator = {
                    number: (value: string) => isValidNumber(value),
                    integer: (value: string) => isValidInteger(value),
                    float: (value: string) => isValidFloat(value),
                    boolean: (value: string) => isValidBoolean(value),
                    string: (value: string) => isValidString(value)
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

                switch (type) {
                    case "string":
                        if (isValidString(value)) {
                            parsedValue = String(value)
                            isValid = true
                        } else {
                            parsedValue = null
                            isValid = false
                        }
                        break

                    case "number":
                        if (isValidNumber(value)) {
                            isValid = true
                            parsedValue = Number(value)
                        } else {
                            parsedValue = null
                        }
                        break
                    
                    case "integer":
                        if (isValidInteger(value)) {
                            isValid = true
                            parsedValue = Number(value)
                        } else {
                            parsedValue = null
                        }
                        break
                    
                    case "integer":
                        if (isValidFloat(value)) {
                            isValid = true
                            parsedValue = Number(value)
                        } else {
                            parsedValue = null
                        }
                        break

                    case "boolean":
                        if (isValidBoolean(value)) {
                            if (value?.toLowerCase() === "true") {
                                isValid = true
                                parsedValue = true
                            } else {
                                isValid = true
                                parsedValue = false
                            }
                        } else {
                            parsedValue = null
                        }
                        break
                }

                validateResult.values.parsed = parsedValue
    
                if (choices) {
                    isValid = choices.find(choice => choice.value === parsedValue) ? true : false
                }

                return isValid
            }
        }
    } 
}

export default CommandOptionsParser