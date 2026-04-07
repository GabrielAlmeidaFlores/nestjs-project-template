import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RegulatoryUpdateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ListRegulatoryUpdatesQueryParam } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/param/list-regulatory-updates.query.param';
import { RegulatoryUpdateQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/regulatory-update.query.repository.gateway';
import { GetRegulatoryUpdateQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/result/get-regulatory-update.query.result';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

@Injectable()
export class RegulatoryUpdateTypeormQueryRepository
  extends BaseTypeormQueryRepository<RegulatoryUpdateTypeormEntity>
  implements RegulatoryUpdateQueryRepositoryGateway
{
  protected readonly _type = RegulatoryUpdateTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateTypeormEntity)
    repository: Repository<RegulatoryUpdateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneRegulatoryUpdateById(
    id: RegulatoryUpdateId,
  ): Promise<GetRegulatoryUpdateQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: ['mainChanges'],
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      RegulatoryUpdateTypeormEntity,
      GetRegulatoryUpdateQueryResult,
    );
  }

  public async listRegulatoryUpdates(
    param: ListRegulatoryUpdatesQueryParam,
  ): Promise<ListDataOutputModel<GetRegulatoryUpdateQueryResult>> {
    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    const sortField = param.sortField ?? '-createdAt';
    const isDescending = sortField.startsWith('-');
    const fieldName = isDescending ? sortField.substring(1) : sortField;
    const sortDirection = isDescending ? ('DESC' as const) : ('ASC' as const);

    const [data, totalItems] = await this.repository.findAndCount({
      where: this.buildWhereConditions(param),
      order: { [fieldName]: sortDirection },
      skip,
      take: limit,
    });

    const resource = this.mapperGateway.mapArray(
      data,
      RegulatoryUpdateTypeormEntity,
      GetRegulatoryUpdateQueryResult,
    );

    return new ListDataOutputModel({ page, limit, totalItems, resource });
  }

  public async findAllTitlesAndDates(): Promise<
    Array<{ title: string; publishedAt: Date | null }>
  > {
    const data = await this.repository.find({
      select: { title: true, publishedAt: true },
    });

    return data.map((item) => ({
      title: item.title,
      publishedAt: item.publishedAt,
    }));
  }

  public async countAllRegulatoryUpdates(): Promise<number> {
    return this.repository.count();
  }

  public async findLastVerifiedAt(): Promise<Date | null> {
    const results = await this.repository.find({
      order: { updatedAt: 'DESC' },
      select: { updatedAt: true },
      take: 1,
    });

    return results[0]?.updatedAt ?? null;
  }

  private buildWhereConditions(
    param: ListRegulatoryUpdatesQueryParam,
  ):
    | FindOptionsWhere<RegulatoryUpdateTypeormEntity>
    | FindOptionsWhere<RegulatoryUpdateTypeormEntity>[] {
    const dateFilter =
      param.dateStart !== null && param.dateEnd !== null
        ? { publishedAt: Between(param.dateStart, param.dateEnd) }
        : {};

    if (param.searchBy === null || param.searchBy.trim() === '') {
      return dateFilter;
    }

    const searchTerm = `%${param.searchBy.trim().toLowerCase()}%`;

    return [
      { title: Like(searchTerm), ...dateFilter },
      { summary: Like(searchTerm), ...dateFilter },
      { legalIdentifier: Like(searchTerm), ...dateFilter },
    ];
  }
}
