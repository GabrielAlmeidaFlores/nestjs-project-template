import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods-earnings-history/command/retirement-permanent-disability-revision-work-periods-earnings-history.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }
}
