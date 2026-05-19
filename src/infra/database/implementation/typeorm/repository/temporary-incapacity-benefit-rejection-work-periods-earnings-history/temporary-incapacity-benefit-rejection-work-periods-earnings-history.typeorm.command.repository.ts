import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-work-periods-earnings-history/command/temporary-incapacity-benefit-rejection-work-periods-earnings-history.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistory(
    props: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }
}
