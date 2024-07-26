import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  constructor() {}

  async getAll() {
    return {
      message: 'Це ендпоінт, що повертає всі наявні в базі записи працівників',
    };
  }

  async getOneById(id: number) {
    return {
      message: `Це ендпоінт, що повертає 1 запис працівника з id ${id}`,
    };
  }

  async getOneByName(name: string) {
    return {
      message: `Це ендпоінт, що повертає 1 запис працівника з ФІО ${name}`,
    };
  }
}
