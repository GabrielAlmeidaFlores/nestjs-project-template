import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-work-periods-earnings-history/command/permanent-incapacity-benefit-terminated-work-periods-earnings-history.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/permanent-incapacity-benefit-terminated-work-periods-earnings-history.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistory(
    props: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }
}
