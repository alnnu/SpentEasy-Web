
type User = {
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

type Account = {
    createdAt: string
    id: string
    name: string
    updatedAt: string
    userEmail: string
}