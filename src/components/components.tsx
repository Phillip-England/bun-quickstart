

export const LoginForm = (props: {
    email: string,
    loginErr: string
}): JSX.Element => {
    return (
        <form action="/" method="POST" className="flex flex-col p-4">
            <h2>Login</h2>
            { props.loginErr == "" ? <p className="invisible">invisible</p> : <p>{props.loginErr}</p>}
            <label>Email</label>
            <input type='text' name='email' autoComplete="" className="border" defaultValue={props.email} />
            <label>Password</label>
            <input type='password' name='password' autoComplete="" className="border" />
            <input type='submit' value='Submit' className='border' />
        </form>
    )
}


export const LocationForm = (props: {
    name: string,
    number: string,
    formErr: string,
}): JSX.Element => {
    return (
        <form action="/admin" method="POST" className="flex flex-col p-4">
            <h2>New CFA</h2>
            { props.formErr == "" ? <p className="invisible">invisible</p> : <p>{props.formErr}</p>}
            <label>Name</label>
            <input type='text' name='name' autoComplete="" className="border" defaultValue={props.name} />
            <label>Number</label>
            <input type='text' name='number' autoComplete="" className="border" defaultValue={props.number} />
            <input type='submit' value='Submit' className='border' />
        </form>
    )
}

export const HxGet = (props: {
    href: string
}): JSX.Element => {
    return (
        <div hx-get={props.href} hx-trigger='load' hx-swap='outerHTML'>loading...</div>
    )
}