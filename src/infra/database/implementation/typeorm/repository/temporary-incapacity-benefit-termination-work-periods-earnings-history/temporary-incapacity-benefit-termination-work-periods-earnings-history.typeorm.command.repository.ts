import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-work-periods-earnings-history/command/temporary-incapacity-benefit-termination-work-periods-earnings-history.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistory(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }
}
