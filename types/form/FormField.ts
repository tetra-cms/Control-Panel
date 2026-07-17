import type IFormElementListItem from "./IFormElementListItem"

export enum FieldType {
    Hidden,
    Input,
    TextArea,
    InputPassword,
    InputEmail,
    Link, 
    Button,
    List,
    Checkbox,
    Upload
}

export default interface IFormElement {
    name: string
    placeholder: string
    type: FieldType
    default?: string
    listItems?: Array<IFormElementListItem>
    route?: string

    checked?: boolean

    maxSize?: number
    extensions?: Array<string>
}