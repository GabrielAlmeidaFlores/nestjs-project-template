import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/retirement-permanent-disability-revision-work-periods.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>,
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
        relations: {
          retirementPermanentDisabilityRevision: true,
        },
      },
      err,
    );

    if (!data.retirementPermanentDisabilityRevision) {
      throw new IncompleteSourceDataForMappingError({
        destinationClass:
          GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.name,
        sourceClass:
          RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.name,
      });
    }

    return GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.build(
      {
        retirementPermanentDisabilityRevisionWorkPeriodsId:
          new RetirementPermanentDisabilityRevisionWorkPeriodsId(data.id),
        bondOrigin: data.bondOrigin,
        startDate: data.startDate,
        endDate: data.endDate,
        category: data.category,
        competenceBelowTheMinimum: data.competenceBelowTheMinimum,
        pendencyReason: data.pendencyReason,
        periodConsideration: data.periodConsideration,
        contributionAverage:
          data.contributionAverage !== null
            ? new DecimalValue(data.contributionAverage)
            : null,
        status: data.status,
        gracePeriod: data.gracePeriod,
        retirementPermanentDisabilityRevisionId:
          new RetirementPermanentDisabilityRevisionId(
            data.retirementPermanentDisabilityRevision.id,
          ),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
    );
  }
}
