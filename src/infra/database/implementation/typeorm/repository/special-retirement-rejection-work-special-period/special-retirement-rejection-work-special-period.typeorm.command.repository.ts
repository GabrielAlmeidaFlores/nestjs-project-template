import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-special-period/command/special-retirement-rejection-work-special-period.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkSpecialPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity';

@Injectable()
export class SpecialRetirementRejectionWorkSpecialPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity>
  implements SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity)
    repository: Repository<SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionWorkSpecialPeriod(
    props: SpecialRetirementRejectionWorkSpecialPeriodEntity,
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
      SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity.build({
        id: props.id.toString(),
        recognizedSpecialTime: props.recognizedSpecialTime,
        companyName: props.companyName,
        cnpj: props.cnpj,
        position: props.position,
        comprobatoryDocument: props.comprobatoryDocument,
        linkedToCnis: props.linkedToCnis,
        containsCnisRemunerationInPeriod:
          props.containsCnisRemunerationInPeriod,
        technicalJustification: props.technicalJustification,
        additionalObservation: props.additionalObservation,
        lawyerObservation: props.lawyerObservation,
        exposureFrequency: props.exposureFrequency,
        informationSource: props.informationSource,
        identifiedAgents: props.identifiedAgents,
        efficientEpi: props.efficientEpi,
        specialRetirementRejectionWorkPeriod,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionWorkSpecialPeriodBySpecialRetirementRejectionId(
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

      await manager
        .getRepository(SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity)
        .softDelete(specialPeriods.map((specialPeriod) => specialPeriod.id));
    };
  }
}
