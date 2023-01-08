enum OptionsTypes {
    number,
    float,
    integer,
    string,
    boolean
}

type IOptionTypes = keyof typeof OptionsTypes

export default IOptionTypes