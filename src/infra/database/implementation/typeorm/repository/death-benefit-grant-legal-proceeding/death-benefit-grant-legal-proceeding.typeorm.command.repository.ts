import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';

@Injectable()
export class DeathBenefitGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantLegalProceedingTypeormEntity>
  implements DeathBenefitGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantLegalProceedingTypeormEntity)
    repository: Repository<DeathBenefitGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantLegalProceeding(
    props: DeathBenefitGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantLegalProceedingEntity,
      DeathBenefitGrantLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantLegalProceedingTypeormEntity)
        .softDelete({
          deathBenefitGrant: { id: deathBenefitGrantId.toString() },
        });
    };
  }
}
