import { api } from "@/util/api" 

class Transaction {
    create(values:{value: number,
        accountId: string,
        categoryId: string,
        description: string,
        date: Date,
        isExpense: boolean}) {
        return api.post('transacao/create', values)
    }

    update(values: {name:string}, id: string) {
        return api.put(`transacao/${id}`, values)
    }

    getAll() {
        return api.get('transacao/')
    }

    delete(account: AccountType[]) {
        return api.delete('transacao/delete', {data:{categories:  account}})
    }
}


export default new Transaction