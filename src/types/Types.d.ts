
type Account = {
    email: string,
    name: string,
    lastName: string,
    password: string,
    passwordConfirm: string
}

type SignUpError = {
    location: string,
    msg: string,
    path: string,
    type: string,
    value: string,
}