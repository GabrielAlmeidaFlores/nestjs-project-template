import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period/command/special-retirement-rejection-work-period.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity';

@Injectable()
export class SpecialRetirementRejectionWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionWorkPeriodTypeormEntity>
  implements SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionWorkPeriodTypeormEntity)
    repository: Repository<SpecialRetirementRejectionWorkPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionWorkPeriod(
    props: SpecialRetirementRejectionWorkPeriodEntity,
  ): TransactionType {
    const specialRetirementRejection =
      props.specialRetirementRejectionId !== null
        ? Object.assign(new SpecialRetirementRejectionTypeormEntity(), {
            id: props.specialRetirementRejectionId.toString(),
          })
        : null;

    return this.create(
      SpecialRetirementRejectionWorkPeriodTypeormEntity.build({
        id: props.id.toString(),
        bondOrigin: props.bondOrigin,
        startDate: props.startDate,
        endDate: props.endDate,
        category: props.category,
        pendencyReason: props.pendencyReason,
        periodConsideration: props.periodConsideration,
        contributionAverage: props.contributionAverage,
        status: props.status,
        gracePeriod: props.gracePeriod,
        activityType: props.activityType,
        specialRetirementRejection,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionWorkPeriodBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(SpecialRetirementRejectionWorkPeriodTypeormEntity)
        .softDelete({
          specialRetirementRejection: {
            id: specialRetirementRejectionId.toString(),
          },
        });
    };
  }
}
