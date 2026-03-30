import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-pending-exit-date.typeorm.entity';
import { SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-pending-exit-date/command/special-retirement-grant-period-pending-exit-date.command.repository.gateway';
import { SpecialRetirementGrantPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.entity';

@Injectable()
export class SpecialRetirementGrantPeriodPendingExitDateTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodPendingExitDateTypeormEntity>
  implements SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodPendingExitDateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodPendingExitDateTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodPendingExitDateTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriodPendingExitDate(
    props: SpecialRetirementGrantPeriodPendingExitDateEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantPeriodPendingExitDateTypeormEntity.build({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: props.id.toString(),
      pendingDate: props.pendingDate,
      pendingAmount: props.pendingAmount.toString(),
      specialRetirementGrantPeriod: {
        id: props.specialRetirementGrantPeriod.id.toString(),
      } as never,
    });
    return this.create(mapped);
  }
}

