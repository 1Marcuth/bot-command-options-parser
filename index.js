const CommandOptionsParser = require("./dist").default

const commandOptions = [
    {
        name: "person-name",
        type: "string",
        descritpion: "Name of the person",
        required: true
    },
    {
        name: "person-age",
        type: "integer",
        descritpion: "Age of the person",
        required: true
    },
    {
        name: "person-like-minecraft",
        type: "boolean",
        descritpion: "Does the person like to play minecraft?",
        required: true
    }
]
const commandOptionsPassed = [ "Marcuth", "16.7", "true" ]

const optionsParser = new CommandOptionsParser(commandOptions)

const validateResult = optionsParser.validateOptions(commandOptionsPassed)

console.log(validateResult)