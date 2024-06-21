import { HxGet, LocationForm, LoginForm } from "../components/components"
import type { CFA } from "../models/cfa"
import { BaseTemplate } from "../templates/templates"



export const ViewHome = (props: {
    email: string,
    loginErr: string
}): JSX.Element => {
    return (
        <BaseTemplate title="Home">
            <LoginForm email={props.email} loginErr={props.loginErr} />
        </BaseTemplate>
    )
}



export const ViewAdminHome = (props: {
    name: string,
    number: string,
    formErr: string,
}): JSX.Element => {
    return ( 
        <BaseTemplate title="Admin">
            <LocationForm name={props.name} number={props.number} formErr={props.formErr} />
            <HxGet href="/c/cfa" />
        </BaseTemplate>
    )
}

export const ViewCFAList = (props: {
    cfaLocations: CFA[]
}): JSX.Element => {
    return (
        <div className='p-4 flex flex-col gap-2'>
            {props.cfaLocations.map((item: CFA, index: number) => (
                <a href={`/admin/cfa/${item.id}`} className='flex flex-row justify-between border-b' key={index}>
                    <p>{item.name}</p>
                    <p>{item.number}</p>
                </a>
            ))}
        </div>
    )
}