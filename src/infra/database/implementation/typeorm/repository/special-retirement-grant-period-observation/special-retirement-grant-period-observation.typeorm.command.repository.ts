import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantPeriodObservationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-observation.typeorm.entity';
import { SpecialRetirementGrantPeriodObservationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-observation/command/special-retirement-grant-period-observation.command.repository.gateway';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodObservationEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/special-retirement-grant-period-observation.entity';
import { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodObservationTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantPeriodObservationTypeormEntity>
  implements SpecialRetirementGrantPeriodObservationCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodObservationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodObservationTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodObservationTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantPeriodObservation(
    props: SpecialRetirementGrantPeriodObservationEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantPeriodObservationTypeormEntity.build({
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: props.id.toString(),
      observation: props.observation,
      specialRetirementGrantPeriod: {
        id: props.specialRetirementGrantPeriod.id.toString(),
      } as never,
    });

    return this.create(mapped);
  }

  public updateSpecialRetirementGrantPeriodObservation(
    id: SpecialRetirementGrantPeriodObservationId,
    props: SpecialRetirementGrantPeriodObservationEntity,
  ): TransactionType {
    return this.update(id.toString(), {
      updatedAt: new Date(),
      observation: props.observation,
    } as SpecialRetirementGrantPeriodObservationTypeormEntity);
  }

  public deleteSpecialRetirementGrantPeriodObservation(
    id: SpecialRetirementGrantPeriodObservationId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySpecialRetirementGrantPeriodId(
    specialRetirementGrantPeriodId: SpecialRetirementGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo = manager.getRepository(
        SpecialRetirementGrantPeriodObservationTypeormEntity,
      );

      await repo.softDelete({
        specialRetirementGrantPeriod: {
          id: specialRetirementGrantPeriodId.toString(),
        },
      });
    };
  }
}
