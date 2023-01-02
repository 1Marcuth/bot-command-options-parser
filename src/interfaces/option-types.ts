enum OptionsTypes {
    number,
    float,
    integer,
    string,
    boolean,
    any
}

type IOptionTypes = keyof typeof OptionsTypes

export default IOptionTypes