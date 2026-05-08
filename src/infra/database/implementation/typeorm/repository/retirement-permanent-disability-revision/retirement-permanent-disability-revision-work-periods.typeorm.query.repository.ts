import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/retirement-permanent-disability-revision-work-periods.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>
  implements RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPermanentDisabilityRevisionWorkPeriodsIdOrFail(
    id: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
      GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
    );
  }
}
