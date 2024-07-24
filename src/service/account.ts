import { api } from "@/util/api"


class Account {
    create(values:{name:string}) {
        return api.post('account/create', values)
    }
}

export default new Account