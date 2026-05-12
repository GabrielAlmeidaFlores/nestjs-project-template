import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-legal-proceeding.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-legal-proceeding/command/special-retirement-rejection-legal-proceeding.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';

@Injectable()
export class SpecialRetirementRejectionLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionLegalProceedingTypeormEntity>
  implements SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionLegalProceedingTypeormEntity)
    repository: Repository<SpecialRetirementRejectionLegalProceedingTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionLegalProceeding(
    props: SpecialRetirementRejectionLegalProceedingEntity,
  ): TransactionType {
    const specialRetirementRejection =
      props.specialRetirementRejectionId !== null
        ? Object.assign(new SpecialRetirementRejectionTypeormEntity(), {
            id: props.specialRetirementRejectionId.toString(),
          })
        : null;

    return this.create(
      SpecialRetirementRejectionLegalProceedingTypeormEntity.build({
        id: props.id.toString(),
        number: props.number,
        specialRetirementRejection,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionLegalProceedingBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(SpecialRetirementRejectionLegalProceedingTypeormEntity)
        .softDelete({
          specialRetirementRejection: {
            id: specialRetirementRejectionId.toString(),
          },
        });
    };
  }
}
