import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-under-minimum.typeorm.entity';
import { SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-under-minimum/command/special-retirement-grant-period-under-minimum.command.repository.gateway';
import { SpecialRetirementGrantPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.entity';

@Injectable()
export class SpecialRetirementGrantPeriodUnderMinimumTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodUnderMinimumTypeormEntity>
  implements SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodUnderMinimumTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodUnderMinimumTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodUnderMinimumTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriodUnderMinimum(
    props: SpecialRetirementGrantPeriodUnderMinimumEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantPeriodUnderMinimumTypeormEntity.build({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: props.id.toString(),
      contributionDate: props.contributionDate,
      contributionAmount: props.contributionAmount.toString(),
      specialRetirementGrantPeriod: {
        id: props.specialRetirementGrantPeriod.id.toString(),
      } as never,
    });
    return this.create(mapped);
  }
}
