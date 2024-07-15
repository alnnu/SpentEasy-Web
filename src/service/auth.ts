import { api } from "@/util/api";

class Auth {
    create(account: Account) {
        return api.post('auth/create', account)
    }
}

export default new Auth()