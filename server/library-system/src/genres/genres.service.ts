import { Injectable } from '@nestjs/common';

@Injectable()
export class GenresService {
  constructor() {}

  async getAll() {
    return {
      message: 'Це ендпоінт, що повертає всі наявні в базі записи жанрів',
    };
  }

  async getOneByCode(code: string) {
    return { message: `Це ендпоінт, що повертає 1 жанр з кодом ${code}` };
  }
}
