import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
    constructor(){}

    async getOneById(id: number) {
        return { message: `Це ендпоінт, що повертає 1 транзакцію з id ${id}` };
    }
}
