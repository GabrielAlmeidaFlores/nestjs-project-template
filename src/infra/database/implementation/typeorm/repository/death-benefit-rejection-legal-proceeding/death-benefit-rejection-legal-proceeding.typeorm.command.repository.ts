import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-proceeding/command/death-benefit-rejection-legal-proceeding.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';

@Injectable()
export class DeathBenefitRejectionLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionLegalProceedingTypeormEntity>
  implements DeathBenefitRejectionLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionLegalProceedingTypeormEntity)
    repository: Repository<DeathBenefitRejectionLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionLegalProceeding(
    props: DeathBenefitRejectionLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionLegalProceedingEntity,
      DeathBenefitRejectionLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionId(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionLegalProceedingTypeormEntity)
        .softDelete({
          deathBenefitRejection: { id: deathBenefitRejectionId.toString() },
        });
    };
  }
}
