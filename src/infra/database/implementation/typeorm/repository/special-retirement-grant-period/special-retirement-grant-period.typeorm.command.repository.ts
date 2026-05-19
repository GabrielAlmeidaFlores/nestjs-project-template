import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { SpecialRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/command/special-retirement-grant-period.command.repository.gateway';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodTypeormEntity>
  implements SpecialRetirementGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriod(
    props: SpecialRetirementGrantPeriodEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantPeriodTypeormEntity.build({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: props.id.toString(),
      sequencial: props.sequencial ?? null,
      employmentRelationshipSource: props.employmentRelationshipSource ?? null,
      startDate: props.startDate ?? null,
      endDate: props.endDate ?? null,
      category: props.category ?? null,
      status: props.status ?? null,
      averageContributionAmount:
        props.averageContributionAmount?.toString() ?? null,
      shouldConsiderPeriod: props.shouldConsiderPeriod,
      shouldConsiderLastRemunerationAsExitDate:
        props.shouldConsiderLastRemunerationAsExitDate,
      belowTheMinimum: props.belowTheMinimum ?? null,
      leaveDate: props.leaveDate ?? null,
      cnisDocument: props.cnisDocument ?? null,
      specialRetirementGrant: {
        id: props.specialRetirementGrant.id.toString(),
      } as never,
    });

    return this.create(mapped);
  }

  public deleteSpecialRetirementGrantPeriod(
    id: SpecialRetirementGrantPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
