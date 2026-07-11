export enum FieldType {
    Input,
    InputPassword,
    InputEmail,
    Link, 
    Button,
    List
}

export default interface IFormElementListItem {
    label: string,
    value: string
}

export default interface IFormElement {
    name: string,
    placeholder: string,
    type: FieldType,
    listItems?: Array<IFormElementListItem>
    route?: string
}