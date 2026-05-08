import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/command/retirement-permanent-disability-revision-work-periods.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>
  implements RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionWorkPeriods(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRevisionWorkPeriods(
    id: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAllByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity)
        .softDelete({
          retirementPermanentDisabilityRevision: {
            id: retirementPermanentDisabilityRevisionId.toString(),
          },
        });
    };
  }
}
