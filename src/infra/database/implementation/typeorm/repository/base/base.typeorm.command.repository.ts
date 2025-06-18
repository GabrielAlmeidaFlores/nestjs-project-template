import type { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';
import type { DeepPartial, Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseTypeormCommandRepository<
  T extends BaseTypeormEntity,
> {
  protected constructor(private readonly repository: Repository<T>) {}

  protected async create(data: DeepPartial<T>): Promise<void> {
    const newData = this.repository.create(data);
    await this.repository.save(newData);
  }

  protected async update(
    id: string,
    data: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    await this.repository.update(id, data);
  }

  protected async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
