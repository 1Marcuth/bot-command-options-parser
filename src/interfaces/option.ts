import IOptionTypes from "./option-types"
import IChoice from "./choice"

interface IOption {
    name: string
    type: IOptionTypes
    description: string
    required: boolean
    choices?: IChoice[]
}

export default IOption