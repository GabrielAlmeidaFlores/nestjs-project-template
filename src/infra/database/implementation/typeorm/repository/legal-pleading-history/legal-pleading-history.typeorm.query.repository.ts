import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/legal-pleading-history.query.repository.gateway';
import { ListLegalPleadingHistoryQueryParam } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/param/list-legal-pleading-history.query.param';
import { GetLegalPleadingHistoryQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/result/get-legal-pleading-history.query.result';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

@Injectable()
export class LegalPleadingHistoryTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalPleadingHistoryTypeormEntity>
  implements LegalPleadingHistoryQueryRepositoryGateway
{
  protected readonly _type = LegalPleadingHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingHistoryTypeormEntity)
    repository: Repository<LegalPleadingHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneLegalPleadingHistoryById(
    id: LegalPleadingHistoryId,
  ): Promise<GetLegalPleadingHistoryQueryResult | null> {
    const data = await this.repository.findOne({
      where: { id: id.toString() },
      relations: ['legalPleading'],
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      LegalPleadingHistoryTypeormEntity,
      GetLegalPleadingHistoryQueryResult,
    );
  }

  public async listByLegalPleadingId(
    legalPleadingId: LegalPleadingId,
    listData: ListLegalPleadingHistoryQueryParam,
  ): Promise<ListDataOutputModel<GetLegalPleadingHistoryQueryResult>> {
    const data = await this.list(listData, {
      where: {
        legalPleading: {
          id: legalPleadingId.toString(),
        },
      },
      relations: ['legalPleading'],
      order: {
        createdAt: 'DESC',
      },
    });

    const resource = this.mapperGateway.mapArray(
      data.resource,
      LegalPleadingHistoryTypeormEntity,
      GetLegalPleadingHistoryQueryResult,
    );

    return new ListDataOutputModel({
      page: data.page,
      limit: data.limit,
      totalItems: data.totalItems,
      resource,
    });
  }
}
