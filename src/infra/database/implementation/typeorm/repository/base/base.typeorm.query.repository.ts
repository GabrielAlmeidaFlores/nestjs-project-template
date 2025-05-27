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
    const sortField = listBaseDto.sortField;
    const order = this.generateSortOrder(sortField);

    const field = listBaseDto.field;
    const search = listBaseDto.search;
    const where = this.generateSearchWhere(field, search);

    const currentPage = listBaseDto.page;
    const itemsPerPage = listBaseDto.limit;
    const paginationOffset = 1;
    const skip = (currentPage - paginationOffset) * itemsPerPage;

    const resolvedOrder = options?.order ?? order;
    const resolvedRelations = options?.relations ?? {};
    const resolvedSelect = options?.select ?? {};
    const resolvedWhere = options?.where
      ? this.mergeWhereConditions(where, options.where)
      : where;

    const findAndCountOptions: FindManyOptions<T> = {
      take: itemsPerPage,
      skip,
      order: resolvedOrder,
      relations: resolvedRelations,
      select: resolvedSelect,
      where: resolvedWhere,
    };

    const [data, count] =
      await this.repository.findAndCount(findAndCountOptions);

    return new ListedDataOutputModel({
      page: currentPage,
      limit: itemsPerPage,
      totalItems: count,
      resource: data,
    });
  }

  private generateSortOrder(sortField: string | null): FindOptionsOrder<T> {
    const isSortFieldMissing = sortField === null;
    if (isSortFieldMissing) {
      return {};
    }

    const isDescendingSort = sortField.startsWith('-');
    const sortDirection: 'ASC' | 'DESC' = isDescendingSort ? 'DESC' : 'ASC';
    const normalizedField = sortField.replace('-', '');
    const isNestedField = normalizedField.includes('.');

    if (isNestedField) {
      return this.generateNestedSortOrder(normalizedField, sortDirection);
    }

    return { [normalizedField]: sortDirection } as FindOptionsOrder<T>;
  }

  private generateNestedSortOrder(
    sortField: string,
    sortDirection: 'ASC' | 'DESC',
  ): FindOptionsOrder<T> {
    const pathSegments = sortField.split('.');
    const rootLevelOrder: Record<string, unknown> = {};
    let currentLevel = rootLevelOrder;

    const sliceStartIndex = 0;
    const sliceEndOffset = 1;
    const sliceEndIndex = pathSegments.length - sliceEndOffset;
    const intermediateSegments = pathSegments.slice(
      sliceStartIndex,
      sliceEndIndex,
    );

    for (const segment of intermediateSegments) {
      const nextLevel: Record<string, unknown> = {};
      currentLevel[segment] = nextLevel;
      currentLevel = nextLevel;
    }

    const lastSegmentIndex = pathSegments.length - sliceEndOffset;
    const lastSegment = pathSegments[lastSegmentIndex] as string;
    currentLevel[lastSegment] = sortDirection;

    return rootLevelOrder as FindOptionsOrder<T>;
  }

  private generateSearchWhere(
    field: string | null,
    search: string | null,
  ): FindOptionsWhere<T>[] | FindOptionsWhere<T> {
    const isSearchMissing = search === null;
    if (isSearchMissing) {
      return {};
    }

    const isFieldProvided = field !== null;
    if (isFieldProvided) {
      return this.generateSearchWhereWithField(field, search);
    }

    return this.generateSearchWhereAcrossAllFields(search);
  }

  private generateSearchWhereWithField(
    field: string,
    search: string,
  ): FindOptionsWhere<T> {
    const isNestedField = field.includes('.');
    if (isNestedField) {
      return this.generateNestedSearchWhere(field, search);
    }

    const databaseSearchOperation = Like(`%${search}%`);
    const likeCondition = { [field]: databaseSearchOperation };
    return likeCondition as FindOptionsWhere<T>;
  }

  private generateSearchWhereAcrossAllFields(
    search: string,
  ): FindOptionsWhere<T>[] {
    type EntityKeysType = keyof BaseTypeormEntity | keyof CustomerTypeormEntity;

    const excludedFields: EntityKeysType[] = [
      'id',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'password',
    ];

    const entityMetadata: EntityMetadata = this.repository.metadata;
    const entityColumns = entityMetadata.columns;

    const excludedFieldNames = excludedFields as string[];

    const filteredColumns = entityColumns.filter((column) => {
      const columnName = column.propertyName;
      const isExcluded = excludedFieldNames.includes(columnName);
      return !isExcluded;
    });

    const searchableColumnNames = filteredColumns.map((column) => {
      const columnName = column.propertyName;
      return columnName;
    });

    const searchConditions = searchableColumnNames.map((columnName) => {
      const databaseSearchOperation = Like(`%${search}%`);
      const likeCondition = { [columnName]: databaseSearchOperation };
      return likeCondition as FindOptionsWhere<T>;
    });

    return searchConditions;
  }

  private generateNestedSearchWhere(
    field: string,
    search: string,
  ): FindOptionsWhere<T> {
    const path = field.split('.');
    let nestedWhere: FindOptionsWhere<T> = {};
    const minDepthForNesting = 2;
    const parentOffset = 2;
    const childOffset = 1;

    for (let i = path.length; i > minDepthForNesting; i--) {
      const parentKey = path[i - parentOffset];
      const childKey = path[i - childOffset];

      const areKeysValid =
        typeof parentKey === 'string' && typeof childKey === 'string';
      if (!areKeysValid) {
        continue;
      }

      const isInnermostLevel = i === path.length;
      if (isInnermostLevel) {
        const databaseSearchOperation = Like(`%${search}%`);

        nestedWhere = {
          [parentKey]: { [childKey]: databaseSearchOperation },
        } as FindOptionsWhere<T>;
      } else {
        nestedWhere = {
          [parentKey]: nestedWhere,
        } as FindOptionsWhere<T>;
      }
    }

    return nestedWhere;
  }

  private mergeWhereConditions(
    baseConditions: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    additionalConditions: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
  ): FindOptionsWhere<T>[] {
    const isBaseArray = Array.isArray(baseConditions);
    const isAdditionalArray = Array.isArray(additionalConditions);

    const normalizedBaseConditions = isBaseArray
      ? baseConditions
      : [baseConditions];

    const normalizedAdditionalConditions = isAdditionalArray
      ? additionalConditions
      : [additionalConditions];

    return [...normalizedBaseConditions, ...normalizedAdditionalConditions];
  }
}
