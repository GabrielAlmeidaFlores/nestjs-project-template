import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period-earnings-history/command/special-retirement-rejection-work-period-earnings-history.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity';

@Injectable()
export class SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity>
  implements
    SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionWorkPeriodEarningsHistory(
    props: SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    const specialRetirementRejectionWorkPeriod =
      props.specialRetirementRejectionWorkPeriodId !== null
        ? Object.assign(
            new SpecialRetirementRejectionWorkPeriodTypeormEntity(),
            {
              id: props.specialRetirementRejectionWorkPeriodId.toString(),
            },
          )
        : null;

    return this.create(
      SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity.build({
        id: props.id.toString(),
        competence: props.competence,
        remuneration:
          props.remuneration !== null ? props.remuneration.toString() : null,
        indicators: props.indicators,
        paymentDate: props.paymentDate,
        contribution:
          props.contribution !== null ? props.contribution.toString() : null,
        contributionSalary:
          props.contributionSalary !== null
            ? props.contributionSalary.toString()
            : null,
        competenceBelowTheMinimum: props.competenceBelowTheMinimum,
        specialRetirementRejectionWorkPeriod,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionWorkPeriodEarningsHistoryBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const workPeriods = await manager
        .getRepository(SpecialRetirementRejectionWorkPeriodTypeormEntity)
        .find({
          where: {
            specialRetirementRejection: {
              id: specialRetirementRejectionId.toString(),
            },
          },
        });

      if (workPeriods.length === 0) {
        return;
      }

      const workPeriodIds = workPeriods.map((workPeriod) => workPeriod.id);
      const earningsHistoryEntries = await manager
        .getRepository(
          SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
        )
        .find({
          where: {
            specialRetirementRejectionWorkPeriod: {
              id: In(workPeriodIds),
            },
          },
        });

      if (earningsHistoryEntries.length === 0) {
        return;
      }

      await manager
        .getRepository(
          SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete(earningsHistoryEntries.map((entry) => entry.id));
    };
  }
}
