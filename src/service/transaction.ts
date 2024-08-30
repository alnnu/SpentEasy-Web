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

    update(values: {value: number,
        accountId: string,
        categoryId: string,
        description: string,
        date: Date,
        isExpense: boolean}, id: string) {
        return api.put(`transacao/${id}`, values)
    }

    getAll() {
        return api.get('transacao/')
    }

    delete(Transaction: AccountType[]) {
        return api.delete('transacao/delete', {data:{transactions:  Transaction}})
    }
}


export default new Transaction