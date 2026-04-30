import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period-legal-framework.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-special-period-legal-framework/command/special-retirement-rejection-work-special-period-legal-framework.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity';

@Injectable()
export class SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity>
  implements
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
    )
    repository: Repository<SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionWorkSpecialPeriodLegalFramework(
    props: SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity,
  ): TransactionType {
    const specialRetirementRejectionWorkSpecialPeriod =
      props.specialRetirementRejectionWorkSpecialPeriodId !== null
        ? Object.assign(
            new SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity(),
            {
              id: props.specialRetirementRejectionWorkSpecialPeriodId.toString(),
            },
          )
        : null;

    return this.create(
      SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity.build(
        {
          id: props.id.toString(),
          code: props.code,
          description: props.description,
          specialRetirementRejectionWorkSpecialPeriod,
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        },
      ),
    );
  }

  public deleteAllSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkBySpecialRetirementRejectionId(
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
      const specialPeriods = await manager
        .getRepository(SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity)
        .find({
          where: {
            specialRetirementRejectionWorkPeriod: {
              id: In(workPeriodIds),
            },
          },
        });

      if (specialPeriods.length === 0) {
        return;
      }

      const specialPeriodIds = specialPeriods.map(
        (specialPeriod) => specialPeriod.id,
      );
      const legalFrameworks = await manager
        .getRepository(
          SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
        )
        .find({
          where: {
            specialRetirementRejectionWorkSpecialPeriod: {
              id: In(specialPeriodIds),
            },
          },
        });

      if (legalFrameworks.length === 0) {
        return;
      }

      await manager
        .getRepository(
          SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
        )
        .softDelete(legalFrameworks.map((legalFramework) => legalFramework.id));
    };
  }
}
