import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-legal-proceeding/command/death-benefit-legal-proceeding.command.repository.gateway';
import { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitLegalProceedingTypeormEntity>
  implements DeathBenefitLegalProceedingCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitLegalProceedingTypeormEntity)
    repository: Repository<DeathBenefitLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitLegalProceeding(props: DeathBenefitLegalProceedingEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitLegalProceedingEntity,
      DeathBenefitLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitId(deathBenefitId: DeathBenefitId): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitLegalProceedingTypeormEntity)
        .createQueryBuilder()
        .softDelete()
        .where('death_benefit_id = :deathBenefitId', {
          deathBenefitId: deathBenefitId.toString(),
        })
        .execute();
    };
  }
}
