import { api } from "@/util/api"


class Account {
    create(values:{name:string}) {
        return api.post('account/create', values)
    }

    update(values: {name:string}, id: string) {
        return api.put(`account/${id}`, values)
    }

    getAll() {
        return api.get('account/')
    }

    delete(account: AccountType[]) {
        return api.delete('account/delete', {data:{accounts:  account}})
    }
}

export default new Account