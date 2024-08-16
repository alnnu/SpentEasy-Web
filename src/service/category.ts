import { api } from "@/util/api"

class Category {
    create(values:{name:string}) {
        return api.post('category/create', values)
    }

    update(values: {name:string}, id: string) {
        return api.put(`category/${id}`, values)
    }

    getAll() {
        return api.get('category/')
    }

    delete(account: AccountType[]) {
        return api.delete('category/delete', {data:{categories:  account}})
    }
}

export default new Category