import { api } from "@/util/api"


class Account {
    create(values:{name:string}) {
        return api.post('account/create', values)
    }

    getAll() {
        return api.get('account/')
    }

    delete(account: Account[]) {
        return api.delete('account/delete', {data:{accounts:  account}})
    }
}

export default new Account