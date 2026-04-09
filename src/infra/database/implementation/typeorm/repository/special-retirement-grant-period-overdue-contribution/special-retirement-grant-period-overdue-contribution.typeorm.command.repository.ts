import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-overdue-contribution.typeorm.entity';
import { SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-overdue-contribution/command/special-retirement-grant-period-overdue-contribution.command.repository.gateway';
import { SpecialRetirementGrantPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.entity';

@Injectable()
export class SpecialRetirementGrantPeriodOverdueContributionTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodOverdueContributionTypeormEntity>
  implements
    SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodOverdueContributionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SpecialRetirementGrantPeriodOverdueContributionTypeormEntity,
    )
    repository: Repository<SpecialRetirementGrantPeriodOverdueContributionTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriodOverdueContribution(
    props: SpecialRetirementGrantPeriodOverdueContributionEntity,
  ): TransactionType {
    const mapped =
      SpecialRetirementGrantPeriodOverdueContributionTypeormEntity.build({
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id: props.id.toString(),
        overdueDate: props.overdueDate,
        paymentDate: props.paymentDate,
        specialRetirementGrantPeriod: {
          id: props.specialRetirementGrantPeriod.id.toString(),
        } as never,
      });
    return this.create(mapped);
  }
}
