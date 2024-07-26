import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor() {}

  async getAll() {
    return { message: 'Це ендпоінт, що повертає всі наявні в базі книги' };
  }

  async getOneById(id: number) {
    return { message: `Це ендпоінт, що повертає 1 книгу з id ${id}` };
  }
}
