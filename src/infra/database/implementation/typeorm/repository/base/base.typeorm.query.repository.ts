import { Like } from 'typeorm';

import { ListedDataOutputModel } from '@core/domain/repository/base/model/output/listed-data.output.model';

import type { ListDataInputModel } from '@core/domain/repository/base/model/input/list-data.input.model';
import type { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import type { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { NotFoundError } from 'rxjs';
import type {
  FindManyOptions,
  Repository,
  EntityMetadata,
  FindOptionsWhere,
  FindOptionsOrder,
  FindOneOptions,
} from 'typeorm';

export abstract class BaseTypeormQueryRepository<T extends BaseTypeormEntity> {
  protected constructor(private readonly repository: Repository<T>) {}

  protected async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  protected async findOneOrFail(
    id: string,
    err: ConstructorType<NotFoundError>,
  ): Promise<T> {
    const find = await this.findOne({ where: { id } as FindOptionsWhere<T> });

    if (!find) {
      throw new err();
    }

    return find;
  }

  protected async find(options: FindManyOptions<T>): Promise<Array<T>> {
    return await this.repository.find(options);
  }

  protected async list(
    listBaseDto: ListDataInputModel,
    options?: FindManyOptions<T>,
  ): Promise<ListedDataOutputModel<T>> {
    const order = this.generateOrder(listBaseDto.sortField);
    const where = this.generateWhere(listBaseDto.field, listBaseDto.search);

    const paginationOffset = 1;
    const skip = (listBaseDto.page - paginationOffset) * listBaseDto.limit;

    const findAndCountOptions: FindManyOptions<T> = {
      take: listBaseDto.limit,
      skip,
      order,
    };

    findAndCountOptions.relations = options?.relations ?? {};

    findAndCountOptions.select = options?.select ?? {};

    findAndCountOptions.order = options?.order ?? order;

    findAndCountOptions.where = options?.where
      ? this.mergeWhereConditions(where, options.where)
      : where;

    const [data, count] =
      await this.repository.findAndCount(findAndCountOptions);

    return new ListedDataOutputModel({
      page: listBaseDto.page,
      limit: listBaseDto.limit,
      totalItems: count,
      resource: data,
    });
  }

  private generateOrder(sortField: string | null): FindOptionsOrder<T> {
    const order: FindOptionsOrder<T> = {};

    if (sortField !== null) {
      const ordination = sortField.startsWith('-') ? 'DESC' : 'ASC';
      const field = sortField.replace('-', '');

      if (field.includes('.')) {
        return this.generateOrderToSubObjects(field, ordination);
      }

      Object.assign(order, {
        [field]: ordination,
      });
    }

    return order;
  }

  private generateOrderToSubObjects(
    sortField: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): FindOptionsOrder<T> {
    const fields = sortField.split('.');

    const orderByType: Record<string, unknown> = {};
    let currentLevel: Record<string, unknown> = orderByType;

    const firstIndex = 0;
    const lastIndex = -1;

    for (const field of fields.slice(firstIndex, lastIndex)) {
      const nextLevel: Record<string, unknown> = {};
      currentLevel[field] = nextLevel;
      currentLevel = nextLevel;
    }

    const lastFieldIndex = fields.length + lastIndex;
    currentLevel[fields[lastFieldIndex] as string] = sortOrder;

    return orderByType as FindOptionsOrder<T>;
  }

  private generateWhere(
    field: string | null,
    search: string | null,
  ): FindOptionsWhere<T>[] | FindOptionsWhere<T> {
    const where: FindOptionsWhere<T> = {};

    if (search !== null) {
      if (field !== null) {
        if (field.includes('.')) {
          const whereSubObjects = this.generateWhereToSearchSubObjects(
            field,
            search,
          );
          Object.assign(where, whereSubObjects);
          return where;
        }

        Object.assign(where, { [field]: Like(`%${search}%`) });
        return where;
      }

      type EntityKeysType =
        | keyof BaseTypeormEntity
        | keyof CustomerTypeormEntity;

      const excludedColumns: EntityKeysType[] = [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'password',
      ];

      const entity: EntityMetadata = this.repository.metadata;
      const columns: string[] = entity.columns
        .filter(
          (column) =>
            !excludedColumns.includes(column.propertyName as EntityKeysType),
        )
        .map((column) => column.propertyName);

      return columns.map(
        (column): FindOptionsWhere<T> =>
          ({
            [column]: Like(`%${search}%`),
          }) as FindOptionsWhere<T>,
      );
    }

    return where;
  }

  private mergeWhereConditions(
    a: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    b: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
  ): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    const isArrayA = Array.isArray(a);
    const isArrayB = Array.isArray(b);

    if (!isArrayA && !isArrayB) {
      return { ...a, ...b };
    }

    const arrayA = isArrayA ? a : [a];
    const arrayB = isArrayB ? b : [b];

    return [...arrayA, ...arrayB];
  }

  private generateWhereToSearchSubObjects(
    field: string,
    search: string,
  ): FindOptionsWhere<T> {
    const fields: string[] = field.split('.');

    let subObjectsWhere: FindOptionsWhere<T> = {};

    const minFieldDepth = 2;

    for (let i = fields.length; i > minFieldDepth; i--) {
      const offSetToParentKey = -2;
      const offSetToChildKey = -1;

      const parentKey = fields[i - offSetToParentKey];
      const childKey = fields[i - offSetToChildKey];

      if (typeof parentKey !== 'string' || typeof childKey !== 'string') {
        continue;
      }

      if (i === fields.length) {
        Object.assign(subObjectsWhere, {
          [parentKey]: { [childKey]: Like(`%${search}%`) },
        });
      } else {
        subObjectsWhere = {
          [parentKey]: subObjectsWhere,
        } as FindOptionsWhere<T>;
      }
    }

    return subObjectsWhere;
  }
}
