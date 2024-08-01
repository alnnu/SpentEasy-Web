import { api } from "@/util/api";

class Auth {
    doLogin(email: string | undefined, password: string | undefined) {
        return api.post(`/auth/login`, {
            email: email,
            password: password,
        });
    }
    create(account: User) {
        return api.post('auth/create', account)
    }
}

export default new Auth()