import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-inss-benefit.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpecialRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-inss-benefit/command/special-retirement-rejection-inss-benefit.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';

@Injectable()
export class SpecialRetirementRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionInssBenefitTypeormEntity>
  implements SpecialRetirementRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionInssBenefitTypeormEntity)
    repository: Repository<SpecialRetirementRejectionInssBenefitTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionInssBenefit(
    props: SpecialRetirementRejectionInssBenefitEntity,
  ): TransactionType {
    const specialRetirementRejection =
      props.specialRetirementRejectionId !== null
        ? Object.assign(new SpecialRetirementRejectionTypeormEntity(), {
            id: props.specialRetirementRejectionId.toString(),
          })
        : null;

    return this.create(
      SpecialRetirementRejectionInssBenefitTypeormEntity.build({
        id: props.id.toString(),
        benefitNumber: props.benefitNumber,
        specialRetirementRejection,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionInssBenefitBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(SpecialRetirementRejectionInssBenefitTypeormEntity)
        .softDelete({
          specialRetirementRejection: {
            id: specialRetirementRejectionId.toString(),
          },
        });
    };
  }
}
