import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-earnings-history.typeorm.entity';
import { SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/command/special-retirement-grant-earnings-history.command.repository.gateway';
import { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';

@Injectable()
export class SpecialRetirementGrantEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantEarningsHistoryTypeormEntity>
  implements SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantEarningsHistoryTypeormEntity)
    repository: Repository<SpecialRetirementGrantEarningsHistoryTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantEarningsHistory(
    props: SpecialRetirementGrantEarningsHistoryEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantEarningsHistoryTypeormEntity.build({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: props.id.toString(),
      competence: props.competence ?? null,
      remuneration: props.remuneration ?? null,
      indicators: props.indicators ?? null,
      paymentDate: props.paymentDate ?? null,
      competenceBelowTheMinimum: props.competenceBelowTheMinimum ?? null,
      specialRetirementGrant: {
        id: props.specialRetirementGrant.id.toString(),
      } as never,
      specialRetirementGrantPeriod: {
        id: props.specialRetirementGrantPeriod.id.toString(),
      } as never,
    });

    return this.create(mapped);
  }

  public updateSpecialRetirementGrantEarningsHistory(
    id: string,
    props: SpecialRetirementGrantEarningsHistoryEntity,
  ): TransactionType {
    return this.update(id, {
      updatedAt: new Date(),
      competence: props.competence ?? null,
      remuneration: props.remuneration ?? null,
      indicators: props.indicators ?? null,
      paymentDate: props.paymentDate ?? null,
      competenceBelowTheMinimum: props.competenceBelowTheMinimum ?? null,
    } as SpecialRetirementGrantEarningsHistoryTypeormEntity);
  }

  public deleteSpecialRetirementGrantEarningsHistory(
    id: string,
  ): TransactionType {
    return this.delete(id);
  }
}
